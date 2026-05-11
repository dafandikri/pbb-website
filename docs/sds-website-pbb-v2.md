# Software Development Specification (SDS)

## Website Partai Bulan Bintang (PBB)

**Versi Dokumen:** 2.0 — Actual Build  
**Status:** Final — Siap Handover  
**URL:** https://pbb-website-olive.vercel.app  
**CMS:** https://xw9qpsrp.sanity.studio  
**Repository:** https://github.com/dafandikri/pbb-website  

---

## 1. Pendahuluan

Dokumen ini merupakan Software Development Specification (SDS) aktual untuk website resmi Partai Bulan Bintang (PBB). Berbeda dengan SDS versi 1.0 yang menggunakan pendekatan React SPA, versi ini mencerminkan **realisasi final** dengan teknologi dan arsitektur yang lebih modern.

### 1.1 Tujuan Dokumen

- Dokumentasi teknis akurat untuk keperluan handover
- Panduan bagi tim partai yang akan melanjutkan pengembangan
- Referensi biaya infrastruktur dan operasional

### 1.2 Referensi Desain

Website dikembangkan dengan pendekatan editorial modern (referensi: aminajadulu.com) dengan fokus pada readability, performa, dan kemudahan pengelolaan konten oleh tim non-teknis.

---

## 2. Identitas Proyek

| Item | Detail |
|------|--------|
| Nama Proyek | Website Resmi Partai Bulan Bintang |
| Stack | Next.js 16 + Sanity CMS + Supabase + Vercel |
| Domain | partaibulanbintang.or.id (klien) |
| Hosting | Vercel (Production) |
| CMS Hosting | Sanity Managed (xw9qpsrp.sanity.studio) |
| Database | Supabase (PostgreSQL) |
| Email | Resend |

---

## 3. Arsitektur Sistem

### 3.1 Tech Stack

| Layer | Teknologi | Fungsi |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | SSR, ISR, routing, API routes |
| Bahasa | TypeScript | Type safety, no `any` |
| Styling | Tailwind CSS 4 | Utility-first, responsive |
| CMS | Sanity (headless) | Content management, GROQ queries |
| Database | Supabase (PostgreSQL) | Join form submissions |
| Email | Resend | Notifikasi join form |
| Hosting | Vercel | Production deployment, auto-deploy dari GitHub |
| CI/CD | Husky + GitHub | Pre-commit lint, pre-push build |
| Version Control | Git (GitHub) | Source code management |

### 3.2 Arsitektur Aplikasi

```
Browser → Vercel CDN → Next.js Server → Sanity API (ISR 120s)
                                    → Supabase (Join form)
                                    → Resend API (Email notification)

Studio: Content Editor → Sanity Studio → Sanity Dataset (GROQ)
```

- **Server Components** default — rendering di server, JS minimal di client
- **ISR (Incremental Static Regeneration)** — halaman statis dengan revalidate 120 detik
- **Client Components** hanya dipakai saat perlu interaktivitas (form, event handler)

### 3.3 Struktur Repository

```
app/                  # Next.js App Router
  layout.tsx          # Root layout (header + footer)
  page.tsx            # Homepage (modular sections)
  api/join/           # API route join form
  blog/               # Blog listing + [slug] detail
  events/             # Event listing + [slug] detail
  news/               # News listing + [slug] detail
  profil/             # Profil partai
  program/            # Program prioritas
  press-kit/          # Press kit
  faq/                # FAQ
  join/               # Join form page
  studio/             # Sanity Studio (client-only)
components/
  home/               # Homepage sections (7 komponen modular)
  forms/              # JoinForm
  layout/             # Header, Footer
lib/
  sanity/             # Client, queries (GROQ), types
  supabase/           # Client
  email/              # Email sender (Resend)
sanity/
  schemas/            # 8 content types
docs/                 # Design docs, plans, stakeholder summary
supabase/
  migrations/         # SQL migration files
```

---

## 4. Halaman & Fitur

### 4.1 Frontend Pages

| Halaman | Route | Status | CMS |
|---------|-------|--------|-----|
| Homepage | `/` | ✅ Live | Sebagian (news/events dari Sanity) |
| Profil | `/profil` | ✅ Live (placeholder) | Belum |
| Program | `/program` | ✅ Live (placeholder) | Belum |
| News | `/news` | ✅ Live | ✅ Sanity |
| News Detail | `/news/[slug]` | ✅ Live | ✅ Sanity |
| Events | `/events` | ✅ Live | ✅ Sanity |
| Event Detail | `/events/[slug]` | ✅ Live | ✅ Sanity |
| Blog | `/blog` | ✅ Live | ✅ Sanity |
| Blog Detail | `/blog/[slug]` | ✅ Live | ✅ Sanity |
| Press Kit | `/press-kit` | ✅ Live (placeholder) | Belum |
| FAQ | `/faq` | ✅ Live | ✅ Sanity |
| Join | `/join` | ✅ Live | Form submission |
| Sanity Studio | `/studio` | ✅ Live | - |

### 4.2 Homepage (Landing Page)

Struktur modular 7 section:

1. **Hero** — Headline + subhead + CTA Join
2. **Value Props** — 3 kartu (Transparan, Fokus Anak Muda, Aktif di Lapangan)
3. **Program Highlights** — 4 program prioritas + link ke `/program`
4. **Latest Updates** — 3 news terbaru + 2 events (dari Sanity, ISR)
5. **Join Block** — Form pendaftaran langsung
6. **Social Strip** — Link IG, X/Twitter, YouTube
7. **Footer** — Copyright + navigasi

### 4.3 Fitur Unggulan

| Fitur | Detail |
|-------|--------|
| **ISR Content** | News/Events/Blog di-revalidate tiap 120 detik |
| **Empty State** | Halaman tetap rapi meski belum ada konten |
| **Fallback Fetch** | `sanityFetch<T>()` — return fallback saat Sanity belum dikonfigurasi |
| **Client-Only Studio** | Studio di-load client-side (ssr: false) untuk kompatibilitas React 19 |
| **Guard Config** | Semua service (Sanity, Supabase, Resend) punya guard agar build tetap jalan tanpa env |
| **Responsive** | Tailwind responsive utilities, mobile-first |

---

## 5. Content Management System (Sanity Studio)

### 5.1 Akses

- **Self-hosted:** https://pbb-website-olive.vercel.app/studio
- **Managed:** https://xw9qpsrp.sanity.studio
- Login dengan akun Google/GitHub/email yang terdaftar

### 5.2 Content Types (8 Schema)

| Content Type | Fields | Status |
|-------------|--------|--------|
| **news** | title, slug, publishedAt, excerpt, body (rich text), coverImage, tags | ✅ Siap |
| **event** | title, slug, dateStart, dateEnd, location, excerpt, body, coverImage | ✅ Siap |
| **blog** | title, slug, publishedAt, excerpt, body, coverImage, tags, author | ✅ Siap |
| **faq** | question, answer, category | ✅ Siap |
| **pressKit** | logoFiles, colorPalette, typography, guidelinesText | ✅ Siap |
| **page** | title, slug, sections, seo | ✅ Siap |
| **socialEmbed** | platform, url, embedCode | ✅ Siap |
| **joinForm** | fieldsConfig, thankYouMessage | ✅ Siap |

### 5.3 Cara Edit Konten (untuk Tim Partai)

1. Buka https://xw9qpsrp.sanity.studio
2. Login (pakai akun yang didaftarkan developer)
3. Klik **+** (New Document)
4. Pilih tipe konten (News, Event, Blog, FAQ, dll)
5. Isi form, klik **Publish**
6. Website auto-update dalam ≤ 120 detik (ISR)

---

## 6. Join/Volunteer Form

### 6.1 Alur Data

```
User → Isi Form → POST /api/join → Validasi → Supabase insert → Resend email
```

### 6.2 Field Form

- Nama lengkap (required)
- Email (required, validasi @)
- Kota (required)
- Minat (required)
- WhatsApp (required, min 6 karakter)

### 6.3 Data Storage

Table `join_requests` di Supabase:

```sql
join_requests (
  id          UUID PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  city        TEXT NOT NULL,
  interest    TEXT NOT NULL,
  whatsapp    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
)
```

### 6.4 Notifikasi

Email notifikasi ke `dafandikri@gmail.com` via Resend (sementara pakai sender `onboarding@resend.dev`).  
**Pending:** Verifikasi domain PBB di Resend → ganti sender ke `noreply@partaibulanbintang.or.id`.

---

## 7. Infrastruktur & Biaya

### 7.1 Hosting (Vercel — Gratis)

| Metrik | Batasan Free Tier |
|--------|-------------------|
| Bandwidth | 100 GB/bulan |
| Build minutes | 6.000 menit/bulan |
| Serverless Functions | 100 jam/bulan |
| HTTPS/SSL | ✅ Otomatis |
| CDN | ✅ Global |
| Custom Domain | ✅ (1 domain) |

### 7.2 CMS (Sanity — Growth Trial)

| Metrik | Batasan Free/Growth |
|--------|---------------------|
| Documents | 10.000 documents |
| Storage | 25 GB |
| Bandwidth | 100 GB/bulan |
| API Requests | 5 juta/bulan |

> **Catatan:** Growth trial 30 hari. Setelah habis, perlu milih:  
> - **Free tier:** 1 dataset, 3 editor, 1 GB storage  
> - **Growth:** $15/editor/bulan, unlimited docs

### 7.3 Database (Supabase — Free)

| Metrik | Batasan Free Tier |
|--------|-------------------|
| Database | 500 MB |
| File Storage | 1 GB |
| Users (MAU) | 50.000 |
| Edge Functions | 500.000 invocations/bulan |
| Auto-pause after | 1 week inactive |

### 7.4 Email (Resend — Free)

| Metrik | Batasan Free Tier |
|--------|-------------------|
| Email/hari | 100 |
| Email/bulan | 3.000 |
| Domain | 1 domain |

### 7.5 Total Biaya Operasional Tahunan

| Layanan | Biaya/tahun |
|---------|-------------|
| Vercel | **Gratis** |
| Sanity Free | **Gratis** (setelah trial) |
| Supabase Free | **Gratis** |
| Resend Free | **Gratis** |
| Domain .or.id | Rp 250.000 – 350.000 |
| **Total Minimum** | **~Rp 300.000/tahun** |

### 7.6 Skalabilitas

| Saat Traffic Naik | Upgrade Ke | Estimasi Biaya |
|-------------------|------------|----------------|
| Vercel | Pro ($20/bln) | Rp 3,8 jt/tahun |
| Sanity | Growth ($15/editor/bln) | Rp 3 jt/tahun/editor |
| Supabase | Pro ($25/bln) | Rp 4,8 jt/tahun |
| Total Saat Skala | - | ~Rp 10-12 jt/tahun |

---

## 8. Keamanan

| Mekanisme | Implementasi |
|-----------|-------------|
| Row Level Security | Supabase RLS policies |
| Auth | Supabase JWT |
| Environment Variables | .env — tidak ada secret di source code |
| HTTPS | Vercel SSL otomatis |
| Input Validation | Server-side + client-side |
| Guard Config | Semua service aman saat env belum di-set |
| CORS | Sanity CORS untuk origin Vercel |

---

## 9. Yang Belum Dikerjakan (Roadmap)

### Prioritas Tinggi (Minggu 1-2)

| Fitur | Keterangan |
|-------|------------|
| Arahkan DNS ke Vercel | Domain partaibulanbintang.or.id → Vercel |
| Isi konten via Sanity | Minimal 3 news, 2 events, FAQ |
| Hero background foto | Ganti placeholder dengan foto PBB |
| Halaman Profil | Isi sejarah, visi-misi, struktur organisasi |
| Halaman Program | Isi detail program prioritas |

### Prioritas Sedang (Minggu 3-4)

| Fitur | Keterangan |
|-------|------------|
| Galeri foto + lightbox | Grid foto dengan klik fullscreen |
| Struktur Organisasi | Chart visual DPP/DPW |
| Pencarian berita | Search by keyword |
| Filter kategori berita | Filter per kategori (Nasional, Daerah, dll) |

### Jangka Panjang

| Fitur | Keterangan |
|-------|------------|
| Halaman Sayap Partai | Daftar organisasi sayap |
| Halaman Kontak + peta | Form kontak + Google Maps embed |
| Siaran Pers | List + download PDF |
| Video embed | YouTube/Vimeo di galeri |
| Export CSV data join | Dari Supabase |
| Captcha | Anti-spam di form join |
| Verify Resend domain | Domain PBB untuk sender email |
| Transfer ownership | Sanity & Supabase ke email partai |

---

## 10. AI-First Development

Repository dikonfigurasi untuk AI-assisted development:

| File/Dir | Fungsi |
|----------|--------|
| `CLAUDE.md` | Instruksi untuk Claude Code |
| `AGENTS.md` | Copy untuk Codex/Copilot |
| `.claude/commands.md` | Shortcut perintah |
| `.husky/pre-commit` | Auto lint sebelum commit |
| `.husky/pre-push` | Auto lint + build sebelum push |

---

## 11. Ketentuan Operasional

### 11.1 Bug & Maintenance
- Garansi bug: 14 hari setelah serah terima
- Bug = error dari kode, bukan kesalahan pengguna atau infrastruktur
- Maintenance tambahan di luar garansi adalah pekerjaan terpisah

### 11.2 Konten
- Seluruh konten (teks, foto, video, logo) adalah tanggung jawab tim partai
- Developer menggunakan placeholder selama konten asli belum tersedia

### 11.3 Hak & Kepemilikan
- Source code 100% milik Partai Bulan Bintang
- Developer berhak mencantumkan proyek sebagai portofolio
- Lisensi third-party mengikuti ketentuan masing-masing vendor

---

## 12. Kontak & Informasi

| | Detail |
|---|--------|
| **URL** | https://pbb-website-olive.vercel.app |
| **CMS** | https://xw9qpsrp.sanity.studio |
| **Repository** | https://github.com/dafandikri/pbb-website |
| **Developer** | Dafandikri & tim (via GitHub) |

---

*Dokumen ini dibuat berdasarkan realisasi proyek. Berlaku sejak tanggal handover.*
