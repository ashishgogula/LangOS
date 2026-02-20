import Link from "next/link";

const DEMO_AREAS = [
  {
    glyph: "CI",
    description:
      "Compiler plugin + LingoProvider make static UI text localizable without key-heavy boilerplate.",
    path: "next.config.ts + src/app/layout.tsx",
    title: "Build-time localization",
  },
  {
    glyph: "RT",
    description:
      "Language selection updates locale immediately and persists user preference across reloads.",
    path: "src/components/LanguageSwitcher.tsx",
    title: "Runtime locale switching",
  },
  {
    glyph: "API",
    description:
      "Dynamic user text is translated through a server route powered by Lingo SDK.",
    path: "src/app/api/translate/route.ts",
    title: "Runtime text translation",
  },
  {
    glyph: "RTL",
    description:
      "Arabic mode flips document direction for realistic RTL verification.",
    path: "src/components/RtlProvider.tsx",
    title: "RTL support",
  },
  {
    glyph: "QA",
    description:
      "Release checks validate locale coverage, runtime API readiness, and smoke tests.",
    path: "src/app/api/release-readiness/route.ts",
    title: "Ship checklist",
  },
  {
    glyph: "INTL",
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

const HERO_FLOW = [
  {
    detail: "Lingo Compiler handles static UI localization during build.",
    label: "Build-time localization",
  },
  {
    detail: "Language switcher persists locale and updates content instantly.",
    label: "Runtime locale switching",
  },
  {
    detail: "Dashboard API route translates dynamic text in real time.",
    label: "Runtime translation API",
  },
] as const;

const JUDGE_NOTES = [
  "Shows static + dynamic localization, not only one side.",
  "Includes release gating checks for production confidence.",
  "Demonstrates RTL layout behavior with Arabic locale.",
  "Uses locale-aware Intl formatting for numbers and dates.",
] as const;

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-4 sm:space-y-10">
      <section className="coverflow-frame">
        <div className="coverflow-grid px-4 sm:px-6">
          <article className="coverflow-panel">
            <div className="coverflow-panel-inner">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-neutral">Lingo.dev toolkit</span>
                <span className="badge-neutral">Next.js 16 App Router</span>
                <span className="badge-neutral">Release-ready flow</span>
              </div>

              <h1 className="coverflow-headline text-zinc-950">Build. Switch. Translate.</h1>

              <p className="coverflow-copy">
                LangOS is a guided localization demo with real runtime translation,
                locale switching, and release checks. No guesswork for judges or junior
                engineers.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="button-primary" href="/dashboard">
                  Open Dashboard
                </Link>
                <Link className="button-secondary" href="/guide">
                  Open Step-by-Step Guide
                </Link>
              </div>

              <dl className="coverflow-stats">
                <div className="p-4">
                  <dt className="coverflow-eyebrow">Locales</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                    en, es, de, ar
                  </dd>
                </div>
                <div className="p-4">
                  <dt className="coverflow-eyebrow">Mode</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                    Build + Runtime
                  </dd>
                </div>
                <div className="p-4">
                  <dt className="coverflow-eyebrow">Outcome</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                    Ship readiness
                  </dd>
                </div>
              </dl>
            </div>
          </article>

          <aside className="coverflow-panel">
            <div className="coverflow-panel-inner">
              <p className="coverflow-eyebrow">Live flow</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                End-to-end localization path
              </h2>
              <p className="coverflow-copy">
                This is the exact click path to demo in under three minutes.
              </p>

              <div className="coverflow-step-list">
                {HERO_FLOW.map((item, index) => (
                  <div className="coverflow-step" key={item.label}>
                    <p className="coverflow-eyebrow">Step {index + 1}</p>
                    <p className="mt-1 text-base font-semibold text-zinc-900">{item.label}</p>
                    <p className="mt-2 text-sm text-zinc-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="coverflow-frame">
        <div className="px-4 sm:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">What you can demo</h2>
            <span className="coverflow-eyebrow">6 feature blocks</span>
          </div>

          <div className="coverflow-feature-grid">
            {DEMO_AREAS.map((area, index) => (
              <article className="coverflow-feature" key={area.title}>
                <span className="coverflow-feature-glyph" aria-hidden="true">
                  {area.glyph}
                </span>
                <p className="coverflow-eyebrow">Block {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900">
                  {area.title}
                </h3>
                <p className="mt-2 max-w-[42ch] text-sm leading-6 text-zinc-600">
                  {area.description}
                </p>
                <p className="mt-4 text-xs text-zinc-500">Where: {area.path}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="coverflow-frame">
        <div className="coverflow-grid-tight px-4 sm:px-6">
          <article className="coverflow-panel">
            <div className="coverflow-panel-inner">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">Quick start</h2>
                <span className="coverflow-eyebrow">about 5 minutes</span>
              </div>

              <ol className="dotted-list mt-5 rounded-xl">
                {QUICK_START_STEPS.map((step, index) => (
                  <li className="flex items-start gap-3 p-3 text-sm text-zinc-700" key={step}>
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-300 text-xs font-medium text-zinc-700">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>

          <aside className="coverflow-panel">
            <div className="coverflow-panel-inner">
              <p className="coverflow-eyebrow">Demo talking points</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Why this stands out
              </h3>

              <ul className="coverflow-list">
                {JUDGE_NOTES.map((note) => (
                  <li className="coverflow-list-item" key={note}>
                    <span className="coverflow-list-dot" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <Link className="button-secondary mt-6" href="/dashboard">
                Run live demo now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
