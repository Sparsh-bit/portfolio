# Sparsh Sharma — Portfolio

A new portfolio for **Sparsh Sharma** — UI/UX designer, developer and cinematographer — with a built-in **booking system** (website builds + booking-system integrations), powered by **Neon Functions + Neon Postgres**.

**UI/UX inspired by the Concilio Solutions design language:** light slate-and-teal palette, Bricolage Grotesque display type with Instrument Serif italics, IBM Plex Mono labels, Lenis smooth scrolling — plus **anime.js v4** motion and **Lightswind UI** components (MagneticButton, BorderBeam, CountUp, ShinyText, TextScrollMarquee, ScrollReveal, Spotlight, InteractiveGridBackground).

## Stack

- React 19 · Vite · TypeScript · Tailwind CSS v4
- anime.js v4 (scroll reveals, word-mask hero intro, particle burst, pinned horizontal rail, spotlight)
- Lightswind UI + framer-motion + Lenis
- Neon Functions (Hono) + Neon Postgres (`pg`) for the booking backend

## Project layout

```
src/
  components/     Chrome (header/page/eyebrow), Anim (anime.js toolkit), SmoothScroll (Lenis), lightswind/ (UI source)
  hooks/motion.ts anime.js reveal engine (data-reveal="up|fade|stagger|media|lines"), hero intro, 3D tilt
  lib/data.ts     All content (extracted from the old portfolio) + booking services
  lib/api.ts      Booking API client (slots + submit)
  sections/       Hero, About, Work, Skills, Experience, Booking, Contact
server/index.ts   The booking Function (Hono): GET /slots, POST /bookings, GET /admin/bookings
neon.ts           Neon infra-as-code: declares the bookingapi Function
scripts/migrate.mjs Creates the bookings table
```

## Booking system

Visitors pick a service (**Build my website** / **Add a booking system to my site**), choose a date + 60-minute IST slot (Sundays off, past days disabled, taken slots greyed out from live data), and submit their details. The request is stored in Neon Postgres with a reference like `SS-0001`; double-booking is blocked by a unique constraint on `starts_at`, bots by a honeypot field.

Deployed Function URL: `https://br-blue-cloud-bd0t5yfe-bookingapi.compute.c-8.us-east-2.aws.neon.tech`

### View bookings (admin)

```bash
curl -s "$FUNCTION_URL/admin/bookings" -H "x-admin-secret: <ADMIN_SECRET from .env.local>"
```

## Commands

```bash
npm run dev          # dev server
npm run build        # typecheck + build to dist/
npm run migrate      # create/update the bookings table
npm run deploy:function  # neon deploy --env .env.local (applies neon.ts + uploads Function env)
```

## Environment (`.env.local`, git-ignored)

- `DATABASE_URL` / `DATABASE_URL_UNPOOLED` — pulled automatically by `neon link` / `neon deploy`
- `ADMIN_SECRET` — secret for the admin bookings endpoint
- `VITE_BOOKING_API` — booking Function URL, injected into the frontend at build time

## Deploying the site

`dist/` is a static SPA — deploy to Cloudflare Pages, Netlify or Vercel. After changing the Function, re-run `npm run deploy:function`; after changing the Function URL, update `VITE_BOOKING_API` and rebuild.

## Content source

Bio, skills, experience, projects, socials and resume were extracted from the old portfolio (github.com/Sparsh-bit/portfolio); the featured client projects are Arab Divers, Dharniya, CosmicMuse and Concilio Solutions.
