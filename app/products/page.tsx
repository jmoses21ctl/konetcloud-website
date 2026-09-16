import type { Metadata } from "next";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { productFamilies } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the KonetCloud platform by service family: compute, storage, networking, data and big data, AI and GPU, containers, management and security.",
};

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Products" }]} />}
        title="One platform, eight product families"
        lede="Every service shares the same network, identity model, console and bill. Start from the family that matches your workload."
        visual={<Illustration scene="platform" />}
      >
        <Button href={site.links.console} arrow>
          Launch in console
        </Button>
        <Button variant="secondary" href="/pricing">
          View pricing
        </Button>
      </PageHero>

      <section className="bg-surface pb-24">
        <div className="container-x">
          <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {productFamilies.map((f, i) => (
              <li key={f.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
                <LinkCard
                  href={`/products/${f.slug}`}
                  title={f.name}
                  description={f.lede}
                  icon={f.icon}
                  tag={`${f.services.length} services`}
                >
                  <ul className="flex flex-wrap gap-1.5">
                    {f.services.slice(0, 4).map((s) => (
                      <li key={s.name} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[12px] text-fg-3">
                        {s.name}
                      </li>
                    ))}
                    {f.services.length > 4 && (
                      <li className="px-1 py-0.5 font-mono text-[12px] text-fg-3">
                        +{f.services.length - 4}
                      </li>
                    )}
                  </ul>
                </LinkCard>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CallToAction
        title="Not sure which family fits?"
        copy="An engineer can map your workload to the right services and a logical architecture in one conversation."
        primary={{ label: "Talk to an expert", href: site.links.sales }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />
    </PageShell>
  );
}
