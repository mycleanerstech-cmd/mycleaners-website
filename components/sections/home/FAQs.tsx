"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import faqs from "@/mock/faqs.json";
import { cn } from "@/lib/utils";
import { SITE_WHATSAPP_LINK } from "@/lib/constants";

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
  const [customerQuestion, setCustomerQuestion] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleQuestionSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedQuestion = customerQuestion.trim();
    if (!cleanedQuestion) return;

    const confirmMessage = `You are about to send the following message to WhatsApp:\n\n"${cleanedQuestion}"\n\nClick OK to proceed.`;
    
    if (window.confirm(confirmMessage)) {
      // Open WhatsApp with the typed question pre-filled
      const whatsappUrl = `${SITE_WHATSAPP_LINK}?text=${encodeURIComponent(cleanedQuestion)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setCustomerQuestion("");
    }
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timerId = window.setTimeout(() => setToastMessage(null), 3500);
    return () => window.clearTimeout(timerId);
  }, [toastMessage]);

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

        <div className="mt-8 w-full rounded-2xl border border-border-light bg-surface p-4 sm:mt-10 sm:p-5 md:p-6">
          <h3 className="text-base font-semibold text-dark sm:text-[1.0625rem]">
            Didn&apos;t find your question?
          </h3>
          <p className="mt-1 text-sm text-dark-muted sm:text-[0.9375rem]">
            Ask your own question and we will add it to the FAQ after review.
          </p>

          <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleQuestionSubmit}>
            <label htmlFor="customer-question" className="sr-only">
              Enter your question
            </label>
            <input
              id="customer-question"
              type="text"
              value={customerQuestion}
              onChange={(event) => setCustomerQuestion(event.target.value)}
              placeholder="Type your question here..."
              className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted/80 focus:border-border-light focus-visible:outline-none focus-visible:ring-0"
            />
            <button
              type="submit"
              disabled={!customerQuestion.trim()}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/60"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-4 bottom-6 z-50 pointer-events-none sm:right-6 sm:bottom-6"
        >
          <div className="inline-flex max-w-[calc(100vw-2rem)] items-center wrap-break-word rounded-lg bg-primary px-3 py-2 text-center text-xs font-semibold text-white shadow-btn sm:px-3 sm:text-sm">
            {toastMessage}
          </div>
        </div>
      )}
    </section>
  );
}
