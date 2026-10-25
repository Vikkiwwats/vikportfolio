(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('fy-js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 55px 0px' });
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('fy-reveal-pending');
        observer.observe(el);
      }
    });
  }

  // Four painted wing poses, blended around a slow wingbeat; scrolling advances it too.
  const birds = [...document.querySelectorAll('[data-wing-bird]')].map(el => ({
    el, frames: [...el.querySelectorAll('.fy-wing-frame')], phase: Number(el.dataset.phase) || 0,
    scene: el.closest('.fy-scene'), visible: true
  }));
  const motionToggle = document.querySelector('[data-motion-toggle]');
  let paused = false;
  let animation = 0;
  let lastPaint = 0;
  let clock = 0;
  const isStill = () => paused || reduced.matches;
  const setPose = (bird, open) => {
    const value = Math.max(0, Math.min(2.999, open * 3));
    const first = Math.floor(value), mix = value - first;
    bird.frames.forEach((layer, index) => {
      const opacity = index === first ? 1 - mix : index === first + 1 ? mix : 0;
      layer.style.opacity = opacity.toFixed(3);
    });
  };

  const hero = document.querySelector('.fy-cinematic');
  let sceneShift = -1;
  const paintScene = () => {
    if (!hero) return;
    const progress = isStill() ? 0 : Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
    if (Math.abs(progress - sceneShift) < .001) return;
    sceneShift = progress;
    hero.style.setProperty('--scene-bg-y', `${(progress * 55).toFixed(1)}px`);
    hero.style.setProperty('--scene-art-y', `${(progress * -65).toFixed(1)}px`);
  };
  hero?.addEventListener('pointermove', event => {
    if (isStill() || event.pointerType === 'touch') return;
    const box = hero.getBoundingClientRect();
    hero.style.setProperty('--look-x', `${((event.clientX-box.left)/box.width-.5)*14}px`);
    hero.style.setProperty('--look-y', `${((event.clientY-box.top)/box.height-.5)*10}px`);
  }, {passive:true});
  const resetLook = () => { hero?.style.setProperty('--look-x','0px'); hero?.style.setProperty('--look-y','0px'); };
  hero?.addEventListener('pointerleave', resetLook, {passive:true});
  const paintBirds = stamp => {
    paintScene();
    animation = 0;
    const active = !isStill() && !document.hidden;
    if (active && lastPaint) clock += Math.min(50, stamp - lastPaint);
    lastPaint = stamp;
    const view = window.innerHeight;
    birds.forEach(bird => {
      if (!bird.visible && active) return;
      const box = bird.scene.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (view * .5 - box.top - box.height * .5) / view));
      if (isStill()) {
        setPose(bird, bird.el.dataset.species === 'songbird' ? 0 : .2);
        bird.el.style.setProperty('--bird-x', '0px');
        bird.el.style.setProperty('--bird-y', '0px');
        bird.el.style.setProperty('--bird-tilt', '0deg');
        return;
      }
      const phase = clock / (bird.el.dataset.species === 'songbird' ? 1450 : 1150) + bird.phase + progress * 2.8;
      setPose(bird, (1 - Math.cos(phase)) / 2);
      const small = window.innerWidth < 560;
      const direction = bird.phase % 2 > 1 ? -1 : 1;
      const idle = Math.sin(clock / 2300 + bird.phase);
      bird.el.style.setProperty('--bird-x', `${(progress * (small ? 10 : 32) * direction + idle * 3).toFixed(1)}px`);
      bird.el.style.setProperty('--bird-y', `${(-progress * (small ? 20 : 48) + idle * 4).toFixed(1)}px`);
      bird.el.style.setProperty('--bird-tilt', `${(Math.sin(phase / 2) * 1.8 + progress * 3).toFixed(1)}deg`);
    });
    if (active && birds.some(bird => bird.visible)) animation = requestAnimationFrame(paintBirds);
  };
  const requestMotion = () => { if (!animation) animation = requestAnimationFrame(paintBirds); };
  const syncMotion = () => {
    root.classList.toggle('fy-motion-paused', isStill());
    if (isStill()) resetLook();
    if (motionToggle) {
      motionToggle.disabled = reduced.matches;
      motionToggle.setAttribute('aria-pressed', String(isStill()));
      motionToggle.setAttribute('aria-label', reduced.matches ? 'Анимация отключена настройкой устройства' : isStill() ? 'Включить анимацию' : 'Приостановить анимацию');
      motionToggle.querySelector('span').textContent = isStill() ? '▷' : 'Ⅱ';
    }
    requestMotion();
  };
  motionToggle?.addEventListener('click', () => { paused = !isStill(); syncMotion(); });
  reduced.addEventListener('change', syncMotion);
  window.addEventListener('scroll', requestMotion, { passive: true });
  document.addEventListener('visibilitychange', () => { lastPaint = 0; requestMotion(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const bird = birds.find(item => item.el === entry.target);
        if (bird) bird.visible = entry.isIntersecting;
      });
      requestMotion();
    }, { rootMargin: '100px' });
    birds.forEach(bird => observer.observe(bird.el));
  }
  syncMotion();

  const syncMural = () => {
    document.querySelector('.fy-world')?.style.setProperty('--grove-period', `${Math.max(document.documentElement.clientWidth,780)/1.5}px`);
  };
  window.addEventListener('resize', () => { syncMural(); requestMotion(); }, {passive:true});
  syncMural();

  const dialog = document.querySelector('[data-lightbox]');
  const links = [...document.querySelectorAll('a[data-gallery]')];
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const photo = dialog.querySelector('img');
  const caption = dialog.querySelector('[data-caption]');
  const counter = dialog.querySelector('[data-counter]');
  const previous = dialog.querySelector('[data-prev]');
  const next = dialog.querySelector('[data-next]');
  let activeLinks = [];
  let current = 0;
  const show = index => {
    current = (index + activeLinks.length) % activeLinks.length;
    const link = activeLinks[current];
    photo.src = link.href;
    photo.alt = link.querySelector('img')?.alt || '';
    caption.textContent = link.dataset.caption || photo.alt;
    counter.textContent = `${current + 1} / ${activeLinks.length}`;
    previous.hidden = next.hidden = activeLinks.length < 2;
  };
  links.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const group = link.dataset.galleryGroup;
    activeLinks = links.filter(item => item.dataset.galleryGroup === group);
    show(activeLinks.indexOf(link));
    dialog.showModal();
    root.classList.add('fy-lightbox-open');
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  dialog.addEventListener('close', () => root.classList.remove('fy-lightbox-open'));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  });
})();
