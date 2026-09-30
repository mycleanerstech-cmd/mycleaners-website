/**
 * Shared plumbing for the Contact Us and Franchise forms.
 *
 * Both post to this site's own API routes rather than to the billing API
 * directly, because `LEADS_API_KEY` is server-only. A browser that called
 * Railway itself would need the key in the client bundle, where anyone could
 * read it off the page and submit leads at will.
 *
 * `server-only` would be ideal here, but this module holds a `zod` schema that
 * the browser also imports for inline validation. The schemas are duplicated in
 * `lib/enquiry-schema.ts` and re-validated by the routes, so nothing secret
 * crosses the boundary — but keep it that way: never import `lib/leads-api.ts`
 * from a `"use client"` file.
 */

import { NextResponse } from "next/server";

import { callLeadsApi, isLeadsApiConfigured, LeadsApiError } from "@/lib/leads-api";

/** The API applies its own per-client rate limit; this is a coarse outer guard. */
const MAX_BODY_BYTES = 8_192;

/**
 * Shared request handling for the two enquiry endpoints.
 *
 * Each endpoint differs only in which schema it validates against and which
 * upstream path it forwards to, so the parse/size/validate/forward/error-map
 * sequence lives here once. The alternative — two near-identical route handlers
 * — is how the two drift apart on error shape or size limits.
 */
export async function handleEnquiryRoute<T>({
  request,
  schema,
  upstreamPath,
  notConfiguredMessage,
}: {
  request: Request;
  /** Client-and-server validation for this specific enquiry type. */
  schema: { safeParse: (body: unknown) => { success: true; data: T } | { success: false; error: { issues: { path: PropertyKey[]; message: string }[] } } };
  upstreamPath: string;
  /** Operator-facing when the proxy is not set up. */
  notConfiguredMessage: string;
}) {
  if (!isLeadsApiConfigured()) {
    return NextResponse.json(
      { success: false, error: notConfiguredMessage },
      { status: 503 }
    );
  }

  const raw = await request.text();

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: "Request is too large." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { success: false, error: "Malformed request." },
      { status: 400 }
    );
  }

  // Validate before spending an upstream call. The API strips unknown keys, but
  // validating here means a crafted payload is rejected rather than silently
  // narrowed, and it lets the form map errors back onto specific fields.
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const issues = parsed.error.issues;
    return NextResponse.json(
      {
        success: false,
        error: issues[0]?.message ?? "Please check the form and try again.",
        fields: issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  try {
    const data = await callLeadsApi<{ leadId: string | null }>(upstreamPath, {
      method: "POST",
      body: parsed.data,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof LeadsApiError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
