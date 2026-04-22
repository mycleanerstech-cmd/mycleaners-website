import Link from "next/link";
import type { PrivacyTocItem } from "@/lib/privacy-policy";

export function PrivacyToc({ items }: { items: ReadonlyArray<PrivacyTocItem> }) {
  return (
    <aside className="w-full lg:w-[320px]" aria-label="Quick Guide to Contents">
      <div className="rounded-2xl border border-border-light bg-white shadow-card lg:sticky lg:top-24">
        <div className="border-b border-border-light p-4 sm:p-5">
          <h2 className="text-body-lg font-semibold text-dark">Quick Guide to Contents</h2>
          <p className="mt-1 text-body-sm text-dark-muted">
            Use these links to jump to sections 1–10.
          </p>
        </div>

        {/* Desktop / tablet list */}
        <nav className="hidden lg:block p-2" aria-label="Privacy Policy table of contents">
          <ul className="flex flex-col gap-1.5" role="list">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-3 rounded-xl px-3 py-2 text-body-sm text-dark-secondary transition hover:bg-surface-alt hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border-light bg-white text-caption font-semibold text-primary">
                    {item.number}
                  </span>
                  <span className="min-w-0 leading-snug">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile accordion */}
        <div className="lg:hidden">
          <details className="group" open>
            <summary className="cursor-pointer list-none p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-body-sm font-semibold text-dark">Browse sections</span>
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-light bg-white text-dark-muted transition group-open:bg-surface-alt group-open:text-dark"
                  aria-hidden="true"
                >
                  <ChevronIcon />
                </span>
              </div>
              <p className="mt-1 text-body-sm text-dark-muted">
                Tap to expand and jump to sections 1–10.
              </p>
            </summary>
            <nav className="px-4 pb-4 sm:px-5 sm:pb-5" aria-label="Privacy Policy table of contents">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="shrink-0 rounded-full border border-border-light bg-white px-3 py-1.5 text-body-sm font-semibold text-dark transition hover:bg-surface-alt"
                  >
                    {item.number}. {item.title}
                  </Link>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </div>
    </aside>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

