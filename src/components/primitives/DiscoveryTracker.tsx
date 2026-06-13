"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useDiscoveries } from "@/lib/discoveries";

export function DiscoveryTracker() {
  const { discovered, total, toast } = useDiscoveries();
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40 flex items-center gap-3 rounded-full border border-line-invert bg-ink/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-paper backdrop-blur-sm">
        Discoveries {discovered.size}/{total}
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
            className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink"
          >
            {toast.label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
