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
- Assessments (Full 177 Clinical & Self-Inventories: 161 Free Screeners + 16 Practitioner Batteries)
- Counselling
- CentreLine
- Learn

---

# Git Recovery & Enhancement Record

- **Date:** 2026-09-25
- **Recovery Branch:** `recovery/diagnose-v2` (safety branch: `recovery/before-failed-commit-cleanup`)
- **Safety Tag:** `recovery-before-diagnostics`
- **Known-good baseline:** `e98cc30` (merge commit before failed rebuild attempts)
- **Completed Milestones:**
  1. **Complete 177 Psychological Assessments Restored**:
     - Extracted and fully typed the entire historical dataset (`data/assessments-full-catalog.ts`) containing all **161 Free Screeners** and **16 Clinician Projective Batteries** across all **15 Psychological Domains** (Anxiety, Depression & Mood, Stress & Burnout, Trauma & PTSD, Personality, Cognitive & Memory, ADHD & Focus, Autism & Neurodiversity, Schizophrenia & Psychosis, Substance Use & Addictions, Motivation & Self-Growth, Self-Concept & Identity, Relationships & Attachment, Children & Adolescents, Graphotherapy & Handwriting).
     - **Individual Scoring & Factor Analysis**: Each assessment features its own question-by-question scoring algorithm, subscale indices, and factor percentage computation.
     - **Full Profile Generation (`buildAssessmentInterpretation`)**:
       - Score Summary & Severity Elevation
       - **Result Statement**: Explicit clinical score band and description
       - **Interpretation Section**: Contextualized analysis of the obtained score
       - **Factor Breakdown & Progress Bars**: Individual subscale metrics with levels (`Low`, `Moderate`, `High`) and psychological meanings
       - **Discussion Section**: Deep exploration of factor contrast, situational variation (work, relationships, under stress), and exploratory questions
       - **Conclusion Section**: Core synthesized takeaway and actionable reflection next step
       - **Itemized Measures Table**: Full metrics table with scores, maximums, percentages, and levels
       - **Intake Personalization**: Client-side name/age personalization
       - **Action Bar**: Copy to Clipboard (with toast), Print/Export Profile, Retake Screener, and Book Review Session CTA.
  2. **Editorial Aesthetic Refinement**:
     - Enhanced `app/globals.css` with luxury editorial design tokens (`#FDFBF7` Ivory, `#F5EFE6` Cream, `#0F2038` Deep Oxford Navy, `#7B9B8A` Velvet Sage, `#CBA258` Antique Gold, `#8B2626` Crisis Crimson).
     - Added rich glassmorphism (`glass-card`, `glass-nav`), refined typography hierarchy, and smooth micro-interactions.
  3. **Build & Deployment**:
     - Production build verified (`npm run build` -> 18 static routes compiled).
     - TypeScript check verified (`npx tsc --noEmit` -> 0 errors).
     - Live on Vercel: https://pillowdreamworks-site.vercel.app

- **GitHub Status:** Synchronized with `origin/main`.
- **Live Vercel URL:** https://pillowdreamworks-site.vercel.app

---

# Phase 1 — The Living Library Redesign

- **Date:** 2026-09-26
- **Design Direction:** Design Implementation Bible v3.0 + Creative Redesign Master v3.0 (New folder/)
- **Creative Concept:** The Living Library — build a living editorial environment in which scroll is the mechanism of revelation

## Sections Rebuilt (Phase 1)

### Hero → "The Quiet Studio"
- **File:** `components/home/hero-section.tsx`
- **Removed:** blurred sage/gold radial blobs, `Sparkles` icon import, metric counter strip, large rounded product card, dual price boxes
- **Added:** editorial 58/42 left/right grid, book as publication object with chapter spine, staggered Motion.dev entrance (under 800ms), companion volume as quiet footer link
- **Motion:** `containerVariants` + `itemVariants` stagger, `easeOut`, `visualVariants` for book

### Mission → "The Library Index"
- **File:** `components/home/mission-section.tsx`
- **Removed:** four icon cards with shadow, grid layout
- **Added:** editorial statement on left (58%), four numbered rows 01–04 on right with thin horizontal rules, hover row shift with 2–4px arrow movement, `whileInView` reveals per row

### Problem → "The Margin Notes"
- **File:** `components/home/problem-section.tsx`
- **Removed:** red comparison card, X/check bullet lists, SaaS solution matrix
- **Added:** four editorial numbered observations in wide column layout (serif headline + sans body), closing italic transition statement "What if the experience had architecture?"

### Books → "The Shelf"
- **File:** `components/home/books-preview-section.tsx`
- **Removed:** two equal cards, Sparkles campaign badge, checkmark feature lists
- **Added:** `AnimatePresence` direction-aware carousel, book as publication object with chapter spine inside, prev/next circular buttons, accessible pagination dots, keyboard support (ArrowLeft/Right), `aria-roledescription="carousel"`

## Build Status
- `npm run build` → exit 0, all 18 static routes compiled ✓
- TypeScript verified ✓

## Anti-Vibecode Compliance
- ✓ No blurred radial blobs
- ✓ No Sparkles/sparkle icons
- ✓ No metric counters
- ✓ No fake badges
- ✓ No red comparison cards
- ✓ No X vs ✓ bullet lists
- ✓ Typography-first composition

---

# Phase 2 — Complete Living Library Homepage Integration

- **Date:** 2026-09-26
- **Architecture:** Next.js 16 + React 19 + TypeScript + Tailwind 4 + Motion.dev (v13)

## Sections Rebuilt (Phase 2)

### Assessments Preview → "The Psychometric Archive"
- **File:** `components/home/assessments-preview-section.tsx`
- **Removed:** generic 3-column equal card grid, `ShieldAlert` standard block, `Sparkles` icon.
- **Added:** 2-column interactive ledger with interactive category tabs (`All Frameworks`, `Anxiety & Mood`, `Clinical Diagnostics`, `Personality & Projective`), live specimen detail inspection sheet with `AnimatePresence`, standardized index codes (`[HAM-A]`, `[BDI-II]`, `[CAPS-5]`, `[16PF]`), and refined diagnostic notice.

### Services Preview → "The Consulting Rooms"
- **File:** `components/home/services-preview-section.tsx`
- **Removed:** generic 4-card grid and stock icons.
- **Added:** 4 architectural consultation rooms (`1-on-1 Clinical Counselling`, `Crisis De-Escalation Call`, `CentreLine Async Guidance`, `Subconscious Graphotherapy`) with clear clinical dignity, transparent rates, and staggered Motion reveals.

### Learn Preview → "The Reading Room / The Folio"
- **File:** `components/home/learn-preview-section.tsx`
- **Removed:** 3 identical generic blog cards.
- **Added:** publication folio layout with featured lead essay + quote block on the left (58%), and a dispatch ledger of PsychSnaps with read-time and edition codes on the right.

### Founder Section → "The Founder's Colophon"
- **File:** `components/home/founder-section.tsx`
- **Removed:** generic centered monogram box.
- **Added:** authentic publisher colophon with gold monogram seal, quote card, and structured editorial manifesto contrasting pop-psychology with enduring behavioral architecture.

### Final CTA → "The Closing Page / The Inscription"
- **File:** `components/home/final-cta-section.tsx`
- **Removed:** `blur-3xl` background glows, generic badge gradients, `Sparkles` icon.
- **Added:** deep navy textured canvas with fine gold accent rule, poetic serif invitation, clear primary publication acquisition link, clear secondary library link, and a format specification strip (Instant PDF delivery, Printable A4 & Tablet layout, Lifetime updates).

## Verification
- `npm run build` → 0 errors, 18 static pages successfully generated.
- TypeScript compilation → 0 errors.

---

# Phase 3 — The Living Library Interactive Narrative Additions

- **Date:** 2026-09-26
- **Skills Applied:** `scroll-experience`, `frontend-design`, `ui-ux-pro-max`, `react-best-practices`, `nextjs-best-practices`, `verification-before-completion`.

## Enhancements Deployed

1. **Enter the Library (Proximity Depth Physics)**:
   - File: `components/home/hero-section.tsx`
   - Added interactive pointer physics via `useMotionValue` and `useSpring` on desktop: the master Toolkit publication shifts 4–8px with perspective rotation while background paper planes drift smoothly.

2. **The Noise to Continuum (`UNDERSTAND → REFLECT → PRACTICE`)**:
   - File: `components/home/problem-section.tsx`
   - Replaced static text with a living psychological continuum showing scattered noise tags (somatic tension, algorithmic saturation, unexamined expectations) synthesizing into a 3-pillar behavioral continuum.

3. **The Blank Page (Participatory Reflection)**:
   - File: `components/home/reflection-section.tsx`
   - Built a workbook reflection interface inviting visitors to engage directly with self-inquiry prompts with local browser persistence.

4. **The Shelf & Interactive Chapter Spine**:
   - File: `components/home/books-preview-section.tsx`
   - Added interactive chapter spine selector (`01` through `05`) revealing internal exercise specifications (Values Compass, ABCDE Reframing, Autonomic Nervous System mapping).

5. **Psychology in Motion (PsychSnaps Fold/Unfold)**:
   - File: `components/home/learn-preview-section.tsx`
   - Added interactive insight reveal drawers on each PsychSnap note providing somatic & behavioral directives on click.

---

# Phase 4 — Ultra-Luxury Glassmorphism & Interactive 3D Architecture (Assessments, Services, Learn)

- **Date:** 2026-10-25
- **Design Philosophy:** 1-Million-Dollar Tasteful Editorial Glassmorphism & Interactive 3D Depth
- **Skills Applied:** `frontend-design`, `frontend-developer`, `3d-web-experience`, `ui-ux-pro-max`, `scroll-experience`, `mobile-design`, `tailwind-patterns`, `react-best-practices`.

## Architecture & Visual Tokens
1. **Glassmorphism Surfaces (`app/globals.css`)**:
   - Added `.glass-surface`, `.glass-surface-warm`, `.glass-card`, `.glass-content-card`, `.glass-nav`, `.glass-pill`, `.glass-input`, `.glass-section`.
   - Frosted ivory (`#FAF8F5`) and cream (`#F4EFEA`) backgrounds with double specular highlights (`inset 0 1px 0 rgba(255,255,255,0.85)`).
   - Structural borders in sage green (`#8FA89E`, `#7B9B8A`, `#A6B7A1`) and forest green (`#24483B`, `#1E3A2F`).
   - Signal accents in luminous vermilion (`#E85D3F`) with pulsing depth and glow.
   - Atmospheric floating orbs with smooth multi-axis drift physics.

2. **Interactive 3D Buttons (`components/ui/liquid-glass-button.tsx` & `components/ui/button.tsx`)**:
   - Preserved all 9 alive details, all original button variants (`primary`, `secondary`, `gold`, `sage`, `subtle`, `vermilion`, `crisis`), sizes, and HTML/Next.js link capabilities.
   - Enhanced with **interactive 3D perspective tilt physics** (`perspective(600px) translate3d(...) rotateX(...) rotateY(...)`) dynamically derived from cursor proximity to center.
   - Smooth 3D spring return inertia and real-time cursor light highlight reflection.

3. **3D Canvases Elevated (`components/3d/`)**:
   - **`PsychometricMindCanvas`**: 15 domain nodes in 3D sacred geometry cage with 4-color ambient dust field (Ivory, Sage, Gold, Vermilion) and multi-point 3D lighting (Warm Ivory directional, Gold point, Vermilion rim point at `(4, -3, 3)`, Forest green ambient point). Glassmorphism HUD with vermilion pulse dot.
   - **`TherapeuticSanctuaryCanvas`**: 4 clinical sculptures (Octahedron, Torus, Möbius, Gyroscope) with 220 multi-tone dust particles, vermilion rim light, and glassmorphism HUD.
   - **`KnowledgeArchiveCanvas`**: Interactive origami mind archive with equatorial ring, multi-tone particle dust, dynamic vermilion rim light, and glassmorphic HUD.

4. **Page Implementations**:
   - **`app/assessments/page.tsx` & `components/assessments/assessment-centre.tsx`**:
     - Editorial hero with vermilion signal dot, 3D Neural Constellation console, glass filter pill tabs, glass search input & domain dropdown, 177 luxury 3D tilt cards, glass checkout notice, and frosted test runner modals.
   - **`app/services/page.tsx`**:
     - Therapeutic Sanctuary 3D console, 1-on-1 consultation cards, CentreLine crisis de-escalation bar with 24/7 helpline badges, Graphotherapy subconscious alignment tier, and masterclasses.
   - **`app/learn/page.tsx`**:
     - 3D Knowledge Archive origami console, category filter pills, search bar, PsychSnaps and editorial essay tilt cards, and full interactive sliding reading drawer.

## Verification
- `npx tsc --noEmit` → 0 errors ✓
- `npm run build` → 22 static pages generated successfully ✓


---

# Phase 5 — Button Hover Refinement (Arrow Direction, Light, Magnet)

- **Date:** 2026-10-26
- **File:** `components/ui/liquid-glass-button.tsx` — shared by every button on the site

1. **Arrow:** rests at 45° above horizontal (`-rotate-45`) and turns level to 0° over 350ms on hover. This replaces the previous 0° → 45° downward turn for every arrow-accent button.
2. **Light:** the cursor-following glow is compulsory on every button. Dark variants use a white sheen; ivory/gold variants use a warm gold sheen so the glow stays visible.
3. **Magnet:** the lean/tilt toward the cursor is compulsory wherever a fine pointer exists. Detection now uses `(hover: hover) and (pointer: fine)` instead of `maxTouchPoints`/`ontouchstart`, which silently disabled both effects on touchscreen laptops.
4. **Config:** `next.config.mjs` reads `NEXT_ALLOWED_DEV_ORIGINS` for dev previews without hardcoding a hostname.

## Verification
- `npx tsc --noEmit` → 0 errors ✓
- `npm run lint` → 0 errors ✓
- `npm run build` → 22 static pages ✓
- Dev preview on port 3002: all 74 arrow buttons render `-rotate-45 group-hover:[rotate:0deg]` ✓
