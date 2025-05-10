import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StarCast - Agenție TikTok Live",
  description:
    "Transformăm talente în creștere în vedete live pe TikTok — alătură-te rețelei de creatori construită pentru noua generație.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" className="dark">
      <head>
        <link rel="preload" href="/videos/tiktok-live-bg.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/images/tiktok-live-poster.png" as="image" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').then(
                  (registration) => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  },
                  (err) => {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
