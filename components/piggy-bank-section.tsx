"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PiggyBankSection() {
  const [showPrize, setShowPrize] = useState(false);

  return (
    <section className="relative overflow-hidden p-4">
      <motion.div
        className="container px-4 md:px-6 relative z-10"
        animate={{
          y: [0, -5, 0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-black/60 to-pink-900/40 border border-pink-500/30 shadow-2xl">
            {/* 🔥 Modern animated background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-700 to-red-500 animate-background-blur opacity-70 mix-blend-screen blur-2xl rounded-3xl"></div>
            </div>

            {/* Content area */}
            <div className="relative z-10 flex flex-col items-center justify-center p-10 md:p-12 backdrop-blur-sm space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Scanează codul QR <br /> Intră în Echipa!
              </h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-pink-500/30 rounded-full filter blur-xl"></div>

                <div className="relative z-10 w-120 h-120 md:w-120 md:h-120">
                  <img
                    src="/images/qr-code.png"
                    alt="creator-qr-code"
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🎁 Prize Dialog */}
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
              Ai deblocat un discount special de 25% pentru primul tău abonament
              StarCast!
            </p>
            <p className="text-center font-bold text-xl bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Codul tău: STARPRIZE25
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
