# golc-site

Marketing site for [GOLC](https://github.com/lnorton89/golc) — Go Lighting Control.

Next.js (App Router), statically exported, deployed to Netlify. Content and
theming are built from the brand guidelines in the main GOLC repo
(`.planning/brand/`); this repo is consumed there as a git submodule.

## Stack

- Next.js 16, App Router, `output: 'export'`
- Tailwind CSS v4 (CSS-based theme, see `src/app/globals.css`)
- Fonts: Archivo (display/text), JetBrains Mono (technical/labels)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static output goes to `out/`. `netlify.toml` points Netlify at `npm run build`
and publishes `out/`.

## Structure

```
src/app/            Routes: / (landing), /docs, /download, /reference,
                     /architecture, /roadmap, /changelog
src/components/      Shared header, footer, brand mark, status chips
src/app/globals.css  Brand tokens (color, type) as Tailwind v4 @theme
src/app/icon.tsx     Generated favicon from the GOLC mark
```

## Testing

```bash
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm run build            # required before test:links / test:lighthouse (they run against out/)
npm run test:links       # linkinator — crawls the built static export for broken links
npm run test:lighthouse  # Lighthouse CI — perf/accessibility/best-practices/SEO budgets, see lighthouserc.json
npm run test:visual      # Playwright — visual regression (light+dark, all routes) + key interactions
npm run test:visual:update  # regenerate baseline screenshots after an intentional visual change
```

`test:links` and `test:visual` start their own local static server
(`serve out`) automatically — no separate terminal needed. First run of
`test:visual` needs `npx playwright install chromium` once.

Baseline screenshots live in `tests/visual.spec.ts-snapshots/` and are
committed — when a change is intentional, run `test:visual:update` and
review the diff before committing the new baselines. Lighthouse assertion
thresholds live in `lighthouserc.json`; accessibility is a hard fail
(`minScore: 0.95`), the rest warn.

CI (`.github/workflows/ci.yml`) runs all of the above on every push/PR to
`master`.

## Brand source of truth

Colors, type, motion tokens, voice, and lexicon come from
`golc/.planning/brand/GOLC-Brand-Guidelines.md` and `GOLC-Brand-Tokens.md`.
When the brand system changes, update `src/app/globals.css` and the copy in
`src/app/page.tsx` to match.

## Deploy

```bash
npx netlify-cli deploy --build --prod
```
