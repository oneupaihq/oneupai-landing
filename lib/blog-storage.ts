import { Redis } from '@upstash/redis';
import { BlogPost } from '@/types/blog';

// Initialize Redis client
// In production, these env vars are automatically set by Vercel when you add Redis
// For build time, we create a mock client if credentials are missing
const getRedisClient = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    // Return a mock client for build time
    console.warn('[Blog Storage] Redis credentials not found. Using mock client for build.');
    return {
      get: async () => null,
      set: async () => 'OK',
      del: async () => 1,
    } as any;
  }
  
  return new Redis({ url, token });
};

const redis = getRedisClient();

const POSTS_KEY = 'blog:posts';
const POST_PREFIX = 'blog:post:';
const SLUG_INDEX_PREFIX = 'blog:slug:';

// Initialize with default posts if Redis is empty
async function initializeBlogData() {
  const posts = await redis.get<BlogPost[]>(POSTS_KEY);
  
  if (!posts || posts.length === 0) {
    const defaultPosts: BlogPost[] = [
      {
        id: '1',
        title: 'How to Launch an AI-Powered Website for Your Service Business in Under a Week',
        slug: 'launch-ai-website-service-business',
        excerpt: 'Step-by-step walkthrough of how SMB service businesses can go live with a professional, conversion-ready website using OneUpAI\'s industry templates.',
        content: '## Introduction\n\nLaunching a professional website doesn\'t have to take months. With OneUpAI\'s industry-specific templates and AI-powered tools, you can have a fully functional, conversion-optimized website up and running in under a week.\n\n## Why Speed Matters\n\nIn today\'s competitive market, every day without a professional online presence is a missed opportunity. Service businesses need to establish credibility quickly and start capturing leads immediately.\n\n## The OneUpAI Advantage\n\nOur platform combines:\n- Pre-built industry templates\n- AI chat widgets for 24/7 lead qualification\n- Integrated booking systems\n- SEO optimization out of the box\n\n## Getting Started\n\n1. Choose your industry template\n2. Customize with your branding\n3. Add your services and pricing\n4. Configure the AI chat widget\n5. Connect your booking system\n6. Launch!\n\n## Conclusion\n\nWith the right tools and approach, launching a professional website is faster and easier than ever. Get started with OneUpAI today and see the difference.',
        category: 'Getting Started',
        date: 'March 9, 2026',
        readTime: '8 min',
        author: {
          name: 'Nick',
          title: 'Founder, OneUpAI',
          avatar: 'N'
        },
        featured: true,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'What Is an AI Chat Widget — and Why Every Service Business Needs One',
        slug: 'ai-chat-widget-guide',
        excerpt: 'Learn how an AI chat widget qualifies leads 24/7, answers FAQs, and routes hot prospects straight to your calendar.',
        content: '## What is an AI Chat Widget?\n\nAn AI chat widget is an intelligent conversational interface that engages with your website visitors in real-time, answering questions, qualifying leads, and guiding them toward booking your services.\n\n## Key Benefits\n\n### 24/7 Availability\nYour AI assistant never sleeps. It\'s there to help potential customers even when you\'re not available.\n\n### Lead Qualification\nThe AI asks the right questions to understand visitor needs and qualify them as leads before they reach your team.\n\n### Instant Responses\nNo more waiting for email replies. Visitors get immediate answers to their questions.\n\n### Booking Integration\nQualified leads can book appointments directly through the chat interface.\n\n## How It Works\n\n1. Visitor lands on your website\n2. AI chat widget greets them\n3. Answers common questions\n4. Qualifies their needs\n5. Offers to book a consultation\n6. Captures contact information\n\n## Real Results\n\nOur customers see:\n- 40% increase in qualified leads\n- 60% reduction in response time\n- 25% more bookings\n\n## Get Started\n\nEvery OneUpAI website comes with a pre-configured AI chat widget tailored to your industry. No technical setup required.',
        category: 'AI Tools',
        date: 'February 28, 2026',
        readTime: '7 min',
        author: {
          name: 'Sarah',
          title: 'Product Manager, OneUpAI',
          avatar: 'S'
        },
        featured: false,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    // Store posts array
    await redis.set(POSTS_KEY, defaultPosts);
    
    // Store individual posts for faster lookup
    for (const post of defaultPosts) {
      await redis.set(`${POST_PREFIX}${post.id}`, post);
      await redis.set(`${SLUG_INDEX_PREFIX}${post.slug}`, post.id);
    }
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  await initializeBlogData();
  const posts = await redis.get<BlogPost[]>(POSTS_KEY);
  return posts || [];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.published);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const post = await redis.get<BlogPost>(`${POST_PREFIX}${id}`);
  return post;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const postId = await redis.get<string>(`${SLUG_INDEX_PREFIX}${slug}`);
  if (!postId) return null;
  return getPostById(postId);
}

export async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const postId = await redis.get<string>(`${SLUG_INDEX_PREFIX}${slug}`);
  if (!postId) return false;
  if (excludeId && postId === excludeId) return false;
  return true;
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const posts = await getAllPosts();
  
  // Generate unique ID
  let newId = Date.now().toString();
  while (posts.some(p => p.id === newId)) {
    newId = (Date.now() + Math.random()).toString();
  }
  
  const newPost: BlogPost = {
    ...post,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add to posts array
  posts.push(newPost);
  
  // Store in multiple places for efficient access
  await Promise.all([
    redis.set(POSTS_KEY, posts),
    redis.set(`${POST_PREFIX}${newPost.id}`, newPost),
    redis.set(`${SLUG_INDEX_PREFIX}${newPost.slug}`, newPost.id)
  ]);
  
  return newPost;
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex(post => post.id === id);
  
  if (index === -1) return null;
  
  const oldSlug = posts[index].slug;
  
  posts[index] = {
    ...posts[index],
    ...updates,
    id: posts[index].id,
    createdAt: posts[index].createdAt,
    updatedAt: new Date().toISOString()
  };
  
  const updatedPost = posts[index];
  
  // Update in multiple places
  await redis.set(POSTS_KEY, posts);
  await redis.set(`${POST_PREFIX}${id}`, updatedPost);
  
  // If slug changed, update slug index
  if (updates.slug && updates.slug !== oldSlug) {
    await redis.del(`${SLUG_INDEX_PREFIX}${oldSlug}`);
    await redis.set(`${SLUG_INDEX_PREFIX}${updates.slug}`, id);
  }
  
  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const post = posts.find(p => p.id === id);
  
  if (!post) return false;
  
  const filteredPosts = posts.filter(p => p.id !== id);
  
  // Delete from multiple places
  await redis.set(POSTS_KEY, filteredPosts);
  await redis.del(`${POST_PREFIX}${id}`);
  await redis.del(`${SLUG_INDEX_PREFIX}${post.slug}`);
  
  return true;
}
