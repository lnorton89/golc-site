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
src/app/            Routes: / (landing), /roadmap, /docs, /changelog
src/components/      Shared header, footer, brand mark, status chips
src/app/globals.css  Brand tokens (color, type) as Tailwind v4 @theme
src/app/icon.tsx     Generated favicon from the GOLC mark
```

## Brand source of truth

Colors, type, motion tokens, voice, and lexicon come from
`golc/.planning/brand/GOLC-Brand-Guidelines.md` and `GOLC-Brand-Tokens.md`.
When the brand system changes, update `src/app/globals.css` and the copy in
`src/app/page.tsx` to match.

## Deploy

```bash
npx netlify-cli deploy --build --prod
```
