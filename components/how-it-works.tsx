"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardCheck, Users, Star } from "lucide-react";

export function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const steps = [
    {
      icon: <ClipboardCheck className="h-12 w-12 text-blue-500" />,
      title: "Înscrie-te în Comunitatea StarCast",
      description: (
        <>
          Scanează <span className="text-pink-500 font-semibold">Codul QR</span>{" "}
          sau aplică direct pe butonul{" "}
          <span className="text-pink-500 font-semibold">Aplică Acum</span>
        </>
      ),
    },
    {
      icon: <Users className="h-12 w-12 text-pink-500" />,
      title: "Întâlnește Managerul Tău Personal",
      description:
        "Vei fi conectat cu un expert care înțelege perfect nișa și publicul tău.",
    },
    {
      icon: <Star className="h-12 w-12 text-purple-500" />,
      title: "Devino Vedetă pe TikTok Live",
      description:
        "Implementează strategiile noastre și vezi cum cresc audiența și veniturile tale.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-background/95 to-background relative overflow-hidden"
    >
      {/* Optional: Subtle motion background circle */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full"></div>
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Cum Funcționează
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Procesul nostru simplu în 3 pași pentru a-ți transforma prezența pe
            TikTok Live
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="relative mb-6">
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-pink-500/10 border border-white/10">
                  {step.icon}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
