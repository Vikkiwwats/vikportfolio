(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('bn-js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('[data-bn-motion]');
  const hero = document.querySelector('.bn-hero');
  const symbol = document.querySelector('.bn-symbol-stage');
  const pieces = [...document.querySelectorAll('[data-bn-piece]')];
  const palette = document.querySelector('.bn-palette');
  const strip = document.querySelector('.bn-type-strip');
  const photos = [...document.querySelectorAll('[data-depth]')];
  const reveals = [...document.querySelectorAll('[data-bn-reveal]')];
  let paused = false;
  let frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const sectionProgress = el => {
    const box = el.getBoundingClientRect();
    return clamp((innerHeight * .92 - box.top) / (innerHeight * .75 + box.height * .15));
  };
  const paint = () => {
    frame = 0;
    const total = root.scrollHeight - innerHeight;
    root.style.setProperty('--bn-progress', total > 0 ? clamp(scrollY / total).toFixed(4) : '0');
    if (paused && !reduced.matches) return;
    const still = reduced.matches;
    if (hero) {
      const p = still ? 0 : clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
      hero.style.setProperty('--hero-y', `${(p * 70).toFixed(1)}px`);
      hero.style.setProperty('--hero-logo-y', `${(p * -42).toFixed(1)}px`);
      hero.style.setProperty('--hero-scale', (1.06 - p * .04).toFixed(4));
    }
    if (symbol) {
      const p = still ? 1 : sectionProgress(symbol);
      const eased = 1-Math.pow(1-p,3);
      const offsets = [[-26,20,-4],[28,28,7],[24,-28,-7]];
      pieces.forEach((el,index) => {
        const [x,y,rot] = offsets[index];
        el.style.transform = `translate(${((1-eased)*x).toFixed(2)}px,${((1-eased)*y).toFixed(2)}px) rotate(${((1-eased)*rot).toFixed(2)}deg)`;
      });
    }
    if (palette) palette.style.setProperty('--palette-fill', still ? '1' : (.35 + sectionProgress(palette)*.65).toFixed(3));
    if (strip) strip.style.setProperty('--type-x', still ? '0px' : `${(-sectionProgress(strip)*200).toFixed(1)}px`);
    photos.forEach(el => {
      const box=el.getBoundingClientRect();
      if (box.bottom < -100 || box.top > innerHeight+100) return;
      const p = still ? .5 : clamp((innerHeight-box.top)/(innerHeight+box.height));
      el.style.setProperty('--drift-y', `${((p-.5)*Number(el.dataset.depth)).toFixed(1)}px`);
    });
  };
  const requestPaint = () => { if (!frame) frame=requestAnimationFrame(paint); };
  const sync = () => {
    const still=paused || reduced.matches;
    root.classList.toggle('bn-motion-paused',still);
    if (toggle) {
      toggle.disabled=reduced.matches;
      toggle.setAttribute('aria-pressed',String(still));
      toggle.setAttribute('aria-label', reduced.matches ? 'Анимация отключена настройкой устройства' : still ? 'Включить анимацию' : 'Приостановить анимацию');
      toggle.querySelector('span').textContent=still ? '▷' : 'Ⅱ';
    }
    if (reduced.matches) reveals.forEach(el=>el.classList.add('bn-visible'));
    requestPaint();
  };
  toggle?.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',sync);
  addEventListener('scroll',requestPaint,{passive:true});
  addEventListener('resize',requestPaint,{passive:true});
  document.addEventListener('visibilitychange',requestPaint);
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('bn-visible');observer.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px 45px 0px'});
    if (!reduced.matches) reveals.forEach(el=>{
      if(el.getBoundingClientRect().top>innerHeight){el.classList.add('bn-pending');observer.observe(el);}
    });
    const nav=[...document.querySelectorAll('.bn-nav nav>a')];
    const active=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)nav.forEach(a=>{
        if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
      });
    }),{rootMargin:'-15% 0px -65% 0px',threshold:0});
    nav.forEach(a=>{const el=document.querySelector(a.hash);if(el)active.observe(el);});
  }
  sync();

  const dialog=document.querySelector('[data-bn-lightbox]');
  if(!dialog || typeof dialog.showModal!=='function')return;
  const links=[...document.querySelectorAll('a[data-bn-gallery]')];
  const image=dialog.querySelector('img');
  const caption=dialog.querySelector('[data-bn-caption]');
  const counter=dialog.querySelector('[data-bn-count]');
  const previous=dialog.querySelector('[data-bn-prev]');
  const next=dialog.querySelector('[data-bn-next]');
  let items=[],index=0;
  const show=n=>{
    index=(n+items.length)%items.length;
    const link=items[index];image.src=link.href;image.alt=link.querySelector('img')?.alt || link.dataset.caption || '';
    caption.textContent=link.dataset.caption || image.alt;
    counter.textContent=`${index+1} / ${items.length}`;
    previous.hidden=next.hidden=items.length<2;
  };
  links.forEach(link=>link.addEventListener('click',event=>{
    if(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
    event.preventDefault();items=links.filter(a=>a.dataset.bnGallery===link.dataset.bnGallery);show(items.indexOf(link));dialog.showModal();root.classList.add('bn-lightbox-open');
  }));
  dialog.querySelector('[data-bn-close]').addEventListener('click',()=>dialog.close());
  previous.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
  dialog.addEventListener('close',()=>root.classList.remove('bn-lightbox-open'));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}
    if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}
  });
})();
