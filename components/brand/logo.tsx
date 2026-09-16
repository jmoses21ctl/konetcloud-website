import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show only the K mark, e.g. in compact spaces. */
  markOnly?: boolean;
  /** Use the white-wordmark variant for dark or golden backgrounds. */
  onDark?: boolean;
};

/** Konet wordmark supplied by the brand team (colour K + blue "onet"). */
export function Logo({ className, markOnly = false, onDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="KonetCloud home"
      className={cn("group inline-flex items-center rounded-sm", className)}
    >
      {markOnly ? (
        <Image
          src="/brand/konet-mark.png"
          alt=""
          width={372}
          height={492}
          priority
          className="h-8 w-auto transition-transform duration-500 ease-out-expo group-hover:-translate-y-px"
        />
      ) : (
        <Image
          src={onDark ? "/brand/konet-logo-dark.png" : "/brand/konet-logo.png"}
          alt="Konet"
          width={1660}
          height={492}
          priority
          className="h-[30px] w-auto transition-transform duration-500 ease-out-expo group-hover:-translate-y-px"
        />
      )}
    </Link>
  );
}

/** Square K mark for watermarks and icons. */
export function KonetMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/konet-mark.png"
      alt=""
      width={372}
      height={492}
      aria-hidden="true"
      className={cn("h-auto", className)}
    />
  );
}
