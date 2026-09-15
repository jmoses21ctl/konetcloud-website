import type { Metadata } from "next";
import Link from "next/link";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { ArrowUpRight } from "@/components/ui/icons";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { pricingCategories, pricingModels, pricingNotes, pricingTools } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple and transparent cloud pricing. Understand charging models, what is metered, and estimate cost before deployment.",
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Pricing" }]} />}
        title="Choose the resources you need and scale as requirements change"
        lede="Estimate cost before deployment and understand what is included, what is metered and what may generate additional charges."
        visual={<Illustration scene="management" />}
      >
        <Button href={site.links.sales} arrow>Request enterprise pricing</Button>
        <Button variant="secondary" href="/pricing/cost-guidance">Cost guidance</Button>
      </PageHero>

      <Section index="01" eyebrow="Categories" title="Pricing by category" description="Each category page lists approved configurations, charging units and any additional charges.">
        <Reveal variant="up" className="overflow-hidden rounded-2xl border border-line bg-ink-2">
          <ul className="divide-y divide-line">
            {pricingCategories.map((c, i) => (
              <li key={c.slug} className="stagger" style={{ "--i": i } as React.CSSProperties}>
                <Link href={`/pricing/${c.slug}`} className="group grid gap-1 px-5 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-6 sm:px-6">
                  <span className="flex items-center gap-2 text-[15px] font-semibold text-paper">
                    {c.name}
                    <ArrowUpRight className="size-3.5 text-paper-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="text-[13.5px] text-paper-2">{c.metered}</span>
                  {"pending" in c && c.pending ? <StatusBadge status="coming-soon" /> : <span className="font-mono text-[11.5px] text-brand">View rates</span>}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section index="02" eyebrow="Models" title="Many ways to buy" description="Clearly distinguished wherever they apply.">
        <Reveal as="ul" variant="up" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {pricingModels.map((m, i) => (
            <li key={m.name} className="stagger flex flex-col gap-2 bg-ink p-5" style={{ "--i": i } as React.CSSProperties}>
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-paper-3 uppercase">0{i + 1}</span>
              <h3 className="text-[15px] font-semibold text-paper">{m.name}</h3>
              <p className="text-[13.5px] leading-relaxed text-paper-2">{m.copy}</p>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section index="03" eyebrow="Tools" title="Estimate, compare, request">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTools.map((t, i) => (
            <li key={t.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
              <LinkCard href={t.slug === "enterprise" ? site.links.sales : `/pricing/${t.slug}`} title={t.name} description={t.copy}>
                <StatusBadge status={t.status} className="self-start" />
              </LinkCard>
            </li>
          ))}
        </Reveal>
      </Section>

      <section className="bg-ink pb-24">
        <div className="container-x">
          <Reveal as="ul" variant="up" className="mx-auto max-w-3xl flex flex-col gap-3 rounded-2xl border border-line bg-ink-2 p-6 font-mono text-[12px] leading-relaxed text-paper-3">
            {pricingNotes.map((n, i) => (
              <li key={n} className="stagger flex gap-3" style={{ "--i": i } as React.CSSProperties}>
                <span className="text-brand">—</span>{n}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction title="Need committed-use or dedicated terms?" copy="Enterprise pricing covers committed-use, reserved, dedicated infrastructure and negotiated commercial terms." primary={{ label: "Request enterprise pricing", href: site.links.sales }} secondary={{ label: "Start on-demand", href: site.links.console }} />
    </PageShell>
  );
}
