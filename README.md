# LangOS

LangOS is a production-oriented localization demo built for the Lingo.dev hackathon.

It shows the complete multilingual flow in a Next.js App Router app:
- build-time localization with Lingo Compiler
- runtime locale switching (persisted)
- runtime dynamic translation through an API route
- RTL support for Arabic
- locale-aware number/date formatting
- release readiness checks

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

Create `.env.local` with:

```bash
LINGODOTDEV_API_KEY=your_lingo_key
```

3. Run dev server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Scripts

- `npm run dev` - start development server
- `npm run lint` - run ESLint
- `npm run build` - production build check
- `npm run start` - run production server
- `npm run lingo:run` - execute Lingo CLI sync

## Project Highlights

- `next.config.ts`  
  Lingo Compiler config (`sourceLocale: "en"`, `targetLocales: ["es", "de", "ar"]`)

- `src/app/layout.tsx`  
  Root wrapped in `LingoProvider`, theme bootstrapping script, RTL provider

- `src/components/LanguageSwitcher.tsx`  
  Runtime locale switcher and persistence

- `src/app/api/translate/route.ts`  
  Runtime dynamic translation endpoint using Lingo SDK

- `src/app/dashboard/page.tsx`  
  Translation input/output, history, readiness checks, Intl formatting demo

## CI / Workflow Notes

Workflow file: `.github/workflows/lingo.yml`

The CI now:
- runs on `push` and `pull_request` to `main`
- runs `lint` and `build`
- runs Lingo CLI only when both are true:
  - `LINGO_API_KEY` secret is present
  - `i18n.json` has at least one configured bucket

This avoids false failures from running Lingo CLI with empty bucket config.

## Hackathon Submission Checklist

- [ ] Public repo with clear README
- [ ] Live deployment URL
- [ ] 2-3 minute demo video
- [ ] Demo includes locale switch + runtime translation + RTL + release checks
- [ ] CI passing on main
