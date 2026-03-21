'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import PinProtection from '../components/PinProtection';

const categories = [
  'Getting Started',
  'AI Tools',
  'Templates',
  'Marketing',
  'Automation',
  'SEO',
  'Case Studies',
  'Industry Guides'
];

export default function NewBlogPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Getting Started',
    readTime: '5 min',
    authorName: 'Nick',
    authorTitle: 'Founder, OneUpAI',
    authorAvatar: 'N',
    featured: false,
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          published: publish,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          author: {
            name: formData.authorName,
            title: formData.authorTitle,
            avatar: formData.authorAvatar,
          },
        }),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const errorData = await response.json();
        console.error('Failed to create post:', errorData);
        alert(`Failed to create post: ${errorData.error}\n${errorData.errors ? JSON.stringify(errorData.errors, null, 2) : ''}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  return (
    <PinProtection>
    <div className="min-h-screen bg-[#f7fafd] font-outfit">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 h-[68px] bg-white border-b border-[#e4eaf2] flex items-center px-12 gap-8">
        <Link href="/" className="flex items-center flex-shrink-0">
          <img src="/images/logo.svg" alt="OneUpAI" className="h-9 w-auto" />
        </Link>
        <ul className="flex gap-6 ml-auto">
          <li><Link href="/#features" className="text-sm font-medium text-[#64748b] hover:text-[#00244c] transition-colors">Templates</Link></li>
          <li><Link href="/#features" className="text-sm font-medium text-[#64748b] hover:text-[#00244c] transition-colors">Features</Link></li>
          <li><Link href="/#pricing" className="text-sm font-medium text-[#64748b] hover:text-[#00244c] transition-colors">Pricing</Link></li>
          <li><Link href="/blog" className="text-sm font-medium text-[#64748b] hover:text-[#00244c] transition-colors">Blog</Link></li>
          <li><Link href="/admin/blog" className="text-sm font-semibold text-[#1a80e7] transition-colors">Admin</Link></li>
          <li>
            <Link 
              href="https://dashboard.oneupai.com/onboard" 
              className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#00244c] px-12 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(65,230,191,0.18)] via-transparent to-[rgba(26,128,231,0.22)]" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px'
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <Link 
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.7)] hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Create New{' '}
            <span className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] bg-clip-text text-transparent">
              Blog Post
            </span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-12 py-12">

        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Title */}
          <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-[#00244c] mb-3">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#e4eaf2] rounded-xl text-lg focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Slug */}
          <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-[#00244c] mb-3">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#64748b] font-medium">/blog/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-4 py-2.5 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
                placeholder="post-url-slug"
                required
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-[#00244c] mb-3">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 resize-none transition-all"
              rows={3}
              placeholder="Brief description of the post..."
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
            <label className="block text-sm font-semibold text-[#00244c] mb-3">
              Content * (Markdown supported)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 resize-none font-mono text-sm transition-all"
              rows={20}
              placeholder="Write your post content here..."
              required
            />
            <p className="text-xs text-[#64748b] mt-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a80e7]"></span>
              Tip: Use markdown for formatting. Headings with ## will be added to table of contents.
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
              <label className="block text-sm font-semibold text-[#00244c] mb-3">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Read Time */}
            <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
              <label className="block text-sm font-semibold text-[#00244c] mb-3">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
                placeholder="5 min"
              />
            </div>
          </div>

          {/* Author Info */}
          <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[#00244c] mb-4">Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-2">Name</label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-2">Title</label>
                <input
                  type="text"
                  value={formData.authorTitle}
                  onChange={(e) => setFormData({ ...formData, authorTitle: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#64748b] mb-2">Avatar (1 letter)</label>
                <input
                  type="text"
                  value={formData.authorAvatar}
                  onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value.charAt(0).toUpperCase() })}
                  className="w-full px-4 py-2.5 border-2 border-[#e4eaf2] rounded-xl focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
                  maxLength={1}
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[#00244c] mb-4">Options</h3>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-[#1a80e7] border-2 border-[#e4eaf2] rounded focus:ring-[#1a80e7] focus:ring-2 transition-all"
                />
                <span className="text-sm text-[#64748b] group-hover:text-[#00244c] transition-colors">Featured Post (appears on homepage)</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 pt-6 bg-white border border-[#e4eaf2] rounded-2xl p-6">
            <Link
              href="/admin/blog"
              className="px-6 py-3 border-2 border-[#e4eaf2] text-[#64748b] rounded-lg hover:border-[#1a80e7] hover:text-[#1a80e7] transition-colors font-medium"
            >
              Cancel
            </Link>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00244c] text-[#00244c] bg-white rounded-lg hover:bg-[#00244c] hover:text-white transition-all disabled:opacity-50 font-semibold"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-semibold shadow-lg"
              >
                <Eye className="w-4 h-4" />
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </PinProtection>
  );
}
