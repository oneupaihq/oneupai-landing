const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Created data directory');
}

// Initialize blog posts file with sample data
const blogPostsPath = path.join(dataDir, 'blog-posts.json');
if (!fs.existsSync(blogPostsPath)) {
  const samplePosts = [
    {
      id: '1',
      title: 'How to Launch an AI-Powered Website for Your Service Business in Under a Week',
      slug: 'launch-ai-website-service-business',
      excerpt: 'Step-by-step walkthrough of how SMB service businesses can go live with a professional, conversion-ready website using OneUpAI\'s industry templates.',
      content: `## Choose Your Industry Template

OneUpAI offers specialized templates for different service industries. Whether you're running an HVAC company, cleaning service, or fitness coaching business, we have a template designed specifically for your needs.

## Customize Your Content

Once you've selected your template, it's time to make it yours. Our AI assistant helps you customize:

- Business name and contact information
- Service descriptions and pricing
- About section and team bios
- Customer testimonials and case studies
- Local SEO elements for your area

## Set Up Your AI Chat Widget

This is where the magic happens. Your AI chat widget works 24/7 to:

- Answer common questions about your services
- Qualify leads based on their needs
- Collect contact information
- Schedule appointments directly to your calendar
- Follow up with prospects automatically

## Launch and Optimize

With your template customized and AI chat configured, you're ready to launch. Use OneUpAI's built-in analytics to track visitor behavior and optimize your site.`,
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
      content: `## What Is an AI Chat Widget?

An AI chat widget is an intelligent conversation tool that sits on your website, powered by artificial intelligence. Unlike basic chatbots that follow rigid scripts, AI chat widgets understand context, learn from interactions, and provide personalized responses.

## Key Benefits for Service Businesses

### Never Miss a Lead Again

Studies show that 78% of customers buy from the first company that responds to their inquiry. With an AI chat widget, you're always first to respond — even at 2 AM on a Sunday.

### Qualify Leads Automatically

Not all leads are created equal. Your AI chat widget can ask qualifying questions to determine budget, timeline, and service needs before passing high-quality prospects to you.

### Reduce Administrative Work

Stop playing phone tag. The AI chat widget handles initial inquiries, schedules appointments, and collects all necessary information before the prospect even talks to you.

## How It Works Behind the Scenes

Modern AI chat widgets use natural language processing (NLP) to understand visitor intent and provide relevant responses. The typical flow includes greeting visitors, gathering information, qualifying leads, and scheduling next steps.`,
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

  fs.writeFileSync(blogPostsPath, JSON.stringify(samplePosts, null, 2));
  console.log('✅ Initialized blog posts with sample data');
} else {
  console.log('ℹ️  Blog posts file already exists');
}

console.log('\n🎉 Blog CMS initialization complete!');
console.log('\nNext steps:');
console.log('1. Run: npm run dev');
console.log('2. Visit: http://localhost:3000/admin/blog');
console.log('3. Start creating your blog posts!\n');
