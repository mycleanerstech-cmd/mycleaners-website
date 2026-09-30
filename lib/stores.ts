/**
 * The store network, and the State → City → Store cascade built on top of it.
 *
 * The billing API's `GET /website/stores` returns the *entire* active network in
 * one response — there is no `state`/`city` query parameter and no pagination —
 * so the cascade is derived here in the browser rather than by asking the API
 * for each narrowing step. One request, then pure client-side filtering.
 *
 * The payload is deliberately flat and minimal (see `PickupStoreSummary` in the
 * API's `leads.repository.ts`): no coordinates, no email, no pricing keys. Only
 * the fields a customer needs to choose a branch and trust the choice.
 *
 * The `state` field is the one value here that arrives dirty — see
 * `lib/india-states.ts`. Every read of it goes through `normalizeState` so the
 * three dropdowns cannot disagree with each other.
 */

import { normalizeState } from "@/lib/india-states";

export type StoreSummary = {
  code: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
};

/** What the three cascading selects currently hold. */
export type StoreSelection = {
  state: string;
  city: string;
  storeCode: string;
};

export const EMPTY_SELECTION: StoreSelection = { state: "", city: "", storeCode: "" };

/** Alphabetical, case-insensitive. The API sorts by city/name but not state. */
function byName(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

/**
 * Does this store belong to the chosen state?
 *
 * Compares normalised names on both sides. The `state` column is free text and
 * carries several spellings of the same state, so matching it literally would
 * drop real branches: pick "Uttar Pradesh" and the rows stored as "UP" or
 * "Uttar pradesh" would vanish, leaving the customer unable to book from the
 * city where those branches actually are.
 */
function inState(store: StoreSummary, state: string): boolean {
  return normalizeState(store.state) === normalizeState(state);
}

/** Every distinct state, sorted. Drives the first select. */
export function listStates(stores: readonly StoreSummary[]): string[] {
  return [...new Set(stores.map((store) => normalizeState(store.state)).filter(Boolean))].sort(
    byName
  );
}

/** Is this spelling nothing but capitals? `VARANASI`, `HIMACHAL PRADESH`. */
function isShouting(value: string): boolean {
  return value === value.toUpperCase() && value !== value.toLowerCase();
}

/** Does this store belong to the chosen city? */
function inCity(store: StoreSummary, city: string): boolean {
  return store.city.trim().toLowerCase() === city.trim().toLowerCase();
}

/**
 * Cities in a state, deduped case-insensitively, sorted. Drives the second
 * select.
 *
 * `city` is free text with the same problem as `state`: Uttar Pradesh ships
 * both "Varanasi" and "VARANASI", which listed the city twice and then hid
 * the branch behind the spelling the customer did not pick.
 *
 * There is no alias table for cities the way there is for states — a city's
 * identity is its own name, and "Varanasi" and "Vasi" are different places. So
 * the only folding done is case, and the label shown is the spelling the
 * database uses most often, with an all-caps one losing to a mixed-case one on
 * a tie.
 */
export function listCities(stores: readonly StoreSummary[], state: string): string[] {
  if (!state) return [];

  // Lowercased city -> how the database spells it -> how many stores use that.
  const variants = new Map<string, Map<string, number>>();

  for (const store of stores) {
    if (!inState(store, state)) continue;
    const city = store.city.trim();
    if (!city) continue;

    const key = city.toLowerCase();
    const spellings = variants.get(key) ?? new Map<string, number>();
    spellings.set(city, (spellings.get(city) ?? 0) + 1);
    variants.set(key, spellings);
  }

  return [...variants.values()]
    .map((spellings) =>
      [...spellings].sort(
        (a, b) => b[1] - a[1] || Number(isShouting(a[0])) - Number(isShouting(b[0]))
      )[0][0]
    )
    .sort(byName);
}

/** Stores in a state+city, sorted by name. Drives the third select. */
export function listStores(
  stores: readonly StoreSummary[],
  state: string,
  city: string
): StoreSummary[] {
  if (!state || !city) return [];
  return stores
    .filter((store) => inState(store, state) && inCity(store, city))
    .sort((a, b) => byName(a.name, b.name));
}

/**
 * Re-derive a selection after any select changes, so a narrowing choice can
 * never leave a stale city or store behind it.
 *
 * When a step has exactly one candidate — common in the network's smaller
 * states — it is chosen automatically. Making someone click through a
 * one-option dropdown is pure friction, and there is no ambiguity to resolve.
 * Any step with more than one candidate is left for the customer to pick.
 *
 * Pure, so it is safe to call from an event handler without an effect.
 */
export function resolveSelection(
  stores: readonly StoreSummary[],
  next: Partial<StoreSelection>
): StoreSelection {
  // Normalised, not passed through: the options come from `listStates`, so
  // holding "UP" here would match no `<option>` and leave the select blank.
  const state = normalizeState(next.state ?? "");

  if (!state) return EMPTY_SELECTION;

  const cities = listCities(stores, state);
  // Matched case-insensitively: the option list now folds spellings, so a city
  // held in state from a stale list (or a deep link) must not be discarded just
  // because the API has since respelled it.
  const kept = cities.find(
    (candidate) => candidate.toLowerCase() === (next.city ?? "").trim().toLowerCase()
  );
  const city = kept ?? (cities.length === 1 ? cities[0] : "");

  if (!city) return { state, city: "", storeCode: "" };

  const inCity = listStores(stores, state, city);
  const storeCode = inCity.some((store) => store.code === next.storeCode)
    ? (next.storeCode as string)
    : inCity.length === 1
      ? inCity[0].code
      : "";

  return { state, city, storeCode };
}

export function findStore(
  stores: readonly StoreSummary[],
  storeCode: string
): StoreSummary | null {
  return stores.find((store) => store.code === storeCode) ?? null;
}

/**
 * A store's public contact number, formatted for a `tel:` link.
 *
 * Store phones in the database are stored as bare 10-digit strings, but the
 * column is free text and older rows carry a leading `0` or the odd space. Strip
 * everything that is not a digit so the link dials correctly either way.
 */
export function telHref(phone: string): string {
  return `tel:+91${phone.replace(/\D/g, "").slice(-10)}`;
}
