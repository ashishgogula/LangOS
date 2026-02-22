# LangOS

LangOS is a Next.js 16 localization lab that demonstrates build-time and runtime i18n workflows with [Lingo.dev](https://lingo.dev/).

It is designed as a practical reference project, not a marketing site: you can inspect real code paths for compiler integration, runtime translation, RTL behavior, locale formatting, and CI gating.

## Highlights

- Build-time localization with `@lingo.dev/compiler` (`withLingo` in `next.config.ts`)
- Runtime translation through a typed `POST /api/translate` route using `lingo.dev/sdk`
- Locale coverage in the app: `en` (source), `es`, `de`, `ar`
- Scoped RTL rendering for Arabic demos
- Locale-aware currency/number/date formatting using `Intl`
- CLI workflow via `npm run lingo:run`
- GitHub Actions quality pipeline with conditional Lingo CLI execution

## Routes

- `/` - Landing page and Lingo.dev services overview
- `/playground` - Interactive localization playground (5 demo sections)
- `/developers` - Failure modes and implementation notes
- `/api/translate` - Runtime translation API endpoint

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- `@lingo.dev/compiler`
- `lingo.dev` SDK
- ESLint (Next.js config)

## Project Structure

```text
src/
  app/
    page.tsx                  # Landing page
    playground/page.tsx       # Interactive localization lab
    developers/page.tsx       # Developer-facing architecture notes
    api/translate/route.ts    # Runtime translation endpoint
    layout.tsx                # Root layout + LingoProvider + navigation
  components/
    Navigation.tsx
    ThemeToggle.tsx
    LanguageSwitcher.tsx
    RtlProvider.tsx
  lib/
    locales.ts                # Locale typing + helpers
    lingo.ts                  # Client-side translate API helper
  lingo/
    cache/{en,es,de,ar}.json  # Locale cache artifacts
    locale-resolver.client.ts # Client locale persistence helpers
scripts/
  lingo-run.js                # Wrapper for `npx lingo.dev run`
.github/workflows/lingo.yml   # CI pipeline
```

## Prerequisites

- Node.js 20+ recommended
- npm 10+
- Lingo.dev API key for runtime translation and CLI sync

## Quick Start

1. Install dependencies:

```bash
npm ci
```

2. Create `.env.local` in the project root:

```bash
LINGO_API_KEY=your_lingo_api_key
```

Notes:
- `LINGO_API_KEY` is used by the runtime API route.
- `scripts/lingo-run.js` supports both `LINGO_API_KEY` and `LINGODOTDEV_API_KEY`.

3. Start the app:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Start local dev server
- `npm run lint` - Run ESLint
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lingo:run` - Run Lingo CLI sync (`npx lingo.dev run`)

## Runtime API

### `POST /api/translate`

Request body:

```json
{
  "text": "Ship this release after QA sign-off.",
  "sourceLocale": "en",
  "targetLocale": "es"
}
```

Success response:

```json
{
  "translatedText": "..."
}
```

Error behavior:
- `400` for invalid payload or unsupported locale
- `503` when `LINGO_API_KEY` is missing
- `500` for translation engine failures/timeouts

Implementation details:
- Runtime: `nodejs`
- In-memory translation cache for repeated requests
- Server timeout guard to avoid hanging requests

## Localization Configuration

`next.config.ts` uses `withLingo` with:

- `sourceLocale: "en"`
- `targetLocales: ["es", "de", "ar"]`
- `models: "lingo.dev"`
- cookie-based locale persistence (`locale`, max-age 1 year)
- pseudotranslator disabled in dev

`i18n.json` config maps bucket output to:
- `src/lingo/cache/[locale].json`

## CI/CD

GitHub Actions workflow: `.github/workflows/lingo.yml`

Quality job order:
1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. Conditional `npm run lingo:run` only when:
   - `secrets.LINGO_API_KEY` exists
   - `i18n.json` has non-empty buckets

This avoids failing public PRs/forks where secrets are unavailable.

## Contributing

Issues and pull requests are welcome.

Recommended contribution flow:
1. Fork the repository
2. Create a branch
3. Run `npm run lint` and `npm run build`
4. Open a PR with a clear summary and screenshots for UI changes

## Security

Do not commit API keys. `.env*` files are gitignored by default.

If you find a security issue, report it privately to the maintainer before opening a public issue.

## Open-Source Compliance Notes

To distribute this project as fully open-source, make sure the repository includes:

- `LICENSE` (with an SPDX-recognized license text)
- `CONTRIBUTING.md` (contribution policy)
- `CODE_OF_CONDUCT.md` (community standards)
- `SECURITY.md` (vulnerability reporting process)

## Maintainer

- [ashishgogula](https://ashishgogula.in)
