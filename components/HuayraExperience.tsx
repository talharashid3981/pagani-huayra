"use client";

import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { huayraData } from "@/data/carData";

type HuayraExperienceProps = {
  scrollYProgress: MotionValue<number>;
};

const easing = [0.16, 1, 0.3, 1] as const;

const panelVariants = {
  initial: { y: 30, opacity: 0, filter: "blur(8px)" },
  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easing, staggerChildren: 0.08 },
  },
  exit: {
    y: -20,
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: easing },
  },
};

const itemVariants = {
  initial: { y: 16, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.55, ease: easing } },
};

export function HuayraExperience({ scrollYProgress }: HuayraExperienceProps) {
  const [activePhase, setActivePhase] = useState(0);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const value = scrollYProgress.get();
    setActivePhase(findActivePhase(value));
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActivePhase(findActivePhase(value));
  });

  const phase = huayraData.phases[activePhase];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 z-30 h-1 bg-pagani-red"
        style={{ width: progressWidth }}
      />

      <div className="absolute inset-x-5 bottom-8 z-20 sm:inset-x-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.id}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
          >
            <div className="min-h-28">
              {phase.id === "hero" && (
                <>
                  <motion.div
                    variants={itemVariants}
                    className="mb-2 h-px w-12 bg-pagani-red"
                  />
                  <motion.p
                    variants={itemVariants}
                    className="text-[11px] font-black tracking-[0.56em] text-pagani-red"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    HUAYRA BC
                  </motion.p>
                  <motion.h1
                    variants={itemVariants}
                    className="mt-2 max-w-[min(680px,88vw)] text-3xl font-black leading-[0.9] text-near-black sm:max-w-[70vw] sm:text-5xl lg:text-6xl"
                    style={{ fontFamily: "var(--font-orbitron)" }}
                  >
                    MACCHINA VOLANTE
                  </motion.h1>
                </>
              )}
            </div>

            <motion.div
              variants={itemVariants}
              className="mb-10 shrink-0 text-left sm:text-right"
            >
              <p
                className="text-xs font-black tracking-[0.52em] text-pagani-red sm:text-sm"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {getPhaseStatus(phase.id)}
              </p>
              <p
                className="mt-2 text-[11px] font-semibold tracking-[0.4em] text-light-gray"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                MODENA, ITALY · 2017
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function findActivePhase(value: number) {
  const index = huayraData.phases.findIndex((phase, phaseIndex) => {
    const [start, end] = phase.scrollRange;
    return phaseIndex === huayraData.phases.length - 1
      ? value >= start && value <= end
      : value >= start && value < end;
  });

  return index === -1 ? huayraData.phases.length - 1 : index;
}

function getPhaseStatus(id: string) {
  if (id === "hero") {
    return "CLOSED";
  }

  if (id === "exterior") {
    return "FORM";
  }

  if (id === "doors") {
    return "DOORS";
  }

  return "ENGINE";
}
