# Architecture.md — PillowDreamWorks Foundation (Master v2.0)

**Project:** React/Next.js Architecture  
**Repository:** https://github.com/pillowdreamwork/pillowdreamworks-site  
**Current Site:** https://pillowdreamwork.github.io/pillowdreamworks-site/  
**Target Deploy:** https://pillowdreamworks.vercel.app

## 1. Technology Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui |
| Motion | motion.dev |
| Components | Kokonut UI |
| Charts | Bklit UI |
| Icons | Lucide React |
| Hosting | Vercel |
| Version Control | GitHub |

## 2. Folder Structure

```text
app/
  page.tsx
  books/
  assessments/
  services/
  learn/
  about/
  contact/
  pricing/
  legal/

components/
  ui/
  site/
  books/
  assessments/

lib/
hooks/
types/
data/
public/
```

## 3. Routes

- `/` Home
- `/books`
- `/books/psychology-toolkit`
- `/books/finding-the-centre`
- `/books/bundles`
- `/assessments`
- `/services`
- `/learn`
- `/about`
- `/contact`
- `/pricing`
- `/legal/privacy`
- `/legal/terms`
- `/legal/refund`
- `/legal/disclaimer`

## 4. Global Layout

1. Emergency Banner
2. Sticky Navigation
3. Page Content
4. WhatsApp Floating Button
5. Footer

## 5. Data Layer

```ts
pricing.ts
assessments.ts
books.ts
services.ts
navigation.ts
```

Never hardcode prices inside components.

## 6. State Management

- React Server Components by default
- Client Components only where interaction is needed
- URL search params for filters
- No Redux

## 7. Images

```text
public/images/
  books/
  founder/
  assessments/
  icons/
```

Use next/image with lazy loading and WebP.

## 8. Performance

- Static generation for content pages
- Dynamic import for heavy carousels
- Image optimization
- Lighthouse target: 90+

## 9. Accessibility

- WCAG AA
- Keyboard navigation
- Visible focus
- ARIA labels
- Reduced motion support

## 10. GitHub Workflow

- Branch: rebuild-v2
- Feature branches per module
- Pull Request into main
- Vercel preview on every push

This Architecture document is the technical source of truth for every AI engineer working on the project.
