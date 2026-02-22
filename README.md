# LangOS

Built for the Lingo.dev Hackathon 2026.

LangOS is a production-grade internationalization reference architecture built with Next.js 16 and Lingo.dev.

Localization is often treated as string replacement. In production systems, it is an architectural concern.

This project demonstrates how localization should be wired across build time, runtime, rendering, formatting, and CI enforcement.

---

## Demo

<img width="1707" height="980" alt="LangOS Playground" src="https://github.com/user-attachments/assets/a83e4d99-0a64-47c1-a741-3a803f73b971" />

Live application  
http://langos.ashishgogula.in/

Architecture write-up  
https://www.ashishgogula.in/blogs/localization-is-an-architecture-problem-building-a-production-grade-i18n-system-with-langos-and-lingo-dev

---

## Core Principles

Production localization requires:

• Deterministic build artifacts  
• Explicit runtime boundaries  
• Scoped RTL handling  
• Locale-aware formatting  
• CI enforcement  

LangOS serves as a reference implementation of these concerns working together as a cohesive system.

---

## Architecture Overview

Localization is intentionally separated into five layers.

### 1. Build-Time Localization

Static UI copy is compiled using `@lingo.dev/compiler` via `withLingo` in `next.config.ts`.

Configuration:

- sourceLocale: en  
- targetLocales: es, de, ar  
- sourceRoot: src  
- Cookie-based locale persistence  

Translations are generated as real JSON artifacts and included in build outputs. This guarantees deterministic releases.

---

### 2. Runtime Translation Boundary

Dynamic content is translated through:

POST `/api/translate`

The route:

- Runs on Node runtime  
- Validates locale inputs  
- Short-circuits when source equals target  
- Requires `LINGO_API_KEY`  
- Caches successful responses  
- Applies timeout safety  

Build-time and runtime concerns are explicitly separated.

---

### 3. Scoped RTL Rendering

RTL behavior is applied only where required.

- Source panel renders with `dir="ltr"`  
- Target panel computes direction dynamically  
- The entire document is not flipped  

This prevents layout instability and enables side-by-side verification.

---

### 4. Locale-Aware Formatting

Formatting is implemented using the `Intl` API.

- `Intl.NumberFormat` for currency and numeric grouping  
- `Intl.DateTimeFormat` for date and time  

Currency mapping:

- en → USD  
- es → EUR  
- de → EUR  
- ar → AED  

Formatting differences are visible and testable.

---

### 5. Workflow and CI Enforcement

Localization is part of delivery quality.

CLI workflow:

```
npm run lingo:run
```

Custom script:

- Loads environment variables  
- Normalizes API key usage  
- Executes `lingo.dev` CLI  
- Streams logs directly  

GitHub Actions:

- Runs on push and pull request  
- Installs dependencies  
- Lints and builds  
- Validates `LINGO_API_KEY`  
- Executes localization only when configured  
- Logs skip reasons explicitly  

Live CI runs:  
https://github.com/ashishgogula/LangOS/actions

Localization is enforced, not optional.

---

## Routes

`/`  
Landing and architectural overview  

`/playground`  
Interactive localization lab  

`/developers`  
Failure modes and architectural notes  

`/api/translate`  
Runtime translation endpoint  

---

## Tech Stack

Next.js 16  
React 19  
TypeScript  
Tailwind CSS v4  
@lingo.dev/compiler  
lingo.dev SDK  
GitHub Actions  

---

## Running Locally

```
git clone https://github.com/ashishgogula/LangOS
cd LangOS
npm install
```

Create `.env.local`:

```
LINGO_API_KEY=your_key_here
```

Run:

```
npm run dev
```

---

## Hackathon Context

LangOS was built to demonstrate full lifecycle localization:

Build → Runtime → Rendering → Formatting → CI

Localization should be infrastructure from day one.

---

## Author

Ashish Gogula  
Design Engineer  
https://www.ashishgogula.in
