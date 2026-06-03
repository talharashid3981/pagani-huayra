"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { huayraData } from "@/data/carData";
import { cn } from "@/lib/utils";

const navTargets: Record<string, string> = {
  STORY: "#story",
  SPECS: "#specs",
  FEATURES: "#features",
  CONTACT: "#contact",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("STORY");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const features = document.getElementById("features");
      const specs = document.getElementById("specs");
      if (features && window.scrollY >= features.offsetTop - 180) {
        setActive("FEATURES");
      } else if (specs && window.scrollY >= specs.offsetTop - 180) {
        setActive("SPECS");
      } else {
        setActive("STORY");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed left-0 top-0 z-50 w-full border-b transition-all duration-500",
        scrolled
          ? "border-border-gray bg-white/72 shadow-sm backdrop-blur-xl"
          : "border-white/30 bg-white/58 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-10 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#story" className="flex items-center gap-3">
          <span
            className="grid size-6 place-items-center border border-pagani-red bg-white text-xs font-black text-pagani-red"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            P
          </span>
          <span className="leading-none">
            <span
              className="block text-[11px] font-black tracking-[0.28em] text-near-black"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {huayraData.brand}
            </span>
            <span
              className="block text-[9px] font-semibold tracking-[0.24em] text-pagani-red"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              {huayraData.model}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {huayraData.navLinks.map((link) => (
            <a
              key={link}
              href={navTargets[link]}
              className={cn(
                "group relative text-[10px] font-bold tracking-[0.28em] transition-colors",
                active === link ? "text-pagani-red" : "text-near-black",
              )}
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {link}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-pagani-red transition-all duration-300",
                  active === link ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="bg-pagani-red px-5 py-2 text-[10px] font-black tracking-[0.2em] text-white transition-colors hover:bg-pagani-red-bright"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          INQUIRE
        </a>
      </nav>
    </motion.header>
  );
}
