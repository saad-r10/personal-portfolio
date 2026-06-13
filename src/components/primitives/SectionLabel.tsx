type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

export function SectionLabel({ index, label, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-3 ${className}`}
    >
      <span className="opacity-50">{index}</span>
      <span className="h-px w-8 bg-current opacity-30" />
      <span>{label}</span>
    </div>
  );
}
