import type { ComponentType, SVGProps } from "react";

import {
  AiIcon,
  ComputeIcon,
  DatabaseIcon,
  KubernetesIcon,
  NetworkIcon,
  OpsIcon,
  ShieldIcon,
  StorageIcon,
} from "@/components/ui/icons";
import type { ServiceStatus } from "@/lib/status";

/*
 * STATUS APPROVAL PENDING
 * Every `status` below is a placeholder awaiting sign-off from the product
 * owner. Items the brief explicitly qualifies ("when available", "where
 * applicable", containers readiness) are marked accordingly; everything
 * else defaults to "ga" purely so the catalogue renders. Confirm before launch.
 */

export type Service = {
  name: string;
  copy: string;
  status: ServiceStatus;
};

export type ProductFamily = {
  slug: string;
  name: string;
  /** Short mono label used in strips and menus. */
  short: string;
  /** Page headline (H1). */
  headline: string;
  /** One-sentence value statement under the headline. */
  lede: string;
  /** Homepage card copy. */
  summary: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  services: Service[];
  /** Recommended supporting sections, rendered as a checklist of what the page covers. */
  covers: string[];
  /** Publication note shown only in code — keeps the page honest. */
  note?: string;
};

export const productFamilies: ProductFamily[] = [
  {
    slug: "compute",
    name: "Compute",
    short: "compute",
    headline: "Flexible compute for applications of every size",
    lede: "Provision cloud servers for enterprise applications, web platforms, development environments and data-intensive workloads.",
    summary:
      "Flexible virtual compute for websites, enterprise applications, databases and demanding production workloads.",
    icon: ComputeIcon,
    services: [
      { name: "Virtual Machines", status: "ga", copy: "Deploy configurable virtual machines with CPU, memory, networking and storage options matched to the workload." },
      { name: "General Purpose Compute", status: "ga", copy: "Balanced compute and memory for websites, APIs, application servers and business systems." },
      { name: "Compute Optimized", status: "ga", copy: "Higher compute performance for processing-intensive applications." },
      { name: "Memory Optimized", status: "ga", copy: "Memory-focused configurations for databases, caching and enterprise applications." },
      { name: "GPU Compute", status: "ga", copy: "Accelerated infrastructure for AI, machine learning and high-performance workloads." },
    ],
    covers: [
      "Instance families and workload fit",
      "CPU, memory, storage and network configuration options",
      "Operating-system images and supported deployment methods",
      "Availability-zone selection and multi-zone design guidance",
      "Billing model and pricing examples",
      "Monitoring, backup and security integrations",
    ],
    note: "Do not publish processor models, network limits, IOPS or included bandwidth until approved.",
  },
  {
    slug: "storage",
    name: "Storage",
    short: "storage",
    headline: "Store, protect and access data at cloud scale",
    lede: "Storage services for applications, databases, backups, analytics and enterprise workloads.",
    summary:
      "Scalable storage services for applications, databases, backups, archives and enterprise data.",
    icon: StorageIcon,
    services: [
      { name: "Block Storage", status: "ga", copy: "Persistent high-performance storage for virtual machines and databases." },
      { name: "Object Storage", status: "ga", copy: "Scalable storage for application data, media, backups, archives and large datasets." },
      { name: "File Storage", status: "ga", copy: "Shared file storage for applications and enterprise workloads." },
      { name: "Backup Storage", status: "ga", copy: "Protect cloud and enterprise workloads with centralized backup storage." },
      { name: "Archive Storage", status: "coming-soon", copy: "Cost-optimized storage for long-term retention." },
    ],
    covers: [
      "Storage selection guide by workload",
      "Durability, redundancy and availability-zone behaviour",
      "Performance tiers and approved technical limits",
      "Encryption and access control",
      "Backup, retention and recovery options",
      "Data transfer and request charging model",
    ],
  },
  {
    slug: "networking",
    name: "Networking",
    short: "networking",
    headline: "Connect applications, users and infrastructure",
    lede: "Cloud networking built for performance and availability — from isolated virtual networks to private enterprise connectivity.",
    summary:
      "Build isolated networks, connect applications, distribute traffic and securely connect cloud and enterprise environments.",
    icon: NetworkIcon,
    services: [
      { name: "Virtual Networks", status: "ga", copy: "Create logically isolated cloud networks for applications and workloads." },
      { name: "Public IP", status: "ga", copy: "Assign internet-reachable addresses to cloud resources where required." },
      { name: "Load Balancing", status: "ga", copy: "Distribute application traffic across healthy resources to improve availability and performance." },
      { name: "NAT Gateway", status: "ga", copy: "Provide controlled outbound connectivity for private cloud resources." },
      { name: "DNS", status: "ga", copy: "Reliable name resolution for cloud-hosted applications and services." },
      { name: "Private Connectivity", status: "ga", copy: "Connect enterprise environments and cloud workloads without relying solely on public internet paths." },
      { name: "Site-to-Site Connectivity", status: "ga", copy: "Connect offices, data centres and enterprise networks to KonetCloud." },
    ],
    covers: [
      "Network isolation and segmentation",
      "Traffic distribution and health checks",
      "Public and private connectivity options",
      "Multi-zone network design",
      "Charging model for public IPs, load balancing and NAT",
    ],
  },
  {
    slug: "data",
    name: "Data and Big Data",
    short: "data",
    headline: "Turn data into infrastructure for growth",
    lede: "Run operational databases, analytics platforms and data-intensive applications on KonetCloud.",
    summary:
      "Managed data services for transactional applications, analytics and data-intensive workloads.",
    icon: DatabaseIcon,
    services: [
      { name: "Managed Relational Databases", status: "ga", copy: "Managed database environments for modern and enterprise applications." },
      { name: "Database Infrastructure", status: "ga", copy: "Dedicated compute, memory and storage configurations for customer-managed databases." },
      { name: "Data Analytics", status: "ga", copy: "Infrastructure and services for processing and analysing large datasets." },
      { name: "Data Warehousing", status: "ga", copy: "Build centralised analytical environments for reporting, intelligence and data processing." },
      { name: "Data Migration", status: "ga", copy: "Move databases and datasets into KonetCloud with architecture and migration support." },
    ],
    covers: [
      "Engine selection and workload fit",
      "Replication, backup and recovery",
      "Analytics and warehousing patterns",
      "Migration approach and support",
      "Charging model and sizing guidance",
    ],
    note: "Publish supported database engines only after operational readiness is confirmed.",
  },
  {
    slug: "ai-gpu",
    name: "AI and GPU",
    short: "ai · gpu",
    headline: "Accelerated infrastructure for the next generation of African AI",
    lede: "Build, train, fine-tune and serve AI workloads on high-performance GPU infrastructure hosted on KonetCloud.",
    summary:
      "High-performance GPU infrastructure for model training, fine-tuning, inference and accelerated computing.",
    icon: AiIcon,
    services: [
      { name: "GPU Compute", status: "ga", copy: "Dedicated accelerator capacity for AI, machine learning and high-performance computing." },
      { name: "AI Training", status: "ga", copy: "Infrastructure for model development, training and large-scale experimentation." },
      { name: "Fine-Tuning", status: "ga", copy: "GPU environments for adapting models to organisation-specific data and use cases." },
      { name: "AI Inference", status: "ga", copy: "Deploy models for responsive production inference and AI-powered applications." },
      { name: "AI Development Environments", status: "ga", copy: "Provision GPU-enabled environments for data scientists, researchers and engineering teams." },
      { name: "Private AI Infrastructure", status: "ga", copy: "Dedicated environments for organisations that require greater workload, data and infrastructure isolation." },
    ],
    covers: [
      "GPU options and workload fit",
      "Training, fine-tuning and inference patterns",
      "Data locality and isolation options",
      "Development environment provisioning",
      "Charging model and capacity requests",
    ],
    note: "Managed inference endpoints, model catalogue, notebooks, AI APIs and vector services are reserved and must not be advertised until ready.",
  },
  {
    slug: "containers",
    name: "Containers",
    short: "containers",
    headline: "Build and run modern applications with containers",
    lede: "Deploy and operate containerised applications on scalable KonetCloud infrastructure.",
    summary:
      "Deploy and operate containerized applications on scalable cloud infrastructure.",
    icon: KubernetesIcon,
    services: [
      { name: "Managed Kubernetes", status: "preview", copy: "Deploy and operate Kubernetes clusters on KonetCloud infrastructure." },
      { name: "Container Registry", status: "preview", copy: "Store and manage container images for application deployment." },
      { name: "Container Compute", status: "ga", copy: "Run containerised workloads using scalable compute resources." },
      { name: "Private Kubernetes", status: "coming-soon", copy: "Dedicated Kubernetes environments for enterprise and regulated workloads." },
    ],
    covers: [
      "Cluster provisioning and operations",
      "Image storage and deployment",
      "Networking and storage integration",
      "Multi-zone cluster design",
    ],
    note: "Display only approved items as Preview or Coming Soon. Do not present VMs running containers as managed Kubernetes.",
  },
  {
    slug: "management",
    name: "Management",
    short: "management",
    headline: "Manage KonetCloud from one place",
    lede: "Operate KonetCloud resources through a unified management experience with the visibility and controls required for production workloads.",
    summary:
      "A unified console with monitoring, logging, resource management, backup and billing for production operations.",
    icon: OpsIcon,
    services: [
      { name: "Cloud Console", status: "ga", copy: "Provision and manage cloud infrastructure." },
      { name: "Monitoring", status: "ga", copy: "Track the health and performance of applications and infrastructure." },
      { name: "Logging", status: "ga", copy: "Collect operational logs for cloud resources and applications." },
      { name: "Resource Management", status: "ga", copy: "Organise, manage and control cloud resources centrally." },
      { name: "Backup and Recovery", status: "ga", copy: "Protect workloads and restore data when required." },
      { name: "Usage and Billing", status: "ga", copy: "Understand cloud consumption and manage service costs." },
      { name: "Time Services", status: "preview", copy: "Controlled time synchronisation for platform and workload operations." },
    ],
    covers: [
      "Console and access model",
      "Monitoring and logging coverage",
      "Backup and recovery options",
      "Usage reporting and billing",
    ],
  },
  {
    slug: "security",
    name: "Security",
    short: "security",
    headline: "Security built into the cloud foundation",
    lede: "KonetCloud incorporates security across identity, network access, infrastructure and operations to help customers protect workloads and data.",
    summary:
      "Identity, network security, monitoring and data protection built into the platform foundation.",
    icon: ShieldIcon,
    services: [
      { name: "Identity and Access", status: "ga", copy: "Control access to cloud resources and administrative functions." },
      { name: "Network Security", status: "ga", copy: "Protect and segment cloud workloads and connectivity." },
      { name: "Monitoring and Logging", status: "ga", copy: "Maintain visibility into cloud infrastructure and operational activity." },
      { name: "Data Protection", status: "ga", copy: "Support protection of data in transit and at rest." },
    ],
    covers: [
      "Identity and access control",
      "Network segmentation and protection",
      "Operational visibility",
      "Encryption in transit and at rest",
    ],
    note: "Keep initial public security content concise; no broad managed-security catalogue yet.",
  },
];

/** The six families featured in the hero product strip and homepage grid. */
export const featuredFamilySlugs = [
  "compute",
  "storage",
  "networking",
  "data",
  "ai-gpu",
  "containers",
] as const;

export function getFamily(slug: string) {
  return productFamilies.find((f) => f.slug === slug);
}
