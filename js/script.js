const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
};
const isTouchDevice = () => {
  return (('ontouchstart' in window) || 
          (navigator.maxTouchPoints > 0) || 
          (navigator.msMaxTouchPoints > 0));
};
const isLowPerformanceDevice = () => {
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
    return true;
  }
  if (navigator.connection && navigator.connection.effectiveType) {
    return navigator.connection.saveData === true ||
           navigator.connection.effectiveType === 'slow-2g' ||
           navigator.connection.effectiveType === '2g' ||
           navigator.connection.effectiveType === '3g';
  }
  return false;
};
const shouldUseDesktopEffects = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return window.matchMedia('(hover: hover)').matches &&
         window.matchMedia('(pointer: fine)').matches &&
         !isLowPerformanceDevice();
};
let isZooming = false;
let zoomTimeout = null;
const detectZoom = () => {
  if (!isMobileDevice()) return;
  isZooming = true;
  document.documentElement.classList.add('zoomed');
  clearTimeout(zoomTimeout);
  zoomTimeout = setTimeout(() => {
    isZooming = false;
    document.documentElement.classList.remove('zoomed');
  }, 500);
};
if (isMobileDevice()) {
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      detectZoom();
    }
  }, { passive: true });
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      detectZoom();
    }
  }, { passive: true });
  document.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      detectZoom();
    }
  }, { passive: true });
}
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  }
});
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
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
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.style.animationPlayState = 'paused';
  } else {
    document.body.style.animationPlayState = 'running';
  }
});
const cursor = document.getElementById('cursor');
const cursorGlow = document.getElementById('cursor-glow');
const shouldEnableCursorGlow = shouldUseDesktopEffects() && cursorGlow;
if (shouldEnableCursorGlow) {
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let glowAnimationId = null;
  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      startGlowAnimation();
    } else if (glowAnimationId) {
      cancelAnimationFrame(glowAnimationId);
    }
  });
  document.addEventListener('mousemove', throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, 16));
  function animateGlow() {
    if (!isPageVisible) return;
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
    glowAnimationId = requestAnimationFrame(animateGlow);
  }
  function startGlowAnimation() {
    if (!glowAnimationId) {
      glowAnimationId = requestAnimationFrame(animateGlow);
    }
  }
  startGlowAnimation();
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
  document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursorGlow) cursorGlow.style.opacity = '1';
  });
} else {
  if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }
}
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('is-active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('is-active');
      navLinks.classList.remove('open');
    });
  });
}
const navbar = document.getElementById('navbar');
const navbarScroller = throttle(function() {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, 16);
window.addEventListener('scroll', navbarScroller, { passive: true });
const enableParallax = shouldUseDesktopEffects();
if (enableParallax) {
  const parallaxSections = [
    {
      element: document.querySelector('.hero'),
      variableName: '--hero-parallax-y',
      strength: 0.12,
    },
    {
      element: document.querySelector('.cta-banner'),
      variableName: '--cta-parallax-y',
      strength: 0.08,
    },
  ].filter((section) => section.element);
  if (parallaxSections.length) {
    const parallaxHandler = throttle(function() {
      const scrolled = window.pageYOffset;
      parallaxSections.forEach(({ element, variableName, strength }) => {
        element.style.setProperty(variableName, `${scrolled * strength}px`);
      });
    }, 16);
    parallaxHandler();
    window.addEventListener('scroll', parallaxHandler, { passive: true });
  }
}
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !subject || !message) {
      showAlert('Please fill in all fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    try {
      const response = await fetch('https://formsubmit.co/ajax/adwarahmant@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (response.ok) {
        showAlert('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      } else {
        showAlert('Failed to send message. Please try again.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showAlert('Error sending message. Please try again later.', 'error');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
function showAlert(message, type) {
  const alertEl = document.getElementById('successAlert');
  if (alertEl) {
    alertEl.textContent = message;
    alertEl.className = `alert alert-${type}`;
    alertEl.classList.add('show');
    setTimeout(() => {
      alertEl.classList.remove('show');
    }, 5000);
  }
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
if (shouldUseDesktopEffects()) {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      if (e.pointerType === 'touch') return;
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
      const rippleTimeout = setTimeout(() => {
        ripple.parentNode === this && ripple.remove();
      }, 600);
      // Cleanup on button removal
      ripple.addEventListener('transitionend', () => {
        clearTimeout(rippleTimeout);
        ripple.parentNode === this && ripple.remove();
      });
    });
  });
}
// ============================================
// ANALOG CLOCK WITH DATE
// ============================================
// Clock configuration constants
const CLOCK_CONFIG = {
  FACE_RADIUS: 0.9,
  NUMBER_FONT_SIZE: 0.15,
  NUMBER_DISTANCE: 0.75,
  HOUR_HAND_LENGTH: 0.5,
  HOUR_HAND_WIDTH: 4,
  MINUTE_HAND_LENGTH: 0.7,
  MINUTE_HAND_WIDTH: 3,
  SECOND_HAND_LENGTH: 0.75,
  SECOND_HAND_WIDTH: 1.5,
  CENTER_DOT_RADIUS: 0.08,
  HOUR_ANGLE: Math.PI / 6,
  MINUTE_ANGLE: Math.PI / 30,
  SECOND_ANGLE: Math.PI / 30,
  FACE_BG_DARK: 'rgba(26, 26, 26, 0.9)',
  FACE_BG_LIGHT: 'rgba(245, 245, 245, 0.95)',
  BORDER_DARK: 'rgba(74, 158, 255, 0.5)',
  BORDER_LIGHT: 'rgba(61, 90, 241, 0.4)',
  CENTER_DOT_DARK: '#4a9eff',
  CENTER_DOT_LIGHT: '#3d5af1',
  NUMBER_COLOR_DARK: 'rgba(255, 255, 255, 0.8)',
  NUMBER_COLOR_LIGHT: 'rgba(26, 26, 46, 0.8)',
  HOUR_HAND_COLOR_DARK: '#4a9eff',
  HOUR_HAND_COLOR_LIGHT: '#3d5af1',
  MINUTE_HAND_COLOR_DARK: 'rgba(217, 225, 197, 0.9)',
  MINUTE_HAND_COLOR_LIGHT: 'rgba(139, 157, 111, 0.9)',
  SECOND_HAND_COLOR_DARK: 'rgba(217, 225, 197, 0.6)',
  SECOND_HAND_COLOR_LIGHT: 'rgba(139, 157, 111, 0.6)'
};
let clockUpdateInterval = null;
function getClockColors() {
  const isLight = document.body.classList.contains('light-mode');
  return {
    faceBg: isLight ? CLOCK_CONFIG.FACE_BG_LIGHT : CLOCK_CONFIG.FACE_BG_DARK,
    border: isLight ? CLOCK_CONFIG.BORDER_LIGHT : CLOCK_CONFIG.BORDER_DARK,
    centerDot: isLight ? CLOCK_CONFIG.CENTER_DOT_LIGHT : CLOCK_CONFIG.CENTER_DOT_DARK,
    number: isLight ? CLOCK_CONFIG.NUMBER_COLOR_LIGHT : CLOCK_CONFIG.NUMBER_COLOR_DARK,
    hourHand: isLight ? CLOCK_CONFIG.HOUR_HAND_COLOR_LIGHT : CLOCK_CONFIG.HOUR_HAND_COLOR_DARK,
    minuteHand: isLight ? CLOCK_CONFIG.MINUTE_HAND_COLOR_LIGHT : CLOCK_CONFIG.MINUTE_HAND_COLOR_DARK,
    secondHand: isLight ? CLOCK_CONFIG.SECOND_HAND_COLOR_LIGHT : CLOCK_CONFIG.SECOND_HAND_COLOR_LIGHT
  };
}
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
    const colors = getClockColors();
    // Draw circle background
    ctx.beginPath();
    ctx.arc(0, 0, radius * CLOCK_CONFIG.FACE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = colors.faceBg;
    ctx.fill();
    // Draw border
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 2;
    ctx.stroke();
    // Draw center dot
    ctx.beginPath();
    ctx.arc(0, 0, radius * CLOCK_CONFIG.CENTER_DOT_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = colors.centerDot;
    ctx.fill();
  }
  function drawNumbers(ctx, radius) {
    const colors = getClockColors();
    ctx.font = Math.floor(radius * CLOCK_CONFIG.NUMBER_FONT_SIZE) + 'px Arial';
    ctx.fillStyle = colors.number;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (let num = 1; num <= 12; num++) {
      const ang = num * CLOCK_CONFIG.HOUR_ANGLE;
      ctx.save();
      ctx.rotate(ang);
      ctx.translate(0, -radius * CLOCK_CONFIG.NUMBER_DISTANCE);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.restore();
    }
  }
  function drawTime(ctx, radius) {
    const colors = getClockColors();
    const now = new Date();
    // Hour hand
    let hour = now.getHours() % 12;
    hour = (hour * CLOCK_CONFIG.HOUR_ANGLE) + (now.getMinutes() * CLOCK_CONFIG.HOUR_ANGLE / 60);
    drawHand(ctx, hour, radius * CLOCK_CONFIG.HOUR_HAND_LENGTH, CLOCK_CONFIG.HOUR_HAND_WIDTH, colors.hourHand);
    // Minute hand
    let minute = (now.getMinutes() * CLOCK_CONFIG.MINUTE_ANGLE) + (now.getSeconds() * CLOCK_CONFIG.MINUTE_ANGLE / 60);
    drawHand(ctx, minute, radius * CLOCK_CONFIG.MINUTE_HAND_LENGTH, CLOCK_CONFIG.MINUTE_HAND_WIDTH, colors.minuteHand);
    // Second hand
    let second = (now.getSeconds() * CLOCK_CONFIG.SECOND_ANGLE);
    drawHand(ctx, second, radius * CLOCK_CONFIG.SECOND_HAND_LENGTH, CLOCK_CONFIG.SECOND_HAND_WIDTH, colors.secondHand);
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
  // Listen for theme changes - optimized without MutationObserver
  updateDate();
  drawClock();
  // Track theme state to avoid unnecessary redraws
  let lastTheme = document.body.classList.contains('light-mode');
  // Update clock every second and stop on page hidden or during zoom
  function startClockUpdate() {
    clockUpdateInterval = setInterval(() => {
      // Skip updates during zoom to prevent jank
      if (document.hidden || isZooming) {
        return;
      }
      // Check if theme changed and redraw
      const currentTheme = document.body.classList.contains('light-mode');
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        drawClock();
      } else {
        // Just update the clock display
        drawClock();
      }
    }, 1000);
  }
  startClockUpdate();
  // Handle visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (clockUpdateInterval) clearInterval(clockUpdateInterval);
    } else {
      if (!isZooming) startClockUpdate();
    }
  });
  // Pause clock update during zoom gesture
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2 && clockUpdateInterval) {
      clearInterval(clockUpdateInterval);
    }
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (e.touches.length < 2 && !clockUpdateInterval && !document.hidden) {
      setTimeout(() => {
        if (!isZooming) startClockUpdate();
      }, 600);
    }
  }, { passive: true });
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
const techSlider = document.getElementById('techSlider');
if (techSlider) {
  let currentSlide = 0;
  const totalSlides = 3;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');
  function updateSlider() {
    const translateX = -currentSlide * (100 / totalSlides);
    techSlider.style.transform = `translateX(${translateX}%)`;
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
  // Auto-slide every 5 seconds with visibility check
  let sliderInterval = setInterval(() => {
    if (!document.hidden) nextSlide();
  }, 5000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(sliderInterval);
    } else {
      sliderInterval = setInterval(() => {
        if (!document.hidden) nextSlide();
      }, 5000);
    }
  });
}
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

