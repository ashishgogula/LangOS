import Link from "next/link";

const TOOLING = [
  {
    details: "Transforms static UI strings and injects locale-aware runtime hooks.",
    label: "Lingo Compiler",
    usedAt: "next.config.ts",
  },
  {
    details: "Provides locale context and refresh behavior for server components.",
    label: "LingoProvider",
    usedAt: "src/app/layout.tsx",
  },
  {
    details: "Reads and persists locale using localStorage with cookie fallback.",
    label: "Locale Resolver",
    usedAt: "src/lingo/locale-resolver.client.ts",
  },
  {
    details: "Translates dynamic text in the API route at runtime.",
    label: "Lingo SDK",
    usedAt: "src/app/api/translate/route.ts",
  },
] as const;

const WALKTHROUGH = [
  "Switch locale in the header and confirm content direction updates.",
  "Open Dashboard and run a translation request.",
  "Check translation history and verify one successful run.",
  "Switch to Arabic and verify RTL layout.",
  "Confirm blocking release checks are green before shipping.",
] as const;

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Onboarding Guide</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              Run the full localization demo without guesswork
            </h1>
            <p className="mt-3 text-sm text-zinc-600">
              This page is your hand-off doc for junior engineers and hackathon judges.
            </p>
          </div>

          <Link className="button-primary" href="/dashboard">
            Start in Dashboard
          </Link>
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-900">Tools used in this project</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {TOOLING.map((item) => (
            <article className="dotted-box p-4" key={item.label}>
              <h3 className="text-sm font-semibold text-zinc-900">{item.label}</h3>
              <p className="mt-2 text-sm text-zinc-600">{item.details}</p>
              <p className="mt-3 text-xs text-zinc-500">File: {item.usedAt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-900">Walkthrough steps</h2>
        <ol className="mt-4 space-y-2">
          {WALKTHROUGH.map((step, index) => (
            <li className="dotted-box flex items-start gap-3 p-3 text-sm text-zinc-700" key={step}>
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xs text-zinc-600">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-900">Environment</h2>
        <p className="mt-2 text-sm text-zinc-600">Add this to <span className="code-inline">.env.local</span>:</p>
        <pre className="dotted-box mt-3 overflow-x-auto p-3 text-xs text-zinc-700">
{`LINGODOTDEV_API_KEY=your_key_here`}
        </pre>
      </section>
    </div>
  );
}
