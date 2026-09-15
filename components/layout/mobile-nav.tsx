"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Hamburger + sheet below `xl`. Groups with children expand in place. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative -mr-2 flex size-10 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/[0.06]"
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute h-px w-[18px] bg-current transition-transform duration-300 ease-out-expo",
            open ? "rotate-45" : "-translate-y-[3.5px]",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute h-px w-[18px] bg-current transition-transform duration-300 ease-out-expo",
            open ? "-rotate-45" : "translate-y-[3.5px]",
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-line bg-ink"
      >
        <ul className="container-x flex flex-col py-2">
          {navigation.map((item, i) => {
            const isOpen = expanded === item.label;
            return (
              <li
                key={item.href}
                className="rise border-b border-line last:border-0"
                style={{ "--i": i } as React.CSSProperties}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setExpanded(isOpen ? null : item.label)
                      }
                      className="flex w-full items-center justify-between py-4 text-lg font-medium tracking-[-0.01em] text-paper"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "font-mono text-xs text-paper-3 transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      >
                        +
                      </span>
                    </button>
                    <ul
                      className={cn(
                        "grid transition-[grid-template-rows] duration-400 ease-out-expo",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <li className="overflow-hidden">
                        <ul className="flex flex-col pb-3">
                          <li>
                            <Link
                              href={item.href}
                              onClick={close}
                              className="block py-2 text-[15px] text-brand"
                            >
                              All {item.label.toLowerCase()}
                            </Link>
                          </li>
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={close}
                                className="block py-2 text-[15px] text-paper-2 transition-colors hover:text-paper"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 text-lg font-medium tracking-[-0.01em] text-paper"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-paper-3">
                      0{i + 1}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="container-x mt-auto flex flex-col gap-3 pt-6 pb-8">
          <Button
            variant="secondary"
            size="lg"
            href={site.links.console}
            className="w-full"
          >
            Open console
          </Button>
          <Button size="lg" href={site.links.sales} arrow className="w-full">
            Talk to an expert
          </Button>
        </div>
      </div>
    </div>
  );
}
