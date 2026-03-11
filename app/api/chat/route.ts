import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';
import { NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Rate limiting configuration - Configurable via environment
const RATE_LIMIT_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_WINDOW || '60000'); // 1 minute default
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Enhanced caching for common responses
const responseCache = new Map<string, { response: string; timestamp: number }>();

// Token optimization settings - Configurable via environment variables
const MAX_TOKENS = parseInt(process.env.CHAT_MAX_TOKENS || '200'); // Optimal for concise responses
const TEMPERATURE = parseFloat(process.env.CHAT_TEMPERATURE || '0.2'); // More consistent responses
const MAX_REQUESTS_PER_WINDOW = parseInt(process.env.CHAT_RATE_LIMIT_REQUESTS || '15'); // Better UX
const CACHE_DURATION = parseInt(process.env.CHAT_CACHE_DURATION || '600000'); // 10 minutes default

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
  
  if (!messageText) return '';
  
  // Enhanced normalization for better cache hits
  return messageText
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/\b(what|how|do|does|can|will|would|should|could|is|are|the|a|an)\b/g, '') // Remove common words
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
  
  responseCache.set(key, {
    response,
    timestamp: Date.now()
  });
  
  // Clean up old cache entries (simple LRU)
  if (responseCache.size > 100) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) {
      responseCache.delete(oldestKey);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment before trying again.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    // Input validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Optimize conversation history to reduce token usage
    const recentMessages = messages.slice(-4); // Reduced from 6 to 4 messages (2 exchanges) for cost optimization

    // Check cache for common questions
    const cacheKey = getCacheKey(recentMessages);
    const cachedResponse = getCachedResponse(cacheKey);
    
    if (cachedResponse) {
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
- **Benefit-focused**: Always highlight how OneUpAI saves time and gets customers
- **Structured responses**: Use bullet points, emojis, and clear formatting when helpful
- **Action-oriented**: Include clear next steps and CTAs
- **Concise but complete**: 2-4 sentences with key details

## Response format guidelines:
- Start with a direct answer to their question
- Include relevant benefits or features
- End with a gentle call-to-action when appropriate
- Use emojis sparingly but effectively (🚀 💼 ⚡ 💰 📈)
- For pricing questions, mention the value proposition
- For feature questions, explain the business impact

## Call-to-action options:
- "Ready to get started? Visit https://dashboard.oneupai.com/onboard"
- "Want to see it in action? Check out our demo at [link]"
- "Questions about your specific industry? I'm here to help!"

## Handle off-topic questions by:
1. Politely acknowledging their question
2. Redirecting to OneUpAI's business benefits
3. Asking how OneUpAI can help their business grow

Remember: Every interaction is an opportunity to show how OneUpAI creates professional results and saves valuable time.`,
      onFinish: async (result) => {
        // Cache the response for future use
        if (result.text && cacheKey) {
          setCachedResponse(cacheKey, result.text);
        }
        
        // Optional: Log usage for cost monitoring (only in development)
        if (process.env.NODE_ENV === 'development') {
          console.log(`[AI Usage] Tokens: ${result.usage?.totalTokens || 'unknown'}, Model: ${modelName}`);
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
    console.error('Chat API Error:', error);
    
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