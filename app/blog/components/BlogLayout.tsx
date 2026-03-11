import Link from 'next/link';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
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

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="bg-[#00244c] text-[rgba(255,255,255,0.6)] px-12 py-14 mt-16">
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