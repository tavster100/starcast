"use client";

import { useEffect } from "react";

import { useState, useRef, memo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OptimizedImage } from "@/components/optimized-image";
import { useIntersectionAnimation } from "@/hooks/use-intersection-animation";

// Memoized testimonial component to prevent unnecessary re-renders
const TestimonialCard = memo(
  ({ quote, author, followers, avatar, direction }: any) => {
    const variants = {
      enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
      }),
    };

    return (
      <motion.div
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute w-full"
      >
        <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-pink-500/10 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mb-6 relative"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500">
                  <OptimizedImage
                    src={avatar}
                    alt={author}
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full p-1">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl font-medium mb-4"
              >
                "{quote}"
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="font-bold text-lg bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">
                  {author}
                </p>
                <p className="text-sm text-gray-400">{followers}</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { ref, isInView } = useIntersectionAnimation({ threshold: 0.2 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      quote:
        "StarCast mi-a oferit un sistem care chiar funcționează. Mi-am dublat numărul de spectatori în doar 2 săptămâni.",
      author: "@LenaCast",
      followers: "145K urmăritori",
      avatar: "/images/tiktok-creator.png",
    },
    {
      quote: "În sfârșit o agenție care pune creatorul pe primul loc.",
      author: "@JayLive",
      followers: "90K urmăritori",
      avatar: "/images/tiktok-creator.png",
    },
    {
      quote:
        "Transmisiunile mele live au crescut de la 50 la peste 1.000 de spectatori într-o singură lună cu strategiile StarCast.",
      author: "@MikaBeats",
      followers: "120K urmăritori",
      avatar: "/images/tiktok-creator.png",
    },
    {
      quote:
        "Programul de mentorat a schimbat totul pentru mine. Acum câștig un venit full-time din TikTok Live.",
      author: "@DanceWithAlex",
      followers: "200K urmăritori",
      avatar: "/images/tiktok-creator.png",
    },
  ];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // Optimizare: Pornește/oprește autoplay doar când secțiunea este vizibilă
  useEffect(() => {
    if (isInView) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, nextSlide]);

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-background/95 to-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Poveștile Creatorilor de Succes
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="overflow-hidden">
            <div className="relative h-[350px] md:h-[300px]">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <TestimonialCard
                  key={activeIndex}
                  {...testimonials[activeIndex]}
                  direction={direction}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-500 to-pink-500 w-4"
                      : "bg-gray-600"
                  }`}
                  aria-label={`Mergi la slide-ul ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:border-transparent transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Următor</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
