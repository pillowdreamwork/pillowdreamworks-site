# Rules.md — PillowDreamWorks Foundation (Master v2.0)

**Purpose:** Mandatory engineering rules for Antigravity, Claude, GPT, Cursor, Windsurf, or any AI working on this repository.

Repository: https://github.com/pillowdreamwork/pillowdreamworks-site
Current Site: https://pillowdreamwork.github.io/pillowdreamworks-site/
Target: https://pillowdreamworks.vercel.app

---

# 1. Non-Negotiable Rules

1. Never overwrite working code without a Git checkpoint.
2. Never invent testimonials, reviews, statistics, awards, or credentials.
3. Never hardcode prices inside components.
4. Preserve emergency and crisis content exactly.
5. Maintain accessibility before visual polish.
6. Every change must compile without TypeScript errors.
7. Every feature must work on mobile first.
8. Push only reviewed commits to main.

---

# 2. Approved Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion.dev
- Kokonut UI
- Bklit UI
- Lucide React

Do not introduce additional UI frameworks.

---

# 3. Design Rules

## Use

- Editorial layouts
- Asymmetry
- Strong typography
- Ivory, Navy, Sage, Gold palette
- Purposeful animation
- Large whitespace
- Real product imagery

## Avoid

- Purple gradients
- Rainbow colors
- Glassmorphism everywhere
- Emoji icons
- Sparkles
- Dot grids
- Radial blobs
- Generic SaaS cards
- Fake testimonials
- Three pricing tiers

---

# 4. Accessibility

Required on every page:

- Semantic HTML
- Keyboard navigation
- Focus indicators
- ARIA labels
- Alt text
- Reduced motion
- Contrast AA

---

# 5. Performance Budget

- Lighthouse ≥ 90
- CLS < 0.1
- Lazy-load images
- WebP assets
- Dynamic import heavy components

---

# 6. SEO Rules

Every page requires:

- Title
- Meta description
- Canonical URL
- Open Graph
- Twitter Card
- Structured Data

---

# 7. Coding Standards

- Use TypeScript strict mode.
- Components under 250 lines where practical.
- Reusable UI inside /components.
- Data separated into /data.
- Never duplicate business logic.

---

# 8. Error Handling

Forms must include:

- Loading state
- Success state
- Error message
- Retry action

Never fail silently.

---

# 9. Git Rules

Branch naming:

feature/homepage
feature/books
feature/assessments

Commit format:

feat(home): rebuild editorial hero
fix(pricing): update toolkit price
refactor(nav): mobile navigation

---

# 10. QA Checklist

Before merging:

- Mobile responsive
- No console errors
- No broken links
- No placeholder content
- Accessibility pass
- SEO metadata complete
- Prices verified
- Images optimized

This Rules.md is mandatory for every contributor and overrides personal coding preferences.
