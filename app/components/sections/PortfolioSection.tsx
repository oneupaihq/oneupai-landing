"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";

const lineSvg = "/images/waves-line.svg";

const portfolioItems = [
  {
    image: "/services/fraction.png",
    title: "Consultants and Coaches",
    templateUrl: "/fractional-ai-website-template",
  },
  {
    image: "/services/hvac.webp",
    title: "Home Services (HVAC/Plumbing)",
    templateUrl: "/hvac-ai-website-template",
  },
  {
    image: "/services/lawn.webp",
    title: "Lawn Care and Landscaping",
    templateUrl: "/lawncare-ai-website-template",
  },
  {
    image: "/services/moving.webp",
    title: "Moving Services",
    templateUrl: "/movers-ai-website-template",
  },
  {
    image: "/services/cleaning.webp",
    title: "Cleaning Services",
    templateUrl: "/cleaning-ai-website-template",
  },
  {
    image: "/services/contractor.webp",
    title: "General Contractors",
    templateUrl: "/contractor-ai-website-template",
  },
];

const VISIBLE_COUNT = 6;
const TOTAL = portfolioItems.length;

// ─── Desktop Grid ─────────────────────────────────────────────────────────────
function DesktopGrid() {
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT);
  const visible = portfolioItems.slice(0, visibleCount);
  const hasMore = visibleCount < portfolioItems.length;

  const loadMore = () => setVisibleCount((prev) => prev + VISIBLE_COUNT);

  return (
    <div>
      <div className="grid grid-cols-3 gap-8 lg:gap-10">
        {visible.map((item, index) => (
          <a
            key={index}
            href={item.templateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block cursor-pointer"
          >
            {/* thumbnail */}
            <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-[#f0f0f0] shadow-md group-hover:shadow-xl transition-shadow duration-300">
              <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={90}
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            style={{
                              // GPU compositing — prevents sub-pixel blurring
                              // transform: "translateZ(0)",
                              willChange: "transform",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                            }}
                          />
              {/* <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1320px) 33vw, 440px"
                quality={90}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              /> */}
              {/* hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0e0e0f] text-sm font-semibold px-5 py-2.5 rounded-full shadow-md">
                  Preview Template →
                </span>
              </div>
            </div>

            {/* title + free label */}
            <div className="mt-4 px-4 flex items-center justify-between">
              <h4 className="ff-jakarta font-semibold text-[#0e0e0f] text-[18px] leading-snug">
                {item.title}
              </h4>
              {/* <span className="text-[14px] text-[#64748b] ff-Graphik">Free</span> */}
            </div>
          </a>
        ))}
      </div>

      {/* "See More Templates" — shows next 6 on every click */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <Button
            variant="primary"
            size="md"
            onClick={loadMore}
            className="px-8"
          >
            See More Templates
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Slider ────────────────────────────────────────────────────────────
function MobileSlider() {
  const itemsPerView = 1;
  const [currentSlide, setCurrentSlide] = useState(itemsPerView);
  const innerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isJumping = useRef(false);
  const dragStart = useRef<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const infiniteItems = useMemo(
    () => [
      ...portfolioItems.slice(-itemsPerView),
      ...portfolioItems,
      ...portfolioItems.slice(0, itemsPerView),
    ],
    []
  );

  const actualDotIndex =
    ((currentSlide - itemsPerView) % TOTAL + TOTAL) % TOTAL;

  const nextSlide = useCallback(() => setCurrentSlide((p) => p + 1), []);
  const prevSlide = useCallback(() => setCurrentSlide((p) => p - 1), []);
  const goToSlide = (index: number) => setCurrentSlide(itemsPerView + index);

  const handleTransitionEnd = useCallback(() => {
    if (isJumping.current) return;
    const inner = innerRef.current;
    if (!inner) return;

    if (currentSlide >= infiniteItems.length - itemsPerView) {
      isJumping.current = true;
      inner.style.transition = "none";
      setCurrentSlide(itemsPerView);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          inner.style.transition = "transform 0.7s ease-out";
          isJumping.current = false;
        })
      );
    } else if (currentSlide <= 0) {
      isJumping.current = true;
      inner.style.transition = "none";
      setCurrentSlide(TOTAL);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          inner.style.transition = "transform 0.7s ease-out";
          isJumping.current = false;
        })
      );
    }
  }, [currentSlide, infiniteItems.length]);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.addEventListener("transitionend", handleTransitionEnd);
    return () => inner.removeEventListener("transitionend", handleTransitionEnd);
  }, [handleTransitionEnd]);

  useEffect(() => {
    if (!isAutoPlay) return;
    autoPlayRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, nextSlide]);

  const onDragStart = (clientX: number) => {
    dragStart.current = clientX;
    setIsAutoPlay(false);
  };
  const onDragEnd = (clientX: number) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    dragStart.current = null;
    setIsAutoPlay(true);
  };

  const handleNavClick = (dir: "prev" | "next") => {
    setIsAutoPlay(false);
    dir === "next" ? nextSlide() : prevSlide();
    // resume autoplay after 6 s of inactivity
    setTimeout(() => setIsAutoPlay(true), 6000);
  };

  return (
    <div className="relative">
      {/* ── slider track ── */}
      <div
        className="overflow-hidden rounded-[20px]"
        onTouchStart={(e) => onDragStart(e.targetTouches[0]!.clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0]!.clientX)}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div
          ref={innerRef}
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {infiniteItems.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full px-1">
              <a
                href={item.templateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* taller image on mobile — aspect-[4/3] */}
                <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-[#f0f0f0] shadow-md">
                  <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="100vw"
                            quality={90}
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            style={{
                              // GPU compositing — prevents sub-pixel blurring
                              // transform: "translateZ(0)",
                              willChange: "transform",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                            }}
                          />
                  {/* tap overlay */}
                  <div className="absolute inset-0 bg-black/0 active:bg-black/15 transition-colors duration-200" />
                </div>

                <div className="mt-4 px-1 flex items-center justify-between">
                  <p className="ff-jakarta font-semibold text-[#0e0e0f] text-[16px] leading-snug">
                    {item.title}
                  </p>
                  <span className="text-[13px] text-[#64748b] ff-Graphik">Free</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── bottom controls: prev · dots · next ── */}
      <div className="flex items-center justify-between mt-6 px-1">
        {/* prev button */}
        <button
          onClick={() => handleNavClick("prev")}
          aria-label="Previous template"
          className="w-10 h-10 rounded-full border border-[#00000022] bg-white shadow-sm flex items-center justify-center text-[#0e0e0f] hover:bg-[#1a80e7] hover:text-white hover:border-[#1a80e7] transition-all duration-300 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* dots */}
        <div className="inline-flex items-center space-x-2.5 border border-[#00000022] py-2.5 px-5 rounded-full bg-white shadow-sm">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                actualDotIndex === index
                  ? "bg-[#1A80E7] w-[10px] h-[10px]"
                  : "bg-[#D9D9D9] w-[8px] h-[8px] hover:bg-[#B0B0B0]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* next button */}
        <button
          onClick={() => handleNavClick("next")}
          aria-label="Next template"
          className="w-10 h-10 rounded-full border border-[#00000022] bg-white shadow-sm flex items-center justify-center text-[#0e0e0f] hover:bg-[#1a80e7] hover:text-white hover:border-[#1a80e7] transition-all duration-300 active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function PortfolioSection() {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-white">
      {/* decorative line – mobile only */}
      <div className="block md:hidden absolute top-[-25px] right-[-50px] w-[150px] z-10">
        <img src={lineSvg} className="w-full" alt="" />
      </div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
        {/* heading */}
        <div className="flex flex-col items-center gap-3 max-w-[650px] mx-auto mb-12 md:mb-16">
          <Badge variant="outline">Portfolio</Badge>
          <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[120%] md:whitespace-nowrap">
            Good-Looking Sites That Fit Your Business
          </h2>
          <p className="ff-Graphik font-normal text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
            Every template is tailor-made for a specific business type. Pick
            yours and your site is ready to go in minutes
          </p>
        </div>

        {/* desktop: clean grid */}
        <div className="hidden md:block pb-8">
          <DesktopGrid />
        </div>

        {/* mobile: infinite slider */}
        <div className="block md:hidden">
          <MobileSlider />
        </div>
      </div>
    </section>
  );
}