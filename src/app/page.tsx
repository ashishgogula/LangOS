import Link from "next/link";
import { LingoProvider } from "@lingo.dev/compiler/react/next";
import { DEFAULT_LOCALE } from "@/lib/locales";
import enCache from "@/lingo/cache/en.json";

type LocaleCacheFile = {
  entries: Record<string, string>;
};

const SOURCE_TRANSLATIONS = (enCache as LocaleCacheFile).entries;

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

export default function LandingPage() {
  return (
    <LingoProvider
      initialLocale={DEFAULT_LOCALE}
      initialTranslations={SOURCE_TRANSLATIONS}
      devWidget={{ enabled: false }}
    >
      <div className="page-stack landing-page">
        <section className="section-divider relative overflow-hidden pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_44%),radial-gradient(circle_at_80%_18%,color-mix(in_oklab,var(--line)_45%,transparent),transparent_50%)]"
          />

          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl space-y-10 text-center">
              <div className="inline-flex w-max items-center whitespace-nowrap rounded-full border border-[var(--line-strong)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] px-3 py-1 text-sm text-[var(--muted)] shadow-[0_0_0_1px_color-mix(in_oklab,var(--line)_45%,transparent)]">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[var(--accent-strong)]" />
                Powered by Lingo.dev
              </div>

              <h1 className="mx-auto inline-flex max-w-5xl flex-col items-center gap-3 text-center text-5xl font-bold tracking-[-0.045em] text-[var(--text)] sm:gap-4 sm:text-7xl">
                <span className="block leading-[0.95]">Build global apps</span>
                <span className="block leading-[0.95] text-[var(--accent-strong)]">
                  without the headache.
                </span>
              </h1>

              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--muted)] sm:text-[1.38rem] sm:leading-relaxed">
               LangOS demonstrates production-grade localization across build-time, runtime, RTL, formatting, and CI using Next.js 16 and Lingo.dev.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  className="primary-link rounded-full shadow-[0_10px_24px_color-mix(in_oklab,var(--accent)_17%,transparent)]"
                  href="/playground"
                >
                  Open Playground
                </Link>
                <Link className="secondary-link rounded-full" href="/developers">
                  Developers
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-divider pt-20">
          <div className="mx-auto max-w-6xl">
            <div className="services-matrix-head">
              <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
                Lingo.dev Across the Stack
              </h2>
              <p className="section-kicker pt-4">Build-time, runtime, and CI-level integration.</p>
            </div>

            <div className="services-matrix" role="list" aria-label="Lingo.dev services">
              {FEATURES.map((feature) => (
                <article className="services-cell" key={feature.title} role="listitem">
                  <div className="services-cell-head">
                    <div className="services-cell-icon">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          d={feature.iconPath}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <h3>{feature.title}</h3>
                   
                  </div>
                  <p className="services-cell-body">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </LingoProvider>
  );
}
