"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Verifică dacă suntem pe client
    if (typeof window === "undefined") return

    // Funcție pentru a verifica dacă ecranul este mobil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verifică inițial
    checkMobile()

    // Adaugă event listener pentru redimensionare
    window.addEventListener("resize", checkMobile)

    // Curăță event listener-ul
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
