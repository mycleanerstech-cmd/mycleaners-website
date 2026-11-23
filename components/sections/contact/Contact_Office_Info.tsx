import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BuildingIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import { GSTIN, SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/constants";

const OFFICE = {
  city: "Gurugram",
  officeType: "Corporate Office",
  lines: [
    "2nd Floor, SIGNATURE TOWER-3, Tower D,",
    "Galaxy Rd, Sector 15 Part 2, Sector 15,",
    "Gurugram, Haryana 122001",
  ],
};

const CONTACT_EMAIL = "contact@mycleaners.in";

/** Full address string used for both the embedded map and the "Open in
 *  Google Maps" link, so the two can never drift apart. */
const MAPS_QUERY = [
  "SIGNATURE TOWER-3, Tower D, Galaxy Rd,",
  "Sector 15 Part 2, Sector 15, Gurugram, Haryana 122001",
].join(" ");

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAPS_QUERY,
)}&z=16&output=embed`;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAPS_QUERY,
)}`;

export function Contact_Office_Info() {
  return (
    <section className="w-full bg-white">
      <div className="container pb-10 pt-2 sm:pb-12 lg:pb-14">
        <div className="rounded-2xl border border-border-light bg-surface p-5 shadow-card sm:p-6 lg:p-8">
          <SectionHeader title="Visit or Reach Us" />

          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {/* Address + contact actions */}
            <article className="flex h-full flex-col rounded-xl border border-border-light bg-white p-5 transition-colors hover:border-primary/40 sm:p-6 lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <BuildingIcon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-caption font-semibold uppercase tracking-wider text-primary">
                    {OFFICE.officeType}
                  </p>
                  <h3 className="mt-0.5 text-heading-sm text-dark">{OFFICE.city}</h3>
                </div>
              </div>

              <address className="mt-5 not-italic text-body-sm leading-relaxed text-dark-muted">
                {OFFICE.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>

              <p className="mt-5 border-t border-border-light pt-3 text-body-sm text-dark-muted">
                <span className="font-medium text-dark-secondary">GSTIN:</span>{" "}
                {GSTIN}
              </p>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:underline"
              >
                Open in Google Maps
              </a>

              <div className="mt-auto flex flex-col items-stretch gap-3 pt-6">
                <Button asChild variant="primary" size="md" className="rounded-xl">
                  <a href={`tel:${SITE_PHONE}`}>
                    <PhoneIcon />
                    Call us: {SITE_PHONE_DISPLAY}
                  </a>
                </Button>
                <Button asChild variant="outline" size="md" className="rounded-xl">
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <MailIcon />
                    {CONTACT_EMAIL}
                  </a>
                </Button>
              </div>
            </article>

            {/* Google Maps embed */}
            <div className="overflow-hidden rounded-xl border border-border-light bg-white lg:col-span-3">
              <iframe
                title="Mycleaners corporate office on Google Maps"
                src={MAPS_EMBED_SRC}
                className="h-64 w-full sm:h-72 lg:h-full lg:min-h-[420px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
