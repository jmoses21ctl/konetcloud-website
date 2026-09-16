import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
import { ServiceTable } from "@/components/ui/service-table";
import { getFamily, productFamilies } from "@/lib/products";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";

type Params = { family: string };

export function generateStaticParams(): Params[] {
  return productFamilies.map((f) => ({ family: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const f = getFamily((await params).family);
  if (!f) return {};
  return { title: `${f.name}`, description: f.lede };
}

export default async function ProductFamilyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const f = getFamily((await params).family);
  if (!f) notFound();

  const related = solutions.filter((s) => s.families.includes(f.slug)).slice(0, 3);
  const siblings = productFamilies.filter((p) => p.slug !== f.slug);

  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Products", href: "/products" }, { label: f.name }]} />}
        title={f.headline}
        lede={f.lede}
        visual={<Illustration scene={f.slug} />}
      >
        <Button href={`/pricing/${f.slug === "ai-gpu" ? "gpu" : f.slug}`} arrow>
          View pricing
        </Button>
        <Button variant="secondary" href={site.links.console}>
          Launch in console
        </Button>
        <Button variant="ghost" href={site.links.sales}>
          Talk to an expert
        </Button>
      </PageHero>

      <Section index="01" eyebrow="Services" title={`${f.name} services`} description="Each service carries its publication status. Only services marked available can be ordered today.">
        <Reveal variant="up">
          <ServiceTable services={f.services} />
        </Reveal>
      </Section>

      <Section index="02" eyebrow="How it works" title="Designed across three availability zones" description="Deploy across independent zones with health-based traffic distribution. The diagram shows the logical platform layers; detailed topology is available to customers through the appropriate controlled process.">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <Reveal as="ul" variant="up" className="flex flex-col divide-y divide-line border-y border-line">
            {f.covers.map((c, i) => (
              <li key={c} className="stagger flex items-start gap-4 py-4" style={{ "--i": i } as React.CSSProperties}>
                <span className="mt-0.5 font-mono text-[11px] text-brand">0{i + 1}</span>
                <span className="text-[14.5px] text-fg-2">{c}</span>
              </li>
            ))}
          </Reveal>
          <Reveal variant="right">
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section index="03" eyebrow="Solutions" title={`Where ${f.name} fits`} description="Solution paths that combine this family with others for a customer outcome.">
          <Reveal as="ul" variant="up" className="grid gap-3 md:grid-cols-3">
            {related.map((s, i) => (
              <li key={s.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
                <LinkCard href={`/solutions/${s.slug}`} title={s.name} description={s.copy} tag="solution" />
              </li>
            ))}
          </Reveal>
        </Section>
      )}

      <Section index="04" eyebrow="Related" title="Documentation and related products">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal variant="up">
            <ul className="flex flex-col gap-2">
              {[
                { label: "Getting started", href: "/resources/getting-started" },
                { label: `${f.name} documentation`, href: `${site.links.docs}/${f.slug}` },
                { label: "Architecture Center", href: "/resources/architecture" },
                { label: "Service status", href: site.links.status },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center justify-between rounded-lg border border-line bg-surface-2 px-4 py-3 text-[14px] text-fg-2 transition-colors hover:border-line-strong hover:text-fg">
                    {l.label}
                    <span aria-hidden="true" className="font-mono text-fg-3">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="ul" variant="up" index={1} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {siblings.map((p, i) => (
              <li key={p.slug} className="stagger" style={{ "--i": i } as React.CSSProperties}>
                <Link href={`/products/${p.slug}`} className="group flex flex-col gap-3 rounded-lg border border-line bg-surface-2 p-4 transition-colors hover:border-line-strong">
                  <p.icon className="size-5 text-fg-3 transition-colors group-hover:text-brand" />
                  <span className="text-[13px] font-medium text-fg">{p.name}</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </Section>

      <CallToAction
        title={`Start with ${f.name}.`}
        copy="Launch in the console, or talk to an engineer about sizing, availability-zone design and commercial terms."
      />
    </PageShell>
  );
}
