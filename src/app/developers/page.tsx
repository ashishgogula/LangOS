"use client";

import { motion, useReducedMotion } from "motion/react";

const FAILURE_CASES = [
  {
    title: "Hardcoded strings",
    badExample: `// Bad: copy lives directly in components\n<button>Pay now</button>`,
    issue:
      "Hardcoded copy creates hidden localization debt because every string change becomes a code change.",
    fix:
      "Build-time localization routes static copy through extracted translation keys so UI strings are translated before release.",
  },
  {
    title: "Manual translation",
    badExample: `// Bad: hand-managed dictionary\nconst labels = {\n  es: { checkout: \"Pagar\" },\n  de: { checkout: \"Kasse\" },\n};`,
    issue:
      "Manual dictionaries drift from source text, get incomplete, and consume review time on every feature branch.",
    fix:
      "Localization tooling combines build-time extraction and runtime SDK translation for dynamic strings, with automation handling refreshes.",
  },
  {
    title: "No RTL support",
    badExample: `/* Bad: layout locked to left-to-right assumptions */\n.checkout-row {\n  display: flex;\n  justify-content: flex-start;\n}`,
    issue:
      "Without explicit direction handling, Arabic and Hebrew interfaces feel broken and inaccessible.",
    fix:
      "The localization layer scopes RTL behavior intentionally and defines where direction should flip at the UI boundary.",
  },
  {
    title: "No locale-aware formatting",
    badExample: `// Bad: concatenated format string\nconst total = \"$\" + amount.toFixed(2);`,
    issue:
      "String concatenation ignores local conventions for separators, symbols, and date ordering.",
    fix:
      "Locale-aware formatting uses Intl APIs for currency, numbers, and dates according to the active locale.",
  },
  {
    title: "No translation coverage enforcement",
    badExample: `# Bad: CI builds app but never validates locale output\n- run: npm run build`,
    issue:
      "Teams ship untranslated surfaces when pipelines do not verify localization artifacts.",
    fix:
      "CLI + CI localization checks surface missing translations before merge.",
  },
] as const;

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

const CASE_VIEWPORT = { once: true, amount: 0.2 } as const;

const CASE_HOVER_TRANSITION = {
  duration: 0.2,
  ease: "easeInOut",
} as const;

export default function DevelopersPage() {
  const prefersReducedMotion = useReducedMotion();
  const motionInitial = prefersReducedMotion ? false : "hidden";

  return (
    <motion.div
      className="page-stack developers-page"
      variants={PAGE_FADE_VARIANTS}
      initial={motionInitial}
      animate="visible"
    >
      <motion.section
        className="section-block section-divider"
        variants={SECTION_REVEAL_VARIANTS}
        initial={motionInitial}
        animate="visible"
      >
        <motion.p className="section-kicker" variants={SECTION_ITEM_VARIANTS}>
          Developer Philosophy
        </motion.p>
        <motion.h1 className="section-title" variants={SECTION_ITEM_VARIANTS}>
          Why most apps fail localization
        </motion.h1>
        <motion.p className="section-copy" variants={SECTION_ITEM_VARIANTS}>
          Localization failures are rarely translation failures. They are architecture failures.
          This localization toolchain is designed to make these failure modes explicit
          and preventable.
        </motion.p>
      </motion.section>

      {FAILURE_CASES.map((caseItem, index) => (
        <motion.section
          className="section-block section-divider developer-case"
          key={caseItem.title}
          variants={SECTION_REVEAL_VARIANTS}
          initial={motionInitial}
          whileInView="visible"
          viewport={CASE_VIEWPORT}
        >
          <motion.h2 className="section-title" variants={SECTION_ITEM_VARIANTS}>
            {index + 1}. {caseItem.title}
          </motion.h2>

          <motion.div className="developers-grid" variants={SECTION_ITEM_VARIANTS}>
            <motion.div
              variants={SECTION_ITEM_VARIANTS}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.01,
                      boxShadow:
                        "0 12px 28px color-mix(in oklab, var(--line) 36%, transparent)",
                    }
              }
              transition={CASE_HOVER_TRANSITION}
            >
              <p className="section-kicker">Bad example</p>
              <pre className="code-block">
                <code>{caseItem.badExample}</code>
              </pre>
            </motion.div>

            <motion.div
              className="insight-block"
              variants={SECTION_ITEM_VARIANTS}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.01,
                      boxShadow:
                        "0 12px 30px color-mix(in oklab, var(--accent) 13%, transparent)",
                    }
              }
              transition={CASE_HOVER_TRANSITION}
            >
              <p className="section-kicker">Issue</p>
              <p className="section-copy">{caseItem.issue}</p>
            </motion.div>

            <motion.div
              className="insight-block"
              variants={SECTION_ITEM_VARIANTS}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.01,
                      boxShadow:
                        "0 12px 30px color-mix(in oklab, var(--accent) 16%, transparent)",
                    }
              }
              transition={CASE_HOVER_TRANSITION}
            >
              <p className="section-kicker">How we handle it with Lingo.dev</p>
              <p className="section-copy">{caseItem.fix}</p>
            </motion.div>
          </motion.div>
        </motion.section>
      ))}
    </motion.div>
  );
}
