import type { ReactNode } from "react";

export type ReleaseCheck = {
  blocking: boolean;
  description: string;
  id: string;
  label: string;
  passed: boolean;
};

export default function ReadinessChecklist({
  checkedAt,
  checks,
}: {
  checkedAt: string | null;
  checks: ReleaseCheck[];
}) {
  const blockingFailures = checks.filter((check) => check.blocking && !check.passed).length;
  const readyToShip = blockingFailures === 0;

  return (
    <section className="surface-card space-y-4 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-slate-900">Release Readiness</h2>
          <p className="mt-1 text-sm text-slate-600">
            Final checklist before shipping your multilingual release.
          </p>
        </div>

        <StatusTag tone={readyToShip ? "ready" : "warning"}>
          {readyToShip ? "Ready to ship" : "Action required"}
        </StatusTag>
      </div>

      <div className="space-y-2">
        {checks.map((check) => (
          <div
            className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-slate-200 p-3"
            key={check.id}
          >
            <div>
              <p className="text-sm font-medium text-slate-900">{check.label}</p>
              <p className="text-xs text-slate-600">{check.description}</p>
            </div>

            <StatusTag tone={check.passed ? "ready" : check.blocking ? "warning" : "neutral"}>
              {check.passed ? "Pass" : check.blocking ? "Fail" : "Needs review"}
            </StatusTag>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Last checked: {checkedAt ? new Date(checkedAt).toLocaleString() : "Not checked yet"}
      </p>
    </section>
  );
}

function StatusTag({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "neutral" | "ready" | "warning";
}) {
  const toneClass =
    tone === "ready"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span className={`rounded-md border px-2 py-1 text-xs font-medium ${toneClass}`}>
      {children}
    </span>
  );
}
