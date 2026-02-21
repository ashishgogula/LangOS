import Link from "next/link";

const PROBLEM_POINTS = [
  "Hardcoded strings",
  "Manual translation",
  "No RTL support",
  "No locale-aware formatting",
  "No translation coverage enforcement",
] as const;

const SOLUTION_ROWS = [
  {
    title: "Build-time localization",
    description:
      "Static interface text is compiled once and shipped per locale instead of patched manually.",
  },
  {
    title: "Runtime translation",
    description:
      "Dynamic text is translated at request time through the SDK-powered translation endpoint.",
  },
  {
    title: "RTL handling",
    description:
      "Direction behavior is explicit and testable, including Arabic right-to-left rendering.",
  },
  {
    title: "Locale formatting",
    description:
      "Currency, number, and date formatting update with locale-specific conventions.",
  },
  {
    title: "Workflow automation",
    description:
      "CLI and CI steps keep localization synchronized and enforce release readiness.",
  },
] as const;

const QUICK_FLOW = [
  "Spot where localization fails.",
  "Understand the architecture that fixes it.",
  "Open the live lab and validate behavior.",
] as const;

export default function LandingPage() {
  return (
    <div className="space-y-14">
      <section className="-mx-[var(--content-gutter)] border-t border-dashed border-[color:var(--line)] px-[var(--content-gutter)] pt-10">
        <div className="grid border border-dashed border-[color:var(--line)] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <div className="border-b border-dashed border-[color:var(--line)] bg-[color:color-mix(in_oklab,var(--surface)_86%,transparent)] p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--text)_58%,var(--muted))]">
              Localization Lab
            </p>

            <h1 className="mt-4 max-w-[9ch] text-[clamp(2.25rem,7vw,5.25rem)] font-[680] leading-[0.93] tracking-[-0.065em]">
              Build. Switch. Translate.
            </h1>

            <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.9vw,1.22rem)] leading-[1.62] text-[color:var(--muted)]">
              A real-world localization lab for production-grade i18n workflows.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-10 items-center rounded-full border border-[#c5ccd5] bg-[#eef2f6] px-4 text-[0.95rem] font-semibold text-[#0f141a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f8fafc]"
                href="/playground"
              >
                Open Playground
              </Link>
              <Link
                className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--line-strong)] bg-transparent px-4 text-[0.95rem] font-semibold text-[color:var(--muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in_oklab,var(--line-strong)_72%,var(--text))] hover:text-[color:var(--text)]"
                href="/developers"
              >
                For Developers
              </Link>
            </div>

            <div className="mt-8 border-t border-dashed border-[color:var(--line)] pt-4">
              <p className="text-[0.9rem] text-[color:color-mix(in_oklab,var(--text)_74%,var(--muted))]">
                Understand LangOS in under 30 seconds.
              </p>
            </div>
          </div>

          <aside className="bg-[color:color-mix(in_oklab,var(--surface)_72%,transparent)] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklab,var(--text)_58%,var(--muted))]">
              30-second flow
            </p>

            <ol className="mt-4 grid gap-3">
              {QUICK_FLOW.map((step, index) => (
                <li
                  className="group flex min-h-14 items-center gap-3 border border-dashed border-[color:var(--line)] px-4 text-[0.97rem] text-[color:color-mix(in_oklab,var(--text)_76%,var(--muted))] transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in_oklab,var(--line-strong)_76%,var(--text))]"
                  key={step}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--line-strong)] text-[0.78rem] font-semibold text-[color:color-mix(in_oklab,var(--text)_82%,var(--muted))]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="-mx-[var(--content-gutter)] border-t border-dashed border-[color:var(--line)] px-[var(--content-gutter)] pt-10">
        <div className="grid gap-8 border border-dashed border-[color:var(--line)] p-7 sm:p-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.7vw,4.1rem)] font-[650] leading-[0.97] tracking-[-0.058em]">
            Most apps get localization wrong.
          </h2>

          <ul className="m-0 grid list-disc gap-3 pl-5 text-[1.06rem] leading-[1.45] text-[color:color-mix(in_oklab,var(--text)_86%,var(--muted))]">
            {PROBLEM_POINTS.map((point) => (
              <li className="transition-transform duration-200 hover:translate-x-0.5" key={point}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="-mx-[var(--content-gutter)] border-t border-dashed border-[color:var(--line)] px-[var(--content-gutter)] pt-10">
        <div className="border border-dashed border-[color:var(--line)]">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-dashed border-[color:var(--line)] px-7 py-7 sm:px-10">
            <h2 className="max-w-[20ch] text-[clamp(1.95rem,4.2vw,3.6rem)] font-[650] leading-[1.03] tracking-[-0.054em]">
              LangOS demonstrates production-grade localization.
            </h2>
            <p className="text-sm text-[color:var(--muted)]">Five capabilities. One coherent system.</p>
          </div>

          <div>
            {SOLUTION_ROWS.map((row, index) => (
              <article
                className="grid min-h-[4.7rem] items-start gap-3 border-b border-dashed border-[color:var(--line)] px-7 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--surface)_90%,transparent)] sm:px-10 lg:grid-cols-[64px_minmax(190px,0.4fr)_1fr] lg:gap-5"
                key={row.title}
              >
                <p className="m-0 text-xs font-semibold tracking-[0.06em] text-[color:color-mix(in_oklab,var(--text)_50%,var(--muted))]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="m-0 text-[1rem] font-semibold tracking-[-0.01em]">{row.title}</h3>
                <p className="m-0 leading-[1.62] text-[color:var(--muted)]">{row.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
