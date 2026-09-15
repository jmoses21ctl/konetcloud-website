"use server";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

/**
 * Handles the contact form. Validation is real; delivery is a stub —
 * wire this to the CRM / ticketing endpoint before launch.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const topic = String(formData.get("topic") ?? "sales");
  const organisation = String(formData.get("organisation") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (message.length < 10) errors.message = "A sentence or two helps us route you correctly.";
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please check the highlighted fields.", errors };
  }

  // TODO: deliver to CRM / ticketing. Kept server-side so no PII reaches the client bundle.
  console.info("[contact]", { topic, name, email, organisation, length: message.length });

  return {
    ok: true,
    message:
      topic === "support"
        ? "Thanks — your request has been logged. Support will follow up by email."
        : "Thanks — an engineer will be in touch by email.",
  };
}
