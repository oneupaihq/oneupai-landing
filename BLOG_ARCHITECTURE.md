# Blog CMS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     OneUpAI Blog CMS                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Admin Panel    │────▶│   API Routes     │────▶│  Storage Layer   │
│   (Frontend)     │◀────│   (Backend)      │◀────│  (JSON/DB)       │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │                         │
         │                        │                         │
         ▼                        ▼                         ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  - Create Post   │     │  POST /api/blog  │     │ blog-posts.json  │
│  - Edit Post     │     │  GET /api/blog   │     │                  │
│  - Delete Post   │     │  PUT /api/blog/  │     │ [                │
│  - Publish       │     │  DELETE /api/    │     │   {...post1},    │
│  - Search        │     │                  │     │   {...post2}     │
│  - Filter        │     │                  │     │ ]                │
└──────────────────┘     └──────────────────┘     └──────────────────┘

┌──────────────────┐
│   Public Blog    │
│   (Frontend)     │
└──────────────────┘
         │
         ▼
┌──────────────────┐
│  - Blog Index    │
│  - Post Pages    │
│  - Categories    │
│  - Search        │
└──────────────────┘
```

## Data Flow

### Creating a Post

```
User fills form → Submit → POST /api/blog → blog-storage.ts → Write to JSON → Return new post
                                                                                      │
                                                                                      ▼
                                                                            Redirect to /admin/blog
```

### Editing a Post

```
Load post → GET /api/blog/[id] → blog-storage.ts → Read from JSON → Display in form
                                                                              │
User edits → Submit → PUT /api/blog/[id] → blog-storage.ts → Update JSON ◀──┘
                                                                      │
                                                                      ▼
                                                            Redirect to /admin/blog
```

### Deleting a Post

```
User clicks delete → Confirm → DELETE /api/blog/[id] → blog-storage.ts → Remove from JSON
                                                                                  │
                                                                                  ▼
                                                                        Refresh post list
```

### Viewing Blog

```
User visits /blog → GET /api/blog → blog-storage.ts → Read JSON → Filter published → Display
                                                                                          │
User clicks post → /blog/[slug] → getPostBySlug() → Read JSON → Find by slug ──────────┘
                                                                      │
                                                                      ▼
                                                              Render with markdown
```

## File Structure

```
oneupai-landing/
│
├── app/
│   ├── admin/
│   │   └── blog/
│   │       ├── page.tsx                    # Admin dashboard
│   │       ├── new/
│   │       │   └── page.tsx                # Create new post
│   │       └── edit/
│   │           └── [id]/
│   │               └── page.tsx            # Edit post
│   │
│   ├── api/
│   │   └── blog/
│   │       ├── route.ts                    # GET all, POST new
│   │       └── [id]/
│   │           └── route.ts                # GET, PUT, DELETE single
│   │
│   └── blog/
│       ├── [slug]/
│       │   └── page.tsx                    # Dynamic post page
│       ├── components/
│       │   ├── BlogIndex.tsx               # Blog listing
│       │   ├── BlogPostLayout.tsx          # Post layout
│       │   ├── BlogLayout.tsx              # Simple layout
│       │   └── BlogComponents.tsx          # Reusable components
│       └── page.tsx                        # Blog index route
│
├── lib/
│   └── blog-storage.ts                     # Storage abstraction layer
│
├── types/
│   └── blog.ts                             # TypeScript interfaces
│
├── data/
│   └── blog-posts.json                     # Blog data (auto-created)
│
└── scripts/
    └── init-blog.js                        # Initialization script
```

## Component Hierarchy

```
Admin Dashboard (/admin/blog)
│
├── Navigation
├── Header (Title + New Post Button)
├── Filters (Search + Status Buttons)
└── Posts Table
    ├── Table Header
    └── Table Rows
        ├── Post Info (Title, Slug, Featured)
        ├── Category Badge
        ├── Author Avatar
        ├── Status Badge
        ├── Date
        └── Actions (Publish, Edit, Delete)

Create/Edit Post (/admin/blog/new or /admin/blog/edit/[id])
│
├── Navigation
├── Header (Title + Delete Button)
└── Form
    ├── Title Input
    ├── Slug Input
    ├── Excerpt Textarea
    ├── Content Textarea (Markdown)
    ├── Metadata (Category, Read Time)
    ├── Author Info (Name, Title, Avatar)
    ├── Options (Featured)
    └── Actions (Cancel, Save Draft, Publish)

Blog Index (/blog)
│
├── Navigation
├── Hero Section (Search)
├── Category Pills
├── Featured Post (if exists)
├── Latest Posts Grid
├── Industry Guides Grid
├── Newsletter Signup
└── Footer

Blog Post (/blog/[slug])
│
├── Navigation
├── Breadcrumb
├── Post Header (Title, Meta, Author)
├── Hero Image Placeholder
└── Two-Column Layout
    ├── Article Content (Markdown)
    └── Sidebar
        ├── Table of Contents
        └── Promo Card
```

## API Endpoints

```
GET    /api/blog                    # Get all posts
       ?includeUnpublished=true     # Include drafts

POST   /api/blog                    # Create new post
       Body: BlogPost (without id, dates)

GET    /api/blog/[id]               # Get single post by ID

PUT    /api/blog/[id]               # Update post
       Body: Partial<BlogPost>

DELETE /api/blog/[id]               # Delete post
```

## Storage Layer Functions

```typescript
// lib/blog-storage.ts

getAllPosts()                       // Get all posts (published + drafts)
getPublishedPosts()                 // Get only published posts
getPostBySlug(slug)                 // Get post by URL slug
createPost(post)                    // Create new post
updatePost(id, updates)             // Update existing post
deletePost(id)                      // Delete post
```

## State Management

```
Admin Dashboard:
├── posts: BlogPost[]               # All posts
├── loading: boolean                # Loading state
├── searchQuery: string             # Search input
└── filterStatus: 'all' | 'published' | 'draft'

Create/Edit Form:
├── formData: FormState             # Form fields
├── saving: boolean                 # Save state
└── loading: boolean                # Load state (edit only)

Blog Index:
├── blogPosts: BlogPost[]           # Fetched posts
├── loading: boolean                # Loading state
├── activeCategory: string          # Selected category
└── searchQuery: string             # Search input
```

## Security Considerations

```
Current:
├── No authentication              # Admin panel is public
├── File-based storage             # JSON file
└── Client-side validation         # Form validation

Recommended for Production:
├── Add authentication             # NextAuth.js, Clerk
├── Protect admin routes           # Middleware
├── Use database                   # PostgreSQL, MongoDB
├── Add rate limiting              # Prevent abuse
├── Implement CSRF protection      # Security tokens
└── Add input sanitization         # Prevent XSS
```

## Performance Optimizations

```
Current:
├── Static generation              # Next.js SSG
├── Client-side filtering          # Fast search
└── Lazy loading                   # Code splitting

Future:
├── Image optimization             # Next.js Image
├── CDN caching                    # Vercel Edge
├── Database indexing              # Fast queries
├── Full-text search               # Algolia
└── Incremental regeneration       # ISR
```

## Deployment Architecture

```
Development:
├── Local JSON file                # data/blog-posts.json
├── File system writes             # Direct writes
└── No authentication              # Open access

Production (Recommended):
├── Database                       # PostgreSQL/MongoDB
├── Object storage                 # S3 for images
├── Authentication                 # Protected admin
├── CDN                           # Fast delivery
└── Monitoring                    # Error tracking
```

## Upgrade Path

```
Phase 1: Current (JSON File)
├── Perfect for: Development, small blogs
├── Limitations: Not scalable, no concurrent writes
└── Cost: Free

Phase 2: Database
├── Perfect for: Production, medium blogs
├── Benefits: Scalable, concurrent writes, backups
└── Cost: ~$5-20/month

Phase 3: Headless CMS
├── Perfect for: Large blogs, multiple authors
├── Benefits: Rich editor, media management, workflows
└── Cost: ~$50-200/month

Phase 4: Enterprise
├── Perfect for: High traffic, complex needs
├── Benefits: Full customization, advanced features
└── Cost: Custom
```

## Technology Stack

```
Frontend:
├── Next.js 16                     # React framework
├── TypeScript                     # Type safety
├── Tailwind CSS                   # Styling
├── React Markdown                 # Markdown rendering
└── Lucide React                   # Icons

Backend:
├── Next.js API Routes             # Serverless functions
├── Node.js                        # Runtime
└── File System (fs)               # Storage

Development:
├── ESLint                         # Linting
├── Prettier                       # Formatting
└── TypeScript                     # Type checking
```

---

This architecture provides a solid foundation that can scale from a simple blog to a full-featured content management system.
