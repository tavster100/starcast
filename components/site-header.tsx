"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { SignupForm, type FormMode } from "@/components/signup-form";
import { MobileMenu } from "@/components/mobile-menu";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function SiteHeader() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("signup");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Detectează scroll-ul pentru a schimba stilul header-ului
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const openForm = (mode: FormMode) => {
    setFormMode(mode);
    setIsFormOpen(true);
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-white/10 bg-[#181433] backdrop-blur-lg supports-[backdrop-filter]:bg-[#181433]"
            : "border-transparent bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="StarCast Logo"
                className="h-16 w-16"
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium transition-colors relative group"
            >
              Despre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium  transition-colors relative group"
            >
              Testimoniale
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#talent"
              className="text-sm font-medium  transition-colors relative group"
            >
              Talente
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium  transition-colors relative group"
            >
              Cum Funcționează
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                onClick={() => openForm("consultation")}
              >
                Discută cu un Manager de Talente
              </Button>
            </div>

            <div className="hidden md:block">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all duration-300 hover:shadow-glow"
                onClick={() => openForm("signup")}
              >
                Alătură-te StarCast
              </Button>
            </div>

            <MobileMenu onOpenForm={openForm} />
          </div>
        </div>
      </motion.header>

      {/* Formular de înscriere/consultație */}
      <SignupForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        mode={formMode}
      />
    </>
  );
}
