// ============================================
// LOADING SCREEN & THEME MANAGEMENT
// ============================================

// Loading Screen Handler
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  }
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark-mode';
if (currentTheme === 'light-mode') {
  document.body.classList.add('light-mode');
  updateThemeIcon('dark_mode');
} else {
  document.body.classList.remove('light-mode');
  updateThemeIcon('light_mode');
}

function updateThemeIcon(iconName) {
  if (themeToggle) {
    const icon = themeToggle.querySelector('.icon');
    if (icon) {
      icon.textContent = iconName;
    }
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    themeToggle.classList.add('rotating');
    
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
    updateThemeIcon(isLightMode ? 'dark_mode' : 'light_mode');
    
    setTimeout(() => {
      themeToggle.classList.remove('rotating');
    }, 600);
  });
}

// ============================================
// SCROLL ANIMATIONS WITH STAGGER
// ============================================

// Custom Cursor Glow Effect
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate glow effect with smooth trailing
function animateGlow() {
  // Smooth movement for glow effect
  glowX += (mouseX - glowX) * 0.15;
  glowY += (mouseY - glowY) * 0.15;
  
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  
  requestAnimationFrame(animateGlow);
}

animateGlow();

// Hover effects for interactive elements
const interactiveElements = document.querySelectorAll('button, a, .btn, input, textarea, .contact-card, .blog-card, .gallery-item, .chip');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    if (cursorGlow) cursorGlow.style.width = '60px';
    if (cursorGlow) cursorGlow.style.height = '60px';
    if (cursorGlow) cursorGlow.style.borderColor = 'rgba(108, 143, 255, 0.7)';
    element.style.transform = 'scale(1.02)';
  });
  
  element.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.width = '40px';
    if (cursorGlow) cursorGlow.style.height = '40px';
    if (cursorGlow) cursorGlow.style.borderColor = 'rgba(108, 143, 255, 0.5)';
    element.style.transform = 'scale(1)';
  });
});

// Hide glow when leaving window
document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  if (cursorGlow) cursorGlow.style.opacity = '1';
});

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('is-active');
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('is-active');
      navLinks.classList.remove('open');
    });
  });
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero::before, .hero::after, .cta-banner::before, .cta-banner::after');
  
  parallaxElements.forEach(el => {
    el.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show success message
    const successAlert = document.getElementById('successAlert');
    if (successAlert) {
      successAlert.classList.add('show');
      
      // Add animation
      successAlert.style.animation = 'slideInUp 0.6s ease-out';
      
      // Reset form
      contactForm.reset();
      
      // Hide alert after 5 seconds
      setTimeout(() => {
        successAlert.classList.remove('show');
      }, 5000);
    }
    
    // Here you can add code to send the form data to your backend
    // Example with fetch:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, subject, message })
    // });
  });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Analog Clock with Date
function initializeClock() {
  const canvas = document.getElementById('clockCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const radius = canvas.width / 2;
  
  function drawClock() {
    // Clear canvas completely
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Translate to center
    ctx.translate(radius, radius);
    
    // Draw components
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
    
    // Restore context state
    ctx.restore();
  }
  
  function drawFace(ctx, radius) {
    // Draw circle background
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(26, 26, 26, 0.9)';
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = 'rgba(74, 158, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, 2 * Math.PI);
    ctx.fillStyle = '#4a9eff';
    ctx.fill();
  }
  
  function drawNumbers(ctx, radius) {
    ctx.font = Math.floor(radius * 0.15) + 'px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    
    for (let num = 1; num <= 12; num++) {
      const ang = num * Math.PI / 6;
      ctx.save();
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.75);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.restore();
    }
  }
  
  function drawTime(ctx, radius) {
    const now = new Date();
    
    // Hour hand
    let hour = now.getHours() % 12;
    hour = (hour * Math.PI / 6) + (now.getMinutes() * Math.PI / (6 * 60));
    drawHand(ctx, hour, radius * 0.5, 4, '#4a9eff');
    
    // Minute hand
    let minute = (now.getMinutes() * Math.PI / 30) + (now.getSeconds() * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.7, 3, 'rgba(217, 225, 197, 0.9)');
    
    // Second hand
    let second = (now.getSeconds() * Math.PI / 30);
    drawHand(ctx, second, radius * 0.75, 1.5, 'rgba(217, 225, 197, 0.6)');
  }
  
  function drawHand(ctx, ang, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(ang) * length, -Math.cos(ang) * length);
    ctx.stroke();
  }
  
  // Update date display
  function updateDate() {
    const dateDisplay = document.getElementById('dateDisplay');
    if (dateDisplay) {
      const now = new Date();
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      dateDisplay.textContent = dateString;
    }
  }
  
  updateDate();
  drawClock();
  
  // Update clock every second
  setInterval(drawClock, 1000);
}

// Initialize clock when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClock);
} else {
  initializeClock();
}

// ============================================
// TECH SLIDER FUNCTIONALITY
// ============================================

// Tech Slider
let currentSlide = 0;
const totalSlides = 3;

const techSlider = document.getElementById('techSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

function updateSlider() {
  if (techSlider) {
    const translateX = -currentSlide * (100 / totalSlides);
    techSlider.style.transform = `translateX(${translateX}%)`;
  }
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
}

// Event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => goToSlide(index));
});

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// ============================================
// SKILLS PROGRESS ANIMATION
// ============================================

function animateCounter(el, target, duration) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + '%';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.progress-item');
      items.forEach((item, i) => {
        const fill = item.querySelector('.progress-fill');
        const counterEl = item.querySelector('.progress-counter');
        const target = parseInt(fill.getAttribute('data-width'));

        // stagger each bar
        setTimeout(() => {
          item.classList.add('progress-item--active');
          fill.style.width = target + '%';
          if (counterEl) animateCounter(counterEl, target, 1200);
        }, i * 180);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const progressSection = document.querySelector('.progress-grid');
if (progressSection) {
  progressObserver.observe(progressSection);
}



// ============================================
// MOBILE BOTTOM NAV
// ============================================

(function () {
  const bottomNav = document.getElementById('bottomNav');
  if (!bottomNav) return;

  // ── Active page highlight ──
  const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.bnav-item[data-page]').forEach(item => {
    if (item.dataset.page === page) item.classList.add('active');
  });

  // ── Theme toggle via bottom nav ──
  const bnavTheme = document.getElementById('bnavTheme');
  const bnavIcon  = document.getElementById('bnavThemeIcon');

  function syncBnavIcon() {
    if (!bnavIcon) return;
    bnavIcon.textContent = document.body.classList.contains('light-mode') ? 'dark_mode' : 'light_mode';
  }
  syncBnavIcon();

  if (bnavTheme) {
    bnavTheme.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light-mode' : 'dark-mode');
      syncBnavIcon();
      // also sync desktop toggle icon if present
      const desktopIcon = document.querySelector('#themeToggle .icon');
      if (desktopIcon) desktopIcon.textContent = isLight ? 'dark_mode' : 'light_mode';
    });
  }

  // ── Hide on scroll down, show on scroll up ──
  let lastY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > lastY + 8 && currentY > 80) {
          bottomNav.classList.add('hidden');
        } else if (currentY < lastY - 8) {
          bottomNav.classList.remove('hidden');
        }
        lastY = currentY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
