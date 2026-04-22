"use client";

import { X } from "lucide-react";
import { useEffect, useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-lg border border-border-light bg-white px-3 text-[0.9375rem] text-dark outline-none transition-colors placeholder:text-dark-muted focus:border-primary focus-visible:outline-none focus-visible:ring-0";

export type CareerApplyModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CareerApplyModal({ open, onClose }: CareerApplyModalProps) {
  const titleId = useId();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [otpHint, setOtpHint] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleSendOtp() {
    if (!phone.trim()) {
      setOtpHint("Enter your phone number first.");
      return;
    }
    setOtpHint("OTP sent to your number. Enter it when prompted.");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedMessage(
      file
        ? "Application submitted with your attachment. Our team will contact you soon."
        : "Application submitted. Our team will contact you soon."
    );
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setCity("");
    setMessage("");
    setFile(null);
    setOtpHint(null);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-dark/35 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-1 w-full max-w-md animate-scale-in rounded-card bg-white p-5 shadow-card sm:p-6",
          "max-h-[min(92dvh,840px)] overflow-y-auto"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            id={titleId}
            className="text-heading-md font-bold text-primary sm:text-heading-lg"
          >
            MyCleaners My Rider
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-dark-muted transition-colors hover:bg-surface hover:text-dark"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              type="text"
              autoComplete="given-name"
              required
              className={inputClass}
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              type="text"
              autoComplete="family-name"
              required
              className={inputClass}
            />
          </div>

          <div className="flex gap-0 overflow-hidden rounded-lg border border-border-light bg-white shadow-sm">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              className="h-11 min-w-0 flex-1 border-0 bg-transparent px-3 text-[0.9375rem] text-dark outline-none placeholder:text-dark-muted focus-visible:ring-0"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              className="shrink-0 whitespace-nowrap rounded-none bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Sent OTP
            </button>
          </div>
          {otpHint && (
            <p className="text-xs text-dark-secondary" aria-live="polite">
              {otpHint}
            </p>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City name"
            type="text"
            autoComplete="address-level2"
            required
            className={inputClass}
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows={4}
            required
            className={cn(
              inputClass,
              "min-h-[100px] resize-y py-2.5 leading-relaxed"
            )}
          />

          <div>
            <label className="sr-only" htmlFor="career-apply-file">
              Attachment
            </label>
            <input
              id="career-apply-file"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-dark-muted file:mr-3 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-2 file:text-sm file:font-semibold file:text-dark hover:file:bg-surface-alt"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Submit application
          </Button>

          {submittedMessage && (
            <p
              aria-live="polite"
              className="text-center text-sm font-semibold text-success"
            >
              {submittedMessage}
            </p>
          )}

          <p className="pt-1 text-center text-sm font-bold text-dark">
            India&apos;s 1st Organized Chain of Cleaning Services
          </p>
        </form>
      </div>
    </div>
  );
}
