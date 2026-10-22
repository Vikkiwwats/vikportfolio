(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 70px 0px', threshold: 0.02 });
    revealElements.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('will-reveal');
        observer.observe(element);
      }
    });
  }

  const projects = document.querySelector('.projects');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  if (projects && filterButtons.length) {
    const cards = [...projects.querySelectorAll('[data-categories]')];
    const counter = document.querySelector('[data-project-count]');
    const applyFilter = (category, updateUrl) => {
      const validCategory = filterButtons.some(button => button.dataset.filter === category) ? category : 'all';
      filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === validCategory)));
      let count = 0;
      cards.forEach(card => {
        const show = validCategory === 'all' || card.dataset.categories.split(' ').includes(validCategory);
        card.hidden = !show;
        if (show) {
          count++;
          card.classList.add('is-visible');
        }
      });
      projects.dataset.visibleCount = String(count);
      if (counter) counter.textContent = `Показано: ${count} из ${cards.length}`;
      if (updateUrl) {
        const url = new URL(window.location.href);
        if (validCategory === 'all') url.searchParams.delete('category');
        else url.searchParams.set('category', validCategory);
        history.replaceState(null, '', url);
      }
    };
    filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter, true)));
    applyFilter(new URLSearchParams(location.search).get('category') || 'all', false);
    window.addEventListener('popstate', () => applyFilter(new URLSearchParams(location.search).get('category') || 'all', false));
  }

  const dialog = document.querySelector('[data-lightbox]');
  const imageLinks = [...document.querySelectorAll('a[data-gallery]')];
  if (dialog && typeof dialog.showModal === 'function' && imageLinks.length) {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('[data-caption]');
    const count = dialog.querySelector('[data-counter]');
    let current = 0;
    const showImage = index => {
      current = (index + imageLinks.length) % imageLinks.length;
      const link = imageLinks[current];
      const sourceImage = link.querySelector('img');
      image.src = link.href;
      image.alt = sourceImage ? sourceImage.alt : '';
      caption.textContent = link.dataset.caption || image.alt;
      count.textContent = `${current + 1} / ${imageLinks.length}`;
    };
    imageLinks.forEach((link, index) => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showImage(index);
      dialog.showModal();
      document.documentElement.classList.add('lightbox-open');
    }));
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-prev]').addEventListener('click', () => showImage(current - 1));
    dialog.querySelector('[data-next]').addEventListener('click', () => showImage(current + 1));
    dialog.addEventListener('close', () => document.documentElement.classList.remove('lightbox-open'));
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); showImage(current + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(current - 1); }
    });
    if (imageLinks.length < 2) {
      dialog.querySelector('[data-prev]').hidden = true;
      dialog.querySelector('[data-next]').hidden = true;
    }
  }

  const copyButton = document.querySelector('[data-copy-brief]');
  if (copyButton) copyButton.hidden = false;
  if (copyButton) copyButton.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    const brief = 'Здравствуйте, Виктория! Хочу обсудить дизайн.\nПроект / компания: \nЧто нужно сделать: \nСроки: \nОриентир по бюджету: \nПримеры и материалы: ';
    try {
      await navigator.clipboard.writeText(brief);
      status.textContent = 'Скопировано. Вставьте запрос в нашу переписку и дополните детали.';
    } catch (_) {
      const fallback = document.querySelector('[data-brief-fallback]');
      fallback.hidden = false;
      fallback.value = brief;
      fallback.focus();
      fallback.select();
      status.textContent = 'Выделенный текст можно скопировать вручную.';
    }
  });
})();
