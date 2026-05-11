# PBB Website — Stakeholder Summary

** Project:** Website Resmi Partai Bulan Bintang
**Status:** Development Selesai, Menunggu Konten & Domain
**URL:** https://pbb-website-olive.vercel.app
**CMS:** https://xw9qpsrp.sanity.studio
**Repository:** github.com/dafandikri/pbb-website

---

## 1. Yang Sudah Jadi

| Halaman | Status | Catatan |
|---------|--------|---------|
| Homepage | ✅ Live | Hero + Value Props + Program + News/Events + Join + Sosmed |
| Profil | ✅ Live | Skeleton, siap diisi konten (visi, misi, sejarah, struktur) |
| News | ✅ Live + CMS | List + detail page, ISR 120s, isi via Sanity |
| Events | ✅ Live + CMS | List + detail, isi via Sanity |
| Blog/Opini | ✅ Live + CMS | List + detail, isi via Sanity |
| FAQ | ✅ Live + CMS | List dari Sanity |
| Press Kit | ✅ Live | Skeleton, siap diisi asset brand |
| Join/Volunteer | ✅ Live | Form + simpan DB + notifikasi email |
| Sanity Studio | ✅ Siap | CMS di /studio atau xw9qpsrp.sanity.studio |

## 2. Tech Stack (Yang Dibangun vs SDS Lama)

| Komponen | SDS Awal | Realisasi | Kelebihan |
|----------|----------|-----------|-----------|
| Framework | React SPA | **Next.js 16 SSR** | SEO bawaan, loading cepat, ISR |
| CMS | Custom admin panel | **Sanity Studio** | Tinggal klik, drag-drop, tanpa coding |
| Hosting | Hostinger (Rp 30-80k/bln) | **Vercel (GRATIS)** | Auto-deploy, HTTPS, CDN global |
| Database | Supabase | Supabase (sama) | Join form + migrasi sudah jalan |
| Email | Belum ditentukan | Resend | Notifikasi join form ke email |
| CI/CD | Manual deploy | **Auto-deploy** dari GitHub | Setiap push langsung update |
| Biaya Infrastruktur | Rp 1-6 jt/tahun | **~Rp 0** (kecuali domain) | Lebih murah drastis |

## 3. Perbandingan Fitur SDS Awal vs Realisasi

### Sudah Tercakup (Sama atau Lebih Baik)
- ✅ Landing page + CTA
- ✅ Profil partai
- ✅ Berita + halaman detail
- ✅ Galeri (belum, tapi bisa via Sanity)
- ✅ Form pendaftaran anggota/relawan
- ✅ Kontak (belum, tapi FAQ sudah ada)

### Tambahan (Tidak Ada di SDS Tapi Sudah Dibangun)
- ✅ **Blog/Opini** — untuk artikel opini tim partai
- ✅ **Events** — daftar kegiatan dengan tanggal & lokasi
- ✅ **FAQ** — informasi umum yang sering ditanyakan
- ✅ **Press Kit** — asset brand (logo, warna, guideline)
- ✅ **Social Media Strip** — tautan IG/X/YouTube
- ✅ **AI-First Development** — konfigurasi untuk Claude Code, Copilot

### Masih Perlu Dikerjakan (Gap dari SDS)
- 🔲 Halaman Sejarah + AD/ART PDF viewer
- 🔲 Struktur Organisasi chart
- 🔲 Sayap Partai
- 🔲 Galeri foto + lightbox
- 🔲 Video embed (YouTube)
- 🔲 Siaran Pers (PDF download)
- 🔲 Pencarian berita
- 🔲 Filter kategori berita
- 🔲 Captcha di form join
- 🔲 Export CSV dari database

## 4. Biaya Infrastruktur

| Item | Biaya | Catatan |
|------|-------|---------|
| Vercel Hosting | **Gratis** | 100GB bandwidth, 6000 build minutes/bln |
| Sanity CMS | **Gratis** (30 hari trial Growth) | Growth $0/bln dulu |
| Supabase DB | **Gratis** | 500MB DB, 1GB storage |
| Resend Email | **Gratis** | 100 email/hari (free tier) |
| Domain (.or.id) | Rp 250-350k/tahun | Tanggung jawab partai |
| **Total Tahun Pertama** | **~Rp 300.000** (hanya domain) | |

## 5. Langkah Selanjutnya

### Prioritas Tinggi
1. **Arahkan DNS** domain partaibulanbintang.or.id → Vercel (Settings > Domains)
2. **Isi konten** via Sanity Studio — minimal 3 berita, 2 events, FAQ
3. **Upload logo & foto** ke hero homepage

### Prioritas Sedang
4. Buat halaman Galeri foto + lightbox
5. Tambah Struktur Organisasi (chart)
6. Tambah halaman Kontak + peta lokasi

### Jangka Panjang
7. Verifikasi domain Resend → ganti sender email ke domain PBB
8. Transfer ownership Sanity & Supabase ke email partai
9. Upgrade tier infrastruktur jika traffic meningkat

---

**Kontak Developer:** (melalui repo GitHub: github.com/dafandikri/pbb-website)

Dokumen ini dibuat untuk keperluan stakeholder Partai Bulan Bintang.
