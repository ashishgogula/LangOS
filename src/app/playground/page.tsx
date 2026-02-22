"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LingoProvider } from "@lingo.dev/compiler/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { translateText } from "@/lib/lingo";
import {
  DEFAULT_LOCALE,
  LOCALE_OPTIONS,
  getCurrencyForLocale,
  isRtlLocale,
  type AppLocale,
} from "@/lib/locales";
import arCache from "@/lingo/cache/ar.json";
import deCache from "@/lingo/cache/de.json";
import enCache from "@/lingo/cache/en.json";
import esCache from "@/lingo/cache/es.json";

type LocaleCacheFile = {
  entries: Record<string, string>;
};

const LOCALE_TRANSLATIONS: Record<AppLocale, Record<string, string>> = {
  en: (enCache as LocaleCacheFile).entries,
  es: (esCache as LocaleCacheFile).entries,
  de: (deCache as LocaleCacheFile).entries,
  ar: (arCache as LocaleCacheFile).entries,
};

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

const LAYOUT_TRANSITION = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.72,
} as const;

const TEXT_SWAP_VARIANTS = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
} as const;

const TEXT_SWAP_TRANSITION = {
  duration: 0.2,
  ease: "easeInOut",
} as const;

const PAGE_FADE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
} as const;

const SECTION_REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 28,
      mass: 0.8,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
} as const;

const SECTION_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 26,
      mass: 0.75,
    },
  },
} as const;

const SECTION_VIEWPORT = { once: true, amount: 0.18 } as const;

export default function PlaygroundPage() {
  const introSectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedLocale, setSelectedLocale] = useState<AppLocale>("es");
  const [showStickyLocaleDock, setShowStickyLocaleDock] = useState(false);
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

  useEffect(() => {
    let rafId = 0;

    const updateDockVisibility = () => {
      rafId = 0;

      const introSection = introSectionRef.current;
      if (!introSection) {
        return;
      }

      const navShell = document.querySelector(".nav-shell") as HTMLElement | null;
      const navHeight = navShell?.offsetHeight ?? 68;
      const introBottom = introSection.getBoundingClientRect().bottom;

      const showThreshold = navHeight + 4;
      const hideThreshold = navHeight + 28;

      setShowStickyLocaleDock((isVisible) => {
        if (!isVisible && introBottom <= showThreshold) {
          return true;
        }

        if (isVisible && introBottom >= hideThreshold) {
          return false;
        }

        return isVisible;
      });
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(updateDockVisibility);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

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
  const shouldAnimateLayout = !prefersReducedMotion;
  const motionInitial = prefersReducedMotion ? false : "hidden";

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
    <motion.div
      className="page-stack playground-page"
      variants={PAGE_FADE_VARIANTS}
      initial={motionInitial}
      animate="visible"
    >
      <motion.section
        className="section-block section-divider"
        ref={introSectionRef}
        variants={SECTION_REVEAL_VARIANTS}
        initial={motionInitial}
        animate="visible"
      >
        <motion.p className="section-kicker" variants={SECTION_ITEM_VARIANTS}>
          Localization Lab
        </motion.p>
        <motion.h1 className="section-title" variants={SECTION_ITEM_VARIANTS}>
          Structured Localization Playground
        </motion.h1>
        <motion.p className="section-copy" variants={SECTION_ITEM_VARIANTS}>
          Left column stays English as the source of truth. Right column renders
          the selected locale for side-by-side comparison.
        </motion.p>

        <motion.div
          className="lab-columns-head"
          role="group"
          aria-label="Localization columns"
          variants={SECTION_ITEM_VARIANTS}
          layout={shouldAnimateLayout}
          transition={LAYOUT_TRANSITION}
        >
          <div className="locale-head-pane">
            <p className="locale-pane-kicker">Source</p>
            <p className="column-caption">English baseline</p>
            <p className="locale-pane-note">
              Stable reference copy for side-by-side review.
            </p>
          </div>

          <div className="locale-head-pane target-column-head">
            <div className="target-column-copy">
              <p className="locale-pane-kicker">Target</p>
              <p className="column-caption">Localized preview</p>
              <p className="locale-pane-note">
                Active locale: <span className="locale-live-value">{localeLabel}</span>
              </p>
            </div>

            <div className="locale-select-wrap">
              <label className="locale-label" htmlFor="target-locale">
                Locale
              </label>
              <select
                id="target-locale"
                className="select-field locale-select-field"
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
        </motion.div>
      </motion.section>

      <div className="playground-body">
        <div className={`sticky-locale-anchor ${showStickyLocaleDock ? "is-visible" : ""}`}>
          <div className="sticky-locale-dock" role="region" aria-label="Locale quick controls">
            <motion.div
              className="sticky-locale-group"
              layout={shouldAnimateLayout}
              transition={LAYOUT_TRANSITION}
            >
              <div className="sticky-locale-item">
                <p className="sticky-locale-key">Source</p>
                <p className="sticky-locale-value">English</p>
              </div>
              <div className="sticky-locale-item">
                <p className="sticky-locale-key">Target</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    className="sticky-locale-value"
                    key={`sticky-locale-${selectedLocale}`}
                    variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                    initial={prefersReducedMotion ? false : "initial"}
                    animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                    exit={prefersReducedMotion ? undefined : "exit"}
                    transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                  >
                    {localeLabel}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="sticky-locale-item sticky-locale-select-wrap">
                <label className="sticky-locale-key" htmlFor="sticky-target-locale">
                  Locale
                </label>
                <select
                  id="sticky-target-locale"
                  className="select-field sticky-locale-select"
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
            </motion.div>
          </div>
        </div>

        <motion.section
          className="lab-section"
          aria-labelledby="build-time-heading"
          variants={SECTION_REVEAL_VARIANTS}
          initial={motionInitial}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <motion.header className="section-head" variants={SECTION_ITEM_VARIANTS}>
            <h2 id="build-time-heading" className="section-title">
              1. Build-Time Localization (Lingo Compiler)
            </h2>
            <p className="section-copy">
              Static UI strings are extracted at build time and served in the target locale.
            </p>
          </motion.header>

          <motion.div
            className="lab-demo-grid"
            variants={SECTION_ITEM_VARIANTS}
            layout={shouldAnimateLayout}
            transition={LAYOUT_TRANSITION}
          >
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
            <motion.div
              className="demo-pane"
              layout={shouldAnimateLayout}
              transition={LAYOUT_TRANSITION}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`build-time-${selectedLocale}`}
                  variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                >
                  <p className="demo-note">Target locale: {localeLabel}</p>
                  <BuildTimeDemo name={buildName} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </TargetLocaleScope>
          </motion.div>

          <motion.pre className="code-block" variants={SECTION_ITEM_VARIANTS}>
            <code>{BUILD_TIME_SNIPPET}</code>
          </motion.pre>

          <motion.p className="how-it-works" variants={SECTION_ITEM_VARIANTS}>
            <strong>How it works:</strong> Lingo Compiler rewrites static copy to keyed lookups,
            and the target provider resolves those keys for the selected locale.
          </motion.p>
        </motion.section>

        <motion.section
          className="lab-section"
          aria-labelledby="runtime-heading"
          variants={SECTION_REVEAL_VARIANTS}
          initial={motionInitial}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <motion.header className="section-head" variants={SECTION_ITEM_VARIANTS}>
            <h2 id="runtime-heading" className="section-title">
              2. Runtime Translation (Lingo SDK / MCP)
            </h2>
            <p className="section-copy">
              Dynamic text is translated on demand through the SDK-backed API route.
            </p>
          </motion.header>

          <motion.div
            className="lab-demo-grid"
            variants={SECTION_ITEM_VARIANTS}
            layout={shouldAnimateLayout}
            transition={LAYOUT_TRANSITION}
          >
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
            <motion.div
              className="demo-pane"
              layout={shouldAnimateLayout}
              transition={LAYOUT_TRANSITION}
            >
              <button
                className="mini-button runtime-translate-button"
                disabled={isTranslating}
                onClick={handleRuntimeTranslate}
                type="button"
              >
                {isTranslating ? "Translating..." : "Translate via SDK"}
              </button>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  className="demo-note"
                  key={`runtime-locale-${selectedLocale}`}
                  variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                >
                  Target locale: {localeLabel}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                {runtimeError ? (
                  <motion.p
                    className="error-text"
                    key={`runtime-error-${runtimeError}`}
                    variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                    initial={prefersReducedMotion ? false : "initial"}
                    animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                    exit={prefersReducedMotion ? undefined : "exit"}
                    transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                  >
                    {runtimeError}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  className="runtime-output"
                  key={`runtime-output-${selectedLocale}-${runtimeOutput || "empty"}`}
                  variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                >
                  {runtimeOutput || "Translation output appears here after request."}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </TargetLocaleScope>
          </motion.div>

          <motion.pre className="code-block" variants={SECTION_ITEM_VARIANTS}>
            <code>{RUNTIME_SNIPPET}</code>
          </motion.pre>

          <motion.p className="how-it-works" variants={SECTION_ITEM_VARIANTS}>
            <strong>How it works:</strong> The client posts source text to <code>/api/translate</code>,
            which calls Lingo SDK and returns locale-specific output.
          </motion.p>
        </motion.section>

        <motion.section
          className="lab-section"
          aria-labelledby="rtl-heading"
          variants={SECTION_REVEAL_VARIANTS}
          initial={motionInitial}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <motion.header className="section-head" variants={SECTION_ITEM_VARIANTS}>
            <h2 id="rtl-heading" className="section-title">
              3. RTL Behavior (target column only)
            </h2>
            <p className="section-copy">
              Arabic applies right-to-left direction only inside the target preview.
            </p>
          </motion.header>

          <motion.div
            className="lab-demo-grid"
            variants={SECTION_ITEM_VARIANTS}
            layout={shouldAnimateLayout}
            transition={LAYOUT_TRANSITION}
          >
          <SourceLocaleScope>
            <motion.div
              className="demo-pane"
              dir="ltr"
              layout={shouldAnimateLayout}
              transition={LAYOUT_TRANSITION}
            >
              <p className="demo-note">Direction: ltr</p>
              <RtlMessage />
            </motion.div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="rtl">
            <motion.div
              className="demo-pane"
              dir={rtlEnabled ? "rtl" : "ltr"}
              layout={shouldAnimateLayout}
              transition={LAYOUT_TRANSITION}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  className="demo-note"
                  key={`rtl-direction-${selectedLocale}`}
                  variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                >
                  Direction: {rtlEnabled ? "rtl" : "ltr"} ({selectedLocale.toUpperCase()})
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`rtl-copy-${selectedLocale}`}
                  variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                >
                  <RtlMessage />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </TargetLocaleScope>
          </motion.div>

          <motion.pre className="code-block" variants={SECTION_ITEM_VARIANTS}>
            <code>{RTL_SNIPPET}</code>
          </motion.pre>

          <motion.p className="how-it-works" variants={SECTION_ITEM_VARIANTS}>
            <strong>How it works:</strong> Direction is derived from the selected target locale,
            and applied to the right demo container only so the source column stays stable.
          </motion.p>
        </motion.section>

        <motion.section
          className="lab-section"
          aria-labelledby="formatting-heading"
          variants={SECTION_REVEAL_VARIANTS}
          initial={motionInitial}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <motion.header className="section-head" variants={SECTION_ITEM_VARIANTS}>
            <h2 id="formatting-heading" className="section-title">
              4. Locale Formatting (currency, date, number)
            </h2>
            <p className="section-copy">
              Formatting updates through <code>Intl</code> based on locale conventions.
            </p>
          </motion.header>

          <motion.div
            className="lab-demo-grid"
            variants={SECTION_ITEM_VARIANTS}
            layout={shouldAnimateLayout}
            transition={LAYOUT_TRANSITION}
          >
          <SourceLocaleScope>
            <div className="demo-pane formatting-pane">
              <div className="format-controls">
                <div className="format-control-row">
                  <label className="field-label" htmlFor="amount-input">
                    Amount
                  </label>
                  <input
                    id="amount-input"
                    className="input-field"
                    onChange={(event) => setAmountInput(event.target.value)}
                    value={amountInput}
                  />
                </div>

                <div className="format-control-row">
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
                </div>
              </div>

              <FormattingPreview
                currency={sourceCurrency}
                date={sourceDate}
                locale={DEFAULT_LOCALE.toUpperCase()}
                number={sourceNumber}
              />
            </div>
          </SourceLocaleScope>

          <TargetLocaleScope locale={selectedLocale} scopeKey="formatting">
            <motion.div
              className="demo-pane formatting-pane"
              layout={shouldAnimateLayout}
              transition={LAYOUT_TRANSITION}
            >
              <div aria-hidden="true" className="format-controls format-controls-placeholder">
                <div className="format-control-row">
                  <span className="field-label">Amount</span>
                  <div className="input-field format-placeholder-field" />
                </div>
                <div className="format-control-row">
                  <span className="field-label">Date (UTC)</span>
                  <div className="input-field format-placeholder-field" />
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`formatting-${selectedLocale}`}
                  variants={prefersReducedMotion ? undefined : TEXT_SWAP_VARIANTS}
                  initial={prefersReducedMotion ? false : "initial"}
                  animate={prefersReducedMotion ? { opacity: 1, y: 0 } : "animate"}
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={prefersReducedMotion ? undefined : TEXT_SWAP_TRANSITION}
                >
                  <FormattingPreview
                    currency={targetCurrency}
                    date={targetDate}
                    locale={selectedLocale.toUpperCase()}
                    number={targetNumber}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </TargetLocaleScope>
          </motion.div>

          <motion.pre className="code-block" variants={SECTION_ITEM_VARIANTS}>
            <code>{FORMATTING_SNIPPET}</code>
          </motion.pre>

          <motion.p className="how-it-works" variants={SECTION_ITEM_VARIANTS}>
            <strong>How it works:</strong> Locale-specific formatters apply proper grouping,
            symbols, and date ordering with no string templates.
          </motion.p>
        </motion.section>

        <motion.section
          className="lab-section"
          aria-labelledby="workflow-heading"
          variants={SECTION_REVEAL_VARIANTS}
          initial={motionInitial}
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <motion.header className="section-head" variants={SECTION_ITEM_VARIANTS}>
            <h2 id="workflow-heading" className="section-title">
              5. Workflow Automation (Lingo CLI + CI snippet)
            </h2>
            <p className="section-copy">
              Localization checks run in development and are enforced in CI before shipping.
            </p>
          </motion.header>

          <motion.div
            className="lab-demo-grid"
            variants={SECTION_ITEM_VARIANTS}
            layout={shouldAnimateLayout}
            transition={LAYOUT_TRANSITION}
          >
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
          </motion.div>

          <motion.pre className="code-block" variants={SECTION_ITEM_VARIANTS}>
            <code>{WORKFLOW_SNIPPET}</code>
          </motion.pre>

          <motion.p className="how-it-works" variants={SECTION_ITEM_VARIANTS}>
            <strong>How it works:</strong> CLI refreshes translation artifacts locally, and CI
            blocks merges when localized output is missing.
          </motion.p>
        </motion.section>
      </div>
    </motion.div>
  );
}

function SourceLocaleScope({ children }: { children: ReactNode }) {
  return (
    <LingoProvider
      initialLocale={DEFAULT_LOCALE}
      initialTranslations={LOCALE_TRANSLATIONS[DEFAULT_LOCALE]}
      devWidget={{ enabled: false }}
    >
      {children}
    </LingoProvider>
  );
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
    <LingoProvider
      initialLocale={locale}
      initialTranslations={LOCALE_TRANSLATIONS[locale]}
      key={`${scopeKey}-${locale}`}
      devWidget={{ enabled: false }}
    >
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
