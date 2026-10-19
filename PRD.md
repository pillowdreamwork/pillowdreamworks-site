# PRD.md — PillowDreamWorks Foundation (Master v2.0)

**Project:** PillowDreamWorks Foundation Website Rebuild
**Founder:** Manish Garg
**Repository:** https://github.com/pillowdreamwork/pillowdreamworks-site
**Current Live Site:** https://pillowdreamwork.github.io/pillowdreamworks-site/
**Target Production:** https://pillowdreamworks.vercel.app

> This PRD is the single source of truth for Antigravity or any AI engineer.

---

## 1. Vision

PillowDreamWorks Foundation is a founder-led psychology and wellbeing ecosystem.

It combines:
- Books
- Psychological Assessments
- Counselling
- CentreLine Support
- Learn (PsychSnaps & Articles)
- Resources

The website must feel editorial, premium, calm, and intelligent—not like a generic AI SaaS landing page.

---

## 2. Business Goals

Primary goals:
1. Sell The Psychology Toolkit
2. Sell Finding The Centre
3. Generate counselling bookings
4. Build the Learn ecosystem
5. Grow PillowDreamWorks as a psychology foundation

---

## 3. Tech Decision

- Framework: Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Motion.dev
- shadcn/ui
- Kokonut UI
- Bklit UI
- Deploy: Vercel
- Source Control: GitHub

---

## 4. Sitemap

Home
Books
 ├── Psychology Toolkit
 ├── Finding The Centre
 └── Bundles

Assessments
 ├── Anxiety
 ├── Personality
 ├── Cognitive
 └── Projective

Services
 ├── Counselling
 ├── Crisis Counselling
 ├── CentreLine
 └── Graphotherapy

Learn
 ├── PsychSnaps
 ├── Articles
 ├── Resources
 └── Founder Notes

About
Contact
Pricing
Legal

---

## 5. Homepage Structure

1. Emergency Banner
2. Navigation
3. Editorial Hero
4. Mission
5. Problem Statement
6. Books Carousel
7. Assessments Preview
8. Services
9. Learn
10. Founder Story
11. Final CTA
12. Footer

---

## 6. Pricing

### Psychology Toolkit

India
- ₹1,499

Global
- $24.99

### Finding The Centre

eBook
- ₹749
- $12.49

Print
- ₹1,499
- $24.99

### Bundle

- India: ₹1,799
- Global: $29.99

---

## 7. Psychological Assessments

All 16 practitioner-administered batteries run for a 60-minute session.

| Assessment | India | Global |
|---|---:|---:|
| HAM-A | ₹799 | $69 |
| BDI-II | ₹799 | $69 |
| SSCT | ₹1,499 | $99 |
| HTP | ₹1,499 | $99 |
| HFDT | ₹1,499 | $99 |
| CAARS | ₹1,899 | $129 |
| PANSS | ₹2,199 | $149 |
| Bender Visual-Motor Gestalt II | ₹2,299 | $149 |
| CAT | ₹2,499 | $199 |
| 16PF | ₹2,999 | $199 |
| TAT | ₹2,999 | $249 |
| CAPS-5 | ₹2,999 | $299 |
| Rorschach (ROR) | ₹3,499 | $349 |
| MMPI | ₹3,999 | $399 |
| WAIS-IV / MISIC | ₹4,999 | $499 |
| ADOS-2 | ₹4,999 | $549 |

Every assessment page must include:
- Purpose
- Description
- Duration
- Age
- Educational disclaimer
- CTA

---

## 8. Services

### Counselling

| Service | India | Global |
|---|---:|---:|
| Session | ₹1,499 | $18 |
| Package (4) | ₹5,996 | $72 |
| Package (8) | ₹11,992 | $144 |

### Crisis

| Service | India | Global |
|---|---:|---:|
| Crisis Call | ₹399 | $5 |
| CentreLine | ₹299 | $4 |

### Graphology

| Service | India | Global |
|---|---:|---:|
| Basic | ₹399 | $5 |
| Standard | ₹799 | $10 |
| Deep | ₹1,199 | $15 |

---

## 9. Design Principles

Use:
- Editorial layouts
- Real book imagery
- Strong typography
- Asymmetry
- Purposeful motion

Avoid:
- Harsh gradients
- Purple themes
- Fake testimonials
- Emoji icons
- Sparkles
- Dot grids
- Generic SaaS cards

---

## 10. GitHub & Vercel Workflow

GitHub:
- Create `rebuild-v2` branch
- Commit every milestone
- PR into `main`

Vercel:
- Connect GitHub
- Preview deployment for every push
- Production deploy from `main`

---

## 11. AI Handoff

This document is compatible with:
- Antigravity
- Claude
- GPT-5
- Cursor
- Windsurf
- GitHub Copilot

Read this PRD before Architecture.md, Rules.md, Design.md, Commits.md and Memory.md.

