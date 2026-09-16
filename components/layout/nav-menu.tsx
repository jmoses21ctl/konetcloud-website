"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Desktop nav item. Plain items render a link; items with children render
 * a link plus a hover/focus panel. The panel is a real list so it scales
 * as families are added without touching layout.
 */
export function NavMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const panelId = useId();
  const timer = useRef<number>(0);

  // Close on outside click / Escape so keyboard users aren't trapped
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = window.setTimeout(() => setOpen(false), 120);
  };

  if (!item.children) {
    return (
      <li>
        <NavLink href={item.href}>{item.label}</NavLink>
      </li>
    );
  }

  const wide = item.children.some((c) => c.description);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={show}
      onPointerLeave={hide}
    >
      <NavLink
        href={item.href}
        aria-expanded={open}
        aria-controls={panelId}
        onFocus={show}
        onClick={(e) => {
          // Touch/pen: first tap opens, second navigates
          const native = e.nativeEvent as PointerEvent;
          if (native.pointerType && native.pointerType !== "mouse" && !open) {
            e.preventDefault();
            show();
          }
        }}
      >
        {item.label}
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn(
            "ml-1 size-3 transition-transform duration-300",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="m3 4.5 3 3 3-3" />
        </svg>
      </NavLink>

      <div
        id={panelId}
        onFocus={show}
        onBlur={(e) => {
          if (!ref.current?.contains(e.relatedTarget as Node)) hide();
        }}
        className={cn(
          "absolute top-full left-1/2 pt-2 transition-[opacity,transform] duration-300 ease-out-expo",
          open
            ? "translate-x-[-50%] opacity-100"
            : "pointer-events-none translate-x-[-50%] translate-y-1 opacity-0",
        )}
      >
        <ul
          className={cn(
            "grid gap-0.5 rounded-xl border border-line bg-surface-2/95 p-1.5 shadow-[0_24px_60px_-20px_rgb(16_24_40/0.3)] backdrop-blur-xl",
            wide ? "w-[34rem] grid-cols-2" : "w-64",
          )}
        >
          {item.children.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                className="group/i flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-fg/[0.05]"
              >
                <span className="text-[13.5px] font-medium text-fg transition-colors group-hover/i:text-brand-soft">
                  {c.label}
                </span>
                {c.description && (
                  <span className="text-[12px] leading-snug text-fg-3">
                    {c.description}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li className={cn("mt-1 border-t border-line pt-1", wide && "col-span-2")}>
            <Link
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-[12.5px] font-medium text-fg-2 transition-colors hover:bg-fg/[0.05] hover:text-fg"
            >
              All {item.label.toLowerCase()}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
}

/** Text link with an underline that draws in from the left on hover. */
function NavLink({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group relative inline-flex h-9 items-center px-3 text-[13.5px] font-medium tracking-[-0.005em] text-fg-2 transition-colors duration-300 hover:text-fg aria-expanded:text-fg",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out-expo group-hover:scale-x-100"
      />
    </Link>
  );
}
