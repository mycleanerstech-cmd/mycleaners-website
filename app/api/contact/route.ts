import { handleEnquiryRoute } from "@/lib/enquiry-api";
import { enquiryLeadSchema } from "@/lib/enquiry-schema";

/**
 * Proxies the Contact Us form to the billing API as a `query_lead`.
 *
 * The store on the form is **optional, and empty is the default**: a question
 * like "do you cover Nashik?" is not about any particular branch, so it is
 * written unrouted and lands in the CRM's headquarters queue. If the customer
 * does pick a store, the enquiry is routed straight to that branch and the
 * branch is alerted to call the customer — support never has to touch it.
 */
export async function POST(request: Request) {
  return handleEnquiryRoute({
    request,
    schema: enquiryLeadSchema,
    upstreamPath: "/website/queries",
    notConfiguredMessage: "Enquiries are temporarily unavailable. Please call or WhatsApp us instead.",
  });
}
