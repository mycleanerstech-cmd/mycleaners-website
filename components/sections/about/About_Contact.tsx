"use client";

import { useState } from "react";

import {
  CONTROL,
  CONTROL_INVALID,
  EnquirySuccess,
  Field,
  FormError,
  Honeypot,
  Select,
  SubmitButton,
} from "@/components/ui/EnquiryForm";
import { useEnquirySubmit } from "@/components/ui/useEnquirySubmit";
import { ENQUIRY_LEAD_SOURCE, ENQUIRY_TYPES, enquiryLeadSchema } from "@/lib/enquiry-schema";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  mobile: string;
  enquiryType: string;
  message: string;
  city: string;
  /** Honeypot. Hidden from people, irresistible to bots. */
  website: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  mobile: "",
  enquiryType: "",
  message: "",
  city: "",
  website: "",
};

/**
 * The Contact Us form. Also used on the About page, so it must stay compact.
 *
 * Sends name, phone, an enquiry type, a message, and an optional city. It asks
 * for **no store**, and that is deliberate rather than an omission: a question
 * like "do you cover Nashik?" or "what does a sofa cost?" is not about any one
 * branch, so the lead is created unrouted and lands in the CRM's global queue
 * for the central team. Forcing a branch would drop exactly the enquiries this
 * form exists to catch.
 *
 * Email is absent on purpose. `Lead` has no email column, it would only land in
 * a raw JSON field the CRM does not display, and phone is the channel the team
 * already works from.
 *
 * The previous version opened a WhatsApp deep link and displayed "Submitted
 * successfully" without submitting anything at all.
 */
export function About_Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const { state, submit, clearFieldError, setValidationErrors } = useEnquirySubmit();

  const errors = state.fieldErrors;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearFieldError(key);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate in the browser first: a formatting problem should not become a
    // network request, and should never be reported as a service failure.
    //
    // The outgoing payload is validated rather than the raw form state, because
    // the state calls the field `mobile` (what the label says) while the API
    // contract calls it `phone`. Validating state directly would fail on a
    // missing `phone` before anything is ever sent.
    const payload = {
      source: ENQUIRY_LEAD_SOURCE,
      name: form.name,
      phone: form.mobile,
      enquiryType: form.enquiryType,
      message: form.message,
      city: form.city,
      website: form.website,
    };

    const parsed = enquiryLeadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        // Map API field names back to the form's own keys.
        const mapped = key === "phone" ? "mobile" : key;
        if (!fieldErrors[mapped]) fieldErrors[mapped] = issue.message;
      }
      setValidationErrors(fieldErrors);
      return;
    }

    await submit("/api/contact", payload, () => setForm(EMPTY_FORM));
  }

  return (
    <section className="w-full bg-white">
      <div className="container py-6 sm:py-8 lg:py-10">
        {/* The decorative lottie beside the form was removed: it left the form
            squeezed into 7 columns, which made every field too narrow to type
            into. The form now takes the full column, capped so fields stay a
            comfortable line length instead of stretching edge to edge. */}
        <div className="mx-auto w-full max-w-[720px]">
          <div className="h-full rounded-2xl border border-border-light bg-surface p-4 shadow-card sm:p-6 lg:p-7">
            <h2 className="text-center text-[24px] font-semibold text-dark sm:text-[30px] lg:text-[34px]">
              Contact Us
            </h2>
            <p className="mt-2 text-center text-body-sm text-dark-muted">
              Tell us what you need and we will get back to you.
            </p>

            {state.isDone ? (
              <div className="mt-6">
                <EnquirySuccess
                  title="Thanks — we've got it"
                  body="Your enquiry is with our team and someone will call you back shortly. For anything urgent, call or WhatsApp us and we'll sort it now."
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-5 sm:mt-6">
                <div className="grid grid-cols-1 gap-y-4 gap-x-3 md:grid-cols-2 md:gap-y-5">
                  <Field label="Name" required error={errors.name}>
                    <input
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Your name"
                      type="text"
                      autoComplete="name"
                      className={cn("h-12", errors.name ? CONTROL_INVALID : CONTROL)}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>

                  {/* Errors are keyed by the form's own field names, mapped from
                      the API's (`phone` → `mobile`) in the submit handler. */}
                  <Field label="Mobile No." required error={errors.mobile}>
                    <input
                      value={form.mobile}
                      onChange={(e) => setField("mobile", e.target.value)}
                      placeholder="98765 43210"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={cn("h-12", errors.mobile ? CONTROL_INVALID : CONTROL)}
                      aria-invalid={Boolean(errors.mobile)}
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field
                      label="This is about"
                      required
                      error={errors.enquiryType}
                      hint="Pick the closest one"
                    >
                      <Select
                        value={form.enquiryType}
                        onChange={(value) => setField("enquiryType", value)}
                        invalid={Boolean(errors.enquiryType)}
                      >
                        <option value="">Select a topic</option>
                        {ENQUIRY_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <Field
                      label="Your message"
                      required
                      error={errors.message}
                      hint="A sentence or two is plenty"
                    >
                      <textarea
                        value={form.message}
                        onChange={(e) => setField("message", e.target.value)}
                        placeholder="How can we help?"
                        rows={3}
                        className={cn("py-3", errors.message ? CONTROL_INVALID : CONTROL)}
                        aria-invalid={Boolean(errors.message)}
                      />
                    </Field>
                  </div>

                  <Field
                    label="City"
                    error={errors.city}
                    hint="Optional — helps us answer faster"
                  >
                    <input
                      value={form.city}
                      onChange={(e) => setField("city", e.target.value)}
                      placeholder="Where are you?"
                      type="text"
                      autoComplete="address-level2"
                      className={cn("h-12", CONTROL)}
                    />
                  </Field>
                </div>

                <Honeypot value={form.website} onChange={(value) => setField("website", value)} />

                {state.formError && (
                  <div className="mt-4">
                    <FormError message={state.formError} />
                  </div>
                )}

                <div className="mt-5 flex justify-center sm:mt-7">
                  <SubmitButton
                    isSubmitting={state.isSubmitting}
                    label="Send Message"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
