"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()

  // Ascunde indicatorul după ce utilizatorul a scrollat puțin
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 100 && isVisible) {
        setIsVisible(false)
      } else if (latest <= 100 && !isVisible) {
        setIsVisible(true)
      }
    })

    return () => unsubscribe()
  }, [scrollY, isVisible])

  // Animație pentru indicatorul de scroll
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <motion.div
      style={{ opacity }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none md:hidden"
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <div className="text-white/70 text-xs mb-2">Scroll</div>
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
          <ChevronDown className="h-5 w-5 text-white/70" />
        </div>
      </motion.div>
    </motion.div>
  )
}
