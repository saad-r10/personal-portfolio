import type { Transition, Variants } from "framer-motion";

export const springs = {
  snappy: { type: "spring", stiffness: 320, damping: 28 } satisfies Transition,
  soft: { type: "spring", stiffness: 120, damping: 20 } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: springs.soft },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};
