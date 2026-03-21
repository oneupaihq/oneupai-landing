import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts } from '@/lib/blog-storage';
import BlogPostLayout from '../components/BlogPostLayout';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - OneUpAI Blog',
    };
  }

  return {
    title: `${post.title} - OneUpAI Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Generate table of contents from content
  const generateTOC = (content: string) => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const toc: { id: string; title: string; level: number }[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      toc.push({ id, title, level });
    }

    return toc;
  };

  const tableOfContents = post.tableOfContents || generateTOC(post.content);

  return (
    <BlogPostLayout
      title={post.title}
      subtitle={post.excerpt}
      category={post.category}
      date={post.date}
      readTime={post.readTime}
      author={post.author}
      tableOfContents={tableOfContents}
    >
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => {
              const text = props.children?.toString() || '';
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              return (
                <h2 
                  id={id} 
                  className="text-2xl font-bold text-[#00244c] mb-4 mt-8 scroll-mt-24"
                  {...props}
                />
              );
            },
            h3: ({ node, ...props }) => {
              const text = props.children?.toString() || '';
              const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              return (
                <h3 
                  id={id} 
                  className="text-xl font-semibold text-[#00244c] mb-3 mt-6 scroll-mt-24"
                  {...props}
                />
              );
            },
            p: ({ node, ...props }) => (
              <p className="mb-6 text-[#374151] leading-relaxed" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 mb-8 space-y-2 text-[#374151]" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 mb-8 space-y-3 text-[#374151]" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-[#41e6bf] pl-5 py-4 bg-[rgba(65,230,191,0.06)] rounded-r-lg my-6 text-[#00244c] italic" {...props} />
            ),
            code: ({ node, inline, ...props }: any) => 
              inline ? (
                <code className="bg-[#f1f5f9] px-2 py-1 rounded text-sm font-mono text-[#00244c]" {...props} />
              ) : (
                <code className="block bg-[#f1f5f9] p-4 rounded-lg text-sm font-mono text-[#00244c] overflow-x-auto" {...props} />
              ),
            a: ({ node, ...props }) => (
              <a className="text-[#1a80e7] hover:underline" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-[#00244c]" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </BlogPostLayout>
  );
}
