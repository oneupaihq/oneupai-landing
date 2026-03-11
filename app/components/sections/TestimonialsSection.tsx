"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    quote:
      "OneUpAI transformed my business completely. I went from chasing cold leads to having qualified prospects book calls automatically. The AI agent works 24/7 and never misses an opportunity.",
    name: "Sarah Johnson",
    role: "Senior Real Estate Agent",
    avatar: "/mask-group.png",
    initials: "SJ",
  },
  {
    quote:
      "The AI handles all our client intake and case updates seamlessly. Cases focus on practicing law instead of administrative tasks. It's like having a 24/7 paralegal assistant.",
    name: "Michael Chen",
    role: "Managing Partner",
    avatar: "/mask-group-1.png",
    initials: "MC",
  },
  {
    quote:
      "Support and cart recovery run on complete autopilot now. Revenue is up significantly and I can focus on product development instead of customer service. Game changer for e-commerce.",
    name: "Emily Rodriguez",
    role: "Founder & CEO",
    avatar: "/mask-group-2.png",
    initials: "ER",
  },
];

const lineSvg = "/images/waves-line.svg";

export default function TestimonialsSection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto play effect
  useEffect(() => {
    if (!mounted || !isAutoPlay) return;

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, totalSlides]);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      setTouchStart(e.targetTouches[0].clientX);
      setIsAutoPlay(false);
    }
  };

  // Handle touch end
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0] && touchStart !== null) {
      const touchEndPos = e.changedTouches[0].clientX;
      const distance = touchStart - touchEndPos;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setTouchStart(null);
      setIsAutoPlay(true);
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
    setIsAutoPlay(false);
  };

  // Handle mouse up
  const handleMouseUp = (e: React.MouseEvent) => {
    if (touchStart !== null) {
      const touchEndPos = e.clientX;
      const distance = touchStart - touchEndPos;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe) {
        nextSlide();
      } else if (isRightSwipe) {
        prevSlide();
      }

      setTouchStart(null);
      setIsAutoPlay(true);
    }
  };

  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 bg-[#2AA8D71A] overflow-hidden">
      <div className="px-4 md:px-8 relative z-10">
        <div className="lg:block hidden absolute bottom-[-40px] right-48 w-[150px] z-10">
          <img src={lineSvg} alt="" />
        </div>
        <div className="flex flex-col items-center gap-5 max-w-[700px] mx-auto mb-12 md:mb-16">
          <Badge variant="outline">Client Success Stories</Badge>
          <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[100%]">
            Real Results. Real Businesses.
          </h2>
        </div>

        <div
          className="relative max-w-[1100px] mx-auto z-20"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <div className="overflow-hidden pb-3">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full flex gap-5 md:gap-6 px-4 md:px-0"
                >
                  {testimonials
                    .slice(
                      slideIndex * itemsPerView,
                      (slideIndex + 1) * itemsPerView
                    )
                    .map((testimonial, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex-1 min-w-0"
                        style={{
                          width: `${100 / itemsPerView}%`,
                        }}
                      >
                        <Card className="bg-white rounded-[20px] border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                          <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full">
                            <div className="mb-6">
                              <p className="ff-Graphik font-normal text-slate-700 text-base md:text-lg leading-relaxed">
                                "{testimonial.quote}"
                              </p>
                            </div>

                            <div className="flex items-center gap-4">
                              <Avatar className="w-12 h-12">
                                <AvatarImage
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                />
                                <AvatarFallback className="bg-[#1a80e7] text-white ff-jakarta font-semibold">
                                  {testimonial.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="ff-jakarta font-bold text-[#0e0e0f] text-base md:text-lg">
                                  {testimonial.name}
                                </h3>
                                <p className="ff-Graphik font-normal text-slate-600 text-sm">
                                  {testimonial.role}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <div className="inline-flex justify-center items-center space-x-3 border border-[#00000033] py-3.5 px-7 rounded-full bg-white/90">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-[#1A80E7] w-[12px] h-[12px]"
                      : "bg-[#D9D9D9] w-[12px] h-[12px] hover:bg-[#B0B0B0]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}