# API Integration

This document maps every frontend feature to the backend endpoint it consumes. All requests go through Next.js Server Actions or server-side `fetch` calls (never directly from the browser), using `process.env.BACKEND_API_URL` as the base and the `accessToken` cookie for authenticated requests.

Backend source: `rent-nest-server` (Express + Prisma). One endpoint below (`GET /api/landlord/properties`) did not exist in the original API and was added to the backend during this integration — see the note in the Landlord section.

---

## Auth

| Frontend | Server Action | Endpoint |
|---|---|---|
| `/register` — `RegisterForm` | `authActions.ts` → `registerAction` | `POST /api/auth/register` |
| `/login` — `LoginForm` | `authActions.ts` → `loginAction` | `POST /api/auth/login` |
| Current user everywhere (Navbar, `ProfileDropdown`, dashboard layout guards, proxy-adjacent checks) | `lib/getMe.ts` | `GET /api/auth/me` |

## Categories

| Frontend | Server Action | Endpoint |
|---|---|---|
| Property filters, landlord property form, home page | `(public)/_actions/getCategories.ts` | `GET /api/categories` |
| `/dashboard/admin/categories` — Add Category | `categoryActions.ts` → `createCategory` | `POST /api/categories` |
| `/dashboard/admin/categories` — Edit Category | `categoryActions.ts` → `updateCategory` | `PATCH /api/categories/:id` |
| `/dashboard/admin/categories` — Delete Category | `categoryActions.ts` → `deleteCategory` | `DELETE /api/categories/:id` |

## Properties (public + landlord CRUD)

| Frontend | Server Action | Endpoint |
|---|---|---|
| `/` — Featured Properties | `lib/getFeaturedProperties.ts` | `GET /api/properties` |
| `/properties` — Browse & filter | `lib/property.ts` → `getProperties` | `GET /api/properties` |
| `/properties/[id]` — Detail page | `(public)/_actions/getSingleProperty.ts` | `GET /api/properties/:id` |
| `/dashboard/landlord/properties/[id]/edit` — prefill (reuses the public detail fetch) | `(public)/_actions/getSingleProperty.ts` | `GET /api/properties/:id` |
| `/dashboard/landlord/properties/new` — Create | `propertyActions.ts` → `createProperty` | `POST /api/properties` |
| `/dashboard/landlord/properties/[id]/edit` — Save, and the availability toggle on the properties list | `propertyActions.ts` → `updateProperty` | `PATCH /api/properties/:id` |
| `/dashboard/landlord/properties` — Delete | `propertyActions.ts` → `deleteProperty` | `DELETE /api/properties/:id` |

## Rentals (tenant)

| Frontend | Server Action | Endpoint |
|---|---|---|
| Property detail — "Request to Rent" dialog | `properties/_actions/rentalActions.ts` → `createRentalRequest` | `POST /api/rentals` |
| `/dashboard/tenant/rentals` — My Rentals list | `rentals/_actions/getMyRentals.ts` | `GET /api/rentals` |
| `/dashboard/tenant/rentals/[id]` — Detail page | `rentals/_actions/getSingleRentals.ts` | `GET /api/rentals/:id` |

## Landlord

| Frontend | Server Action | Endpoint |
|---|---|---|
| `/dashboard/landlord` — Overview stats | `landlord/_actions/getDashboard.ts` | `GET /api/landlord/dashboard` |
| `/dashboard/landlord/requests` — Request list + status filter tabs | `requests/_actions/getRequests.ts` | `GET /api/landlord/requests` |
| `/dashboard/landlord/requests` — Approve / Reject (optimistic) | `requests/_actions/updateRequestStatus.ts` | `PATCH /api/landlord/requests/:id` |
| `/dashboard/landlord/properties` — My Properties list | `properties/_actions/getProperties.ts` | `GET /api/landlord/properties` **(new)** |

> **New endpoint:** the original API had no way for a landlord to list their own properties — the only listing endpoint is public and filters to `isAvailable: true`, which would hide anything a landlord marked unavailable/rented. `GET /api/landlord/properties` was added to `rent-nest-server` (`landlord.route.ts` / `.controller.ts` / `.service.ts` / `.interface.ts`), mirroring the existing `GET /api/landlord/requests` pattern: paginated, scoped to the authenticated landlord, includes category, computed `averageRating`/`totalReviews`, and a rental-request count.

## Payments (Stripe)

| Frontend | Server Action | Endpoint |
|---|---|---|
| Rental detail / rentals table — "Pay Now" button | `payments/_actions/createPayment.ts` | `POST /api/payments/create` |
| `/dashboard/tenant/payments` — Payment history | `payments/_actions/getPayments.ts` | `GET /api/payments` |
| `/payment/success` — confirm the just-completed payment | `payment/_actions/getLatestPayment.ts` | `GET /api/payments?limit=1` |
| `/dashboard/tenant/payments/[id]` — Detail page | `payments/_actions/getSinglePayment.ts` | `GET /api/payments/:id` |
| — | *(Stripe → backend only, no frontend call)* | `POST /api/payments/webhook` |

The frontend never talks to Stripe.js directly — `createPayment` returns a hosted Stripe Checkout URL and the browser is redirected via `window.location.href`. Stripe redirects back to `/payment/success?session_id=...` or `/payment/cancel` (confirmed from the backend's `payment.service.ts`, not guessed).

## Reviews

| Frontend | Server Action | Endpoint |
|---|---|---|
| Property detail page — public review list | `rentals/_actions/reviewActions.ts` → `getPropertyReviews` | `GET /api/reviews/property/:propertyId` |
| Tenant rental detail — review eligibility check (same call, used to detect "already reviewed") | `rentals/_actions/reviewActions.ts` → `getPropertyReviews` | `GET /api/reviews/property/:propertyId` |
| Tenant rental detail — "Leave a Review" dialog | `rentals/_actions/reviewActions.ts` → `createReview` | `POST /api/reviews` |
| Tenant rental detail — Edit review dialog | `rentals/_actions/reviewActions.ts` → `updateReview` | `PATCH /api/reviews/:id` |
| Tenant rental detail — Delete review dialog | `rentals/_actions/reviewActions.ts` → `deleteReview` | `DELETE /api/reviews/:id` |

There is no "list all reviews" endpoint, so the homepage testimonials section uses curated static copy rather than live data — flagged here rather than silently faked.

## Admin

| Frontend | Server Action | Endpoint |
|---|---|---|
| `/dashboard/admin` — Overview stats | `admin/_actions/getDashboard.ts` | `GET /api/admin/dashboard` |
| `/dashboard/admin/users` — search, role filter, pagination | `users/_actions/getUsers.ts` | `GET /api/admin/users` |
| `/dashboard/admin/users` — Ban / Unban | `users/_actions/updateUserStatus.ts` | `PATCH /api/admin/users/:id` |
| `/dashboard/admin/properties` — moderation view | `properties/_actions/getProperties.ts` | `GET /api/admin/properties` |
| `/dashboard/admin/rentals` — moderation view | `rentals/_actions/getRentals.ts` | `GET /api/admin/rentals` |

> The `GET /api/admin/users` select clause was also missing `isBanned`, so the ban/unban button had no way to know a user's current state. That one field was added to the existing query (`admin.service.ts`) — no new endpoint, no behavior change.

## Tenant

| Frontend | Server Action | Endpoint |
|---|---|---|
| `/dashboard/tenant` — Overview stats + recent rentals | `tenant/_actions/getDashboard.ts` | `GET /api/tenant/dashboard` |

---

## Auth on requests

Every authenticated action reads the `accessToken` cookie (set by `loginAction`, `httpOnly`) via `next/headers` and sends it as `Authorization: Bearer <token>` — never exposed to client-side JavaScript. Route access is additionally gated by `proxy.ts` (Next's middleware) and by a `getMe()` + role check in each dashboard section's `layout.tsx`.
