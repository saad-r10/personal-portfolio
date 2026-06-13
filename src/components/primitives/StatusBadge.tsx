import { MagneticButton } from "@/components/primitives/MagneticButton";

export function StatusBadge() {
  return (
    <MagneticButton className="inline-flex">
      <div className="flex items-center gap-3 rounded-full border border-line-invert bg-ink/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-paper backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Open to internships — Fall 2026 / Winter 2027
      </div>
    </MagneticButton>
  );
}
