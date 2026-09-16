import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { pricingCategories, pricingModels } from "@/lib/pricing";
import { site } from "@/lib/site";

/** Homepage pricing overview: models and categories, no figures. */
export function Pricing() {
  return (
    <section id="pricing" className="relative bg-surface-3 py-24 md:py-32">
      <div className="container-x">
        <Reveal variant="up">
          <SectionHeading
            index="05"
            eyebrow="Pricing"
            title="Simple and transparent cloud pricing"
            description="Choose the resources you need and scale as requirements change. Estimate cost before deployment, and see what is included, what is metered and what may generate additional charges."
            align="center"
          />
        </Reveal>

        <Reveal variant="scale" index={1} className="mt-14">
          <div className="elevated mx-auto max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface-2">
            <div className="hidden grid-cols-[12rem_1fr_auto] gap-6 border-b border-line px-6 py-3 font-mono text-[12.5px] tracking-[0.12em] text-fg-3 uppercase sm:grid">
              <span>Category</span>
              <span>What is metered</span>
              <span>Pricing</span>
            </div>
            <ul className="divide-y divide-line">
              {pricingCategories.map((c, i) => (
                <li
                  key={c.slug}
                  className="stagger"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Link
                    href={`/pricing/${c.slug}`}
                    className="group grid gap-1 px-5 py-4 transition-colors hover:bg-fg/[0.03] sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-6 sm:px-6"
                  >
                    <span className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.01em] text-fg">
                      {c.name}
                      <ArrowUpRight className="size-3.5 text-fg-3 opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </span>
                    <span className="text-[15px] text-fg-2">{c.metered}</span>
                    {"pending" in c && c.pending ? (
                      <StatusBadge status="coming-soon" />
                    ) : (
                      <span className="font-mono text-[13px] text-brand">
                        View rates
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-3 font-mono text-[12.5px] text-fg-3 sm:px-6">
              Every displayed rate maps to an approved configuration and charging unit · Taxes stated separately
            </div>
          </div>
        </Reveal>

        <Reveal
          variant="up"
          index={2}
          className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-6 md:flex-row"
        >
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            {pricingModels.map((m, i) => (
              <li
                key={m.name}
                title={m.copy}
                className="stagger flex items-center gap-2 text-[15px] text-fg-2"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span aria-hidden="true" className="size-1 rounded-full bg-lime" />
                {m.name}
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 gap-2">
            <Button variant="secondary" href="/pricing" arrow>
              Pricing overview
            </Button>
            <Button variant="ghost" href={site.links.sales}>
              Enterprise pricing
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
