# DALALI web app

The web version of Dalali Msomi, built with Next.js and styled from the DALALI brand guide (`../Design.pdf`).

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's included (v0.1)

| Page | Path |
|---|---|
| Home: hero search, categories, latest listings | `/` |
| Search with filters (category, price, bedrooms, furnishing, area, sort) | `/search` |
| Property detail | `/property/[id]` |
| Request a viewing and confirmation | `/property/[id]/request` |
| Sign in / Create account (seeker or dalali) | `/signin`, `/signup` |
| Profile (viewing requests, saved) | `/profile` |
| Saved properties | `/saved` |
| Settings (profile, notifications, light/dark theme) | `/settings` |
| Help & Support, Terms, Privacy | `/help` |

Not included yet: chat, posting a listing, payments/escrow. KYC is left out on purpose.

## Sample data and connecting the backend

The app currently runs on sample data, so it works without a server:

- **Listings and dalalis:** `lib/mock-data.ts`, read only through `lib/api.ts`.
- **Accounts, saved properties and viewing requests:** `lib/store.tsx`, stored in the browser's localStorage.

To connect the same backend as the Android app and admin dashboard, replace the function bodies in `lib/api.ts` and the sign-in, sign-up, save and request functions in `lib/store.tsx`. The pages don't need to change.

## Brand

Colours, fonts (Unbounded + Figtree) and dark mode are defined as CSS variables at the top of `app/globals.css`.
