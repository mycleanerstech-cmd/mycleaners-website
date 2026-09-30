import { handleEnquiryRoute } from "@/lib/enquiry-api";
import { franchiseLeadSchema } from "@/lib/enquiry-schema";

/**
 * Proxies the Franchise form to the billing API as a `franchise_lead`.
 *
 * The commercial detail — budget band and space status — lands on real `Lead`
 * columns, so the CRM's franchise views display it without any new plumbing.
 * The message, having no column of its own, is stored as `rawPayload.description`,
 * one of the four keys the CRM already surfaces.
 */
export async function POST(request: Request) {
  return handleEnquiryRoute({
    request,
    schema: franchiseLeadSchema,
    upstreamPath: "/website/franchises",
    notConfiguredMessage: "Franchise enquiries are temporarily unavailable. Please call or WhatsApp us instead.",
  });
}
