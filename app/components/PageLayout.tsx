"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderSection from "./sections/HeaderSection";
import FooterSection from "./sections/FooterSection";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  lastUpdated?: string;
}

export default function PageLayout({
  children,
  title,
  subtitle,
  lastUpdated,
}: PageLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Sticky Floating Navbar ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="sticky-nav"
            initial={{ y: -80, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="fixed left-0 right-0 z-50 flex justify-center px-4 bg-[#f0fcfb]"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}
          >
            <div
              className="w-full max-w-[1300px] px-5 py-3 flex items-center justify-between"
            >
              <a href="/">
                <img
                  className="w-28 md:w-36 h-auto"
                  alt="OneUpAI Logo"
                  src="/images/logo.svg"
                />
              </a>

              <motion.a
                href="/"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="ff-Graphik font-normal text-[#0e0e0f] text-sm whitespace-nowrap hover:text-[#00C48C] transition-colors duration-200"
              >
                Back to Home
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Original Header with gradient background ── */}
      <div
        className="w-full rounded-b-[30px]"
        style={{
          background:
            "linear-gradient(280.71deg, rgba(77, 255, 182, 0.08) 31.34%, rgba(67, 230, 191, 0.08) 39.85%, rgba(42, 168, 215, 0.08) 53.55%, rgba(26, 128, 231, 0.08) 78%)",
        }}
      >
        <div className="w-full px-4 py-5 md:py-6">
          <nav className="flex items-center justify-between max-w-[1320px] mx-auto px-4 md:px-8">
            <a href="/">
              <img
                className="w-36 md:w-48 lg:w-[180px] h-auto"
                alt="Company Logo"
                src="/images/logo.svg"
              />
            </a>
            <a
              href="/"
              className="ff-Graphik font-normal text-black text-base px-4 py-2 hover:text-[#00C48C] transition-colors"
            >
              Back to Home
            </a>
          </nav>
        </div>

        <div className="px-4 md:px-8 max-w-[1320px] mx-auto pb-10 md:pb-12 pt-8 md:pt-12">
          <div className="max-w-[900px]">
            <h1 className="ff-jakarta font-bold text-[#0e0e0f] text-3xl md:text-5xl lg:text-[56px] leading-[110%] mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="ff-Graphik text-[#1E293B] text-lg md:text-xl mb-2">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="ff-Graphik text-[#64748B] text-base md:text-lg italic">
                {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="space-y-8">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}