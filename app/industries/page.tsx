import type { Metadata } from "next";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "How KonetCloud supports the operating requirements of financial services, government, telecommunications, enterprise, technology and media.",
};

export default function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Industries" }]} />}
        title="Built around how each sector actually operates"
        lede="Workload examples, relevant product families, and the availability, residency and operational considerations that matter to your sector."
        visual={<Illustration scene="platform" />}
      />
      <section className="bg-surface pb-24">
        <div className="container-x">
          <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li key={ind.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
                <LinkCard href={`/industries/${ind.slug}`} title={ind.name} description={ind.copy} tag={`0${i + 1}`}>
                  <ul className="flex flex-wrap gap-1.5">
                    {ind.workloads.slice(0, 3).map((w) => (
                      <li key={w} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[10.5px] text-fg-3">{w}</li>
                    ))}
                  </ul>
                </LinkCard>
              </li>
            ))}
          </Reveal>
        </div>
      </section>
      <CallToAction />
    </PageShell>
  );
}
