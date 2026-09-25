# Memory.md — PillowDreamWorks Foundation (Master v2.0)

> Living engineering memory. Update after EVERY Git commit and before ending any AI session.

## Project Identity

- Project: PillowDreamWorks Foundation
- Founder: Manish Garg
- Repository: https://github.com/pillowdreamwork/pillowdreamworks-site
- Current Site: https://pillowdreamwork.github.io/pillowdreamworks-site/
- Production URL: https://pillowdreamworks-site.vercel.app
- Custom Domain Target: https://pillowdreamworks.vercel.app
- Branch: main

---

# Permanent Decisions (Do Not Re-litigate)

## Brand

- Editorial psychology foundation
- Calm on the surface
- Ambitious underneath
- No AI SaaS aesthetic

## Tech

- Next.js 16 (Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- Motion.dev
- Lucide React

## Products

- Psychology Toolkit
- Finding The Centre
- Bundle
- Assessments
- Counselling
- CentreLine
- Learn

---

# Git Recovery Record

- **Date:** 2026-09-25
- **Recovery Branch:** `recovery/diagnose-v2` (safety branch: `recovery/before-failed-commit-cleanup`)
- **Safety Tag:** `recovery-before-diagnostics`
- **Known-good baseline:** `e98cc30` (merge commit before failed rebuild attempts)
- **Failed commits audited:**
  - `1398653` (introduced root `app/` and duplicate `src/` app router simultaneously)
  - `c28b796` (trigger redeploy attempt)
  - `48e2092` (attempted tsconfig alias change to `./src/*` breaking root imports)
  - `2e71017` (stubbed `src/components/ui` components)
  - `24e06c9` (accumulated duplicate `src/` hierarchy)
- **Files recovered:** 62 files across `app/`, `components/`, `data/`, `lib/`, `public/`, and documentation manifests.
- **Root causes:**
  1. **Dual App Router collision**: Next.js detected both `src/app` and `app/` at repository root, causing routing resolution ambiguity.
  2. **Path Alias Mismatch**: `tsconfig.json` was pointing `@/*` to `./src/*`, but all canonical implementation files, datasets, and utilities lived directly at the repository root (`./components`, `./data`, `./lib`, `./app`).
  3. **Tailwind v3 vs v4 clash**: An old `tailwind.config.js` (Tailwind v3 JS format) conflicted with `@tailwindcss/postcss` and Tailwind v4 CSS `@theme` declarations inside `app/globals.css`.
  4. **Legacy Root Static HTML & missing Vercel config**: Legacy root `.html` files (`index.html`, etc.) were shadowing Next.js routing and missing explicit `vercel.json` framework definition.
- **Fixes applied:**
  1. Safely removed the conflicting `src/` folder completely.
  2. Safely removed legacy `tailwind.config.js` (Tailwind v4 purely configured in CSS).
  3. Cleaned out legacy root `.html` files and added `vercel.json` with `"framework": "nextjs"`.
  4. Updated `tsconfig.json` path alias `@/*` -> `./*`.
  5. Configured `eslint.config.mjs` with `typescript-eslint` and `@next/eslint-plugin-next`.
  6. Validated TypeScript (`npx tsc --noEmit` -> 0 errors) and Next.js static build (`npm run build` -> 19 static routes compiled).
- **Final Commit SHA:** `5ba3159`
- **GitHub Status:** Synchronized with `origin/main`.
- **Live Vercel URL:** https://pillowdreamworks-site.vercel.app
- **Visible Production Changes:** Complete editorial Next.js 16 site structure with 19 static routes, interactive assessment center, book showcase & carousel, responsive navigation, emergency safety banners, transparent INR/USD pricing tables, and legal policies.
- **Remaining Issues:** None blocking.

---

# Current Progress

Status: POST-RECOVERY COMPLETE & LIVE

Completed Documents:
- [x] PRD.md
- [x] Architecture.md
- [x] Rules.md
- [x] Commits.md
- [x] Decision.md
- [x] Design.md
- [x] Memory.md

Website Build & Routes Generated:
- [x] `/` (Editorial Homepage with Hero, Problem, Mission, Books, Assessments, Services, Learn, Founder, Final CTA)
- [x] `/books` (Books Hub)
- [x] `/books/psychology-toolkit` (Flagship 14-section workbook)
- [x] `/books/finding-the-centre` (Finding The Centre details)
- [x] `/books/bundles` (Comprehensive bundles)
- [x] `/assessments` (16 clinical assessment catalog + interactive screeners)
- [x] `/services` (Counselling, Crisis stabilization, Graphotherapy, Courses)
- [x] `/learn` (PsychSnaps, Articles, Guides)
- [x] `/pricing` (Transparent INR/USD pricing)
- [x] `/about` (Founder & Mission)
- [x] `/contact` (Online intake & inquiry)
- [x] `/legal/privacy`, `/legal/terms`, `/legal/disclaimer`, `/legal/refund`, `/legal/cookie`
- [x] `/_not-found`
