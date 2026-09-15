export type Industry = {
  slug: string;
  name: string;
  copy: string;
  /** Sector-specific workload examples. */
  workloads: string[];
  /** Product family slugs most relevant. */
  families: string[];
  /** Solution slugs most relevant. */
  solutions: string[];
  considerations: string[];
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services",
    copy: "Infrastructure for banking, payments, fintech, analytics and data-intensive financial applications — with a focus on availability, control, connectivity, workload isolation and regulated operations.",
    workloads: ["Core banking and payments", "Fraud analytics", "Fintech platforms", "Regulatory reporting"],
    families: ["compute", "data", "networking", "security"],
    solutions: ["business-continuity", "sovereign-cloud", "hybrid-cloud"],
    considerations: ["Multi-zone availability", "Workload isolation", "Private connectivity to existing environments", "Operational visibility and audit"],
  },
  {
    slug: "government",
    name: "Government and Public Sector",
    copy: "Local infrastructure for public-sector digital services, institutional systems and workloads with data-residency and control requirements.",
    workloads: ["Citizen-facing digital services", "Institutional systems", "Records and registries", "Analytics for planning"],
    families: ["compute", "storage", "security", "management"],
    solutions: ["sovereign-cloud", "migration", "business-continuity"],
    considerations: ["Data residency", "Operational control", "Identity and access governance", "Continuity across zones"],
  },
  {
    slug: "telecommunications",
    name: "Telecommunications",
    copy: "Cloud infrastructure for communications platforms, digital services, network applications and large-scale data workloads.",
    workloads: ["Digital service platforms", "Network applications", "Subscriber analytics", "Content and media delivery"],
    families: ["compute", "networking", "data", "storage"],
    solutions: ["modernization", "data-platforms", "hybrid-cloud"],
    considerations: ["Traffic distribution and scale", "Private interconnection", "Large-dataset storage and processing"],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    copy: "Modernise business applications, infrastructure and data platforms while retaining clear operational control.",
    workloads: ["ERP and business systems", "Internal platforms", "Backup and recovery", "Data warehousing"],
    families: ["compute", "storage", "data", "management"],
    solutions: ["migration", "modernization", "hybrid-cloud"],
    considerations: ["Migration sequencing", "Operating model and control", "Backup and continuity"],
  },
  {
    slug: "technology",
    name: "Technology and Startups",
    copy: "Build and scale digital products without making infrastructure ownership the first barrier to growth.",
    workloads: ["SaaS platforms", "APIs and mobile backends", "AI features and inference", "Data pipelines"],
    families: ["compute", "containers", "ai-gpu", "data"],
    solutions: ["modernization", "ai-infrastructure", "data-platforms"],
    considerations: ["Scale on demand", "Container and GPU options", "Simple pricing and billing"],
  },
  {
    slug: "media",
    name: "Media and Digital Services",
    copy: "Compute, storage and networking for content platforms, applications, processing and delivery workloads.",
    workloads: ["Content platforms", "Media processing", "Streaming and delivery", "Audience analytics"],
    families: ["compute", "storage", "networking", "data"],
    solutions: ["modernization", "data-platforms", "business-continuity"],
    considerations: ["Object storage for media", "Traffic distribution", "Processing capacity"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
