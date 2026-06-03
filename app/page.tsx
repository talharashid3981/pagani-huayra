"use client";

import Lenis from "@studio-freight/lenis";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { HuayraExperience } from "@/components/HuayraExperience";
import { HuayraScrollCanvas } from "@/components/HuayraScrollCanvas";
import { Navbar } from "@/components/Navbar";
import { SpecsGrid } from "@/components/SpecsGrid";

export default function Home() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [sequenceLoaded, setSequenceLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main id="story" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      <section
        ref={containerRef}
        className="pt-0"
        style={{ height: "600vh", position: "relative" }}
      >
        <div className="sticky top-10 h-[calc(110vh-3.5rem)] w-full overflow-hidden">
          <HuayraScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={120}
            imageFolderPath="/images"
            filePattern="ezgif"
            horizontalScale={1}
            verticalScale={1}
            topSafeArea={12}
            bottomSafeArea={10}
            verticalOffset={24}
            engineVerticalOffset={64}
            onLoadedChange={setSequenceLoaded}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 15%, transparent 80%, rgba(255,255,255,0.7) 100%)",
            }}
          />
          {sequenceLoaded && (
            <HuayraExperience scrollYProgress={scrollYProgress} />
          )}
        </div>
      </section>

      <AnimatePresence>
        {!sequenceLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] grid place-items-center bg-white"
          >
            <div className="w-64 text-center">
              <p
                className="mb-4 text-xs font-black tracking-[0.34em] text-pagani-red"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                LOADING
              </p>
              <div className="h-px w-full overflow-hidden bg-border-gray">
                <motion.div
                  className="h-px w-1/2 bg-pagani-red"
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="-mt-px"
        style={{
          position: "relative",
          zIndex: 20,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 72px, #FFFFFF 100%)",
        }}
      >
        <SpecsGrid />
        <FeaturesSection />
        <Footer />
      </div>
    </main>
  );
}
