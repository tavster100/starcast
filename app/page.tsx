import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Componente critice încărcate imediat
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollIndicator } from "@/components/scroll-indicator"

// Componente încărcate lazy
const AboutStarCast = dynamic(() => import("@/components/about-starcast").then((mod) => mod.AboutStarCast), {
  loading: () => <LoadingSection />,
})

const TestimonialCarousel = dynamic(
  () => import("@/components/testimonial-carousel").then((mod) => mod.TestimonialCarousel),
  {
    loading: () => <LoadingSection />,
  },
)

const PiggyBankSection = dynamic(() => import("@/components/piggy-bank-section").then((mod) => mod.PiggyBankSection), {
  loading: () => <LoadingSection />,
})

const FeaturedTalent = dynamic(() => import("@/components/featured-talent").then((mod) => mod.FeaturedTalent), {
  loading: () => <LoadingSection />,
})

const HowItWorks = dynamic(() => import("@/components/how-it-works").then((mod) => mod.HowItWorks), {
  loading: () => <LoadingSection />,
})

const CTASection = dynamic(() => import("@/components/cta-section").then((mod) => mod.CTASection), {
  loading: () => <LoadingSection />,
})

const Footer = dynamic(() => import("@/components/footer").then((mod) => mod.Footer), {
  loading: () => <LoadingSection height="h-20" />,
})

const FallbackSuccess = dynamic(() => import("@/components/fallback-success").then((mod) => mod.FallbackSuccess))

function LoadingSection({ height = "h-64" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex items-center justify-center`}>
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <AnimatedBackground />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <Suspense fallback={<LoadingSection />}>
          <AboutStarCast />
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <TestimonialCarousel />
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <PiggyBankSection />
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <FeaturedTalent />
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <CTASection />
        </Suspense>
      </main>

      <Suspense fallback={<LoadingSection height="h-20" />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <FallbackSuccess />
      </Suspense>

      <ScrollIndicator />
    </div>
  )
}
