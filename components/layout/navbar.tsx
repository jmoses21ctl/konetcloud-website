import { Logo } from "@/components/brand/logo";
import { HeaderChrome } from "@/components/layout/header-chrome";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavMenu } from "@/components/layout/nav-menu";
import { Button } from "@/components/ui/button";
import { navigation, site } from "@/lib/site";

export function Navbar() {
  return (
    <HeaderChrome>
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between transition-[height] duration-500 ease-out-expo group-data-[scrolled=true]/header:h-14"
      >
        <Logo />

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navigation.map((item) => (
            <NavMenu key={item.href} item={item} />
          ))}
        </ul>

        <div className="hidden items-center gap-2 xl:flex">
          <Button variant="ghost" size="sm" href={site.links.sales}>
            Talk to an expert
          </Button>
          <Button size="sm" href={site.links.console} arrow>
            Get started
          </Button>
        </div>

        <MobileNav />
      </nav>
    </HeaderChrome>
  );
}
