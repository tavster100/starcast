"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        quality={85}
        priority={priority}
        sizes={sizes}
        onLoadingComplete={() => setIsLoading(false)}
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
        )}
      />
    </div>
  )
}
