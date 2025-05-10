"use client"

import { useEffect, useRef, useState } from "react"
import { useMotionValue, useTransform } from "framer-motion"

interface IntersectionAnimationOptions {
  threshold?: number
  once?: boolean
  amount?: "some" | "all" | number
}

export function useIntersectionAnimation(options: IntersectionAnimationOptions = {}) {
  const { threshold = 0.1, once = true, amount = "some" } = options
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const scrollYProgress = useMotionValue(0)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)

        if (entry.isIntersecting) {
          scrollYProgress.set(1)
          if (once) {
            observer.unobserve(element)
          }
        } else {
          scrollYProgress.set(0)
        }
      },
      { threshold, rootMargin: "0px" },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [once, scrollYProgress, threshold])

  return { ref, isInView, scrollYProgress, opacity }
}
