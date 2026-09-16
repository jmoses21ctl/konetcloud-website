import type { Metadata } from "next";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: "Technical and commercial support routes for KonetCloud: support plans, technical support, sales support and contact.",
};

const routes = [
  { title: "Technical support", description: "Raise and track issues with running services through the console or your approved support channel.", href: "/contact?topic=support", tag: "operations" },
  { title: "Sales support", description: "Sizing, pricing models, committed-use and enterprise terms.", href: site.links.sales, tag: "commercial" },
  { title: "Service status", description: "Platform availability information and incident communication.", href: site.links.status, tag: "status" },
  { title: "Documentation", description: "Product concepts, configuration guides, limitations and troubleshooting.", href: site.links.docs, tag: "self-service" },
];

export default function SupportPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Support" }]} />}
        title="Clear technical and commercial support routes"
        lede="Every support plan defines its contact channels, coverage hours, response targets, escalation path and included services. Plans are published once their operating model is confirmed."
        visual={<Illustration scene="management" />}
      >
        <Button href="/contact?topic=support" arrow>Contact support</Button>
        <Button variant="secondary" href={site.links.status}>Service status</Button>
      </PageHero>

      <Section index="01" eyebrow="Routes" title="Where to go">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r, i) => (
            <li key={r.href} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
              <LinkCard {...r} />
            </li>
          ))}
        </Reveal>
      </Section>

      <Section index="02" eyebrow="Support plans" title="Plans are published when they are operational" description="Coverage hours and response commitments appear here only once the operating model and service terms support them.">
        <Reveal variant="scale" className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-[16px] font-semibold text-fg">Support plan catalogue</h3>
            <p className="mt-1 max-w-xl text-[14px] text-fg-2">Contact channels, coverage hours, response targets, escalation paths and included services for each approved plan.</p>
          </div>
          <StatusBadge status="coming-soon" />
        </Reveal>
      </Section>

      <CallToAction title="Talk to a person." copy="Technical or commercial, we route you to someone who can act." primary={{ label: "Contact us", href: site.links.contact }} secondary={{ label: "Read the documentation", href: site.links.docs }} />
    </PageShell>
  );
}
