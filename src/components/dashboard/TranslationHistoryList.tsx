import type { TranslationHistoryEntry } from "@/lib/translation-history";

export default function TranslationHistoryList({
  items,
}: {
  items: TranslationHistoryEntry[];
}) {
  return (
    <section className="surface-card space-y-4 p-6 sm:p-8">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900">Recent translation runs</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Local run history stored on this device.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600">
          No translation runs yet.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <article className="rounded-lg border border-zinc-200 p-3" key={item.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-zinc-500">
                  {new Date(item.createdAt).toLocaleString()} • {item.locale.toUpperCase()}
                </p>
                <span className={item.status === "success" ? "badge-success" : "badge-error"}>
                  {item.status === "success" ? "Success" : "Error"}
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-700">
                <span className="font-medium text-zinc-900">Input:</span> {item.input}
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                <span className="font-medium text-zinc-900">Output:</span> {item.output}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
