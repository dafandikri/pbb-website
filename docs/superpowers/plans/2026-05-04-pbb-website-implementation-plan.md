# PBB Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js (React) website with Sanity CMS to publish PBB profile content, news, events, blog/opinion, press kit, FAQ, and a join/volunteer form without Google Forms.

**Architecture:** Next.js App Router renders static pages with ISR for content lists and detail pages. Sanity Studio stores content types and provides an editor UI for non-technical updates. Join form posts to an API route that writes to Postgres (Supabase) and sends notification email.

**Tech Stack:** Next.js App Router, TypeScript, Sanity Studio, next-sanity, GROQ, Supabase Postgres, Resend/Postmark.

---

## File Structure

- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `next.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Create: `app/news/page.tsx`
- Create: `app/news/[slug]/page.tsx`
- Create: `app/events/page.tsx`
- Create: `app/events/[slug]/page.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/profil/page.tsx`
- Create: `app/program/page.tsx`
- Create: `app/press-kit/page.tsx`
- Create: `app/faq/page.tsx`
- Create: `app/join/page.tsx`
- Create: `app/api/join/route.ts`
- Modify: `app/globals.css`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/home/Hero.tsx`
- Create: `components/home/HighlightSection.tsx`
- Create: `components/content/ContentCard.tsx`
- Create: `components/content/ContentList.tsx`
- Create: `components/forms/JoinForm.tsx`
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/queries.ts`
- Create: `lib/sanity/types.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/email/sender.ts`
- Create: `sanity.config.ts`
- Create: `sanity/schema.ts` (remove if unused)
- Create: `sanity/schemas/page.ts`
- Create: `sanity/schemas/news.ts`
- Create: `sanity/schemas/event.ts`
- Create: `sanity/schemas/blog.ts`
- Create: `sanity/schemas/faq.ts`
- Create: `sanity/schemas/pressKit.ts`
- Create: `sanity/schemas/socialEmbed.ts`
- Create: `sanity/schemas/joinForm.ts`
- Create: `sanity/schemas/index.ts`
- Create: `.env.example`
- Modify: `README.md`

---

### Task 1: Align base layout and globals (Tailwind enabled)

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update base layout**

Edit `app/layout.tsx`:
```tsx
import './globals.css'

export const metadata = {
  title: 'Partai Bulan Bintang',
  description: 'Profil dan aktivitas Partai Bulan Bintang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-[#f6f2ea] text-[#111111]">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update global styles**

Edit `app/globals.css`:
```css
@import "tailwindcss";

:root {
  color-scheme: light;
  --color-bg: #f6f2ea;
  --color-ink: #111111;
  --color-accent: #2e6f5c;
  --color-accent-2: #d8b67a;
  --color-muted: #6b6b6b;
  --font-display: "Playfair Display", serif;
  --font-body: "Source Sans 3", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-body);
}
```

- [ ] **Step 3: Update placeholder home page**

Edit `app/page.tsx`:
```tsx
export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold">Partai Bulan Bintang</h1>
      <p className="mt-4 text-lg text-[#6b6b6b]">
        Website resmi akan segera hadir.
      </p>
    </main>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: align base layout"
```

---

### Task 2: Sanity Studio setup and schema

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity/schema.ts`
- Create: `sanity/schemas/*.ts`
- Create: `sanity/schemas/index.ts`

- [ ] **Step 1: Install Sanity dependencies**

Run:
```bash
pnpm add sanity next-sanity @sanity/vision
```

- [ ] **Step 2: Define Sanity config**

Create `sanity.config.ts`:
```ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'PBB Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  schema: {types: schemaTypes},
  plugins: [structureTool(), visionTool()],
})
```

- [ ] **Step 3: Define schema index**

Create `sanity/schemas/index.ts`:
```ts
import {page} from './page'
import {news} from './news'
import {event} from './event'
import {blog} from './blog'
import {faq} from './faq'
import {pressKit} from './pressKit'
import {socialEmbed} from './socialEmbed'
import {joinForm} from './joinForm'

export const schemaTypes = [
  page,
  news,
  event,
  blog,
  faq,
  pressKit,
  socialEmbed,
  joinForm,
]
```

- [ ] **Step 4: Add News schema**

Create `sanity/schemas/news.ts`:
```ts
export const news = {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'publishedAt', type: 'datetime', title: 'Published At'},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'body', type: 'array', of: [{type: 'block'}]},
    {name: 'coverImage', type: 'image', title: 'Cover Image'},
    {name: 'tags', type: 'array', of: [{type: 'string'}]},
  ],
}
```

- [ ] **Step 5: Add Event schema**

Create `sanity/schemas/event.ts`:
```ts
export const event = {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'dateStart', type: 'datetime', title: 'Start Date'},
    {name: 'dateEnd', type: 'datetime', title: 'End Date'},
    {name: 'location', type: 'string', title: 'Location'},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'body', type: 'array', of: [{type: 'block'}]},
    {name: 'coverImage', type: 'image', title: 'Cover Image'},
  ],
}
```

- [ ] **Step 6: Add Blog schema**

Create `sanity/schemas/blog.ts`:
```ts
export const blog = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {name: 'title', type: 'string', title: 'Title'},
    {name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title'}},
    {name: 'publishedAt', type: 'datetime', title: 'Published At'},
    {name: 'excerpt', type: 'text', title: 'Excerpt'},
    {name: 'body', type: 'array', of: [{type: 'block'}]},
    {name: 'coverImage', type: 'image', title: 'Cover Image'},
    {name: 'tags', type: 'array', of: [{type: 'string'}]},
    {name: 'author', type: 'string', title: 'Author'},
  ],
}
```

- [ ] **Step 7: Add FAQ schema**

Create `sanity/schemas/faq.ts`:
```ts
export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {name: 'question', type: 'string', title: 'Question'},
    {name: 'answer', type: 'text', title: 'Answer'},
    {name: 'category', type: 'string', title: 'Category'},
  ],
}
```

- [ ] **Step 8: Add Press Kit schema**

Create `sanity/schemas/pressKit.ts`:
```ts
export const pressKit = {
  name: 'pressKit',
  title: 'Press Kit',
  type: 'document',
  fields: [
    {name: 'logoFiles', type: 'array', of: [{type: 'file'}]},
    {
      name: 'colorPalette',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Color Palette',
    },
    {name: 'typography', type: 'text', title: 'Typography'},
    {name: 'guidelinesText', type: 'text', title: 'Guidelines'},
  ],
}
```

- [ ] **Step 9: Add Social Embed schema**

Create `sanity/schemas/socialEmbed.ts`:
```ts
export const socialEmbed = {
  name: 'socialEmbed',
  title: 'Social Embed',
  type: 'document',
  fields: [
    {name: 'platform', type: 'string', title: 'Platform'},
    {name: 'url', type: 'url', title: 'URL'},
    {name: 'embedCode', type: 'text', title: 'Embed Code'},
  ],
}
```

- [ ] **Step 10: Add Join Form schema**

Create `sanity/schemas/joinForm.ts`:
```ts
export const joinForm = {
  name: 'joinForm',
  title: 'Join Form',
  type: 'document',
  fields: [
    {
      name: 'fieldsConfig',
      type: 'array',
      of: [{type: 'string'}],
      title: 'Fields Config',
    },
    {name: 'thankYouMessage', type: 'text', title: 'Thank You Message'},
  ],
}
```

- [ ] **Step 11: Commit**

```bash
git commit -m "feat: add sanity studio schemas"
```

---

### Task 3: Sanity client + queries for content

**Files:**
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/queries.ts`
- Create: `lib/sanity/types.ts`

- [ ] **Step 1: Create Sanity client**

Create `lib/sanity/client.ts`:
```ts
import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-03-04',
  useCdn: true,
})
```

- [ ] **Step 2: Create query helpers**

Create `lib/sanity/queries.ts`:
```ts
import {defineQuery} from 'next-sanity'

export const newsListQuery = defineQuery(`*[_type == "news"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}`)

export const newsBySlugQuery = defineQuery(`*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body
}`)

export const eventListQuery = defineQuery(`*[_type == "event"]|order(dateStart desc){
  _id,
  title,
  "slug": slug.current,
  dateStart,
  dateEnd,
  location,
  excerpt
}`)

export const eventBySlugQuery = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  dateStart,
  dateEnd,
  location,
  excerpt,
  body
}`)

export const blogListQuery = defineQuery(`*[_type == "blog"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}`)

export const blogBySlugQuery = defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  author
}`)

export const faqListQuery = defineQuery(`*[_type == "faq"]|order(_createdAt desc){
  _id,
  question,
  answer,
  category
}`)
```

- [ ] **Step 3: Types for content**

Create `lib/sanity/types.ts`:
```ts
export type NewsItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  body?: unknown
}

export type EventItem = {
  _id: string
  title: string
  slug: string
  dateStart: string
  dateEnd?: string
  location?: string
  excerpt?: string
  body?: unknown
}

export type BlogItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  body?: unknown
  author?: string
}

export type FaqItem = {
  _id: string
  question: string
  answer: string
  category?: string
}
```

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: add sanity client and queries"
```

---

### Task 4: Content listing and detail pages

**Files:**
- Create: `app/news/page.tsx`
- Create: `app/news/[slug]/page.tsx`
- Create: `app/events/page.tsx`
- Create: `app/events/[slug]/page.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Build News list page**

Create `app/news/page.tsx`:
```tsx
import {sanityClient} from '@/lib/sanity/client'
import {newsListQuery} from '@/lib/sanity/queries'
import type {NewsItem} from '@/lib/sanity/types'

export const revalidate = 120

export default async function NewsPage() {
  const news = await sanityClient.fetch<NewsItem[]>(newsListQuery)
  return (
    <main style={{padding: '48px'}}>
      <h1>News</h1>
      <ul>
        {news.map((item) => (
          <li key={item._id}>
            <a href={`/news/${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

- [ ] **Step 2: Build News detail page**

Create `app/news/[slug]/page.tsx`:
```tsx
import {sanityClient} from '@/lib/sanity/client'
import {newsBySlugQuery, newsListQuery} from '@/lib/sanity/queries'
import type {NewsItem} from '@/lib/sanity/types'

export const revalidate = 120

export async function generateStaticParams() {
  const news = await sanityClient.fetch<NewsItem[]>(newsListQuery)
  return news.map((item) => ({slug: item.slug}))
}

export default async function NewsDetailPage({
  params,
}: {
  params: {slug: string}
}) {
  const news = await sanityClient.fetch<NewsItem | null>(newsBySlugQuery, {
    slug: params.slug,
  })
  if (!news) {
    return <main style={{padding: '48px'}}>Not found</main>
  }
  return (
    <main style={{padding: '48px'}}>
      <h1>{news.title}</h1>
      <p>{news.excerpt}</p>
    </main>
  )
}
```

- [ ] **Step 3: Build Events list page**

Create `app/events/page.tsx`:
```tsx
import {sanityClient} from '@/lib/sanity/client'
import {eventListQuery} from '@/lib/sanity/queries'
import type {EventItem} from '@/lib/sanity/types'

export const revalidate = 120

export default async function EventsPage() {
  const events = await sanityClient.fetch<EventItem[]>(eventListQuery)
  return (
    <main style={{padding: '48px'}}>
      <h1>Events</h1>
      <ul>
        {events.map((item) => (
          <li key={item._id}>
            <a href={`/events/${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

- [ ] **Step 4: Build Events detail page**

Create `app/events/[slug]/page.tsx`:
```tsx
import {sanityClient} from '@/lib/sanity/client'
import {eventBySlugQuery, eventListQuery} from '@/lib/sanity/queries'
import type {EventItem} from '@/lib/sanity/types'

export const revalidate = 120

export async function generateStaticParams() {
  const events = await sanityClient.fetch<EventItem[]>(eventListQuery)
  return events.map((item) => ({slug: item.slug}))
}

export default async function EventDetailPage({
  params,
}: {
  params: {slug: string}
}) {
  const event = await sanityClient.fetch<EventItem | null>(eventBySlugQuery, {
    slug: params.slug,
  })
  if (!event) {
    return <main style={{padding: '48px'}}>Not found</main>
  }
  return (
    <main style={{padding: '48px'}}>
      <h1>{event.title}</h1>
      <p>{event.excerpt}</p>
    </main>
  )
}
```

- [ ] **Step 5: Build Blog list page**

Create `app/blog/page.tsx`:
```tsx
import {sanityClient} from '@/lib/sanity/client'
import {blogListQuery} from '@/lib/sanity/queries'
import type {BlogItem} from '@/lib/sanity/types'

export const revalidate = 120

export default async function BlogPage() {
  const blogs = await sanityClient.fetch<BlogItem[]>(blogListQuery)
  return (
    <main style={{padding: '48px'}}>
      <h1>Blog</h1>
      <ul>
        {blogs.map((item) => (
          <li key={item._id}>
            <a href={`/blog/${item.slug}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

- [ ] **Step 6: Build Blog detail page**

Create `app/blog/[slug]/page.tsx`:
```tsx
import {sanityClient} from '@/lib/sanity/client'
import {blogBySlugQuery, blogListQuery} from '@/lib/sanity/queries'
import type {BlogItem} from '@/lib/sanity/types'

export const revalidate = 120

export async function generateStaticParams() {
  const blogs = await sanityClient.fetch<BlogItem[]>(blogListQuery)
  return blogs.map((item) => ({slug: item.slug}))
}

export default async function BlogDetailPage({
  params,
}: {
  params: {slug: string}
}) {
  const blog = await sanityClient.fetch<BlogItem | null>(blogBySlugQuery, {
    slug: params.slug,
  })
  if (!blog) {
    return <main style={{padding: '48px'}}>Not found</main>
  }
  return (
    <main style={{padding: '48px'}}>
      <h1>{blog.title}</h1>
      <p>{blog.excerpt}</p>
    </main>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git commit -m "feat: add content listing pages"
```

---

### Task 5: Static pages (Profil, Program, Press Kit, FAQ, Join)

**Files:**
- Create: `app/profil/page.tsx`
- Create: `app/program/page.tsx`
- Create: `app/press-kit/page.tsx`
- Create: `app/faq/page.tsx`
- Create: `app/join/page.tsx`

- [ ] **Step 1: Create Profil page**

Create `app/profil/page.tsx`:
```tsx
export default function ProfilPage() {
  return (
    <main style={{padding: '48px'}}>
      <h1>Profil</h1>
      <p>Visi, misi, sejarah, dan struktur organisasi PBB.</p>
    </main>
  )
}
```

- [ ] **Step 2: Create Program page**

Create `app/program/page.tsx`:
```tsx
export default function ProgramPage() {
  return (
    <main style={{padding: '48px'}}>
      <h1>Program</h1>
      <p>Isu prioritas dan program unggulan PBB.</p>
    </main>
  )
}
```

- [ ] **Step 3: Create Press Kit page**

Create `app/press-kit/page.tsx`:
```tsx
export default function PressKitPage() {
  return (
    <main style={{padding: '48px'}}>
      <h1>Press Kit</h1>
      <p>Logo, warna, dan panduan penggunaan.</p>
    </main>
  )
}
```

- [ ] **Step 4: Create FAQ page**

Create `app/faq/page.tsx`:
```tsx
export default function FaqPage() {
  return (
    <main style={{padding: '48px'}}>
      <h1>FAQ</h1>
      <p>Pertanyaan yang sering ditanyakan.</p>
    </main>
  )
}
```

- [ ] **Step 5: Create Join page**

Create `app/join/page.tsx`:
```tsx
import {JoinForm} from '@/components/forms/JoinForm'

export default function JoinPage() {
  return (
    <main style={{padding: '48px'}}>
      <h1>Join</h1>
      <JoinForm />
    </main>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: add static pages"
```

---

### Task 6: Join form frontend + API route

**Files:**
- Create: `components/forms/JoinForm.tsx`
- Create: `app/api/join/route.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/email/sender.ts`
- Create: `.env.example`

- [ ] **Step 1: Add Supabase client**

Create `lib/supabase/client.ts`:
```ts
import {createClient} from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
)
```

- [ ] **Step 2: Add email sender**

Create `lib/email/sender.ts`:
```ts
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY ?? '')

export async function sendJoinNotification(payload: {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}) {
  await resend.emails.send({
    from: 'noreply@partaibulanbintang.or.id',
    to: [process.env.JOIN_NOTIFICATION_EMAIL ?? 'admin@example.com'],
    subject: 'Pendaftaran Join/Volunteer Baru',
    text: `Nama: ${payload.name}\nEmail: ${payload.email}\nKota: ${payload.city}\nMinat: ${payload.interest}\nWhatsApp: ${payload.whatsapp}`,
  })
}
```

- [ ] **Step 3: Create Join form component**

Create `components/forms/JoinForm.tsx`:
```tsx
'use client'

import {useState} from 'react'

type JoinPayload = {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}

const emptyPayload: JoinPayload = {
  name: '',
  email: '',
  city: '',
  interest: '',
  whatsapp: '',
}

export function JoinForm() {
  const [payload, setPayload] = useState<JoinPayload>(emptyPayload)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      setStatus('error')
      return
    }

    setPayload(emptyPayload)
    setStatus('success')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama
        <input
          value={payload.name}
          onChange={(event) =>
            setPayload((prev) => ({...prev, name: event.target.value}))
          }
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={payload.email}
          onChange={(event) =>
            setPayload((prev) => ({...prev, email: event.target.value}))
          }
          required
        />
      </label>
      <label>
        Kota
        <input
          value={payload.city}
          onChange={(event) =>
            setPayload((prev) => ({...prev, city: event.target.value}))
          }
          required
        />
      </label>
      <label>
        Minat
        <input
          value={payload.interest}
          onChange={(event) =>
            setPayload((prev) => ({...prev, interest: event.target.value}))
          }
          required
        />
      </label>
      <label>
        WhatsApp
        <input
          value={payload.whatsapp}
          onChange={(event) =>
            setPayload((prev) => ({...prev, whatsapp: event.target.value}))
          }
          required
        />
      </label>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Mengirim...' : 'Daftar'}
      </button>
      {status === 'success' && <p>Terima kasih! Tim kami akan menghubungi.</p>}
      {status === 'error' && <p>Gagal mengirim. Coba lagi.</p>}
    </form>
  )
}
```

- [ ] **Step 4: Create join API route**

Create `app/api/join/route.ts`:
```ts
import {NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase/client'
import {sendJoinNotification} from '@/lib/email/sender'

type JoinPayload = {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}

export async function POST(request: Request) {
  const payload = (await request.json()) as JoinPayload

  const {error} = await supabase.from('join_requests').insert(payload)
  if (error) {
    return NextResponse.json({error: 'failed'}, {status: 500})
  }

  await sendJoinNotification(payload)
  return NextResponse.json({ok: true})
}
```

- [ ] **Step 5: Add .env example**

Create `.env.example`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=example
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
SUPABASE_SERVICE_ROLE_KEY=example
RESEND_API_KEY=example
JOIN_NOTIFICATION_EMAIL=admin@example.com
```

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: add join form submissions"
```

---

### Task 7: Add header/footer layout and navigation

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create header**

Create `components/layout/Header.tsx`:
```tsx
const navItems = [
  {label: 'Home', href: '/'},
  {label: 'Profil', href: '/profil'},
  {label: 'Program', href: '/program'},
  {label: 'News', href: '/news'},
  {label: 'Events', href: '/events'},
  {label: 'Blog', href: '/blog'},
  {label: 'Press Kit', href: '/press-kit'},
  {label: 'FAQ', href: '/faq'},
  {label: 'Join', href: '/join'},
]

export function Header() {
  return (
    <header style={{padding: '24px 48px', display: 'flex', gap: '16px'}}>
      {navItems.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </header>
  )
}
```

- [ ] **Step 2: Create footer**

Create `components/layout/Footer.tsx`:
```tsx
export function Footer() {
  return (
    <footer style={{padding: '48px'}}>
      <p>Partai Bulan Bintang © 2026</p>
    </footer>
  )
}
```

- [ ] **Step 3: Wire header/footer into layout**

Modify `app/layout.tsx`:
```tsx
import './styles/globals.css'
import {Header} from '@/components/layout/Header'
import {Footer} from '@/components/layout/Footer'

export const metadata = {
  title: 'Partai Bulan Bintang',
  description: 'Profil dan aktivitas Partai Bulan Bintang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: add site navigation"
```

---

### Task 8: Sanity Studio route and content management

**Files:**
- Create: `app/studio/[[...index]]/page.tsx`

- [ ] **Step 1: Install studio package**

Run:
```bash
pnpm add @sanity/next
```

- [ ] **Step 2: Add Studio route**

Create `app/studio/[[...index]]/page.tsx`:
```tsx
import {NextStudio} from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: add sanity studio route"
```

---

### Task 9: Join DB table and minimal validation

**Files:**
- Create: `supabase/migrations/001_create_join_requests.sql`

- [ ] **Step 1: Create SQL migration**

Create `supabase/migrations/001_create_join_requests.sql`:
```sql
create table if not exists join_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  city text not null,
  interest text not null,
  whatsapp text not null,
  created_at timestamptz not null default now()
);
```

- [ ] **Step 2: Add minimal API validation**

Modify `app/api/join/route.ts`:
```ts
import {NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase/client'
import {sendJoinNotification} from '@/lib/email/sender'

type JoinPayload = {
  name: string
  email: string
  city: string
  interest: string
  whatsapp: string
}

function isValid(payload: JoinPayload) {
  return (
    payload.name.length > 1 &&
    payload.email.includes('@') &&
    payload.city.length > 1 &&
    payload.interest.length > 1 &&
    payload.whatsapp.length > 5
  )
}

export async function POST(request: Request) {
  const payload = (await request.json()) as JoinPayload
  if (!isValid(payload)) {
    return NextResponse.json({error: 'invalid'}, {status: 400})
  }

  const {error} = await supabase.from('join_requests').insert(payload)
  if (error) {
    return NextResponse.json({error: 'failed'}, {status: 500})
  }

  await sendJoinNotification(payload)
  return NextResponse.json({ok: true})
}
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: store join requests"
```

---

### Task 10: QA checklist and docs

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README**

Append to `README.md`:
```md
## Development

### Environment
Copy `.env.example` to `.env.local` and fill values.

### Run
```bash
pnpm dev
```

### Sanity Studio
Access Studio at `/studio`.
```

- [ ] **Step 2: Commit**

```bash
git commit -m "docs: add local setup"
```

---

## Self-Review

**Spec coverage:**
- Branding and youth audience reflected via CSS baseline and layout tasks.
- News/Events/Blog pages and detail routes included.
- Press Kit, FAQ, Join pages included.
- Sanity schemas cover all required content types.
- Join form API + DB + email notification included.

**Placeholder scan:**
- No TODO/TBD placeholders present.

**Type consistency:**
- Content types use consistent property names across queries and pages.
