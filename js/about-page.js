const React = window.React || {};
const ReactDOM = window.ReactDOM || {};
const anime = window.anime || {};
if (!window.React || !window.ReactDOM || !window.anime) {
  console.error('Required browser libraries are missing.');
}
const { useEffect, useRef, useState } = React;
const createElement = React.createElement || (() => null);
const animate = anime.animate || (() => {});
const stagger = anime.stagger || (() => 0);
const utils = anime.utils || {};
const text = anime.text || { split: () => ({ addEffect: () => {} }) };
const splitText = text.split || (() => ({ addEffect: () => {} }));
const setElementStyles = utils.set || ((element, styles) => Object.assign(element.style, styles));
const getElementStyle = utils.get || ((element, property) => getComputedStyle(element)[property]);
const pickAccentColor = utils.randomPick || ((palette) => palette[Math.floor(Math.random() * palette.length)]);
const paragraphColorCache = new WeakMap();
const shouldUseCompactMotion = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(any-pointer: coarse)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  return coarsePointer || noHover || lowMemory;
};
const summaryStats = [
  {
    value: '2+ yrs',
    label: 'Hands-on building modern websites',
  },
  {
    value: 'React + JS',
    label: 'Interactive UI and component logic',
  },
  {
    value: 'Semarang',
    label: 'Based in Central Java, Indonesia',
  },
];
const chips = [
  'React',
  'Anime.js',
  'JavaScript',
  'Node.js',
  'CSS',
  'Python',
  'SQL',
];
const focusModes = {
  build: {
    label: 'Build',
    kicker: 'Component systems',
    title: 'I turn ideas into calm, usable interfaces.',
    copy: 'I prefer structures that stay readable as projects grow. The goal is to make the experience feel intentional, not noisy.',
    points: [
      'Component structure that scales without becoming hard to read',
      'Responsive layouts that keep rhythm and spacing intact',
      'Motion that supports the content instead of competing with it',
    ],
  },
  learn: {
    label: 'Learn',
    kicker: 'Current experiments',
    title: 'I keep testing newer tools and patterns.',
    copy: 'I like trying focused experiments so I can keep the stack current without losing the practical side of delivery.',
    points: [
      'React islands for static sites and smaller interactive surfaces',
      'Animation timing and sequencing that still feels restrained',
      'Performance-aware decisions on slower devices',
    ],
  },
  ship: {
    label: 'Ship',
    kicker: 'Delivery mindset',
    title: 'I care about polish, accessibility, and launch readiness.',
    copy: 'Good delivery is more than a working feature. I aim for predictable behavior, clear handoff, and details that hold up in production.',
    points: [
      'Cleaner handoff between design and code',
      'Accessible contrast, focus states, and motion control',
      'Predictable behavior on desktop and mobile browsers',
    ],
  },
};
const focusOrder = ['build', 'learn', 'ship'];
function waitForLoadingScreen() {
  return new Promise((resolve) => {
    const loadingScreen = document.getElementById('loadingScreen');
    const finish = () => {
      window.setTimeout(resolve, 100);
    };
    if (!loadingScreen || loadingScreen.classList.contains('hidden')) {
      finish();
      return;
    }
    loadingScreen.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'opacity' && loadingScreen.classList.contains('hidden')) {
        finish();
      }
    }, { once: true });
  });
}
const motionReadyPromise = waitForLoadingScreen();
function animateAboutParagraphs() {
  const paragraphs = document.querySelectorAll('.page-header .section-subtitle, .about-subtitle, .about-lead, .about-desc');
  if (!paragraphs.length) return;
  paragraphs.forEach((paragraph, index) => {
    if (paragraph.dataset.aboutParagraphAnimated === 'true') return;
    paragraph.dataset.aboutParagraphAnimated = 'true';
    motionReadyPromise.then(() => {
      if (shouldUseCompactMotion()) {
        animate(paragraph, {
          opacity: { from: 0 },
          y: { from: '0.75em' },
          duration: 650,
          delay: index * 80,
          ease: 'out(3)',
        });
        return;
      }
      const runSplit = () => {
        const split = splitText(paragraph, {
          lines: true,
          words: true,
          chars: true,
        });
        split.addEffect(({ lines, words, chars }) => {
          lines.forEach((line) => {
            line.style.overflow = 'hidden';
            line.style.display = 'block';
          });
          words.forEach((word) => {
            word.style.display = 'inline-block';
            word.style.willChange = 'transform, opacity';
          });
          chars.forEach((char) => {
            char.style.display = 'inline-block';
            char.style.willChange = 'transform, opacity';
          });
          return animate(lines, {
            opacity: { from: 0 },
            y: { from: '0.875em' },
            duration: 700,
            delay: stagger(80),
            ease: 'out(3)',
          });
        });
        split.addEffect((splitState) => {
          const colors = paragraphColorCache.get(paragraph) || [];
          splitState.words.forEach((word, index) => {
            const savedColor = colors[index];
            if (savedColor) {
              setElementStyles(word, { color: savedColor });
            }
            word.addEventListener('pointerenter', () => {
              animate(word, {
                color: pickAccentColor(['#FF4B4B', '#FFCC2A', '#B7FF54', '#57F695']),
                duration: 250,
              });
            });
          });
          return () => {
            splitState.words.forEach((word, index) => {
              colors[index] = getElementStyle(word, 'color');
            });
            paragraphColorCache.set(paragraph, colors);
          };
        });
      };
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(runSplit).catch(runSplit);
      } else {
        runSplit();
      }
    });
  });
}
function animateAboutHeader() {
  const headerTitle = document.querySelector('.js-about-title');
  if (!headerTitle) return;
  if (headerTitle.dataset.aboutAnimated === 'true') return;
  headerTitle.dataset.aboutAnimated = 'true';
  const runAnimation = () => {
    if (shouldUseCompactMotion()) {
      animate(headerTitle, {
        opacity: { from: 0 },
        y: { from: '0.35em' },
        duration: 750,
        ease: 'out(3)',
      });
      animate(document.querySelectorAll('.page-header .section-label'), {
        opacity: { from: 0 },
        y: { from: '0.75em' },
        duration: 650,
        delay: stagger(90),
        ease: 'out(3)',
      });
      animateAboutParagraphs();
      return;
    }
    const split = splitText(headerTitle, {
      lines: true,
      words: true,
      chars: true,
    });
    split.addEffect(({ lines, words, chars }) => {
      lines.forEach((line) => {
        line.style.overflow = 'hidden';
        line.style.display = 'block';
      });
      words.forEach((word) => {
        word.style.display = 'inline-block';
        word.style.willChange = 'transform, opacity';
      });
      chars.forEach((char) => {
        char.style.display = 'inline-block';
        char.style.willChange = 'transform, opacity';
      });
      return animate([lines, words, chars], {
        opacity: { from: 0 },
        y: { from: '0.9em' },
        rotate: { from: -4 },
        scale: { from: 0.98 },
        duration: 900,
        delay: stagger(24),
        ease: 'out(4)',
      });
    });
    animate(document.querySelectorAll('.page-header .section-label'), {
      opacity: { from: 0 },
        y: { from: '0.875em' },
      ease: 'out(3)',
    });
    animateAboutParagraphs();
  };
  motionReadyPromise.then(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runAnimation).catch(runAnimation);
    } else {
      runAnimation();
    }
  });
}
function AboutSpotlight() {
  const rootRef = useRef(null);
  const focusPanelRef = useRef(null);
  const fxOrbOneRef = useRef(null);
  const fxOrbTwoRef = useRef(null);
  const fxOrbThreeRef = useRef(null);
  const fxScanRef = useRef(null);
  const [activeFocus, setActiveFocus] = useState('build');
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    motionReadyPromise.then(() => {
      const revealTargets = root.querySelectorAll('[data-reveal]');
      animate(revealTargets, {
        opacity: { from: 0 },
        y: { from: 24 },
        duration: 850,
        delay: stagger(120),
        ease: 'out(3)',
      });
      animate(root.querySelectorAll('.about-chip'), {
        opacity: { from: 0 },
        scale: { from: 0.92 },
        duration: 700,
        delay: stagger(35),
        ease: 'out(3)',
      });
    });
  }, []);
  useEffect(() => {
    const panel = focusPanelRef.current;
    if (!panel) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    motionReadyPromise.then(() => {
      animate(panel, {
        opacity: [0, 1],
        y: [14, 0],
        duration: 450,
        ease: 'out(3)',
      });
    });
  }, [activeFocus]);
  useEffect(() => {
    const fxOrbOne = fxOrbOneRef.current;
    const fxOrbTwo = fxOrbTwoRef.current;
    const fxOrbThree = fxOrbThreeRef.current;
    const fxScan = fxScanRef.current;
    if (!fxOrbOne && !fxOrbTwo && !fxOrbThree && !fxScan) return;
    if (shouldUseCompactMotion()) return;
    motionReadyPromise.then(() => {
      if (fxOrbOne) {
        animate(fxOrbOne, {
          x: [0, 28],
          y: [0, -18],
          scale: [1, 1.12],
          opacity: [0.18, 0.42],
          duration: 6200,
          loop: true,
          alternate: true,
          ease: 'inOutSine',
        });
      }
      if (fxOrbTwo) {
        animate(fxOrbTwo, {
          x: [0, -24],
          y: [0, 22],
          scale: [1, 0.92],
          opacity: [0.14, 0.34],
          duration: 7800,
          delay: 650,
          loop: true,
          alternate: true,
          ease: 'inOutSine',
        });
      }
      if (fxOrbThree) {
        animate(fxOrbThree, {
          x: [0, 18],
          y: [0, 14],
          rotate: [0, 180],
          scale: [1, 1.06],
          opacity: [0.12, 0.28],
          duration: 9400,
          delay: 1100,
          loop: true,
          alternate: true,
          ease: 'inOutSine',
        });
      }
      if (fxScan) {
        animate(fxScan, {
          left: ['-18%', '118%'],
          opacity: [0, 0.78, 0],
          duration: 5200,
          delay: 1500,
          loop: true,
          ease: 'linear',
        });
      }
    });
  }, []);
  useEffect(() => {
    const buttons = rootRef.current?.querySelectorAll('.about-spotlight__switch-btn');
    if (!buttons || buttons.length === 0) return;
    buttons.forEach((btn) => {
      const handleMouseEnter = () => {
        if (!shouldUseCompactMotion()) {
          animate(btn, {
            scale: 1.05,
            duration: 280,
            ease: 'out(2)',
          });
        }
      };
      const handleMouseLeave = () => {
        if (!shouldUseCompactMotion()) {
          animate(btn, {
            scale: btn.classList.contains('is-active') ? 1.08 : 1,
            duration: 280,
            ease: 'out(2)',
          });
        }
      };
      btn.addEventListener('mouseenter', handleMouseEnter);
      btn.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [activeFocus]);
  const currentFocus = focusModes[activeFocus] || focusModes.build;
  return createElement(
    'section',
    {
      className: 'about-spotlight',
      ref: rootRef,
    },
    createElement(
      'div',
      {
        className: 'about-spotlight__fx',
        'aria-hidden': 'true',
      },
      createElement('span', {
        className: 'about-spotlight__orb about-spotlight__orb--one',
        ref: fxOrbOneRef,
      }),
      createElement('span', {
        className: 'about-spotlight__orb about-spotlight__orb--two',
        ref: fxOrbTwoRef,
      }),
      createElement('span', {
        className: 'about-spotlight__orb about-spotlight__orb--three',
        ref: fxOrbThreeRef,
      }),
      createElement('span', {
        className: 'about-spotlight__scan',
        ref: fxScanRef,
      })
    ),
    createElement(
      'div',
      {
        className: 'about-spotlight__layout',
      },
      createElement(
        'article',
        {
          className: 'about-spotlight__card',
          'data-reveal': true,
        },
        createElement('span', { className: 'about-spotlight__eyebrow' }, 'Snapshot'),
        createElement(
          'h2',
          {
            className: 'about-spotlight__title js-about-spotlight-title',
          },
          'I build calm interfaces with a strong sense of craft.'
        ),
        createElement(
          'p',
          {
            className: 'about-spotlight__summary',
          },
          'I like shaping frontend systems, backend flows, and small animation details so products feel deliberate instead of busy.'
        ),
        createElement(
          'div',
          {
            className: 'about-spotlight__stats',
          },
          summaryStats.map((stat) =>
            createElement(
              'div',
              {
                className: 'about-spotlight__stat',
                key: stat.value,
                'data-reveal': true,
              },
              createElement('span', { className: 'about-spotlight__stat-value' }, stat.value),
              createElement('span', { className: 'about-spotlight__stat-label' }, stat.label)
            )
          )
        ),
        createElement(
          'div',
          {
            className: 'about-spotlight__chips',
          },
          chips.map((chip) =>
            createElement(
              'span',
              {
                className: 'about-chip',
                key: chip,
              },
              chip
            )
          )
        )
      ),
      createElement(
        'article',
        {
          className: 'about-spotlight__panel',
          'data-reveal': true,
        },
        createElement('span', { className: 'about-spotlight__note' }, 'React-powered focus board'),
        createElement(
          'div',
          {
            className: 'about-spotlight__switch',
          },
          focusOrder.map((modeKey) =>
            createElement(
              'button',
              {
                type: 'button',
                className: `about-spotlight__switch-btn ${activeFocus === modeKey ? 'is-active' : ''}`,
                onClick: () => setActiveFocus(modeKey),
                'aria-pressed': activeFocus === modeKey,
                key: modeKey,
              },
              focusModes[modeKey].label
            )
          )
        ),
        createElement(
          'div',
          {
            className: 'about-spotlight__focus',
            ref: focusPanelRef,
          },
          createElement('span', { className: 'about-spotlight__focus-kicker' }, currentFocus.kicker),
          createElement('h3', { className: 'about-spotlight__focus-title' }, currentFocus.title),
          createElement('p', { className: 'about-spotlight__focus-copy' }, currentFocus.copy),
          createElement(
            'div',
            {
              className: 'about-spotlight__focus-list',
            },
            currentFocus.points.map((point) =>
              createElement(
                'div',
                {
                  className: 'about-spotlight__focus-item',
                  key: point,
                },
                createElement('span', { className: 'about-spotlight__focus-dot', 'aria-hidden': 'true' }),
                createElement('span', null, point)
              )
            )
          )
        )
      )
    )
  );
}
animateAboutHeader();
const aboutSpotlightRoot = document.getElementById('aboutSpotlightRoot');
if (aboutSpotlightRoot && ReactDOM.createRoot) {
  ReactDOM.createRoot(aboutSpotlightRoot).render(createElement(AboutSpotlight));
} else if (aboutSpotlightRoot && ReactDOM.render) {
  ReactDOM.render(createElement(AboutSpotlight), aboutSpotlightRoot);
}

