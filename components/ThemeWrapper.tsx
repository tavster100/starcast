"use client";
import { useState, useEffect } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent mismatch on initial render
  }

  return <>{children}</>;
}
