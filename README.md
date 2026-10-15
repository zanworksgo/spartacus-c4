# SPARTACUS Chapter 4

Landing page dan pusat informasi **Lomba Paskibra Antar Sekolah SPARTACUS CHAPTER 4**, diselenggarakan oleh Paskibra Unit 101 SMA Negeri 1 Jeneponto.

Dibangun dengan **React + TypeScript + Vite**, **Tailwind CSS**, **Motion**, **Lucide React**, dan **React Router**. Opsional: **Supabase** sebagai backend untuk panel admin unggah berkas (lihat bagian "Admin & upload berkas").

## Menjalankan proyek

```bash
npm install     # pasang dependensi
npm run dev     # jalankan server pengembangan (http://localhost:5173)
npm run build   # cek TypeScript + build produksi ke folder dist/
npm run preview # pratinjau hasil build
npm run lint    # jalankan ESLint
```

## Admin & upload berkas (Supabase)

Agar berkas & pamflet bisa diunggah/diganti tanpa mengubah kode, situs mendukung backend **Supabase** (gratis). Tanpa konfigurasi ini, situs tetap berjalan normal dan tautan yang kosong menampilkan "Segera tersedia".

Langkah setup:

1. Buat project gratis di [supabase.com](https://supabase.com).
2. Di **SQL Editor**, jalankan isi [`supabase/setup.sql`](supabase/setup.sql) (membuat tabel `site_content`, bucket storage `documents`, dan policy-nya).
3. Buat akun admin: **Authentication → Users → Add user**, isi email (sama dengan `VITE_ADMIN_EMAIL`), set password, aktifkan **Auto Confirm User**.
4. Salin `.env.example` menjadi `.env`, lalu isi:
   - `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` dari **Project Settings → API**.
   - `VITE_ADMIN_EMAIL` = email admin pada langkah 3.
5. Jalankan ulang `npm run dev` (atau redeploy), lalu buka **`/admin`**, login dengan password admin, dan unggah berkas/pamflet/tautan formulir.

Slot yang dikelola admin: formulir pengajuan (2), Pamflet Chapter 4, Surat Rekomendasi, Berkas Pendaftaran SMA & SMP (Word + PDF), Juklak & Juknis, format penilaian SMA & SMP (Khusus/Umum/Seni), dan pamflet Sejarah Chapter 1–3. Daftar slot: [`src/data/adminSlots.ts`](src/data/adminSlots.ts). Setiap file yang diunggah otomatis tampil di situs publik (mengganti nilai statis).

> Catatan deploy: tambahkan variabel `VITE_*` di atas pada dashboard hosting (mis. Vercel → Project Settings → Environment Variables). `anon key` aman dipakai di frontend; penulisan data hanya bisa setelah login admin (dilindungi RLS).

## Struktur penting

```
src/
  data/siteContent.ts     # SATU sumber data untuk semua konten & tautan
  data/adminSlots.ts      # daftar slot yang dikelola lewat /admin
  components/             # Navbar, Footer, HeroArtwork, DocRow, Reveal, Toast, dll.
  pages/                  # Home, Profil, Sejarah, Admin
  lib/                    # supabase client, content store, helper animasi & tautan
public/
  favicon.svg
  _redirects             # fallback SPA untuk Netlify
supabase/setup.sql       # skrip setup tabel, bucket, & policy Supabase
vercel.json              # fallback SPA (rewrite) untuk Vercel
```

## Mengubah konten

Hampir semua teks, tautan, dan aset diatur dari satu berkas:
[`src/data/siteContent.ts`](src/data/siteContent.ts). Berkas/pamflet yang diunggah lewat `/admin` otomatis menimpa nilai statis di sini.

### Mengganti logo dan ilustrasi hero
- **Logo:** letakkan berkas gambar di folder `public/` lalu isi `assets.logo` dengan pathnya (mis. `"/logo.svg"`). Jika `null`, dipakai wordmark teks "SPARTACUS C4".
- **Hero:** letakkan ilustrasi di `public/` lalu isi `assets.hero` (mis. `"/hero.png"`). Jika `null`, dipakai ilustrasi papan permainan SVG bawaan di [`src/components/HeroArtwork.tsx`](src/components/HeroArtwork.tsx) (mudah diganti/diubah).

### Mengubah isi Profil dan Sejarah
- **Profil:** objek `profil` di `siteContent.ts` (judul, intro, makna, penyelenggara, tujuan). Foto dokumentasi: isi array `profil.documentation` dengan `{ src, caption }`. Jika kosong, tampil placeholder "Dokumentasi belum tersedia".
- **Sejarah:** array `sejarah.chapters`. Setiap item punya `chapter`, `label`, `description`, `url`, dan `highlight`. Chapter 4 disorot dengan aksen pink.

### Mengisi tautan dokumen, formulir, dan WhatsApp
Gunakan URL lengkap, atau biarkan `null` jika belum tersedia:
- `schoolSubmissionUrl` — tautan formulir pengajuan sekolah.
- `info.kegiatan.items[]` dan `info.panduan.items[]` — tautan dokumen (`url`).
- `scoring[].url` — dokumen format penilaian.
- `contacts[].whatsapp` — nomor WhatsApp format internasional tanpa `+` (mis. `"6281234567890"`). Otomatis menjadi `https://wa.me/...`.

> Tautan `null` tidak membuka halaman kosong. Pengguna akan melihat notifikasi singkat ("Berkas belum tersedia" / "Tautan belum tersedia") dan label "Segera tersedia". **Jangan** memakai `href="#"` atau tautan palsu.

## Catatan hosting (routing SPA)
Aplikasi memakai client-side routing (`/profil`, `/sejarah`). Agar akses langsung ke rute tersebut tidak menghasilkan 404:
- **Vercel:** sudah disediakan `vercel.json` (rewrite semua ke `index.html`).
- **Netlify:** sudah disediakan `public/_redirects`.
- Hosting lain: arahkan semua rute ke `index.html` (SPA fallback).

## Aksesibilitas & performa
- Menghormati `prefers-reduced-motion` (gerakan mengambang dimatikan, transisi dikurangi).
- Navigasi keyboard, focus indicator, `aria-expanded` pada hamburger, tutup menu via Escape.
- Target sentuh ≥ 44px, tanpa horizontal overflow pada layar kecil.

## Status placeholder (perlu diisi)
Semua tautan berkas, URL formulir, nomor WhatsApp, logo, ilustrasi hero (opsional), dan foto dokumentasi masih `null`/kosong dan **belum berisi fakta apa pun**. Isi melalui `src/data/siteContent.ts`.
