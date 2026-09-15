import { StatusBadge } from "@/components/ui/status-badge";
import type { Service } from "@/lib/products";

/**
 * Service list as a ledger: name, status, customer copy. Structured only
 * where comparison is useful; otherwise reads as a clean list.
 */
export function ServiceTable({ services }: { services: Service[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
      <div className="hidden grid-cols-[14rem_1fr_auto] gap-6 border-b border-line px-6 py-3 font-mono text-[11px] tracking-[0.12em] text-paper-3 uppercase md:grid">
        <span>Service</span>
        <span>What it does</span>
        <span>Status</span>
      </div>
      <ul className="divide-y divide-line">
        {services.map((s, i) => (
          <li
            key={s.name}
            className="stagger grid gap-2 px-5 py-4 transition-colors hover:bg-white/[0.025] sm:px-6 md:grid-cols-[14rem_1fr_auto] md:items-start md:gap-6"
            style={{ "--i": i } as React.CSSProperties}
          >
            <div className="flex items-center justify-between gap-3 md:block">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-paper">
                {s.name}
              </h3>
              <StatusBadge status={s.status} className="md:hidden" />
            </div>
            <p className="text-[14px] leading-relaxed text-paper-2">{s.copy}</p>
            <StatusBadge status={s.status} className="hidden md:inline-flex" />
          </li>
        ))}
      </ul>
    </div>
  );
}
