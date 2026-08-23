# RentNest 🏠

**Find & List Rental Properties with Ease** — a modern, responsive rental marketplace where tenants browse and rent properties, landlords list and manage them, and admins moderate the platform.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Stripe Checkout**, consuming a separate Express/Prisma backend (`rent-nest-server`).

---

## Features

### Public
- Responsive property grid with optimized images (`next/image`), price, location, and amenities
- Advanced search & filters (location, category, price range, sorting) on `/properties`
- Property details page with an interactive multi-image gallery, amenities, description, landlord info, and public reviews
- Skeleton loading states and themed `error.tsx`/`not-found.tsx` fallbacks throughout

### Tenant
- Registration/login with Zod-validated forms (inline errors, password visibility toggle)
- "Request to Rent" flow with client-validated date-range picking
- Stripe Checkout payment flow, with dedicated `/payment/success` and `/payment/cancel` pages
- Dashboard: rental request history with status badges (Pending/Approved/Rejected/Completed), payment history, and a review form gated on completed + paid rentals

### Landlord
- Dashboard overview: total properties, active requests, earnings
- Property CRUD with a dynamic amenities tag input and an image-URL input with live thumbnail previews (broken URLs fall back gracefully, never a broken-image glyph)
- Availability toggle per listing (optimistic, reverts on failure)
- Rental request management with instant optimistic approve/reject (`useOptimistic`) and toast feedback

### Admin
- Platform-wide stats dashboard
- User management: search, role filter, pagination, ban/unban (with confirmation dialog)
- Read-only moderation views for all properties and all rental requests platform-wide
- Category CRUD

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, custom OKLCH theme, shadcn-style components (`@base-ui/react` primitives) |
| Forms | React Hook Form + Zod |
| Auth | JWT in an `httpOnly` cookie, verified in `proxy.ts` (Next's middleware) and in each dashboard's `layout.tsx` |
| Data fetching | Server Components + Server Actions (no client-side data-fetching library — `@tanstack/react-query` is installed but not used in this codebase) |
| Payments | Stripe Checkout (hosted, redirect-based — no Stripe.js/Elements needed) |
| Fonts | Geist Sans/Mono + Fraunces (display serif) via `next/font` |

---

## Getting Started

### Prerequisites

- Node.js 20+
- The backend (`rent-nest-server`) running locally or deployed — see its own README for setup

### Installation

```bash
pnpm install   # or npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_API_URL=http://localhost:5000
JWT_SECRET=<same value as the backend's JWT_ACCESS_SECRET>
```

- `BACKEND_API_URL` — base URL of the backend API (no trailing slash), used by every server action
- `JWT_SECRET` — **must match the backend's `JWT_ACCESS_SECRET` exactly.** The frontend's middleware (`proxy.ts`) and `lib/auth.ts` decode the JWT locally to read the user's role for route protection, without a round-trip to the backend

### Run

```bash
pnpm dev      # start the dev server at http://localhost:3000
pnpm build    # production build
pnpm start    # run the production build
```

---

## Project Structure

```
app/
├── (site)/              # Public-facing shell (Navbar + Footer)
│   ├── (auth)/          # /login, /register
│   ├── (public)/        # /, /properties, /properties/[id]
│   └── layout.tsx        
├── dashboard/           # Authenticated shell (top bar + sticky sidebar), no public nav/footer
│   ├── _components/     # Shared across all three roles (DashboardCard, Pagination, etc.)
│   ├── tenant/
│   ├── landlord/
│   └── admin/
├── payment/             # Standalone Stripe redirect targets (/payment/success, /payment/cancel)
├── layout.tsx           # Root layout — fonts, QueryProvider, Toaster only, no chrome
├── error.tsx             # Root error boundary (safety net for routes outside (site)/dashboard)
└── not-found.tsx

components/
├── ui/                  # shadcn-style primitives (Button, Card, Dialog, Input, Select, …)
└── shared/               # App-specific shared components (Navbar, Footer, PropertyImage, …)

lib/validations/          # Zod schemas (auth, property, rental, review, category)
config/dashboardMenus.ts  # Per-role sidebar nav config
proxy.ts                  # Route-protection middleware (Next 16's renamed middleware.ts)
```

Route groups — `(site)`, `(auth)`, `(public)` — don't affect URLs, only which layout wraps a page. `/dashboard/*` sits outside `(site)`, so it never gets the public navbar/footer.

Every feature folder follows the same pattern: a `page.tsx`, a `_components/` folder for UI local to that feature, and a `_actions/` folder of `"use server"` functions that call the backend with the `accessToken` cookie attached — there is no shared generic API client; each server action calls `fetch` directly against `BACKEND_API_URL`.

---

## Authentication & Route Protection

1. `POST /api/auth/login` returns a JWT, stored as an `httpOnly` cookie by the login Server Action.
2. `proxy.ts` (middleware) decodes the JWT on every matched request to redirect unauthenticated users to `/login` and enforce role-based access to `/dashboard/tenant`, `/dashboard/landlord`, and `/dashboard/admin`.
3. Each dashboard section additionally re-checks the user's role in its own `layout.tsx` (`getMe()` + redirect) as defense in depth.
4. Server Actions that mutate data (login, register, create/update/delete) never call `redirect()` server-side when invoked from a custom `onSubmit` handler (needed for Zod validation) — Next.js's Server Action `redirect()` isn't reliable when the action is dispatched programmatically instead of via native form submission. Instead they return a `redirectTo` path and the client component navigates with `router.push()`.

---

## Payments

The frontend never talks to Stripe.js directly. `POST /api/payments/create` returns a hosted Stripe Checkout URL; the browser is redirected via `window.location.href`. Stripe redirects back to `/payment/success?session_id=...` or `/payment/cancel`, which read the tenant's latest payment to show real (not assumed) status.

---

## API Integration

See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for the full mapping of every frontend feature to the backend endpoint it consumes, including two small additions made to the backend during this integration (`GET /api/landlord/properties`, and an `isBanned` field fix on the admin users query) — both require a backend redeploy to take effect if you haven't already.

---

## Deployment

Deploy on [Vercel](https://vercel.com/new) like any Next.js app. Set `BACKEND_API_URL` and `JWT_SECRET` as environment variables in the Vercel project settings, and make sure the backend's `APP_URL` points at this frontend's deployed URL (it's used to build the Stripe `success_url`/`cancel_url`).
