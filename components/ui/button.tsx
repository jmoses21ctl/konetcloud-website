import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out-quart active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "sheen overflow-hidden bg-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_24px_-10px_rgb(0_126_237/0.7)] hover:bg-brand-deep hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_12px_32px_-10px_rgb(0_98_196/0.75)]",
  secondary:
    "border border-line-strong bg-surface-2/80 text-fg backdrop-blur hover:border-fg/25 hover:bg-surface-2",
  ghost: "text-fg-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  /** Renders a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
);

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

/**
 * Arrow whose shaft extends on hover — the head moves right while the
 * stem grows from the left, so it reads as "reaching" rather than sliding.
 */
function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 overflow-visible"
    >
      <path
        d="M3 8h9"
        className="origin-right scale-x-0 transition-transform duration-300 ease-out-expo group-hover/btn:scale-x-100"
      />
      <path
        d="M8.5 3.5 13 8l-4.5 4.5"
        className="transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
      />
    </svg>
  );
}
