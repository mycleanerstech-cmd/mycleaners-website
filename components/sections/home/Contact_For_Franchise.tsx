"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type FormState = {
  name: string;
  mobile: string;
  email: string;
  city: string;
};

export function Contact_For_Franchise() {
  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    email: "",
    city: "",
  });
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedMessage("Submitted successfully. Our team will contact you soon.");
    setForm({
      name: "",
      mobile: "",
      email: "",
      city: "",
    });
  }

  return (
    <section className="w-full bg-white">
      <div className="container py-6 sm:py-8 lg:py-10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <div className="relative h-[220px] overflow-hidden rounded-2xl bg-surface sm:h-[300px] lg:h-full lg:min-h-[420px]">
              {/* <Image
                src="/images/Franchise_Dealing.jfif"
                alt="Franchise discussion"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 40vw"
              /> */}
               <DotLottieReact
      src="https://lottie.host/0f645258-b66f-4b1d-9810-7a6d535e6f30/28jDVsgJ6c.lottie"
      loop
      autoplay
    />
              
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-border-light bg-surface p-4 shadow-card sm:p-6 lg:p-7">
              <h2 className="text-center text-[24px] font-semibold text-dark sm:text-[30px] lg:text-[34px]">
                Contact for Franchise Partner
              </h2>
              <p className="mt-2 text-center text-body-sm text-dark-muted">
                Fill in your details and we will get in touch with you.
              </p>

              <form onSubmit={handleSubmit} className="mt-5 sm:mt-6">
                <div className="grid grid-cols-1 gap-y-4 gap-x-3 md:grid-cols-2 md:gap-y-5">
                  <input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="Name"
                    type="text"
                    autoComplete="name"
                    required
                    className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-primary focus-visible:outline-none focus-visible:ring-0"
                  />

                  <input
                    value={form.mobile}
                    onChange={(e) => setField("mobile", e.target.value)}
                    placeholder="Mobile No."
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-primary focus-visible:outline-none focus-visible:ring-0"
                  />

                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    required
                    className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-primary focus-visible:outline-none focus-visible:ring-0"
                  />

                  <input
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                    placeholder="City"
                    type="text"
                    autoComplete="address-level2"
                    required
                    className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-primary focus-visible:outline-none focus-visible:ring-0"
                  />
                </div>

                <div className="mt-5 sm:mt-7 flex justify-center">
                  <Button type="submit" variant="primary" size="md">
                    Submit
                  </Button>
                </div>
                {submittedMessage && (
                  <p aria-live="polite" className="mt-3 text-center text-sm font-semibold text-success">
                    {submittedMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
