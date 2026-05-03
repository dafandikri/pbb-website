# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Development Philosophy

### 1. Leave It Better Than You Found It

When working on any feature, if you encounter code that could be improved and the refactoring is small (< 100 lines), **do it now**. This maintains high development velocity. For larger refactorings, create a backlog issue.

### 2. YAGNI (You Ain't Gonna Need It)

Solve today's problem with the simplest solution that works. Avoid premature abstraction and overengineering. Keep code flexible for future changes but don't build features "just in case". When abstraction becomes necessary, create a ticket to plan it properly.

### 3. Move Fast, Break Things (Pre-Launch)

We haven't launched yet and will remain lean. Don't worry about backwards compatibility unless explicitly requested. Make bold changes that improve the codebase without fear of breaking existing users.

### 4. Complexity Over Time Estimates

We don't believe in time estimates - they're never accurate. Instead, estimate task complexity:

- **Small (S)**: < 100 lines, clear solution
- **Medium (M)**: 100-500 lines, some exploration needed
- **Large (L)**: 500+ lines, requires design/planning
- **Extra Large (XL)**: Major architectural changes

### 5. Package Managers

- **Frontend**: Always use `pnpm` - never npm/npx
- **Backend**: Always use `uv` - never pip/pip3 directly

## Critical Development Practices (MUST FOLLOW)

- **ALWAYS read the code thoroughly and dig deeper** - Don't trust surface-level assumptions. When fixing bugs, trace through the entire flow to understand the complete picture
- **NEVER use `any` type in TypeScript** - Always infer or define proper types
- **NEVER use untyped Python** - Always use type hints for function signatures, return types, and complex variables
- **PREFER editing/refactoring existing files over creating new ones** - Check if functionality already exists before creating new files
- **PREFER integration tests over unit tests** - Integration tests catch real-world issues and validate the entire flow
- **When user says "I'm not convinced", dig deeper** - This means the initial solution might be superficial
- **Keep error handling simple** - We're pre-launch. Use simple error messages, no error codes, no translations
- **ALWAYS use test/mock/dummy markers in test data** - All mock API keys, tokens, and secrets MUST include `test`, `mock`, `dummy`, `example`, or `placeholder` in the value itself
  - Valid: `sk_test_4eC39HqLyjWDarjtT657`, `example_api_key_12345`, `MOCK_SECRET_KEY_abc123`
  - Invalid: `sk_live_4eC39HqLyjWDarjtT657`, `real-looking-api-key-12345`

## Git Operations Policy (CRITICAL)

**NEVER perform git operations automatically. ALWAYS wait for explicit user instruction.**

- **NEVER commit automatically** - Only create commits when the user explicitly asks you to commit
- **NEVER push automatically** - Only push when the user explicitly asks you to push
- **NEVER create PRs automatically** - Only create PRs when the user explicitly asks
- **ALWAYS ask for confirmation** - When user requests git operations, confirm what you're about to do

**Valid user requests that warrant git operations:**

- "commit this" / "create a commit" / "commit these changes"
- "push to remote" / "push the changes"
- "create a PR"

**DO NOT commit/push for:**

- Completing a feature (wait for user to say "commit this")
- Fixing bugs (wait for user instruction)
- "Leave it better than you found it" refactoring (only commit if user explicitly requests it)
- End of conversation (never auto-commit as a cleanup action)

## Linear Integration (ENFORCED)

**ALWAYS use the project's Linear MCP (`linear-server`) for all Linear operations.** Do NOT use `claude_ai_Linear` (the personal workspace MCP). The project workspace is `ppl-sira` with team `PPL-SIRA` (key: `SIRA`).

**Terminology mapping:**

- **PBI** (Product Backlog Item) = **Task** in Linear (i.e. an issue)
- **Breakdown PBI Tasks** = **Subtasks** in Linear (child issues under a PBI)

## Project Overview

**PBB Website** is a company-profile site for Partai Bulan Bintang targeting curious audiences and younger voters. It focuses on clear branding, readable content, and regular updates for news, events, and blog/opinion posts.

### Key Features

- **Content Publishing** - News, events, blog/opinion with structured content in Sanity CMS
- **Brand Assets** - Press kit with logo, color palette, and guidelines
- **Engagement** - Join/volunteer form and FAQ
- **Social Media** - Embedded posts and outbound links

## Repository Structure

```
app/            # Next.js App Router pages
components/     # Shared UI components
lib/            # Data clients and helpers
sanity/         # Sanity Studio schemas
docs/           # Design documents and plans
```

## Essential Commands

> **Cross-platform note:** Use `make` on macOS/Linux. On Windows, use `just` (install once: `winget install Casey.Just`). All targets are identical.

### Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

### Code Quality

```bash
# Lint
pnpm lint
```

### Testing

```bash
pnpm test
```

### Database

```bash
# Supabase migrations will be added later
```

### Service URLs (Local Dev)

| Service | URL                   |
| ------- | --------------------- |
| Web     | http://localhost:3000 |

## Architecture Patterns

### Frontend: Layout -> Page -> Component

- **Pages** in `app/` are the route content
- **Components** in `components/` are reusable UI pieces
- **Lib** in `lib/` hosts API clients and helpers

## Development Workflow

### Branch Naming

Format: `<name>/<type>/<SIRA-XX>-<short-description>` - always include the Linear ticket code.

Examples:

- `abhip/feat/SIRA-33-sentry-integration`
- `abhip/fix/SIRA-26-auth-redirect-loop`

### Commit Message

Format: `<type>[optional scope]: <description>` - **do NOT include Linear ticket codes in commit messages**. Ticket codes belong in branch names and PR titles only.

Examples:

- `feat(api): add risk scoring endpoint`
- `fix(web): resolve dashboard loading state`
- `chore(infra): update Docker base image`

### Pull Request Naming

Format: `<SIRA-XX> <type>(scope): description` - always include the Linear ticket code.

Examples:

- `SIRA-35 chore: add training data and prepare for private repo`
- `SIRA-33 feat(api): add Sentry integration`
- `SIRA-26 fix(web): resolve auth redirect loop`

### Planning & Implementation

1. **For substantial changes (500+ lines)**: Create brief design document in `docs/plans/`
2. **Question assumptions**: "What's the fastest way to test this hypothesis?"
3. **Study existing patterns** before creating new ones
4. **Rapid validation**: "Can we implement 20% to get 80% value?"

### Code Quality Checklist

- [ ] TypeScript compiles without errors (`pnpm --dir apps/web typecheck`)
- [ ] Python type checks pass (`cd apps/api && uv run mypy src/`)
- [ ] All tests pass locally (`make test` / `just test` on Windows)
- [ ] Biome linting passes (`pnpm --dir apps/web lint`)
- [ ] Ruff linting passes (`cd apps/api && uv run ruff check .`)
- [ ] No dead code detected (`pnpm --dir apps/web knip`)
- [ ] Follow existing patterns in codebase

## Frontend Practices (TypeScript/React)

- **ESLint** for linting (Next.js default)
- Use `import type` for type-only imports
- Path alias `@/*` maps to project root

## Problem-Solving Approach

### When Debugging Issues

1. **Read the entire flow** - Don't stop at the surface level
2. **Question initial assumptions** - If user says "I'm not convinced", your first solution was likely superficial
3. **Verify fixes at the right layer** - Frontend bug? Check if it's actually a backend issue first

### When Writing Code

1. **Check for existing implementations first** - Don't create duplicate functionality
2. **Type safety is non-negotiable** - TypeScript: no `any`. Python: type hints everywhere
3. **Test at the right level** - Integration tests for features, unit tests for pure logic

## Common Pitfalls to Avoid

### General

1. **NEVER auto-commit/push/create PRs** - Only perform git operations when explicitly requested
2. **Don't create new files unnecessarily** - Extend existing implementations
3. **Don't commit dead code** - Run knip (web) and ruff (api) to detect unused code
4. **Don't trust surface-level code reading** - Always trace the complete flow

### Frontend

5. **Never use `any` type** - Always find and use the proper type
6. **Don't use raw fetch/axios in components** - Use TanStack Query hooks in `src/queries/`
7. **Don't run lint from apps/web/** - Use `pnpm lint` which runs Biome
8. **Don't manually manage server state** - TanStack Query handles caching, refetching, and stale data

### Infrastructure

9. **Don't hardcode secrets** - Use `.env` files and environment variables

## Pre-commit Hooks

Husky runs these checks before every commit:

1. **ESLint** (web) - Lint

Pre-push runs lint and build for the web app.

## Quick Reference

### File Naming

- Use `kebab-case` for all files (e.g., `hero-section.tsx`)
- TypeScript: `kebab-case` for files, `PascalCase` for components

### Environment Variables

All apps read from `.env.local` at the repo root. See `.env.example` for defaults.

### Environment Setup

```bash
# Prerequisites
node >= 20, pnpm >= 9

# First time
pnpm install

# Daily
pnpm dev
```

## Remember

Focus and momentum are crucial. Every line of code should either:

1. Directly improve user experience
2. Enhance development velocity
3. Reduce technical risk

**"Perfect is the enemy of shipped."** - Ship fast, iterate based on feedback.

## AI-First Development

This project is set up for AI-assisted development (Claude Code, GitHub Copilot, Cursor, Codex, etc.).

What are these files?

File/Dir	Purpose
CLAUDE.md	Instructions for Claude Code - project conventions, patterns, pitfalls
AGENTS.md	Symlink to CLAUDE.md - same content, for tools that read AGENTS.md (like Codex)
.claude/	Commands and config for Claude Code
.agents/	Symlink to .claude/ - same content, for other AI tools

You don't need to read these files - they're for AI tools. But if you're curious about project conventions, they're a good reference.
