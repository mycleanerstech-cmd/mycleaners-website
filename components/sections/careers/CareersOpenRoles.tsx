"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { CAREER_ROLES } from "@/lib/careers";
import { SITE_EMAIL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function applyMailto(roleTitle: string) {
  const subject = encodeURIComponent(`Application – ${roleTitle} – MyCleaners`);
  return `mailto:${SITE_EMAIL}?subject=${subject}`;
}

export function CareersOpenRoles() {
  const [activeId, setActiveId] = useState(CAREER_ROLES[0]?.id ?? "");
  const active = useMemo(
    () => CAREER_ROLES.find((r) => r.id === activeId) ?? CAREER_ROLES[0],
    [activeId]
  );

  if (!active) {
    return null;
  }

  return (
    <section
      id="open-roles"
      className="scroll-mt-[calc(var(--nav-height)+1rem)] border-t border-border-light bg-white"
      aria-labelledby="open-roles-heading"
    >
      <div className="container section-py">
        <h2
          id="open-roles-heading"
          className="text-[1.65rem] font-bold leading-tight tracking-tight text-dark sm:text-heading-lg lg:text-[2rem]"
        >
          Open roles
        </h2>
        <p className="mt-2 max-w-2xl text-body-md text-dark-muted">
          Tap a role to read the brief—then apply in one click. We keep listings updated as teams
          grow.
        </p>

        <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:items-start lg:gap-10">
          <nav
            className="flex flex-col gap-2 lg:w-[min(100%,320px)] lg:shrink-0"
            aria-label="Job categories"
          >
            {CAREER_ROLES.map((role) => {
              const isActive = role.id === active.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveId(role.id)}
                  className={cn(
                    "group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-body-md font-semibold transition-all duration-200",
                    isActive
                      ? "border-primary/40 bg-gradient-to-r from-primary to-primary-dark text-white shadow-btn"
                      : "border-border-light bg-surface/90 text-dark hover:border-primary/30 hover:bg-primary-light/50"
                  )}
                >
                  <span className="min-w-0 truncate">{role.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-200",
                      isActive ? "translate-x-0.5 text-white" : "text-primary group-hover:translate-x-0.5"
                    )}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </nav>

          <div className="min-w-0 flex-1">
            <article
              key={active.id}
              className="animate-fade-in rounded-[1.35rem] border border-border-light bg-gradient-to-br from-white to-surface/80 p-6 shadow-card sm:p-8 lg:p-10"
            >
              <h3 className="text-heading-lg font-bold tracking-tight text-dark">{active.title}</h3>
              {active.meta ? (
                <p className="mt-2 text-body-sm font-medium text-primary">{active.meta}</p>
              ) : null}
              <p className="mt-4 text-body-md leading-relaxed text-dark-secondary">{active.description}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href={applyMailto(active.title)}>Apply now</a>
                </Button>
                <a
                  href="#how-to-join"
                  className="text-body-sm font-semibold text-dark-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
                >
                  Other ways to join
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
