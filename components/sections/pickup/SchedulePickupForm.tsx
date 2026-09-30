"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Headphones,
  MessageCircle,
  Truck,
} from "lucide-react";

import { StoreLocationPicker } from "@/components/sections/pickup/StoreLocationPicker";
import { Button } from "@/components/ui/Button";
import {
  minPickupDate,
  PICKUP_LEAD_SOURCE,
  PICKUP_SLOTS,
  pickupLeadSchema,
  SERVICE_TYPES,
  type PickupLeadInput,
} from "@/lib/pickup-schema";
import { EMPTY_SELECTION, resolveSelection, type StoreSelection, type StoreSummary } from "@/lib/stores";
import { normalizeState } from "@/lib/india-states";
import { SITE_PHONE_DISPLAY, SITE_WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FormState = {
  selection: StoreSelection;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  serviceType: string;
  slot: string;
  preferredDate: string;
  notes: string;
  email: string;
  /** Honeypot. Hidden from people, irresistible to bots. */
  website: string;
};

const EMPTY_FORM: FormState = {
  selection: EMPTY_SELECTION,
  name: "",
  phone: "",
  address: "",
  pincode: "",
  serviceType: "laundry",
  slot: "morning",
  // Tomorrow. A same-day pickup is not something the network can promise, and a
  // prefilled valid date removes the most common reason the form is abandoned.
  preferredDate: minPickupDate(),
  notes: "",
  email: "",
  website: "",
};

const CONTROL =
  "h-12 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted/80 focus:border-primary";

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
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

function StepHeading({ step, title, hint }: { step: number; title: string; hint: string }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span
        aria-hidden="true"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-[0.8125rem] font-bold text-white"
      >
        {step}
      </span>
      <div>
        <h3 className="text-heading-sm font-semibold text-dark">{title}</h3>
        <p className="text-sm text-dark-muted">{hint}</p>
      </div>
    </div>
  );
}

export function SchedulePickupForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [storesError, setStoresError] = useState<string | null>(null);
  const [isLoadingStores, setIsLoadingStores] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    store: string;
    address: string;
    phone: string | null;
    slot: string;
    date: string;
  } | null>(null);

  // Stamped once on mount. A submit arriving within a few seconds of this is a
  // script, not a person filling in a pickup address.
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    renderedAt.current = Date.now();

    const controller = new AbortController();

    fetch("/api/stores", { signal: controller.signal })
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.success) {
          setStores(payload.data.stores ?? []);
        } else {
          setStoresError("We couldn't load store locations. Please refresh and try again.");
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStoresError("We couldn't load store locations. Please refresh and try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoadingStores(false);
      });

    return () => controller.abort();
  }, []);

  // If the network shifts under someone mid-form — a store deactivated, a stale
  // deep-linked selection — drop anything that no longer resolves instead of
  // letting them submit a store that isn't there.
  useEffect(() => {
    setForm((prev) => {
      const next = resolveSelection(stores, prev.selection);
      const isSame =
        next.state === prev.selection.state &&
        next.city === prev.selection.city &&
        next.storeCode === prev.selection.storeCode;
      return isSame ? prev : { ...prev, selection: next };
    });
  }, [stores]);

  /** Only ever send the branch the customer actually chose. */
  const selectedStore = useMemo(
    () => stores.find((store) => store.code === form.selection.storeCode) ?? null,
    [stores, form.selection.storeCode]
  );

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the error as soon as the customer starts fixing the field.
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const candidate = {
      ...form,
      storeCode: form.selection.storeCode,
      renderedAt: renderedAt.current,
    };

    const parsed = pickupLeadSchema.safeParse(candidate);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!errors[key]) errors[key] = issue.message;
      }
      // The store is picked through three selects; point at the one they
      // actually have to look at rather than at a field called `storeCode`.
      if (errors.storeCode) errors.storeCode = "Choose the store nearest to you";
      setFieldErrors(errors);
      setFormError("Please correct the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestBody(parsed.data)),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        setFormError(payload?.error ?? "Something went wrong. Please try again.");
        return;
      }

      const slot = PICKUP_SLOTS.find((item) => item.value === parsed.data.slot);
      setConfirmation({
        store: payload.data.storeLocation ?? selectedStore?.name ?? "your nearest store",
        address: selectedStore
          ? `${selectedStore.address}, ${selectedStore.city}, ${normalizeState(selectedStore.state)}`
          : "",
        phone: payload.data.storePhone ?? selectedStore?.phone ?? null,
        slot: slot?.label ?? "",
        date: formatLongDate(parsed.data.preferredDate),
      });
      setForm(EMPTY_FORM);
    } catch {
      setFormError("We couldn't reach our servers. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-border-light bg-white p-6 shadow-card sm:p-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <CheckCircle2 className="h-14 w-14 text-success" aria-hidden="true" />
          <h2 className="text-heading-md font-bold text-dark">Pickup requested</h2>
          <p className="max-w-md text-body-md text-dark-muted">
            Your request has gone to{" "}
            <span className="font-semibold text-dark">{confirmation.store}</span>. They
            &apos;ll call you shortly to confirm the time.
          </p>
        </div>

        <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border-light bg-border-light sm:grid-cols-2">
          <Summary label="Store" value={confirmation.store} />
          <Summary
            label="Store contact"
            value={confirmation.phone ?? "—"}
            href={confirmation.phone ? `tel:+91${confirmation.phone.replace(/\D/g, "").slice(-10)}` : undefined}
          />
          <Summary label="Preferred date" value={confirmation.date} />
          <Summary label="Preferred time" value={confirmation.slot} />
        </dl>

        {confirmation.address ? (
          <p className="mt-4 text-center text-sm text-dark-muted">
            Collecting from {confirmation.address}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => setConfirmation(null)}>
            Book another pickup
          </Button>
          <Button
            asChild
            variant="secondary"
          >
            <a href={SITE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (storesError) {
    return <StoreUnavailable />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border-light bg-white p-6 shadow-card sm:p-8"
    >
      {/* ── 1. Location ── */}
      <StepHeading
        step={1}
        title="Where should we collect from?"
        hint="Pick your state, then your city, then the store nearest to you."
      />
      {isLoadingStores ? (
        <SkeletonPicker />
      ) : (
        <StoreLocationPicker
          stores={stores}
          selection={form.selection}
          onChange={(selection) => setField("selection", selection)}
          error={fieldErrors.storeCode}
          disabled={isSubmitting}
        />
      )}

      <hr className="my-8 border-border-light" />

      {/* ── 2. Contact ── */}
      <StepHeading
        step={2}
        title="How do we reach you?"
        hint="The store calls to confirm — no payment is taken now."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={fieldErrors.name}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            className={CONTROL}
            aria-invalid={Boolean(fieldErrors.name)}
          />
        </Field>

        <Field label="Mobile number" required error={fieldErrors.phone}>
          <input
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="98765 43210"
            autoComplete="tel"
            className={CONTROL}
            aria-invalid={Boolean(fieldErrors.phone)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Pickup address" required error={fieldErrors.address}>
            <textarea
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              placeholder="Flat / house no., building, street, area"
              rows={2}
              autoComplete="street-address"
              className={cn(CONTROL, "h-auto py-3 resize-y")}
              aria-invalid={Boolean(fieldErrors.address)}
            />
          </Field>
        </div>

        <Field label="Pincode" error={fieldErrors.pincode} hint="Helps the store plan its route">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={form.pincode}
            onChange={(e) => setField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="201301"
            autoComplete="postal-code"
            className={CONTROL}
            aria-invalid={Boolean(fieldErrors.pincode)}
          />
        </Field>

        <Field label="Email" error={fieldErrors.email} hint="Optional — for order updates">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={CONTROL}
            aria-invalid={Boolean(fieldErrors.email)}
          />
        </Field>
      </div>

      <hr className="my-8 border-border-light" />

      {/* ── 3. Service ── */}
      <StepHeading
        step={3}
        title="What needs cleaning?"
        hint="Choose a date and a time window. The store confirms the exact time."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Service needed" required error={fieldErrors.serviceType}>
          <span className="relative block">
            <select
              value={form.serviceType}
              onChange={(e) => setField("serviceType", e.target.value)}
              className={cn(CONTROL, "appearance-none pr-10")}
            >
              {SERVICE_TYPES.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-muted"
              aria-hidden="true"
            />
          </span>
        </Field>

        <Field label="Preferred date" required error={fieldErrors.preferredDate}>
          <input
            type="date"
            value={form.preferredDate}
            min={minPickupDate()}
            onChange={(e) => setField("preferredDate", e.target.value)}
            className={CONTROL}
            aria-invalid={Boolean(fieldErrors.preferredDate)}
          />
        </Field>

        <div className="sm:col-span-2">
          <span className="text-sm font-semibold text-dark">
            Preferred time<span className="ml-0.5 text-primary">*</span>
          </span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {PICKUP_SLOTS.map((slot) => (
              <label
                key={slot.value}
                className={cn(
                  "flex cursor-pointer flex-col items-center rounded-lg border px-2 py-3 text-center transition-colors",
                  form.slot === slot.value
                    ? "border-primary bg-primary-light"
                    : "border-border-light bg-white hover:border-primary/50"
                )}
              >
                <input
                  type="radio"
                  name="slot"
                  value={slot.value}
                  checked={form.slot === slot.value}
                  onChange={() => setField("slot", slot.value)}
                  className="sr-only"
                />
                <span className="text-[0.8125rem] font-semibold text-dark">{slot.label}</span>
                <span className="text-[0.6875rem] text-dark-muted">{slot.hint}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <Field label="Anything else?" error={fieldErrors.notes} hint="Optional">
            <textarea
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder="Number of garments, stain details, gate code…"
              rows={2}
              className={cn(CONTROL, "h-auto py-3 resize-y")}
            />
          </Field>
        </div>
      </div>

      {/* Honeypot: off-screen, not display:none, and never focusable, so
          it is invisible to a person but still filled in by naive bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </label>
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-6 rounded-lg bg-error/10 px-4 py-3 text-sm font-medium text-error"
        >
          {formError}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-4">
        {/* `type="button"`, not `"submit"`: before hydration this is a plain
            HTML form with no action, so a real submit would navigate the browser
            to a GET URL and discard the address just typed. The button submits
            the form itself once React is live. */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          onClick={(event) => event.currentTarget.form?.requestSubmit()}
        >
          <Truck className="h-4 w-4" aria-hidden="true" />
          Request Pickup
        </Button>
        <p className="flex items-center gap-1.5 text-xs text-dark-muted">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          No payment needed now
        </p>
      </div>
    </form>
  );
}

function Summary({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="bg-white px-5 py-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-dark-muted">
        {label}
      </dt>
      <dd className="mt-1 text-[0.9375rem] font-semibold text-dark">
        {href ? (
          <a href={href} className="text-primary hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function SkeletonPicker() {
  return (
    <div className="grid gap-5" aria-hidden="true">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-[4.75rem] animate-pulse rounded-lg bg-surface" />
        <div className="h-[4.75rem] animate-pulse rounded-lg bg-surface" />
      </div>
      <div className="h-[4.75rem] animate-pulse rounded-lg bg-surface" />
    </div>
  );
}

/**
 * The store list is the one thing this page cannot work without — it is what
 * routes the lead — so rather than a dead form, offer the two channels that
 * always reach a human.
 */
function StoreUnavailable() {
  return (
    <div className="rounded-2xl border border-border-light bg-white p-8 text-center shadow-card sm:p-10">
      <Headphones className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-heading-md font-bold text-dark">
        Store list unavailable right now
      </h2>
      <p className="mx-auto mt-2 max-w-md text-body-md text-dark-muted">
        We couldn&apos;t load our store locations, so the pickup form can&apos;t be
        submitted. Please try again shortly, or reach a store directly and
        we&apos;ll arrange the pickup for you.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild variant="primary">
          <a href={`tel:${SITE_PHONE_DISPLAY.replace(/\D/g, "")}`}>
            <Headphones className="h-4 w-4" aria-hidden="true" />
            Call {SITE_PHONE_DISPLAY}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={SITE_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </Button>
      </div>
    </div>
  );
}

/** `2026-04-18` → `Sat, 18 Apr 2026`. Parsed as local noon to dodge TZ shifts. */
function formatLongDate(iso: string): string {
  const parsed = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Narrow a validated form to exactly what the API accepts, and attach the
 * landing page's own path plus any UTM parameters for source attribution.
 *
 * `storeId` and `tag` are deliberately absent: the billing API resolves the
 * store from `storeCode` and sets the tag itself, so a caller cannot forge them.
 */
function toRequestBody(input: PickupLeadInput) {
  const params = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search
  );

  return {
    source: PICKUP_LEAD_SOURCE,
    storeCode: input.storeCode,
    name: input.name,
    phone: input.phone,
    address: input.address,
    pincode: input.pincode,
    serviceType: input.serviceType,
    slot: input.slot,
    preferredDate: input.preferredDate,
    notes: input.notes,
    email: input.email,
    website: input.website,
    renderedAt: input.renderedAt,
    pageUrl: typeof window === "undefined" ? undefined : window.location.href,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  };
}
