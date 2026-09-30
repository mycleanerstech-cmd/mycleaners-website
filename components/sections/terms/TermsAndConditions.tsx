"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

type TermItem = {
  id: string;
  question: string;
  answer: string;
};

const TERMS: readonly TermItem[] = [
  {
    id: "Q1",
    question: "When & how will I receive my original bill?",
    answer:
      "Ensure to take original bill or copy after due delivery of articles to be processed. You can also download the bill through our website or Mobile App. Original bill or copy needs to be presented at the time of delivery of processed articles.",
  },
  {
    id: "Q2",
    question: "What if the Original Bill gets lost or is misplaced?",
    answer:
      "If the original bill is lost or could not be produced at the time of delivery, the delivery of the processed article shall be made to the owner only after verifying his/her credential. You can also regenerate it through the website or App.",
  },
  {
    id: "Q3",
    question: "What if the customer is not satisfied with the service?",
    answer:
      "If not satisfied with the quality of any service offered, customers should get in touch with the store or the company within 24 hours for resolution.",
  },
  {
    id: "Q4",
    question: "What if the customer discovers a damage after the delivery of their items?",
    answer:
      "Customers are requested to examine the articles at the time of delivery; we would not be held responsible for any damages that are found after delivery of processed articles.",
  },
  {
    id: "Q5",
    question: "What is Mycleaners policy on items with risk of damage during cleaning?",
    answer:
      "We are not responsible for fastness, color bleed, color running, shrinkage, damages to embellishments or embroidery work on the articles during processing. We would be putting in our best efforts to remove any stains or unwanted marks on the clothes; however we cannot guarantee 100% removal of stains or marks. Customers will have no claim whatsoever or no rights to ask for deduction in processing charges on account of this.",
  },
  {
    id: "Q6",
    question: "What if my clothes are not delivered on the scheduled date?",
    answer:
      "We put in our best efforts to ensure timely pick-up and delivery; however there might be incidents beyond our control or incidences of Force Majeure where we are unable to stick to the timelines. In such cases, customer cannot claim any compensation, refunds or any reduction in charges.",
  },
  {
    id: "Q7",
    question: "What happens if Mycleaners loses or damages one of my items?",
    answer:
      "We will do everything that we can to return your garments to you in perfect shape. In the rare occasion that a thing disappears or is harmed during the cleaning procedure, we will provide reimbursement up to the maximum of 7-10 times of the service value, as per our terms and conditions.",
  },
] as const;

export function TermsAndConditions() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string>(TERMS[0]?.id ?? "");

  const items = useMemo(() => TERMS, []);

  return (
    <main className="bg-white">
      <section
        className="relative overflow-hidden border-b border-border-light bg-surface-alt"
        aria-labelledby="terms-hero-heading"
      >
        <div
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl"
          aria-hidden="true"
        />

        <div className="container relative py-12 sm:py-16 lg:py-20">
          <p className="text-caption font-semibold uppercase tracking-[0.2em] text-primary">
            Terms & Conditions
          </p>
          <h1
            id="terms-hero-heading"
            className="mt-3 max-w-3xl text-display-sm text-dark sm:text-display-md"
          >
            The quick rules that keep your {SITE_NAME} experience smooth
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-dark-secondary">
            Clear, simple answers—tap a question to expand. This page summarizes key conditions
            related to billing, delivery, quality concerns, and liability.
          </p>
        </div>
      </section>

      <section className="container py-8 sm:py-10 lg:py-12" aria-label="Terms FAQ">
        <div className="mx-auto w-full max-w-4xl">
          <div className="w-full rounded-2xl border border-border-light bg-white shadow-card">
            <div className="border-b border-border-light p-4 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
                <div>
                 
                  <h2 className="mt-2 text-[20px] font-semibold text-dark sm:text-[26px]">
                    Terms, explained
                  </h2>
                </div>
                
              </div>
            </div>

            <div className="divide-y divide-border-light">
              {items.map((item) => {
                const isOpen = item.id === openId;
                const buttonId = `${baseId}-${item.id}-btn`;
                const panelId = `${baseId}-${item.id}-panel`;

                return (
                  <div key={item.id} className="p-4 sm:p-6">
                    <button
                      id={buttonId}
                      type="button"
                      className="flex w-full items-start justify-between gap-3 text-left sm:gap-4"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
                    >
                      <span className="min-w-0">
                        <span className="text-caption font-semibold text-primary">{item.id}</span>
                        <span className="mt-1 block wrap-break-word text-body-md font-semibold leading-snug text-dark sm:text-body-lg">
                          {item.question}
                        </span>
                      </span>
                      <span
                        className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isOpen
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-border-light bg-white text-dark-muted hover:text-dark"
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? <MinusIcon /> : <PlusIcon />}
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`${isOpen ? "mt-3 block" : "hidden"}`}
                    >
                      <p className="max-w-none wrap-break-word text-body-sm leading-relaxed text-dark-secondary sm:max-w-3xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border-light bg-surface p-4 shadow-card sm:p-6">
            <h3 className="text-body-lg font-semibold text-dark">Need help?</h3>
            <p className="mt-1 text-body-sm text-dark-muted">
              If anything is unclear, reach out via our contact page and we’ll help fast.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-body-sm font-semibold text-white shadow-[0_10px_28px_rgba(255,122,24,0.25)] transition hover:brightness-110 sm:w-auto"
              >
                Contact support
              </a>
              <Link
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-xl border border-border-light bg-white px-5 py-2.5 text-body-sm font-semibold text-dark transition hover:bg-surface-alt sm:w-auto"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

