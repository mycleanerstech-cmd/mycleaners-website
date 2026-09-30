"use client";

import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { SITE_PHONE_DISPLAY, SITE_WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Shared presentation for the Contact Us and Franchise forms.
 *
 * Only markup and styling live here — the submit behaviour is in
 * `useEnquirySubmit`. Splitting the two keeps this file free of state, so both
 * forms stay visually identical without either owning a copy of the other.
 *
 * Control styling matches the pickup form, so the three booking/enquiry flows on
 * the site read as one product.
 */

/** Shared input styling, with an invalid variant. */
export function control(invalid?: boolean) {
  return cn(
    "w-full rounded-lg border bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors",
    "placeholder:text-dark-muted/80 focus:border-primary",
    invalid ? "border-error focus:border-error" : "border-border-light"
  );
}

const CONTROL = control();
const CONTROL_INVALID = control(true);

/** Label + control + error/hint, so no form hand-rolls the spacing. */
export function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-dark">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>
      {children}
      {error ? (
        <span className="text-xs font-medium text-error">{error}</span>
      ) : hint ? (
        <span className="text-xs text-dark-muted">{hint}</span>
      ) : null}
    </label>
  );
}

/**
 * Select with a positioned chevron.
 *
 * Native selects rather than a custom listbox on purpose: keyboard navigation,
 * type-ahead, and the OS picker on mobile all come free, which is most of what a
 * hand-built dropdown reimplements badly.
 */
export function Select({
  value,
  onChange,
  invalid,
  disabled,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-12 w-full appearance-none rounded-lg border bg-white pl-3 pr-10 text-[0.9375rem] text-dark",
          "outline-none transition-colors focus:border-primary",
          "disabled:cursor-not-allowed disabled:bg-surface disabled:text-dark-muted/70",
          invalid ? "border-error focus:border-error" : "border-border-light"
        )}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-muted"
      >
        <path d="m5 7.5 5 5 5-5" />
      </svg>
    </span>
  );
}

/**
 * Honeypot. Off-screen rather than `display:none`, and never focusable, so it is
 * invisible to a person but still filled in by naive bots. The API accepts a
 * non-empty value rather than rejecting it, so a bot gets a 201 and never learns
 * it was caught.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        {/* No `name`: if this form ever submits before hydration finishes, the
            browser would navigate to a URL carrying whatever is in the
            honeypot. The value is read from React state, not FormData, so the
            attribute buys nothing. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-lg bg-error/10 px-4 py-3 text-sm font-medium text-error"
    >
      {message}
    </p>
  );
}

/**
 * Submit control.
 *
 * Deliberately `type="button"`, not `type="submit"`.
 *
 * These forms are client components with no server action behind them, so before
 * hydration the `<form>` is a plain HTML form: a `type="submit"` button would
 * let the browser navigate to a GET URL and silently discard everything the
 * customer had typed. A plain button cannot submit natively, and it submits the
 * form itself once React is live. See the `onClick` in the forms using it.
 */
export function SubmitButton({
  isSubmitting,
  label,
}: {
  isSubmitting: boolean;
  label: string;
}) {
  return (
    <Button
      type="button"
      variant="primary"
      size="lg"
      isLoading={isSubmitting}
      onClick={(event) => {
        // `requestSubmit` runs the form's own submit handling, so validation and
        // the submit event still behave as if the button had been clicked
        // natively. Guarded because the button can be clicked from a keyboard
        // or assistive tech without the form being the event's context.
        event.currentTarget.form?.requestSubmit();
      }}
    >
      <Send className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}

/**
 * Success panel, shown in place of the form.
 *
 * Always offers a phone and WhatsApp fallback. These forms are the site's front
 * door for people who already want to talk to someone, so "we got your message"
 * with no next step would be a dead end if the reply is slow.
 */
export function EnquirySuccess({ title, body }: { title: string; body: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 rounded-xl border border-success/25 bg-success/5 p-8 text-center"
    >
      <CheckCircle2 className="h-12 w-12 shrink-0 text-success" aria-hidden="true" />
      <h3 className="text-heading-sm font-bold text-dark">{title}</h3>
      <p className="max-w-sm text-body-sm text-dark-muted">{body}</p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
        <a
          href={`tel:${SITE_PHONE_DISPLAY.replace(/\D/g, "")}`}
          className="font-semibold text-primary hover:underline"
        >
          Call {SITE_PHONE_DISPLAY}
        </a>
        <a
          href={SITE_WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline"
        >
          WhatsApp us
        </a>
      </div>
    </div>
  );
}

export { CONTROL, CONTROL_INVALID };
