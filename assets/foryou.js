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

  const birds = [...document.querySelectorAll('[data-dove]')];
  let frame = 0;
  const updateBirds = () => {
    frame = 0;
    birds.forEach(bird => {
      if (reduced.matches) {
        bird.style.removeProperty('--flight-x');
        bird.style.removeProperty('--flight-y');
        bird.style.removeProperty('--flight-angle');
        return;
      }
      const zone = bird.closest('.fy-flight-zone');
      const rect = zone.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight * .5 - rect.top - rect.height * .5) / window.innerHeight));
      const direction = Number(bird.dataset.flight) || 1;
      const narrow = window.innerWidth < 560;
      const travel = narrow ? 18 : 48;
      const tilt = narrow ? 4 : 8;
      bird.style.setProperty('--flight-x', `${(progress * travel * direction).toFixed(1)}px`);
      bird.style.setProperty('--flight-y', `${(-progress * 78).toFixed(1)}px`);
      bird.style.setProperty('--flight-angle', `${(progress * tilt * direction).toFixed(1)}deg`);
    });
  };
  const requestBirdFrame = () => { if (!frame) frame = requestAnimationFrame(updateBirds); };
  if (birds.length) {
    window.addEventListener('scroll', requestBirdFrame, { passive: true });
    window.addEventListener('resize', requestBirdFrame, { passive: true });
    reduced.addEventListener('change', requestBirdFrame);
    requestBirdFrame();
  }

  const cards = [...document.querySelectorAll('[data-work]')];
  const filters = [...document.querySelectorAll('[data-work-filter]')];
  const workCount = document.querySelector('[data-work-count]');
  filters.forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.workFilter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = kind !== 'all' && !card.dataset.kind.split(' ').includes(kind);
      if (!card.hidden) count++;
    });
    if (workCount) workCount.textContent = `Показано: ${count} из ${cards.length}`;
  }));
  if (workCount) workCount.textContent = `Показано: ${cards.length} из ${cards.length}`;

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
    const fromGrid = Boolean(link.closest('[data-work]'));
    activeLinks = links.filter(item => Boolean(item.closest('[data-work]')) === fromGrid && !item.closest('[hidden]'));
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
