"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { LingoProvider } from "@lingo.dev/compiler/react";
import { translateText } from "@/lib/lingo";
import {
  DEFAULT_LOCALE,
  LOCALE_OPTIONS,
  getCurrencyForLocale,
  isRtlLocale,
  type AppLocale,
} from "@/lib/locales";

const BUILD_TIME_SNIPPET = `// Build-time localized component
export function Header({ name }: { name: string }) {
  return <h3>Welcome back, {name}.</h3>;
}`;

const RUNTIME_SNIPPET = `const translated = await translateText(
  sourceText,
  targetLocale,
  "en",
);`;

const RTL_SNIPPET = `const targetDirection = locale === "ar" ? "rtl" : "ltr";
<div dir={targetDirection}>{content}</div>`;

const FORMATTING_SNIPPET = `new Intl.NumberFormat(locale, {
  style: "currency",
  currency: getCurrencyForLocale(locale),
}).format(amount);`;

const WORKFLOW_SNIPPET = `# .github/workflows/localization.yml
- run: npx lingo.dev run
- run: npm run build`;

export default function PlaygroundPage() {
  const [selectedLocale, setSelectedLocale] = useState<AppLocale>("es");
  const [buildName, setBuildName] = useState("Ashish");

  const [runtimeInput, setRuntimeInput] = useState(
    "Ship this release after QA sign-off.",
  );
  const [runtimeOutput, setRuntimeOutput] = useState("");
  const [runtimeError, setRuntimeError] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const [amountInput, setAmountInput] = useState("1250000.5");
  const [dateInput, setDateInput] = useState("2025-01-15");
  const [workflowCoverage, setWorkflowCoverage] = useState(96);

  useEffect(() => {
    setRuntimeOutput("");
    setRuntimeError("");
  }, [selectedLocale]);

  const localeLabel =
    LOCALE_OPTIONS.find((localeOption) => localeOption.code === selectedLocale)
      ?.label ?? selectedLocale.toUpperCase();

  const amount = Number.isFinite(Number(amountInput)) ? Number(amountInput) : 0;
  const demoDate = useMemo(() => {
    const parsed = new Date(`${dateInput}T12:00:00Z`);
    return Number.isNaN(parsed.getTime())
      ? new Date("2025-01-15T12:00:00Z")
      : parsed;
  }, [dateInput]);

  const sourceCurrency = useMemo(() => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: "currency",
      currency: getCurrencyForLocale(DEFAULT_LOCALE),
      maximumFractionDigits: 2,
    }).format(amount);
  }, [amount]);

  const targetCurrency = useMemo(() => {
    return new Intl.NumberFormat(selectedLocale, {
      style: "currency",
      currency: getCurrencyForLocale(selectedLocale),
      maximumFractionDigits: 2,
    }).format(amount);
  }, [amount, selectedLocale]);

  const sourceNumber = useMemo(() => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      maximumFractionDigits: 2,
    }).format(amount);
  }, [amount]);

  const targetNumber = useMemo(() => {
    return new Intl.NumberFormat(selectedLocale, {
      maximumFractionDigits: 2,
    }).format(amount);
  }, [amount, selectedLocale]);

  const sourceDate = useMemo(() => {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(demoDate);
  }, [demoDate]);

  const targetDate = useMemo(() => {
    return new Intl.DateTimeFormat(selectedLocale, {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(demoDate);
  }, [demoDate, selectedLocale]);

  const rtlEnabled = isRtlLocale(selectedLocale);
  const ciPasses = workflowCoverage >= 100;

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(event.target.value as AppLocale);
  };

  const handleRuntimeTranslate = async () => {
    const text = runtimeInput.trim();
    if (!text) {
      setRuntimeOutput("");
      setRuntimeError("Source text is required.");
      return;
    }

    setRuntimeError("");
    setIsTranslating(true);

    try {
      const translated = await translateText(text, selectedLocale, DEFAULT_LOCALE);
      setRuntimeOutput(translated);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to translate right now.";
      setRuntimeOutput("");
      setRuntimeError(message);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="section-block section-divider">
        <p className="section-kicker">Localization Lab</p>
        <h1 className="section-title">Structured Localization Playground</h1>
        <p className="section-copy">
          Left column stays English as the source of truth. Right column renders
          the selected locale for side-by-side comparison.
        </p>

        <div className="lab-columns-head" role="group" aria-label="Localization columns">
          <div>
            <p className="column-caption">English (source)</p>
          </div>

          <div className="target-column-head">
            <p className="column-caption">Selected locale (target)</p>
            <label className="locale-label" htmlFor="target-locale">
              Locale
            </label>
            <select
              id="target-locale"
              className="select-field"
              onChange={handleLocaleChange}
              value={selectedLocale}
            >
              {LOCALE_OPTIONS.map((localeOption) => (
                <option key={localeOption.code} value={localeOption.code}>
                  {localeOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="lab-section" aria-labelledby="build-time-heading">
        <header className="section-head">
          <h2 id="build-time-heading" className="section-title">
            1. Build-Time Localization (Lingo Compiler)
          </h2>
          <p className="section-copy">
            Static UI strings are extracted at build time and served in the target locale.
          </p>
        </header>

        <div className="lab-demo-grid">
          <SourceLocaleScope>
            <div className="demo-pane">
              <label className="field-label" htmlFor="build-name">
                Name token
              </label>
              <input
                id="build-name"
                className="input-field"
                onChange={(event) => setBuildName(event.target.value)}
                value={buildName}
              />
              <BuildTimeDemo name={buildName} />
            </div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="build-time">
            <div className="demo-pane">
              <p className="demo-note">Target locale: {localeLabel}</p>
              <BuildTimeDemo name={buildName} />
            </div>
          </TargetLocaleScope>
        </div>

        <pre className="code-block">
          <code>{BUILD_TIME_SNIPPET}</code>
        </pre>

        <p className="how-it-works">
          <strong>How it works:</strong> Lingo Compiler rewrites static copy to keyed lookups,
          and the target provider resolves those keys for the selected locale.
        </p>
      </section>

      <section className="lab-section" aria-labelledby="runtime-heading">
        <header className="section-head">
          <h2 id="runtime-heading" className="section-title">
            2. Runtime Translation (Lingo SDK / MCP)
          </h2>
          <p className="section-copy">
            Dynamic text is translated on demand through the SDK-backed API route.
          </p>
        </header>

        <div className="lab-demo-grid">
          <SourceLocaleScope>
            <div className="demo-pane">
              <label className="field-label" htmlFor="runtime-input">
                Dynamic source text
              </label>
              <textarea
                id="runtime-input"
                className="textarea-field"
                onChange={(event) => setRuntimeInput(event.target.value)}
                placeholder="Type text that did not exist at build time"
                value={runtimeInput}
              />
              <p className="demo-note">Source locale is fixed to English.</p>
            </div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="runtime">
            <div className="demo-pane">
              <button
                className="action-button"
                disabled={isTranslating}
                onClick={handleRuntimeTranslate}
                type="button"
              >
                {isTranslating ? "Translating..." : "Translate via SDK"}
              </button>

              <p className="demo-note">Target locale: {localeLabel}</p>

              {runtimeError ? <p className="error-text">{runtimeError}</p> : null}

              <p className="runtime-output">
                {runtimeOutput || "Translation output appears here after request."}
              </p>
            </div>
          </TargetLocaleScope>
        </div>

        <pre className="code-block">
          <code>{RUNTIME_SNIPPET}</code>
        </pre>

        <p className="how-it-works">
          <strong>How it works:</strong> The client posts source text to <code>/api/translate</code>,
          which calls Lingo SDK and returns locale-specific output.
        </p>
      </section>

      <section className="lab-section" aria-labelledby="rtl-heading">
        <header className="section-head">
          <h2 id="rtl-heading" className="section-title">
            3. RTL Behavior (target column only)
          </h2>
          <p className="section-copy">
            Arabic applies right-to-left direction only inside the target preview.
          </p>
        </header>

        <div className="lab-demo-grid">
          <SourceLocaleScope>
            <div className="demo-pane" dir="ltr">
              <p className="demo-note">Direction: ltr</p>
              <RtlMessage />
            </div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="rtl">
            <div className="demo-pane" dir={rtlEnabled ? "rtl" : "ltr"}>
              <p className="demo-note">
                Direction: {rtlEnabled ? "rtl" : "ltr"} ({selectedLocale.toUpperCase()})
              </p>
              <RtlMessage />
            </div>
          </TargetLocaleScope>
        </div>

        <pre className="code-block">
          <code>{RTL_SNIPPET}</code>
        </pre>

        <p className="how-it-works">
          <strong>How it works:</strong> Direction is derived from the selected target locale,
          and applied to the right demo container only so the source column stays stable.
        </p>
      </section>

      <section className="lab-section" aria-labelledby="formatting-heading">
        <header className="section-head">
          <h2 id="formatting-heading" className="section-title">
            4. Locale Formatting (currency, date, number)
          </h2>
          <p className="section-copy">
            Formatting updates through <code>Intl</code> based on locale conventions.
          </p>
        </header>

        <div className="lab-demo-grid">
          <SourceLocaleScope>
            <div className="demo-pane">
              <label className="field-label" htmlFor="amount-input">
                Amount
              </label>
              <input
                id="amount-input"
                className="input-field"
                onChange={(event) => setAmountInput(event.target.value)}
                value={amountInput}
              />

              <label className="field-label" htmlFor="date-input">
                Date (UTC)
              </label>
              <input
                id="date-input"
                className="input-field"
                onChange={(event) => setDateInput(event.target.value)}
                type="date"
                value={dateInput}
              />

              <FormattingPreview
                currency={sourceCurrency}
                date={sourceDate}
                locale={DEFAULT_LOCALE.toUpperCase()}
                number={sourceNumber}
              />
            </div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="formatting">
            <div className="demo-pane">
              <FormattingPreview
                currency={targetCurrency}
                date={targetDate}
                locale={selectedLocale.toUpperCase()}
                number={targetNumber}
              />
            </div>
          </TargetLocaleScope>
        </div>

        <pre className="code-block">
          <code>{FORMATTING_SNIPPET}</code>
        </pre>

        <p className="how-it-works">
          <strong>How it works:</strong> Locale-specific formatters apply proper grouping,
          symbols, and date ordering with no string templates.
        </p>
      </section>

      <section className="lab-section" aria-labelledby="workflow-heading">
        <header className="section-head">
          <h2 id="workflow-heading" className="section-title">
            5. Workflow Automation (CLI + CI snippet)
          </h2>
          <p className="section-copy">
            Localization checks run in development and are enforced in CI before shipping.
          </p>
        </header>

        <div className="lab-demo-grid">
          <SourceLocaleScope>
            <div className="demo-pane">
              <p className="demo-note">Developer loop</p>
              <pre className="inline-code">
                <code>npx lingo.dev run</code>
              </pre>
              <p className="demo-note">Source locale baseline coverage: 100%</p>
            </div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="workflow">
            <div className="demo-pane">
              <label className="field-label" htmlFor="coverage-slider">
                Simulated translation coverage: {workflowCoverage}%
              </label>
              <input
                id="coverage-slider"
                className="slider-field"
                max={100}
                min={70}
                onChange={(event) => setWorkflowCoverage(Number(event.target.value))}
                type="range"
                value={workflowCoverage}
              />
              <p className={`coverage-state ${ciPasses ? "pass" : "fail"}`}>
                {ciPasses
                  ? "CI status: pass (coverage requirement met)."
                  : "CI status: fail (coverage below required threshold)."}
              </p>
            </div>
          </TargetLocaleScope>
        </div>

        <pre className="code-block">
          <code>{WORKFLOW_SNIPPET}</code>
        </pre>

        <p className="how-it-works">
          <strong>How it works:</strong> CLI refreshes translation artifacts locally, and CI
          blocks merges when localized output is missing.
        </p>
      </section>
    </div>
  );
}

function SourceLocaleScope({ children }: { children: ReactNode }) {
  return <LingoProvider initialLocale={DEFAULT_LOCALE}>{children}</LingoProvider>;
}

function TargetLocaleScope({
  locale,
  scopeKey,
  children,
}: {
  locale: AppLocale;
  scopeKey: string;
  children: ReactNode;
}) {
  return (
    <LingoProvider initialLocale={locale} key={`${scopeKey}-${locale}`}>
      {children}
    </LingoProvider>
  );
}

function BuildTimeDemo({ name }: { name: string }) {
  const trimmedName = name.trim() || "Builder";

  return (
    <div className="demo-stack">
      <p className="demo-eyebrow">Release dashboard</p>
      <h3 className="demo-title">Welcome back, {trimmedName}.</h3>
      <p className="demo-copy">Localization checks passed for this branch.</p>
      <div className="demo-actions">
        <button className="mini-button" type="button">
          Publish release
        </button>
        <button className="mini-button ghost" type="button">
          View locales
        </button>
      </div>
    </div>
  );
}

function RtlMessage() {
  return (
    <div className="rtl-message">
      <p className="demo-copy">The target panel can flip direction without moving source text.</p>
      <div className="rtl-row">
        <span className="rtl-chip">Checkout</span>
        <span className="rtl-chip">Address</span>
        <span className="rtl-chip">Payment</span>
      </div>
    </div>
  );
}

function FormattingPreview({
  locale,
  currency,
  number,
  date,
}: {
  locale: string;
  currency: string;
  number: string;
  date: string;
}) {
  return (
    <dl className="format-grid">
      <div>
        <dt className="demo-note">Locale</dt>
        <dd>{locale}</dd>
      </div>
      <div>
        <dt className="demo-note">Currency</dt>
        <dd>{currency}</dd>
      </div>
      <div>
        <dt className="demo-note">Number</dt>
        <dd>{number}</dd>
      </div>
      <div>
        <dt className="demo-note">Date</dt>
        <dd>{date}</dd>
      </div>
    </dl>
  );
}
