"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Star, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FormMode } from "@/components/signup-form"

interface MobileMenuProps {
  onOpenForm: (mode: FormMode) => void
}

export function MobileMenu({ onOpenForm }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Dezactivează scroll-ul când meniul este deschis
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  const handleOpenForm = (mode: FormMode) => {
    closeMenu()
    onOpenForm(mode)
  }

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  const menuItems = [
    { href: "#about", label: "Despre" },
    { href: "#testimonials", label: "Testimoniale" },
    { href: "#talent", label: "Talente" },
    { href: "#how-it-works", label: "Cum Funcționează" },
  ]

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300"
        aria-label="Meniu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={closeMenu}
          >
            <motion.div
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-gray-900 to-black border-l border-white/10 p-6 shadow-xl"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                  <Star className="h-6 w-6 text-pink-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                    StarCast
                  </span>
                </Link>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Închide meniul"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 mb-8">
                {menuItems.map((item, index) => (
                  <motion.div key={index} variants={itemVariants} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors relative group flex items-center"
                      onClick={closeMenu}
                    >
                      <span className="absolute left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-4">
                <motion.div variants={itemVariants} className="w-full">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all duration-300 hover:shadow-glow"
                    onClick={() => handleOpenForm("signup")}
                  >
                    Alătură-te StarCast
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants} className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                    onClick={() => handleOpenForm("consultation")}
                  >
                    Discută cu un Manager
                  </Button>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="absolute bottom-8 left-0 right-0 px-6">
                <div className="flex justify-center space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Star className="h-5 w-5" />
                    </motion.div>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Star className="h-5 w-5" />
                    </motion.div>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                      <Star className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
