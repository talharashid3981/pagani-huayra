"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { huayraData } from "@/data/carData";

const easing = [0.16, 1, 0.3, 1] as const;

export function FeaturesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="features"
      ref={ref}
      className="overflow-hidden bg-white px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14">
          <p
            className="text-[11px] font-black tracking-[0.26em] text-pagani-red sm:text-xs sm:tracking-[0.34em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            ENGINEERING EXCELLENCE
          </p>
          <h2
            className="mt-4 text-[2rem] font-black leading-[1.05] text-near-black sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            DEFINING <span className="text-pagani-red">FEATURES</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {huayraData.features.map((feature, index) => (
            <motion.article
              key={feature.number}
              initial={{ y: 32, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                delay: index * 0.1,
                duration: 0.75,
                ease: easing,
              }}
              className="group border-l-2 border-pagani-red bg-white p-5 transition-colors hover:bg-[#FFF5F5] sm:p-8"
            >
              <p
                className="text-xs font-black tracking-[0.24em] text-pagani-red sm:text-sm sm:tracking-[0.28em]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {feature.number}
              </p>
              <h3
                className="mt-6 text-xl font-black leading-tight text-near-black transition-colors group-hover:text-pagani-red sm:mt-8 sm:text-3xl"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-4 max-w-xl text-base font-medium leading-7 text-mid-gray sm:mt-5 sm:text-lg"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
