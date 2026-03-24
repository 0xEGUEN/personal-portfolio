A modern, responsive portfolio website showcasing full-stack development skills with beautiful animations, dark/light mode toggle, and mobile-first design.

## ✨ Features

- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Dark & Light Mode** — Theme toggle with localStorage persistence
- **Smooth Animations** — CSS animations and transitions for enhanced UX
- **Mobile Bottom Navigation** — Floating nav bar on mobile (≤768px)
- **Tech Slider** — Interactive carousel showcasing tech stack
- **Analog Clock Widget** — Live clock with current date display
- **Contact Form** — Functional form with success feedback
- **Custom Cursor Glow** — Interactive cursor effects (desktop)
- **SEO Friendly** — Semantic HTML structure
- **Fast Loading** — Optimized images and lazy loading

## 📁 Project Structure

```
.
├── index.html          # Home page with hero section
├── about.html          # About page with timeline & skills
├── gallery.html        # Project gallery with filters
├── contact.html        # Contact form page
├── 404.html            # 404 error page
├── css/
│   └── style.css       # Main stylesheet (5000+ lines, mobile-first)
├── js/
│   └── script.js       # All interactive functionality
├── assets/             # Images & media
├── data/
│   ├── articles.json   # Blog/article data
│   ├── projects.json   # Project showcase data
│   └── skills.json     # Skills & expertise data
└── README.md           # This file
```

## 🎨 Design & Colors

### Dark Mode (Default)
- **Background**: `#080810` (deep dark)
- **Surface**: `#0f0f1a` (slightly lighter)
- **Primary Accent**: `#6c8fff` (soft blue)
- **Secondary Accent**: `#f0c060` (warm gold)
- **Text Primary**: `#e8e8f0` (off-white)

### Light Mode
- **Background**: `#fafaf8` (warm white)
- **Primary Accent**: `#3d5af1` (stronger blue)
- **Secondary Accent**: `#d4900a` (darker gold)
- **Text Primary**: `#1a1a2e` (dark)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build process required — vanilla HTML/CSS/JS

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xEGUEN/0xEGUEN.github.io.git
   cd 0xEGUEN.github.io
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **View at** `http://localhost:8000`

## 📱 Features Breakdown

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Eye-catching introduction with CTA buttons |
| **Services** | 3-column service cards (Web Dev, Performance, API) |
| **Skills** | Interactive tech slider with 15+ technologies |
| **Gallery** | Filterable project showcase |
| **About** | Personal background, timeline, expertise |
| **Contact** | Contact form with validation |
| **Footer** | Links, social, copyright |

### Interactive Elements

- **Theme Toggle** — Fixed button (desktop) / Bottom nav (mobile)
- **Mobile Menu** — Hamburger button opens overlay nav
- **Scroll Animations** — Elements fade/slide on scroll
- **Hover Effects** — Cards lift, links underline
- **Parallax** — Hero gradient moves with scroll
- **Form Validation** — Contact form with feedback

## 🛠️ Technologies Used

### Frontend
- **HTML5** — Semantic structure
- **CSS3** — Flexbox, Grid, custom properties, animations
- **JavaScript (Vanilla)** — No frameworks, pure DOM manipulation

### Libraries & Fonts
- Google Fonts: *DM Serif Display*, *Inconsolata*, *Inter*, *Plus Jakarta Sans*, *DM Mono*
- Material Symbols (icons)

## 📝 Customization

### Change Colors
Edit CSS custom properties in `style.css`:
```css
:root {
  --accent-primary: #6c8fff;  /* Change primary color */
  --accent-secondary: #f0c060;
  /* ... */
}
```

### Update Content
- Edit HTML files directly
- Update JSON files in `data/` folder for projects/skills
- Replace images in `assets/` folder

### Modify Animations
- Find `@keyframes` in `style.css`
- Adjust timing and transforms

## 📴 Offline Support

This site works offline (no external API calls). All content is static HTML/CSS/JS.

## 🐛 Known Issues & Fixes

### Mobile Navigation
- Hamburger menu properly displays on screens ≤768px
- Bottom nav auto-hides on scroll down, shows on scroll up

### Cursor Styles
- Buttons & links show `pointer` cursor
- Text inputs show `text` cursor
- Custom glow effect on hover (desktop only)

## 🔄 Git Workflow

```bash
# Make changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub Pages
git push origin main
```

Site automatically deploys on push to `origin/main`.

## 📊 Performance

- **Lighthouse Scores**: 90+ (Performance, Accessibility, Best Practices)
- **Load Time**: <2s on 4G
- **FCP**: <1s
- **LCP**: <2.5s

## 🔐 Privacy

- No cookies or tracking
- No external API calls
- All data stored locally in browser (localStorage for theme)
---

**Made with ❤️ and carefully crafted code.**
