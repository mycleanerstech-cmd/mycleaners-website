"use client";

import Image from "next/image";
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
import {
  COMMERCIAL_SPACE_OPTIONS,
  ENQUIRY_LEAD_SOURCE,
  FRANCHISE_BUDGETS,
  franchiseLeadSchema,
} from "@/lib/enquiry-schema";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  mobile: string;
  cityInterest: string;
  budget: string;
  commercialSpace: string;
  message: string;
  /** Honeypot. Hidden from people, irresistible to bots. */
  website: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  mobile: "",
  cityInterest: "",
  budget: "",
  commercialSpace: "",
  message: "",
  website: "",
};

/**
 * The franchise enquiry form.
 *
 * The commercial detail is what makes a franchise lead worth triaging, so the
 * form collects it: investment band and whether the candidate already has
 * commercial space. Both land on real `Lead` columns, so the CRM's franchise
 * views show them without any extra work.
 *
 * Budget is a dropdown rather than free text because the team triages on it and
 * "15-20 lakhs", "15 to 20L", and "around 20 lakhs" are one answer written three
 * ways. `commercialSpace` is constrained to yes/no because those are the only
 * two values the CRM knows how to label.
 *
 * `message` is optional — someone still deciding is a legitimate lead, and a
 * rejected form is a lost one.
 *
 * The lead is created **unrouted** upstream: franchise interest is usually in a
 * city with no store yet, so a serviceability match would be meaningless.
 */
export function FranchiseForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const { state, submit, clearFieldError, setValidationErrors } = useEnquirySubmit();

  const errors = state.fieldErrors;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    clearFieldError(key);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate the outgoing payload, not the raw form state: the state calls the
    // field `mobile` because that is what the label says, while the API
    // contract calls it `phone`. Validating state directly would fail on a
    // missing `phone` before anything is sent.
    const payload = {
      source: ENQUIRY_LEAD_SOURCE,
      name: form.name,
      phone: form.mobile,
      cityInterest: form.cityInterest,
      budget: form.budget,
      commercialSpace: form.commercialSpace,
      message: form.message,
      website: form.website,
    };

    const parsed = franchiseLeadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        // The payload uses API field names; the inputs are addressed by the
        // form's own keys, so map the two the fields differ on.
        const key = String(issue.path[0] ?? "form");
        const mapped = key === "phone" ? "mobile" : key;
        if (!fieldErrors[mapped]) fieldErrors[mapped] = issue.message;
      }
      setValidationErrors(fieldErrors);
      return;
    }

    await submit("/api/franchise", payload, () => setForm(EMPTY_FORM));
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/fp2.jpg"
          alt="Franchise background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/85 via-white/65 to-white/25" />
      </div>

      <div className="container py-10 sm:py-14">
        {/* Heading, then the form. It was a two-column split with the headline
            stacked in a narrow 4-column rail, which split "Most Rewarding
            Business Ever!" across two lines and pushed the form off-centre. */}
        <div className="mx-auto flex max-w-[680px] flex-col items-center">
          <h2 className="text-center text-[26px] leading-[1.2] font-normal text-primary sm:text-[34px]">
            Most Rewarding Business Ever!
          </h2>

          <div className="mt-3 flex flex-col items-center gap-1 sm:flex-row sm:gap-6">
            <p className="text-center text-[15px] font-semibold text-dark sm:text-[16px]">
              High Return On Investment
            </p>
            <span aria-hidden="true" className="hidden h-4 w-px bg-primary/30 sm:block" />
            <p className="text-center text-[15px] font-semibold text-dark sm:text-[16px]">
              Recession Free Business
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-8 w-full sm:mt-10">
            <div className="rounded-2xl bg-white/80 p-6 shadow-card backdrop-blur-sm sm:p-8">
              <h3 className="text-center text-heading-md font-bold text-dark">
                Become a Franchise Partner
              </h3>
              <p className="mt-1 text-center text-body-sm text-dark-muted">
                Share a few details and our franchise team will call you back.
              </p>

              {state.isDone ? (
                <div className="mt-6">
                  <EnquirySuccess
                    title="Thanks for your interest"
                    body="Our franchise team has your details and will call you within one working day to talk through the model, investment, and next steps."
                  />
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:gap-5">
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

                  <Field
                    label="City you want to operate in"
                    required
                    error={errors.cityInterest}
                  >
                    <input
                      value={form.cityInterest}
                      onChange={(e) => setField("cityInterest", e.target.value)}
                      placeholder="e.g. Nagpur"
                      type="text"
                      autoComplete="address-level2"
                      className={cn("h-12", errors.cityInterest ? CONTROL_INVALID : CONTROL)}
                      aria-invalid={Boolean(errors.cityInterest)}
                    />
                  </Field>

                  <Field label="Investment Budget" required error={errors.budget}>
                    <Select
                      value={form.budget}
                      onChange={(value) => setField("budget", value)}
                      invalid={Boolean(errors.budget)}
                    >
                      <option value="">Select a range</option>
                      {FRANCHISE_BUDGETS.map((band) => (
                        <option key={band.value} value={band.value}>
                          {band.label}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    label="Commercial Space"
                    required
                    error={errors.commercialSpace}
                    hint="We can help you find a location if you don't have one"
                  >
                    <Select
                      value={form.commercialSpace}
                      onChange={(value) => setField("commercialSpace", value)}
                      invalid={Boolean(errors.commercialSpace)}
                    >
                      <option value="">Select one</option>
                      {COMMERCIAL_SPACE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    label="Anything else?"
                    error={errors.message}
                    hint="Optional — your experience, timeline, or questions"
                  >
                    <textarea
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder="Tell us about yourself or ask us anything"
                      rows={3}
                      className={cn("py-3", errors.message ? CONTROL_INVALID : CONTROL)}
                    />
                  </Field>

                  <Honeypot value={form.website} onChange={(value) => setField("website", value)} />

                  {state.formError && <FormError message={state.formError} />}

                  <div className="mt-2 flex justify-center">
                    <SubmitButton
                      isSubmitting={state.isSubmitting}
                      label="Request a Call Back"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Orange bottom strip (matches the reference layout) */}
      <div className="bg-primary py-4">
        <div className="container">
          <p className="text-center text-[18px] font-semibold text-white sm:text-[22px]">
            India&apos;s 1st Organized Chain of Cleaning Services
          </p>
        </div>
      </div>
    </section>
  );
}
