# CLAUDE.md — PBB Website

## Core Development Philosophy

### 1. Leave It Better Than You Found It

When working on any feature, if you encounter code that could be improved and the refactoring is small (< 100 lines), **do it now**. For larger refactorings, create a backlog issue.

### 2. YAGNI (You Ain't Gonna Need It)

Solve today's problem with the simplest solution that works. Avoid premature abstraction and overengineering. Keep code flexible for future changes but don't build features "just in case".

### 3. Move Fast, Break Things (Pre-Launch)

We haven't launched yet. Don't worry about backwards compatibility unless explicitly requested. Make bold changes that improve the codebase without fear of breaking existing users.

### 4. Complexity Over Time Estimates

Estimate task complexity, not hours:
- **Small (S)**: < 100 lines, clear solution
- **Medium (M)**: 100-500 lines, some exploration needed
- **Large (L)**: 500+ lines, requires design/planning
- **Extra Large (XL)**: Major architectural changes

### 5. Package Manager

Always use `pnpm` — never npm/npx.

## Critical Development Practices (MUST FOLLOW)

- **ALWAYS read the code thoroughly and dig deeper** — Don't trust surface-level assumptions. When fixing bugs, trace through the entire flow.
- **NEVER use `any` type in TypeScript** — Always infer or define proper types.
- **PREFER editing/refactoring existing files over creating new ones** — Check if functionality already exists first.
- **PREFER integration tests over unit tests** — Integration tests catch real-world issues and validate the entire flow.
- **When user says "I'm not convinced", dig deeper** — The first solution was likely superficial.
- **Keep error handling simple** — Pre-launch. Simple messages, no error codes, no translations.
- **ALWAYS use test/mock/dummy markers in test data** — Mock API keys, tokens, and secrets MUST include `test`, `mock`, `dummy`, `example`, or `placeholder` in the value.

## Git Operations Policy (CRITICAL)

**NEVER perform git operations automatically. ALWAYS wait for explicit user instruction.**

- **NEVER commit automatically** — Only create commits when explicitly asked.
- **NEVER push automatically** — Only push when explicitly asked.
- **NEVER create PRs automatically** — Only create PRs when explicitly asked.
- **ALWAYS ask for confirmation** — When user requests git operations, confirm what you're about to do.

Valid requests: "commit this", "push to remote", "create a PR".
DO NOT commit for: completing a feature, fixing bugs, "leave it better" refactoring, end of conversation.

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

## Development Workflow

### Branch Naming

```
<name>/<type>/<description>
```

Examples:
- `dafandikri/feat/homepage`
- `dafandikri/fix/navbar-mobile`

### Commit Messages

```
feat(scope): description    # new feature
fix(scope): description     # bug fix
chore(scope): description   # tooling, config, deps
docs(scope): description    # documentation
```

Scopes: `home`, `news`, `events`, `blog`, `sanity`, `join`, `layout`, `infra`

## Code Conventions

- **Files:** kebab-case (`hero-section.tsx`)
- **Components:** PascalCase (`HeroSection`)
- **Path alias:** `@/*` maps to project root
- **Server Components by default** — only add `'use client'` when needed (event handlers, state, browser APIs)
- **No `any` type** — always define or infer proper types
- **Import type** — use `import type` for type-only imports
- **Color tokens** — use Tailwind utility classes over inline hex when possible
- **Error handling** — simple messages, no error codes, no translations (pre-launch)

## Sanity

- Studio accessible at `/studio` (dev only, self-hosted)
- Schema types: `page`, `news`, `event`, `blog`, `faq`, `pressKit`, `socialEmbed`, `joinForm`
- Content editors access via Sanity Manage dashboard or `/studio`
- `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`

## Problem-Solving Approach

### When Debugging Issues

1. **Read the entire flow** — Don't stop at the surface level.
2. **Question initial assumptions** — If user says "I'm not convinced", your first solution was likely superficial.
3. **Verify fixes at the right layer** — Frontend bug? Check if it's actually a backend issue first.

### When Writing Code

1. **Check for existing implementations first** — Don't create duplicate functionality.
2. **Type safety is non-negotiable** — TypeScript: no `any`.
3. **Test at the right level** — Integration tests for features, unit tests for pure logic.

## Common Pitfalls to Avoid

### General

1. **NEVER auto-commit/push/create PRs** — Only perform git operations when explicitly requested.
2. **Don't create new files unnecessarily** — Extend existing implementations.
3. **Don't trust surface-level code reading** — Always trace the complete flow.

### Frontend

4. **Never use `any` type** — Always find and use the proper type.
5. **Don't use 'use client' unless needed** — Prefer Server Components by default.
6. **Don't manually manage server state** — Let Next.js ISR handle caching and revalidation.
7. **Don't hardcode secrets** — Use `.env.local` files.

## Code Quality Checklist

- [ ] TypeScript compiles without errors (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Tests pass
- [ ] Follow existing patterns in codebase

## Remember

Focus and momentum are crucial. Every line of code should either:
1. Directly improve user experience
2. Enhance development velocity
3. Reduce technical risk

**"Perfect is the enemy of shipped."** — Ship fast, iterate based on feedback.

## AI Tool Instructions

- **Use `pnpm`** — never npm/npx
- **No auto git operations** — wait for explicit user instruction before commit/push/PR
- **Check existing patterns** before creating new files
- **Read Sanity schemas** before writing content queries
- **Use `sanityFetch<T>()` wrapper** (not raw `sanityClient.fetch`) — handles missing config gracefully
- **Prefer server components** — `'use client'` only when necessary
