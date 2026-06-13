export function NoiseBackground() {
  return (
    <div
      aria-hidden
      className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.06] mix-blend-overlay"
    />
  );
}
