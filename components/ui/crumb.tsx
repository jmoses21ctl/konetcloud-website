import Link from "next/link";
import { Fragment } from "react";

/** Mono breadcrumb for PageHero eyebrows: "Products / Compute". */
export function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <>
      {items.map((it, i) => (
        <Fragment key={`${it.label}-${i}`}>
          {i > 0 && (
            <span aria-hidden="true" className="text-paper-3/50">
              /
            </span>
          )}
          {it.href ? (
            <Link href={it.href} className="transition-colors hover:text-paper">
              {it.label}
            </Link>
          ) : (
            <span className="text-brand">{it.label}</span>
          )}
        </Fragment>
      ))}
    </>
  );
}
