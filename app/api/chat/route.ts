import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';
import { NextRequest } from 'next/server';
import { storeChatSession, trackQuestion, getChatSession, ChatSession, ChatMessage } from '@/lib/chat-storage';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limiting configuration - Configurable via environment
const RATE_LIMIT_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_WINDOW || '60000'); // 1 minute default
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Enhanced caching for common responses
const responseCache = new Map<string, { response: string; timestamp: number }>();

// Token optimization settings - Configurable via environment variables
const MAX_TOKENS = parseInt(process.env.CHAT_MAX_TOKENS || '800'); // Keep high to avoid cut-off responses
const TEMPERATURE = parseFloat(process.env.CHAT_TEMPERATURE || '0.3'); // Slightly more creative
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_REQUESTS || '50'); // Increased for better UX
const CACHE_DURATION = parseInt(process.env.CHAT_CACHE_DURATION || '600000'); // 10 minutes default
const MAX_CACHE_SIZE = 50; // Limit cache to 50 entries to prevent memory bloat
const MAX_RATE_LIMIT_ENTRIES = 1000; // Limit rate limit tracking to 1000 IPs

// Periodic cleanup to prevent memory leaks
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Clean up every 5 minutes

function cleanupMemory() {
  const now = Date.now();
  
  // Only run cleanup every 5 minutes
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  
  lastCleanup = now;
  
  // Clean up expired rate limit entries
  let rateLimitCleaned = 0;
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
      rateLimitCleaned++;
    }
  }
  
  // If still too many entries, remove oldest ones
  if (requestCounts.size > MAX_RATE_LIMIT_ENTRIES) {
    const entriesToRemove = requestCounts.size - MAX_RATE_LIMIT_ENTRIES;
    const sortedEntries = Array.from(requestCounts.entries())
      .sort((a, b) => a[1].resetTime - b[1].resetTime);
    
    for (let i = 0; i < entriesToRemove; i++) {
      requestCounts.delete(sortedEntries[i][0]);
      rateLimitCleaned++;
    }
  }
  
  // Clean up expired cache entries
  let cacheCleaned = 0;
  for (const [key, data] of responseCache.entries()) {
    if (now - data.timestamp > CACHE_DURATION) {
      responseCache.delete(key);
      cacheCleaned++;
    }
  }
  
  // If cache is still too large, remove oldest entries
  if (responseCache.size > MAX_CACHE_SIZE) {
    const entriesToRemove = responseCache.size - MAX_CACHE_SIZE;
    const sortedEntries = Array.from(responseCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    for (let i = 0; i < entriesToRemove; i++) {
      responseCache.delete(sortedEntries[i][0]);
      cacheCleaned++;
    }
  }
  
  if (rateLimitCleaned > 0 || cacheCleaned > 0) {
    console.log(`[Memory Cleanup] Removed ${rateLimitCleaned} rate limit entries, ${cacheCleaned} cache entries. Current sizes: rate=${requestCounts.size}, cache=${responseCache.size}`);
  }
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip);
  
  if (!userRequests || now > userRequests.resetTime) {
    // Reset or initialize counter
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  userRequests.count++;
  return false;
}

// Cleanup expired entries immediately when checking rate limits
function cleanupExpiredRateLimits() {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}

function getCacheKey(messages: any[]): string {
  // Create cache key from last user message (most recent question)
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  if (!lastUserMessage) return '';
  
  // Extract text content from message parts or fallback to content property
  let messageText = '';
  if (lastUserMessage.parts && Array.isArray(lastUserMessage.parts)) {
    messageText = lastUserMessage.parts
      .filter((part: any) => part.type === 'text')
      .map((part: any) => part.text)
      .join(' ');
  } else if (lastUserMessage.content) {
    messageText = lastUserMessage.content;
  }
  
  if (!messageText || messageText.trim().length < 3) return ''; // Require at least 3 characters
  
  // Normalize for better cache hits while preserving key words
  return messageText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

function getCachedResponse(key: string): string | null {
  if (!key) return null;
  
  const cached = responseCache.get(key);
  if (!cached) return null;
  
  // Check if cache is still valid
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    responseCache.delete(key);
    return null;
  }
  
  return cached.response;
}

function setCachedResponse(key: string, response: string): void {
  if (!key || response.length < 10) return; // Don't cache very short responses
  
  // Don't cache very large responses (> 5KB) to prevent memory bloat
  if (response.length > 5000) {
    console.log(`[Cache] Skipping large response (${response.length} chars)`);
    return;
  }
  
  responseCache.set(key, {
    response,
    timestamp: Date.now()
  });
  
  // Enforce strict cache size limit
  if (responseCache.size > MAX_CACHE_SIZE) {
    // Remove oldest entries until we're under the limit
    const sortedEntries = Array.from(responseCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    const toRemove = responseCache.size - MAX_CACHE_SIZE;
    for (let i = 0; i < toRemove; i++) {
      responseCache.delete(sortedEntries[i][0]);
    }
  }
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let sessionId: string | undefined;
  let wasCached = false;
  
  // Run periodic memory cleanup
  cleanupMemory();
  
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    
    // Clean up expired rate limits before checking
    if (requestCounts.size > 100) {
      cleanupExpiredRateLimits();
    }
    
    if (isRateLimited(clientIP)) {
      console.log(`[Chat] Rate limited for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages, sessionId: clientSessionId } = await req.json();
    sessionId = clientSessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Input validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('[Chat] Invalid request format');
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log incoming message for debugging
    const lastMessage = messages[messages.length - 1];
    
    // Extract message content from parts array or content property
    let userMessageContent = '';
    if (lastMessage?.parts && Array.isArray(lastMessage.parts)) {
      userMessageContent = lastMessage.parts
        .filter((part: any) => part.type === 'text')
        .map((part: any) => part.text)
        .join(' ');
    } else if (lastMessage?.content) {
      userMessageContent = lastMessage.content;
    }
    
    console.log(`[Chat] Received message from ${clientIP}: ${userMessageContent?.substring(0, 50) || 'unknown'}`);

    // Optimize conversation history to reduce token usage
    const recentMessages = messages.slice(-6); // Increased to 6 messages (3 exchanges) for better context

    // Check cache for common questions
    const cacheKey = getCacheKey(recentMessages);
    const cachedResponse = getCachedResponse(cacheKey);
    
    if (cachedResponse) {
      wasCached = true;
      const responseTime = Date.now() - startTime;
      console.log(`[Chat] Cache hit for key: ${cacheKey.substring(0, 30)}...`);
      
      // Track analytics for cached response
      if (userMessageContent) {
        await trackQuestion(userMessageContent);
        
        // Convert all messages from client to ChatMessage format
        const allChatMessages: ChatMessage[] = messages.map((msg: any) => {
          let content = '';
          if (msg.parts && Array.isArray(msg.parts)) {
            content = msg.parts
              .filter((part: any) => part.type === 'text')
              .map((part: any) => part.text)
              .join(' ');
          } else if (msg.content) {
            content = msg.content;
          }
          
          return {
            role: msg.role,
            content,
            timestamp: new Date().toISOString(),
          };
        });
        
        // Add the assistant's cached response
        allChatMessages.push({
          role: 'assistant',
          content: cachedResponse,
          timestamp: new Date().toISOString(),
          cached: true,
          responseTime,
        });
        
        // Calculate average response time
        const responseTimes = allChatMessages
          .filter(m => m.responseTime)
          .map(m => m.responseTime!);
        const avgResponseTime = responseTimes.length > 0
          ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
          : responseTime;
        
        // Store complete session with all messages
        await storeChatSession({
          id: sessionId!,
          messages: allChatMessages,
          startTime: allChatMessages[0].timestamp,
          endTime: new Date().toISOString(),
          userIP: clientIP,
          totalMessages: allChatMessages.length,
          avgResponseTime,
        });
        
        console.log(`[Chat] Stored cached session with ${allChatMessages.length} total messages`);
      }
      
      // Return cached response as a stream-like format
      return new Response(
        `data: {"content":"${cachedResponse.replace(/"/g, '\\"')}"}\n\ndata: [DONE]\n\n`,
        {
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        }
      );
    }

    // Model selection - Configurable via environment for easy optimization
    const modelName = process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307';
    
    const result = await streamText({
      model: anthropic(modelName), // Optimized Claude 3 Haiku for cost-effectiveness
      messages: await convertToModelMessages(recentMessages),
      maxOutputTokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      system: `You are OneUpAI's friendly AI assistant. Your goal is to help potential customers understand how OneUpAI can transform their business with AI-powered websites.

## About OneUpAI:
OneUpAI creates professional, AI-powered websites in under 5 minutes with:
- **Ready-to-use features**: Professional copy, booking system, and payment processing
- **Pricing tiers**: 
  • Starter ($47/mo) - Perfect for new businesses
  • Professional ($97/mo) - Advanced features for growing businesses  
  • Enterprise (custom) - Full-scale solutions
- **Key features**: 24/7 AI chat, Stripe payments, Google Calendar sync, mobile-responsive design
- **Industry templates**: Cleaning, HVAC, contractors, lawn care, moving services, fractional services, and more
- **Template benefits**: Each template includes industry-specific copy, relevant features, and optimized conversion elements

## Your communication style:
- **Conversational & friendly**: Use a warm, approachable tone
- **Concise & direct**: Keep responses short and to the point (1-2 sentences max)
- **Benefit-focused**: Highlight key OneUpAI benefits briefly
- **Well-structured**: Use bullet points only when listing multiple items
- **Action-oriented**: Include clear next steps and CTAs when appropriate

## Response format guidelines:
- Start with a direct answer to their question
- Keep responses short and concise (1-2 sentences)
- Include only the most relevant benefits or features
- End with a gentle call-to-action when appropriate
- Use emojis sparingly but effectively (🚀 💼 ⚡ 💰 📈)
- For pricing questions, mention the price and one key benefit
- For feature questions, explain briefly in one sentence
- **For URLs**: Format as [BUTTON:text|url] for clickable buttons (e.g., [BUTTON:Get Started|https://dashboard.oneupai.com/onboard])

## Call-to-action options:
- "Ready to get started? [BUTTON:Start Building Your Website|https://dashboard.oneupai.com/onboard]"
- "Want to see it in action? [BUTTON:View Demo|https://oneupai.com/#portfolio]"
- "Learn more about pricing? [BUTTON:View Pricing Plans|https://oneupai.com/#pricing]"
- "Check out our templates? [BUTTON:Browse Templates|https://oneupai.com/#templates]"
- "Questions about your specific industry? I'm here to help!"

## When to use buttons:
- Always include a button when mentioning dashboard.oneupai.com/onboard
- Use buttons for any direct links to OneUpAI pages
- Include buttons for demos, pricing, templates, or signup flows
- Keep button text action-oriented and concise (max 4-5 words)

## CRITICAL: Response Length Rules:
- **Maximum 2 sentences** for most responses
- **Maximum 3 sentences** only for complex questions
- **Never use more than 3 bullet points**
- **Be direct and concise** - users want quick answers
- If the answer is simple, keep it simple
- Don't repeat information the user already knows
- Skip lengthy introductions and get straight to the point

## Handle off-topic questions by:
1. Politely acknowledging their question
2. Redirecting to OneUpAI's business benefits
3. Asking how OneUpAI can help their business grow

Remember: Every interaction is an opportunity to show how OneUpAI creates professional results and saves valuable time.`,
      onFinish: async (result) => {
        const responseTime = Date.now() - startTime;
        
        // Cache the response for future use
        if (result.text && cacheKey) {
          setCachedResponse(cacheKey, result.text);
          console.log(`[Chat] Response cached for key: ${cacheKey.substring(0, 30)}...`);
        }
        
        // Track analytics
        if (userMessageContent && result.text) {
          await trackQuestion(userMessageContent);
          
          // Convert all messages from client to ChatMessage format
          const allChatMessages: ChatMessage[] = messages.map((msg: any) => {
            let content = '';
            if (msg.parts && Array.isArray(msg.parts)) {
              content = msg.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join(' ');
            } else if (msg.content) {
              content = msg.content;
            }
            
            return {
              role: msg.role,
              content,
              timestamp: new Date().toISOString(),
            };
          });
          
          // Add the assistant's response
          allChatMessages.push({
            role: 'assistant',
            content: result.text,
            timestamp: new Date().toISOString(),
            cached: false,
            responseTime,
          });
          
          // Calculate average response time
          const responseTimes = allChatMessages
            .filter(m => m.responseTime)
            .map(m => m.responseTime!);
          const avgResponseTime = responseTimes.length > 0
            ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
            : responseTime;
          
          // Store complete session with all messages
          await storeChatSession({
            id: sessionId!,
            messages: allChatMessages,
            startTime: allChatMessages[0].timestamp,
            endTime: new Date().toISOString(),
            userIP: clientIP,
            totalMessages: allChatMessages.length,
            avgResponseTime,
          });
          
          console.log(`[Chat] Stored session with ${allChatMessages.length} total messages`);
        }
        
        // Optional: Log usage for cost monitoring (only in development)
        if (process.env.NODE_ENV === 'development') {
          console.log(`[AI Usage] Tokens: ${result.usage?.totalTokens || 'unknown'}, Model: ${modelName}, Response Time: ${responseTime}ms`);
        }
      },
    });

    return result.toUIMessageStreamResponse({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('[Chat API Error]:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment or contact our support team.' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}