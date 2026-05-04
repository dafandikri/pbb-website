# Homepage Ringkas Design Spec

## Overview
Homepage ringkas untuk PBB fokus pada CTA Join/Volunteer dan memperkenalkan brand secara cepat untuk audiens muda. Struktur modular, mudah dibaca, dan mendukung konten news/events dari Sanity.

## Goals
- Mendorong konversi ke Join/Volunteer.
- Memberi gambaran ringkas tentang PBB dan isu prioritas.
- Menampilkan update terbaru (news/events) secara teratur.

## Information Architecture (Homepage)
1. Hero (headline + subhead + CTA Join)
2. Value Props (3 poin singkat)
3. Program Highlights (4 isu utama)
4. Latest Updates (3 news + 2 events)
5. Join Block (form ringkas)
6. Social Strip (embed/links)
7. Footer

## Data Flow
- Hero, value props, program highlights: statis dari constant (bisa dipindah ke Sanity nanti).
- News/Events: fetch dari Sanity dengan ISR (revalidate 120s).
- Join form: POST ke `/api/join`.

## Visual Direction
- Typography: display serif untuk headline, sans untuk body.
- Layout: max width 1200, whitespace besar.
- Color: background krem lembut, aksen hijau-emas.
- Components: card sederhana, CTA kontras.

## Non-Goals
- Tidak membuat homepage versi long-form editorial.
- Tidak menambah fitur interaktif berat.
