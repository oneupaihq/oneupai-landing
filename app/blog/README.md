# OneUpAI Blog

This directory contains the blog implementation for the OneUpAI website, converted from the original HTML templates to Next.js.

## Structure

```
app/blog/
├── components/
│   ├── BlogIndex.tsx          # Main blog listing page component
│   ├── BlogLayout.tsx         # Simple layout for basic blog pages
│   ├── BlogPostLayout.tsx     # Advanced layout with sidebar and TOC
│   └── BlogComponents.tsx     # Reusable blog post components
├── launch-ai-website-service-business/
│   └── page.tsx              # Sample blog post (advanced layout)
├── ai-chat-widget-guide/
│   └── page.tsx              # Sample blog post (advanced layout)
├── page.tsx                  # Blog index page
└── README.md                 # This file
```

## Features

- **Responsive Design**: Fully responsive blog layout that works on all devices
- **Category Filtering**: Interactive category pills for filtering blog posts
- **Search Functionality**: Search bar for finding specific articles
- **Featured Posts**: Highlighted featured articles with special styling
- **Industry Guides**: Dedicated section for industry-specific guides
- **Newsletter Signup**: Email subscription form for blog updates
- **SEO Optimized**: Proper meta tags and structured data
- **Advanced Post Layout**: Sidebar with table of contents and promotional content
- **Reusable Components**: Modular components for consistent blog post styling

## Components

### BlogIndex
The main blog listing component that includes:
- Hero section with search functionality
- Category filtering pills
- Featured post display
- Grid of latest blog posts
- Industry guides section
- Newsletter signup
- Footer

### BlogPostLayout (Advanced)
Advanced layout component for individual blog posts that includes:
- Navigation header with breadcrumbs
- Post metadata and author information
- Hero image placeholder
- Two-column layout with sidebar
- Table of contents with active section highlighting
- Promotional sidebar card
- Footer
- Automatic scroll-to-section functionality

### BlogLayout (Simple)
Basic layout component for simpler blog posts that includes:
- Navigation header
- Footer
- Consistent styling

### BlogComponents
Reusable components for blog post content:
- `SectionNumber`: Numbered section headers
- `TemplatePlaceholder`: Placeholder for template screenshots
- `CTABox`: Call-to-action boxes with gradient styling
- `Blockquote`: Styled quote blocks
- `ComparisonTable`: Responsive comparison tables

## Navigation Integration

The blog has been integrated into the main site navigation:
- Added "Blog" link to the main header navigation
- Blog link is highlighted when on blog pages
- Consistent branding and styling with the main site

## Styling

The blog uses the same design system as the main OneUpAI website:
- Color scheme: Navy (#00244c), Teal (#41e6bf), Blue (#1a80e7)
- Typography: Inter font family
- Consistent spacing and component styling
- Gradient effects and hover animations

## Adding New Blog Posts

### Simple Blog Post
For basic blog posts, use the simple BlogLayout:

```tsx
import BlogLayout from '../components/BlogLayout';

export const metadata = {
  title: 'Your Blog Post Title - OneUpAI Blog',
  description: 'Your blog post description',
};

export default function BlogPost() {
  return (
    <BlogLayout>
      {/* Your blog post content */}
    </BlogLayout>
  );
}
```

### Advanced Blog Post
For feature-rich blog posts with sidebar and TOC, use BlogPostLayout:

```tsx
import BlogPostLayout from '../components/BlogPostLayout';
import { SectionNumber, TemplatePlaceholder, CTABox } from '../components/BlogComponents';

export const metadata = {
  title: 'Your Blog Post Title - OneUpAI Blog',
  description: 'Your blog post description',
};

const tableOfContents = [
  { id: 'section-1', title: 'First Section', level: 2 },
  { id: 'section-2', title: 'Second Section', level: 2 },
  { id: 'subsection', title: 'Subsection', level: 3 }
];

export default function BlogPost() {
  return (
    <BlogPostLayout
      title="Your Blog Post Title"
      subtitle="Optional subtitle"
      category="Category Name"
      date="Month DD, YYYY"
      readTime="X min"
      author={{
        name: "Author Name",
        title: "Author Title",
        avatar: "A"
      }}
      tableOfContents={tableOfContents}
    >
      <SectionNumber number={1} />
      <h2 id="section-1" className="text-2xl font-bold text-[#00244c] mb-4 scroll-mt-24">
        First Section
      </h2>
      
      <p className="mb-6 text-[#374151]">Your content here...</p>
      
      <TemplatePlaceholder templateName="Template Name" />
      
      <CTABox
        title="Call to Action"
        description="Description text"
      />
    </BlogPostLayout>
  );
}
```

### Steps to Add a New Post:

1. Create a new directory under `app/blog/` with the post slug
2. Add a `page.tsx` file with the blog post content
3. Choose the appropriate layout (simple or advanced)
4. Add the post to the `blogPosts` array in `BlogIndex.tsx`
5. Include proper metadata for SEO

## Development

The blog is built with:
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons
- Responsive design principles

To run in development:
```bash
npm run dev
```

The blog will be available at `http://localhost:3000/blog`

## Available Blog Posts

- `/blog/launch-ai-website-service-business` - Featured post about launching AI websites
- `/blog/ai-chat-widget-guide` - Guide about AI chat widgets for service businesses