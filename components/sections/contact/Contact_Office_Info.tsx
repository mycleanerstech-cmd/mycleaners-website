import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BuildingIcon, LandmarkIcon, MailIcon, PhoneIcon } from "@/components/ui/icons";
import {
  LEGAL_NAME,
  GSTIN,
  REGISTERED_OFFICE_ADDRESS,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
} from "@/lib/constants";
import type { ReactNode } from "react";

type Office = {
  city: string;
  officeType: string;
  icon: ReactNode;
  lines: string[];
  gstin?: string;
};

const OFFICES: Office[] = [
  {
    city: "Delhi",
    officeType: "Registered Office",
    icon: <LandmarkIcon size={18} />,
    lines: [LEGAL_NAME, ...REGISTERED_OFFICE_ADDRESS],
    gstin: GSTIN,
  },
  {
    city: "Gurgaon",
    officeType: "Corporate Office",
    icon: <BuildingIcon size={18} />,
    lines: [
      "2nd Floor, Signature Tower III,",
      "Tower D, Behind Google Headquarters, Sec 15-II",
    ],
  },
];

const CONTACT_EMAIL = "contact@mycleaners.in";

export function Contact_Office_Info() {
  return (
    <section className="w-full bg-white">
      <div className="container pb-10 pt-2 sm:pb-12 lg:pb-14">
        <div className="rounded-2xl border border-border-light bg-surface p-5 shadow-card sm:p-6 lg:p-8">
          <SectionHeader title="Visit or Reach Us" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <article
                key={`${office.officeType}-${office.city}`}
                className="flex h-full flex-col rounded-xl border border-border-light bg-white p-5 transition-colors hover:border-primary/40 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    {office.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-caption font-semibold uppercase tracking-wider text-primary">
                      {office.officeType}
                    </p>
                    <h3 className="mt-0.5 text-heading-sm text-dark">{office.city}</h3>
                  </div>
                </div>

                <address className="mt-5 not-italic text-body-sm leading-relaxed text-dark-muted">
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>

                {office.gstin ? (
                  <p className="mt-5 border-t border-border-light pt-3 text-body-sm text-dark-muted">
                    <span className="font-medium text-dark-secondary">GSTIN:</span>{" "}
                    {office.gstin}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 border-t border-border-light pt-6 sm:flex-row sm:items-center">
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
        </div>
      </div>
    </section>
  );
}
