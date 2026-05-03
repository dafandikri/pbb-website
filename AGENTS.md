# This file is a copy of CLAUDE.md for tooling compatibility.

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

## Frontend Practices (TypeScript/React)

- **ESLint** for linting (Next.js default)
- Use `import type` for type-only imports
- Path alias `@/*` maps to project root

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
