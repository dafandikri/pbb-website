# AGENTS.md — PBB Website

This file is a copy of CLAUDE.md for tooling compatibility (used by Codex, Copilot, etc.).

## Core Development Philosophy

### 1. Leave It Better Than You Found It

When working on any feature, if you encounter code that could be improved and the refactoring is small (< 100 lines), **do it now**. For larger refactorings, create a backlog issue.

### 2. YAGNI (You Ain't Gonna Need It)

Solve today's problem with the simplest solution that works. Avoid premature abstraction and overengineering.

### 3. Move Fast, Break Things (Pre-Launch)

We haven't launched yet. Don't worry about backwards compatibility unless explicitly requested.

### 4. Complexity Over Time Estimates

Estimate complexity, not hours: **Small** (< 100 lines), **Medium** (100-500), **Large** (500+, needs design), **XL** (architectural).

### 5. Package Manager

Always use `pnpm` — never npm/npx.

## Critical Development Practices (MUST FOLLOW)

- **ALWAYS read code thoroughly** — Trace the full flow, don't trust surface-level assumptions.
- **NEVER use `any` type** — Always infer or define proper types.
- **PREFER editing existing files** — Check if functionality already exists first.
- **PREFER integration tests** — They catch real-world issues.
- **When user says "I'm not convinced", dig deeper** — First solution was likely superficial.
- **Keep error handling simple** — No error codes, no translations (pre-launch).
- **Use mock markers in test data** — Keys must include `test`, `mock`, `dummy`, `example`, or `placeholder`.

## Git Operations Policy (CRITICAL)

**NEVER commit/push/create PRs automatically. ALWAYS wait for explicit user instruction.** Confirm before acting.

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

## Problem-Solving Approach

- **Read the entire flow** — Don't stop at the surface level.
- **Question initial assumptions** — If user says "not convinced", dig deeper.
- **Verify at the right layer** — Frontend bug? Check backend first.

## Common Pitfalls

- **Never auto-commit/push/PR** — Only when explicitly requested.
- **Don't create new files unnecessarily** — Extend existing implementations.
- **Never use `any` type** — Always find the proper type.
- **Don't use 'use client' unless needed** — Prefer Server Components.

## Code Quality Checklist

- [ ] TypeScript compiles (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Follow existing codebase patterns

## Remember

**"Perfect is the enemy of shipped."** — Ship fast, iterate based on feedback.

## Code Conventions

- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase (`HeroSection`)
- **Path alias:** `@/*` maps to project root
- **Server Components by default** — only add `'use client'` when needed
- **No `any` type** — always define or infer proper types
- **Import type** — use `import type` for type-only imports
- **No auto git operations** — wait for explicit user instruction
- **Use `pnpm`** — never npm/npx
