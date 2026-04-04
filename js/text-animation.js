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
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(any-pointer: coarse)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  return coarsePointer || noHover || lowMemory;
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
if (document.readyState === 'complete') {
  startHeroSplitAnimation();
  initClockScrollAnimation();
} else {
  window.addEventListener('load', startHeroSplitAnimation, { once: true });
  window.addEventListener('load', initClockScrollAnimation, { once: true });
}

