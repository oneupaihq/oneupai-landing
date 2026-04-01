"use client";

import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const lineSvg = "/images/waves-line.svg";

const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const clientAvatars = [
  { src: "/mask-group.png", alt: "Client 1" },
  { src: "/mask-group-1.png", alt: "Client 2" },
  { src: "/mask-group-2.png", alt: "Client 3" },
  { src: "/mask-group-3.png", alt: "Client 4" },
];

const words = [
  "Real Estate",
  "Marketing",
  "Care Services",
  "Freelancer",
  "Startup",
  "Fractional",
  "AI Services"
];

export default function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = words[index];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        const t = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          80
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), 2000);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), 0);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          45
        );
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [phase, displayed, index]);

  const showCursor = phase === "typing" || phase === "erasing";

  return (
    <section className="pb-10 md:pb-14 lg:pb-16">
      {/* ── Sticky Floating Navbar ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="sticky-nav"
            initial={{ y: -80, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="fixed left-0 right-0 z-40 flex justify-center bg-[#f0fcfb]"
          style={{
                // background: "linear-gradient(280.71deg, rgba(77, 255, 182, 0.08) 31.34%, rgba(67, 230, 191, 0.1) 39.85%, rgba(42, 168, 215, 0.08) 53.55%, rgba(26, 128, 231, 0.08) 78%)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.6)",
              }}
          >
            <div
              className="w-full max-w-[1320px] px-5 py-3 flex items-center justify-between"
              
            >
              {/* Logo */}
              <a href="/">
                <img
                  className="w-28 md:w-36 h-auto"
                  alt="Company Logo"
                  src="/images/logo.svg"
                />
              </a>

              {/* Nav links */}
              <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navigationItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <a
                      href={item.href}
                      className="ff-Graphik transition-colorsff-Graphik font-normal text-[#0e0e0f] text-sm tracking-[0] leading-normal whitespace-nowrap hover:text-[#00C48C] transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" className="px-4" asChild>
                <a href="https://dashboard.oneupai.com/login">Login</a>
              </Button>
              <Button variant="primary" size="md" asChild>
                <a href="https://dashboard.oneupai.com/onboard">Start free trial</a>
              </Button>
            </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-black p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mounted && mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Mobile dropdown for sticky nav */}
            <AnimatePresence>
              {mounted && mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[calc(100%+8px)] left-4 right-4 max-w-[1100px] mx-auto rounded-2xl shadow-xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  }}
                >
                  <ul className="flex flex-col gap-1 p-4">
                    {navigationItems.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="ff-Graphik font-normal text-black text-base leading-[100%] hover:text-[#00C48C] transition-colors block py-2.5 px-2 rounded-lg hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li className="flex flex-col gap-2 pt-3 mt-2 border-t border-gray-100">
                      <Button variant="ghost" className="w-full text-sm" asChild>
                        <a href="https://dashboard.oneupai.com/login">Login</a>
                      </Button>
                      <Button
                        className="px-4 py-2.5 bg-[#1a80e7] rounded-[100px] text-slate-50 text-sm w-full hover:bg-[#1570d0]"
                        asChild
                      >
                        <a href="https://dashboard.oneupai.com/onboard">Start free trial</a>
                      </Button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Original Header (stays in place) ── */}
      <div
        className="w-full rounded-b-[30px]"
        style={{
          background:
            "linear-gradient(280.71deg, rgba(77, 255, 182, 0.08) 31.34%, rgba(67, 230, 191, 0.08) 39.85%, rgba(42, 168, 215, 0.08) 53.55%, rgba(26, 128, 231, 0.08) 78%)",
        }}
      >
        <div className="w-full py-3 md:py-5 lg:py-6">
          {/* ── Nav ── */}
          <nav className="flex items-center justify-between max-w-[1320px] mx-auto lg:px-6 px-4">
            <a href="/">
              <img
                className="w-36 md:w-48 lg:w-[180px] h-auto"
                alt="Company Logo"
                src="/images/logo.svg"
              />
            </a>

            <ul className="hidden lg:flex items-center gap-6 xl:gap-[34px]">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="ff-Graphik font-normal text-black text-base tracking-[0] leading-[normal] whitespace-nowrap hover:text-[#00C48C] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" className="px-4" asChild>
                <a href="https://dashboard.oneupai.com/login">Login</a>
              </Button>
              <Button variant="primary" size="md" asChild>
                <a href="https://dashboard.oneupai.com/onboard">Start free trial</a>
              </Button>
            </div>

            <button
              className="md:hidden text-black p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mounted && mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>

          {/* ── Mobile menu (original) ── */}
          {mounted && mobileMenuOpen && !isScrolled && (
            <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
              <ul className="flex flex-col gap-4 p-4">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="ff-Graphik font-normal text-black text-[18px] md:text-[20px] tracking-[0] leading-[100%] hover:text-[#1a80e7] transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="flex flex-col gap-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    className="ff-Graphik font-normal text-black text-lg w-full"
                    asChild
                  >
                    <a href="https://dashboard.oneupai.com/login">Login</a>
                  </Button>
                  <Button
                    className="px-4 py-3 bg-[#1a80e7] rounded-[100px] text-slate-50 text-lg w-full hover:bg-[#1570d0]"
                    asChild
                  >
                    <a href="https://dashboard.oneupai.com/onboard">Start free trial</a>
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ── Hero ── */}
        <div className="relative px-4 max-w-[1320px] mx-auto pb-10 md:pb-8 pt-8 md:pt-8">
          <div className="hidden md:block absolute top-10 right-4 w-[100px] z-0">
            <img src={lineSvg} alt="" />
          </div>
          <div className="absolute bottom-[-25px] md:left-0 right-0 w-[150px] z-10">
            <img src={lineSvg} alt="" />
          </div>

          {/* ── Headline ── */}
          <div className="flex flex-col xl:max-w-5xl lg:max-w-4xl md:max-w-2xl">
            <h1 className="ff-jakarta font-[700] text-[#0e0e0f] xl:text-[50px] lg:text-[44px] md:text-[40px] text-[34px] leading-[120%] mb-5 md:mb-9">
              Get More Customers
              <br />
              <span>
                With Your <br className="md:hidden block" />
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <span style={{ color: "#00C48C", display: "inline-flex", alignItems: "center" }}>
                    {displayed}
                    {showCursor && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        style={{
                          display: "inline-block",
                          width: 3,
                          height: "0.8em",
                          background: "#00C48C",
                          marginLeft: 2,
                          borderRadius: 1,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </span>
                </span>
                {" "}Website
              </span>
              <br />
              <motion.span
                className="inline-block text-white -rotate-1"
                style={{
                  background: "#00C48C",
                  borderRadius: "12px",
                  paddingLeft: "0.3em",
                  paddingRight: "0.3em",
                  paddingTop: "0.05em",
                  paddingBottom: "0.1em",
                  marginTop: "0.1em",
                }}
              >
                That Works 24/7
              </motion.span>
            </h1>
            <p className="max-w-[700px] ff-Graphik font-normal text-[#1E293B] md:text-xl text-base leading-[24px] mb-8 md:mb-9">
              While you're busy with customers, your AI-ready website is answering questions, 
              taking deposits, and running your social media. {" "}
               <span className="block"> 
                No designers. No tech headaches.
                </span>
            </p>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-5 w-full gap-6 lg:gap-12 xl:gap-16">

            {/* Left 40% */}
            <div className="md:col-span-2 flex flex-col max-w-2xl w-full min-w-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 md:mb-14">
                <Button variant="primary" size="md" asChild>
                  <a href="https://dashboard.oneupai.com/onboard">
                    Start free trial
                  </a>
                </Button>
              </div>

              <div className="lg:mt-16">
                <p className="ff-Graphik font-medium text-[#1f1f1f] text-[11px] tracking-[0.8px] mb-3 uppercase">
                  OUR CLIENTS
                </p>

                <div className="flex items-center">
                  {clientAvatars.map((avatar, index) => (
                    <div key={`client-${index}`} className="relative -ml-3 first:ml-0">
                      <Avatar className="w-11 h-11 border-[3px] border-white shadow-sm">
                        <AvatarImage src={avatar.src} alt={avatar.alt} />
                        <AvatarFallback>{avatar.alt}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}

                  <div className="w-11 h-11 bg-[#fff8e7] rounded-full border-[2px] border-dashed border-[#ffc848] flex items-center justify-center -ml-3 relative shadow-sm">
                    <span className="text-base font-semibold text-[#ffc848]"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 60% */}
            <div className="order-1 md:order-2 md:col-span-3 w-full min-w-0 relative">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 relative">
                <div className="w-full max-w-full">
                  <img
                    className="w-full h-auto object-contain rounded-lg"
                    alt="Professional working"
                    src="/before.webp"
                  />
                </div>
                <div className="w-full max-w-full md:relative md:-top-[200px]">
                  <img
                    className="w-full h-auto object-contain rounded-lg"
                    alt="Professional writing"
                    src="/after.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}