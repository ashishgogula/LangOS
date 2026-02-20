import type { TranslationHistoryEntry } from "@/lib/translation-history";

export default function TranslationHistoryList({
  items,
}: {
  items: TranslationHistoryEntry[];
}) {
  return (
    <section className="surface-card space-y-4 p-6 sm:p-8">
      <div>
        <h2 className="text-lg font-medium text-slate-900">Recent Translation Runs</h2>
        <p className="mt-1 text-sm text-slate-600">
          Local run history stored on this device.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          No translation runs yet.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <article
              className="rounded-md border border-slate-200 p-3"
              key={item.id}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate-500">
                  {new Date(item.createdAt).toLocaleString()} • {item.locale.toUpperCase()}
                </p>
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs font-medium ${
                    item.status === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {item.status === "success" ? "Success" : "Error"}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-700">
                <span className="font-medium text-slate-900">Input:</span> {item.input}
              </p>
              <p className="mt-1 text-sm text-slate-700">
                <span className="font-medium text-slate-900">Output:</span> {item.output}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
