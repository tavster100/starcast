"use client"

import { Users, TrendingUp, DollarSign, Headphones, Users2 } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function AboutStarCast() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  const features = [
    {
      icon: <Users className="h-8 w-8 md:h-10 md:w-10 text-blue-500" />,
      title: "Integrare Personalizată pentru Creatori",
      description: "Strategie adaptată stilului tău unic și publicului țintă",
    },
    {
      icon: <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-pink-500" />,
      title: "Strategie de Creștere pe TikTok Live",
      description: "Metode bazate pe date pentru a-ți mări audiența în direct",
    },
    {
      icon: <DollarSign className="h-8 w-8 md:h-10 md:w-10 text-purple-500" />,
      title: "Instrumente de Monetizare și Analiză",
      description: "Transformă-ți pasiunea în profit cu sistemele noastre verificate",
    },
    {
      icon: <Headphones className="h-8 w-8 md:h-10 md:w-10 text-blue-500" />,
      title: "Mentori Dedicați pentru Live",
      description: "Coaching personalizat de la creatori TikTok Live cu experiență",
    },
    {
      icon: <Users2 className="h-8 w-8 md:h-10 md:w-10 text-pink-500" />,
      title: "Comunitate de Creatori de Top",
      description: "Conectează-te cu o rețea de vedete în ascensiune cu aceeași viziune",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.15 : 0.1,
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
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section
      id="about"
      className="py-16 md:py-20 bg-gradient-to-b from-background to-background/95 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter">Ce Face StarCast Unic</h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-glow"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                className="mb-4 p-3 rounded-full bg-white/5"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-base md:text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-xs md:text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
