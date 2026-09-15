import Link from "next/link";

import { HeroConsole } from "@/components/sections/hero-console";
import { HeroNetwork } from "@/components/sections/hero-network";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { featuredFamilySlugs, getFamily } from "@/lib/products";
import { site } from "@/lib/site";
import { availabilityAttributes } from "@/lib/trust";

export function Hero() {
  const strip = featuredFamilySlugs
    .map(getFamily)
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink pt-36 pb-20 sm:pt-44 md:pb-28"
    >
      <Backdrop />

      <div className="container-x flex flex-col items-center text-center">
        {/* Eyebrow */}
        <a
          href={site.parent.url}
          target="_blank"
          rel="noreferrer"
          style={{ "--i": 0 } as React.CSSProperties}
          className="rise group relative inline-flex h-8 items-center gap-2.5 overflow-hidden rounded-full border border-line bg-white/[0.03] pr-3.5 pl-2.5 text-[12.5px] font-medium text-paper-2 transition-colors hover:border-line-strong hover:text-paper"
        >
          <span className="relative flex size-1.5">
            <span className="animate-pulse-dot absolute inset-0 rounded-full bg-lime" />
            <span className="relative size-1.5 rounded-full bg-lime" />
          </span>
          Three availability zones in Lagos
          <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
          <span className="font-mono text-[11px] tracking-wide text-paper-3 uppercase transition-colors group-hover:text-paper-2">
            by 21CTL
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out-quart group-hover:translate-x-full"
          />
        </a>

        {/* Headline */}
        <h1
          id="hero-title"
          className="mt-7 max-w-4xl text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl lg:text-[5.25rem]"
        >
          <span
            className="rise block"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Build on
          </span>
          <span
            className="rise text-signal block pb-[0.08em]"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            KonetCloud.
          </span>
        </h1>

        {/* Supporting line + description */}
        <p
          className="rise mt-6 max-w-2xl text-lg leading-snug font-medium tracking-[-0.01em] text-balance text-paper sm:text-xl"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          {site.tagline}
        </p>
        <p
          className="rise mt-3 max-w-[38rem] text-base leading-relaxed text-pretty text-paper-2 sm:text-[17px]"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          Run applications, data platforms and AI workloads on high-performance
          cloud infrastructure designed for availability, local control and
          enterprise-scale growth.
        </p>

        {/* Actions */}
        <div
          className="rise mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          style={{ "--i": 5 } as React.CSSProperties}
        >
          <Button size="lg" href={site.links.console} arrow className="w-full sm:w-auto">
            Start building
          </Button>
          <Button size="lg" variant="secondary" href="/products" className="w-full sm:w-auto">
            Explore products
          </Button>
          <Button size="lg" variant="ghost" href={site.links.sales} className="w-full sm:w-auto">
            Talk to an expert
          </Button>
        </div>

        {/* Product strip */}
        <ul
          className="rise mt-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
          style={{ "--i": 6 } as React.CSSProperties}
          aria-label="Product families"
        >
          {strip.map((f, i) => (
            <li key={f.slug} className="flex items-center">
              <Link
                href={`/products/${f.slug}`}
                className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium text-paper-2 transition-colors hover:bg-white/[0.05] hover:text-paper"
              >
                <f.icon className="size-4 text-paper-3 transition-colors group-hover:text-brand" />
                {f.name}
              </Link>
              {i < strip.length - 1 && (
                <span aria-hidden="true" className="hidden size-1 rounded-full bg-line-strong sm:block" />
              )}
            </li>
          ))}
        </ul>

        {/* Product surface */}
        <div
          className="rise mt-16 w-full max-w-5xl md:mt-20"
          style={{ "--i": 7, "--d": "120ms" } as React.CSSProperties}
        >
          <HeroConsole />
        </div>

        {/* Availability attributes */}
        <dl
          className="rise mt-14 grid w-full max-w-5xl grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0"
          style={{ "--i": 8, "--d": "160ms" } as React.CSSProperties}
        >
          <Stat
            index={1}
            value={<CountUp to={3} prefix="0" duration={1200} />}
            label={availabilityAttributes[0]}
          />
          <Stat index={2} value="N+1" label={availabilityAttributes[1]} />
          <Stat index={3} value="Health" label={availabilityAttributes[2]} />
          <Stat index={4} value="Multi-AZ" label={availabilityAttributes[3]} />
        </dl>
      </div>
    </section>
  );
}

function Stat({
  index,
  value,
  label,
}: {
  index: number;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="relative flex flex-col items-center gap-1.5 md:border-l md:border-line md:first:border-0">
      <dt className="order-2 text-[12.5px] text-paper-3">{label}</dt>
      <dd className="order-1 font-mono text-2xl font-medium tracking-tight text-paper tabular-nums">
        {value}
      </dd>
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] text-paper-3/60 md:block"
      >
        0{index}
      </span>
    </div>
  );
}

/**
 * Background system: a live node-and-spark network, two editorial guide
 * rails, and a single hairline with a travelling signal — quiet enough
 * that the black stays black, alive enough to say "connectivity".
 */
function Backdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <HeroNetwork className="absolute inset-x-0 top-0 h-[72%] w-full [mask-image:radial-gradient(ellipse_75%_80%_at_50%_35%,black_25%,transparent_72%)]" />

      <div className="container-x absolute inset-x-0 top-0 h-full">
        <div className="relative h-full">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
        </div>
      </div>

      <div className="absolute inset-x-0 top-[58%] overflow-hidden md:top-[54%]">
        <div className="hairline" />
        <div className="animate-sweep absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
      </div>

      <div className="absolute top-24 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(2_164_238/0.12),transparent)] blur-2xl" />
    </div>
  );
}
