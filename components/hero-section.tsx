"use client";

import type React from "react";

import { useState, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { Star, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SignupForm, type FormMode } from "@/components/signup-form";
import { useMobile } from "@/hooks/use-mobile";
import { OptimizedVideo } from "@/components/optimized-video";

// Memoized floating element component to prevent unnecessary re-renders
const FloatingElement = memo(
  ({
    className,
    children,
  }: {
    className: string;
    children: React.ReactNode;
  }) => {
    return <div className={className}>{children}</div>;
  }
);
FloatingElement.displayName = "FloatingElement";

export function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("signup");
  const ref = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const openForm = (mode: FormMode) => {
    setFormMode(mode);
    setIsFormOpen(true);
  };

  // Variante de animație pentru elementele mobile
  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <motion.section
        ref={ref}
        style={{ opacity, scale }}
        className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Video Background with Overlay - Optimized */}
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src="/videos/tiktok-live-bg.mp4"
            priority={true}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 "></div>
        </div>

        {/* TikTok UI Overlays - Floating elements - Optimizate pentru mobil */}
        {!isMobile && (
          <>
            <FloatingElement className="absolute top-1/4 right-20 animate-float-slow hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-glow">
                <div className="flex items-center gap-2">
                  <div className="text-white text-sm">❤️ Tap Tap</div>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement className="absolute bottom-1/4 left-20 animate-float hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-glow">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div className="text-white text-sm">1.2k cadouri</div>
                </div>
              </div>
            </FloatingElement>

            <FloatingElement className="absolute top-1/4 left-1/4 animate-float-slow hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-glow">
                <div className="flex items-center gap-2">
                  <div className="text-white text-sm">🔥 Devine viral!</div>
                </div>
              </div>
            </FloatingElement>
          </>
        )}

        {/* Hero Content - Optimizat pentru mobil și performanță */}
        <motion.div
          style={{ y }}
          className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-6 md:space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="flex items-center justify-center w-full mx-auto"
          >
            <img
              src="/images/logo.png"
              alt="StarCast Logo"
              className={
                isMobile
                  ? "w-25 h-25 object-contain"
                  : "w-[14rem] h-[14rem] object-contain"
              }
            />
          </motion.div>

          <motion.h1
            custom={0}
            variants={isMobile ? mobileItemVariants : {}}
            initial={isMobile ? "hidden" : { opacity: 0, y: 20 }}
            animate={isMobile ? "visible" : { opacity: 1, y: 0 }}
            transition={!isMobile ? { delay: 0.4, duration: 0.8 } : {}}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white max-w-3xl"
          >
            Aici începe drumul spre influență și profit
          </motion.h1>

          <motion.p
            custom={1}
            variants={isMobile ? mobileItemVariants : {}}
            initial={isMobile ? "hidden" : { opacity: 0, y: 20 }}
            animate={isMobile ? "visible" : { opacity: 1, y: 0 }}
            transition={!isMobile ? { delay: 0.6, duration: 0.8 } : {}}
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl"
          >
            Transformăm talente noi în vedete pe TikTok Live <br></br>Alătură-te
            rețelei de creatori construită pentru noua generație.
          </motion.p>

          <motion.div
            custom={2}
            variants={isMobile ? mobileItemVariants : {}}
            initial={isMobile ? "hidden" : { opacity: 0, y: 20 }}
            animate={isMobile ? "visible" : { opacity: 1, y: 0 }}
            transition={!isMobile ? { delay: 0.8, duration: 0.8 } : {}}
            className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-8 w-full sm:w-auto"
          >
            <Button
              size={isMobile ? "default" : "lg"}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300 hover:shadow-glow transform hover:scale-105"
              onClick={() => openForm("signup")}
            >
              🌟 Alătură-te StarCast
            </Button>
            <Button
              variant="outline"
              size={isMobile ? "default" : "lg"}
              className="w-full sm:w-auto border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              onClick={() => openForm("consultation")}
            >
              <Play className="mr-2 h-4 w-4" /> Vezi Cum Funcționează
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
      </motion.section>

      {/* Formular de înscriere/consultație */}
      <SignupForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
      />
    </>
  );
}
