import Link from "next/link";

const FEATURES = [
  {
    title: "Lingo Compiler (Next.js)",
    description:
      "withLingo() is configured in next.config.ts to compile source strings and generate locale output for en, es, de, and ar.",
    iconPath:
      "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
  },
  {
    title: "Lingo React Provider + Context",
    description:
      "LingoProvider and useLingoContext handle runtime locale state, language switching, and localized rendering in app/layout and playground scopes.",
    iconPath: "M4 6h16M4 12h16m-7 6h7",
  },
  {
    title: "Lingo.dev SDK Engine",
    description:
      "The /api/translate route uses LingoDotDevEngine.localizeText() with timeout, locale validation, and in-memory response caching.",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Lingo CLI",
    description:
      "The project script lingo:run executes npx lingo.dev run to refresh localization artifacts from source changes.",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Lingo in CI Pipeline",
    description:
      "GitHub Actions runs npm run lingo:run when LINGO_API_KEY is present and i18n buckets are available, enforcing localization checks in CI.",
    iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Lingo Locale Persistence",
    description:
      "Locale persistence is configured through Lingo Compiler to use a cookie (name: locale, maxAge: 31536000) for consistent user language selection.",
    iconPath:
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
] as const;

const TECHNOLOGIES = ["Next.js 16", "React 19", "Tailwind CSS v4", "Lingo.dev"] as const;

export default function LandingPage() {
  return (
    <div className="page-stack landing-page">
      <section className="section-divider relative overflow-hidden py-22 sm:py-30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_45%),radial-gradient(circle_at_80%_18%,color-mix(in_oklab,var(--line)_60%,transparent),transparent_48%)]"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <div className="inline-flex items-center rounded-full border border-[var(--line-strong)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] px-3 py-1 text-sm text-[var(--muted)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--line)_45%,transparent)]">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-[var(--accent-strong)]" />
              Powered by Lingo.dev
            </div>

            <h1 className="text-balance text-5xl font-bold tracking-tight text-[var(--text)] sm:text-7xl">
              Build global apps <br />
              <span className="text-[var(--accent-strong)]">without the headache.</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
              LangOS is a next-generation localization playground. Experience automated translations,
              seamless RTL support, and locale-aware formatting—all built with Next.js 16 and
              Lingo.dev.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link className="primary-link rounded-full shadow-[0_10px_24px_color-mix(in_oklab,var(--accent)_17%,transparent)]" href="/playground">
                Open Playground
              </Link>
              <Link className="secondary-link rounded-full" href="/developers">
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider py-18 sm:py-22">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              What this project implements
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Services used from Lingo.dev in this project.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[color:color-mix(in_oklab,var(--surface)_90%,transparent)] p-7 transition duration-200 hover:-translate-y-0.5 hover:border-[color:color-mix(in_oklab,var(--line-strong)_65%,var(--accent))]"
                key={feature.title}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      d={feature.iconPath}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-[var(--text)]">{feature.title}</h3>
                <p className="leading-relaxed text-[var(--muted)]">{feature.description}</p>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-0 h-18 w-18 rounded-bl-3xl bg-[color:color-mix(in_oklab,var(--accent)_8%,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-2xl font-semibold text-[var(--text)]">
            Built with modern technologies
          </h2>

          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {TECHNOLOGIES.map((technology) => (
              <span
                className="rounded-full border border-[var(--line)] bg-[color:color-mix(in_oklab,var(--surface)_85%,transparent)] px-4 py-2 text-sm font-semibold text-[color:color-mix(in_oklab,var(--text)_90%,var(--muted))] transition-colors duration-200 hover:border-[var(--line-strong)]"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
