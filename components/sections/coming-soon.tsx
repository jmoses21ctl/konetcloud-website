import { HeroNetwork } from "@/components/sections/hero-network";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

type Props = {
  /** Path segments, e.g. ["services", "cloud-compute"]. */
  segments: string[];
};

/** Turn a slug into a title: "cloud-compute" → "Cloud Compute". */
export function titleFromSlug(slug: string) {
  const special: Record<string, string> = {
    paas: "PaaS",
    "ai-paas": "AI PaaS",
    estack: "EStack",
    api: "API",
    cli: "CLI",
    sla: "SLA",
    dpa: "Data Processing Agreement",
    faq: "FAQ",
    faqs: "FAQs",
    sdks: "SDKs",
    gpu: "GPU",
    "ai-gpu": "AI and GPU",
    data: "Data and Big Data",
  };
  if (special[slug]) return special[slug];
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Placeholder for routes that exist in navigation but aren't built yet.
 * Keeps the brand intact and always offers a way forward.
 */
export function ComingSoon({ segments }: Props) {
  const title = titleFromSlug(segments[segments.length - 1] ?? "");
  const section = segments.length > 1 ? titleFromSlug(segments[0]) : null;

  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 pt-16 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <HeroNetwork className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,black_20%,transparent_70%)]" />
      </div>

      {/* Breadcrumb in mono, the way a path reads in a terminal */}
      <p
        className="rise flex flex-wrap items-center justify-center gap-2 font-mono text-[12px] text-paper-3"
        style={{ "--i": 0 } as React.CSSProperties}
      >
        <span>konetcloud.com</span>
        {segments.map((s, i) => (
          <span key={`${s}-${i}`} className="flex items-center gap-2">
            <span className="text-paper-3/50">/</span>
            <span className={i === segments.length - 1 ? "text-paper-2" : ""}>
              {s}
            </span>
          </span>
        ))}
      </p>

      <p
        className="rise mt-8 inline-flex h-7 items-center gap-2 rounded-full border border-amber/30 bg-amber/[0.06] px-3 font-mono text-[11px] tracking-[0.12em] text-amber uppercase"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        <span className="size-1.5 rounded-full bg-amber" />
        In progress
      </p>

      <h1
        className="rise mt-6 max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {title}
        {section && (
          <span className="mt-2 block text-[0.5em] font-medium tracking-[-0.02em] text-paper-3">
            {section}
          </span>
        )}
      </h1>

      <p
        className="rise mt-6 max-w-md text-[15px] leading-relaxed text-paper-2 sm:text-base"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        We&apos;re still writing this page. Everything on {site.name} shares one
        catalogue, so the overview will tell you most of what you need — and an
        engineer can fill in the rest.
      </p>

      <div
        className="rise mt-9 flex flex-col items-center gap-3 sm:flex-row"
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <Button href="/" arrow>
          Back to the overview
        </Button>
        <Button variant="secondary" href="/products">
          Browse products
        </Button>
      </div>
    </section>
  );
}
