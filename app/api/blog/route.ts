import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPublishedPosts, createPost, checkSlugExists } from '@/lib/blog-storage';
import { validateBlogPost, sanitizeContent } from '@/lib/blog-validation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let posts = includeUnpublished ? await getAllPosts() : await getPublishedPosts();
    
    // Filter by category
    if (category && category !== 'All Posts') {
      posts = posts.filter(post => post.category === category);
    }
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return NextResponse.json({ posts, total: posts.length }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate post data
    const validationErrors = validateBlogPost(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validationErrors },
        { status: 400 }
      );
    }
    
    // Check if slug already exists
    const slugExists = await checkSlugExists(body.slug);
    if (slugExists) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 409 }
      );
    }
    
    // Sanitize content
    const sanitizedPost = {
      ...body,
      content: sanitizeContent(body.content),
      excerpt: sanitizeContent(body.excerpt),
    };
    
    const newPost = await createPost(sanitizedPost);
    
    return NextResponse.json({ post: newPost, message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
