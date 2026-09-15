"use client";

import { Fragment, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "left" | "right" | "scale" | "pop";

/*
 * Safety net for elements that pass through the viewport between two frames
 * (instant jumps, trackpad flicks): an IntersectionObserver never fires for
 * them, so one shared, rAF-throttled scroll listener settles anything still
 * pending that now sits above the fold.
 */
const pending = new Set<HTMLElement>();
let listening = false;
let raf = 0;

function settlePassed() {
  raf = 0;
  for (const el of pending) {
    if (el.getBoundingClientRect().bottom < 0) {
      el.dataset.reveal = "in";
      pending.delete(el);
    }
  }
}

function track(el: HTMLElement) {
  pending.add(el);
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener(
    "scroll",
    () => {
      if (!raf) raf = requestAnimationFrame(settlePassed);
    },
    { passive: true },
  );
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Entrance style. Defaults to a float-up. */
  variant?: RevealVariant;
  /** Stagger index; each step adds 90ms. */
  index?: number;
  as?: "div" | "ul" | "ol" | "li" | "section" | "figure";
};

/**
 * Reveals children once they enter the viewport. Purely presentational:
 * the observer flips a data attribute and CSS in globals.css does the
 * motion, so there's no layout work on the main thread and reduced-motion
 * is honoured by the stylesheet. Descendants can join the entrance with
 * the `.stagger`, `.stagger-pop`, `.word` and `.rule` classes.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  index = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    track(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        // Also settle anything already scrolled past (anchor jumps)
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          el.dataset.reveal = "in";
          pending.delete(el);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      pending.delete(el);
    };
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref type varies with `as`; all are HTMLElements
      ref={ref}
      data-reveal=""
      data-variant={variant}
      style={{ "--i": index } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

/**
 * Splits a string into `.word` spans so a parent Reveal can stagger them.
 * Words are inline-block; the separating space stays a normal text node so
 * the line can still wrap.
 */
export function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="word" style={{ "--w": i } as React.CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
