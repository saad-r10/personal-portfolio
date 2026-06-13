"use client";

import { motion, MotionConfig } from "framer-motion";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Manifesto() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex flex-col gap-16 bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <SectionLabel index="02" label="Manifesto" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-serif text-[clamp(1.75rem,5vw,3.75rem)] italic leading-[1.15] text-ink"
          >
            I ship first and perfect later. Every project here started as a
            rough idea, pushed into the open, broken in public, and rebuilt
            until it actually worked.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-md font-mono text-xs uppercase tracking-[0.3em] text-ink-soft"
          >
            Three of those projects, below.
          </motion.p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
