import { type ServiceStatus, statusMeta } from "@/lib/status";
import { cn } from "@/lib/utils";

const styles: Record<ServiceStatus, string> = {
  ga: "border-lime/30 bg-lime/[0.08] text-lime",
  preview: "border-brand/30 bg-brand/[0.08] text-brand",
  "coming-soon": "border-amber/30 bg-amber/[0.08] text-amber",
};

const dots: Record<ServiceStatus, string> = {
  ga: "bg-lime",
  preview: "bg-brand",
  "coming-soon": "bg-amber",
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
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2.5 font-mono text-[10.5px] tracking-[0.1em] whitespace-nowrap uppercase",
        styles[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dots[status])} />
      {meta.label}
    </span>
  );
}
