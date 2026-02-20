import Link from "next/link";

const DEMO_AREAS = [
  {
    description:
      "Compiler plugin + LingoProvider make static UI text localizable without key-heavy boilerplate.",
    path: "next.config.ts + src/app/layout.tsx",
    title: "Build-time localization",
  },
  {
    description:
      "Language selection updates locale immediately and persists user preference across reloads.",
    path: "src/components/LanguageSwitcher.tsx",
    title: "Runtime locale switching",
  },
  {
    description:
      "Dynamic user text is translated through a server route powered by Lingo SDK.",
    path: "src/app/api/translate/route.ts",
    title: "Runtime text translation",
  },
  {
    description:
      "Arabic mode flips document direction for realistic RTL verification.",
    path: "src/components/RtlProvider.tsx",
    title: "RTL support",
  },
  {
    description:
      "Release checks validate locale coverage, runtime API readiness, and smoke tests.",
    path: "src/app/api/release-readiness/route.ts",
    title: "Ship checklist",
  },
  {
    description:
      "Intl samples prove prices and dates are correctly formatted for each locale.",
    path: "src/app/dashboard/page.tsx",
    title: "Locale formatting",
  },
] as const;

const QUICK_START_STEPS = [
  "Set LINGODOTDEV_API_KEY in .env.local.",
  "Run npm run dev and open this page.",
  "Open Dashboard and test en/es/de/ar locale switching.",
  "Run dynamic translation and verify history entries.",
  "Confirm all blocking release checks pass.",
] as const;

export default function LandingPage() {
  return (
    <div className="section-stack mx-auto max-w-6xl">
      <section className="surface-card p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-neutral">Lingo.dev toolkit</span>
          <span className="badge-neutral">Next.js 16 App Router</span>
          <span className="badge-neutral">Release-focused demo</span>
        </div>

        <h1 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          Localization workflow that a junior engineer can run in one day.
        </h1>

        <p className="mt-4 max-w-3xl text-sm text-zinc-600 sm:text-base">
          LangOS explains the full flow: setup, runtime translation, RTL validation,
          formatting checks, and ship gating. Start on Home, then run the live flow in
          Dashboard.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="button-primary" href="/dashboard">
            Open Dashboard
          </Link>
          <Link className="button-secondary" href="/guide">
            Open Step-by-Step Guide
          </Link>
        </div>

        <dl className="dotted-grid-3 mt-8">
          <div className="p-4">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Locales</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">en, es, de, ar</dd>
          </div>
          <div className="p-4">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Mode</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">Build + Runtime</dd>
          </div>
          <div className="p-4">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Outcome</dt>
            <dd className="mt-1 text-xl font-semibold text-zinc-900">Ship readiness</dd>
          </div>
        </dl>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">What you can demo</h2>
          <span className="text-xs text-zinc-500">6 feature blocks</span>
        </div>

        <div className="dotted-list mt-5">
          {DEMO_AREAS.map((area, index) => (
            <article className="p-4" key={area.title}>
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Block {index + 1}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-zinc-900">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{area.description}</p>
              <p className="mt-3 text-xs text-zinc-500">Where: {area.path}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Quick start</h2>
          <span className="text-xs text-zinc-500">about 5 minutes</span>
        </div>

        <ol className="dotted-list mt-4">
          {QUICK_START_STEPS.map((step, index) => (
            <li className="flex items-start gap-3 p-3 text-sm text-zinc-700" key={step}>
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-zinc-300 text-xs text-zinc-600">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
