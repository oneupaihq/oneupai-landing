'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, RefreshCw } from 'lucide-react';
import { ToastContainer, useToast } from '@/app/components/ui/toast';
import PinProtection from './components/PinProtection';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  published: boolean;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?includeUnpublished=true');
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      error('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      setActionLoading(id);
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete post');
      }

      setPosts(posts.filter(post => post.id !== id));
      success('Post deleted successfully');
    } catch (err) {
      console.error('Error deleting post:', err);
      error(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setActionLoading(null);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean, title: string) => {
    try {
      setActionLoading(id);
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update post');
      }

      const data = await response.json();
      setPosts(posts.map(post => post.id === id ? data.post : post));
      success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
    } catch (err) {
      console.error('Error updating post:', err);
      error(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'published' && post.published) ||
      (filterStatus === 'draft' && !post.published);
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7fafd] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1a80e7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748b]">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <PinProtection>
    <div className="min-h-screen bg-[#f7fafd] font-outfit">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
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
          <li>
            <div className="relative group">
              <button className="text-sm font-semibold text-[#1a80e7] transition-colors">
                Admin ▾
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#e4eaf2] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/admin/blog" className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a80e7] transition-colors">
                  Blog Management
                </Link>
                <Link href="/admin/chat" className="block px-4 py-2 text-sm text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1a80e7] transition-colors">
                  Chat Analytics
                </Link>
              </div>
            </div>
          </li>
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
      <div className="bg-[#00244c] px-12 py-16 relative overflow-hidden">
        {/* Background Effects */}
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
        
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-[rgba(65,230,191,0.1)] border border-[rgba(65,230,191,0.28)] text-[#41e6bf] text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full mb-6">
                <Edit className="w-3 h-3" />
                Content Management
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                Blog{' '}
                <span className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] bg-clip-text text-transparent">
                  Management
                </span>
              </h1>
              <p className="text-lg text-[rgba(255,255,255,0.68)] max-w-[580px] leading-relaxed">
                Create, edit, and manage your blog posts. {posts.length} {posts.length === 1 ? 'post' : 'posts'} total · {posts.filter(p => p.published).length} published · {posts.filter(p => !p.published).length} drafts
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchPosts}
                className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                title="Refresh posts"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                <Plus className="w-4 h-4" />
                New Post
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-12 py-12">

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Search posts by title, category, or excerpt..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#e4eaf2] rounded-xl text-sm focus:outline-none focus:border-[#1a80e7] focus:ring-2 focus:ring-[#1a80e7] focus:ring-opacity-20 transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-bold tracking-wider uppercase text-[#64748b] mr-2">Filter:</span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filterStatus === 'all'
                  ? 'bg-[#00244c] text-white border-[#00244c] shadow-md'
                  : 'bg-white text-[#64748b] border-[#e4eaf2] hover:border-[#1a80e7] hover:text-[#1a80e7] hover:shadow-sm'
              }`}
            >
              All Posts ({posts.length})
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filterStatus === 'published'
                  ? 'bg-[#00244c] text-white border-[#00244c] shadow-md'
                  : 'bg-white text-[#64748b] border-[#e4eaf2] hover:border-[#1a80e7] hover:text-[#1a80e7] hover:shadow-sm'
              }`}
            >
              Published ({posts.filter(p => p.published).length})
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filterStatus === 'draft'
                  ? 'bg-[#00244c] text-white border-[#00244c] shadow-md'
                  : 'bg-white text-[#64748b] border-[#e4eaf2] hover:border-[#1a80e7] hover:text-[#1a80e7] hover:shadow-sm'
              }`}
            >
              Drafts ({posts.filter(p => !p.published).length})
            </button>
            
            {(searchQuery || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                }}
                className="px-4 py-2 rounded-full text-sm font-medium text-[#64748b] hover:text-[#1a80e7] transition-colors ml-2"
              >
                Clear filters ×
              </button>
            )}
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white border border-[#e4eaf2] rounded-2xl overflow-hidden shadow-sm">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#cdf5ed] to-[#d6ecff] flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-[#1a80e7]" />
              </div>
              <h3 className="text-xl font-bold text-[#00244c] mb-2">
                {searchQuery || filterStatus !== 'all' ? 'No posts match your filters' : 'No posts yet'}
              </h3>
              <p className="text-[#64748b] mb-6 max-w-md mx-auto">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first blog post'
                }
              </p>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Create your first post
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-[#f8fafc] border-b border-[#e4eaf2]">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Author
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4eaf2]">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.featured && (
                          <span className="text-yellow-500" title="Featured post">⭐</span>
                        )}
                        <div>
                          <div className="font-semibold text-[#00244c]">{post.title}</div>
                          <div className="text-xs text-[#64748b] mt-1">/blog/{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[rgba(26,128,231,0.1)] text-[#1a80e7]">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center text-white font-bold text-xs">
                          {post.author.avatar}
                        </div>
                        <span className="text-sm text-[#64748b]">{post.author.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#64748b]">
                      {post.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePublish(post.id, post.published, post.title)}
                          disabled={actionLoading === post.id}
                          className="p-2 text-[#64748b] hover:text-[#1a80e7] hover:bg-[#f0f8ff] rounded-lg transition-colors disabled:opacity-50"
                          title={post.published ? 'Unpublish' : 'Publish'}
                        >
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-[#64748b] hover:text-[#1a80e7] hover:bg-[#f0f8ff] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={actionLoading === post.id}
                          className="p-2 text-[#64748b] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </PinProtection>
  );
}
