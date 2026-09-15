/**
 * Service publication status — assigned by the product owner, never inferred.
 * See "Service Publication Control" in the content brief.
 */
export type ServiceStatus = "ga" | "preview" | "coming-soon";

export const statusMeta: Record<
  ServiceStatus,
  { label: string; description: string }
> = {
  ga: {
    label: "Available",
    description: "Production-ready, supported and commercially available.",
  },
  preview: {
    label: "Preview",
    description: "Available to approved customers under defined limitations.",
  },
  "coming-soon": {
    label: "Coming soon",
    description: "Planned; not yet available for customer use.",
  },
};
