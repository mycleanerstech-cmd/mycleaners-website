"use client";

import { useMemo, useState } from "react";
import faqs from "@/mock/faqs.json";
import { cn } from "@/lib/utils";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const ANSWER_HIGHLIGHT =
  /\b(iOS|Android|App Store|Google Play Store|Google Play)\b/g;

function AnswerBody({ text }: { text: string }) {
  const parts = text.split(ANSWER_HIGHLIGHT);
  return (
    <>
      {parts.map((part, i) => {
        if (["iOS", "Android", "App Store", "Google Play Store", "Google Play"].includes(part)) {
          return (
            <span key={i} className="font-medium text-primary">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function FAQs() {
  const items = useMemo(() => faqs as FaqItem[], []);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="w-full bg-white" aria-labelledby="faq-heading">
      <div className="container pt-5 pb-10 sm:pt-6 sm:pb-12 md:pb-16">
        <h2
          id="faq-heading"
          className="mx-auto w-full px-2 text-center text-[1.375rem] font-bold leading-snug text-dark min-[400px]:text-[1.5rem] sm:text-[2rem] md:text-[2.375rem] lg:text-[2.625rem]"
        >
          Know More About Mycleaners
        </h2>

        <div className="mt-6 w-full sm:mt-7 md:mt-8">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const triggerId = `faq-trigger-${item.id}`;

            return (
              <div
                key={item.id}
                className="border-b border-border-light first:border-t first:border-border-light"
              >
                <h3 className="text-[0.9375rem] font-normal leading-snug sm:text-base md:text-[17px]">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-12 w-full items-start justify-between gap-3 py-4 text-left transition-colors sm:min-h-0 sm:gap-4 sm:py-5 md:py-6"
                  >
                    <span
                      className={cn(
                        "min-w-0 flex-1 pr-1 font-semibold leading-snug transition-colors sm:pr-0",
                        isOpen ? "text-primary" : "text-dark"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-base font-light leading-none transition-colors sm:h-9 sm:w-9 sm:text-lg",
                        isOpen
                          ? "border-primary text-primary"
                          : "border-border-light text-dark-muted"
                      )}
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-smooth",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-4 text-[0.9375rem] font-normal leading-relaxed text-dark-secondary sm:pb-5 sm:text-[15px] sm:leading-relaxed md:pb-6 md:text-body-md">
                      <AnswerBody text={item.answer} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
