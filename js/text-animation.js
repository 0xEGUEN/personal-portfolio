const anime = window.anime || {};

if (!window.anime) {
  console.error('Anime.js browser build is missing.');
}

const animate = anime.animate || (() => {});
const stagger = anime.stagger || (() => 0);
const text = anime.text || { split: () => ({ addEffect: () => {} }) };
const splitText = text.split || (() => ({ addEffect: () => {} }));
const isCompactMotion = () => window.matchMedia('(max-width: 720px)').matches || window.matchMedia('(pointer: coarse)').matches;

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
    chars: !compactMotion,
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
      y: { from: '0.9em' },
      rotate: { from: -6 },
      scale: { from: 0.98 },
      duration: 1100,
      delay: stagger(24),
      ease: 'out(4)',
    });
  });

  if (compactMotion) {
    const heroText = heroTitle.closest('.hero-text');
    if (heroText) {
      animate(heroText.querySelectorAll('.hero-label, .hero-desc, .hero-actions, .hero-stat-single'), {
        opacity: { from: 0 },
        y: { from: 12 },
        duration: 900,
        delay: stagger(80),
        ease: 'out(3)',
      });
    }
  }
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

if (document.readyState === 'complete') {
  startHeroSplitAnimation();
} else {
  window.addEventListener('load', startHeroSplitAnimation, { once: true });
}
