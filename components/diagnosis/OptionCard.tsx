"use client";

type OptionCardProps = {
  optionId: "A" | "B" | "C" | "D";
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function OptionCard({
  optionId,
  label,
  selected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
        selected
          ? "gradient-border gradient-border-strong bg-white shadow-[0_10px_36px_rgba(124,92,255,0.28)]"
          : "border border-[#e4e2f7] bg-white shadow-[0_2px_12px_rgba(23,26,59,0.05)] hover:-translate-y-0.5 hover:border-primary-purple/40 hover:shadow-[0_8px_28px_rgba(124,92,255,0.18)]"
      }`}
    >
      {selected && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-blue/[0.06] via-transparent to-primary-purple/[0.08]" />
      )}

      <div className="relative flex items-center gap-4">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-all duration-300 ${
            selected
              ? "bg-gradient-to-br from-primary-blue to-primary-purple text-white shadow-[0_4px_16px_rgba(124,92,255,0.4)]"
              : "bg-lavender-pale text-primary-purple group-hover:bg-gradient-to-br group-hover:from-primary-blue group-hover:to-primary-purple group-hover:text-white"
          }`}
        >
          {optionId}
        </span>
        <p
          className={`text-[13px] leading-6 transition-colors duration-300 sm:text-sm ${
            selected
              ? "font-medium text-foreground"
              : "text-foreground/80 group-hover:text-foreground"
          }`}
        >
          {label}
        </p>
      </div>
    </button>
  );
}
