"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { huayraData } from "@/data/carData";

const easing = [0.16, 1, 0.3, 1] as const;

export function SpecsGrid() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="specs"
      ref={ref}
      className="overflow-hidden bg-white px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14">
          <div className="mb-5 h-px w-24 bg-pagani-red" />
          <p
            className="text-[11px] font-black tracking-[0.28em] text-pagani-red sm:text-xs sm:tracking-[0.34em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            TECHNICAL DATA
          </p>
          <h2
            className="mt-4 max-w-4xl text-[2rem] font-black leading-[1.05] text-near-black sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            PERFORMANCE{" "}
            <span className="text-pagani-red">SPECIFICATIONS</span>
          </h2>
        </div>

        <div className="grid gap-px bg-border-gray sm:grid-cols-2 lg:grid-cols-4">
          {huayraData.specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ y: 28, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : undefined}
              transition={{
                delay: index * 0.08,
                duration: 0.7,
                ease: easing,
              }}
              className="group relative min-h-40 overflow-hidden border border-border-gray bg-white p-5 transition-colors hover:border-pagani-red sm:p-7"
            >
              <p
                className="text-sm font-semibold tracking-[0.18em] text-mid-gray"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {spec.label}
              </p>
              <p
                className="mt-7 text-3xl font-black text-near-black transition-colors group-hover:text-pagani-red sm:mt-8 sm:text-4xl"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {spec.value}
              </p>
              <p
                className="mt-2 text-xs font-black tracking-[0.18em] text-mid-gray sm:text-sm sm:tracking-[0.24em]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {spec.unit}
              </p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-pagani-red transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
