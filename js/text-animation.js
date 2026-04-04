const anime = window.anime || {};

if (!window.anime) {
  console.error('Anime.js browser build is missing.');
}

const animate = anime.animate || (() => {});
const stagger = anime.stagger || (() => 0);
const text = anime.text || { split: () => ({ addEffect: () => {} }) };
const splitText = text.split || (() => ({ addEffect: () => {} }));

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

  const split = splitText(heroTitle, {
    lines: true,
    words: true,
    chars: false,
  });

  split.addEffect(({ lines, words }) => {
    lines.forEach((line) => {
      line.style.overflow = 'hidden';
      line.style.display = 'block';
    });

    words.forEach((word) => {
      word.style.display = 'inline-block';
      word.style.willChange = 'transform, opacity';
    });

    return animate(words, {
      opacity: { from: 0 },
      y: { from: '1.2em' },
      rotate: { from: -6 },
      scale: { from: 0.98 },
      duration: 1100,
      delay: stagger(60),
      ease: 'out(4)',
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

if (document.readyState === 'complete') {
  startHeroSplitAnimation();
} else {
  window.addEventListener('load', startHeroSplitAnimation, { once: true });
}
