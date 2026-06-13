"use client";

import { motion, MotionConfig } from "framer-motion";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

type TrackRecordItem = {
  metric: string;
  title: string;
  description: string;
};

const trackRecord: TrackRecordItem[] = [
  {
    metric: "48 HRS",
    title: "Impulse Guard",
    description:
      "Top 4 of 32 teams at a case competition — designed, built, and shipped a browser extension over a single weekend.",
  },
  {
    metric: "2 LIVE",
    title: "WatchDog",
    description:
      "Uptime, SSL, and security monitoring running in production for two real startups, alerting the moment something breaks.",
  },
  {
    metric: "TEAM OF 4",
    title: "Hobbyist",
    description:
      "A full-stack platform for tracking books, films, games, and podcasts, built end to end with a team of four.",
  },
];

export function About() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex flex-col gap-16 bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <SectionLabel index="04" label="About" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={staggerContainer}
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(2.75rem,8vw,5.5rem)] uppercase leading-[0.95]"
            >
              Curious by <span className="text-accent">default</span>.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-md font-serif text-2xl italic text-ink-soft"
            >
              Most of what I know, I learned by breaking something first.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              I&apos;m Saad, a full-stack engineer based in Toronto. I&apos;m
              drawn to the moment an idea stops being theoretical — when
              it&apos;s deployed, when real people are clicking through it,
              when something breaks at 2am and I have to figure out why.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              That instinct shows up in how I work: fast first drafts, real
              infrastructure, and a habit of finishing what I start — whether
              that&apos;s a 48-hour build for a case competition or a tool two
              startups now depend on every day.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-col gap-10 border-t border-line pt-10 lg:col-span-5 lg:col-start-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0"
          >
            {trackRecord.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="flex flex-col gap-1">
                <span className="font-display text-3xl uppercase leading-none text-ink">
                  {item.metric}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
                  {item.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
