"use client"

import { useState, useEffect } from "react"

interface ResourceLoadingOptions {
  priority?: boolean
  onLoad?: () => void
  onError?: (error: Error) => void
}

export function useResourceLoading(src: string, options: ResourceLoadingOptions = {}) {
  const { priority = false, onLoad, onError } = options
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setIsLoaded(false)
    setError(null)

    const loadResource = () => {
      // Pentru imagini
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/.test(src)) {
        const img = new Image()
        img.src = src
        img.onload = () => {
          setIsLoaded(true)
          setIsLoading(false)
          if (onLoad) onLoad()
        }
        img.onerror = (e) => {
          const err = new Error(`Failed to load image: ${src}`)
          setError(err)
          setIsLoading(false)
          if (onError) onError(err)
        }
        return
      }

      // Pentru videoclipuri
      if (/\.(mp4|webm|ogg)$/.test(src)) {
        const video = document.createElement("video")
        video.preload = priority ? "auto" : "metadata"
        video.src = src
        video.onloadeddata = () => {
          setIsLoaded(true)
          setIsLoading(false)
          if (onLoad) onLoad()
        }
        video.onerror = (e) => {
          const err = new Error(`Failed to load video: ${src}`)
          setError(err)
          setIsLoading(false)
          if (onError) onError(err)
        }
        return
      }

      // Pentru alte resurse
      fetch(src)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to load resource: ${src}`)
          }
          setIsLoaded(true)
          setIsLoading(false)
          if (onLoad) onLoad()
        })
        .catch((err) => {
          setError(err)
          setIsLoading(false)
          if (onError) onError(err)
        })
    }

    if (priority) {
      loadResource()
    } else {
      // Folosim requestIdleCallback pentru resurse non-prioritare
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        // @ts-ignore
        window.requestIdleCallback(loadResource)
      } else {
        setTimeout(loadResource, 200)
      }
    }
  }, [src, priority, onLoad, onError])

  return { isLoaded, isLoading, error }
}
