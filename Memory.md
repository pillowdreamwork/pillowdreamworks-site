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
