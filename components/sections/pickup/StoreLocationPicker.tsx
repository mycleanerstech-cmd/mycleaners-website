"use client";

import { ChevronDown, MapPin, Phone } from "lucide-react";

import {
  findStore,
  listCities,
  listStates,
  listStores,
  resolveSelection,
  telHref,
  type StoreSelection,
  type StoreSummary,
} from "@/lib/stores";
import { normalizeState } from "@/lib/india-states";
import { cn } from "@/lib/utils";

/**
 * State → City → Store, in that order.
 *
 * The customer narrows 150+ branches down by picking their state first, then
 * seeing only the cities that state actually has a store in, then only the
 * branches in that city. Each select stays disabled until the one above it has
 * an answer, so the form can never present a store from the wrong state.
 *
 * The store is what actually routes the lead: the billing API resolves
 * `storeCode` to a `storeId` and writes the lead against that branch's
 * dashboard, so this choice is the one that decides who calls the customer.
 */
export function StoreLocationPicker({
  stores,
  selection,
  onChange,
  error,
  disabled = false,
}: {
  stores: readonly StoreSummary[];
  selection: StoreSelection;
  onChange: (next: StoreSelection) => void;
  /** Message shown under the store select — the field the API rejects on. */
  error?: string;
  disabled?: boolean;
}) {
  const states = listStates(stores);
  const cities = listCities(stores, selection.state);
  const branches = listStores(stores, selection.state, selection.city);
  const selectedStore = findStore(stores, selection.storeCode);

  function update(patch: Partial<StoreSelection>) {
    onChange(resolveSelection(stores, { ...selection, ...patch }));
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="State"
          value={selection.state}
          onChange={(value) => update({ state: value, city: "", storeCode: "" })}
          disabled={disabled || states.length === 0}
          placeholder="Select your state"
          count={states.length}
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>

        <Select
          label="City"
          value={selection.city}
          onChange={(value) => update({ city: value, storeCode: "" })}
          disabled={disabled || !selection.state}
          placeholder={selection.state ? "Select your city" : "Select a state first"}
          count={cities.length}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Select
          label="Pickup store"
          required
          value={selection.storeCode}
          onChange={(value) => update({ storeCode: value })}
          disabled={disabled || !selection.city}
          placeholder={
            selection.city
              ? branches.length === 1
                ? "Only one store here — it will be selected"
                : "Select your store"
              : "Select a city first"
          }
          count={branches.length}
          invalid={Boolean(error)}
          error={error}
        >
          {branches.map((store) => (
            <option key={store.code} value={store.code}>
              {store.name} — {store.address}
            </option>
          ))}
        </Select>

        {selectedStore ? (
          <div className="mt-3 flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary-light/60 p-4">
            <p className="flex items-start gap-2 text-sm text-dark-secondary">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="font-semibold text-dark">{selectedStore.name}</span>
                <br />
                {selectedStore.address}, {selectedStore.city},{" "}
                {normalizeState(selectedStore.state)}
              </span>
            </p>
            <a
              href={telHref(selectedStore.phone)}
              className="flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              {selectedStore.phone}
            </a>
            <p className="text-xs text-dark-muted">
              Your request goes straight to this branch, and they&apos;ll call you to
              confirm the slot.
            </p>
          </div>
        ) : null}

        {/* A state with no branches in the network is a dead end, so say so
            rather than leaving the customer on a disabled dropdown. */}
        {selection.state && cities.length === 0 ? (
          <p className="mt-3 text-sm font-medium text-dark-secondary">
            We don&apos;t have a store in {selection.state} yet. Call us on the number
            below and we&apos;ll help you find the closest one.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  placeholder,
  count,
  disabled = false,
  required = false,
  invalid = false,
  error,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** How many options exist — rendered as a hint, and 0 disables the select. */
  count: number;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const hint =
    error ??
    (count > 0 && !disabled
      ? `${count} ${count === 1 ? "option" : "options"}`
      : undefined);

  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-dark">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </span>

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
            invalid ? "border-error" : "border-border-light"
          )}
        >
          {/* A disabled placeholder is still selected, so it has to render as
              the empty option rather than as an unselectable first choice. */}
          <option value="">{placeholder}</option>
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-muted"
          aria-hidden="true"
        />
      </span>

      {hint ? (
        <span
          className={cn(
            "text-xs",
            error ? "font-medium text-error" : "text-dark-muted"
          )}
        >
          {hint}
        </span>
      ) : null}
    </label>
  );
}
