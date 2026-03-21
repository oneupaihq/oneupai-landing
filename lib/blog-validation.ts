import { BlogPost } from '@/types/blog';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateBlogPost(post: Partial<BlogPost>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Title validation
  if (!post.title || post.title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (post.title.length > 200) {
    errors.push({ field: 'title', message: 'Title must be less than 200 characters' });
  }

  // Slug validation
  if (!post.slug || post.slug.trim().length === 0) {
    errors.push({ field: 'slug', message: 'Slug is required' });
  } else if (!/^[a-z0-9-]+$/.test(post.slug)) {
    errors.push({ field: 'slug', message: 'Slug must contain only lowercase letters, numbers, and hyphens' });
  } else if (post.slug.length > 100) {
    errors.push({ field: 'slug', message: 'Slug must be less than 100 characters' });
  }

  // Excerpt validation
  if (!post.excerpt || post.excerpt.trim().length === 0) {
    errors.push({ field: 'excerpt', message: 'Excerpt is required' });
  } else if (post.excerpt.length > 500) {
    errors.push({ field: 'excerpt', message: 'Excerpt must be less than 500 characters' });
  }

  // Content validation
  if (!post.content || post.content.trim().length === 0) {
    errors.push({ field: 'content', message: 'Content is required' });
  } else if (post.content.length < 100) {
    errors.push({ field: 'content', message: 'Content must be at least 100 characters' });
  }

  // Category validation
  const validCategories = [
    'Getting Started',
    'AI Tools',
    'Templates',
    'Marketing',
    'Automation',
    'SEO',
    'Case Studies',
    'Industry Guides'
  ];
  if (!post.category || !validCategories.includes(post.category)) {
    errors.push({ field: 'category', message: 'Invalid category' });
  }

  // Author validation
  if (!post.author?.name || post.author.name.trim().length === 0) {
    errors.push({ field: 'author.name', message: 'Author name is required' });
  }
  if (!post.author?.title || post.author.title.trim().length === 0) {
    errors.push({ field: 'author.title', message: 'Author title is required' });
  }
  if (!post.author?.avatar || post.author.avatar.length !== 1) {
    errors.push({ field: 'author.avatar', message: 'Author avatar must be a single character' });
  }

  return errors;
}

export function sanitizeContent(content: string): string {
  // Remove potentially dangerous HTML/script tags
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, ''); // Remove inline event handlers
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 250;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
