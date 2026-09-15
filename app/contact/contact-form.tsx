"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { type ContactState, submitContact } from "./actions";

const topics = [
  { value: "sales", label: "Talk to an expert" },
  { value: "support", label: "Technical support" },
  { value: "pricing", label: "Enterprise pricing" },
  { value: "evidence", label: "Trust and compliance evidence" },
];

const initial: ContactState = { ok: false, message: "" };

export function ContactForm({ defaultTopic }: { defaultTopic: string }) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="rise flex flex-col items-start gap-4 rounded-2xl border border-lime/30 bg-lime/[0.05] p-6 sm:p-8">
        <span className="font-mono text-[11px] tracking-[0.12em] text-lime uppercase">Received</span>
        <p className="text-[16px] text-paper">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <Field label="Topic" htmlFor="topic">
        <select
          id="topic"
          name="topic"
          defaultValue={topics.some((t) => t.value === defaultTopic) ? defaultTopic : "sales"}
          className={input}
        >
          {topics.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.errors?.name}>
          <input id="name" name="name" autoComplete="name" required className={cn(input, state.errors?.name && invalid)} />
        </Field>
        <Field label="Work email" htmlFor="email" error={state.errors?.email}>
          <input id="email" name="email" type="email" autoComplete="email" required className={cn(input, state.errors?.email && invalid)} />
        </Field>
      </div>

      <Field label="Organisation" htmlFor="organisation" hint="optional">
        <input id="organisation" name="organisation" autoComplete="organization" className={input} />
      </Field>

      <Field label="What are you working on?" htmlFor="message" error={state.errors?.message}>
        <textarea id="message" name="message" rows={5} required className={cn(input, "min-h-32 resize-y", state.errors?.message && invalid)} />
      </Field>

      {!state.ok && state.message && (
        <p role="alert" className="font-mono text-[12px] text-amber">{state.message}</p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={pending} arrow>
          {pending ? "Sending…" : "Send"}
        </Button>
        <p className="font-mono text-[11px] text-paper-3">
          Handled under our privacy notice. No marketing lists.
        </p>
      </div>
    </form>
  );
}

const input =
  "w-full rounded-lg border border-line bg-ink-2 px-3.5 py-2.5 text-[14px] text-paper transition-colors placeholder:text-paper-3 hover:border-line-strong focus:border-brand focus:outline-none";
const invalid = "border-amber/60";

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-[13px] font-medium text-paper-2">
        {label}
        {hint && <span className="font-mono text-[10.5px] text-paper-3">{hint}</span>}
      </label>
      {children}
      {error && <p className="font-mono text-[11.5px] text-amber">{error}</p>}
    </div>
  );
}
