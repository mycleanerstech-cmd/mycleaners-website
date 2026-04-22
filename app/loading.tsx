export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-pulse rounded-full bg-surface-alt"
          aria-hidden="true"
        />
        <div
          className="h-4 w-32 animate-pulse rounded bg-surface-alt"
          aria-hidden="true"
        />
        <p className="sr-only">Loading…</p>
      </div>
    </div>
  );
}
