import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={`btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide text-white ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden className="text-base leading-none">
        →
      </span>
    </button>
  );
}
