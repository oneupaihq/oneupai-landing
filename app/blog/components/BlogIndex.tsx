'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Layers, ChevronRight } from 'lucide-react';

const categories = [
  'All Posts',
  'Getting Started', 
  'AI Tools',
  'Templates',
  'Marketing',
  'Automation',
  'SEO',
  'Case Studies',
  'Industry Guides'
];

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setBlogPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const industryGuides = blogPosts.filter(post => post.category === 'Industry Guides');

  // Filter posts based on search query and active category
  const regularPosts = blogPosts.filter(post => post.category !== 'Industry Guides');
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter industry guides based on search query
  const filteredIndustryGuides = industryGuides.filter(guide => {
    if (activeCategory !== 'All Posts' && activeCategory !== 'Industry Guides') return false;
    
    return searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const featuredPost = blogPosts.find(post => post.featured);

  // Handle search
  const handleSearch = () => {
    // Search is handled by the filter logic above
    // This function can be used for analytics or other search actions
  };

  // Highlight search terms in text
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-[#41e6bf] bg-opacity-20 text-[#00244c] font-semibold">
          {part}
        </mark>
      ) : part
    );
  };

  return (
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
          <li><Link href="/blog" className="text-sm font-semibold text-[#1a80e7] transition-colors">Blog</Link></li>
          <li><Link href="/admin/blog" className="text-sm font-medium text-[#64748b] hover:text-[#00244c] transition-colors">Admin</Link></li>
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
      <div className="bg-[#00244c] px-12 py-20 text-center relative overflow-hidden">
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
        
        <div className="relative z-10 max-w-[700px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-[rgba(65,230,191,0.1)] border border-[rgba(65,230,191,0.28)] text-[#41e6bf] text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full mb-8">
            <Layers className="w-3 h-3" />
            Resources & Guides
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 whitespace-nowrap">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] bg-clip-text text-transparent">
              OneUpAI's Blog
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[rgba(255,255,255,0.68)] max-w-[580px] mx-auto leading-relaxed mb-12">
            Your one-stop source for guides, tutorials, and tips to create your own AI-powered website to promote your business.
          </p>
          
          <div className="flex max-w-[500px] mx-auto bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] rounded-xl overflow-hidden focus-within:border-[#41e6bf] transition-colors shadow-lg">
            <input
              type="text"
              placeholder="Search articles, templates, tutorials…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-sm text-white placeholder-[rgba(255,255,255,0.38)] font-outfit"
            />
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] border-none px-6 cursor-pointer text-white text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="max-w-[1200px] mx-auto mt-12 px-12 flex flex-wrap gap-3 items-center">
        <span className="text-sm font-bold tracking-wider uppercase text-[#64748b] mr-4">Browse:</span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === category
                ? 'bg-[#00244c] text-white border-[#00244c] shadow-md'
                : 'bg-white text-[#64748b] border-[#e4eaf2] hover:border-[#1a80e7] hover:text-[#1a80e7] hover:shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
        
        {/* Clear filters button */}
        {(searchQuery || activeCategory !== 'All Posts') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All Posts');
            }}
            className="px-4 py-2 rounded-full text-sm font-medium text-[#64748b] hover:text-[#1a80e7] transition-colors ml-2"
          >
            Clear all filters ×
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto mt-16 mb-20 px-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-[#1a80e7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#64748b]">Loading posts...</p>
          </div>
        )}

        {/* Featured Post - Only show when no search/filter is active */}
        {!loading && !searchQuery && activeCategory === 'All Posts' && featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden bg-white border border-[#e4eaf2] mb-16 hover:shadow-xl transition-shadow duration-300">
            <div className="min-h-[380px] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#cdf5ed] to-[#d6ecff] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[rgba(65,230,191,0.25)] via-transparent to-[rgba(26,128,231,0.18)]" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center relative z-10 shadow-lg">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <strong className="relative text-[#00244c] text-base font-semibold">Featured Image</strong>
              <span className="relative text-[#64748b] text-sm">1200 × 630 px recommended</span>
            </div>
            
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex gap-3 items-center mb-6 flex-wrap">
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#00244c] text-[#41e6bf]">⭐ Featured</span>
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[rgba(26,128,231,0.1)] text-[#1a80e7]">{featuredPost.category}</span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#00244c] leading-tight tracking-tight mb-4">
                {featuredPost.title}
              </h2>
              
              <p className="text-base text-[#64748b] leading-relaxed mb-8">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-sm text-[#64748b] mb-8">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {featuredPost.author.avatar}
                </div>
                <span>{featuredPost.author.name} · {featuredPost.author.title}</span>
                <div className="w-1 h-1 bg-[#c0ccd8] rounded-full" />
                <span>{featuredPost.date}</span>
                <div className="w-1 h-1 bg-[#c0ccd8] rounded-full" />
                <span>{featuredPost.readTime} read</span>
              </div>
              
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a80e7] hover:gap-3 transition-all group"
              >
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
        {/* Latest Posts */}
        <div className="flex items-baseline justify-between mb-8">
          <h3 className="text-2xl font-bold text-[#00244c] tracking-tight">
            {searchQuery ? `Search Results (${filteredPosts.length + filteredIndustryGuides.length})` : 'Latest Posts'}
          </h3>
          {!searchQuery && (
            <Link href="#" className="text-sm font-semibold text-[#1a80e7] inline-flex items-center gap-1 hover:underline">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* No Results State */}
        {(filteredPosts.length === 0 && filteredIndustryGuides.length === 0) && (searchQuery || activeCategory !== 'All Posts') && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] opacity-20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#00244c]" />
            </div>
            <h3 className="text-xl font-bold text-[#00244c] mb-2">No posts found</h3>
            <p className="text-[#64748b] mb-6">
              {searchQuery 
                ? `No posts match "${searchQuery}" in the ${activeCategory} category.`
                : `No posts found in the ${activeCategory} category.`
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Posts');
              }}
              className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post, index) => (
            <div key={post.id} className="bg-white border border-[#e4eaf2] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className={`h-[200px] flex flex-col items-center justify-center gap-3 relative overflow-hidden ${
                index % 6 === 0 ? 'bg-gradient-to-br from-[#cdf5ed] to-[#d6ecff]' :
                index % 6 === 1 ? 'bg-gradient-to-br from-[#fde8d4] to-[#fdf4d0]' :
                index % 6 === 2 ? 'bg-gradient-to-br from-[#e2d9ff] to-[#d4eaff]' :
                index % 6 === 3 ? 'bg-gradient-to-br from-[#d0f5f0] to-[#d6f5da]' :
                index % 6 === 4 ? 'bg-gradient-to-br from-[#ffd6d6] to-[#ffe8d6]' :
                'bg-gradient-to-br from-[#dce8ff] to-[#d0f2ff]'
              }`}>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[rgba(255,255,255,0.4)] via-transparent to-transparent" />
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center relative z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
                <strong className="relative text-sm text-[#00244c] font-semibold">Template Preview</strong>
                <span className="relative text-xs text-[#64748b]">Replace with screenshot</span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3 flex-wrap">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[rgba(26,128,231,0.1)] text-[#1a80e7]">
                    {post.category}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-[#00244c] leading-tight tracking-tight mb-3">
                  {highlightSearchTerm(post.title, searchQuery)}
                </h4>
                
                <p className="text-sm text-[#64748b] leading-relaxed mb-5 flex-1">
                  {highlightSearchTerm(post.excerpt, searchQuery)}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#64748b]">{post.date} · {post.readTime}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-[#1a80e7] inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Industry Guides */}
        {!loading && filteredIndustryGuides.length > 0 && (
          <>
            <div className="flex items-baseline justify-between mb-8">
              <h3 className="text-2xl font-bold text-[#00244c] tracking-tight">Industry Guides</h3>
              {!searchQuery && (
                <Link href="#" className="text-sm font-semibold text-[#1a80e7] inline-flex items-center gap-1 hover:underline">
                  View all <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
              {filteredIndustryGuides.map((guide, index) => (
            <div key={index} className="bg-white border border-[#e4eaf2] rounded-xl p-5 flex gap-4 items-start hover:shadow-md hover:-translate-y-1 transition-all">
              <div className={`w-18 h-18 rounded-lg flex-shrink-0 flex items-center justify-center ${
                index % 4 === 0 ? 'bg-gradient-to-br from-[#cdf5ed] to-[#d6ecff]' :
                index % 4 === 1 ? 'bg-gradient-to-br from-[#fde8d4] to-[#fdf4d0]' :
                index % 4 === 2 ? 'bg-gradient-to-br from-[#e2d9ff] to-[#d4eaff]' :
                'bg-gradient-to-br from-[#d0f5f0] to-[#d6f5da]'
              }`}>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex gap-2 mb-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[rgba(26,128,231,0.1)] text-[#1a80e7]">
                    Industry Guides
                  </span>
                </div>
                
                <h5 className="text-sm font-bold text-[#00244c] mb-2 leading-tight">
                  {highlightSearchTerm(guide.title, searchQuery)}
                </h5>
                
                <p className="text-xs text-[#64748b] leading-relaxed mb-3">
                  {highlightSearchTerm(guide.excerpt, searchQuery)}
                </p>
                
                <div className="text-xs text-[#64748b] flex items-center gap-2">
                  <span>{guide.date}</span>
                  <div className="w-1 h-1 bg-[#c0ccd8] rounded-full" />
                  <span>{guide.readTime} read</span>
                </div>
              </div>
            </div>
          ))}
            </div>
          </>
        )}

        {/* Newsletter */}
        <div className="bg-[#00244c] rounded-2xl p-8 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 relative overflow-hidden mb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(65,230,191,0.2)] via-transparent to-[rgba(26,128,231,0.2)]" />
          </div>
          
          <div className="relative text-center lg:text-left">
            <h3 className="text-xl lg:text-2xl font-extrabold text-white mb-3 tracking-tight">Get new posts delivered to your inbox</h3>
            <p className="text-base text-[rgba(255,255,255,0.62)]">No spam. Just practical guides and template launches — straight to you.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 relative w-full lg:w-auto">
            <input
              type="email"
              placeholder="you@yourbusiness.com"
              className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-lg px-5 py-3 text-sm text-white font-outfit outline-none w-full sm:w-65 focus:border-[#41e6bf] transition-colors placeholder-[rgba(255,255,255,0.38)]"
            />
            <button className="bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] border-none rounded-lg px-6 py-3 text-white text-sm font-semibold cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity">
              Subscribe →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#00244c] text-[rgba(255,255,255,0.6)] px-12 py-14">
        <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-10">
          <div className="col-span-1">
            <img src="/images/white.png" alt="OneUpAI" className="h-16 mb-4" />
            <p className="text-sm leading-relaxed">
              AI-powered websites and automation for SMB service businesses. Launch in days, not months.
            </p>
          </div>
          
          <div>
            <h6 className="text-xs font-bold tracking-wider uppercase text-white mb-4">Product</h6>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Templates</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">AI Chat Widget</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Booking Integration</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">White-Label Reseller</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-xs font-bold tracking-wider uppercase text-white mb-4">Resources</h6>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Docs</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-xs font-bold tracking-wider uppercase text-white mb-4">Legal</h6>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-[rgba(255,255,255,0.52)] hover:text-[#41e6bf] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto mt-9 pt-6 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center text-xs">
          <span>© 2026 OneUpAI Solutions Inc. All rights reserved.</span>
          <span>99CodeShop LLC · OneUpAI Solutions Inc.</span>
        </div>
      </footer>
    </div>
  );
}