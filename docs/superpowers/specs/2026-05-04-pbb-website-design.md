# PBB Website Design Spec

## Overview
We are building a company-profile style website for Partai Bulan Bintang (PBB) targeting people who are curious about the party, with a strong appeal to younger audiences. The site should be clean, editorial, readable, and comparable in quality to aminajadulu.com. The site must support regularly updated content: news, events, and blog/opinion posts. Additional requirements include a press kit, integrated social media embeds/links, FAQ, and a join/volunteer form that does not use Google Forms.

Recommended stack: Next.js (React) App Router + Sanity CMS + Postgres (Supabase) for form submissions.

## Goals
- Strengthen branding and improve perception among younger audiences.
- Provide clear, readable information for people who are curious about the party.
- Support non-technical content updates (news, events, blog, press kit, FAQ).
- Drive conversions to join/volunteer.

## Success Metrics (Initial)
- Time on page and scroll depth on key pages.
- CTA clicks (Join/Volunteer).
- Newsletter or contact inquiries (if enabled).

## Information Architecture (IA)
Primary navigation:
- Home
- Profil
- Program
- News
- Events
- Blog
- Press Kit
- FAQ
- Join

Page outlines:
- Home: Hero + value proposition, program highlights, latest news/events, CTA join.
- Profil: Visi, misi, sejarah, struktur organisasi (ringkas dan visual).
- Program: 4-6 isu prioritas (cards + detail sections).
- News/Events/Blog: listing page + detail page.
- Press Kit: logo, warna, guideline, download links.
- FAQ: 10-15 Q&A utama.
- Join: form internal + CTA.

## Content Model (Sanity)
Document types:
- Page
  - title, slug, sections (blocks), seo
- News
  - title, slug, publishedAt, excerpt, body, coverImage, tags
- Event
  - title, slug, dateStart, dateEnd, location, excerpt, body, coverImage
- Blog/Opini
  - title, slug, publishedAt, excerpt, body, coverImage, tags, author (optional)
- FAQ
  - question, answer, category
- PressKit
  - logoFiles, colorPalette, typography, guidelinesText
- SocialEmbed
  - platform, url, embedCode (optional)
- JoinForm
  - fieldsConfig, thankYouMessage

## Rendering & Data Flow (Next.js)
- Next.js App Router with static rendering by default.
- ISR for News/Events/Blog (revalidate 60-300s).
- Dynamic routes: /news/[slug], /events/[slug], /blog/[slug].
- Server Components fetch content via next-sanity client and GROQ queries.
- Draft/preview mode optional for editors.

## Join/Volunteer Form (No Google Forms)
- Frontend form fields: name, email, city, interest, WhatsApp.
- Backend: Next.js API route for handling submissions.
- Storage: Postgres (Supabase).
- Notifications: Resend or Postmark to admin.
- CSV export for handover to party team.

## Error Handling & Ops
- Empty states for no content (news/events).
- Fallback images and custom 404 page.
- Rate limiting on join form to reduce spam.
- Basic monitoring and logging.

## Non-Goals
- Full membership system with authentication.
- Payment/Donation processing (unless requested).

## References (Context7)
- Next.js App Router structure and generateStaticParams.
- ISR with revalidate.
- Sanity Studio configuration (defineConfig).
- next-sanity client integration and GROQ queries.
