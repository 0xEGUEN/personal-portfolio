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
const text = anime.text || { split: () => ({ addEffect: () => {} }) };
const splitText = text.split || (() => ({ addEffect: () => {} }));
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
  const allParagraphs = document.querySelectorAll('.page-header .section-subtitle, .about-subtitle, .about-lead, .about-desc');
  if (!allParagraphs.length) return;
  const paragraphs = Array.from(allParagraphs).filter((paragraph) => {
    if (paragraph.dataset.aboutParagraphAnimated === 'true') return false;
    paragraph.dataset.aboutParagraphAnimated = 'true';
    return true;
  });
  if (!paragraphs.length) return;
  motionReadyPromise.then(() => {
    const compact = shouldUseCompactMotion();
    animate(paragraphs, {
      opacity: { from: 0 },
      y: { from: compact ? '0.75em' : '0.45em' },
      duration: compact ? 620 : 760,
      delay: stagger(compact ? 70 : 90),
      ease: 'out(3)',
    });
  });
}
function animateAboutSections() {
  const intro = document.querySelector('.about-intro');
  const progressItems = document.querySelectorAll('.progress-item');
  const hasTargets = intro || progressItems.length;
  if (!hasTargets) return;
  motionReadyPromise.then(() => {
    if (shouldUseCompactMotion()) {
      if (intro) {
        animate(intro, {
          opacity: { from: 0 },
          y: { from: '0.75em' },
          duration: 650,
          ease: 'out(3)',
        });
      }
      animate(progressItems, {
        opacity: { from: 0 },
        y: { from: '0.65em' },
        duration: 520,
        delay: stagger(55),
        ease: 'out(3)',
      });
      return;
    }
    if (intro) {
      animate(intro, {
        opacity: { from: 0 },
        y: { from: 26 },
        scale: { from: 0.985 },
        duration: 900,
        ease: 'out(3)',
      });
    }
    progressItems.forEach((item, index) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        animate(item, {
          opacity: { from: 0 },
          y: { from: 20 },
          scale: { from: 0.98 },
          duration: 720,
          delay: index * 70,
          ease: 'out(3)',
        });
        observer.unobserve(item);
      }, { threshold: 0.25 });
      observer.observe(item);
    });
  });
}
function initHeaderFxMotion() {
  const pageHeader = document.querySelector('.page-header');
  const orbs = document.querySelectorAll('.page-header-fx__orb');
  if (!pageHeader || !orbs.length) return;
  if (pageHeader.dataset.fxInitialized === 'true') return;
  pageHeader.dataset.fxInitialized = 'true';
  motionReadyPromise.then(() => {
    if (shouldUseCompactMotion()) {
      animate(orbs, {
        opacity: [0.28, 0.5],
        scale: [0.98, 1.04],
        duration: 5200,
        delay: stagger(420),
        loop: true,
        alternate: true,
        ease: 'inOutSine',
      });
      return;
    }
    const [orbOne, orbTwo] = orbs;
    if (orbOne) {
      animate(orbOne, {
        x: [0, -18],
        y: [0, 16],
        scale: [1, 1.12],
        opacity: [0.34, 0.64],
        duration: 8400,
        loop: true,
        alternate: true,
        ease: 'inOutSine',
      });
    }
    if (orbTwo) {
      animate(orbTwo, {
        x: [0, 22],
        y: [0, -14],
        scale: [1, 1.08],
        opacity: [0.26, 0.54],
        duration: 9600,
        delay: 600,
        loop: true,
        alternate: true,
        ease: 'inOutSine',
      });
    }
    const handlePointerMove = (event) => {
      const rect = pageHeader.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (event.clientX - centerX) / rect.width;
      const offsetY = (event.clientY - centerY) / rect.height;
      if (orbOne) {
        animate(orbOne, {
          x: offsetX * -26,
          y: offsetY * -18,
          duration: 260,
          ease: 'out(2)',
        });
      }
      if (orbTwo) {
        animate(orbTwo, {
          x: offsetX * 22,
          y: offsetY * 16,
          duration: 300,
          ease: 'out(2)',
        });
      }
    };
    const handlePointerLeave = () => {
      if (orbOne) {
        animate(orbOne, {
          x: 0,
          y: 0,
          duration: 420,
          ease: 'out(3)',
        });
      }
      if (orbTwo) {
        animate(orbTwo, {
          x: 0,
          y: 0,
          duration: 420,
          ease: 'out(3)',
        });
      }
    };
    pageHeader.addEventListener('pointermove', handlePointerMove, { passive: true });
    pageHeader.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  });
}
function initAboutSkillsMotion() {
  const skillsBox = document.querySelector('.about-skills');
  const skillItems = document.querySelectorAll('.about-skills .skill-item');
  if (!skillsBox || !skillItems.length) return;
  if (skillsBox.dataset.fxInitialized === 'true') return;
  skillsBox.dataset.fxInitialized = 'true';
  motionReadyPromise.then(() => {
    const compactMotion = shouldUseCompactMotion();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animate(skillsBox, {
        opacity: { from: 0 },
        y: { from: compactMotion ? '0.75em' : '1em' },
        scale: { from: compactMotion ? 1 : 0.985 },
        duration: compactMotion ? 620 : 820,
        ease: 'out(3)',
      });
      animate(skillItems, {
        opacity: { from: 0 },
        x: { from: compactMotion ? '-0.35em' : '-0.6em' },
        duration: compactMotion ? 520 : 680,
        delay: stagger(compactMotion ? 45 : 60),
        ease: 'out(3)',
      });
      observer.unobserve(skillsBox);
    }, { threshold: 0.24 });
    observer.observe(skillsBox);
    if (!compactMotion) {
      skillsBox.addEventListener('mouseenter', () => {
        animate(skillItems, {
          x: [0, 8, 0],
          duration: 520,
          delay: stagger(52),
          ease: 'inOutSine',
        });
      });
    }
  });
}
function initTimelineFlowMotion() {
  const timeline = document.querySelector('.htimeline');
  if (!timeline) return;
  if (!timeline.querySelector('.htimeline-progress')) {
    const progressLine = document.createElement('span');
    progressLine.className = 'htimeline-progress';
    progressLine.setAttribute('aria-hidden', 'true');
    timeline.appendChild(progressLine);
  }
  const progressLine = timeline.querySelector('.htimeline-progress');
  const timelineItems = timeline.querySelectorAll('.htimeline-item');
  if (!progressLine) return;
  motionReadyPromise.then(() => {
    const compactMotion = shouldUseCompactMotion();
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const isMobileTimeline = window.matchMedia('(max-width: 720px)').matches;
      if (isMobileTimeline) {
        animate(progressLine, {
          scaleY: [0, 1],
          duration: compactMotion ? 760 : 1300,
          ease: 'out(3)',
        });
      } else {
        animate(progressLine, {
          scaleX: [0, 1],
          duration: compactMotion ? 760 : 1300,
          ease: 'out(3)',
        });
      }
      animate(timelineItems, {
        opacity: { from: 0 },
        y: { from: compactMotion ? '0.75em' : '1em' },
        duration: compactMotion ? 560 : 760,
        delay: stagger(compactMotion ? 55 : 85),
        ease: 'out(3)',
      });
      observer.unobserve(timeline);
    }, { threshold: 0.2 });
    observer.observe(timeline);
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
      animateAboutSections();
      initHeaderFxMotion();
      initAboutSkillsMotion();
      initTimelineFlowMotion();
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
    animateAboutSections();
    initHeaderFxMotion();
    initAboutSkillsMotion();
    initTimelineFlowMotion();
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
    const cleanupQueue = [];
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
      cleanupQueue.push(() => {
        btn.removeEventListener('mouseenter', handleMouseEnter);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    });
    return () => {
      cleanupQueue.forEach((cleanup) => cleanup());
    };
  }, [activeFocus]);
  useEffect(() => {
    const chipsNodes = rootRef.current?.querySelectorAll('.about-chip');
    if (!chipsNodes || chipsNodes.length === 0) return;
    const compactMotion = shouldUseCompactMotion();
    const cleanupQueue = [];
    chipsNodes.forEach((chip, index) => {
      const handleEnter = () => {
        if (compactMotion) return;
        animate(chip, {
          y: -1,
          scale: 1.02,
          boxShadow: '0 10px 26px rgba(74, 158, 255, 0.28)',
          duration: 240,
          ease: 'out(2)',
        });
      };
      const handleLeave = () => {
        if (compactMotion) return;
        animate(chip, {
          y: 0,
          scale: 1,
          boxShadow: '0 0 0 rgba(74, 158, 255, 0)',
          duration: 240,
          ease: 'out(2)',
        });
      };
      const handlePress = () => {
        chip.classList.add('is-pressed');
        animate(chip, {
          scale: [1, 0.97, 1.01, 1],
          y: [0, 0, -1, 0],
          duration: compactMotion ? 300 : 420,
          delay: compactMotion ? 0 : index * 16,
          ease: 'out(3)',
        });
      };
      const releasePress = () => {
        chip.classList.remove('is-pressed');
      };
      chip.addEventListener('mouseenter', handleEnter);
      chip.addEventListener('mouseleave', handleLeave);
      chip.addEventListener('pointerdown', handlePress);
      chip.addEventListener('pointerup', releasePress);
      chip.addEventListener('pointercancel', releasePress);
      cleanupQueue.push(() => {
        chip.removeEventListener('mouseenter', handleEnter);
        chip.removeEventListener('mouseleave', handleLeave);
        chip.removeEventListener('pointerdown', handlePress);
        chip.removeEventListener('pointerup', releasePress);
        chip.removeEventListener('pointercancel', releasePress);
      });
    });
    return () => {
      cleanupQueue.forEach((cleanup) => cleanup());
    };
  }, []);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (shouldUseCompactMotion()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(max-width: 1100px)').matches) return;
    const card = root.querySelector('.about-spotlight__card');
    const panel = root.querySelector('.about-spotlight__panel');
    if (!card && !panel) return;
    const handleMove = (event) => {
      const rect = root.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width) - 0.5;
      const normalizedY = ((event.clientY - rect.top) / rect.height) - 0.5;
      if (card) {
        animate(card, {
          rotateY: normalizedX * 2,
          rotateX: normalizedY * -1.4,
          translateX: normalizedX * 1.5,
          duration: 260,
          ease: 'out(2)',
        });
      }
      if (panel) {
        animate(panel, {
          rotateY: normalizedX * -1.6,
          rotateX: normalizedY * 1,
          translateX: normalizedX * -1.2,
          duration: 260,
          ease: 'out(2)',
        });
      }
    };
    const handleLeave = () => {
      if (card) {
        animate(card, {
          rotateY: 0,
          rotateX: 0,
          translateX: 0,
          duration: 420,
          ease: 'out(3)',
        });
      }
      if (panel) {
        animate(panel, {
          rotateY: 0,
          rotateX: 0,
          translateX: 0,
          duration: 420,
          ease: 'out(3)',
        });
      }
    };
    root.addEventListener('pointermove', handleMove, { passive: true });
    root.addEventListener('pointerleave', handleLeave, { passive: true });
    return () => {
      root.removeEventListener('pointermove', handleMove);
      root.removeEventListener('pointerleave', handleLeave);
    };
  }, []);
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


