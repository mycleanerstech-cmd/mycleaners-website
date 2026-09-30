"use client";

import { useEffect, useRef, useState } from "react";

import { attributionFromLocation } from "@/lib/enquiry-schema";

/**
 * Submit behaviour shared by the Contact Us and Franchise forms.
 *
 * Both need the same thing: a honeypot, a render timestamp for the server's bot
 * tripwire, per-field error mapping, and a success state that replaces the form
 * in place. Hand-rolling that twice is how one of them ends up quietly missing
 * the tripwire, so it lives here once.
 */
export type EnquirySubmitState = {
  isSubmitting: boolean;
  formError: string | null;
  fieldErrors: Record<string, string>;
  isDone: boolean;
};

const INITIAL: EnquirySubmitState = {
  isSubmitting: false,
  formError: null,
  fieldErrors: {},
  isDone: false,
};

export function useEnquirySubmit() {
  const [state, setState] = useState<EnquirySubmitState>(INITIAL);

  // Stamped once on mount. A submit arriving within a few seconds of this is a
  // script, not a person filling in a form — the API drops those silently.
  //
  // Assigned in an effect rather than initialised with `useRef(Date.now())`:
  // the React compiler rejects an impure call in the render body, because a
  // render can be discarded or replayed and this is only meaningful once.
  const renderedAt = useRef(0);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  /** Clear one field's error as soon as the customer edits it. */
  function clearFieldError(field: string) {
    setState((prev) => {
      if (!prev.fieldErrors[field]) return prev;
      const next = { ...prev.fieldErrors };
      delete next[field];
      return { ...prev, fieldErrors: next };
    });
  }

  /**
   * Show validation errors without a network round trip.
   *
   * Split out from `submit` because client-side validation should never reach
   * the server: it wastes a request and, on a flaky connection, would report a
   * trivial formatting problem as a service failure.
   */
  function setValidationErrors(fieldErrors: Record<string, string>) {
    setState((prev) => ({
      ...prev,
      isSubmitting: false,
      formError: "Please correct the highlighted fields.",
      fieldErrors,
    }));
  }

  async function submit(
    endpoint: string,
    payload: Record<string, unknown>,
    resetForm: () => void
  ): Promise<boolean> {
    setState((prev) => ({ ...prev, isSubmitting: true, formError: null, fieldErrors: {} }));

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          renderedAt: renderedAt.current,
          ...attributionFromLocation(),
        }),
      });
      const result = await response.json();

      if (!response.ok || !result?.success) {
        // Map server-side field errors back onto the inputs, so the customer
        // sees which one to fix rather than only a banner.
        const fields: Record<string, string> = {};
        for (const item of Array.isArray(result?.fields) ? result.fields : []) {
          if (item?.field && !fields[item.field]) fields[item.field] = item.message;
        }

        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          formError: result?.error ?? "Something went wrong. Please try again.",
          fieldErrors: fields,
        }));
        return false;
      }

      setState({ ...INITIAL, isDone: true });
      resetForm();
      return true;
    } catch {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        formError: "We couldn't reach our servers. Please check your connection and try again.",
      }));
      return false;
    }
  }

  return { state, submit, clearFieldError, setValidationErrors };
}
