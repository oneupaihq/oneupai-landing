'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Share, Twitter, Calendar, Clock, User } from 'lucide-react';

interface BlogPostLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  tableOfContents?: {
    id: string;
    title: string;
    level: number;
  }[];
}

export default function BlogPostLayout({
  children,
  title,
  subtitle,
  category,
  date,
  readTime,
  author,
  tableOfContents = []
}: BlogPostLayoutProps) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const headings = document.querySelectorAll('article h2[id], article h3[id]');
    const navHeight = 68 + 24;

    const setActive = () => {
      let current = '';
      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        if (window.scrollY >= element.offsetTop - navHeight - 16) {
          current = element.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();

    return () => window.removeEventListener('scroll', setActive);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-outfit">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#e4eaf2] h-[68px] flex items-center px-10 gap-8">
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

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto mt-6 px-10 text-sm text-[#64748b] flex gap-2 items-center">
        <Link href="/" className="hover:text-[#1a80e7]">Home</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-[#1a80e7]">Blog</Link>
        <span>›</span>
        <span>{title}</span>
      </div>

      {/* Post Header */}
      <div className="max-w-[1200px] mx-auto mt-5 px-10">
        <div className="flex items-center gap-3 text-sm text-[#64748b] mb-4">
          <span className="bg-gradient-to-r from-[rgba(65,230,191,0.15)] to-[rgba(26,128,231,0.15)] text-[#1a80e7] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            {category}
          </span>
          <span>·</span>
          <span>Updated: {date}</span>
          <span>·</span>
          <span>{readTime} read</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00244c] leading-tight tracking-tight mb-4">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg text-[#64748b] max-w-[720px] mb-7 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Author Bar */}
        <div className="flex items-center gap-4 py-5 border-t border-b border-[#e4eaf2] mb-12">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {author.avatar}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-[#00244c]">{author.name}</div>
            <div className="text-xs text-[#64748b]">{author.title}</div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-[#e4eaf2] text-[#64748b] bg-white hover:border-[#1a80e7] hover:text-[#1a80e7] transition-colors">
              <Share className="w-4 h-4" />
              Share
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-[#e4eaf2] text-[#64748b] bg-white hover:border-[#1a80e7] hover:text-[#1a80e7] transition-colors">
              <Twitter className="w-4 h-4" />
              Tweet
            </button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="w-full h-[400px] rounded-2xl bg-gradient-to-br from-[#e8f4fd] to-[#d1f5ec] border-2 border-dashed border-[#e4eaf2] flex flex-col items-center justify-center gap-3 text-[#64748b] text-sm relative overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(65,230,191,0.12)] via-transparent to-[rgba(26,128,231,0.12)]" />
          <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] flex items-center justify-center relative z-10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <strong className="relative text-[#00244c] text-base font-semibold">Hero / Featured Image</strong>
          <span className="relative text-sm">Recommended size: 1200 × 630 px — Replace with your template screenshot or illustration</span>
        </div>
      </div>

      {/* Split Layout */}
      <div className="max-w-[1200px] mx-auto px-10 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
        {/* Article Content */}
        <article className="min-w-0 prose prose-lg max-w-none">
          {children}
        </article>

        {/* Sidebar */}
        <aside className="sticky top-[calc(68px+24px)]">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="bg-white border border-[#e4eaf2] rounded-2xl p-6 shadow-sm mb-5">
              <h4 className="text-xs font-bold tracking-wider uppercase text-[#64748b] mb-4">
                Table of Contents
              </h4>
              <ul className="space-y-1">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        item.level === 3 ? 'pl-6 text-xs' : ''
                      } ${
                        activeSection === item.id
                          ? 'bg-[rgba(26,128,231,0.08)] text-[#1a80e7]'
                          : 'text-[#64748b] hover:bg-[rgba(26,128,231,0.08)] hover:text-[#1a80e7]'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Promo Card */}
          <div className="rounded-2xl bg-[#00244c] p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(65,230,191,0.3)] via-transparent to-transparent" />
            <h5 className="text-base font-bold mb-2 relative">Launch your site in days, not months.</h5>
            <p className="text-sm text-[rgba(255,255,255,0.7)] mb-4 relative">
              12+ AI-powered templates built for service businesses. No code required.
            </p>
            <Link
              href="https://dashboard.oneupai.com/onboard"
              className="block text-center bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white py-3 px-4 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity relative"
            >
              Explore Templates →
            </Link>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-[#00244c] text-[rgba(255,255,255,0.6)] px-10 py-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img src="/images/white.png" alt="OneUpAI" className="h-16 mb-4" />
            <p className="text-sm leading-relaxed">
              AI-powered websites and automation for SMB service businesses. Launch in days, not months.
            </p>
          </div>
          
          <div>
            <h6 className="text-xs font-bold tracking-wider uppercase text-white mb-4">Product</h6>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Templates</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">AI Chat Widget</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Booking Integration</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">White-Label Reseller</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-xs font-bold tracking-wider uppercase text-white mb-4">Resources</h6>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm hover:text-[#41e6bf] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Docs</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h6 className="text-xs font-bold tracking-wider uppercase text-white mb-4">Legal</h6>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm hover:text-[#41e6bf] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-[#41e6bf] transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#41e6bf] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1200px] mx-auto mt-8 pt-5 border-t border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <span>© 2026 OneUpAI Solutions Inc. All rights reserved.</span>
          <span>99CodeShop LLC · OneUpAI Solutions Inc.</span>
        </div>
      </footer>
    </div>
  );
}