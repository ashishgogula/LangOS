# LangOS

LangOS is a production-style i18n reference architecture built with Next.js 16 and Lingo.dev.

This project was built for the Lingo.dev Hackathon to demonstrate that localization is not a UI toggle problem. It is a system design problem.

LangOS shows how localization should be wired across build time, runtime, formatting, RTL behavior, and CI enforcement.

Live Demo  
http://langos.ashishgogula.in/

Full Architecture Breakdown  
https://www.ashishgogula.in/blogs/localization-is-an-architecture-problem-building-a-production-grade-i18n-system-with-langos-and-lingo-dev

---

## Core Idea

Most localization failures do not start in translation tooling.

They start in architecture.

LangOS demonstrates:

• Deterministic build-time localization  
• Safe runtime translation boundaries  
• Scoped RTL rendering  
• Locale-aware formatting  
• CI-level enforcement  

This is not a wrapper.  
It is not a mock.  
It is a working reference architecture.

---

## Architecture Overview

Localization is implemented across five distinct layers:

### 1. Build-Time Localization

Static UI strings are compiled using `@lingo.dev/compiler` with `withLingo` in `next.config.ts`.

Configuration includes:

- sourceLocale: `en`
- targetLocales: `es`, `de`, `ar`
- sourceRoot: `src`
- cookie-based locale persistence

Static translations are generated as real JSON artifacts and resolved through a scoped provider.

This guarantees predictable release artifacts.

---

### 2. Runtime Translation

Dynamic content is handled via a typed API route:

`POST /api/translate`

Features:

- Node runtime
- Locale validation
- Early exit when source equals target
- Required `LINGO_API_KEY`
- In-memory response caching
- Timeout safety using AbortController
- SDK call isolation

Build-time and runtime concerns are intentionally separated.

---

### 3. Scoped RTL Handling

RTL behavior is applied only where required.

The source panel renders with `dir="ltr"`.

The target panel dynamically computes direction and applies `dir="rtl"` for Arabic.

The entire document is not flipped.

This prevents layout instability and improves clarity.

---

### 4. Locale-Aware Formatting

Localization includes numeric and temporal formatting.

Implemented using the `Intl` API:

- `Intl.NumberFormat` for currency and numbers
- `Intl.DateTimeFormat` for date and time

Currency mapping:

- en → USD
- es → EUR
- de → EUR
- ar → AED

Formatting differences are visible and testable.

---

### 5. Developer Workflow and CI Enforcement

Localization is part of delivery quality.

CLI Workflow: npm run lingo:run


Custom script:

- Loads environment variables
- Normalizes API key usage
- Executes `npx lingo.dev run`
- Streams logs directly

GitHub Actions:

- Runs on push and pull request
- Installs dependencies
- Lints and builds
- Validates `LINGO_API_KEY`
- Executes localization only when configured
- Logs skip reasons explicitly

Localization is enforced, not optional.

Live CI Runs:
https://github.com/ashishgogula/LangOS/actions

---

## Routes

- `/` → Landing and overview
- `/playground` → Interactive localization lab
- `/developers` → Failure modes and architectural notes
- `/api/translate` → Runtime translation endpoint

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- @lingo.dev/compiler
- lingo.dev SDK
- GitHub Actions CI

---

## Why This Project Matters

Browser translation tools translate rendered output.

Production systems require:

- Deterministic artifacts
- Locale contracts
- Scoped direction handling
- Formatting correctness
- Pipeline enforcement

LangOS demonstrates how these concerns fit together.

---

## Running Locally

```bash
git clone https://github.com/ashishgogula/LangOS
cd LangOS
npm install
```

Create .env.local:
```bash
LINGO_API_KEY=your_key_here
```

Then run:
```bash
npm run dev
```

# Hackathon Submission

Built for the Lingo.dev Hackathon to demonstrate full lifecycle localization:

Build → Runtime → Rendering → Formatting → CI

Localization should be infrastructure from day one.

Author

Ashish Gogula |
Design Engineer |
https://www.ashishgogula.in



