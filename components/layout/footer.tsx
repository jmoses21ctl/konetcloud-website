import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Reveal } from "@/components/ui/reveal";
import { navigation, site } from "@/lib/site";

const utility = [
  { label: "Documentation", href: site.links.docs },
  { label: "Service status", href: site.links.status },
  { label: "Contact sales", href: site.links.sales },
  { label: "Support", href: "/support" },
  { label: "Console", href: site.links.console },
];

const legal = [
  { label: "Privacy", href: "/trust/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Shared responsibility", href: "/trust/shared-responsibility" },
];

/** Footer columns mirror primary navigation so nothing is orphaned. */
export function Footer() {
  const columns = navigation.filter((n) => n.children);
  return (
    <footer className="relative border-t border-line bg-ink">
      <Reveal
        variant="up"
        className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8"
      >
        <div className="stagger flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-[13.5px] leading-relaxed text-paper-2">
            Cloud infrastructure built for Africa&apos;s most important digital
            workloads.
          </p>
          <p className="font-mono text-[11px] text-paper-3">
            A{" "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noreferrer"
              className="text-paper-2 underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {site.parent.name}
            </a>{" "}
            company
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {utility.map((u) => (
              <li key={u.href}>
                <Link
                  href={u.href}
                  className="text-[12.5px] text-paper-3 transition-colors hover:text-paper"
                >
                  {u.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col, i) => (
          <nav
            key={col.href}
            aria-label={col.label}
            className="stagger"
            style={{ "--i": i + 1 } as React.CSSProperties}
          >
            <h3 className="font-mono text-[11px] tracking-[0.12em] text-paper-3 uppercase">
              <Link href={col.href} className="transition-colors hover:text-paper">
                {col.label}
              </Link>
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.children!.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-paper-2 transition-colors duration-200 hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Reveal>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-5 font-mono text-[11px] text-paper-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. Lagos, Nigeria.
          </span>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {[{ label: "Trust", href: "/trust" }, ...legal].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-paper-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
