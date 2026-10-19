# PillowDreamWorks Foundation — Site

Editorial psychology and wellbeing site built with Next.js (App Router), React 19, Tailwind CSS v4 and Motion. Production is served from [www.pillowdreamworks.com](https://www.pillowdreamworks.com/) via Vercel.

## Setup

```bash
npm ci          # install exactly what the lockfile pins
npm run build   # production build
npm run start   # serve the production build (default port 3000)
```

## Pricing

All published prices live in **one** file: `data/pricing.ts`.

- Books, the 16 practitioner-administered paid batteries, services, courses and the shared
  checkout notice are read from there by every page and component.
- Never hardcode a price in JSX or copy. If a price changes, change it in `data/pricing.ts`.
- `data/assessments-full-catalog.ts` (the 177-entry catalog) imports `PAID_ASSESSMENT_PRICES`
  from `data/pricing.ts` so the catalog and the pricing page cannot drift.

## Testing (Playwright)

```bash
npm test                        # full suite: assessments + site smoke checks
npm run test:assessment-centre  # scoring/interpretation harness only
```

The suite drives a **production build**. `next dev` does not hydrate reliably in headless
containers, and the assessment harness is client-rendered, so the config starts
`npm run build && npx next start -p 4173` automatically (and reuses an already-running
server on port 4173 if you started one yourself).

### Headless/minimal Linux containers

Chromium needs shared libraries and fontconfig that slim containers often lack. If you
have root, install them normally (`libnss3`, `libnspr4`, `libatk1.0-0`, `libatk-bridge2.0-0`,
`libcups2`, `libdrm2`, `libgbm1`, `libxkbcommon0`, `libasound2`, `libpango-1.0-0`,
`libcairo2`, `fonts-dejavu-core`). Without root, unpack the same packages into a local
prefix and expose them to the test process:

```bash
mkdir -p /tmp/pwdeps && cd /tmp/pwdeps
apt-get download libnspr4 libnss3 libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 \
  libdrm2 libgbm1 libxkbcommon0 libasound2t64 libpango-1.0-0 libcairo2 fonts-dejavu-core
for f in *.deb; do dpkg -x "$f" .; done

export LD_LIBRARY_PATH=/tmp/pwdeps/usr/lib/x86_64-linux-gnu:/tmp/pwdeps/lib/x86_64-linux-gnu
export FONTCONFIG_FILE=/tmp/fonts.conf
npx playwright test --reporter=line
```

`/tmp/fonts.conf` is a minimal fontconfig file pointing at the unpacked DejaVu fonts:

```xml
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>/tmp/pwdeps/usr/share/fonts</dir>
  <cachedir>/tmp/font-cache</cachedir>
</fontconfig>
```

These libraries and config files stay outside the repository — they are environment
workarounds, not project dependencies.

## Documentation map

- `PRD.md` — product requirements and sitemap
- `Decision.md` — architecture, pricing and content decisions
- `Design.md` — design system rules
- `Rules.md` — non-negotiable content rules (no invented credentials, prices or testimonials)
- `Architecture.md` — technical structure
- `Commits.md` / `Memory.md` — delivery log and working memory
- `ASSESSMENT_SOURCE_REGISTRY.md` / `ASSESSMENT_SOURCE_REVIEW_TODO.md` — per-instrument
  scoring provenance and review status
