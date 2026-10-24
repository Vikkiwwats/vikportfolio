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
  const paintBirds = stamp => {
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

  // A continuous twisted gold strip follows the actual section positions.
  // Native SVG keeps the long ribbon crisp at every viewport size.
  const ribbon = document.querySelector('[data-gold-ribbon]');
  const main = document.querySelector('main');
  const number = value => Number(value.toFixed(2));
  const buildRibbon = () => {
    if (!ribbon || !main) return;
    const bounds = main.getBoundingClientRect();
    const width = main.clientWidth, height = main.offsetHeight;
    const narrow = width < 600;
    document.querySelector('.fy-world')?.style.setProperty('--grove-period', `${Math.max(width,780)/1.5}px`);
    const measure = selector => {
      const el = document.querySelector(selector), rect = el.getBoundingClientRect();
      return { top: rect.top - bounds.top, height: rect.height, bottom: rect.bottom - bounds.top };
    };
    const hero = measure('.fy-hero'), intro = measure('#identity'), materials = measure('#materials'),
      details = measure('#details'), gallery = measure('#gallery'), closing = measure('#contact');
    const anchors = [
      [.84, 0], [.965, hero.height * .23], [.87, hero.height * .54], [.955, hero.bottom - 75],
      [.68, hero.bottom + 20], [.08, intro.top + 45], [.025, intro.top + intro.height * .55],
      [.10, intro.bottom - 10], [.91, materials.top + 22], [.975, materials.top + materials.height * .5],
      [.92, materials.bottom - 10], [.09, details.top + 22], [.025, details.top + details.height * .6],
      [.09, details.bottom - 10], [.93, gallery.top + 21], [.98, gallery.top + gallery.height * .52],
      [.92, gallery.bottom - 10], [.48, closing.top + 15], [.045, closing.top + closing.height * .48],
      [.10, height - 45], [.42, height + 30]
    ].map(([x, y]) => ({ x: x * width, y }));
    const samples = [];
    const interpolate = (a, b, c, d, t) => .5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t*t + (-a + 3*b - 3*c + d) * t*t*t);
    for (let index = 0; index < anchors.length - 1; index++) {
      const a=anchors[Math.max(0,index-1)], b=anchors[index], c=anchors[index+1], d=anchors[Math.min(anchors.length-1,index+2)];
      for (let step=0;step<18;step++) {
        const t=step/18;
        samples.push({x:interpolate(a.x,b.x,c.x,d.x,t),y:interpolate(a.y,b.y,c.y,d.y,t)});
      }
    }
    samples.push(anchors[anchors.length-1]);
    let length=0;
    const strip = samples.map((p, i) => {
      const a=samples[Math.max(0,i-1)],b=samples[Math.min(samples.length-1,i+1)];
      const dx=b.x-a.x,dy=b.y-a.y,span=Math.hypot(dx,dy)||1;
      if(i)length+=Math.hypot(p.x-samples[i-1].x,p.y-samples[i-1].y);
      const twist=Math.sin(length/230+.4), half=(narrow?10:28)*(.26+.74*Math.abs(Math.cos(length/270+.5)));
      return {p,left:{x:p.x-dy/span*half,y:p.y+dx/span*half},right:{x:p.x+dy/span*half,y:p.y-dx/span*half},angle:Math.atan2(dy,dx)*180/Math.PI,length,twist};
    });
    const point=p=>`${number(p.x)},${number(p.y)}`;
    const outline = 'M'+strip.map(s=>point(s.left)).join(' L')+' L'+strip.slice().reverse().map(s=>point(s.right)).join(' L')+' Z';
    const defs=`<defs><linearGradient id="fy-continuous-gold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${width}" y2="${width*.17}"><stop stop-color="#a27d37"/><stop offset=".13" stop-color="#efd99a"/><stop offset=".29" stop-color="#c4a35d"/><stop offset=".47" stop-color="#f1dda3"/><stop offset=".65" stop-color="#bf9b54"/><stop offset=".83" stop-color="#f5e2a8"/><stop offset="1" stop-color="#b48c42"/></linearGradient></defs>`;
    const surface=`<path d="${outline}" fill="url(#fy-continuous-gold)"/>`;
    const leftEdge='M'+strip.map(s=>point(s.left)).join(' L');
    const rightEdge='M'+strip.map(s=>point(s.right)).join(' L');
    const sheen='M'+strip.map(s=>point({x:s.left.x*.86+s.right.x*.14,y:s.left.y*.86+s.right.y*.14})).join(' L');
    const edges=`<path d="${rightEdge}" fill="none" stroke="#87652a" stroke-opacity=".48" stroke-width="1.8"/><path d="${leftEdge}" fill="none" stroke="#fff0c2" stroke-opacity=".85" stroke-width="1.3"/><path d="${sheen}" fill="none" stroke="#fff3cd" stroke-opacity=".24" stroke-width="2"/>`;
    let stamps='';
    if(!narrow)strip.forEach((a,i)=>{if(i%44===18)stamps+=`<image class="fy-ribbon-stamp" href="assets/images/for-you/author-logo-black.webp" x="-32" y="-20" width="64" height="40" transform="translate(${number(a.p.x)} ${number(a.p.y)}) rotate(${number(a.angle-90)})"/>`;});
    ribbon.setAttribute('viewBox',`0 0 ${width} ${height}`);
    ribbon.innerHTML=defs+surface+edges+stamps;
  };
  let ribbonFrame=0;
  const requestRibbon = () => { if(!ribbonFrame)ribbonFrame=requestAnimationFrame(()=>{ribbonFrame=0;buildRibbon();}); };
  window.addEventListener('resize', () => { requestMotion(); requestRibbon(); }, {passive:true});
  window.addEventListener('load', requestRibbon, {once:true});
  document.querySelectorAll('[data-work-filter]').forEach(button=>button.addEventListener('click',requestRibbon));
  buildRibbon();

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
