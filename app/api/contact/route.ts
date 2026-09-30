import { handleEnquiryRoute } from "@/lib/enquiry-api";
import { enquiryLeadSchema } from "@/lib/enquiry-schema";

/**
 * Proxies the Contact Us form to the billing API as a `query_lead`.
 *
 * The enquiry is written **unrouted** upstream on purpose: a question like
 * "do you cover Nashik?" is not about any particular branch, so there is no
 * store to attach it to. The API's `websiteQueryLeadSchema` has no store field
 * at all, which is what keeps a form that never asks for one honest.
 */
export async function POST(request: Request) {
  return handleEnquiryRoute({
    request,
    schema: enquiryLeadSchema,
    upstreamPath: "/website/queries",
    notConfiguredMessage: "Enquiries are temporarily unavailable. Please call or WhatsApp us instead.",
  });
}
