"use client"

import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface PerformanceOptions {
  reduceMotion?: boolean
  reduceAnimations?: boolean
  reduceEffects?: boolean
}

export function usePerformanceMode(options: PerformanceOptions = {}) {
  const { reduceMotion = true, reduceAnimations = true, reduceEffects = true } = options
  const isMobile = useMobile()
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Detectează preferința pentru reducerea mișcării
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    }
  }, [])

  useEffect(() => {
    // Detectează dispozitive de performanță scăzută
    if (typeof window !== "undefined" && "deviceMemory" in navigator) {
      // @ts-ignore
      const lowMemory = navigator.deviceMemory < 4
      setIsLowEndDevice(lowMemory)
    }

    // Detectează modul de economisire a bateriei (iOS)
    if (typeof window !== "undefined" && "getBattery" in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery) => {
        setIsLowPowerMode(!battery.charging && battery.level < 0.2)

        const handleChange = () => {
          setIsLowPowerMode(!battery.charging && battery.level < 0.2)
        }

        battery.addEventListener("levelchange", handleChange)
        battery.addEventListener("chargingchange", handleChange)

        return () => {
          battery.removeEventListener("levelchange", handleChange)
          battery.removeEventListener("chargingchange", handleChange)
        }
      })
    }
  }, [])

  // Calculează modul de performanță
  const shouldReduceMotion = reduceMotion && (prefersReducedMotion || isLowPowerMode)
  const shouldReduceAnimations = reduceAnimations && (isMobile || isLowEndDevice || isLowPowerMode)
  const shouldReduceEffects = reduceEffects && (isLowEndDevice || isLowPowerMode)

  return {
    shouldReduceMotion,
    shouldReduceAnimations,
    shouldReduceEffects,
    isLowPowerMode,
    prefersReducedMotion,
    isLowEndDevice,
  }
}
