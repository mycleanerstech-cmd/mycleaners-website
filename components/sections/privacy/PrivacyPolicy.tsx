import Link from "next/link";
import { SITE_URL, LEGAL_NAME } from "@/lib/constants";
import { PRIVACY_SECTIONS, PRIVACY_TOC } from "@/lib/privacy-policy";
import { City_We_Work } from "@/components/sections/City_We_Work";
import { PrivacyHero } from "@/components/sections/privacy/PrivacyHero";
import { PrivacyToc } from "@/components/sections/privacy/PrivacyToc";
import { PrivacySection } from "@/components/sections/privacy/PrivacySection";

export function PrivacyPolicy() {
  return (
    <div className="bg-white scroll-smooth">
      <PrivacyHero />

      <section className="container py-8 sm:py-10 lg:py-12" aria-label="Privacy Policy">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <PrivacyToc items={PRIVACY_TOC} />

          <div className="min-w-0 flex-1 space-y-6">
            <div className="rounded-2xl border border-border-light bg-white shadow-card p-5 sm:p-6">
              <p className="text-body-sm leading-relaxed text-dark-secondary">
                {LEGAL_NAME} (Mycleaners) is committed to protecting our visitors&rsquo; and
                members&rsquo; privacy. This Privacy Policy describes the types of information that
                Mycleaners collects from and about you when you visit our website,{" "}
                <Link
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  www.Mycleaners.in
                </Link>
                (&ldquo;Site&rdquo;), mobile app (&ldquo;App&rdquo;), mobile messaging services, and
                or other online or offline communications (collectively, the &ldquo;Services&rdquo;).
                This Privacy Policy also explains how Mycleaners may use and disclose such
                information, and your ability to control certain uses of it.
              </p>

              <p className="mt-4 text-body-sm leading-relaxed text-dark-secondary">
                By using the Services, you agree to the collection, use, and disclosure of your
                information as described in this Privacy Policy, and agree to the Mycleaners{" "}
                <Link
                  href="https://www.mycleaners.in/terms-of-use/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Terms of Use
                </Link>{" "}
                which are incorporated by reference. If you do not agree, please do not access or
                use the Services.
              </p>
            </div>

            <div className="space-y-6">
              {PRIVACY_SECTIONS.map((section) => (
                <PrivacySection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <City_We_Work
        title="Cities We Deliver to"
        className="bg-transparent"
        containerClassName="pt-0 pb-12 sm:pb-16"
      />
    </div>
  );
}

