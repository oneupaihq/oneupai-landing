# Blog CMS - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Access the Admin Panel
Open your browser and navigate to:
```
http://localhost:3000/admin/blog
```

### Step 3: Create Your First Post
1. Click the **"New Post"** button
2. Fill in the form:
   - **Title**: "My First Blog Post"
   - **Excerpt**: "This is my first post using the new CMS"
   - **Content**: Write your content in markdown
   - **Category**: Select a category
3. Click **"Publish"**

That's it! Your post is now live at `/blog/my-first-blog-post`

---

## 📍 Important URLs

| Page | URL | Description |
|------|-----|-------------|
| Admin Dashboard | `/admin/blog` | Manage all posts |
| Create New Post | `/admin/blog/new` | Create a new post |
| Blog Index | `/blog` | Public blog listing |
| Individual Post | `/blog/[slug]` | View a single post |

---

## 🎯 Common Tasks

### Create a Post
1. Go to `/admin/blog`
2. Click "New Post"
3. Fill in the form
4. Click "Publish" or "Save Draft"

### Edit a Post
1. Go to `/admin/blog`
2. Click the pencil icon next to the post
3. Make your changes
4. Click "Save Changes"

### Delete a Post
1. Go to `/admin/blog`
2. Click the trash icon next to the post
3. Confirm deletion

### Publish/Unpublish a Post
1. Go to `/admin/blog`
2. Click the eye icon next to the post
3. Status toggles instantly

### Search Posts
1. Go to `/admin/blog`
2. Type in the search bar
3. Results filter automatically

---

## 📝 Writing Content

### Markdown Basics
```markdown
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered item
2. Another item

> Blockquote

[Link text](https://example.com)
```

### Tips
- Use `##` for main sections (appears in TOC)
- Use `###` for subsections (appears in TOC)
- Keep paragraphs short for readability
- Add lists for scannable content
- Use blockquotes for emphasis

---

## 🎨 Customization

### Change Default Author
Edit `app/admin/blog/new/page.tsx`:
```typescript
authorName: 'Your Name',
authorTitle: 'Your Title',
authorAvatar: 'Y',
```

### Add New Categories
Edit the `categories` array in:
- `app/admin/blog/new/page.tsx`
- `app/admin/blog/edit/[id]/page.tsx`
- `app/blog/components/BlogIndex.tsx`

---

## 🔍 Troubleshooting

### "Posts not showing"
- Check if the post is published (not a draft)
- Refresh the page
- Check browser console for errors

### "Can't create posts"
- Ensure you ran `npm run init-blog`
- Check that `data/` directory exists
- Restart the dev server

### "Markdown not rendering"
- Check your markdown syntax
- Ensure `react-markdown` is installed
- Clear browser cache

---

## 📚 Full Documentation

For complete documentation, see:
- **User Guide**: `BLOG_CMS_GUIDE.md`
- **Implementation Details**: `BLOG_IMPLEMENTATION_SUMMARY.md`
- **Blog Structure**: `app/blog/README.md`

---

## 🎉 You're Ready!

Your blog CMS is fully functional. Start creating content and grow your audience!

**Need help?** Check the full documentation files listed above.
