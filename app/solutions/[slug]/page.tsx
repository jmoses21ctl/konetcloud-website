import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Illustration, solutionScene } from "@/components/illustrations";
import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getFamily } from "@/lib/products";
import { site } from "@/lib/site";
import { getSolution, solutions } from "@/lib/solutions";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const s = getSolution((await params).slug);
  return s ? { title: s.name, description: s.copy } : {};
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const families = s.families.map(getFamily).filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Solutions", href: "/solutions" }, { label: s.name }]} />}
        title={s.headline}
        lede={s.copy}
        visual={<Illustration scene={solutionScene[s.slug] ?? s.families[0]} />}
      >
        <Button href={site.links.sales} arrow>
          Talk to an expert
        </Button>
        <Button variant="secondary" href="/resources/architecture">
          Architecture Center
        </Button>
      </PageHero>

      {/* 1. Problem and outcome */}
      <Section index="01" eyebrow="Problem and outcome" title="What changes">
        <Reveal variant="up" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          <div className="stagger flex flex-col gap-3 bg-surface p-6 sm:p-8" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="font-mono text-[12px] tracking-[0.12em] text-fg-3 uppercase">Today</span>
            <p className="text-[16px] leading-relaxed text-fg-2">{s.problem}</p>
          </div>
          <div className="stagger flex flex-col gap-3 bg-surface p-6 sm:p-8" style={{ "--i": 1 } as React.CSSProperties}>
            <span className="font-mono text-[12px] tracking-[0.12em] text-brand uppercase">With KonetCloud</span>
            <p className="text-[17px] leading-relaxed text-fg">{s.outcome}</p>
          </div>
        </Reveal>
      </Section>

      {/* 2. Logical architecture */}
      <Section index="02" eyebrow="Architecture" title="Recommended approach, at a logical level" description="Steps in order. Each maps to KonetCloud services below; detailed designs are produced with your team.">
        <Reveal as="ol" variant="up" className="relative flex flex-col gap-0 border-l border-line pl-8">
          {s.architecture.map((step, i) => (
            <li key={step} className="stagger relative py-4" style={{ "--i": i } as React.CSSProperties}>
              <span aria-hidden="true" className="absolute top-5 -left-8 flex size-[calc(theme(spacing.4)-1px)] -translate-x-1/2 items-center justify-center">
                <span className="size-2 rounded-full bg-brand shadow-[0_0_12px_rgb(0_126_237/0.6)]" />
              </span>
              <span className="mr-3 font-mono text-[12.5px] text-fg-3">0{i + 1}</span>
              <span className="text-[15px] text-fg-2">{step}</span>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* 3. Services involved */}
      <Section index="03" eyebrow="Services" title="KonetCloud services involved">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {families.map((f, i) => (
            <li key={f.slug} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
              <LinkCard href={`/products/${f.slug}`} title={f.name} description={f.summary} icon={f.icon} />
            </li>
          ))}
        </Reveal>
      </Section>

      {/* 4. Considerations */}
      <Section index="04" eyebrow="Considerations" title="Migration, implementation and operations" description="Benefits are stated only where evidence exists; we would rather show you than tell you.">
        <Reveal as="ul" variant="up" className="grid gap-3 md:grid-cols-3">
          {s.considerations.map((c, i) => (
            <li key={c} className="stagger rounded-xl border border-line bg-surface-2 p-5 text-[16px] leading-relaxed text-fg-2" style={{ "--i": i } as React.CSSProperties}>
              {c}
            </li>
          ))}
        </Reveal>
      </Section>

      <CallToAction
        title="Talk through the architecture."
        copy="Bring your constraints. An engineer will map them to zones, services and an operating model — then you decide."
        primary={{ label: "Book a technical consultation", href: site.links.sales }}
        secondary={{ label: "Read the documentation", href: site.links.docs }}
      />
    </PageShell>
  );
}
