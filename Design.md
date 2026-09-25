# Design.md — PillowDreamWorks Foundation
## Master Visual & Interaction Design System v2.0

**Project:** PillowDreamWorks Foundation  
**GitHub:** https://github.com/pillowdreamwork/pillowdreamworks-site  
**Current Baseline:** https://pillowdreamworks.github.io/pillowdreamworks-site/  
**Target:** https://pillowdreamworks.vercel.app  

> This document defines how the website should look, feel, move, and behave. It must be applied to real PillowDreamWorks content rather than used as a generic UI template.

---

# 1. Design North Star

The product should feel:

**Calm on the surface. Ambitious underneath.**

Visual character:
- editorial
- intelligent
- human
- premium
- curious
- thoughtful
- grounded
- modern without chasing trends

The website should feel closer to an independent publication and psychology foundation than a generic wellness SaaS website.

# 2. Anti-Vibecoded Design Standard

Default-off:
- harsh gradients
- purple/black neon
- rainbow colors
- giant glowing blobs
- decorative dot grids
- excessive glassmorphism
- sparkle icons
- emoji icons
- endless floating cards
- identical three-column card rows
- heavy shadows
- huge rounded rectangles everywhere
- fake social proof
- fake metrics
- fake badges
- terminal-window decoration
- decorative cursor effects
- meaningless animated arrows
- random glowing borders

Use instead:
- editorial grids
- asymmetry
- large typography
- real product imagery
- varied section rhythm
- whitespace
- clear information hierarchy
- restrained motion

# 3. Brand Color System

Approved core palette:

```css
--c-ivory: #FAF9F5;
--c-cream: #F5F1E9;
--c-navy: #1A2A4A;
--c-sage: #8FA89E;
--c-gold: #C5A880;
```

Roles:

**Ivory:** primary page canvas.

**Cream:** secondary section background and product surfaces.

**Navy:** primary text, contrast sections, important actions.

**Sage:** calm accent, progress, secondary emphasis.

**Gold:** restrained premium accent, fine dividers and highlights.

Do not use page-wide gradients to simulate richness.

# 4. Color Restrictions

Do not add arbitrary brand colors to create visual excitement.

Avoid:
- electric blue
- neon green
- hot pink
- violet
- orange
- rainbow gradients

Semantic feedback colors may be introduced only when required for clear success/error/warning communication and accessibility. They must not become part of the decorative brand palette.

# 5. Typography

## Headings

**Libre Baskerville**

Weights:
- 400
- 600
- 700

Use for:
- H1
- H2
- major editorial headings
- product titles
- pull quotes

## Body and UI

**Inter**

Weights:
- 400
- 600

Use for:
- paragraphs
- navigation
- labels
- buttons
- forms
- price metadata
- filters

Do not introduce unrelated display fonts without an explicit design decision.

# 6. Typography Hierarchy

Suggested responsive starting values:

```text
Display: clamp(3rem, 7vw, 7rem)
H1:      clamp(2.6rem, 5vw, 5.5rem)
H2:      clamp(2rem, 3.5vw, 3.75rem)
H3:      clamp(1.35rem, 2vw, 2rem)
Body:    1rem–1.125rem
Small:   0.8125rem–0.9375rem
```

Use large display type selectively. Not every section should use giant headings.

# 7. Layout System

Recommended max content width:

`1200–1440px`

Recommended text measure:

`60–75ch`

Use editorial grid patterns such as:
- 7/5
- 8/4
- image/text split
- offset image
- oversized heading + narrow body copy
- full-width visual moments

Do not make every section two equal columns.

# 8. Spacing

Base unit:

`4px`

Preferred scale:

```text
4
8
12
16
24
32
48
64
80
96
128
160
```

Large narrative sections should have generous vertical rhythm.

Whitespace is part of the brand.

# 9. Radius

Use moderate rounding only where useful.

Suggested:
- buttons: 8–12px
- inputs: 8–12px
- interactive cards: 12–16px
- larger surfaces: 16–20px where justified

Editorial content may remain square or minimally rounded.

Avoid an everywhere-pill aesthetic.

# 10. Shadows and Borders

Prioritize:
- whitespace
- tonal contrast
- borders
- typography

Use shadows only where elevation is meaningful:
- floating controls
- overlays
- hover-lift
- modals

Do not apply large diffuse shadows to every card.

# 11. Buttons

## Primary

- navy surface
- high-contrast text
- strongest action on the current screen

## Secondary

- ivory/cream surface
- navy border/text

## Text action

Use for lower-priority navigation and editorial links.

Do not turn every link into a large CTA.

# 12. Emergency Banner

The emergency banner is safety infrastructure.

It must:
- remain clearly visible
- work on mobile
- be distinct from sales messaging
- have obvious emergency access
- never be hidden inside a carousel
- never visually resemble a promotional badge

# 13. Navigation

Desktop:
- Home
- Books
- Assessments
- Services
- Learn
- About
- Contact

Books:
- The Psychology Toolkit
- Finding The Centre
- Bundles

Learn:
- PsychSnaps
- Articles
- Resources

Mobile:
- large touch targets
- clear close action
- visible focus
- keyboard support
- simple hierarchy

Avoid excessive menu animation.

# 14. Hero Exploration

Before production implementation, explore three genuinely different treatments.

## A. Editorial / Magazine

- large serif headline
- asymmetric grid
- real book/product image
- editorial eyebrow
- generous whitespace
- concise support copy

## B. Cinematic / Immersive

- controlled dark contrast
- large real imagery
- layered typography
- subtle transitions
- no neon effects

## C. Minimal / Premium

- typography-first
- almost no decoration
- carefully positioned product visual
- large negative space

Do not code the first concept without comparing the alternatives.

# 15. Homepage Narrative

Approved order:

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

The homepage should feel editorial rather than like a catalog.

# 16. Foundation Section

Purpose:
Explain PillowDreamWorks before asking for a transaction.

Show the ecosystem:

`Books → Assessments → Services → Learn → Resources`

Use varied editorial composition rather than identical category cards.

# 17. Problem / Reader Context

Use only themes supported by current project content:
- feeling overwhelmed
- feeling stuck
- wanting better self-understanding
- wanting structured reflection
- looking for a next step

Do not manufacture clinical claims or exaggerated consequences.

# 18. Books Showcase

The Books section should feel like a curated publication shelf.

Use:
- real covers
- product titles
- concise purpose
- format where relevant
- CTA
- navigation controls

Avoid:
- fake bestseller labels
- fake ratings
- fake reviews
- three equal generic product cards

# 19. Book Carousel

Required:
- touch swipe
- mouse/trackpad interaction
- keyboard arrows
- previous/next buttons
- pagination
- visible active state
- pause on hover/focus if auto-rotation is implemented
- reduced-motion fallback

Motion should feel like moving through a considered collection, not an app demo.

# 20. Psychology Toolkit Product Page

Narrative:

1. Product identity
2. What the workbook is
3. Journey
4. Chapter progression
5. Sample pages
6. Exercises
7. Reflection areas
8. How it is used
9. Who it is for
10. What makes it different
11. Pricing
12. FAQ
13. Disclaimer
14. CTA

# 21. Chapter Progression

Journey:

`Understand → Reflect → Practice → Track → Grow`

Chapters:

1. Understanding Yourself
2. Thoughts & Mindset
3. Anxiety & Stress
4. Relationships & Boundaries
5. Habits & Personal Growth

Recommended treatment:
- vertical editorial timeline on desktop
- stacked/horizontal adaptation on mobile
- subtle Motion.dev reveals
- visible chapter numbering
- concise descriptions

Do not make every chapter a giant floating card.

# 22. Sample Pages

Use real workbook pages when available.

Interaction:
- horizontal swipe
- restrained perspective
- subtle desktop tilt where useful
- touch-friendly mobile interaction

The actual page image must remain the focus.

# 23. Exercises

A Bento-style composition is permitted only where it genuinely improves grouping and information hierarchy.

Each exercise item should communicate:
- exercise name
- what the user does
- purpose
- real preview when available

Checkmark animations should represent interaction/state rather than decoration.

# 24. Reflection Areas

Recommended:
- cream surface
- restrained border
- generous padding
- strong prompt typography
- optional real writing area

If a textarea exists:
- visible accessible label
- useful placeholder
- focus state
- privacy-aware data handling

Avoid blur/glass treatment unless it has a real interface reason.

# 25. How the Workbook Is Used

A three-step structure is appropriate because it communicates an actual process:

1. Choose a section
2. Reflect and complete exercises
3. Track what changes

Use Lucide icons and concise copy.

# 26. Who It Is For

Use audience categories supported by project materials.

Possible categories:
- self-development readers
- psychology learners
- reflective journalers
- people seeking structured self-exploration

Do not create demographic statistics or fake customer profiles.

# 27. What Makes It Different

Use a factual feature comparison:
- structured progression
- printable workbook
- reflection exercises
- psychology-oriented material
- companion ecosystem

Do not use unsupported competitor attacks.

# 28. Finding The Centre Page

Display:
- actual cover
- real interior previews where supplied
- eBook
- print
- purpose
- audience
- related bundle

Keep the product visually distinct from the Toolkit while clearly belonging to the Books family.

# 29. Pricing Presentation

Pricing should feel like part of the publication experience.

Show:
- price
- format
- inclusion
- campaign label if active
- CTA
- relevant policy link where applicable

Do not use:
- Starter / Pro / Enterprise tiers
- fake urgency
- fake countdowns
- invented discount anchors

# 30. Assessment Centre

Visual model:
- reference library
- category navigation
- search
- filters
- results

Assessment card:
- assessment name
- purpose
- category
- India price
- Global price
- description
- eligibility/status where verified
- CTA or status

Avoid neon dashboard styling.

# 31. Assessment Detail Page

Recommended order:

1. Assessment name
2. What it is
3. Intended purpose
4. Relevant audience
5. Administration/use details when verified
6. Duration when verified
7. Pricing
8. Disclaimer
9. Eligibility/licensing note where needed
10. CTA or clear status

Do not invent psychometric properties or clinical claims.

# 32. Services

Services should feel warmer and more human than the assessment catalog.

Provide varied layouts for:
- Counselling
- Crisis Counselling
- CentreLine
- Graphology / Graphotherapy

Avoid repeating the same component structure for every service.

# 33. CentreLine

Clearly communicate:
- what it is
- what it is not
- hours/availability
- limits
- how to request support
- minor consent requirements where applicable
- emergency pathway

# 34. Learn

Editorial content hub:

- PsychSnaps
- Articles
- Resources
- Founder Notes
- Reflection Prompts

Cards may use:
- title
- type
- topic
- excerpt
- real date/reading time when available

Do not create fake content to fill a grid.

# 35. Founder

Use the actual supplied portrait without AI modification.

Include:
- short introduction
- philosophy
- why the project exists
- why the books were created
- selected reflections
- approved social/contact links

Keep the presentation personal and restrained, not résumé-heavy.

# 36. Contact

Simple editorial form with:
- clear labels
- validation
- success/error state
- accessible controls
- large touch targets

Do not collect unnecessary sensitive information.

# 37. Footer

Include:
- brand
- main navigation
- Books
- Assessments
- Services
- Learn
- About
- Contact
- Legal
- Emergency access
- approved social links

Keep it calm and structured.

# 38. Motion System

Use Motion.dev through:

`motion/react`

Allowed:
- hover lift
- drag
- carousel transitions
- accordion transitions
- layout transitions
- small scroll reveals

Avoid:
- infinite floating
- cursor trails
- particles
- random parallax
- constant decorative animation

Suggested micro-interaction duration:

`100–300ms`

Respect:

`prefers-reduced-motion`

# 39. Mobile System

Design mobile first.

Test at:
- 320px
- 375px
- 390px
- 430px
- tablet
- 1440px+
- 1920px+

Must have:
- no horizontal overflow
- touch-friendly controls
- readable typography
- simple navigation
- swipable carousels
- stacked editorial content
- sticky elements that do not obscure content

# 40. Desktop System

Do not simply enlarge the mobile version.

For large displays:
- constrain text measure
- maintain whitespace
- preserve hierarchy
- use editorial asymmetry
- avoid giant empty regions

# 41. Images

Prefer:
- actual book covers
- actual workbook pages
- actual founder portrait
- real product screenshots

Use `next/image`.

Optimize assets and reserve aspect ratios.

Never replace supplied real assets with AI-generated stock.

# 42. 21st.dev Discovery Workflow

For each major UI area:

1. Search 21st.dev.
2. Review at least two relevant component directions.
3. Identify useful structural ideas.
4. Adapt to PillowDreamWorks tokens.
5. Remove generic styling.
6. Test keyboard accessibility.
7. Test mobile/touch behavior.
8. Keep the component only if it materially improves UX.

Do not copy complete third-party pages.

# 43. Kokonut UI

Use when genuinely useful for:
- interactive sections
- navigation
- accordions
- cards
- animation primitives

Adapt every component to PillowDreamWorks tokens.

# 44. Bklit UI

Use only when real data visualization adds value.

Never fabricate data to justify a chart.

# 45. Accessibility Visual Rules

Focus states must be obvious.

Do not communicate a state using:
- color alone
- hover alone
- animation alone

All functional states should remain understandable without motion.

# 46. Forms

Every input needs:
- accessible label
- validation/error state
- keyboard support
- visible focus
- appropriate autocomplete where relevant

Success/error messages should be announced appropriately.

# 47. Loading States

Skeletons are allowed for genuinely asynchronous content.

Do not add skeleton loaders simply because they are common on SaaS sites.

Static content should render directly whenever possible.

# 48. Final Visual Critic Checklist

## Hierarchy
- Is the purpose obvious?
- Is there a clear primary action?

## Brand
- Does it unmistakably feel like PillowDreamWorks?
- Could this belong to a generic AI website?

## Composition
- Is there enough whitespace?
- Is visual rhythm varied?
- Are cards overused?

## Typography
- Are headings strong but controlled?
- Is body copy comfortable?

## Interaction
- Does every animation have a purpose?
- Does it work on touch and keyboard?

## Accessibility
- Is focus visible?
- Is contrast sufficient?
- Does reduced motion work?

## Mobile
- Is anything overflowing or cramped?
- Does the page remain intentional?

## Integrity
- Are images approved/real?
- Are claims supported?
- Are prices from central data?

# 49. Definition of Premium

Premium does not mean:
- more gradients
- more effects
- more shadows
- more 3D
- more glass
- more animation

Premium means:
- excellent hierarchy
- strong typography
- confident restraint
- consistent spacing
- real imagery
- clear information
- thoughtful interaction
- excellent mobile behavior
- technical polish

# 50. Definition of Finished

The result should feel:

**Designed, not generated.**

**Editorial, not templated.**

**Human, not corporate.**

**Modern, not trend-chasing.**

**Calm, not lifeless.**

**Interactive, not overloaded.**

**Premium, not decorated for decoration's sake.**

The building agent must not be the only reviewer. A separate critic/QA pass is required before declaring a major page complete.

END OF DESIGN.md
