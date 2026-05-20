const anime = window.anime || {};
if (!window.anime) {
  console.error('Anime.js browser build is missing.');
}
const animate = anime.animate || (() => {});
const stagger = anime.stagger || (() => 0);
const text = anime.text || { split: () => ({ addEffect: () => {} }) };
const splitText = text.split || (() => ({ addEffect: () => {} }));
const isCompactMotion = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const lowMem = navigator.deviceMemory <= 4;
  return coarse || noHover || lowMem;
};
let heroSplitStarted = false;
const initHeroSplitAnimation = async () => {
  if (heroSplitStarted) return;
  const heroTitle = document.querySelector('.js-hero-split');
  if (!heroTitle) return;
  heroSplitStarted = true;
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {
      // Continue even if fonts are not fully ready.
    }
  }
  const compactMotion = isCompactMotion();
  const split = splitText(heroTitle, {
    lines: true,
    words: true,
    chars: true,
  });
  split.addEffect(({ lines, words, chars }) => {
    const charTargets = chars || [];
    lines.forEach((line) => {
      line.style.overflow = 'hidden';
      line.style.display = 'block';
    });
    words.forEach((word) => {
      word.style.display = 'inline-block';
      word.style.willChange = 'transform, opacity';
      word.style.webkitTextFillColor = 'currentColor';
      word.style.color = 'inherit';
    });
    charTargets.forEach((char) => {
      char.style.display = 'inline-block';
      char.style.willChange = 'transform, opacity';
      char.style.webkitTextFillColor = 'currentColor';
      char.style.color = 'inherit';
    });
    if (compactMotion) {
      return animate(words, {
        opacity: { from: 0 },
        y: { from: '0.45em' },
        duration: 1450,
        delay: stagger(90),
        ease: 'out(2.5)',
      });
    }
    return animate([lines, words, charTargets], {
      opacity: { from: 0 },
      y: { from: '0.35em' },
      duration: 850,
      delay: stagger(14),
      ease: 'out(3)',
    });
  });
};
const loadingScreen = document.getElementById('loadingScreen');
const startHeroSplitAnimation = () => {
  const run = () => {
    window.setTimeout(() => {
      initHeroSplitAnimation();
    }, 100);
  };
  if (!loadingScreen) {
    run();
    return;
  }
  if (loadingScreen.classList.contains('hidden')) {
    run();
    return;
  }
  loadingScreen.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'opacity' && loadingScreen.classList.contains('hidden')) {
      run();
    }
  }, { once: true });
};
const initClockScrollAnimation = () => {
  const clockCanvas = document.getElementById('clockCanvas');
  const onScroll = anime.onScroll;
  if (!clockCanvas || typeof onScroll !== 'function') return;
  if (isCompactMotion()) return;
  animate(clockCanvas, {
    x: '15rem',
    rotate: '1turn',
    ease: 'linear',
    autoplay: onScroll({
      container: document.scrollingElement || document.documentElement,
      target: clockCanvas,
      enter: 'bottom-=50 top',
      leave: 'top+=60 bottom',
      sync: 0.25,
    }),
  });
};
const initHeroAmbientMotion = () => {
  const heroFx = document.querySelector('.hero-fx');
  if (!heroFx || isCompactMotion()) return;
  const orbOne = document.querySelector('.hero-fx__orb--one');
  const orbTwo = document.querySelector('.hero-fx__orb--two');
  const grid = document.querySelector('.hero-fx__grid');
  if (orbOne) {
    animate(orbOne, {
      x: [0, 16],
      y: [0, -12],
      scale: [1, 1.08],
      opacity: [0.55, 0.9],
      duration: 8200,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    });
  }
  if (orbTwo) {
    animate(orbTwo, {
      x: [0, -18],
      y: [0, 14],
      scale: [1, 1.06],
      opacity: [0.45, 0.82],
      duration: 9800,
      delay: 800,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    });
  }
  if (grid) {
    animate(grid, {
      opacity: [0.12, 0.2],
      y: [0, 18],
      duration: 12000,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    });
  }
  animate(document.querySelectorAll('.hero-actions .btn, .hero-stat-single, .hero-desc'), {
    opacity: { from: 0 },
    y: { from: '0.85em' },
    scale: { from: 0.98 },
    duration: 900,
    delay: stagger(110, { start: 120 }),
    ease: 'out(3)',
  });
};
const initSectionRevealAnimations = () => {
  const targets = document.querySelectorAll('.service-card, .tech-slide, .cta-banner .section-title, .cta-banner .section-subtitle, .cta-banner .btn');
  if (!targets.length) return;
  const compactMotion = isCompactMotion();
  targets.forEach((target, index) => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animate(target, {
        opacity: { from: 0 },
        y: { from: compactMotion ? '0.8em' : '1.15em' },
        scale: { from: compactMotion ? 1 : 0.975 },
        duration: compactMotion ? 560 : 760,
        delay: index * 60,
        ease: 'out(3)',
      });
      observer.unobserve(target);
    }, { threshold: 0.18 });
    observer.observe(target);
  });
};
if (document.readyState === 'complete') {
  startHeroSplitAnimation();
  initClockScrollAnimation();
  initHeroAmbientMotion();
  initSectionRevealAnimations();
} else {
  window.addEventListener('load', startHeroSplitAnimation, { once: true });
  window.addEventListener('load', initClockScrollAnimation, { once: true });
  window.addEventListener('load', initHeroAmbientMotion, { once: true });
  window.addEventListener('load', initSectionRevealAnimations, { once: true });
}


