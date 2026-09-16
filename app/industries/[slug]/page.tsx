import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Illustration } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getIndustry, industries } from "@/lib/industries";
import { getFamily } from "@/lib/products";
import { site } from "@/lib/site";
import { getSolution } from "@/lib/solutions";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const ind = getIndustry((await params).slug);
  return ind ? { title: ind.name, description: ind.copy } : {};
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const families = ind.families.map(getFamily).filter((f): f is NonNullable<typeof f> => Boolean(f));
  const sols = ind.solutions.map(getSolution).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Industries", href: "/industries" }, { label: ind.name }]} />}
        title={ind.name}
        lede={ind.copy}
        visual={<Illustration scene={ind.families[0]} />}
      >
        <Button href={site.links.sales} arrow>Talk to an expert</Button>
        <Button variant="secondary" href="/trust">Trust and compliance</Button>
      </PageHero>

      <Section index="01" eyebrow="Workloads" title="Typical workloads">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ind.workloads.map((w, i) => (
            <li key={w} className="stagger-pop rounded-xl border border-line bg-surface-2 p-5" style={{ "--i": i } as React.CSSProperties}>
              <span className="font-mono text-[13px] text-brand">0{i + 1}</span>
              <p className="mt-2 text-[17px] font-medium text-fg">{w}</p>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section index="02" eyebrow="Products and solutions" title="Relevant product families and solution paths">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2">
            {families.map((f, i) => (
              <li key={f.slug} className="stagger" style={{ "--i": i } as React.CSSProperties}>
                <LinkCard href={`/products/${f.slug}`} title={f.name} description={f.summary} icon={f.icon} />
              </li>
            ))}
          </Reveal>
          <Reveal as="ul" variant="up" index={1} className="flex flex-col gap-3">
            {sols.map((s, i) => (
              <li key={s.slug} className="stagger" style={{ "--i": i } as React.CSSProperties}>
                <LinkCard href={`/solutions/${s.slug}`} title={s.name} description={s.headline} tag="solution" />
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section index="03" eyebrow="Considerations" title="Availability, residency and operations">
        <Reveal as="ul" variant="up" className="flex flex-col divide-y divide-line border-y border-line">
          {ind.considerations.map((c, i) => (
            <li key={c} className="stagger flex items-start gap-4 py-4" style={{ "--i": i } as React.CSSProperties}>
              <span className="mt-0.5 font-mono text-[12.5px] text-brand">0{i + 1}</span>
              <span className="text-[15px] text-fg-2">{c}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      <CallToAction
        title={`Architecture for ${ind.name.toLowerCase()}.`}
        copy="Approved customer evidence is published as it becomes available. Until then, talk to an engineer about your specific requirements."
        primary={{ label: "Contact for architecture and commercial engagement", href: site.links.sales }}
        secondary={{ label: "Browse solutions", href: "/solutions" }}
      />
    </PageShell>
  );
}
