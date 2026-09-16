import type { Metadata } from "next";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Start from the outcome: migration, modernisation, business continuity, sovereign cloud, AI infrastructure, data platforms and hybrid cloud on KonetCloud.",
};

export default function SolutionsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Solutions" }]} />}
        title="Start from the outcome, not the service list"
        lede="Each solution connects several KonetCloud services to a customer outcome, with a logical architecture and the operating considerations that matter."
        visual={<Illustration scene="networking" />}
      >
        <Button href={site.links.sales} arrow>
          Talk to an expert
        </Button>
        <Button variant="secondary" href="/products">
          Browse products
        </Button>
      </PageHero>
      <section className="bg-surface pb-24">
        <div className="container-x">
          <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s, i) => (
              <li key={s.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
                <LinkCard href={`/solutions/${s.slug}`} title={s.name} description={s.copy} tag={`0${i + 1}`}>
                  <p className="text-[15px] font-medium text-fg-2">{s.headline}</p>
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
