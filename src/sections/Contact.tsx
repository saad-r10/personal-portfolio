"use client";

import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { StatusBadge } from "@/components/primitives/StatusBadge";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/motion";

type ContactLink = {
  label: string;
  href: string;
};

const links: ContactLink[] = [
  { label: "GitHub", href: "https://github.com/saad-r10" },
  { label: "LinkedIn", href: "https://linkedin.com/in/saad-r10" },
  { label: "Email", href: "mailto:saad.rizvi@mail.utoronto.ca" },
];

export function Contact() {
  const prefersReducedMotion = useReducedMotion();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex flex-col gap-20 bg-ink px-6 py-24 text-paper sm:px-10 sm:py-32">
        <SectionLabel index="06" label="Contact" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(3rem,13vw,9rem)] uppercase leading-[0.95]"
          >
            Let&apos;s build <span className="text-accent">something.</span>
          </motion.h2>

          <motion.div variants={fadeUp}>
            <StatusBadge />
          </motion.div>

          <motion.nav
            variants={fadeUp}
            className="mt-6 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-16 sm:gap-y-6"
            aria-label="Contact links"
          >
            {links.map((link) => (
              <MagneticButton key={link.label} className="inline-flex">
                <a
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-center gap-3 py-2 font-mono text-sm uppercase tracking-[0.3em] text-paper transition-colors hover:text-accent"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </MagneticButton>
            ))}
          </motion.nav>
        </motion.div>

        <footer className="flex flex-col-reverse gap-6 border-t border-line-invert pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper-soft">
            © 2026 Saad Rizvi. Built with Next.js.
          </p>

          <MagneticButton className="inline-flex self-start sm:self-auto">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 py-2 font-mono text-xs uppercase tracking-[0.3em] text-paper-soft transition-colors hover:text-paper"
            >
              Back to top
              <span aria-hidden>↑</span>
            </button>
          </MagneticButton>
        </footer>
      </section>
    </MotionConfig>
  );
}
