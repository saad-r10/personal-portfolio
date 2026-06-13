"use client";

import dynamic from "next/dynamic";
import { motion, MotionConfig } from "framer-motion";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

const SoccerBall = dynamic(
  () => import("@/components/three/SoccerBall").then((mod) => mod.SoccerBall),
  { ssr: false }
);

export function Playground() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex flex-col gap-12 bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <SectionLabel index="02" label="Kickabout" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="max-w-3xl"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display uppercase leading-[0.95] text-[clamp(2.75rem,9vw,6.5rem)]"
          >
            Keep It <span className="text-accent">Up.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl font-serif text-xl italic text-ink-soft sm:text-2xl"
          >
            Click the ball before it hits the ground. Every streak you build
            gets logged in the discoveries tracker.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="h-[60vh] w-full overflow-hidden rounded-2xl border border-line sm:h-[70vh]"
        >
          <SoccerBall className="h-full w-full" />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
