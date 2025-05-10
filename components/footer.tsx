"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { TikTokIcon } from "@/components/tiktok-icon"
import { motion } from "framer-motion"

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container px-4 md:px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Star className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                StarCast
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">Transformăm talente în creștere în vedete live pe TikTok.</p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <TikTokIcon className="h-5 w-5" />
                  <span className="sr-only">TikTok</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-medium mb-4">Companie</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Despre Noi
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cariere
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Întrebări Frecvente
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-medium mb-4">Resurse</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Ghiduri pentru Creatori
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Povești de Succes
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Evenimente
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-medium mb-4">Rămâi Conectat</h3>
            <p className="text-sm text-gray-400 mb-4">Primește cele mai noi actualizări și sfaturi pentru creatori</p>
            <form className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Adresa ta de email"
                  className="bg-white/5 border-white/10 focus:border-pink-500 transition-all duration-300"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all duration-300 hover:shadow-glow"
                  >
                    Abonează-te
                  </Button>
                </motion.div>
              </div>
              <p className="text-xs text-gray-500">
                Prin abonare, ești de acord cu Termenii și Politica noastră de Confidențialitate.
              </p>
            </form>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} StarCast. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Termeni și Condiții
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Politica de Confidențialitate
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
