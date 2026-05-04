# Claude Code Commands for PBB Website

## Build & Run

```
pnpm dev          # Start dev server
pnpm build        # Production build + typecheck
pnpm lint         # ESLint check
```

## Sanity

```
pnpm sanity deploy   # Deploy Sanity Studio (if using managed hosting)
pnpm sanity cors add <url>   # Add CORS origin for Sanity API
```

## Common Tasks

### Add a new page
1. Create `app/<route>/page.tsx`
2. If content-driven, add Sanity schema in `sanity/schemas/`
3. Add query in `lib/sanity/queries.ts`
4. Add type in `lib/sanity/types.ts`

### Add a new section to homepage
1. Create `components/home/<SectionName>.tsx`
2. Import and compose in `app/page.tsx`

### Add a new form field to JoinForm
1. Update `components/forms/JoinForm.tsx` (UI + state)
2. Update `app/api/join/route.ts` (validation + DB insert)
3. Update Supabase migration in `supabase/migrations/`
