import { PageShell } from "@/components/layout/page-shell";
import { ComingSoon } from "@/components/sections/coming-soon";

export default function NotFound() {
  return (
    <PageShell>
      <ComingSoon segments={["not-found"]} />
    </PageShell>
  );
}
