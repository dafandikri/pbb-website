# Product Requirement Document (PRD)

## Website Resmi Partai Bulan Bintang (PBB)

**Versi:** 2.0  
**Status:** Final  
**URL:** https://pbb-website-olive.vercel.app  
**CMS:** https://xw9qpsrp.sanity.studio  

---

## 1. Ringkasan Eksekutif

### 1.1 Visi Produk
Menjadi platform digital utama Partai Bulan Bintang untuk menyampaikan informasi, membangun citra modern, dan menjangkau generasi muda Indonesia secara efektif dan terpercaya.

### 1.2 Misi Produk
- Menyajikan informasi partai secara transparan, cepat, dan mudah diakses
- Membangun brand partai yang relevan di mata pemilih muda (Gen-Z & Milenial)
- Menyediakan kanal partisipasi publik (join/volunteer)
- Mendokumentasikan kegiatan dan program partai secara terstruktur

### 1.3 Target Audiens

| Segmen | Karakteristik | Kebutuhan |
|--------|---------------|-----------|
| **Pemilih Muda** (17-30 thn) | Melek digital, ingin tahu program, kritis | Informasi ringkas, visual menarik, mobile-first |
| **Kader & Simpatisan** | Sudah kenal PBB, butuh update kegiatan | News/events terbaru, akses cepat |
| **Jurnalis & Media** | Butuh rilis resmi, data partai | Press kit, siaran pers, kontak |
| **Calon Relawan** | Ingin berkontribusi | Form join/volunteer yang mudah |
| **Masyarakat Umum** | Penasaran, belum kenal PBB | Profil, program, FAQ |

---

## 2. Tujuan Produk

### 2.1 Business Goals
1. **Meningkatkan brand awareness** PBB di kalangan pemilih muda
2. **Membangun kredibilitas** melalui penyajian informasi yang profesional
3. **Mendorong partisipasi** publik (join/volunteer)
4. **Menyediakan sumber informasi** resmi yang dapat diandalkan

### 2.2 Success Metrics (KPI)

| Metrik | Target | Cara Ukur |
|--------|--------|-----------|
| Waktu kunjungan | > 2 menit/sesi | Vercel Analytics |
| Bounce rate | < 40% | Vercel Analytics |
| Scroll depth homepage | > 60% | Vercel Analytics |
| Join form submissions | 0 → aktif per bulan | Supabase query |
| News/events views | > 100/bulan | Vercel Analytics |
| Studio usage (editor) | > 3 konten/minggu | Sanity analytics |
| Page load time | < 2 detik | Lighthouse |

---

## 3. Persona Pengguna

### 3.1 Persona 1: Andi (Pemilih Muda)
| Atribut | Detail |
|---------|--------|
| Usia | 22 tahun, mahasiswa |
| Perangkat | Smartphone (mobile-first) |
| Tujuan | Mencari tahu program PBB |
| Perilaku | Scroll cepat, suka visual, nggak suka teks panjang |
| Need | Info ringkas, CTA jelas, loading cepat |

### 3.2 Persona 2: Bu Sari (Kader Partai)
| Atribut | Detail |
|---------|--------|
| Usia | 45 tahun, pengurus DPC |
| Perangkat | Laptop, kadang HP |
| Tujuan | Update kegiatan partai, download press kit |
| Perilaku | Baca detail, cari arsip berita |
| Need | Navigasi jelas, konten terstruktur |

### 3.3 Persona 3: Raka (Calon Relawan)
| Atribut | Detail |
|---------|--------|
| Usia | 28 tahun, fresh graduate |
| Perangkat | Smartphone |
| Tujuan | Mendaftar jadi relawan |
| Perilaku | Langsung ke CTA, isi form cepat |
| Need | Form simpel, konfirmasi setelah daftar |

---

## 4. Fitur Produk

### 4.1 Epic: Informasi Partai (Profil & Brand)

| Fitur | Prioritas | Status | Catatan |
|-------|-----------|--------|---------|
| Halaman Profil (visi, misi, sejarah) | P0 | ✅ Placeholder | Butuh konten dari partai |
| Struktur Organisasi | P1 | ❌ Belum | Chart DPP/DPW |
| Program Prioritas | P0 | ✅ Placeholder | Butuh konten |
| Press Kit (logo, warna, guideline) | P0 | ✅ Placeholder | Butuh upload asset |
| Sayap Partai | P2 | ❌ Belum | Daftar organisasi sayap |

### 4.2 Epic: Konten Dinamis (News, Events, Blog)

| Fitur | Prioritas | Status | Catatan |
|-------|-----------|--------|---------|
| News listing + detail | P0 | ✅ Live + CMS | ISR 120s |
| Event listing + detail | P0 | ✅ Live + CMS | ISR 120s |
| Blog listing + detail | P0 | ✅ Live + CMS | ISR 120s |
| Kategori berita | P1 | ❌ Belum | Filter per kategori |
| Pencarian berita | P1 | ❌ Belum | Search by keyword |
| Pagination | P2 | ❌ Belum | Untuk list > 12 item |

### 4.3 Epic: Partisipasi Publik

| Fitur | Prioritas | Status | Catatan |
|-------|-----------|--------|---------|
| Join/Volunteer form | P0 | ✅ Live + DB | 5 field, validasi |
| Notifikasi email admin | P0 | ✅ Live | Via Resend |
| Export CSV data join | P1 | ❌ Belum | Admin dashboard |
| Captcha anti-spam | P1 | ❌ Belum | Mencegah spam form |
| Halaman Kontak + peta | P2 | ❌ Belum | Google Maps embed |

### 4.4 Epic: Galeri & Media

| Fitur | Prioritas | Status | Catatan |
|-------|-----------|--------|---------|
| Galeri foto grid | P1 | ❌ Belum | Lightbox viewer |
| Video embed (YouTube) | P2 | ❌ Belum | Dari URL |
| Social media strip | P0 | ✅ Live | IG/X/YouTube |

### 4.5 Epic: CMS & Admin

| Fitur | Prioritas | Status | Catatan |
|-------|-----------|--------|---------|
| Sanity Studio | P0 | ✅ Live | 8 content types |
| CRUD news | P0 | ✅ Live | Via Sanity |
| CRUD events | P0 | ✅ Live | Via Sanity |
| CRUD blog | P0 | ✅ Live | Via Sanity |
| CRUD FAQ | P0 | ✅ Live | Via Sanity |
| CRUD press kit | P0 | ✅ Live | Via Sanity |
| Upload gambar | P0 | ✅ Live | Sanity image field |

### 4.6 Epic: Teknis & Infrastruktur

| Fitur | Prioritas | Status | Catatan |
|-------|-----------|--------|---------|
| SSL/HTTPS | P0 | ✅ Live | Vercel auto |
| Responsive mobile | P0 | ✅ Live | Tailwind responsive |
| SEO dasar (meta, OG) | P0 | ✅ Live | Per halaman |
| ISR content cache | P0 | ✅ Live | Revalidate 120s |
| Auto-deploy CI/CD | P0 | ✅ Live | GitHub → Vercel |
| Custom domain | P0 | ⏳ | Arahkan DNS |
| Analytics | P1 | ❌ Belum | Vercel Analytics |

---

## 5. User Stories

### 5.1 Landing Page (Epic: Informasi Partai)
```
Sebagai pengunjung baru,
Saya ingin melihat homepage yang informatif dan menarik,
Sehingga saya tertarik untuk menjelajahi website lebih lanjut.
```
**Acceptance Criteria:**
- Hero section dengan tagline dan CTA
- Value props yang jelas (3 poin)
- Program prioritas terlihat
- News/events terbaru muncul otomatis
- Mobile responsive

### 5.2 News (Epic: Konten Dinamis)
```
Sebagai kader partai,
Saya ingin membaca berita terbaru partai,
Sehingga saya bisa update dengan kegiatan PBB.
```
**Acceptance Criteria:**
- List berita dengan thumbnail, judul, tanggal
- Detail berita dengan rich text
- Berita terbaru muncul otomatis dari CMS
- Empty state saat belum ada berita

### 5.3 Join Form (Epic: Partisipasi Publik)
```
Sebagai calon relawan,
Saya ingin mendaftar dengan form yang mudah,
Sehingga saya bisa bergabung dengan PBB.
```
**Acceptance Criteria:**
- 5 field: nama, email, kota, minat, WA
- Validasi client + server
- Konfirmasi sukses/gagal
- Data tersimpan di database
- Admin dapat notifikasi email

### 5.4 CMS (Epic: CMS & Admin)
```
Sebagai admin konten partai,
Saya ingin menambah dan mengedit berita dengan mudah,
Sehingga website selalu up-to-date tanpa bantuan developer.
```
**Acceptance Criteria:**
- Login ke Sanity Studio
- Create, read, update, delete news/events/blog
- Upload gambar
- Publish/draft status
- Preview sebelum publish

---

## 6. User Flow

### 6.1 First Visit (New User)
```
Landing Page → Scroll → Lihat Program → Lihat News/Events → CTA Join
                                                           ↓
                                                    Isi Form → Sukses
```

### 6.2 Returning User
```
Direct → /news → Baca Artikel → Share/Browse More
    atau
Direct → /events → Lihat Jadwal → Daftar Event
```

### 6.3 Admin Flow
```
Login Sanity → Dashboard → Pilih Content Type → Create/Edit → Publish
```

---

## 7. Spesifikasi Fungsional

### 7.1 Frontend

| Requirement | Spesifikasi |
|-------------|-------------|
| Framework | Next.js 16 (App Router) |
| Rendering | Server Components + ISR |
| Styling | Tailwind CSS 4 |
| Responsive | Mobile, tablet, desktop breakpoints |
| Loading | Server Components (no loading spinner) |
| Empty State | "Belum ada [konten]" untuk setiap list |
| Error State | "Not found" halaman untuk invalid slug |

### 7.2 API Routes

| Endpoint | Method | Fungsi |
|----------|--------|--------|
| `/api/join` | POST | Menerima form submission, validasi, simpan ke DB, kirim email |

### 7.3 CMS (Sanity)

| Requirement | Spesifikasi |
|-------------|-------------|
| Content Types | 8 (page, news, event, blog, faq, pressKit, socialEmbed, joinForm) |
| Rich Text | Block content (bold, italic, list, image) |
| Image Upload | Sanity built-in image field |
| Publishing | Publish/draft toggle |
| Preview | Sanity preview (optional) |

---

## 8. Non-Functional Requirements

### 8.1 Performance

| Metrik | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| First Contentful Paint (FCP) | < 1.5 detik |
| Largest Contentful Paint (LCP) | < 2.5 detik |
| Time to Interactive (TTI) | < 3 detik |
| Cumulative Layout Shift (CLS) | < 0.1 |

### 8.2 Reliability

| Metrik | Target |
|--------|--------|
| Uptime | > 99.9% (Vercel SLA) |
| ISR revalidate | 120 detik |
| Error rate | < 1% |

### 8.3 Security

| Requirement | Implementasi |
|-------------|--------------|
| HTTPS | Vercel auto SSL |
| Env variables | .env, tidak di source code |
| Input sanitization | React controlled inputs |
| Rate limiting | Belum (future) |

### 8.4 Accessibility

- Semantic HTML (header, nav, main, section, footer)
- Alt text untuk gambar (dari Sanity)
- Color contrast WCAG AA
- Keyboard navigable

---

## 9. Milestone & Timeline

### Fase 1: Foundation (✅ Selesai)
- Setup Next.js + Tailwind + Sanity
- Arsitektur + routing
- CI/CD (Husky + Vercel)
- AI development config

### Fase 2: Core Pages (✅ Selesai)
- Homepage modular (7 sections)
- News, Events, Blog + CMS
- Halaman statis (Profil, Program, Press Kit, FAQ, Join)
- Header + Footer + navigasi

### Fase 3: Infrastructure (✅ Selesai)
- Sanity project + dataset
- Supabase project + migration
- Resend email integration
- Vercel deploy
- CORS + env config

### Fase 4: Launch Prep (⏳ In Progress)
- Arahkan domain ke Vercel
- Isi konten via Sanity (partai)
- Hero foto asli
- Testing mobile final

### Fase 5: Enhancement (📅 Future)
- Galeri foto + lightbox
- Struktur organisasi chart
- Pencarian berita
- Export CSV join data
- Captcha form

---

## 10. Glossary

| Istilah | Definisi |
|---------|----------|
| ISR | Incremental Static Regeneration — halaman statis yang di-rebuild periodik |
| SSR | Server-Side Rendering — halaman di-render di server |
| CMS | Content Management System — sistem kelola konten |
| GROQ | Query language untuk Sanity |
| Sanity Studio | GUI editor untuk konten |
| Supabase | Backend as a Service (database + auth + storage) |
| Resend | Email API service |
| Vercel | Hosting platform untuk frontend |
| Husky | Git hooks — auto lint sebelum commit |

---

*Dokumen ini adalah living document dan akan diperbarui seiring perkembangan produk.*
