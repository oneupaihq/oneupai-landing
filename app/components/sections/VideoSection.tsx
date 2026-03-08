'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '../ui/badge'

interface Video {
  id: number
  vimeoId: string
  title: string
  description: string
}

const videos: Video[] = [
  {
    id: 1,
    vimeoId: '1168985723',
    title: 'OneUpAI - AI Automation Built and Managed for You',
    description: 'AI automation, built and managed for you. Build your custom AI agent with OneUpAI.',
  },
]

const chatSvg = '/images/chat-ic.svg'

declare global {
  interface Window {
    Vimeo: {
      Player: new (el: HTMLIFrameElement, options?: object) => VimeoPlayer
    }
  }
}

interface VimeoPlayer {
  play: () => Promise<void>
  pause: () => Promise<void>
  on: (event: string, callback: () => void) => void
  off: (event: string) => void
}

export default function VideoSection() {
  const [activeSlide] = useState(0)
  const [hasClicked, setHasClicked] = useState(false) // facade: defer iframe until click
  const [isPlaying, setIsPlaying] = useState(false)
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)

  const video = videos[activeSlide]

  // Only load Vimeo SDK after user clicks — no cookies until then
  useEffect(() => {
    if (!hasClicked) return

    const existing = document.querySelector(
      'script[src*="player.vimeo.com/api/player.js"]'
    )
    if (existing) {
      if (window.Vimeo) setSdkLoaded(true)
      else existing.addEventListener('load', () => setSdkLoaded(true))
      return
    }

    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    script.onload = () => setSdkLoaded(true)
    document.head.appendChild(script)
  }, [hasClicked])

  // Init player after SDK loads and iframe is in DOM
  useEffect(() => {
    if (!sdkLoaded || !iframeRef.current) return

    const player = new window.Vimeo.Player(iframeRef.current)
    playerRef.current = player

    // Auto-play once the player is ready
    player.play().catch(() => {
      // Autoplay may be blocked; user can click native controls
    })

    player.on('play', () => setIsPlaying(true))
    player.on('pause', () => setIsPlaying(false))
    player.on('ended', () => setIsPlaying(false))
  }, [sdkLoaded])

  const handleOverlayClick = () => {
    if (!hasClicked) {
      // First click: mount the iframe (facade pattern)
      setHasClicked(true)
      return
    }
    // Subsequent clicks: toggle play/pause
    if (!playerRef.current) return
    isPlaying ? playerRef.current.pause() : playerRef.current.play()
  }

  // Vumbnail provides free Vimeo thumbnails without loading Vimeo's tracking scripts
  const thumbnailSrc = thumbnailError
    ? `/images/video-thumb.png` // fallback
    : `/images/video-thumb.png`

  return (
    <section className="w-full px-4 overflow-hidden">

      {/* Heading */}
      <div className="flex flex-col items-center gap-5 mb-12">
        <Badge variant="outline" className="md:px-10">
          Demo
        </Badge>
        <h2 className="max-w-[680px] mx-auto font-bold text-black md:text-[40px] text-[36px] text-center leading-[120%]">
          Is Your Website Helping You Get More Customers?
        </h2>
        <p className="max-w-[948px] mx-auto text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
          Answer a few questions about your business. OneUpAI builds your site, sets up your booking 
          calendar, and lets you promote your business and take on customers TODAY.
        </p>
      </div>

      {/* Video */}
      <div className="max-w-[1100px] mx-auto relative">

        {/* Chat decoration */}
        <div className="lg:block hidden absolute bottom-[125px] right-[-100px] w-[56px] z-10">
          <img src={chatSvg} className="w-full" alt="" />
        </div>

        <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-900 aspect-video w-full ring-0 border-0 outline-none">

          {hasClicked ? (
            /**
             * Vimeo iframe — only mounted after user clicks.
             * This prevents Vimeo from setting third-party cookies on page load,
             * which fixes the Lighthouse "Uses third-party cookies" warning.
             * autoplay=1 so video starts immediately after the facade is replaced.
             */
            <iframe
              ref={iframeRef}
              src={`https://player.vimeo.com/video/${video.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full bg-white"
              title={video.title}
            />
          ) : (
            /**
             * Facade: a static thumbnail + play button shown before the user clicks.
             * No Vimeo scripts or iframes are loaded at this stage — zero third-party cookies.
             */
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={handleOverlayClick}
              role="button"
              aria-label={`Play video: ${video.title}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOverlayClick()}
            >
              {/* Thumbnail */}
              <img
                src={thumbnailSrc}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setThumbnailError(true)}
                loading="lazy"
              />

              {/* Dark scrim */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Play button */}
              <div className="relative z-10 flex items-center justify-center md:w-20 md:h-20 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 md:border-t-[16px] md:border-b-[16px] border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent md:border-l-[28px] border-l-[14px] border-l-white md:ml-[5px] ml-[3px]" />
              </div>
            </div>
          )}

          {/* Toggle overlay shown after iframe loads (when not yet playing) */}
          {hasClicked && !isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10 bg-black/20 transition-opacity duration-300"
              onClick={handleOverlayClick}
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/40">
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '16px solid transparent',
                    borderBottom: '16px solid transparent',
                    borderLeft: '28px solid white',
                    marginLeft: '5px',
                  }}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}