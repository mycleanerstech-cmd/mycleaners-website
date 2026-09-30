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
 */

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

/** Every distinct state, sorted. Drives the first select. */
export function listStates(stores: readonly StoreSummary[]): string[] {
  return [...new Set(stores.map((store) => store.state).filter(Boolean))].sort(byName);
}

/** Cities in a state, sorted. Drives the second select. */
export function listCities(stores: readonly StoreSummary[], state: string): string[] {
  if (!state) return [];
  return [
    ...new Set(
      stores.filter((store) => store.state === state).map((store) => store.city).filter(Boolean)
    ),
  ].sort(byName);
}

/** Stores in a state+city, sorted by name. Drives the third select. */
export function listStores(
  stores: readonly StoreSummary[],
  state: string,
  city: string
): StoreSummary[] {
  if (!state || !city) return [];
  return stores
    .filter((store) => store.state === state && store.city === city)
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
  const state = next.state ?? "";

  if (!state) return EMPTY_SELECTION;

  const cities = listCities(stores, state);
  const city = cities.includes(next.city ?? "")
    ? (next.city as string)
    : cities.length === 1
      ? cities[0]
      : "";

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
