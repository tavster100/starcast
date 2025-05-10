"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoneyPiggyBank } from "@/components/money-piggy-bank"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function PiggyBankSection() {
  const [showPrize, setShowPrize] = useState(false)

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 border border-pink-500/30 shadow-2xl">
            {/* Fire animation container */}
            <div className="absolute inset-0 overflow-hidden opacity-80">
              {/* Multiple fire elements positioned around the container */}
              <FireElement className="absolute -bottom-8 left-1/4 w-32 h-32 rotate-0" />
              <FireElement className="absolute -bottom-8 right-1/4 w-32 h-32 rotate-0" />
              <FireElement className="absolute -bottom-8 left-1/2 w-40 h-40 -translate-x-1/2 rotate-0" />
              <FireElement className="absolute -left-8 top-1/2 w-32 h-32 -translate-y-1/2 rotate-90" />
              <FireElement className="absolute -right-8 top-1/2 w-32 h-32 -translate-y-1/2 -rotate-90" />
            </div>

            {/* Content with backdrop blur for better readability */}
            <div className="relative z-10 p-8 md:p-12 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-4">
                  Descoperă Premiul Ascuns!
                </h2>
                <p className="text-lg text-white max-w-2xl mx-auto">
                  Apasă pe pușculiță de 10 ori pentru a debloca un discount special pentru abonamentul tău StarCast!
                </p>
              </motion.div>

              <div className="flex justify-center items-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="relative"
                >
                  {/* Glowing effect behind the piggy bank */}
                  <div className="absolute inset-0 bg-pink-500/30 rounded-full filter blur-xl"></div>

                  {/* Piggy bank component */}
                  <div className="relative z-10 scale-125">
                    <MoneyPiggyBank onPrize={() => setShowPrize(true)} />
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-white/80 text-sm mt-4"
              >
                Fiecare click te aduce mai aproape de premiul special!
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Prize Dialog */}
      <Dialog open={showPrize} onOpenChange={setShowPrize}>
        <DialogContent className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-lg border-pink-500">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
              Felicitări! Ai câștigat un premiu!
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, type: "spring" }}
              className="text-6xl mb-4"
            >
              🎁
            </motion.div>
            <p className="text-center text-white mb-4">
              Ai deblocat un discount special de 25% pentru primul tău abonament StarCast!
            </p>
            <p className="text-center font-bold text-xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Codul tău: STARPRIZE25
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Fire animation component
function FireElement({ className }: { className?: string }) {
  return (
    <div className={className}>
      <motion.div
        className="w-full h-full"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{
          scale: [0.8, 1.1, 0.9, 1.2, 0.8],
          opacity: [0.7, 0.9, 0.8, 0.9, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="w-full h-full relative">
          {/* Multiple flame layers for a more realistic effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-yellow-500 to-transparent rounded-full filter blur-md"></div>
          <div className="absolute inset-2 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full filter blur-sm"></div>
          <div className="absolute inset-4 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full opacity-80"></div>

          {/* Inner glow */}
          <div className="absolute inset-0 bg-white/20 rounded-full filter blur-xl opacity-50"></div>
        </div>
      </motion.div>
    </div>
  )
}
