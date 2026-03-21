# OneUpAI Blog CMS - Complete Guide

## Overview

Your blog now has a fully functional Content Management System (CMS) with the ability to create, edit, publish, and delete blog posts. The system uses a JSON file-based storage that can easily be upgraded to a database later.

## Features

✅ **Create New Posts** - Rich editor with markdown support
✅ **Edit Existing Posts** - Update any post content or metadata
✅ **Publish/Unpublish** - Control post visibility with one click
✅ **Delete Posts** - Remove posts permanently
✅ **Featured Posts** - Mark posts as featured for homepage display
✅ **Categories** - Organize posts by category
✅ **Search & Filter** - Find posts quickly in admin panel
✅ **Dynamic Routing** - SEO-friendly URLs for all posts
✅ **Markdown Support** - Write content in markdown format
✅ **Auto Table of Contents** - Generated from H2 and H3 headings

## Getting Started

### Access the Admin Panel

Navigate to: **`/admin/blog`**

This is your blog management dashboard where you can:
- View all posts (published and drafts)
- Filter by status (All, Published, Drafts)
- Search posts by title or category
- Quick actions: Edit, Delete, Publish/Unpublish

### Creating a New Post

1. Click **"New Post"** button in the admin panel
2. Fill in the required fields:
   - **Title**: Your post title (auto-generates slug)
   - **URL Slug**: SEO-friendly URL (e.g., `my-awesome-post`)
   - **Excerpt**: Brief description (shown in listings)
   - **Content**: Full post content in markdown
   - **Category**: Select from predefined categories
   - **Read Time**: Estimated reading time (e.g., "5 min")
   - **Author Info**: Name, title, and avatar letter

3. Choose options:
   - **Featured Post**: Display on homepage
   - **Published**: Make visible to public

4. Click **"Save Draft"** or **"Publish"**

### Editing a Post

1. In the admin panel, click the **Edit** icon (pencil) next to any post
2. Make your changes
3. Click **"Save Changes"** to update
4. Click **"Publish"** if it's a draft and you want to make it live

### Publishing/Unpublishing

- Click the **eye icon** in the admin panel to toggle publish status
- Published posts appear on `/blog` and have public URLs
- Draft posts are only visible in the admin panel

### Deleting a Post

1. Click the **trash icon** in the admin panel, OR
2. Open the post in edit mode and click **"Delete Post"**
3. Confirm the deletion (this cannot be undone)

## Content Writing Tips

### Markdown Formatting

The content editor supports full markdown syntax:

```markdown
## Section Heading (H2)
### Subsection (H3)

**Bold text**
*Italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

> This is a blockquote

[Link text](https://example.com)

`inline code`

\`\`\`
code block
\`\`\`
```

### Table of Contents

- H2 headings (`##`) and H3 headings (`###`) are automatically added to the table of contents
- Use descriptive headings for better navigation
- The TOC appears in the sidebar on blog post pages

### SEO Best Practices

1. **Title**: Keep under 60 characters
2. **Excerpt**: 150-160 characters for meta description
3. **Slug**: Use lowercase, hyphens, no special characters
4. **Content**: Include relevant keywords naturally
5. **Headings**: Use H2 and H3 for structure

## File Structure

```
app/
├── admin/
│   └── blog/
│       ├── page.tsx              # Admin dashboard
│       ├── new/
│       │   └── page.tsx          # Create new post
│       └── edit/
│           └── [id]/
│               └── page.tsx      # Edit existing post
├── api/
│   └── blog/
│       ├── route.ts              # GET all posts, POST new post
│       └── [id]/
│           └── route.ts          # GET, PUT, DELETE single post
└── blog/
    ├── [slug]/
    │   └── page.tsx              # Dynamic blog post page
    ├── components/
    │   ├── BlogIndex.tsx         # Blog listing page
    │   ├── BlogPostLayout.tsx    # Post layout with sidebar
    │   └── BlogComponents.tsx    # Reusable components
    └── page.tsx                  # Blog index route

lib/
└── blog-storage.ts               # Storage layer (JSON file)

data/
└── blog-posts.json               # Blog posts database

types/
└── blog.ts                       # TypeScript interfaces
```

## API Endpoints

### GET `/api/blog`
Fetch all posts
- Query param: `?includeUnpublished=true` to include drafts

### POST `/api/blog`
Create a new post
- Body: BlogPost object (without id, createdAt, updatedAt)

### GET `/api/blog/[id]`
Fetch a single post by ID

### PUT `/api/blog/[id]`
Update a post
- Body: Partial BlogPost object

### DELETE `/api/blog/[id]`
Delete a post permanently

## Data Storage

Currently using JSON file storage at `data/blog-posts.json`. This is perfect for:
- Small to medium blogs (< 1000 posts)
- Simple deployment
- No database setup required

### Upgrading to Database

To upgrade to a database (PostgreSQL, MongoDB, etc.):

1. Update `lib/blog-storage.ts` to use database queries
2. Keep the same function signatures
3. No changes needed to API routes or UI components

Example with Prisma:
```typescript
export async function getAllPosts() {
  return await prisma.blogPost.findMany();
}
```

## Categories

Current categories:
- Getting Started
- AI Tools
- Templates
- Marketing
- Automation
- SEO
- Case Studies
- Industry Guides

To add more categories, update the `categories` array in:
- `app/admin/blog/new/page.tsx`
- `app/admin/blog/edit/[id]/page.tsx`
- `app/blog/components/BlogIndex.tsx`

## Customization

### Styling
All components use Tailwind CSS with your brand colors:
- Navy: `#00244c`
- Teal: `#41e6bf`
- Blue: `#1a80e7`

### Author Defaults
Update default author in the new/edit forms:
```typescript
authorName: 'Your Name',
authorTitle: 'Your Title',
authorAvatar: 'Y',
```

### Featured Post Display
Featured posts appear at the top of the blog index. Only one post should be featured at a time for best UX.

## Deployment

### Vercel/Netlify
The JSON file storage works perfectly with:
- Vercel (with persistent storage)
- Netlify (with persistent storage)

### Important Notes
1. The `data/` directory must be writable
2. For production, consider using:
   - Database (recommended for scale)
   - CMS services (Contentful, Sanity)
   - Git-based CMS (Netlify CMS, Tina)

## Troubleshooting

### Posts not showing up
- Check if post is published (not draft)
- Verify `data/blog-posts.json` exists
- Check browser console for API errors

### Can't create posts
- Ensure `data/` directory exists and is writable
- Check API route logs for errors
- Verify all required fields are filled

### Markdown not rendering
- Check for syntax errors in markdown
- Ensure `react-markdown` is installed
- View browser console for errors

## Next Steps

1. **Add Images**: Implement image upload for hero images
2. **Rich Editor**: Add WYSIWYG editor (TipTap, Slate)
3. **Tags**: Add tagging system for better organization
4. **Comments**: Integrate comment system
5. **Analytics**: Track post views and engagement
6. **SEO**: Add structured data and social meta tags
7. **RSS Feed**: Generate RSS feed for subscribers
8. **Sitemap**: Auto-generate sitemap for SEO

## Support

For questions or issues:
1. Check this guide first
2. Review the code comments
3. Check the Next.js documentation
4. Review the blog README at `app/blog/README.md`

---

**Your blog CMS is now fully functional!** Start creating amazing content for your OneUpAI website. 🚀
