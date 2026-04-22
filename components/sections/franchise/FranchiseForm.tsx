"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  mobile: string;
  email: string;
  city: string;
};

export function FranchiseForm() {
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

    // Frontend-only: keep this lightweight until the backend form endpoint is ready.
    setSubmittedMessage("Submitted successfully. Our team will contact you soon.");

    setForm({
      name: "",
      mobile: "",
      email: "",
      city: "",
    });
  }

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/fp2.jpg"
          alt="Franchise background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/85 via-white/65 to-white/25" />
      </div>

      <div className="container py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="text-[24px] leading-[1.15] font-normal text-primary">Most Rewarding</p>
            <p className="mt-1 text-[24px] leading-[1.15] font-normal text-primary">Business Ever!</p>

            <p className="mt-3 text-[16px] font-semibold text-dark">
              High Return On Investment
            </p>
            <p className="mt-1 text-[16px] font-semibold text-dark">
              Recession Free Business
            </p>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="w-full max-w-[560px]">
              <div className="rounded-2xl bg-white/80 p-6 shadow-card backdrop-blur-sm sm:p-7">
                <div className="grid grid-cols-1 gap-3">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-dark">Name</span>
                    <input
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Name"
                      type="text"
                      required
                      className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted/80 focus:border-border-light focus-visible:outline-none focus-visible:ring-0"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-dark">Mobile No.</span>
                    <input
                      value={form.mobile}
                      onChange={(e) => setField("mobile", e.target.value)}
                      placeholder="Mobile No."
                      type="tel"
                      inputMode="tel"
                      required
                      className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted/80 focus:border-border-light focus-visible:outline-none focus-visible:ring-0"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-dark">Email</span>
                    <input
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="Email"
                      type="email"
                      required
                      className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted/80 focus:border-border-light focus-visible:outline-none focus-visible:ring-0"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-dark">City</span>
                    <input
                      value={form.city}
                      onChange={(e) => setField("city", e.target.value)}
                      placeholder="City"
                      type="text"
                      required
                      className="h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted/80 focus:border-border-light focus-visible:outline-none focus-visible:ring-0"
                    />
                  </label>

                  <div className="mt-2 flex items-center gap-4">
                    <Button type="submit" variant="primary" size="md">
                      Submit
                    </Button>
                    {submittedMessage && (
                      <p className="text-sm font-semibold text-success">{submittedMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Orange bottom strip (matches the reference layout) */}
      <div className="bg-primary py-4">
        <div className="container">
          <p className="text-center text-[18px] font-semibold text-white sm:text-[22px]">
            India&apos;s 1st Organized Chain of Cleaning Services
          </p>
        </div>
      </div>
    </section>
  );
}

