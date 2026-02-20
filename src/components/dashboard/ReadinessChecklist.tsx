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
          <h2 className="text-lg font-semibold text-zinc-900">Release readiness</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Final checks before shipping your multilingual build.
          </p>
        </div>

        <StatusTag tone={readyToShip ? "ready" : "warning"}>
          {readyToShip ? "Ready to ship" : "Action required"}
        </StatusTag>
      </div>

      <div className="dotted-list">
        {checks.map((check) => (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3" key={check.id}>
            <div>
              <p className="text-sm font-medium text-zinc-900">{check.label}</p>
              <p className="text-xs text-zinc-600">{check.description}</p>
            </div>

            <StatusTag tone={check.passed ? "ready" : check.blocking ? "warning" : "neutral"}>
              {check.passed ? "Pass" : check.blocking ? "Fail" : "Needs review"}
            </StatusTag>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-500">
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
      ? "badge-success"
      : tone === "warning"
        ? "badge-warning"
        : "badge-neutral";

  return <span className={toneClass}>{children}</span>;
}
