'use client';

import { useState } from 'react';
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

const blogPosts = [
  {
    id: 1,
    title: '5 OneUpAI Templates That Book More Clients on Autopilot',
    excerpt: 'A deep dive into our top-performing industry templates and the AI features that turn website visitors into booked appointments.',
    category: 'Templates',
    date: 'Mar 5, 2026',
    readTime: '6 min',
    href: '/blog/oneupai-templates-autopilot'
  },
  {
    id: 2,
    title: 'What Is an AI Chat Widget — and Why Every Service Business Needs One',
    excerpt: 'Learn how an AI chat widget qualifies leads 24/7, answers FAQs, and routes hot prospects straight to your calendar.',
    category: 'AI Tools',
    date: 'Feb 28, 2026',
    readTime: '7 min',
    href: '/blog/ai-chat-widget-guide'
  },
  {
    id: 3,
    title: 'Local SEO for Service Businesses: How to Rank #1 in Your City',
    excerpt: 'Practical local SEO tactics — keyword strategy, Google Business Profile, schema markup, and more for service businesses.',
    category: 'SEO',
    date: 'Feb 20, 2026',
    readTime: '9 min',
    href: '/blog/local-seo-service-businesses'
  },
  {
    id: 4,
    title: 'From Inquiry to Invoice: Automating Your Client Workflow with AI',
    excerpt: 'Map the full client journey — lead capture, follow-up, booking, contract, and payment — and automate each step.',
    category: 'Automation',
    date: 'Feb 14, 2026',
    readTime: '10 min',
    href: '/blog/automate-client-workflow'
  },
  {
    id: 5,
    title: 'How to Write Website Copy That Converts Visitors Into Paying Customers',
    excerpt: 'Copywriting frameworks — PAS, AIDA, and social proof strategies — tailored for HVAC, cleaning, and contractor businesses.',
    category: 'Marketing',
    date: 'Feb 7, 2026',
    readTime: '8 min',
    href: '/blog/website-copy-converts'
  },
  {
    id: 6,
    title: 'Case Study: How a Cleaning Business Added $4K/Month with OneUpAI',
    excerpt: 'Real numbers, real results. See how a residential cleaning company used OneUpAI\'s template and AI chat to grow recurring revenue.',
    category: 'Case Studies',
    date: 'Jan 30, 2026',
    readTime: '5 min',
    href: '/blog/cleaning-business-case-study'
  }
];

const industryGuides = [
  {
    title: 'The Complete HVAC Business Website Guide: What to Include & Why',
    excerpt: 'Everything an HVAC contractor needs on their website to rank locally and convert visitors into booked jobs.',
    date: 'Jan 22, 2026',
    readTime: '11 min',
    href: '/blog/hvac-website-guide'
  },
  {
    title: 'Personal Trainers: Build a Website That Sells Your Programs While You Sleep',
    excerpt: 'A fitness-specific guide to online presence, booking automation, and using AI to follow up with prospects.',
    date: 'Jan 15, 2026',
    readTime: '8 min',
    href: '/blog/personal-trainer-website'
  },
  {
    title: 'Fractional Executives: Build an Authority Website That Attracts Premium Clients',
    excerpt: 'Position yourself as the go-to expert with a polished web presence, case studies, and an AI-powered lead intake flow.',
    date: 'Jan 8, 2026',
    readTime: '9 min',
    href: '/blog/fractional-executive-website'
  },
  {
    title: 'Home Service Contractors: Stop Relying on Referrals — Build a Lead-Generating Website',
    excerpt: 'How landscaping, plumbing, and electrical contractors can own their lead source and stop paying per-click forever.',
    date: 'Jan 2, 2026',
    readTime: '10 min',
    href: '/blog/home-service-lead-generation'
  }
];

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
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
          <li><Link href="#" className="text-sm font-medium text-[#64748b] hover:text-[#00244c] transition-colors">Docs</Link></li>
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
        {/* Featured Post - Only show when no search/filter is active */}
        {!searchQuery && activeCategory === 'All Posts' && (
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
                <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[rgba(26,128,231,0.1)] text-[#1a80e7]">Getting Started</span>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#00244c] leading-tight tracking-tight mb-4">
                How to Launch an AI-Powered Website for Your Service Business in Under a Week
              </h2>
              
              <p className="text-base text-[#64748b] leading-relaxed mb-8">
                Step-by-step walkthrough of how SMB service businesses — from HVAC contractors to fitness coaches — can go live with a professional, conversion-ready website using OneUpAI's industry templates.
              </p>
              
              <div className="flex items-center gap-3 text-sm text-[#64748b] mb-8">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  N
                </div>
                <span>Nick · OneUpAI</span>
                <div className="w-1 h-1 bg-[#c0ccd8] rounded-full" />
                <span>March 9, 2026</span>
                <div className="w-1 h-1 bg-[#c0ccd8] rounded-full" />
                <span>8 min read</span>
              </div>
              
              <Link 
                href="/blog/launch-ai-website-service-business"
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
        {filteredPosts.length > 0 && (
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
                    href={post.href}
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
        {filteredIndustryGuides.length > 0 && (
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