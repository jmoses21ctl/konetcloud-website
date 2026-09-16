import { Words } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Two-digit section index, rendered in mono before the eyebrow. */
  index: string;
  eyebrow: string;
  /** Plain string so it can be split into staggered words. */
  title: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Numbered section header — the recurring typographic rhythm of the page.
 * Wrap in a <Reveal> to get the rule draw, word stagger and description rise.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3 font-mono text-[13px] tracking-[0.12em] text-fg-3 uppercase">
        <span className="text-brand">{index}</span>
        <span aria-hidden="true" className="rule h-px w-6 bg-line-strong" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-4xl leading-[1.08] font-bold tracking-[-0.03em] text-balance text-fg sm:text-5xl md:text-[3.25rem]">
        <Words text={title} />
      </h2>
      {description && (
        <p
          className="stagger text-[17px] leading-relaxed text-pretty text-fg-2 sm:text-lg"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {description}
        </p>
      )}
    </div>
  );
}
