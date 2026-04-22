type Office = {
  city: string;
  officeType: string;
  lines: string[];
};

const OFFICES: Office[] = [
  {
    city: "Delhi",
    officeType: "Registered Office",
    lines: [
      "Mycleaners Solutions Pvt Ltd",
      "29, Sarai Jullena, New Friends Colony,",
      "New Delhi, Delhi 110025",
    ],
  },
  {
    city: "Gurugram",
    officeType: "Corporate Office",
    lines: [
      "SAS Tower 9th Floor Sec 38, Near Medanta Hospital,",
      "Gurugram, Haryana 122001",
    ],
  },
  {
    city: "Guwahati",
    officeType: "Corporate Office",
    lines: [
      "2nd floor, No 1, Rupali Path, Old City Faculty Building,",
      "Opp. Overnite Exprees, AIDC, Zoo Road, Guwahati, Assam, 781024",
    ],
  },
  {
    city: "Rajasthan",
    officeType: "Corporate Office",
    lines: [
      "G-01, Savitri Residency, Parshuram Park, Near Ramlila Maidan,",
      "Sikar, Rajasthan 332001",
    ],
  },
  {
    city: "Gurgaon",
    officeType: "Corporate Office Sales",
    lines: [
      "2nd Floor, Signature Tower III,",
      "Tower D, Behind Google Headquarters, Sec 15-II",
    ],
  },
];

const CONTACT = {
  phoneDisplay: "9711 711 011",
  phoneHref: "9711711011",
  email: "contact@mycleaners.in",
};

export function Contact_Office_Info() {
  return (
    <section className="w-full bg-white">
      <div className="container pb-10 pt-2 sm:pb-12 lg:pb-14">
        <div className="rounded-2xl border border-border-light bg-surface p-5 shadow-card sm:p-6 lg:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[24px] font-semibold text-dark sm:text-[30px] lg:text-[34px]">
              Visit or Reach Us
            </h2>
            
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((office) => (
              <article
                key={`${office.officeType}-${office.city}`}
                className="rounded-xl border border-border-light bg-white p-4 transition-shadow hover:shadow-card"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {office.officeType}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-dark">{office.city}</h3>
                <address className="mt-2 not-italic text-body-sm leading-relaxed text-dark-muted">
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${CONTACT.phoneHref}`}
              className="inline-flex items-center justify-center rounded-xl bg-dark px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-dark/90"
            >
              Call us: {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center justify-center rounded-xl bg-dark px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-dark/90"
            >
              Email: {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
