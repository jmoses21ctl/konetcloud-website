export type Solution = {
  slug: string;
  name: string;
  headline: string;
  copy: string;
  /** Customer problem and desired outcome. */
  problem: string;
  outcome: string;
  /** Product family slugs involved. */
  families: string[];
  /** Logical architecture steps, shown as a numbered flow. */
  architecture: string[];
  considerations: string[];
};

export const solutions: Solution[] = [
  {
    slug: "migration",
    name: "Migrate to KonetCloud",
    headline: "Move applications and data with confidence",
    copy: "Assess, plan and move applications, infrastructure and data to a locally operated cloud platform.",
    problem: "Applications and data sit on ageing on-premises hardware or on cloud regions far from the users and regulators they serve.",
    outcome: "Workloads run on locally operated infrastructure with a clear operating model and no unplanned re-architecture.",
    families: ["compute", "storage", "networking", "data"],
    architecture: [
      "Discover and classify workloads, dependencies and data",
      "Establish landing zone: virtual networks, identity, monitoring",
      "Connect existing environment through private or site-to-site connectivity",
      "Migrate in waves — lift, replatform or rebuild by workload",
      "Cut over with health-based traffic distribution, then decommission",
    ],
    considerations: [
      "Dependency mapping before the first wave",
      "Data migration windows and validation",
      "Operating handover: monitoring, backup, access",
    ],
  },
  {
    slug: "modernization",
    name: "Application Modernization",
    headline: "Build applications for cloud-scale operations",
    copy: "Use compute, containers, networking and data services to modernise applications.",
    problem: "Monolithic applications are slow to change, hard to scale and expensive to operate.",
    outcome: "Services deploy independently, scale on demand and run across availability zones.",
    families: ["compute", "containers", "networking", "data"],
    architecture: [
      "Decompose by domain; identify stateless and stateful components",
      "Run services on container compute or managed Kubernetes",
      "Front services with load balancing and isolated virtual networks",
      "Move state to managed databases and object storage",
      "Instrument with monitoring and logging from day one",
    ],
    considerations: [
      "Containers services published as Preview where applicable",
      "Incremental strangler approach over big-bang rewrites",
      "CI/CD and image management",
    ],
  },
  {
    slug: "business-continuity",
    name: "Business Continuity",
    headline: "Design for continuity across failure domains",
    copy: "Distribute workloads across availability zones and recovery environments.",
    problem: "A single-location deployment means a single infrastructure event can take the whole service down.",
    outcome: "Applications stay available through zone-level events and recover predictably from data loss.",
    families: ["compute", "storage", "networking", "management"],
    architecture: [
      "Deploy application tiers across two or more availability zones",
      "Distribute traffic with health-based load balancing",
      "Replicate data across zones; schedule backups to backup storage",
      "Define recovery objectives and rehearse failover",
    ],
    considerations: [
      "Recovery objectives per workload tier",
      "Stateful services and replication lag",
      "Regular failover testing and runbooks",
    ],
  },
  {
    slug: "sovereign-cloud",
    name: "Sovereign Cloud",
    headline: "Maintain greater control over critical workloads",
    copy: "Use local infrastructure designed to support residency, control and regulatory requirements.",
    problem: "Regulated organisations need clarity on where infrastructure and data reside and who operates them.",
    outcome: "Workloads and data run on infrastructure in Nigeria, designed to support data-residency, operational-control and regulatory requirements.",
    families: ["compute", "storage", "networking", "security"],
    architecture: [
      "Place workloads in Nigerian availability zones",
      "Isolate with virtual networks, identity and network security",
      "Protect data in transit and at rest",
      "Connect regulated environments privately",
      "Retain operational visibility through monitoring and logging",
    ],
    considerations: [
      "Designed for sovereign and regulated workloads — certification status is published on the Trust pages only when formally issued",
      "Shared-responsibility boundaries",
      "Access governance and audit",
    ],
  },
  {
    slug: "ai-infrastructure",
    name: "AI Infrastructure",
    headline: "Accelerate AI development and deployment",
    copy: "Use GPU infrastructure for training, fine-tuning, inference and private AI.",
    problem: "Teams need accelerator capacity close to their data, with isolation for sensitive models and datasets.",
    outcome: "Training, fine-tuning and inference run on in-region GPU infrastructure with data that stays local.",
    families: ["ai-gpu", "storage", "networking", "compute"],
    architecture: [
      "Stage datasets in object and block storage",
      "Provision GPU compute for training and fine-tuning",
      "Serve models on inference infrastructure behind load balancing",
      "Isolate sensitive workloads on private AI infrastructure",
    ],
    considerations: [
      "Capacity planning and requests for accelerator quotas",
      "Data locality and isolation requirements",
      "Managed AI platform services are reserved for a later release",
    ],
  },
  {
    slug: "data-platforms",
    name: "Data Platforms",
    headline: "Build a foundation for operational and analytical data",
    copy: "Combine databases, storage, analytics and migration support for enterprise data.",
    problem: "Operational and analytical data are scattered across systems with no shared platform.",
    outcome: "A single data foundation: managed databases for transactions, warehousing and analytics for insight.",
    families: ["data", "storage", "compute", "networking"],
    architecture: [
      "Run transactional workloads on managed relational databases",
      "Land raw data in object storage",
      "Process with data analytics; centralise in data warehousing",
      "Migrate existing databases with migration support",
    ],
    considerations: [
      "Engine and sizing choices",
      "Retention, backup and access control",
      "Migration sequencing and validation",
    ],
  },
  {
    slug: "hybrid-cloud",
    name: "Private and Hybrid Cloud",
    headline: "Connect existing infrastructure with KonetCloud",
    copy: "Connect enterprise environments through private networking and coordinated operations.",
    problem: "Some systems must stay on-premises, but new capacity and services are needed in the cloud.",
    outcome: "Enterprise networks and KonetCloud operate as one environment with private connectivity and shared operations.",
    families: ["networking", "compute", "storage", "management"],
    architecture: [
      "Establish private or site-to-site connectivity",
      "Extend identity and network segmentation across environments",
      "Place workloads by data gravity and latency needs",
      "Coordinate monitoring, backup and operations across both sides",
    ],
    considerations: [
      "Connectivity capacity and redundancy",
      "Operating model across environments",
      "Data placement and residency",
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
