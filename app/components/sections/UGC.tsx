'use client'

import { useState, useRef, useEffect, TouchEvent, MouseEvent, useCallback } from 'react'
import { Badge } from '../ui/badge';

interface Testimonial {
  id: number;
  image: string;
  name: string;
  title: string;
  location: string;
  quote: string;
  videoUrl: string;
}

const testimonials: Testimonial[] = [
  { 
    id: 1,
    image: "/images/ugc1.png",
    name: "María Fernanda López", 
    title: "Consultora de Marketing",
    location: "México",
    quote: "Tenía miedo de la tecnología, pero iademy me enseñó que la IA puede ser mi mejor aliada. Ahora automatizo tareas que antes me tomaban horas y tengo más tiempo para mis clientes.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  { 
    id: 2,
    image: "/images/ugc2.png", 
    name: "Carolina Restrepo", 
    title: "Coach de Vida",
    location: "Colombia",
    quote: "La comunidad es increíble. No solo aprendí a usar ChatGPT para mi negocio, sino que encontré amigas y colaboradoras que me inspiran cada día.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  { 
    id: 3,
    image: "/images/ugc3.png", 
    name: "Valentina Morales", 
    title: "Diseñadora Gráfica",
    location: "Chile",
    quote: "Antes pasaba horas creando contenido. Ahora, con las herramientas que aprendí en iademy, produzco el doble en la mitad del tiempo. Mi negocio creció un 40% en tres meses.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  { 
    id: 4,
    image: "/images/ugc1.png",
    name: "Luciana García",
    title: "Wellness Coach",
    location: "Argentina",
    quote: "Lo que más valoro es que explican todo sin hacerte sentir perdida. Es educación de calidad con corazón.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  { 
    id: 5,
    image: "/images/ugc2.png", 
    name: "Ana Martínez", 
    title: "Emprendedora Digital",
    location: "España",
    quote: "iademy transformó completamente mi forma de trabajar. Ahora soy más productiva y eficiente.",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  }
]

export default function UGC() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true)
  
  // Swipe gesture state
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragOffset, setDragOffset] = useState<number>(0)
  const [dragStartX, setDragStartX] = useState<number>(0)
  
  const videoRefs = useRef<HTMLVideoElement[]>([])
  const mobileContainerRef = useRef<HTMLDivElement>(null)
  const desktopContainerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Minimum swipe distance (px) to trigger slide change
  const minSwipeDistance = 50

  // Initialize video refs
  useEffect(() => {
    setMounted(true)
    videoRefs.current = videoRefs.current.slice(0, testimonials.length)
  }, [])

  // Auto play effect for mobile
  useEffect(() => {
    if (!mounted || !isAutoPlay || isTransitioning) return

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    autoPlayRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change slide every 5 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlay, isTransitioning])

  // Stop and reset any playing video
  const stopPlayingVideo = useCallback(() => {
    if (playingVideoId !== null) {
      const currentIndex = testimonials.findIndex(t => t.id === playingVideoId)
      const currentVideo = videoRefs.current[currentIndex]
      if (currentVideo) {
        currentVideo.pause()
        currentVideo.currentTime = 0
      }
      setPlayingVideoId(null)
    }
  }, [playingVideoId])

  const handlePlayPause = (id: number, globalIndex: number) => {
    const currentVideo = videoRefs.current[globalIndex]
    
    if (!currentVideo) return
    
    // Pause autoplay when user interacts with video
    setIsAutoPlay(false)
    
    if (playingVideoId === id) {
      // Pause currently playing video
      currentVideo.pause()
      setPlayingVideoId(null)
    } else {
      // Pause any other playing video
      if (playingVideoId !== null) {
        const previousPlayingIndex = testimonials.findIndex(t => t.id === playingVideoId)
        const previousVideo = videoRefs.current[previousPlayingIndex]
        if (previousVideo) {
          previousVideo.pause()
          previousVideo.currentTime = 0
        }
      }
      
      // Play new video
      currentVideo.play()
      setPlayingVideoId(id)
    }
  }

  const handleVideoEnd = (id: number) => {
    if (playingVideoId === id) {
      setPlayingVideoId(null)
      const currentIndex = testimonials.findIndex(t => t.id === id)
      const currentVideo = videoRefs.current[currentIndex]
      if (currentVideo) {
        currentVideo.currentTime = 0
      }
      // Resume autoplay after video ends
      setIsAutoPlay(true)
    }
  }

  // Mobile navigation - smooth and direct
  const nextMobileSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    stopPlayingVideo()
    
    const newSlide = (activeSlide + 1) % testimonials.length
    setActiveSlide(newSlide)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlay(true)
    }, 600)
  }, [activeSlide, isTransitioning, stopPlayingVideo])

  const prevMobileSlide = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    stopPlayingVideo()
    
    const newSlide = (activeSlide - 1 + testimonials.length) % testimonials.length
    setActiveSlide(newSlide)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlay(true)
    }, 600)
  }, [activeSlide, isTransitioning, stopPlayingVideo])

  const goToMobileSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeSlide) return
    
    setIsTransitioning(true)
    stopPlayingVideo()
    
    setActiveSlide(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlay(true)
    }, 600)
  }, [activeSlide, isTransitioning, stopPlayingVideo])

  // Desktop navigation - smooth and direct
  const nextDesktopSlide = useCallback(() => {
    if (isTransitioning || testimonials.length <= 3) return
    
    setIsTransitioning(true)
    stopPlayingVideo()
    
    const newSlide = (activeSlide + 1) % (testimonials.length - 2)
    setActiveSlide(newSlide)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlay(true)
    }, 600)
  }, [activeSlide, isTransitioning, stopPlayingVideo])

  const prevDesktopSlide = useCallback(() => {
    if (isTransitioning || testimonials.length <= 3) return
    
    setIsTransitioning(true)
    stopPlayingVideo()
    
    const newSlide = (activeSlide - 1 + (testimonials.length - 2)) % (testimonials.length - 2)
    setActiveSlide(newSlide)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlay(true)
    }, 600)
  }, [activeSlide, isTransitioning, stopPlayingVideo])

  const goToDesktopSlide = useCallback((index: number) => {
    if (isTransitioning || index === activeSlide || testimonials.length <= 3) return
    
    setIsTransitioning(true)
    stopPlayingVideo()
    
    setActiveSlide(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlay(true)
    }, 600)
  }, [activeSlide, isTransitioning, stopPlayingVideo])

  // Touch event handlers for mobile with proper null checks
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isTransitioning) return
    setTouchEndX(null)
    setIsAutoPlay(false)
    const touch = e.touches[0] || e.changedTouches[0]
    if (touch) {
      setTouchStartX(touch.clientX)
    }
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStartX) return
    const touch = e.touches[0] || e.changedTouches[0]
    if (touch) {
      setTouchEndX(touch.clientX)
    }
  }

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX || !touchEndX) {
      setTouchStartX(null)
      setTouchEndX(null)
      return
    }
    
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        nextMobileSlide()
      } else {
        nextDesktopSlide()
      }
    }
    
    if (isRightSwipe) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        prevMobileSlide()
      } else {
        prevDesktopSlide()
      }
    }
    
    // Reset touch state
    setTouchStartX(null)
    setTouchEndX(null)
  }, [touchStartX, touchEndX, nextMobileSlide, prevMobileSlide, nextDesktopSlide, prevDesktopSlide])

  // Mouse event handlers for desktop
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isTransitioning) return
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragOffset(0)
    setIsAutoPlay(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || isTransitioning) return
    
    const currentX = e.clientX
    const offset = dragStartX - currentX
    setDragOffset(offset)
  }

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    const isLeftSwipe = dragOffset > minSwipeDistance
    const isRightSwipe = dragOffset < -minSwipeDistance
    
    if (isLeftSwipe) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        nextMobileSlide()
      } else {
        nextDesktopSlide()
      }
    }
    
    if (isRightSwipe) {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        prevMobileSlide()
      } else {
        prevDesktopSlide()
      }
    }
    
    // Reset drag state
    setDragOffset(0)
    setDragStartX(0)
  }, [isDragging, dragOffset, nextMobileSlide, prevMobileSlide, nextDesktopSlide, prevDesktopSlide])

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      setDragOffset(0)
      setDragStartX(0)
      setIsAutoPlay(true)
    }
  }

  // Get visible testimonials based on active slide (for desktop)
  const getVisibleDesktopTestimonials = () => {
    if (testimonials.length <= 3) {
      return testimonials.slice(0, 3)
    }
    // Ensure we don't go out of bounds
    const startIndex = Math.min(activeSlide, testimonials.length - 3)
    return testimonials.slice(startIndex, startIndex + 3)
  }

  // Get current testimonial (for mobile)
  const getCurrentTestimonial = () => {
    return testimonials[activeSlide]
  }

  // Get global index for a testimonial
  const getGlobalIndex = (id: number) => {
    return testimonials.findIndex(t => t.id === id)
  }

  const currentTestimonial = getCurrentTestimonial()

  // Calculate transform for drag effect
  const mobileTransform = isDragging && typeof window !== 'undefined' && window.innerWidth < 768 ? `translateX(${-dragOffset * 0.2}px)` : 'none'
  const desktopTransform = isDragging && typeof window !== 'undefined' && window.innerWidth >= 768 ? `translateX(${-dragOffset * 0.1}px)` : 'none'

  return (
    <section id="testimonials" className="relative w-full pt-12 md:py-16 lg:py-20">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        
        {/* Header Section - Same for both mobile and desktop */}
        <div className="flex flex-col items-center gap-4 max-w-[648px] mx-auto mb-12 md:mb-16">
            <Badge
              variant="outline" className="px-4"
            >
              Customer Stories
            </Badge>
            <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[100%]">
              Real Users. Real Results.
            </h2>
          </div>

        {/* MOBILE VERSION - Single Slide Full Width with Swipe */}
        <div className="md:hidden">
          <div className="relative mb-6">
            {/* Mobile Testimonial Card - Single Slide Full Width with Touch Events */}
            {currentTestimonial && (
              <div 
                ref={mobileContainerRef}
                className="bg-[#EAF6FB] shadow-[2px_4px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-[20px] relative w-full cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                style={{ 
                  transform: mobileTransform,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                <div className="h-[380px] w-full relative group">
                  <div className="absolute bg-white h-full left-0 rounded-2xl shadow-lg top-0 w-full group-hover:shadow-xl transition-shadow duration-300" />
                  
                  {/* Video Container */}
                  <div className="absolute h-full left-0 rounded-2xl top-0 w-full overflow-hidden">
                    {/* Video Element */}
                    <video
                      ref={el => {
                        if (el && activeSlide >= 0 && activeSlide < testimonials.length) {
                          videoRefs.current[activeSlide] = el
                        }
                      }}
                      className="w-full h-full object-cover bg-black"
                      poster={currentTestimonial.image}
                      onEnded={() => handleVideoEnd(currentTestimonial.id)}
                      controls={playingVideoId === currentTestimonial.id}
                      preload="metadata"
                    >
                      <source src={currentTestimonial.videoUrl} type="video/mp4" />
                      Tu navegador no soporta videos HTML5.
                    </video>
                    
                    {/* Gradient Overlay - Only show when video is not playing */}
                    {playingVideoId !== currentTestimonial.id && (
                      <div className="absolute bg-gradient-to-b from-transparent via-black/20 to-black/70 inset-0 rounded-2xl" />
                    )}
                    
                    {/* Play/Pause Button Overlay */}
                    {playingVideoId !== currentTestimonial.id && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                        onClick={() => handlePlayPause(currentTestimonial.id, activeSlide)}
                      >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-2xl" />
                        <div className="relative z-10">
                          <div className="bg-white/30 rounded-full p-3 md:p-4 group-hover:scale-110 transition-transform duration-200">
                            <svg 
                              width="50" 
                              height="52" 
                              viewBox="0 0 100 105" 
                              fill="none" 
                            >
                              <path 
                                opacity="0.8" 
                                d="M50 0C22.3856 0 0 23.4883 0 52.4632C0 81.438 22.3856 104.926 50 104.926C77.6144 104.926 100 81.438 100 52.4632C100 23.4883 77.6144 0 50 0ZM69.1678 54.367L41.9878 70.8323C40.59 71.6787 38.8444 70.6212 38.8444 68.9284V35.9979C38.8444 34.3051 40.5911 33.2465 41.9878 34.0929L69.1667 50.5582C70.5644 51.4046 70.5644 53.5206 69.1678 54.367Z" 
                                fill="#F8FAFC"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pause Overlay when video is playing */}
                    {playingVideoId === currentTestimonial.id && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
                        onClick={() => handlePlayPause(currentTestimonial.id, activeSlide)}
                      >
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 bg-black/50 rounded-full p-3 hover:scale-110 transition-transform">
                          <svg 
                            width="30" 
                            height="30" 
                            viewBox="0 0 24 24" 
                            fill="white"
                          >
                            <rect x="6" y="5" width="4" height="14" />
                            <rect x="14" y="5" width="4" height="14" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center items-center mt-8 space-x-3">
              <div className='inline-flex justify-center items-center space-x-3 border border-[#00000033] py-3.5 px-7 rounded-full bg-white/90'>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToMobileSlide(index)}
                    disabled={isTransitioning || index === activeSlide}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeSlide 
                        ? 'bg-[#1A80E7] w-[12px] h-[12px]' 
                        : 'bg-[#D9D9D9] w-[12px] h-[12px] hover:bg-[#B0B0B0]'
                    } disabled:cursor-not-allowed`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP VERSION - 3 Columns with Drag */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Desktop Grid with Drag Events */}
            <div 
              ref={desktopContainerRef}
              className={`grid md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 transition-opacity duration-400 ${isTransitioning ? 'opacity-75' : 'opacity-100'} cursor-grab active:cursor-grabbing`}
              style={{ 
                transform: desktopTransform,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {getVisibleDesktopTestimonials().map((testimonial) => {
                const globalIndex = getGlobalIndex(testimonial.id)
                
                return (
                  <div className='bg-[#EAF6FB] shadow-[2px_4px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-[20px]' key={testimonial.id}> 
                    <div className="h-[380px] md:h-[400px] lg:h-[480px] w-full relative group">
                      <div className="absolute bg-white h-full left-0 rounded-2xl md:rounded-3xl shadow-lg top-0 w-full group-hover:shadow-xl transition-shadow duration-300" />
                      
                      {/* Video Container */}
                      <div className="absolute h-full left-0 rounded-2xl md:rounded-3xl top-0 w-full overflow-hidden">
                        {/* Video Element */}
                        <video
                          ref={el => {
                            if (el && globalIndex >= 0 && globalIndex < testimonials.length) {
                              videoRefs.current[globalIndex] = el
                            }
                          }}
                          className="w-full h-full object-cover bg-black"
                          poster={testimonial.image}
                          onEnded={() => handleVideoEnd(testimonial.id)}
                          controls={playingVideoId === testimonial.id}
                          preload="metadata"
                        >
                          <source src={testimonial.videoUrl} type="video/mp4" />
                          Tu navegador no soporta videos HTML5.
                        </video>
                        
                        {/* Gradient Overlay - Only show when video is not playing */}
                        {playingVideoId !== testimonial.id && (
                          <div className="absolute bg-gradient-to-b from-transparent via-black/20 to-black/70 inset-0 rounded-2xl md:rounded-3xl" />
                        )}
                        
                        {/* Play/Pause Button Overlay */}
                        {playingVideoId !== testimonial.id && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                            onClick={() => handlePlayPause(testimonial.id, globalIndex)}
                          >
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-2xl md:rounded-3xl" />
                            <div className="relative z-10">
                              <div className="bg-white/30 rounded-full p-3 md:p-4 group-hover:scale-110 transition-transform duration-200">
                                <svg 
                                  width="50" 
                                  height="52" 
                                  viewBox="0 0 100 105" 
                                  fill="none" 
                                >
                                  <path 
                                    opacity="0.8" 
                                    d="M50 0C22.3856 0 0 23.4883 0 52.4632C0 81.438 22.3856 104.926 50 104.926C77.6144 104.926 100 81.438 100 52.4632C100 23.4883 77.6144 0 50 0ZM69.1678 54.367L41.9878 70.8323C40.59 71.6787 38.8444 70.6212 38.8444 68.9284V35.9979C38.8444 34.3051 40.5911 33.2465 41.9878 34.0929L69.1667 50.5582C70.5644 51.4046 70.5644 53.5206 69.1678 54.367Z" 
                                    fill="#F8FAFC"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Pause Overlay when video is playing */}
                        {playingVideoId === testimonial.id && (
                          <div 
                            className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
                            onClick={() => handlePlayPause(testimonial.id, globalIndex)}
                          >
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="relative z-10 bg-black/50 rounded-full p-3 hover:scale-110 transition-transform">
                              <svg 
                                width="30" 
                                height="30" 
                                viewBox="0 0 24 24" 
                                fill="white"
                              >
                                <rect x="6" y="5" width="4" height="14" />
                                <rect x="14" y="5" width="4" height="14" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Desktop Navigation Dots */}
          {testimonials.length > 3 && (
            <div className="flex justify-center items-center mt-8 md:mt-10 lg:mt-12 space-x-3">
              <div className='inline-flex justify-center items-center space-x-3 border border-[#00000033] py-3.5 px-7 rounded-full bg-white/90'>
                {Array.from({ length: Math.max(1, testimonials.length - 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToDesktopSlide(index)}
                    disabled={isTransitioning || index === activeSlide}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeSlide 
                        ? 'bg-[#1A80E7] w-[12px] h-[12px]' 
                        : 'bg-[#D9D9D9] w-[12px] h-[12px] hover:bg-[#B0B0B0]'
                    } disabled:cursor-not-allowed`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}