"use client"

import { useRef, memo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { useIntersectionAnimation } from "@/hooks/use-intersection-animation"

// Memoized creator card component to prevent unnecessary re-renders
const CreatorCard = memo(({ creator, index }: { creator: any; index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
          },
        },
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="group relative overflow-hidden rounded-xl"
    >
      <div className="aspect-square overflow-hidden rounded-xl">
        <OptimizedImage src={creator.avatar} alt={creator.name} width={300} height={300} className="w-full h-full" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          className="transform transition-transform duration-300 group-hover:translate-y-0"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white">{creator.name}</h3>
              <p className="text-sm text-gray-300">{creator.handle}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {creator.followers}
            </motion.div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-300">{creator.category}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 text-white transition-all duration-300"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Vezi profil</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
})
CreatorCard.displayName = "CreatorCard"

export function FeaturedTalent() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const { ref: intersectionRef, isInView } = useIntersectionAnimation({ threshold: 0.1 })

  const creators = [
    {
      name: "Alex Rivera",
      handle: "@alex_creates",
      followers: "450K",
      avatar: "/images/creator-1.png",
      category: "Dans",
    },
    {
      name: "Mia Johnson",
      handle: "@mia_talks",
      followers: "320K",
      avatar: "/images/creator-2.png",
      category: "Lifestyle",
    },
    {
      name: "Jamal Williams",
      handle: "@jamal_music",
      followers: "280K",
      avatar: "/images/creator-3.png",
      category: "Muzică",
    },
    {
      name: "Sofia Chen",
      handle: "@sofia_beauty",
      followers: "510K",
      avatar: "/images/creator-4.png",
      category: "Frumusețe",
    },
    {
      name: "Tyler Brooks",
      handle: "@tyler_games",
      followers: "390K",
      avatar: "/images/creator-5.png",
      category: "Gaming",
    },
    {
      name: "Zoe Miller",
      handle: "@zoe_cooks",
      followers: "230K",
      avatar: "/images/creator-6.png",
      category: "Gătit",
    },
    {
      name: "Marcus Lee",
      handle: "@marcus_comedy",
      followers: "620K",
      avatar: "/images/creator-7.png",
      category: "Comedie",
    },
    {
      name: "Ava Patel",
      handle: "@ava_fashion",
      followers: "340K",
      avatar: "/images/creator-8.png",
      category: "Modă",
    },
  ]

  return (
    <section id="talent" className="py-20 bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none"
      >
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-pink-500/30 rounded-full filter blur-3xl"></div>
      </motion.div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Vedetele Noastre</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Alătură-te echipei noastre de creatori talentați care fac valuri pe TikTok Live
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
          ref={intersectionRef}
        >
          {creators.map((creator, index) => (
            <CreatorCard key={index} creator={creator} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
