import { type ServiceStatus, statusMeta } from "@/lib/status";
import { cn } from "@/lib/utils";

const styles: Record<ServiceStatus, string> = {
  ga: "border-lime/30 bg-lime/[0.08] text-lime",
  preview: "border-cyan/30 bg-cyan/[0.08] text-cyan",
  "coming-soon": "border-line-strong bg-fg/[0.04] text-fg-2",
};

const dots: Record<ServiceStatus, string> = {
  ga: "bg-lime",
  preview: "bg-cyan",
  "coming-soon": "bg-fg-3",
};

/** Consistent, accessible service-status label. */
export function StatusBadge({
  status,
  className,
}: {
  status: ServiceStatus;
  className?: string;
}) {
  const meta = statusMeta[status];
  return (
    <span
      title={meta.description}
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 font-mono text-[12px] tracking-[0.1em] whitespace-nowrap uppercase",
        styles[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dots[status])} />
      {meta.label}
    </span>
  );
}
