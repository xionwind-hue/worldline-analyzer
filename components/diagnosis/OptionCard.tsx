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
      className={`group relative w-full rounded-2xl px-4 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue/50 focus-visible:ring-offset-2 sm:px-5 sm:py-[18px] ${
        selected
          ? "gradient-border gradient-border-strong border border-transparent bg-white shadow-[0_6px_24px_rgba(124,92,255,0.16)]"
          : "border border-[#e8e6f4] bg-white shadow-[0_1px_4px_rgba(23,26,59,0.04)] hover:-translate-y-px hover:border-[#d4d0ee] hover:shadow-[0_3px_12px_rgba(23,26,59,0.06)]"
      }`}
    >
      {selected && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-blue/[0.05] via-transparent to-primary-purple/[0.07]" />
      )}

      <div className="relative flex items-start gap-3.5 sm:gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-all duration-300 sm:h-9 sm:w-9 ${
            selected
              ? "bg-gradient-to-br from-primary-blue to-primary-purple text-white shadow-[0_3px_12px_rgba(124,92,255,0.3)]"
              : "bg-[#edebff] text-primary-purple group-hover:bg-[#e4e0fa]"
          }`}
        >
          {optionId}
        </span>
        <p
          className={`pt-1.5 text-[14px] leading-[1.7] transition-colors duration-300 sm:pt-1 sm:text-sm sm:leading-7 ${
            selected
              ? "font-medium text-foreground"
              : "text-foreground/75 group-hover:text-foreground/90"
          }`}
        >
          {label}
        </p>
      </div>
    </button>
  );
}
