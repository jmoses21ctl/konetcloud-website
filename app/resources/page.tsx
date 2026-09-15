import type { Metadata } from "next";

import { PageShell } from "@/components/layout/page-shell";
import { CallToAction } from "@/components/sections/cta";
import { Crumb } from "@/components/ui/crumb";
import { LinkCard } from "@/components/ui/link-card";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ServiceStatus } from "@/lib/status";

export const metadata: Metadata = {
  title: "Resources",
  description: "Documentation, architecture centre, getting started, migration guides, FAQs and service status for KonetCloud.",
};

const resources: { title: string; description: string; href: string; status: ServiceStatus }[] = [
  { title: "Getting Started", description: "Sign in, create a project and deploy a first workload.", href: "/resources/getting-started", status: "coming-soon" },
  { title: "Product Documentation", description: "Concepts, configuration guides, limitations and troubleshooting.", href: "/resources/documentation", status: "coming-soon" },
  { title: "Architecture Center", description: "Approved reference architectures, decision guides and workload patterns.", href: "/resources/architecture", status: "coming-soon" },
  { title: "Migration Guides", description: "Assess, plan and move applications and data.", href: "/resources/migration-guides", status: "coming-soon" },
  { title: "FAQs", description: "Common questions on services, pricing, availability and support.", href: "/resources/faqs", status: "coming-soon" },
  { title: "Service Status", description: "Platform availability information and incident communication.", href: "/resources/status", status: "coming-soon" },
];

const developer = [
  { title: "Console", description: "Sign-in, getting-started path and project administration.", href: "/console", status: "coming-soon" as ServiceStatus },
  { title: "API", description: "Authentication, endpoints, examples, errors, quotas and versioning.", href: "/resources/api", status: "coming-soon" as ServiceStatus },
  { title: "CLI", description: "Installation, authentication, command reference and examples.", href: "/resources/cli", status: "coming-soon" as ServiceStatus },
  { title: "SDKs", description: "Supported languages, installation, examples and version policy.", href: "/resources/sdks", status: "coming-soon" as ServiceStatus },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow={<Crumb items={[{ label: "Resources" }]} />}
        title="Build on KonetCloud"
        lede="Direct access to the tools and guidance required to provision, automate and operate infrastructure. Destinations are reserved from the first release and opened as documentation is ready."
      />
      <Section index="01" eyebrow="Resources" title="Evaluate, design, implement">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <li key={r.href} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
              <LinkCard href={r.href} title={r.title} description={r.description}>
                <StatusBadge status={r.status} className="self-start" />
              </LinkCard>
            </li>
          ))}
        </Reveal>
      </Section>
      <Section index="02" eyebrow="Developer experience" title="Console, API, CLI and SDKs" description="Interfaces are published only when the corresponding documentation is ready.">
        <Reveal as="ul" variant="up" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {developer.map((r, i) => (
            <li key={r.href} className="stagger-pop" style={{ "--i": i } as React.CSSProperties}>
              <LinkCard href={r.href} title={r.title} description={r.description}>
                <StatusBadge status={r.status} className="self-start" />
              </LinkCard>
            </li>
          ))}
        </Reveal>
      </Section>
      <CallToAction />
    </PageShell>
  );
}
