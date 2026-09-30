import { NextResponse } from "next/server";

import { callLeadsApi, isLeadsApiConfigured, LeadsApiError } from "@/lib/leads-api";
import { pickupLeadSchema } from "@/lib/pickup-schema";

/**
 * Proxies the landing page's pickup form to the billing API.
 *
 * The browser never sees `LEADS_API_KEY`. This route holds it, validates the
 * payload, and forwards a narrowed body. Without this hop the key would have to
 * be shipped to the client, where anyone could read it and submit leads at will.
 */

/** The API applies its own per-client rate limit; this is a coarse outer guard. */
const MAX_BODY_BYTES = 8_192;

export async function POST(request: Request) {
  if (!isLeadsApiConfigured()) {
    return NextResponse.json(
      { success: false, error: "Pickup requests are temporarily unavailable." },
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

  // Validate before spending an upstream call, and send only the fields the
  // API declares. Anything extra the client sent is dropped here rather than
  // forwarded, so a crafted payload cannot reach the lead service.
  const parsed = pickupLeadSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        error: firstIssue?.message ?? "Please check the form and try again.",
        fields: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  try {
    const data = await callLeadsApi<{
      leadId: string | null;
      storeLocation: string | null;
      storePhone: string | null;
    }>("/website/leads", { method: "POST", body: parsed.data });

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
