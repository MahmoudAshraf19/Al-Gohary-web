# Ishaleeh — Premium Saudi Booking Platform

A production-grade, bilingual (EN default / AR full RTL) booking website for chalets, villas, farms, resorts and private stays across Saudi Arabia, reading live content from your existing Firebase `ishaleeh` project.

## Confirmed decisions

- Backend: your existing Firebase project (Firestore, Auth, Storage, Analytics) via the Firebase Web SDK.
- Content: real Firestore collections — no placeholder/demo datasets.
- Palette: olive/beige as given (`#283618`, `#606C38`, `#BC6C25`, `#DDA15E`, `#FEFAE0`), logo used as-is.
- Delivery: phased, foundation first.

## What I need from you before Phase 1 code

1. The Firebase Web config values (`apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`, `measurementId`). These are public client values — I will store them as environment variables, never Admin SDK / service-account keys.
2. A short description of the actual Firestore shape: collection names and the key fields for properties, destinations, categories, offers, reviews, bookings, plus confirmation that `/settings/contact` and `/settings/Version` exist as documents (or Realtime Database paths).

If the schema description is unavailable, I will read a few sample documents from each collection through the client SDK and generate typed models from what is actually there.

## Phase 1 — Foundation (this plan's build scope)

**Design system**
- Olive/beige tokens in `src/styles.css` (oklch), spacing/radius/shadow scale, typography pairing with full Arabic support.
- Reusable primitives: buttons (primary/secondary/outline/ghost/destructive), inputs, select, date range picker, guest selector, checkbox/radio/toggle, badge, card, modal, drawer, dropdown, tooltip, toast, tabs, accordion, breadcrumbs, pagination, skeletons.

**Localization & RTL**
- Lightweight i18n provider with EN/AR dictionaries, persisted language, `dir` switching on `<html>`, logical CSS properties throughout so layout mirrors rather than just translating.

**Layout**
- Sticky header with logo, primary nav, search, language switcher, auth-aware account menu; transparent-over-hero on home, solid elsewhere; mobile drawer navigation.
- Multi-column footer with legal, explore, company, support columns and contact block bound to `/settings/contact`.

**Firebase layer**
- Client init from env vars, plus a repository layer (`properties`, `destinations`, `categories`, `offers`, `reviews`, `settings`) so UI never issues raw queries.
- TanStack Query wrappers with pagination, caching and typed DTOs; graceful hiding of empty settings fields.

**Pages in Phase 1**
- Home (hero search, featured destinations, categories, recommended / trending / best rated / new listings, offers, why Ishaleeh, app promo from `/settings/Version`, host CTA, testimonials, FAQ preview).
- Explore + Search Results (filters sidebar on desktop, bottom sheet on mobile, sort, grid/list, pagination, loading/empty/error states).
- Property Details (gallery, header, overview, amenities, availability calendar, transparent price breakdown, host card, location, rules, reviews, similar stays).
- Branded 404.

Every section ships with skeleton loading, empty and error states, responsive grids (4/3/2 → 2 → 1) and per-route SEO metadata.

## Later phases (planned, not built in Phase 1)

- **Phase 2:** Auth (email/password, Google, Apple, phone, reset/verify), account area (profile, bookings, favorites, recently viewed, reviews, notifications, security, settings, delete account).
- **Phase 3:** Booking flow (dates → guests → review → guest info → payment → confirmation) with client-side validation and server-side confirmation, notifications centre.
- **Phase 4:** Destinations & categories detail pages, offers page, become-a-host, contact, help centre, FAQ.
- **Phase 5:** Full legal suite (terms, privacy, cookies, cancellation, refund, booking, host/guest terms, community, copyright/IP, accessibility, safety) plus content-reporting UI (report property/review/media/user, copyright complaint).
- **Phase 6:** Analytics events, cookie consent, performance and accessibility hardening, sitemap/robots.

## Technical notes

- Stack stays TanStack Start + TanStack Router/Query + Tailwind v4; file-based routes matching the requested URL structure.
- Firebase Web SDK on the client; any privileged operation (booking confirmation, payment verification, moderation) goes through a server function or Cloud Function — never Admin credentials in the browser.
- Realtime listeners only where they earn their cost: booking status, notifications, availability. Everything else uses paginated one-shot queries.
- Logo uploaded to CDN assets and used in navbar, footer, auth screens, confirmation and favicon without redesign.
