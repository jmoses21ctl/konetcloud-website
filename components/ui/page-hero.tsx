import { Words } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Mono eyebrow, e.g. "Products / Compute". */
  eyebrow: React.ReactNode;
  title: string;
  lede?: string;
  children?: React.ReactNode;
  /** Right-hand illustration; renders beside the copy from lg up. */
  visual?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Standard inner-page opener: eyebrow, H1, one-sentence value statement,
 * then whatever actions the page needs. Uses the hero's `rise` entrance.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  visual,
  align = "left",
  className,
}: Props) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink pt-32 pb-14 sm:pt-40 sm:pb-20",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(245_180_0/0.10),transparent_70%)]"
      />
      <div
        className={cn(
          "container-x",
          visual && "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6",
        )}
      >
      <div
        className={cn(
          "flex flex-col gap-5",
          align === "center" && "items-center text-center",
        )}
      >
        <div
          className="rise flex items-center gap-3 font-mono text-[11.5px] tracking-[0.12em] text-paper-3 uppercase"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {eyebrow}
        </div>
        <h1
          className="rise max-w-4xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <Words text={title} />
        </h1>
        {lede && (
          <p
            className="rise max-w-2xl text-base leading-relaxed text-pretty text-paper-2 sm:text-lg"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {lede}
          </p>
        )}
        {children && (
          <div
            className="rise mt-3 flex flex-wrap items-center gap-3"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
      {visual && (
        <div
          className="rise relative -mx-4 lg:mx-0"
          style={{ "--i": 2, "--d": "160ms" } as React.CSSProperties}
        >
          {visual}
        </div>
      )}
      </div>
    </section>
  );
}
