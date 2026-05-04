# AGENTS.md — PBB Website

This file is a copy of CLAUDE.md for tooling compatibility (used by Codex, Copilot, etc.).

## Project Overview

Company-profile website for Partai Bulan Bintang. Targets curious audiences and younger voters. Built with Next.js + Sanity CMS + Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components, ISR)
- **Language:** TypeScript (no `any`)
- **Styling:** Tailwind CSS 4
- **CMS:** Sanity (headless, self-hosted studio at `/studio`)
- **Database:** Supabase (Postgres for join form submissions)
- **Email:** Resend (join form notifications)
- **Hooks:** Husky (pre-commit: lint, pre-push: lint + build)

## Repository Structure

```
app/                # Next.js App Router (pages + api routes)
  api/join/         # Join form POST handler
  studio/           # Sanity Studio route (client-only)
  blog/             # Blog listing + [slug] detail
  events/           # Event listing + [slug] detail
  news/             # News listing + [slug] detail
components/         # Shared React components
  home/             # Homepage section components
  forms/            # JoinForm
  layout/           # Header, Footer
lib/                # API clients and helpers
  sanity/           # client.ts, queries.ts, types.ts
  supabase/         # client.ts
  email/            # sender.ts
sanity/             # Sanity Studio schemas
  schemas/          # page, news, event, blog, faq, pressKit, socialEmbed, joinForm
docs/               # Design docs and implementation plans
supabase/           # DB migrations
```

## Essential Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build (runs lint + typecheck)
pnpm lint         # ESLint check
pnpm start        # Start production server
```

## Architecture

### Frontend: Layout → Page → Component

- `app/layout.tsx` — root layout (header + footer + globals)
- `app/*/page.tsx` — server components that fetch data and compose UI
- `components/` — reusable UI, no data fetching (props only, except `LatestUpdates`)
- `lib/sanity/client.ts` — `sanityFetch<T>(query, params, fallback)` wrapper (returns fallback when Sanity unconfigured)

### Data Flow

- **Sanity fetch:** Server Components → `sanityFetch()` → GROQ → Sanity API (ISR 120s)
- **Join form:** Client → `POST /api/join` → Supabase insert + Resend email
- **Studio:** Client-only dynamic import (`ssr: false`) to avoid React 19 compatibility issues

## Code Conventions

- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase (`HeroSection`)
- **Path alias:** `@/*` maps to project root
- **Server Components by default** — only add `'use client'` when needed
- **No `any` type** — always define or infer proper types
- **Import type** — use `import type` for type-only imports
- **No auto git operations** — wait for explicit user instruction
- **Use `pnpm`** — never npm/npx
