import type { Metadata } from "next";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { ArchitectureDiagram } from "@/components/sections/architecture";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";
import { sovereigntyWording, trustAreas } from "@/lib/trust";

export const metadata: Metadata = {
  title: "Trust",
  description: "Where KonetCloud services operate, how resilience is designed, how responsibilities are divided, and which standards have been achieved.",
};

export default function TrustPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Trust" }]} />}
        title="Trust KonetCloud with critical workloads"
        lede="A clear, evidence-based view of where services operate, how resilience is designed, how responsibilities are divided, and which standards or certifications have been achieved."
        visual={<Illustration scene="security" />}
      >
        <Button href={site.links.status} arrow>Service status</Button>
        <Button variant="secondary" href={site.links.sales}>Request controlled evidence</Button>
      </PageHero>

      <Section index="01" eyebrow="Trust areas" title="Six things you should be able to verify">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustAreas.map((t, i) => (
            <li key={t.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
              <LinkCard href={`/trust/${t.slug}`} title={t.name} description={t.copy} tag={`0${i + 1}`} />
            </li>
          ))}
        </Reveal>
      </Section>

      <Section index="02" eyebrow="Resilience" title="Multiple peer availability zones" description="Public architecture is shown at a logical level: zones, redundant paths, service layers and control boundaries. Device topology, addressing and internal dependencies are shared with authorised assessors and customers through a controlled process.">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <Reveal as="ul" variant="up" className="flex flex-col divide-y divide-line border-y border-line">
            {[
              "Zones are independent locations with their own power, cooling and connectivity.",
              "Every zone connects to every other zone over redundant paths; no single zone is a transit dependency.",
              "Workloads can be deployed across zones so that a zone-level event does not interrupt service.",
              "Zone locations and detailed topology are shared with customers and assessors through a controlled process.",
            ].map((t, i) => (
              <li key={t} className="stagger flex items-start gap-4 py-4" style={{ "--i": i } as React.CSSProperties}>
                <span className="mt-0.5 font-mono text-[13px] text-brand">0{i + 1}</span>
                <span className="text-[16px] leading-relaxed text-fg-2">{t}</span>
              </li>
            ))}
          </Reveal>
          <Reveal variant="right"><ArchitectureDiagram /></Reveal>
        </div>
      </Section>

      <Section index="03" eyebrow="Sovereignty" title="Designed for sovereign and regulated workloads">
        <Reveal variant="scale" className="rounded-2xl border border-brand/25 bg-brand/[0.04] p-6 sm:p-8">
          <p className="max-w-2xl text-[18px] leading-relaxed text-fg">{sovereigntyWording}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-2">
            Certification and regulatory approval statements are published on the Compliance page only once formally issued. Until then, KonetCloud does not state or imply a certification it has not received.
          </p>
        </Reveal>
      </Section>

      <CallToAction title="Need evidence for an assessment?" copy="Detailed architecture, control descriptions and supporting evidence are available to authorised assessors and customers through the appropriate process." primary={{ label: "Request controlled evidence", href: site.links.sales }} secondary={{ label: "Shared responsibility", href: "/trust/shared-responsibility" }} />
    </PageShell>
  );
}
