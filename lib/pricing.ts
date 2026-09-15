/**
 * Pricing overview content. No figures: every published price must map to
 * an approved configuration and charging unit — see "Pricing Publication
 * Rules". This file describes models, categories and tools only.
 */
export const pricingModels = [
  { name: "On-demand", copy: "Pay for what you use, metered per charging unit, with no upfront commitment." },
  { name: "Committed-use", copy: "Commit to a usage level over a term in exchange for reduced rates." },
  { name: "Reserved", copy: "Reserve specific capacity ahead of time for predictable workloads." },
  { name: "Dedicated", copy: "Single-tenant infrastructure priced per environment." },
  { name: "Negotiated", copy: "Enterprise terms for large, regulated or multi-year engagements." },
] as const;

export const pricingCategories = [
  { slug: "compute", name: "Compute", metered: "Instance hours by family and size" },
  { slug: "gpu", name: "GPU", metered: "Accelerator hours by GPU option" },
  { slug: "storage", name: "Storage", metered: "Capacity, requests and retention tier" },
  { slug: "networking", name: "Networking", metered: "Public IPs, load balancing, NAT and outbound transfer" },
  { slug: "data", name: "Data and Big Data", metered: "Managed database and analytics capacity" },
  { slug: "support", name: "Support", metered: "Per approved support plan", pending: true },
] as const;

export const pricingTools = [
  { slug: "calculator", name: "Pricing Calculator", copy: "Estimate monthly infrastructure cost before deployment.", status: "coming-soon" },
  { slug: "compare", name: "Compare Configurations", copy: "Compare compute, storage, GPU and service configurations.", status: "coming-soon" },
  { slug: "enterprise", name: "Enterprise Pricing", copy: "Request committed-use, dedicated infrastructure or negotiated commercial terms.", status: "ga" },
  { slug: "cost-guidance", name: "Cost Guidance", copy: "Metering units, billing periods, included capacity and chargeable consumption.", status: "ga" },
] as const;

export const pricingNotes = [
  "Prices are stated exclusive of applicable taxes unless marked otherwise.",
  "Outbound data transfer, public IPs, load balancing, NAT, storage requests and support are charged where applicable and shown on each category page.",
  "On-demand, committed-use, reserved, dedicated and negotiated pricing are clearly distinguished wherever they apply.",
] as const;
