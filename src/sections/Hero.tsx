"use client";

import dynamic from "next/dynamic";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { NoiseBackground } from "@/components/primitives/NoiseBackground";
import { fadeUp, staggerContainer } from "@/lib/motion";

const FloatingObject = dynamic(
  () => import("@/components/three/FloatingObject").then((mod) => mod.FloatingObject),
  { ssr: false }
);

export function Hero() {
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink px-6 py-8 text-paper sm:px-10 sm:py-10">
      <NoiseBackground />

      <div className="relative z-20 flex items-start justify-between">
        <SectionLabel index="01" label="Saad Rizvi — Toronto, CA" />
        <SectionLabel index="—" label="Full-Stack Engineer" className="hidden sm:flex" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-20 flex flex-1 flex-col justify-center"
      >
        <div className="relative">
          <motion.h1
            variants={fadeUp}
            className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(3.5rem,15vw,9rem)]"
          >
            Always
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="font-display uppercase leading-[0.9] tracking-tight text-[clamp(4.5rem,19vw,13rem)] text-accent"
          >
            Building.
          </motion.h1>

          <FloatingObject className="pointer-events-auto absolute -right-4 top-0 hidden h-40 w-40 sm:h-56 sm:w-56 md:right-12 md:top-4 md:block lg:h-72 lg:w-72" />
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl font-serif text-xl italic text-paper-soft sm:text-2xl"
        >
          Full-stack engineer based in Toronto — shipping WatchDog, Impulse
          Guard, and Hobbyist, and always sketching the next thing.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <StatusBadge />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: scrollCueOpacity }}
        className="relative z-20 flex items-center justify-center font-mono text-xs uppercase tracking-[0.3em] text-paper-soft"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
    </MotionConfig>
  );
}
