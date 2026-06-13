"use client";

import { motion, MotionConfig } from "framer-motion";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Project = {
  index: string;
  name: string;
  highlight: string;
  description: string;
  stack: string[];
  href: string;
};

const projects: Project[] = [
  {
    index: "I",
    name: "WatchDog",
    highlight: "Uptime monitoring for two live startups",
    description:
      "Tracks uptime, SSL expiry, and HTTP security headers across production sites, with automated email alerts the moment something breaks.",
    stack: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "React", "Docker"],
    href: "https://github.com/saad-r10/watchdog",
  },
  {
    index: "II",
    name: "Impulse Guard",
    highlight: "Top 4 of 32 teams — built in 48 hours",
    description:
      "A browser extension that uses AI to catch impulse purchases before checkout, designed and shipped over a single case-competition weekend.",
    stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Claude API"],
    href: "https://github.com/ImpulseGuard/impulse-guard",
  },
  {
    index: "III",
    name: "Hobbyist",
    highlight: "Built with a team of four, used by real people",
    description:
      "A full-stack platform for connecting people around the books, films, games, and podcasts they're into, and keeping track of what to try next.",
    stack: ["JavaScript", "React", "Express", "Tailwind CSS", "Prisma", "SQLite"],
    href: "https://github.com/saad-r10/hobbyist",
  },
];

export function Projects() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex flex-col gap-4 bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <SectionLabel index="03" label="Selected Work" />

        <div className="mt-12 flex flex-col">
          {projects.map((project, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={project.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="grid gap-8 border-t border-line py-16 sm:py-20 lg:grid-cols-12 lg:gap-x-12"
              >
                <motion.div
                  variants={fadeUp}
                  className={`flex flex-col gap-4 lg:col-span-5 ${
                    reversed ? "lg:col-start-8" : "lg:col-start-1"
                  }`}
                >
                  <SectionLabel index={project.index} label={project.name} />
                  <h3 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] uppercase leading-[0.95]">
                    {project.name}
                  </h3>
                  <p className="max-w-xs font-serif text-xl italic text-ink-soft">
                    {project.highlight}
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className={`flex flex-col gap-6 lg:col-span-6 ${
                    reversed ? "lg:col-start-1" : "lg:col-start-7"
                  }`}
                >
                  <p className="text-lg leading-relaxed text-ink-soft">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="mt-2 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-ink underline-offset-4 hover:underline"
                  >
                    View on GitHub
                    <span aria-hidden>→</span>
                  </motion.a>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </MotionConfig>
  );
}
