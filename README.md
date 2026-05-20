Portofolio pribadi saya yang showcasin full-stack development, dengan animasi keren, dark mode, dan responsive di semua device.

## ✨ Fitur

- Responsive di desktop, tablet, sama mobile
- Dark/light mode yang bisa di-toggle
- Animasi yang smooth dan gak berlebihan
- Bottom navigation di mobile
- Interactive tech slider
- Clock widget yang live update
- Contact form yang work
- Custom cursor effects
- Optimized & fast loading

## 📁 Struktur

```
.
├── index.html          # Home page
├── about.html          # About & skills
├── gallery.html        # Project showcase
├── contact.html        # Contact form
├── 404.html            # Error page
├── css/
│   └── style.css       # Main styles
├── js/
│   ├── script.js       # Main functionality
│   ├── about-page.js   # About page logic
│   ├── interactions-animation.js
│   └── text-animation.js
├── assets/             # Images
├── data/
│   ├── i18n.json       # Translations
│   ├── articles.json   # Blog articles
│   ├── projects.json   # Projects data
│   └── skills.json     # Skills data
└── README.md
```

## 🎨 Warna

**Dark Mode**: Biru (`#6c8fff`), emas (`#f0c060`), latar gelap

**Light Mode**: Biru lebih terang, emas lebih tua, latar putih

## 🚀 Setup

Gampang banget, cuma vanilla HTML/CSS/JS, gak perlu build process.

```bash
git clone https://github.com/0xEGUEN/0xEGUEN.github.io.git
cd 0xEGUEN.github.io
```

Terus buka `index.html` atau jalanin local server:

```bash
# Python
python -m http.server 8000

# atau Node.js
npx http-server
```

Buka `http://localhost:8000` dan done!

## �️ Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts & Material Symbols icons
- Responsive grid dan flexbox

## 📝 Customize

Pengen ubah warna? Edit CSS di `style.css`:
```css
--accent-primary: #6c8fff;
--accent-secondary: #f0c060;
```

Update konten:
- Edit HTML langsung
- Update JSON di folder `data/`
- Ganti image di `assets/`

Animasi? Cari `@keyframes` di CSS dan sesuaikan.

## 🚀 Deploy

Auto-deploy ke GitHub Pages saat push ke main branch. Gak perlu setup apapun.

## 📴 Works Offline

Semuanya static, gak ada API calls. Bisa dibuka offline.
