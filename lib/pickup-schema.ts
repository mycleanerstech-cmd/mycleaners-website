import { z } from "zod";

/**
 * Client- and server-side validation for the pickup form.
 *
 * The same schema runs in both places on purpose: the browser uses it for
 * inline feedback, and `app/api/pickup/route.ts` re-runs it so a request that
 * skipped the UI is still checked. The server copy is the authority — never
 * trust that the client ran this.
 */

const PHONE_PATTERN = /^[6-9]\d{9}$/;

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : undefined));

/** Value tuples declared separately so `z.enum` keeps them as literal unions. */
export const SERVICE_TYPE_VALUES = [
  "laundry",
  "dry_cleaning",
  "steam_ironing",
  "home_cleaning",
  "shoe_cleaning",
  "car_cleaning",
  "other",
] as const;

export const SERVICE_TYPES = [
  { value: "laundry", label: "Laundry" },
  { value: "dry_cleaning", label: "Dry Cleaning" },
  { value: "steam_ironing", label: "Steam Ironing" },
  { value: "home_cleaning", label: "Home Cleaning" },
  { value: "shoe_cleaning", label: "Shoe Cleaning" },
  { value: "car_cleaning", label: "Car Cleaning" },
  { value: "other", label: "Other" },
] as const satisfies ReadonlyArray<{ value: (typeof SERVICE_TYPE_VALUES)[number]; label: string }>;

export const PICKUP_SLOT_VALUES = ["morning", "afternoon", "evening"] as const;

export const PICKUP_SLOTS = [
  { value: "morning", label: "Morning", hint: "8am – 12pm" },
  { value: "afternoon", label: "Afternoon", hint: "12pm – 4pm" },
  { value: "evening", label: "Evening", hint: "4pm – 8pm" },
] as const satisfies ReadonlyArray<{ value: (typeof PICKUP_SLOT_VALUES)[number]; label: string; hint: string }>;

/**
 * Acquisition channel for this submission.
 *
 * The website key is minted with `--sources google_website`, so this is what the
 * billing API records on the lead. It is sent explicitly rather than inferred
 * from the URL: the server validates it against the key's allowed sources and
 * rejects anything else, which is what stops one client crediting its leads to
 * another client's channel.
 */
export const PICKUP_LEAD_SOURCE = "google_website" as const;

export const pickupLeadSchema = z.object({
  source: z.literal(PICKUP_LEAD_SOURCE).optional(),
  storeCode: z.string().trim().min(1, "Please choose a store"),
  name: z.string().trim().min(2, "Please enter your name").max(200),
  // Indian mobile numbers. Digits only; the field strips spaces and +91 before
  // validating so a pasted "+91 98765 43210" still passes.
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s()-]/g, "").replace(/^(\+?91)/, ""))
    .pipe(
      z
        .string()
        .regex(PHONE_PATTERN, "Enter a valid 10-digit mobile number")
    ),
  address: z
    .string()
    .trim()
    .min(6, "Please enter your pickup address")
    .max(500),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  serviceType: z.enum(SERVICE_TYPE_VALUES),
  slot: z.enum(PICKUP_SLOT_VALUES),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a pickup date")
    .refine((value) => value >= todayISO(), {
      message: "Pickup date cannot be in the past",
    }),
  notes: optionalTrimmed(1000),
  email: z
    .union([
      z.literal("").transform(() => undefined),
      z.string().trim().email("Enter a valid email").optional(),
    ])
    .optional(),
  /** Honeypot. A real browser leaves this empty. */
  website: z.string().max(200).optional(),
  /** Set when the form mounts; used to reject sub-3s submits. */
  renderedAt: z.number().int().positive().optional(),
});

export type PickupLeadInput = z.infer<typeof pickupLeadSchema>;

/** Today in the visitor's own timezone, as `YYYY-MM-DD`. */
function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

/** Tomorrow onward. Pickups are same-day at best, never retroactive. */
export function minPickupDate(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  local.setDate(local.getDate() + 1);
  return local.toISOString().slice(0, 10);
}
