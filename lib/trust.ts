export const trustAreas = [
  { slug: "data-residency", name: "Data Residency", copy: "Understand where customer workloads and data are hosted." },
  { slug: "resilience", name: "Infrastructure Resilience", copy: "Learn how KonetCloud uses multiple availability zones and redundant infrastructure." },
  { slug: "privacy", name: "Privacy", copy: "Understand how customer information is handled and protected." },
  { slug: "compliance", name: "Compliance", copy: "Access approved information relating to applicable standards, controls and certifications." },
  { slug: "availability", name: "Service Availability", copy: "Review platform availability information and approved service commitments." },
  { slug: "shared-responsibility", name: "Shared Responsibility", copy: "Understand KonetCloud and customer responsibilities for cloud workloads." },
] as const;

/** Approved sovereignty wording — do not strengthen until certification is issued. */
export const sovereigntyWording =
  "Designed for sovereign and regulated workloads, and built to support data residency and sovereign cloud requirements.";

/**
 * Representative zones for diagrams and demos. Deliberately unnamed and
 * un-numbered: the public site describes a multi-zone architecture, not a
 * count or list of physical sites.
 */
export const availabilityZones = [
  { id: "az-a", name: "Zone A", label: "Availability zone" },
  { id: "az-b", name: "Zone B", label: "Availability zone" },
  { id: "az-c", name: "Zone C", label: "Availability zone" },
] as const;

export const availabilityAttributes = [
  "Multiple Availability Zones",
  "Redundant Connectivity",
  "Health-Based Traffic Distribution",
  "Workload Resilience",
] as const;
