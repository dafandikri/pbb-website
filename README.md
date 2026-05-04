# PBB Website — Partai Bulan Bintang

Company-profile website untuk Partai Bulan Bintang yang dirancang untuk audiens muda dan publik yang ingin mengenal partai. Dibangun dengan pendekatan editorial, modern, dan mudah dikelola oleh tim non-teknis.

**Live demo:** (belum di-deploy)

## Stack

| Layer            | Teknologi                                                     |
| ---------------- | ------------------------------------------------------------- |
| Framework        | [Next.js 16](https://nextjs.org) (App Router, ISR)            |
| Bahasa           | TypeScript                                                    |
| Styling          | [Tailwind CSS 4](https://tailwindcss.com)                     |
| CMS              | [Sanity](https://sanity.io) (headless, self-hosted studio)    |
| Database         | [Supabase](https://supabase.com) (Postgres)                   |
| Email            | [Resend](https://resend.com)                                  |
| Package Manager  | pnpm                                                          |
| Hooks            | Husky (pre-commit: lint, pre-push: lint + build)              |

## Fitur

- **Konten publikasi** — News, Events, Blog/Opini dari Sanity CMS
- **Profil partai** — Visi, misi, sejarah, struktur organisasi
- **Program prioritas** — Cards isu utama
- **Press Kit** — Logo, warna, panduan penggunaan
- **FAQ** — Pertanyaan yang sering ditanyakan
- **Join/Volunteer** — Form pendaftaran internal (tanpa Google Forms)
- **Media sosial** — Tautan dan embed

## Persiapan Lokal

### Prasyarat

- Node.js >= 20
- pnpm >= 9

### Instalasi

```bash
# Clone repo
git clone https://github.com/dafandikri/pbb-website.git
cd pbb-website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Isi .env.local dengan credentials (lihat bagian Environment)
```

### Menjalankan

```bash
pnpm dev
```

Buka http://localhost:3000.

### Build Produksi

```bash
pnpm build
pnpm start
```

## Environment Variables

Buat `.env.local` dari `.env.example` dan isi:

| Variable                          | Keterangan                     |
| --------------------------------- | ------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | ID project Sanity              |
| `NEXT_PUBLIC_SANITY_DATASET`      | Dataset Sanity (production)   |
| `NEXT_PUBLIC_SUPABASE_URL`        | URL project Supabase           |
| `SUPABASE_SERVICE_ROLE_KEY`       | Service role key Supabase      |
| `RESEND_API_KEY`                  | API key Resend                 |
| `JOIN_NOTIFICATION_EMAIL`         | Email tujuan notifikasi join   |

## Sanity Studio

Studio tersedia di `/studio` saat dev server berjalan. Editor juga bisa akses langsung via [sanity.io/manage](https://sanity.io/manage).

### Struktur Content Type

- **page** — Halaman statis dengan blok konten
- **news** — Berita (title, slug, publishedAt, excerpt, body, coverImage, tags)
- **event** — Acara (title, slug, dateStart, dateEnd, location, excerpt, body, coverImage)
- **blog** — Opini/artikel (title, slug, publishedAt, excerpt, body, coverImage, tags, author)
- **faq** — Pertanyaan umum (question, answer, category)
- **pressKit** — Aset branding (logoFiles, colorPalette, typography, guidelinesText)
- **socialEmbed** — Tautan media sosial (platform, url, embedCode)
- **joinForm** — Konfigurasi form pendaftaran (fieldsConfig, thankYouMessage)

## Arsitektur

```
app/                # Next.js App Router
  layout.tsx        # Root layout (header + footer)
  page.tsx          # Homepage (modular sections)
  api/join/         # API route untuk join form
  studio/           # Sanity Studio (client-only)
  blog/             # Blog listing + detail
  events/           # Event listing + detail
  news/             # News listing + detail
  profil/           # Profil partai
  program/          # Program prioritas
  press-kit/        # Press kit
  faq/              # FAQ
  join/             # Join form page
components/
  home/             # Homepage sections (Hero, ValueProps, ProgramHighlights, LatestUpdates, JoinBlock, SocialStrip)
  forms/            # JoinForm (client component)
  layout/           # Header, Footer
lib/
  sanity/           # Client, queries (GROQ), types
  supabase/         # Client
  email/            # Email sender (Resend)
sanity/             # Sanity Studio schemas
docs/               # Design docs & implementation plans
supabase/           # Database migrations
```

## Workflow Development

### Branch

```
<name>/<type>/<description>
```

Contoh: `dafandikri/feat/homepage`, `dafandikri/fix/navbar`

### Commit

```
feat(scope): description
fix(scope): description
chore(scope): description
docs(scope): description
```

Scope: `home`, `news`, `events`, `blog`, `sanity`, `join`, `layout`, `infra`

### Code Quality

```bash
pnpm lint   # ESLint (dijalankan otomatis oleh Husky pre-commit)
pnpm build  # Build produksi + typecheck (dijalankan oleh Husky pre-push)
```

## AI-First Development

Repository ini dikonfigurasi untuk AI-assisted development:

| File/Dir          | Fungsi                                |
| ----------------- | ------------------------------------- |
| `CLAUDE.md`       | Instruksi untuk Claude Code           |
| `AGENTS.md`       | Copy CLAUDE.md untuk Codex/Copilot    |
| `.claude/`        | Commands & konfigurasi Claude Code    |
| `.agents/`        | Symlink ke .claude/                   |

### Cara Penggunaan dengan AI Tools

1. **Claude Code**: Langsung detect `CLAUDE.md` dan `.claude/commands.md`
2. **GitHub Copilot**: Baca `AGENTS.md` untuk konteks project
3. **Cursor**: Deteksi otomatis `AGENTS.md`
4. **Codex**: Baca `AGENTS.md` untuk instruksi

## Handover ke Partai

Saat handover ke Partai Bulan Bintang:

1. **Transfer ownership Sanity** — Dashboard Sanity > Settings > Transfer project
2. **Transfer Supabase** — Settings > General > Transfer project
3. **Transfer domain** — Arahkan DNS ke Vercel
4. **Deploy** — Hubungkan repo ke Vercel, set environment variables
5. **Hapus .env.local** — Di local developer setelah handover

---

Dibangun dengan Next.js + Sanity + Tailwind CSS.
