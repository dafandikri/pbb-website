================================================================================
  PBB WEBSITE — PARTISIPASI GENERASI MUDA
  Ringkasan Lengkap Proyek
================================================================================

URL:         https://pbb-website-olive.vercel.app
CMS:         https://xw9qpsrp.sanity.studio
Repo:        https://github.com/dafandikri/pbb-website
Domain:      partaibulanbintang.or.id (belum diarahkan)

================================================================================
TEKNOLOGI
================================================================================

  Frontend   Next.js 16 (App Router, ISR, SSR)   — SEO built-in, cepat
  Styling    Tailwind CSS 4                        — responsive, mobile-first
  CMS        Sanity (headless)                     — 8 content types, drag-drop editor
  Database   Supabase (PostgreSQL)                 — join form submissions
  Email      Resend                                — notifikasi join form
  Hosting    Vercel                                — auto-deploy dari GitHub, gratis
  CI/CD      Husky + GitHub                        — pre-commit lint, pre-push build

================================================================================
YANG SUDAH JADI (✅)
================================================================================

  Halaman:                  
    Homepage (7 section modular)
    Profil partai (placeholder)
    Program prioritas (placeholder)
    Press Kit (placeholder)
    FAQ (CMS-ready)
    Join/Volunteer (form + DB + email)
    News (listing + detail, dari CMS)
    Events (listing + detail, dari CMS)
    Blog/Opini (listing + detail, dari CMS)
    Sanity Studio (/studio)

  Sistem:
    SEO meta per halaman
    ISR 120 detik (konten real-time tanpa rebuild)
    Graceful fallback (semua service aman saat env kosong)
    Responsive mobile/tablet/desktop
    Auto-deploy Vercel dari GitHub

  AI Development:
    CLAUDE.md, AGENTS.md, .claude/commands.md
    Kontrol git (no auto-commit/push/PR)
    Branch naming: <nama>/<type>/<deskripsi>

================================================================================
YANG BELUM (📋 Roadmap)
================================================================================

  🔲 Domain → arahkan DNS partaibulanbintang.or.id ke Vercel
  🔲 Isi konten via Sanity (berita, events, blog, FAQ, press kit)
  🔲 Hero foto asli PBB (ganti placeholder)
  🔲 Halaman galeri foto + lightbox
  🔲 Struktur organisasi chart
  🔲 Pencarian & filter berita
  🔲 Export CSV dari Supabase (data join form)
  🔲 Captcha anti spam di join form
  🔲 Halaman kontak + peta lokasi
  🔲 Verify domain Resend (biar sender email pakai @pbb)

================================================================================
BIAYA INFRASTRUKTUR
================================================================================

  Vercel        Gratis      100GB bandwidth, 6k build min/bln
  Sanity        Gratis      Growth trial (30hr), free after: 1GB storage
  Supabase      Gratis      500MB DB, 50k MAU
  Resend        Gratis      100 email/hari
  Domain        Rp 250-350k/tahun   .or.id
  ─────────────────────────────────────────────
  TOTAL         ~Rp 300k/tahun   (hanya domain)

================================================================================
STRUKTUR REPO (untuk developer next)
================================================================================

  app/                    Next.js routes
    page.tsx              Homepage
    news/page.tsx         News list
    news/[slug]/page.tsx  News detail
    events/page.tsx       Events list
    events/[slug]         Events detail
    blog/page.tsx         Blog list
    blog/[slug]           Blog detail
    profil/page.tsx       Profil
    program/page.tsx      Program
    press-kit/page.tsx    Press Kit
    faq/page.tsx          FAQ
    join/page.tsx         Join form
    api/join/route.ts     Join API (POST)
    studio/               Sanity Studio
  components/
    home/                 HeroSection, ValueProps, ProgramHighlights,
                          LatestUpdates, JoinBlock, SocialStrip
    forms/JoinForm.tsx    'use client'
    layout/Header.tsx     Navigasi (9 menu)
    layout/Footer.tsx
  lib/
    sanity/client.ts      sanityFetch<T>() wrapper
    sanity/queries.ts     GROQ queries
    sanity/types.ts       NewsItem, EventItem, BlogItem, FaqItem
    supabase/client.ts    Supabase client (nullable guard)
    email/sender.ts       Resend send (nullable guard)
  sanity/
    sanity.config.ts      Studio config
    sanity.cli.ts         CLI config
    schemas/              8 content types

================================================================================
PERINTAH DASAR
================================================================================

  pnpm dev          Mulai dev server
  pnpm build        Build produksi + typecheck
  pnpm lint         ESLint
  pnpm start        Start production
  git add . && git commit -m "pesan" && git push    (manual)

================================================================================
AKSES
================================================================================

  Website    https://pbb-website-olive.vercel.app
  CMS        https://xw9qpsrp.sanity.studio
  Supabase   https://supabase.com/dashboard/project/rtrdjgkxebpwdybhqwmo
  Vercel     https://vercel.com/erdafas-projects/pbb-website

================================================================================
