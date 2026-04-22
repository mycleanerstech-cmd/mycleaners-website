import type { PrivacySectionData, PrivacySubsection } from "@/lib/privacy-policy";

export function PrivacySection({ section }: { section: PrivacySectionData }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 rounded-2xl border border-border-light bg-white shadow-card"
      aria-labelledby={`${section.id}-heading`}
    >
      <header className="border-b border-border-light p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-caption font-semibold text-primary">
              Section {section.number}
            </p>
            <h2
              id={`${section.id}-heading`}
              className="mt-1 text-[22px] font-semibold text-dark sm:text-[26px]"
            >
              {section.number}. {section.title}
            </h2>
          </div>
        </div>
        {section.intro ? (
          <p className="mt-3 max-w-3xl text-body-sm leading-relaxed text-dark-secondary">
            {section.intro}
          </p>
        ) : null}
      </header>

      <div className="p-5 sm:p-6">
        {section.blocks ? <BlockList blocks={section.blocks} /> : null}

        {section.subsections ? (
          <div className="mt-6 space-y-6">
            {section.subsections.map((sub) => (
              <Subsection key={sub.id} subsection={sub} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Subsection({ subsection }: { subsection: PrivacySubsection }) {
  return (
    <div id={subsection.id} className="scroll-mt-24">
      <h3 className="text-body-lg font-semibold text-dark">{subsection.label}</h3>
      <div className="mt-3 space-y-4">
        {subsection.blocks.map((block, idx) => {
          if (block.type === "p") {
            return (
              <p
                key={idx}
                className="max-w-3xl text-body-sm leading-relaxed text-dark-secondary"
              >
                {block.text}
              </p>
            );
          }

          if (block.type === "bullets") {
            return <BulletList key={idx} items={block.items} />;
          }

          return (
            <div
              key={idx}
              className="rounded-2xl border border-border-light bg-surface p-4 shadow-card-sm"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <DotIcon />
                </span>
                <div className="min-w-0">
                  <p className="text-body-sm font-semibold text-dark">{block.title}</p>
                  <p className="mt-1 text-body-sm leading-relaxed text-dark-secondary">
                    {block.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BlockList({
  blocks,
}: {
  blocks: ReadonlyArray<
    { type: "p"; text: string } | { type: "bullets"; items: ReadonlyArray<string> }
  >;
}) {
  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        if (block.type === "p") {
          return (
            <p key={idx} className="max-w-3xl text-body-sm leading-relaxed text-dark-secondary">
              {block.text}
            </p>
          );
        }
        return <BulletList key={idx} items={block.items} />;
      })}
    </div>
  );
}

function BulletList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="space-y-2.5" role="list">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span
            className="mt-2 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="text-body-sm leading-relaxed text-dark-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M12 7.5h.01M12 12h.01M12 16.5h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

