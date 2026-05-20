const isMobileDevice = () => {
  const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileUA.test(navigator.userAgent) || (navigator.maxTouchPoints > 2);
};
const SITE_VERSION = '2026-04-05-i18n-data-1';
const LANGUAGE_STORAGE_KEY = 'site-language';
const LANGUAGE_META = {
  en: { code: 'EN', label: 'English', locale: 'en-US' },
  id: { code: 'ID', label: 'Bahasa Indonesia', locale: 'id-ID' },
  de: { code: 'DE', label: 'Deutsch', locale: 'de-DE' },
};
let I18N_DICTIONARY = { id: {}, de: {} };
const I18N_DATA_PATH = 'data/i18n.json';
let activeLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
if (!Object.prototype.hasOwnProperty.call(LANGUAGE_META, activeLanguage)) {
  activeLanguage = 'en';
}
let languageObserver = null;
let languageReapplyPending = false;
let isApplyingLanguage = false;
const normalize = (text) => (text || '').replace(/\s+/g, ' ').trim();
const normalizeI18nText = (text) => normalize(text);
const getLocale = () => {
  return LANGUAGE_META[activeLanguage]?.locale || 'en-US';
};
const loadLanguageDictionary = async () => {
  try {
    const response = await fetch(I18N_DATA_PATH, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    I18N_DICTIONARY = {
      id: payload && typeof payload.id === 'object' ? payload.id : {},
      de: payload && typeof payload.de === 'object' ? payload.de : {},
    };
    return true;
  } catch (error) {
    console.warn('Failed to load language dictionary from data folder:', error);
    return false;
  }
};
const translateRawText = (value, language = activeLanguage) => {
  if (!value || language === 'en') return value;
  const dict = I18N_DICTIONARY[language];
  if (!dict) return value;
  const normalized = normalizeI18nText(value);
  if (!normalized) return value;
  const translated = dict[normalized];
  if (!translated) return value;
  const leading = (value.match(/^\s*/) || [''])[0];
  const trailing = (value.match(/\s*$/) || [''])[0];
  return `${leading}${translated}${trailing}`;
};
const shouldSkip = (node) => {
  if (!node?.parentElement) return true;
  const parent = node.parentElement;
  if (parent.closest('[data-no-translate="true"]')) return true;
  if (parent.closest('.material-symbols-outlined')) return true;
  if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return true;
  return !normalize(node.nodeValue);
};
const applyTextNodeTranslations = (language = activeLanguage) => {
  if (!document.body) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  textNodes.forEach((node) => {
    node.__i18nOriginal ??= node.nodeValue;
    const translated = translateRawText(node.__i18nOriginal, language);
    if (node.nodeValue !== translated) node.nodeValue = translated;
  });
};
const applyAttributeTranslations = (language = activeLanguage) => {
  if (!document.body) return;
  const attrs = ['placeholder', 'aria-label', 'title'];
  const attrKeys = ['i18nPlaceholderOriginal', 'i18nAriaLabelOriginal', 'i18nTitleOriginal'];
  const selector = attrs.map(a => `[${a}]`).join(',');
  document.querySelectorAll(selector).forEach((element) => {
    if (element.closest('[data-no-translate="true"]')) return;
    attrs.forEach((attr, i) => {
      const key = attrKeys[i];
      const currentValue = element.getAttribute(attr);
      if (!currentValue) return;
      element.dataset[key] ??= currentValue;
      const translated = translateRawText(element.dataset[key], language);
      if (translated && currentValue !== translated) element.setAttribute(attr, translated);
    });
  });
};
const applyDocumentTitleTranslation = (language = activeLanguage) => {
  if (!document.documentElement.dataset.i18nDocumentTitleOriginal) {
    document.documentElement.dataset.i18nDocumentTitleOriginal = document.title;
  }
  document.title = translateRawText(document.documentElement.dataset.i18nDocumentTitleOriginal, language);
};
const applyLanguageToPage = (language = activeLanguage) => {
  if (!document.body) return;
  isApplyingLanguage = true;
  document.documentElement.setAttribute('lang', language);
  applyDocumentTitleTranslation(language);
  applyTextNodeTranslations(language);
  applyAttributeTranslations(language);
  isApplyingLanguage = false;
};
const updateLanguageMenuUi = () => {
  const currentLabel = document.getElementById('langSwitcherCurrent');
  if (currentLabel) {
    currentLabel.textContent = LANGUAGE_META[activeLanguage].code;
  }
  document.querySelectorAll('.lang-switcher__option[data-lang]').forEach((option) => {
    option.classList.toggle('is-active', option.dataset.lang === activeLanguage);
  });
};
const scheduleLanguageReapply = () => {
  if (languageReapplyPending || activeLanguage === 'en') return;
  languageReapplyPending = true;
  requestAnimationFrame(() => {
    languageReapplyPending = false;
    applyLanguageToPage(activeLanguage);
  });
};
const initializeLanguageObserver = () => {
  if (!document.body) return;
  if (languageObserver) {
    languageObserver.disconnect();
  }
  languageObserver = new MutationObserver((mutations) => {
    if (isApplyingLanguage || activeLanguage === 'en') return;
    const hasMeaningfulMutation = mutations.some((mutation) => {
      if (mutation.type === 'characterData') return true;
      if (mutation.type === 'childList' && (mutation.addedNodes.length || mutation.removedNodes.length)) return true;
      return false;
    });
    if (hasMeaningfulMutation) {
      scheduleLanguageReapply();
    }
  });
  languageObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
};
const setActiveLanguage = (language, { persist = true, announce = true } = {}) => {
  if (!Object.prototype.hasOwnProperty.call(LANGUAGE_META, language)) return;
  activeLanguage = language;
  if (persist) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
  updateLanguageMenuUi();
  applyLanguageToPage(language);
  if (announce) {
    window.dispatchEvent(new CustomEvent('site-language-change', { detail: { language } }));
  }
};
const initializeLanguageSwitcher = async () => {
  const switcher = document.getElementById('langSwitcher');
  const switcherBtn = document.getElementById('langSwitcherBtn');
  const switcherMenu = document.getElementById('langSwitcherMenu');
  const closeMenu = () => {
    if (!switcher || !switcherBtn) return;
    switcher.classList.remove('is-open');
    switcherBtn.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    if (!switcher || !switcherBtn) return;
    switcher.classList.add('is-open');
    switcherBtn.setAttribute('aria-expanded', 'true');
  };
  if (switcher && switcherBtn && switcherMenu) {
    switcherBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (switcher.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    switcherMenu.querySelectorAll('.lang-switcher__option[data-lang]').forEach((option) => {
      option.addEventListener('click', () => {
        const nextLanguage = option.dataset.lang;
        setActiveLanguage(nextLanguage);
        closeMenu();
      });
    });
    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }
  updateLanguageMenuUi();
  applyLanguageToPage(activeLanguage);
  initializeLanguageObserver();
  const dictionaryLoaded = await loadLanguageDictionary();
  if (dictionaryLoaded && activeLanguage !== 'en') {
    applyLanguageToPage(activeLanguage);
  }
};
const isTouchDevice = () => {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
};
const isLowPerformanceDevice = () => {
  if (navigator.deviceMemory <= 4) return true;
  const conn = navigator.connection;
  if (!conn) return false;
  return conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType);
};
const shouldUseDesktopEffects = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const finePo = window.matchMedia('(pointer: fine)').matches;
  return hasHover && finePo && !isLowPerformanceDevice();
};
let isZooming = false;
let zoomTimeout = null;
const detectZoom = () => {
  if (!isMobileDevice()) return;
  isZooming = true;
  document.documentElement.classList.add('zoomed');
  document.body.style.willChange = 'auto';
  clearTimeout(zoomTimeout);
  zoomTimeout = setTimeout(() => {
    isZooming = false;
    document.documentElement.classList.remove('zoomed');
    if (shouldUseDesktopEffects()) document.body.style.willChange = 'transform';
  }, 800);
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
function ensureToastContainer() {
  let toastContainer = document.getElementById('toastContainer');
  if (toastContainer) return toastContainer;
  toastContainer = document.createElement('div');
  toastContainer.id = 'toastContainer';
  toastContainer.className = 'toast-container';
  document.body.appendChild(toastContainer);
  return toastContainer;
}
function showToast(message, type = 'info', duration = 3200) {
  const toastContainer = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <span class="toast-dot" aria-hidden="true"></span>
    <span class="toast-message">${message}</span>
  `;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  const timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
    window.setTimeout(() => toast.remove(), 220);
  }, duration);
  toast.addEventListener('mouseenter', () => {
    window.clearTimeout(timeoutId);
  });
}
const lastSeenVersion = localStorage.getItem('site-version');
if (!lastSeenVersion) {
  localStorage.setItem('site-version', SITE_VERSION);
} else if (lastSeenVersion !== SITE_VERSION) {
  window.addEventListener('load', () => {
    showToast(translateRawText('Interface updated: CSS and scripts have been refreshed.'), 'success');
    localStorage.setItem('site-version', SITE_VERSION);
  }, { once: true });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher, { once: true });
} else {
  initializeLanguageSwitcher();
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
const cursorTrackingSpeed = 0.15;

// Custom cursor for desktop
if (cursor && cursorGlow && !isMobileDevice()) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;
  let glowAnimationId = null;
  let isPageVisible = true;
  function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(108, 143, 255, 0.6)';
    particle.style.pointerEvents = 'none';
    particle.style.left = (x - 3) + 'px';
    particle.style.top = (y - 3) + 'px';
    particle.style.boxShadow = '0 0 12px rgba(108, 143, 255, 0.8)';
    particle.style.zIndex = '9998';
    particle.style.opacity = '1';
    particle.style.transition = 'opacity 0.6s ease-out';
    document.body.appendChild(particle);
    setTimeout(() => {
      particle.style.opacity = '0';
      setTimeout(() => particle.remove(), 600);
    }, 100);
  }
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      startGlowAnimation();
    } else if (glowAnimationId) {
      cancelAnimationFrame(glowAnimationId);
    }
  });
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (Math.random() > 0.7) {
      createTrailParticle(mouseX, mouseY);
    }
  });
  
  function animateGlow() {
    if (!isPageVisible) return;
    cursorX = mouseX;
    cursorY = mouseY;
    glowX += (mouseX - glowX) * cursorTrackingSpeed;
    glowY += (mouseY - glowY) * cursorTrackingSpeed;
    
    if (cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
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
  startGlowAnimation()
  const interactiveElements = document.querySelectorAll('button, a, .btn, input, textarea, .contact-card, .blog-card, .gallery-item, .chip');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (cursorGlow) {
        cursorGlow.style.width = '70px';
        cursorGlow.style.height = '70px';
        cursorGlow.style.borderColor = 'rgba(240, 192, 96, 0.8)';
        cursorGlow.style.boxShadow = '0 0 30px rgba(240, 192, 96, 0.6)';
      }
      element.style.transform = 'scale(1.02)';
    });
    element.addEventListener('mouseleave', () => {
      if (cursorGlow) {
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
        cursorGlow.style.borderColor = 'rgba(108, 143, 255, 0.5)';
        cursorGlow.style.boxShadow = '0 0 20px rgba(108, 143, 255, 0.4)';
      }
      element.style.transform = 'scale(1)';
    });
  });
  
  document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
    if (cursor) cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursorGlow) cursorGlow.style.opacity = '1';
    if (cursor) cursor.style.opacity = '1';
  });
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
      showAlert(translateRawText('Please fill in all fields.'), 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showAlert(translateRawText('Please enter a valid email address.'), 'error');
      return;
    }
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = translateRawText('Sending...');
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
        showAlert(translateRawText('✓ Message sent successfully! I\'ll get back to you soon.'), 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      } else {
        showAlert(translateRawText('Failed to send message. Please try again.'), 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showAlert(translateRawText('Error sending message. Please try again later.'), 'error');
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
      const dateString = now.toLocaleDateString(getLocale(), options);
      dateDisplay.textContent = dateString;
    }
  }
  // Listen for theme changes - optimized without MutationObserver
  updateDate();
  drawClock();
  // Track theme state to avoid unnecessary redraws
  let lastTheme = document.body.classList.contains('light-mode');

  function startClockUpdate() {
    clockUpdateInterval = setInterval(() => {

      if (document.hidden || isZooming) {
        return;
      }

      const currentTheme = document.body.classList.contains('light-mode');
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        drawClock();
      } else {
  
        drawClock();
      }
    }, 1000);
  }
  startClockUpdate();
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
  window.addEventListener('site-language-change', () => {
    updateDate();
    drawClock();
  });
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

// ============================================
// LOGO ANIMATIONS WITH ANIME.JS
// ============================================
// Pastikan Anime.js sudah di-load sebelum script ini dijalankan
if (typeof anime !== 'undefined') {
  const logoElement = document.querySelector('.logo.js');
  const rotateButton = document.querySelector('button');
  
  if (logoElement) {
    let rotations = 0;

anime({
      targets: '.logo.js',
      scale: [
        { value: 1.25, duration: 200, easing: 'easeInOutQuad' },
        { value: 1, duration: 300, easing: 'easeOutElastic(1, 0.7)' }
      ],
      loop: true,
      loopDelay: 250
    });

let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    logoElement.style.cursor = 'grab';
    logoElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      logoElement.style.cursor = 'grabbing';
      const rect = logoElement.getBoundingClientRect();
      dragOffsetX = e.clientX - rect.left;
      dragOffsetY = e.clientY - rect.top;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      currentX = e.clientX - dragOffsetX;
      currentY = e.clientY - dragOffsetY;
      
      // Constrain movement ke viewport
      const rect = logoElement.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      
      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));
      
      logoElement.style.position = 'fixed';
      logoElement.style.left = currentX + 'px';
      logoElement.style.top = currentY + 'px';
    });
    
    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      logoElement.style.cursor = 'grab';
      
      // Animate release dengan spring effect
      anime({
        targets: '.logo.js',
        left: currentX,
        top: currentY,
        duration: 600,
        easing: 'easeOutElastic(1, 0.7)'
      });
    });
    
    // Animasi rotasi saat tombol diklik
    if (rotateButton) {
      rotateButton.addEventListener('click', () => {
        rotations++;
        rotateButton.innerText = `rotations: ${rotations}`;
        
        anime({
          targets: '.logo.js',
          rotate: rotations * 360,
          duration: 1500,
          easing: 'easeOutQuart'
        });
      });
    }
  }
}


