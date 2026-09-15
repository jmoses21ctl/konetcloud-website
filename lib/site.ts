/**
 * Single source of truth for site-wide content that isn't page-specific:
 * brand strings, navigation, and metadata defaults.
 */
export const site = {
  name: "KonetCloud",
  tagline: "Cloud infrastructure built for Africa's most important digital workloads.",
  description:
    "KonetCloud is a cloud platform from 21st Century Technologies: compute, storage, networking, data, AI and GPU, containers, management and security — hosted across multiple availability zones in Nigeria, designed for availability, local control and enterprise-scale growth.",
  url: "https://konetcloud.com",
  parent: {
    name: "21st Century Technologies",
    url: "https://www.21ctl.com",
  },
  links: {
    console: "/console",
    docs: "/resources/documentation",
    status: "/resources/status",
    contact: "/contact",
    sales: "/contact?topic=sales",
  },
} as const;

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = {
  label: string;
  href: string;
  /** Present when the item opens a menu in addition to navigating. */
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Compute", href: "/products/compute", description: "Virtual machines, general purpose, optimised and GPU" },
      { label: "Storage", href: "/products/storage", description: "Block, object, file, backup and archive" },
      { label: "Networking", href: "/products/networking", description: "Virtual networks, load balancing, private connectivity" },
      { label: "Data and Big Data", href: "/products/data", description: "Managed databases, analytics, warehousing, migration" },
      { label: "AI and GPU", href: "/products/ai-gpu", description: "GPU compute, training, fine-tuning, inference" },
      { label: "Containers", href: "/products/containers", description: "Managed Kubernetes, registry, container compute" },
      { label: "Management", href: "/products/management", description: "Console, monitoring, logging, backup, billing" },
      { label: "Security", href: "/products/security", description: "Identity, network security, data protection" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Migrate to KonetCloud", href: "/solutions/migration" },
      { label: "Application Modernization", href: "/solutions/modernization" },
      { label: "Business Continuity", href: "/solutions/business-continuity" },
      { label: "Sovereign Cloud", href: "/solutions/sovereign-cloud" },
      { label: "AI Infrastructure", href: "/solutions/ai-infrastructure" },
      { label: "Data Platforms", href: "/solutions/data-platforms" },
      { label: "Private and Hybrid Cloud", href: "/solutions/hybrid-cloud" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Financial Services", href: "/industries/financial-services" },
      { label: "Government and Public Sector", href: "/industries/government" },
      { label: "Telecommunications", href: "/industries/telecommunications" },
      { label: "Enterprise", href: "/industries/enterprise" },
      { label: "Technology and Startups", href: "/industries/technology" },
      { label: "Media and Digital Services", href: "/industries/media" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Documentation", href: "/resources/documentation" },
      { label: "Architecture Center", href: "/resources/architecture" },
      { label: "Getting Started", href: "/resources/getting-started" },
      { label: "Migration Guides", href: "/resources/migration-guides" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Service Status", href: "/resources/status" },
    ],
  },
  { label: "Trust", href: "/trust" },
  { label: "Support", href: "/support" },
];
