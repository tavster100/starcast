"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SignupForm, type FormMode } from "@/components/signup-form";

export function CTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("signup");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const openForm = (mode: FormMode) => {
    setFormMode(mode);
    setIsFormOpen(true);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <motion.div
        ref={ref}
        style={{ scale, opacity }}
        className="container px-4 md:px-6"
      >
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 10,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 15,
                ease: "easeInOut",
              }}
              className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full filter blur-3xl"
            ></motion.div>
            <motion.div
              animate={{
                x: [0, 15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 12,
                ease: "easeInOut",
              }}
              className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"
            ></motion.div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center py-16 px-4 md:py-24 md:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 max-w-2xl"
            >
              Devino Următoarea Vedetă Live
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
            >
              Alătură-te sutelor de creatori care își construiesc carierele și
              conectează cu publicul prin TikTok Live
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 hover:shadow-glow"
                  onClick={() =>
                    window.open("https://www.tiktok.com/t/ZMSejhb62/", "_blank")
                  }
                >
                  ✨ Înscrie-te Acum
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
                  onClick={() => openForm("consultation")}
                >
                  Vorbește cu un Manager de Talente
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Formular de înscriere/consultație */}
      <SignupForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
      />
    </section>
  );
}
