const animate = window.anime?.animate || (() => {});
const stagger = window.anime?.stagger || (() => 0);
function initGalleryAnimations() {
  const cards = document.querySelectorAll('.gallery-card');
  if (!cards.length) return;
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      cards.forEach((card, index) => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            animate(card, {
              opacity: { from: 0 },
              y: { from: '2em' },
              duration: 700,
              delay: index * 80,
              ease: 'out(3)',
            });
            observer.unobserve(card);
          }
        }, { threshold: 0.15 });
        observer.observe(card);
      });
    }, 100);
  });
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (!shouldUseCompactMotion()) {
        animate(card, {
          scale: 1.02,
          boxShadow: [
            'inset 0 0 0 1px rgba(74, 158, 255, 0.2)',
            'inset 0 0 20px rgba(74, 158, 255, 0.15), 0 20px 40px rgba(0, 0, 0, 0.2)',
          ],
          duration: 350,
          ease: 'out(2)',
        });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (!shouldUseCompactMotion()) {
        animate(card, {
          scale: 1,
          boxShadow: 'inset 0 0 0 1px rgba(74, 158, 255, 0.2)',
          duration: 350,
          ease: 'out(2)',
        });
      }
    });
  });
}
function initLinkAnimations() {
  const galleryLinks = document.querySelectorAll('.gallery-link');
  galleryLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      if (!shouldUseCompactMotion()) {
        animate(link, {
          translateX: 6,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
    link.addEventListener('mouseleave', () => {
      if (!shouldUseCompactMotion()) {
        animate(link, {
          translateX: 0,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
  });
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      if (!shouldUseCompactMotion()) {
        animate(btn, {
          scale: 1.04,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (!shouldUseCompactMotion()) {
        animate(btn, {
          scale: 1,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
  });
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    navCta.addEventListener('mouseenter', () => {
      if (!shouldUseCompactMotion()) {
        animate(navCta, {
          scale: 1.06,
          duration: 280,
          ease: 'out(2)',
        });
      }
    });
    navCta.addEventListener('mouseleave', () => {
      if (!shouldUseCompactMotion()) {
        animate(navCta, {
          scale: 1,
          duration: 280,
          ease: 'out(2)',
        });
      }
    });
  }
}
function initFormAnimations() {
  const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach((group, index) => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(group, {
          opacity: { from: 0 },
          y: { from: '1.5em' },
          duration: 600,
          delay: index * 60,
          ease: 'out(3)',
        });
        observer.unobserve(group);
      }
    }, { threshold: 0.2 });
    observer.observe(group);
  });
  inputs.forEach((input) => {
    const label = input.previousElementSibling;
    input.addEventListener('focus', () => {
      if (label && label.classList.contains('form-label')) {
        animate(label, {
          y: { from: 0, to: -12 },
          rotate: { from: 0, to: 0 },
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
    input.addEventListener('blur', () => {
      if (!input.value && label && label.classList.contains('form-label')) {
        animate(label, {
          y: 0,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
  });
  const submitBtn = document.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.addEventListener('mouseenter', () => {
      if (!shouldUseCompactMotion()) {
        animate(submitBtn, {
          scale: 1.05,
          duration: 280,
          ease: 'out(2)',
        });
      }
    });
    submitBtn.addEventListener('mouseleave', () => {
      if (!shouldUseCompactMotion()) {
        animate(submitBtn, {
          scale: 1,
          duration: 280,
          ease: 'out(2)',
        });
      }
    });
    submitBtn.addEventListener('click', () => {
      animate(submitBtn, {
        scale: [1, 0.96, 1],
        duration: 300,
        ease: 'easeInOutQuad',
      });
    });
  }
}
function initSectionAnimations() {
  const sectionLabels = document.querySelectorAll('.section-label:not([data-animated])');
  const sectionTitles = document.querySelectorAll('.section-title:not([data-animated])');
  sectionLabels.forEach((label) => {
    if (label.dataset.animated === 'true') return;
    label.dataset.animated = 'true';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(label, {
          opacity: { from: 0 },
          x: { from: -24 },
          duration: 600,
          ease: 'out(3)',
        });
        observer.unobserve(label);
      }
    }, { threshold: 0.3 });
    observer.observe(label);
  });
  sectionTitles.forEach((title) => {
    if (title.dataset.animated === 'true') return;
    title.dataset.animated = 'true';
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(title, {
          opacity: { from: 0 },
          y: { from: '1.5em' },
          duration: 700,
          delay: 80,
          ease: 'out(3)',
        });
        observer.unobserve(title);
      }
    }, { threshold: 0.2 });
    observer.observe(title);
  });
}
function initProgressAnimations() {
  const progressItems = document.querySelectorAll('.progress-item');
  progressItems.forEach((item, index) => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(item.querySelector('.progress-header'), {
          opacity: { from: 0 },
          x: { from: -20 },
          duration: 500,
          delay: index * 80,
          ease: 'out(3)',
        });
        const fillEl = item.querySelector('.progress-fill');
        const width = fillEl.dataset.width || '0';
        animate(fillEl, {
          width: [0, width + '%'],
          opacity: { from: 0 },
          duration: 1200,
          delay: index * 80 + 200,
          ease: 'easeInOutQuad',
        });
        observer.unobserve(item);
      }
    }, { threshold: 0.3 });
    observer.observe(item);
  });
}
function initAboutSectionAnimations() {
  const aboutImg = document.querySelector('.about-img');
  if (!aboutImg) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animate(aboutImg, {
        opacity: { from: 0 },
        scale: { from: 0.92 },
        rotate: { from: -2 },
        duration: 800,
        ease: 'out(3)',
      });
      const accent = aboutImg.querySelector('.about-img-accent');
      if (accent && !shouldUseCompactMotion()) {
        animate(accent, {
          opacity: { from: 0 },
          scale: { from: 0.8 },
          delay: 200,
          duration: 700,
          ease: 'out(3)',
        });
      }
      observer.unobserve(aboutImg);
    }
  }, { threshold: 0.2 });
  observer.observe(aboutImg);
}
function initTechBadgeAnimations() {
  const badges = document.querySelectorAll('.tech-badge, .skill-item');
  badges.forEach((badge) => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const index = Array.from(badges).indexOf(badge);
        animate(badge, {
          opacity: { from: 0 },
          y: { from: '0.5em' },
          scale: { from: 0.85 },
          duration: 500,
          delay: (index % 10) * 40,
          ease: 'out(3)',
        });
        observer.unobserve(badge);
      }
    }, { threshold: 0.3 });
    observer.observe(badge);
    badge.addEventListener('mouseenter', () => {
      if (!shouldUseCompactMotion()) {
        animate(badge, {
          scale: 1.08,
          y: -4,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
    badge.addEventListener('mouseleave', () => {
      if (!shouldUseCompactMotion()) {
        animate(badge, {
          scale: 1,
          y: 0,
          duration: 250,
          ease: 'out(2)',
        });
      }
    });
  });
}
function initPremiumSurfaceEffects() {
  const selectors = [
    '.service-card',
    '.project-card',
    '.blog-card',
    '.testimonial-card',
    '.gallery-card',
    '.contact-card',
    '.about-spotlight__card',
    '.about-spotlight__panel',
    '.htimeline-item',
    '.clock-widget',
    '.tech-logo',
    '.progress-item',
  ];
  const surfaces = document.querySelectorAll(selectors.join(','));
  if (!surfaces.length) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compactMotion = shouldUseCompactMotion();
  const finePointer = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
  const touchTimers = new WeakMap();
  const clampToPercent = (value) => `${Math.max(0, Math.min(100, value))}%`;

  const setPoint = (surface, clientX, clientY) => {
    const rect = surface.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    surface.style.setProperty('--vfx-x', clampToPercent(x));
    surface.style.setProperty('--vfx-y', clampToPercent(y));
  };

  surfaces.forEach((surface) => {
    if (surface.dataset.premiumFxReady === 'true') return;
    surface.dataset.premiumFxReady = 'true';
    surface.classList.add('vfx-surface');

    if (!surface.querySelector('.vfx-surface__glow')) {
      const glow = document.createElement('span');
      glow.className = 'vfx-surface__glow';
      glow.setAttribute('aria-hidden', 'true');
      const ring = document.createElement('span');
      ring.className = 'vfx-surface__ring';
      ring.setAttribute('aria-hidden', 'true');
      surface.prepend(ring);
      surface.prepend(glow);
    }

    if (prefersReducedMotion) return;

    if (compactMotion || !finePointer) {
      const runTapEffect = (event) => {
        const point = event.touches?.[0] || event;
        if (!point) return;
        setPoint(surface, point.clientX, point.clientY);
        surface.classList.add('is-vfx-active');

        animate(surface, {
          scale: [1, 0.994, 1],
          duration: 260,
          ease: 'out(2)',
        });

        const existingTimer = touchTimers.get(surface);
        if (existingTimer) window.clearTimeout(existingTimer);
        const timerId = window.setTimeout(() => {
          surface.classList.remove('is-vfx-active');
        }, 380);
        touchTimers.set(surface, timerId);
      };

      surface.addEventListener('pointerdown', runTapEffect, { passive: true });
      return;
    }

    const handlePointerEnter = (event) => {
      setPoint(surface, event.clientX, event.clientY);
      surface.classList.add('is-vfx-active');
    };
    const handlePointerMove = (event) => {
      setPoint(surface, event.clientX, event.clientY);
    };
    const handlePointerLeave = () => {
      surface.classList.remove('is-vfx-active');
      surface.style.setProperty('--vfx-x', '50%');
      surface.style.setProperty('--vfx-y', '50%');
    };

    surface.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    surface.addEventListener('pointermove', handlePointerMove, { passive: true });
    surface.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  });
}
function shouldUseCompactMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(any-pointer: coarse)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  return coarsePointer || noHover || lowMemory;
}
function initializeInteractionAnimations() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        initGalleryAnimations();
        initLinkAnimations();
        initFormAnimations();
        initSectionAnimations();
        initProgressAnimations();
        initAboutSectionAnimations();
        initTechBadgeAnimations();
        initPremiumSurfaceEffects();
      }, 100);
    });
  } else {
    setTimeout(() => {
      initGalleryAnimations();
      initLinkAnimations();
      initFormAnimations();
      initSectionAnimations();
      initProgressAnimations();
      initAboutSectionAnimations();
      initTechBadgeAnimations();
      initPremiumSurfaceEffects();
    }, 100);
  }
}
if (window.anime) {
  initializeInteractionAnimations();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.anime) {
      initializeInteractionAnimations();
    }
  });
}


