import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

/** Navbar + main + footer. Every route except the homepage uses it. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
