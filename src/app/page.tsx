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
    <div className="landing-stack w-full">
      <section className="vercel-block">
        <div className="vercel-split">
          <div className="vercel-pane">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-neutral">Lingo.dev toolkit</span>
              <span className="badge-neutral">Next.js 16 App Router</span>
              <span className="badge-neutral">Release-ready flow</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl sm:leading-[0.98]">
              Build. Switch. Translate.
            </h1>

            <p className="mt-5 max-w-2xl text-base text-zinc-600">
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

            <dl className="vercel-stats mt-8">
              <div className="p-4">
                <dt className="coverflow-eyebrow">Locales</dt>
                <dd className="mt-1 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
                  4
                </dd>
                <p className="text-sm text-zinc-600">en, es, de, ar</p>
              </div>
              <div className="p-4">
                <dt className="coverflow-eyebrow">Mode</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950">
                  Build + Runtime
                </dd>
              </div>
              <div className="p-4">
                <dt className="coverflow-eyebrow">Outcome</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950">
                  Ship readiness
                </dd>
              </div>
            </dl>
          </div>

          <aside className="vercel-pane vercel-pane-divider">
            <p className="coverflow-eyebrow">Live flow</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950">
              End-to-end localization path
            </h2>
            <p className="mt-3 max-w-md text-base text-zinc-600">
              This is the exact click path to demo in under three minutes.
            </p>

            <div className="vercel-step-list">
              {HERO_FLOW.map((item, index) => (
                <div className="vercel-step" key={item.label}>
                  <p className="coverflow-eyebrow">Step {index + 1}</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base text-zinc-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="vercel-block">
        <div className="vercel-block-header">
          <h2 className="text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
            What you can demo
          </h2>
          <span className="coverflow-eyebrow">6 feature blocks</span>
        </div>

        <div className="vercel-feature-grid">
          {DEMO_AREAS.map((area, index) => (
            <article className="vercel-feature" key={area.title}>
              <span className="vercel-feature-glyph" aria-hidden="true">
                {area.glyph}
              </span>
              <p className="coverflow-eyebrow">Block {index + 1}</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                {area.title}
              </h3>
              <p className="mt-3 max-w-[38ch] text-base leading-7 text-zinc-600">
                {area.description}
              </p>
              <p className="mt-5 text-xs text-zinc-500">Where: {area.path}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vercel-block">
        <div className="vercel-split-tight">
          <div className="vercel-pane">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Quick start
              </h2>
              <span className="coverflow-eyebrow">about 5 minutes</span>
            </div>

            <ol className="dotted-list mt-6">
              {QUICK_START_STEPS.map((step, index) => (
                <li className="flex items-start gap-3 p-4 text-base text-zinc-700" key={step}>
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 text-sm font-medium text-zinc-700">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="vercel-pane vercel-pane-divider">
            <p className="coverflow-eyebrow">Demo talking points</p>
            <h3 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
              Why this stands out
            </h3>

            <ul className="coverflow-list mt-6">
              {JUDGE_NOTES.map((note) => (
                <li className="coverflow-list-item text-base" key={note}>
                  <span className="coverflow-list-dot" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <Link className="button-secondary mt-8" href="/dashboard">
              Run live demo now
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
