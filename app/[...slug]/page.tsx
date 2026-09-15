import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ComingSoon, titleFromSlug } from "@/components/sections/coming-soon";

/**
 * Catch-all for routes that are linked but not yet built. Renders a branded
 * placeholder instead of a 404 so navigation never dead-ends. Delete this
 * route once every linked page has its own file.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: titleFromSlug(slug[slug.length - 1] ?? ""),
    robots: { index: false, follow: true },
  };
}

export default async function PlaceholderPage({
  params,
}: PageProps<"/[...slug]">) {
  const { slug } = await params;
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ComingSoon segments={slug} />
      </main>
      <Footer />
    </>
  );
}
