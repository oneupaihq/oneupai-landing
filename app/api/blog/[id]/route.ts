import { NextRequest, NextResponse } from 'next/server';
import { updatePost, deletePost, getPostById, checkSlugExists } from '@/lib/blog-storage';
import { validateBlogPost, sanitizeContent } from '@/lib/blog-validation';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Get existing post
    const existingPost = await getPostById(id);
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // If slug is being changed, check if new slug already exists
    if (body.slug && body.slug !== existingPost.slug) {
      const slugExists = await checkSlugExists(body.slug, id);
      if (slugExists) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 409 }
        );
      }
    }
    
    // Validate if full post data is provided
    if (body.title && body.content) {
      const validationErrors = validateBlogPost({ ...existingPost, ...body });
      if (validationErrors.length > 0) {
        return NextResponse.json(
          { error: 'Validation failed', errors: validationErrors },
          { status: 400 }
        );
      }
    }
    
    // Sanitize content if provided
    const sanitizedUpdates = {
      ...body,
      ...(body.content && { content: sanitizeContent(body.content) }),
      ...(body.excerpt && { excerpt: sanitizeContent(body.excerpt) }),
    };
    
    const updatedPost = await updatePost(id, sanitizedUpdates);
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ post: updatedPost, message: 'Post updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deletePost(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
