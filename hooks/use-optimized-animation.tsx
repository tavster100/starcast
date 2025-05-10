"use client"

import { useEffect, useState, useRef } from "react"

interface OptimizedAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}

export function useOptimizedAnimation(options: OptimizedAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true, delay = 0 } = options
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries

      if (entry.isIntersecting) {
        if (delay > 0) {
          timerRef.current = setTimeout(() => {
            setIsVisible(true)
            if (once) setHasAnimated(true)
          }, delay)
        } else {
          setIsVisible(true)
          if (once) setHasAnimated(true)
        }
      } else if (!once && !hasAnimated) {
        setIsVisible(false)
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, once, delay, hasAnimated])

  return { ref, isVisible }
}
