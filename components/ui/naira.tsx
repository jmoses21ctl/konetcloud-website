import { cn } from "@/lib/utils";

/**
 * Naira sign. Neither body font ships U+20A6, so the browser substitutes a
 * system glyph that renders visibly larger than the surrounding digits.
 * Scaling it down and nudging the baseline keeps it optically in line.
 */
export function Naira({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block text-[0.8em] leading-none -translate-y-[0.03em]",
        className,
      )}
    >
      ₦
    </span>
  );
}
