/**
 * Canonical names for India's states and union territories.
 *
 * The store network's `state` column is free text, and it is not clean. A live
 * snapshot of `GET /website/stores` carried thirteen distinct strings for nine
 * real states:
 *
 *   'UP', 'Uttar Pradesh', 'Uttar pradesh'   → Uttar Pradesh
 *   'Tripura', 'TRIPURA'                     → Tripura
 *   'HIMACHAL PRADESH'                       → Himachal Pradesh
 *   'Uttrakhand'                             → Uttarakhand  (a typo, not a state)
 *
 * Deduplicating that with a plain `Set` does nothing, because `'UP' !== 'Uttar
 * Pradesh'`. The customer saw Uttar Pradesh three times in the dropdown, and
 * picking any one of them silently filtered to only the stores whose row
 * happened to be spelled that way — so branches went missing from the list
 * depending on which spelling was chosen.
 *
 * `normalizeState` folds every variant onto one name. The cascade in
 * `lib/stores.ts` compares normalised values on both sides of the filter, so
 * the dropdown and the store list always agree.
 *
 * Nothing here is submitted to the API. The pickup form sends `storeCode` only
 * and the billing API resolves that to a branch, so a state name is purely a
 * browser-side label and normalising it cannot change where a lead is routed.
 */

/** The 28 states and 8 union territories, in the spelling used site-wide. */
export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

/**
 * Reduce a name to its lookup key: trimmed, whitespace collapsed, dots and
 * punctuation dropped, lowercased.
 *
 * Stripping dots is what folds `'U.P.'` and `'U.P'` onto `'up'`, and collapsing
 * whitespace is what folds `'Uttar  Pradesh'` onto `'uttar pradesh'`.
 */
function lookupKey(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[.'`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Every spelling of every state we have seen or might reasonably see, keyed by
 * `lookupKey`. Built from `INDIAN_STATES` so a new canonical name gets its own
 * spelling for free, then extended with the abbreviations, old names, and typos
 * that the store data actually contains.
 */
const ALIASES: Record<string, IndianState> = Object.fromEntries(
  INDIAN_STATES.map((name) => [lookupKey(name), name])
);

// Abbreviations, old names, and the misspellings in the live store data.
Object.assign(ALIASES, {
  // Abbreviations.
  up: "Uttar Pradesh",
  "u p": "Uttar Pradesh",
  ap: "Andhra Pradesh",
  ar: "Arunachal Pradesh",
  as: "Assam",
  br: "Bihar",
  cg: "Chhattisgarh",
  ch: "Chandigarh",
  dh: "Delhi",
  ga: "Goa",
  gj: "Gujarat",
  hr: "Haryana",
  hp: "Himachal Pradesh",
  jh: "Jharkhand",
  jk: "Jammu and Kashmir",
  ka: "Karnataka",
  kl: "Kerala",
  la: "Ladakh",
  ld: "Lakshadweep",
  mp: "Madhya Pradesh",
  mh: "Maharashtra",
  ml: "Manipur",
  mn: "Manipur",
  mz: "Mizoram",
  nl: "Nagaland",
  od: "Odisha",
  or: "Odisha",
  py: "Puducherry",
  pb: "Punjab",
  rj: "Rajasthan",
  sk: "Sikkim",
  tn: "Tamil Nadu",
  tg: "Telangana",
  ts: "Telangana",
  tr: "Tripura",
  uk: "Uttarakhand",
  wb: "West Bengal",

  // Renamed territories, and names that predate the current spelling.
  orissa: "Odisha",
  pondicherry: "Puducherry",
  "new delhi": "Delhi",
  "nct of delhi": "Delhi",
  "national capital territory of delhi": "Delhi",
  "uttaranchal": "Uttarakhand",

  // The typo the store data actually ships: Uttrakhand.
  uttrakhand: "Uttarakhand",
  uttarakhand: "Uttarakhand",
});

/**
 * Fold one raw `state` value onto its canonical spelling.
 *
 * Unknown values are title-cased rather than discarded: a state we have not
 * thought to list should still reach the customer and their store, spelled
 * tidily, instead of vanishing from the dropdown along with its branches.
 */
export function normalizeState(raw: string | null | undefined): string {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return "";

  const known = ALIASES[lookupKey(trimmed)];
  if (known) return known;

  return trimmed
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word.length > 2 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}
