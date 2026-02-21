# LangOS

LangOS is a focused localization playground built with Next.js 16 and Lingo.dev.

## What It Demonstrates

- Build-time localization with Lingo Compiler
- Runtime translation through an SDK-backed API route
- Locale switching with persistence
- RTL layout support for Arabic
- Locale-aware currency and date formatting
- CLI and CI localization workflow

## Routes

- `/` - Overview of localization infrastructure
- `/playground` - Interactive localization demo
- `/workflow` - Developer workflow and CI example

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- React 19
- Tailwind CSS v4
- `@lingo.dev/compiler`
- `lingo.dev` SDK

## Local Setup

1. Install dependencies:

```bash
npm ci
```

2. Configure environment:

```bash
LINGODOTDEV_API_KEY=your_lingo_key
```

3. Start development:

```bash
npm run dev
```

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`
- `npm run lingo:run`

## Key Files

- `next.config.ts` - Lingo Compiler integration
- `src/app/layout.tsx` - `LingoProvider`, theme bootstrap, RTL support
- `src/components/LanguageSwitcher.tsx` - locale switching
- `src/app/api/translate/route.ts` - runtime translation endpoint
- `src/app/playground/page.tsx` - static/dynamic localization demo
- `src/app/workflow/page.tsx` - CLI and CI workflow docs
