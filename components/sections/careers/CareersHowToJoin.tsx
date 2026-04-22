import Link from "next/link";
import { Briefcase, Mail, MessageCircle, Rocket } from "lucide-react";
import { CAREER_JOIN_PATHS } from "@/lib/careers";

const iconMap = {
  "open-roles": Briefcase,
  email: Mail,
  whatsapp: MessageCircle,
  franchise: Rocket,
} as const;

function JoinPathCta({
  href,
  ctaLabel,
  external,
}: {
  href: string;
  ctaLabel: string;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark";

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {ctaLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </a>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ctaLabel}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {ctaLabel}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function CareersHowToJoin() {
  return (
    <section
      id="how-to-join"
      className="relative scroll-mt-[calc(var(--nav-height)+1rem)] border-t border-border-light bg-gradient-to-b from-white via-[#faf8ff] to-[#f3f6ff]"
      aria-labelledby="how-to-join-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container section-py">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-to-join-heading"
            className="text-[1.65rem] font-bold leading-tight tracking-tight text-dark sm:text-heading-lg sm:leading-[1.25] lg:text-[2rem]"
          >
            How can you join MyCleaners?
          </h2>
          <p className="mt-3 text-body-md text-dark-muted">
            Four easy ways to get in—pick what feels right. No stuffy forms or endless portals unless
            you want them.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {CAREER_JOIN_PATHS.map((path, index) => {
            const Icon = iconMap[path.id as keyof typeof iconMap] ?? Briefcase;
            const isWhatsapp = path.id === "whatsapp";

            return (
              <li key={path.id}>
                <article
                  className="group relative flex h-full flex-col rounded-[1.35rem] border border-border-light bg-white/80 p-6 shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover motion-reduce:transform-none"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isWhatsapp
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-primary-light text-primary"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="text-heading-sm font-bold text-dark">{path.title}</h3>
                  <p className="mt-2 flex-1 text-body-sm text-dark-muted">{path.description}</p>
                  <div className="mt-5 border-t border-border-light pt-4">
                    <JoinPathCta
                      href={path.href}
                      ctaLabel={path.ctaLabel}
                      external={path.external}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
