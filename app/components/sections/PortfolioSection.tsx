"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
const lineSvg = "/images/waves-line.svg";

const portfolioItems = [
  {
    image: "/services/fractional.webp",
    title: "Consultants and Coaches",
    description: "A clean page that drives discovery calls and consult bookings",
    templateUrl: "/fractional-ai-website-template",
  },
  {
    image: "/services/hvac.webp",
    title: "Home Services (HVAC/Plumbing)",
    description: "Quick \"call now,\" service areas, and quote requests",
    templateUrl: "/hvac-ai-website-template",
  },
  {
    image: "/services/lawn.webp",
    title: "Lawn Care and Landscaping",
    description: "Schedules, offerings, profiles, and membership-style sections",
    templateUrl: "/lawncare-ai-website-template",
  },
  {
    image: "/services/moving.webp",
    title: "Moving Services",
    description: "Showcase your moving services, get quotes, and build trust with potential clients",
    templateUrl: "/movers-ai-website-template",
  },
  {
    image: "/services/cleaning.webp",
    title: "Cleaning Services",
    description: "Professional cleaning services with easy booking and service packages",
    templateUrl: "/cleaning-ai-website-template",
  },
  {
    image: "/services/contractor.webp",
    title: "General Contractors",
    description: "Showcase projects, get quotes, and build trust with potential clients",
    templateUrl: "/contractor-ai-website-template",
  },
];

export default function PortfolioSection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Handle responsive items per view
 useEffect(() => {
  const handleResize = () => {
    let newItemsPerView = 3;
    if (window.innerWidth < 768) newItemsPerView = 1;
    else if (window.innerWidth < 1024) newItemsPerView = 2;

    setItemsPerView(newItemsPerView);
    setCurrentSlide(newItemsPerView); // ← ADD THIS LINE
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const itemsToShow = portfolioItems.length;
  const infiniteItems = [
    ...portfolioItems.slice(-itemsPerView),
    ...portfolioItems,
    ...portfolioItems.slice(0, itemsPerView),
  ];

  const startIndex = itemsPerView;

  const handleTransitionEnd = useCallback(() => {
    if (currentSlide === 0) {
      innerRef.current!.style.transition = "none";
      setCurrentSlide(itemsToShow);
      setTimeout(() => {
        innerRef.current!.style.transition = "transform 0.7s ease-out";
      }, 50);
    } else if (currentSlide === infiniteItems.length - itemsPerView) {
      innerRef.current!.style.transition = "none";
      setCurrentSlide(itemsPerView);
      setTimeout(() => {
        innerRef.current!.style.transition = "transform 0.7s ease-out";
      }, 50);
    }
  }, [currentSlide, infiniteItems.length, itemsToShow]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => prev - 1);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(startIndex + index);
  };

  useEffect(() => {
    if (!mounted || !isAutoPlay) return;

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, mounted]);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        innerRef.current?.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [handleTransitionEnd]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
      setIsAutoPlay(false);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0] && touchStart !== null) {
      const touchEndPos = e.changedTouches[0].clientX;
      const distance = touchStart - touchEndPos;
      if (distance > 50) nextSlide();
      else if (distance < -50) prevSlide();
      setTouchStart(null);
      setIsAutoPlay(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsAutoPlay(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      const distance = touchStart - e.clientX;
      if (distance > 50) nextSlide();
      else if (distance < -50) prevSlide();
      setTouchStart(null);
      setIsAutoPlay(true);
    }
  };

  const actualSlideIndex =
    ((currentSlide - startIndex) % itemsToShow + itemsToShow) % itemsToShow;

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-white">
      <div className="block md:hidden absolute top-[-25px] right-[-50px] w-[150px] z-10">
        <img src={lineSvg} className="w-full" alt="" />
      </div>
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center gap-3 max-w-[650px] mx-auto mb-12 md:mb-16">
          <Badge variant="outline">Portfolio</Badge>
          <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[100%] md:whitespace-nowrap">
            Good-Looking Sites That Fit Your Business
          </h2>
          <p className="ff-Graphik font-normal text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
            Every template is tailor-made for a specific business type. Pick 
            yours and your site is ready to go in minutes
          </p>
        </div> 

        <div className="relative">
          <div
            className="overflow-hidden pb-2"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div
              ref={innerRef}
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              }}
            >
              {infiniteItems.map((item, index) => (
                <div
                  key={index}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="flex-shrink-0 px-2 md:px-3 lg:px-5"
                >
                  <Card className="bg-gradient-to-br from-[#e8f7fb] to-[#d4f1f9] rounded-[30px] border-0 shadow-sm hover:shadow-md transition-shadow h-full group">
                    <CardContent className="p-4 md:p-6 lg:p-8 h-full flex flex-col justify-between">
                      <div>
                        {/* ── IMAGE CONTAINER ── */}
                        <div className="rounded-[15px] mb-4 md:mb-6 overflow-hidden relative h-[200px] md:h-[250px] lg:h-[300px] bg-[#f5f5f5]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={90}
                            className="object-cover object-top"
                            style={{
                              // GPU compositing — prevents sub-pixel blurring
                              transform: "translateZ(0)",
                              willChange: "transform",
                              backfaceVisibility: "hidden",
                              WebkitBackfaceVisibility: "hidden",
                            }}
                          />
                        </div>
                        {/* ── /IMAGE CONTAINER ── */}

                        <h3 className="ff-jakarta font-bold text-[#0E0E0F] text-lg lg:text-xl mb-3 leading-snug">
                          {item.title}
                        </h3>
                        <p className="ff-Graphik font-normal text-[#1E293B] md:text-base mb-3 md:mb-4 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex gap-2 md:gap-3">
                        <Button
                          variant="outline"
                          size="md"
                          className="flex-1 max-h-[42px] text-sm md:text-base"
                          asChild
                        >
                          <a href={item.templateUrl}>Preview Template</a>
                        </Button>
                        <Button
                          variant="primary"
                          size="md"
                          className="flex-1 max-h-[42px] text-sm md:text-base"
                          asChild
                        >
                          <a href="https://dashboard.oneupai.com/onboard">
                            Build Mine
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="inline-flex justify-center items-center space-x-3 border border-[#00000033] py-3.5 px-7 rounded-full bg-white/90">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all duration-300 ${
                  actualSlideIndex === index
                    ? "bg-[#1A80E7] w-[12px] h-[12px]"
                    : "bg-[#D9D9D9] w-[12px] h-[12px] hover:bg-[#B0B0B0]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}