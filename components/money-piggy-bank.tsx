"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DollarSign } from "lucide-react"

interface MoneyPiggyBankProps {
  onPrize: () => void
}

export function MoneyPiggyBank({ onPrize }: MoneyPiggyBankProps) {
  const [clickCount, setClickCount] = useState(0)
  const [moneyParticles, setMoneyParticles] = useState<{ id: number; x: number; y: number; rotation: number }[]>([])
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    // Increment click count
    const newCount = clickCount + 1
    setClickCount(newCount)

    // Rotate the piggy bank 45 degrees each time
    setRotation(rotation + 45)

    // Add money particles
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Create new particles
      const newParticles = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 100,
        rotation: Math.random() * 360,
      }))

      setMoneyParticles((prev) => [...prev, ...newParticles])

      // Remove particles after animation
      setTimeout(() => {
        setMoneyParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
      }, 2000)
    }

    // Check if we've reached 10 clicks
    if (newCount === 10) {
      // Create a burst of money
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Create a burst of particles
        const burstParticles = Array.from({ length: 30 }, (_, i) => ({
          id: Date.now() + i + 1000,
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
          rotation: Math.random() * 360,
        }))

        setMoneyParticles((prev) => [...prev, ...burstParticles])

        // Reset after showing prize
        setTimeout(() => {
          onPrize()
          setClickCount(0)
          setRotation(0)
          setMoneyParticles([])
        }, 2000)
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-32 h-32 cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      {/* Money particles */}
      <AnimatePresence>
        {moneyParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 1,
              rotate: particle.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 font-bold"
          >
            <DollarSign className="w-6 h-6 text-green-500" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 3D Piggy Bank */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-24 h-24 transform-style-3d">
          {/* Piggy Bank Body */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-lg transform-gpu transition-all duration-300 flex items-center justify-center"
            style={{ transform: "translateZ(0px)" }}
          >
            {/* Piggy Bank Features */}
            <div className="relative w-full h-full">
              {/* Ears */}
              <div className="absolute top-0 left-2 w-4 h-4 bg-pink-300 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute top-0 right-2 w-4 h-4 bg-pink-300 rounded-full transform -translate-y-1/2"></div>

              {/* Eyes */}
              <div className="absolute top-6 left-6 w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="absolute top-6 right-6 w-2 h-2 bg-gray-800 rounded-full"></div>

              {/* Nose */}
              <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-5 h-3 bg-pink-300 rounded-full"></div>

              {/* Coin Slot */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Shadow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-black/20 rounded-full blur-sm"></div>

          {/* Click Counter */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
            <span className="text-xs">{clickCount}/10</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
