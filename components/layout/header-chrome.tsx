"use client";

import { useEffect, useState } from "react";

import { ScrollProgress } from "@/components/layout/scroll-progress";
import { cn } from "@/lib/utils";

/**
 * Fixed header shell that tightens once the page scrolls: the backdrop
 * fades in and the bar loses a few pixels of height. State lives here so
 * the navbar itself stays a server component.
 */
export function HeaderChrome({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group/header fixed inset-x-0 top-0 z-50 transition-[height] duration-500 ease-out-expo"
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 border-b border-line bg-white/85 backdrop-blur-xl transition-[box-shadow] duration-500",
          scrolled && "shadow-[0_8px_30px_-16px_rgb(16_24_40/0.25)]",
        )}
      />
      {children}
      <ScrollProgress />
    </header>
  );
}
