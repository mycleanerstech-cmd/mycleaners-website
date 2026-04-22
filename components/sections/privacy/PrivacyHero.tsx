export function PrivacyHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border-light bg-surface-alt"
      aria-labelledby="privacy-hero-heading"
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

      <div className="container relative py-12 sm:py-16 lg:py-12">
       
        <h1
          id="privacy-hero-heading"
          className="mt-3 max-w-3xl text-display-sm text-dark sm:text-display-md"
        >
          PRIVACY POLICY
        </h1>
        <p className="mt-3 max-w-3xl text-body-lg text-dark-secondary">
          How we collect, use, and protect your data.
        </p>

        
      </div>
    </section>
  );
}

