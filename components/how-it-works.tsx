"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ClipboardCheck, Users, Star } from "lucide-react"

export function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const steps = [
    {
      icon: <ClipboardCheck className="h-12 w-12 text-blue-500" />,
      title: "Înscrie-te în Comunitatea StarCast",
      description: "Completează formularul nostru simplu și spune-ne despre conținutul și obiectivele tale.",
    },
    {
      icon: <Users className="h-12 w-12 text-pink-500" />,
      title: "Întâlnește Managerul Tău Personal",
      description: "Vei fi conectat cu un expert care înțelege perfect nișa și publicul tău.",
    },
    {
      icon: <Star className="h-12 w-12 text-purple-500" />,
      title: "Devino Vedetă pe TikTok Live",
      description: "Implementează strategiile noastre și vezi cum cresc audiența și veniturile tale.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  }

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-background/95 to-background relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl"></div>
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Cum Funcționează</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Procesul nostru simplu în 3 pași pentru a-ți transforma prezența pe TikTok Live
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.2 }}
                    className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10"
                  >
                    {step.icon}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 + index * 0.2 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 flex items-center justify-center text-white font-bold"
                  >
                    {index + 1}
                  </motion.div>
                </div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  className="text-xl font-bold mb-3"
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                  className="text-gray-400"
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
