# VibeFix

AI-powered maintenance SaaS for non-technical founders.

## Stack
- React + Tailwind CSS (frontend)
- Supabase Auth + Postgres
- Claude API (`claude-sonnet-4-20250514`) via API routes
- Razorpay checkout (test mode)

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Required Environment Variables
- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `RAZORPAY_KEY_ID`
- Frontend-prefixed variants for Vite:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_RAZORPAY_KEY_ID`

## Pages
- `/` Landing + AI Diagnosis MVP
- `/pricing` Plans + Razorpay + FAQ
- `/auth` Email/password login and signup
- `/dashboard` Hosted apps status and request-fix controls

## Deploy
- Vercel or Railway recommended.
- Configure environment variables and Supabase schema from `supabase/schema.sql`.
