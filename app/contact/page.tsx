import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Crumb } from "@/components/ui/crumb";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a KonetCloud engineer about architecture, migration, pricing or support.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic = "sales" } = await searchParams;

  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Support", href: "/support" }, { label: "Contact" }]} />}
        title="Talk to an expert"
        lede="Architecture, migration, commercial terms or a running issue — tell us what you're working on and we'll route you to someone who can act."
      />
      <section className="bg-surface pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <Reveal variant="up">
            <ContactForm defaultTopic={topic} />
          </Reveal>
          <Reveal variant="right" className="flex flex-col gap-8">
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h2 className="font-mono text-[11px] tracking-[0.12em] text-fg-3 uppercase">What happens next</h2>
              <ol className="mt-4 flex flex-col gap-3 text-[14px] text-fg-2">
                {[
                  "We read it — a person, not a queue.",
                  "You get a reply from the right engineer or account lead.",
                  "If it needs a design session, we schedule one.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="font-mono text-[11px] text-brand">0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h2 className="font-mono text-[11px] tracking-[0.12em] text-fg-3 uppercase">Other routes</h2>
              <ul className="mt-4 flex flex-col gap-2 text-[14px]">
                <li><Link href={site.links.status} className="text-fg-2 transition-colors hover:text-fg">Service status →</Link></li>
                <li><Link href={site.links.docs} className="text-fg-2 transition-colors hover:text-fg">Documentation →</Link></li>
                <li><Link href="/support" className="text-fg-2 transition-colors hover:text-fg">Support overview →</Link></li>
              </ul>
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-fg-3">
              {site.name} is a {site.parent.name} company. Lagos, Nigeria.
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
