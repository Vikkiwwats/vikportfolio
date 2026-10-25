(() => {
  'use strict';
  const root=document.documentElement;
  root.classList.add('am-js');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const toggle=document.querySelector('[data-am-motion]');
  const hero=document.querySelector('.am-hero');
  const logo=document.querySelector('.am-logo-stage');
  const band=document.querySelector('.am-type-band');
  const bars=[...document.querySelectorAll('[data-am-bar]')];
  const photos=[...document.querySelectorAll('[data-am-depth]')];
  const reveals=[...document.querySelectorAll('[data-am-reveal]')];
  let paused=false,frame=0;
  const clamp=v=>Math.max(0,Math.min(1,v));
  const progress=el=>{const b=el.getBoundingClientRect();return clamp((innerHeight*.92-b.top)/(innerHeight*.72+b.height*.15));};
  const paint=()=>{
    frame=0;
    const total=root.scrollHeight-innerHeight;
    root.style.setProperty('--am-progress',total>0?clamp(scrollY/total).toFixed(4):'0');
    if(paused&&!reduced.matches)return;
    const still=reduced.matches;
    if(hero){const p=still?0:clamp(-hero.getBoundingClientRect().top/hero.offsetHeight);hero.style.setProperty('--am-hero-y',(p*65).toFixed(1)+'px');hero.style.setProperty('--am-logo-y',(-p*28).toFixed(1)+'px');hero.style.setProperty('--am-hero-scale',(1.035-p*.025).toFixed(4));hero.style.setProperty('--am-beam-angle',(p*12).toFixed(2)+'deg');}
    if(logo){const p=still?1:progress(logo);logo.style.setProperty('--am-mark-scale',(.96+p*.04).toFixed(4));logo.style.setProperty('--am-trail-offset',(1-p).toFixed(4));}
    if(band)band.style.setProperty('--am-type-x',still?'0px':(-progress(band)*230).toFixed(1)+'px');
    bars.forEach((bar,i)=>bar.style.setProperty('--am-level',still?'.5':(.18+Math.abs(Math.sin(scrollY*.004+i*.63))*.82).toFixed(3)));
    photos.forEach(el=>{const b=el.getBoundingClientRect();if(b.bottom<-80||b.top>innerHeight+80)return;const p=still?.5:clamp((innerHeight-b.top)/(innerHeight+b.height));el.style.setProperty('--am-drift',((p-.5)*Number(el.dataset.amDepth)).toFixed(1)+'px');});
  };
  const requestPaint=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  const sync=()=>{
    const still=paused||reduced.matches;
    root.classList.toggle('am-motion-paused',still);
    if(toggle){toggle.disabled=reduced.matches;toggle.setAttribute('aria-pressed',String(still));toggle.setAttribute('aria-label',reduced.matches?'Анимация отключена настройкой устройства':still?'Включить анимацию':'Приостановить анимацию');toggle.querySelector('span').textContent=still?'▷':'Ⅱ';}
    if(still)reveals.forEach(el=>el.classList.add('am-visible'));
    requestPaint();
  };
  toggle?.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',sync);
  addEventListener('scroll',requestPaint,{passive:true});addEventListener('resize',requestPaint,{passive:true});document.addEventListener('visibilitychange',requestPaint);
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('am-visible');observer.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px 45px 0px'});
    if(!reduced.matches)reveals.forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('am-pending');observer.observe(el);}});
    const nav=[...document.querySelectorAll('.am-nav nav>a')];
    const active=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)nav.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-15% 0px -65% 0px',threshold:0});
    nav.forEach(a=>{const el=document.querySelector(a.hash);if(el)active.observe(el);});
  }
  sync();
  const dialog=document.querySelector('[data-am-lightbox]');if(!dialog||typeof dialog.showModal!=='function')return;
  const links=[...document.querySelectorAll('a[data-am-gallery]')],image=dialog.querySelector('img'),caption=dialog.querySelector('[data-am-lightbox-caption]'),counter=dialog.querySelector('[data-am-count]'),prev=dialog.querySelector('[data-am-prev]'),next=dialog.querySelector('[data-am-next]');
  let items=[],index=0;
  const show=n=>{index=(n+items.length)%items.length;const a=items[index];image.src=a.href;image.alt=a.querySelector('img')?.alt||a.dataset.amCaption||'';caption.textContent=a.dataset.amCaption||image.alt;counter.textContent=`${index+1} / ${items.length}`;prev.hidden=next.hidden=items.length<2;};
  links.forEach(a=>a.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();items=links.filter(x=>x.dataset.amGallery===a.dataset.amGallery);show(items.indexOf(a));dialog.showModal();root.classList.add('am-lightbox-open');}));
  dialog.querySelector('[data-am-close]').addEventListener('click',()=>dialog.close());prev.addEventListener('click',()=>show(index-1));next.addEventListener('click',()=>show(index+1));
  dialog.addEventListener('close',()=>root.classList.remove('am-lightbox-open'));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();show(index+1);}if(event.key==='ArrowLeft'){event.preventDefault();show(index-1);}});
})();
