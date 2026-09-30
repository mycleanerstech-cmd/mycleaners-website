import { NextResponse } from "next/server";

import { callLeadsApi, isLeadsApiConfigured, LeadsApiError } from "@/lib/leads-api";
import type { StoreSummary } from "@/lib/stores";

/**
 * Proxies the store list that backs the pickup form's State → City → Store
 * cascade.
 *
 * The upstream endpoint takes no state/city parameter and has no pagination, so
 * this forwards the whole active network in one request and the browser narrows
 * it locally. Passing through the full list here is deliberate: a state filter
 * upstream would mean one round trip per dropdown, and the customer would see a
 * spinner on every change instead of an instant list.
 *
 * `force-dynamic` stops Next prerendering this at build time, which would freeze
 * a snapshot of the store network into the deployment. Freshness is the CDN's
 * job, via the `Cache-Control` header below.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isLeadsApiConfigured()) {
    return NextResponse.json(
      { success: false, error: "Store list unavailable." },
      { status: 503 }
    );
  }

  try {
    const data = await callLeadsApi<{ stores: StoreSummary[] }>("/website/stores", {
      method: "GET",
    });

    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (error) {
    if (error instanceof LeadsApiError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { success: false, error: "Could not load stores." },
      { status: 500 }
    );
  }
}
