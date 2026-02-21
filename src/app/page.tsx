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

export default function LandingPage() {
  return (
    <div className="page-stack">
      <section className="hero-section">
        <p className="section-kicker">LangOS</p>
        <h1 className="hero-title">Build. Switch. Translate.</h1>
        <p className="hero-subtext">
          A real-world localization lab powered by Lingo.dev.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" href="/playground">
            Open Playground
          </Link>
          <Link className="secondary-link" href="/developers">
            For Developers
          </Link>
        </div>
      </section>

      <section className="section-block section-divider">
        <h2 className="section-title">Most apps get localization wrong.</h2>
        <ul className="problem-list">
          {PROBLEM_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="section-block section-divider">
        <h2 className="section-title">
          LangOS demonstrates production-grade localization.
        </h2>
        <div className="solution-grid">
          {SOLUTION_ROWS.map((row) => (
            <div className="solution-row" key={row.title}>
              <h3>{row.title}</h3>
              <p>{row.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
