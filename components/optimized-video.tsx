"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedVideoProps {
  src: string
  poster?: string
  className?: string
  priority?: boolean
}

export function OptimizedVideo({ src, poster, className, priority = false }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    observer.observe(videoRef.current)

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!videoRef.current) return

    if (isVisible) {
      if (priority) {
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked, handle silently
        })
      } else {
        // Delay loading for non-priority videos
        const timer = setTimeout(() => {
          videoRef.current?.play().catch(() => {
            // Autoplay might be blocked, handle silently
          })
        }, 100)
        return () => clearTimeout(timer)
      }
    } else {
      videoRef.current.pause()
    }
  }, [isVisible, priority])

  return (
    <video
      ref={videoRef}
      className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
      poster={poster}
      playsInline
      muted
      loop
      autoPlay={priority}
      preload={priority ? "auto" : "metadata"}
      onLoadedData={() => setIsLoaded(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
