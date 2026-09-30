import { z } from "zod";

/**
 * Client- and server-side validation for the Contact Us and Franchise enquiry
 * forms.
 *
 * The same schemas run in both places on purpose: the browser uses them for
 * inline feedback, and the API routes re-run them so a request that skipped the
 * UI is still checked. The server copy is the authority.
 *
 * These mirror `websiteQueryLeadSchema` and `websiteFranchiseLeadSchema` in the
 * billing API (`packages/validation/src/website-leads.ts`). The server copy is
 * the authority — never trust that the client ran this, and keep the two in
 * step when either changes.
 *
 * Every schema here MUST declare the honeypot and render-timestamp fields. A
 * plain `z.object` strips undeclared keys, so a schema that omits them forwards
 * a bot submission as an ordinary lead and the API's tripwire never fires.
 */

/**
 * Indian mobile numbers, digits only. A pasted "+91 98765 43210" is normalised
 * by the schema's transform before this pattern sees it.
 */
const PHONE_PATTERN = /^[6-9]\d{9}$/;

const PHONE_FIELD = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s()-]/g, "").replace(/^(\+?91)/, ""))
  .pipe(
    z.string().regex(PHONE_PATTERN, "Enter a valid 10-digit mobile number")
  );

/**
 * Both forms are attributed to the website, and the billing API key is minted
 * with `--sources google_website`. It is sent explicitly rather than inferred
 * from the URL: the server validates it against the key's allowed sources and
 * rejects anything else, which is what stops one client crediting its leads to
 * another client's channel.
 */
export const ENQUIRY_LEAD_SOURCE = "google_website" as const;

/** Honeypot + render timestamp, shared with the pickup form's tripwire. */
const botTrapFields = {
  /** Hidden from people, irresistible to bots. A real browser leaves it empty. */
  website: z.string().max(200).optional(),
  /** Set when the form mounts; used to reject sub-3s submits. */
  renderedAt: z.number().int().positive().optional(),
};

// ---------------------------------------------------------------------------
// Contact Us
// ---------------------------------------------------------------------------

/**
 * What the customer wants to know about.
 *
 * Prefixed onto the message rather than sent as its own column: `Lead` has no
 * category field, and the billing API's query contract has no slot for one.
 * The label still gives whoever works the queue a scannable first line, and it
 * keeps the API untouched.
 */
export const ENQUIRY_TYPES = [
  { value: "pricing", label: "Pricing & plans" },
  { value: "coverage", label: "Do you cover my city?" },
  { value: "pickup_issue", label: "Issue with a pickup" },
  { value: "existing_order", label: "Existing order" },
  { value: "partnership", label: "Business partnership" },
  { value: "other", label: "Something else" },
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]["value"];

const ENQUIRY_TYPE_VALUES = ENQUIRY_TYPES.map((item) => item.value) as [
  EnquiryType,
  ...EnquiryType[],
];

export const enquiryLeadSchema = z.object({
  source: z.literal(ENQUIRY_LEAD_SOURCE).optional(),
  name: z.string().trim().min(2, "Please enter your name").max(200),
  phone: PHONE_FIELD,
  enquiryType: z.enum(ENQUIRY_TYPE_VALUES, {
    message: "Please choose what this is about",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more so we can help")
    .max(2000),
  /** Optional: the API records it as context, since `Lead` has no city column. */
  city: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  // Without these, a plain `z.object` strips the honeypot and the render
  // timestamp, so a bot submission is forwarded as a clean-looking lead and the
  // API's tripwire never sees it. The franchise schema below already includes
  // them; this one was missed.
  ...botTrapFields,
});

export type EnquiryLeadInput = z.infer<typeof enquiryLeadSchema>;

// ---------------------------------------------------------------------------
// Franchise
// ---------------------------------------------------------------------------

/**
 * Investment bands.
 *
 * A dropdown rather than free text because the franchise team triages on it, and
 * "15-20 lakhs" / "15 to 20L" / "around 20 lakhs" are the same answer written
 * three ways. The value is what goes upstream; the label is what the customer
 * reads. Bands are open at the top — anyone can be worth talking to, and the
 * highest band is not a ceiling.
 */
export const FRANCHISE_BUDGETS = [
  { value: "Under 10 Lakhs", label: "Under ₹10 lakh" },
  { value: "10-15 Lakhs", label: "₹10 – 15 lakh" },
  { value: "15-25 Lakhs", label: "₹15 – 25 lakh" },
  { value: "25-40 Lakhs", label: "₹25 – 40 lakh" },
  { value: "40 Lakhs - 1 Crore", label: "₹40 lakh – ₹1 crore" },
  { value: "Above 1 Crore", label: "Above ₹1 crore" },
  { value: "Not decided yet", label: "Not decided yet" },
] as const;

export const BUDGET_VALUES = FRANCHISE_BUDGETS.map((item) => item.value) as [
  string,
  ...string[],
];

/**
 * Commercial space status.
 *
 * Constrained to `yes` / `no` because those are the only two values the CRM's
 * franchise views can render — it maps them to "Own Space" and
 * "Rented/No Space" and falls back to showing the raw string otherwise. Sending
 * anything else would put an unlabelled value in front of the franchise team.
 */
export const COMMERCIAL_SPACE_OPTIONS = [
  { value: "yes", label: "Yes, I have my own space" },
  { value: "no", label: "No, I'll need to arrange it" },
] as const;

export const franchiseLeadSchema = z.object({
  source: z.literal(ENQUIRY_LEAD_SOURCE).optional(),
  name: z.string().trim().min(2, "Please enter your name").max(200),
  phone: PHONE_FIELD,
  cityInterest: z
    .string()
    .trim()
    .min(2, "Which city are you interested in?")
    .max(200),
  budget: z.enum(BUDGET_VALUES, { message: "Please choose an investment range" }),
  commercialSpace: z.enum(["yes", "no"], {
    message: "Please tell us about your commercial space",
  }),
  message: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  ...botTrapFields,
});

export type FranchiseLeadInput = z.infer<typeof franchiseLeadSchema>;

// ---------------------------------------------------------------------------
// Shared
// ---------------------------------------------------------------------------

/**
 * UTM + page attribution, appended by the client at submit time.
 *
 * Not part of either schema: the billing API accepts these as separate optional
 * fields, and keeping them out of the validated body means a caller cannot
 * attach attribution the form never collected.
 */
export function attributionFromLocation(): {
  pageUrl: string | undefined;
  utmSource: string | undefined;
  utmMedium: string | undefined;
  utmCampaign: string | undefined;
} {
  if (typeof window === "undefined") {
    return { pageUrl: undefined, utmSource: undefined, utmMedium: undefined, utmCampaign: undefined };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    pageUrl: window.location.href,
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
  };
}
