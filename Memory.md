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
- Assessments (Full Interactive Suite with Factor Analysis, Result, Discussion, Conclusion, Measures Table)
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
  1. **Full Assessment Suite Restoration**:
     - Built comprehensive data catalog (`data/assessments-interactive.ts`) covering 14 clinical and self-screening instruments (GAD-7, OASIS, SIAS-6, PHQ-9, BDI-II, TIPI-10 Big Five, 16PF, PCL-5 Trauma, CAPS-5, ASRS-v1.1 ADHD, AQ-10 Autism Quotient, Rorschach Inkblot, TAT, MMPI-2).
     - Restored **Factor Profile Analysis** (`computeAssessmentInterpretation`) computing multi-dimensional psychological subscales with individual score, max, level, percentage, and clinical meanings.
     - Restored **Full Structured Result Profile**:
       - Score Summary & Severity Elevation Meter
       - **Result Statement**: Clinical band and narrative description
       - **Factor Breakdown**: Visual progress bars & factor meaning cards
       - **Discussion Section**: Multi-paragraph clinical exploration examining contrast between highest and lowest factors, situational variation (work, relationships, stress), and reflective inquiry questions
       - **Conclusion Section**: Core takeaway synthesizing strengths and growth areas, non-diagnostic framing, and next actionable steps
       - **Recommendations**: Structured psychological exercises and workbook links
       - **Detailed Measures Table**: Full itemized metrics, subscales, and score levels
       - **Action Bar**: Copy to Clipboard (with toast), Print/Export Profile, Retake Screener, and Book Review Session CTA.
  2. **Editorial Aesthetic Refinement**:
     - Enhanced `app/globals.css` with luxury editorial tokens (`#FDFBF7` Ivory, `#F5EFE6` Cream, `#0F2038` Deep Oxford Navy, `#7B9B8A` Velvet Sage, `#CBA258` Antique Gold, `#8B2626` Crisis Crimson).
     - Added rich glassmorphism (`glass-card`, `glass-nav`), refined typography hierarchy, and smooth micro-interactions.
  3. **Build & Deployment**:
     - Production build verified (`npm run build` -> 18 static routes compiled).
     - TypeScript check verified (`npx tsc --noEmit` -> 0 errors).
     - Live on Vercel: https://pillowdreamworks-site.vercel.app

- **Final Commit SHA:** `722dd8c`
- **GitHub Status:** Synchronized with `origin/main`.
- **Live Vercel URL:** https://pillowdreamworks-site.vercel.app
