# Decision.md — PillowDreamWorks Foundation
## Master Product, Engineering & Design Decision Register v2.0

**Status:** Authoritative  
**Project:** PillowDreamWorks Foundation  
**Founder:** Manish Garg  
**GitHub Repository:** https://github.com/pillowdreamwork/pillowdreamworks-site  
**Current Baseline:** https://pillowdreamwork.github.io/pillowdreamworks-site/  
**Target Vercel Deployment:** https://pillowdreamworks.vercel.app

> This file records decisions that have already been made. AI agents must not silently reverse, reinterpret, or re-litigate these decisions. Genuine conflicts must be surfaced and resolved explicitly.

---

# 1. Decision Hierarchy

When documents conflict, use this order:

1. Current approved business/product decisions
2. Current working repository and verified production behavior
3. Decision.md
4. PRD.md
5. Architecture.md
6. Rules.md
7. Design.md
8. Commits.md
9. Memory.md
10. Older planning documents

A newer explicit founder instruction overrides an older planning assumption.

Do not revive obsolete architecture, pricing, checkout systems, or product tiers from historical materials.

# 2. Core Project Decision

PillowDreamWorks Foundation will be rebuilt as a premium, editorial, founder-led psychology and wellbeing website.

It must not resemble:
- a generic AI-generated landing page
- a generic SaaS product
- a hospital website
- a meditation-app clone
- an e-commerce template
- a dashboard disguised as a marketing website

Brand idea:

> Calm on the surface. Ambition underneath.

# 3. Framework Decision

Approved:
- Next.js 15
- React 19
- TypeScript
- App Router
- Tailwind CSS v4
- shadcn/ui
- Motion.dev
- Lucide React
- Kokonut UI
- Bklit UI

This migration is intentional because the website requires reusable routes, interactive product experiences, filters, responsive systems, SEO, maintainable content and centralized business data.

# 4. Deployment Decision

GitHub repository:
https://github.com/pillowdreamwork/pillowdreamworks-site

Current baseline:
https://pillowdreamwork.github.io/pillowdreamworks-site/

Target Vercel:
https://pillowdreamworks.vercel.app

Connect Vercel to GitHub. Use preview deployments for review. Production deployment must come from the production branch after verification.

# 5. Git Decision

Primary rebuild branch:
`rebuild-v2`

Do not make destructive changes directly on `main`.

Use small, recoverable commits. Update Memory.md after meaningful milestones. Any AI taking over must recover from Git history and Memory.md rather than restart the project.

# 6. Payment / Checkout Decision

**Lemon Squeezy and ParityDeals have been removed from the current plan.**

Do not install, recreate, preserve, or advertise Lemon Squeezy as the active checkout.

Do not install, recreate, preserve, or advertise ParityDeals as the active purchasing-power pricing system.

Do not revive Stripe, Razorpay, or another processor from older documents unless a future explicit instruction approves one.

The current rebuild must separate:
- product presentation
- displayed pricing
- purchase CTA architecture
- payment implementation

The UI must never claim that a payment integration is live when no approved payment implementation is available.

# 7. Pricing Architecture Decision

Pricing is centralized in structured data, e.g.:

`data/pricing.ts`

Never duplicate a price directly in JSX or page-specific components.

The exact supplied prices must remain consistent everywhere they appear.

# 8. Product Pricing Decision

## The Psychology Toolkit

Regular:
- India: ₹1,224
- Global: $127

Diwali campaign values supplied:
- India: ₹999
- Global: $89

Campaign end date supplied:
- November 8, 2026

## Finding The Centre

eBook:
- India: ₹349
- Global: $14.99

Print:
- India: ₹1,449
- Global: $24.99

## Bundle

- India: ₹1,079
- Global: $83

Bundle:
- Psychology Toolkit
- Finding The Centre eBook

Do not invent a different bundle price.

# 9. Psychological Assessment Pricing Decision

| Assessment | India | Global |
|---|---:|---:|
| HAM-A | ₹1,499 | $55 |
| BDI-II | ₹1,499 | $55 |
| CAPS-5 | ₹2,999 | $174 |
| 16PF | ₹2,999 | $104 |
| Rorschach (ROR) | ₹3,499 | $209 |
| TAT | ₹2,999 | $174 |
| MMPI | ₹3,999 | $209 |
| SSCT | ₹1,999 | $69 |
| HTP | ₹1,999 | $69 |
| HFDT | ₹1,999 | $69 |
| WAIS-IV / MISIC | ₹4,999 | $244 |
| Bender Visual-Motor Gestalt II | ₹2,999 | $104 |
| CAARS | ₹2,499 | $90 |
| ADOS-2 | ₹4,999 | $244 |
| PANSS | ₹2,999 | $104 |
| CAT | ₹2,499 | $104 |

Do not substitute currency conversions or rounded alternatives.

# 10. Services Pricing Decision

## Counselling

| Service | India | Global |
|---|---:|---:|
| Counselling Session (50 min) | ₹1,499 | $18 |
| Counselling Package of 4 | ₹5,996 | $72 |
| Counselling Package of 8 | ₹11,992 | $144 |

## Crisis / Support

| Service | India | Global |
|---|---:|---:|
| Crisis Stabilization Call | ₹399 | $5 |
| CentreLine Support | ₹299 | $4 |

## Graphology

| Service | India | Global |
|---|---:|---:|
| Graphology Basic Reading | ₹399 | $5 |
| Graphology Standard Reading | ₹799 | $10 |
| Graphology Deep Reading | ₹1,199 | $15 |

## Courses

| Course | India | Global |
|---|---:|---:|
| Crisis Counselling Course | ₹999 | $12 |
| Cognitive Counselling Course | ₹999 | $12 |
| Complete Course Bundle | ₹1,499 | $18 |

# 11. Assessment Safety Decision

Assessment pages must never imply that an online screening experience automatically equals diagnosis.

Do not invent:
- validity statistics
- clinical outcomes
- population claims
- credentials
- scientific claims

Where an instrument has licensing or purchaser restrictions, do not activate production purchasing until the delivery model has been verified by the appropriate business/legal/professional authority.

# 12. Brand Decision

PillowDreamWorks Foundation is the master brand.

Books, Assessments, Services, Learn, Founder and Resources must feel like one ecosystem.

Do not design pages as unrelated microsites.

# 13. Homepage Decision

Approved narrative:

1. Emergency Banner
2. Navigation
3. Hero
4. Foundation / What We Create
5. Problem / Reader Context
6. Books
7. Assessments
8. Services
9. Learn
10. Founder
11. Resources / Next Step
12. Final CTA
13. Footer

# 14. Hero Decision

Explore three directions before selecting the final treatment:

- Editorial / Magazine
- Cinematic / Immersive
- Minimal / Premium

The chosen hero must:
- communicate purpose immediately
- state a useful reader benefit
- use real product imagery where available
- have one dominant action
- keep emergency help visually distinct from sales CTAs

# 15. Books Decision

Books are one ecosystem:

1. The Psychology Toolkit
2. Finding The Centre

The homepage may present both through a premium horizontal showcase.

The carousel must communicate title, purpose, visual and CTA and must support touch, keyboard and reduced motion.

# 16. Psychology Toolkit Decision

Flagship publication.

Journey:
`Understand → Reflect → Practice → Track → Grow`

Chapters:
1. Understanding Yourself
2. Thoughts & Mindset
3. Anxiety & Stress
4. Relationships & Boundaries
5. Habits & Personal Growth

# 17. Finding The Centre Decision

Remain distinct from the Toolkit while staying inside Books.

Show only supplied/verified information:
- cover
- interior previews
- formats
- purpose
- audience
- related bundle

Do not invent physical specifications.

# 18. Founder Decision

Show:
- founder story
- philosophy
- why PillowDreamWorks exists
- why the books were created
- selected reflections
- supplied social links

Use the actual supplied portrait without AI stylization or alteration.

# 19. Learning Decision

Learn includes:
- PsychSnaps
- short psychology lessons
- Articles
- Founder Notes
- Reflection Prompts
- Resources

Do not invent content just to fill a card grid.

# 20. Emergency / Crisis Decision

Safety information outranks marketing.

Emergency access must be easy to find from every major page.

CentreLine must not be represented as an emergency service if the supplied content says otherwise.

# 21. Legal Decision

Required routes:
- Privacy
- Terms
- Refund
- Cookie
- Disclaimer

AI may structure and style supplied legal text but must not invent legal policy language without approval.

# 22. Visual Design Decision

Default-off patterns:
- harsh gradients
- purple/black neon styling
- rainbow colors
- giant radial blobs
- dot-grid backgrounds
- excessive glassmorphism
- sparkle icons
- emoji icons
- repetitive 3-column cards
- fake testimonials
- fake statistics
- fake awards
- meaningless terminal decoration
- random animated arrows
- excessive glowing borders

Preferred:
- editorial composition
- asymmetric layouts
- strong typography
- real imagery
- generous whitespace
- restrained motion
- meaningful interaction

# 23. Motion Decision

Use Motion.dev (`motion/react`).

Motion is allowed for:
- hover
- drag
- layout transitions
- accordion transitions
- scroll reveals
- carousel interaction

Do not add animation merely because the library supports it.

Respect `prefers-reduced-motion`.

# 24. Component Library Decision

Use 21st.dev for discovery and component comparison.

Use Kokonut UI, shadcn/ui and Bklit UI only where a component genuinely improves the experience.

PillowDreamWorks design tokens always override library defaults.

# 25. Performance Decision

Target:
- Lighthouse 90+
- minimal JavaScript
- optimized images
- lazy loading where appropriate
- no unnecessary third-party scripts
- no duplicated dependencies

Use Server Components by default.

# 26. Accessibility Decision

Target WCAG 2.1 AA-level behavior:
- keyboard operation
- visible focus
- semantic HTML
- appropriate ARIA
- sufficient contrast
- reduced motion
- usable touch controls

# 27. SEO Decision

Every public page requires:
- unique title
- meta description
- canonical
- Open Graph metadata
- correct heading structure
- sitemap
- robots
- structured data where supported by real content

Never create unsupported review or rating schema.

# 28. Content Integrity Decision

Never invent:
- testimonials
- ratings
- reviews
- user counts
- credentials
- awards
- media logos
- clinical statistics
- outcome claims
- business addresses
- phone numbers

Missing production data must be flagged in Memory.md.

# 29. AI Handoff Decision

Every future AI must read:

1. Decision.md
2. PRD.md
3. Architecture.md
4. Rules.md
5. Design.md
6. Commits.md
7. Memory.md

Skills determine HOW the agent works. These project documents determine WHAT it builds.

# 30. Completion Decision

The rebuild is complete only when:
- architecture is stable
- homepage is complete
- Books ecosystem is complete
- assessment catalog is complete
- services are complete
- Learn is functional
- contact works
- legal routes are connected
- prices are centralized and verified
- responsive layouts work
- accessibility is tested
- SEO is implemented
- performance is tested
- GitHub is synchronized
- Vercel deployment is verified
- known production placeholders and broken links are resolved

END OF DECISION.md
