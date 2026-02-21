const FAILURE_CASES = [
  {
    title: "Hardcoded strings",
    badExample: `// Bad: copy lives directly in components\n<button>Pay now</button>`,
    issue:
      "Hardcoded copy creates hidden localization debt because every string change becomes a code change.",
    fix:
      "LangOS routes static copy through build-time localization so UI strings are extracted and translated before release.",
  },
  {
    title: "Manual translation",
    badExample: `// Bad: hand-managed dictionary\nconst labels = {\n  es: { checkout: \"Pagar\" },\n  de: { checkout: \"Kasse\" },\n};`,
    issue:
      "Manual dictionaries drift from source text, get incomplete, and consume review time on every feature branch.",
    fix:
      "LangOS uses Lingo Compiler plus runtime SDK translation for dynamic strings, with automation handling refreshes.",
  },
  {
    title: "No RTL support",
    badExample: `/* Bad: layout locked to left-to-right assumptions */\n.checkout-row {\n  display: flex;\n  justify-content: flex-start;\n}`,
    issue:
      "Without explicit direction handling, Arabic and Hebrew interfaces feel broken and inaccessible.",
    fix:
      "LangOS scopes RTL behavior intentionally and demonstrates where direction should flip at the UI boundary.",
  },
  {
    title: "No locale-aware formatting",
    badExample: `// Bad: concatenated format string\nconst total = \"$\" + amount.toFixed(2);`,
    issue:
      "String concatenation ignores local conventions for separators, symbols, and date ordering.",
    fix:
      "LangOS uses Intl APIs to format currency, numbers, and dates according to the active locale.",
  },
  {
    title: "No translation coverage enforcement",
    badExample: `# Bad: CI builds app but never validates locale output\n- run: npm run build`,
    issue:
      "Teams ship untranslated surfaces when pipelines do not verify localization artifacts.",
    fix:
      "LangOS integrates CLI + CI checks so missing translations are surfaced before merge.",
  },
] as const;

export default function DevelopersPage() {
  return (
    <div className="page-stack">
      <section className="section-block section-divider">
        <p className="section-kicker">Developer Philosophy</p>
        <h1 className="section-title">Why most apps fail localization</h1>
        <p className="section-copy">
          Localization failures are rarely translation failures. They are architecture failures.
          LangOS is designed to make these failure modes explicit and preventable.
        </p>
      </section>

      {FAILURE_CASES.map((caseItem, index) => (
        <section className="section-block section-divider" key={caseItem.title}>
          <h2 className="section-title">
            {index + 1}. {caseItem.title}
          </h2>

          <div className="developers-grid">
            <div>
              <p className="section-kicker">Bad example</p>
              <pre className="code-block">
                <code>{caseItem.badExample}</code>
              </pre>
            </div>

            <div className="insight-block">
              <p className="section-kicker">Issue</p>
              <p className="section-copy">{caseItem.issue}</p>
            </div>

            <div className="insight-block">
              <p className="section-kicker">How LangOS solves it</p>
              <p className="section-copy">{caseItem.fix}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
