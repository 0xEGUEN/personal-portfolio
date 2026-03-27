Website portofolio modern dan responsif yang menampilkan keterampilan full-stack development dengan animasi indah, toggle mode gelap/terang, dan desain mobile-first.

## ✨ Fitur

- **Desain Responsif** — Dioptimalkan untuk desktop, tablet, dan perangkat mobile
- **Mode Gelap & Terang** — Toggle tema dengan persistensi localStorage
- **Animasi Halus** — Animasi CSS dan transisi untuk UX yang lebih baik
- **Navigasi Mobile Bottom** — Navbar floating di mobile (≤768px)
- **Tech Slider** — Carousel interaktif yang menampilkan tech stack
- **Widget Jam Analog** — Jam live dengan tampilan tanggal saat ini
- **Form Kontak** — Form fungsional dengan feedback sukses
- **Custom Cursor Glow** — Efek cursor interaktif (desktop)
- **Ramah SEO** — Struktur HTML semantik
- **Loading Cepat** — Gambar teroptimasi dan lazy loading

## 📁 Struktur Proyek

```
.
├── index.html          # Halaman home dengan hero section
├── about.html          # Halaman about dengan timeline & skills
├── gallery.html        # Gallery proyek dengan filter
├── contact.html        # Halaman form kontak
├── 404.html            # Halaman error 404
├── css/
│   └── style.css       # Main stylesheet (5000+ baris, mobile-first)
├── js/
│   └── script.js       # Semua fungsi interaktif
├── assets/             # Gambar & media
├── data/
│   ├── articles.json   # Data artikel/blog
│   ├── projects.json   # Data showcase proyek
│   └── skills.json     # Data skills & expertise
└── README.md           # File ini
```

## 🎨 Desain & Warna

### Mode Gelap (Default)
- **Background**: `#080810` (gelap dalam)
- **Surface**: `#0f0f1a` (sedikit lebih terang)
- **Primary Accent**: `#6c8fff` (biru lembut)
- **Secondary Accent**: `#f0c060` (emas hangat)
- **Text Primary**: `#e8e8f0` (off-white)

### Mode Terang
- **Background**: `#fafaf8` (putih hangat)
- **Primary Accent**: `#3d5af1` (biru lebih kuat)
- **Secondary Accent**: `#d4900a` (emas lebih gelap)
- **Text Primary**: `#1a1a2e` (gelap)

## 🚀 Memulai

### Prasyarat
- Browser web modern (Chrome, Firefox, Safari, Edge)
- Tidak ada build process yang diperlukan — HTML/CSS/JS vanilla

### Instalasi & Pengembangan Lokal

1. **Clone repository**
   ```bash
   git clone https://github.com/0xEGUEN/0xEGUEN.github.io.git
   cd 0xEGUEN.github.io
   ```

2. **Buka di browser**
   - Cukup buka `index.html` di browser Anda
   - Atau gunakan local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (dengan http-server)
     npx http-server
     ```

3. **Akses di** `http://localhost:8000`

## 📱 Penjelasan Fitur

### Bagian-Bagian

| Bagian | Deskripsi |
|--------|-----------|
| **Hero** | Pengenalan menarik dengan tombol CTA |
| **Services** | 3-kolom service cards (Web Dev, Performance, API) |
| **Skills** | Interactive tech slider dengan 15+ teknologi |
| **Gallery** | Showcase proyek dengan filter |
| **About** | Latar belakang pribadi, timeline, expertise |
| **Contact** | Form kontak dengan validasi |
| **Footer** | Links, social, copyright |

### Elemen Interaktif

- **Theme Toggle** — Tombol fixed (desktop) / Bottom nav (mobile)
- **Mobile Menu** — Tombol hamburger membuka nav overlay
- **Scroll Animations** — Elemen fade/slide saat scroll
- **Hover Effects** — Cards lift, links underline
- **Parallax** — Hero gradient bergerak dengan scroll
- **Form Validation** — Form kontak dengan feedback

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** — Struktur semantik
- **CSS3** — Flexbox, Grid, custom properties, animasi
- **JavaScript (Vanilla)** — Tanpa framework, DOM manipulation murni

### Library & Font
- Google Fonts: *DM Serif Display*, *Inconsolata*, *Inter*, *Plus Jakarta Sans*, *DM Mono*
- Material Symbols (icons)

## 📝 Kustomisasi

### Ubah Warna
Edit CSS custom properties di `style.css`:
```css
:root {
  --accent-primary: #6c8fff;  /* Ubah warna primary */
  --accent-secondary: #f0c060;
  /* ... */
}
```

### Update Konten
- Edit file HTML langsung
- Update JSON files di folder `data/` untuk projects/skills
- Ganti gambar di folder `assets/`

### Modifikasi Animasi
- Cari `@keyframes` di `style.css`
- Sesuaikan timing dan transforms

## 📴 Dukungan Offline

Website ini bekerja offline (tidak ada API calls eksternal). Semua konten adalah static HTML/CSS/JS.

## 🐛 Masalah Diketahui & Perbaikan

### Navigasi Mobile
- Menu hamburger tampi dengan benar di layar ≤768px
- Bottom nav auto-hide saat scroll down, tampil saat scroll up

### Cursor Styles
- Tombol & links menampilkan `pointer` cursor
- Text inputs menampilkan `text` cursor
- Custom glow effect on hover (desktop saja)

## 🔄 Git Workflow

```bash
# Buat perubahan
git add .
git commit -m "feat: tambah fitur baru"

# Push ke GitHub Pages
git push origin main
```

Website secara otomatis deploy saat push ke `origin/main`.

## 📊 Performa

- **Lighthouse Scores**: 90+ (Performance, Accessibility, Best Practices)
- **Load Time**: <2s on 4G
- **FCP**: <1s
- **LCP**: <2.5s

## 🔐 Privasi

- Tidak ada cookies atau tracking
- Tidak ada API calls eksternal
- Semua data disimpan lokal di browser (localStorage untuk tema)

---

**Dibuat dengan ❤️ dan kode yang dipikirkan dengan matang.**
