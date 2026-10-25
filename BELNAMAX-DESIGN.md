# BELNAMAX — страница проекта

Публичная страница: https://vikkiwwats.github.io/vikportfolio/belnamax.html

## Основа и авторство

Источник — одностраничный авторский PDF «Стройматериалы.pdf», предоставленный Викторией Химич. Оригинальный логотип, его монограмма и буквенные контуры извлечены из векторного слоя PDF. Знак не заменён похожей буквой, надпись не перенабрана. Три части монограммы используются в анимации сборки. Файлы: `assets/images/belnamax/logo-white.svg`, `logo-black.svg`, `symbol.svg`. SVG содержат векторные контуры без растровой картинки.

Новые архитектурные сцены и применения бренда — концептуальное развитие айдентики для портфолио. Они не заявляют фактическое размещение рекламы, производство или коммерческие результаты. В разделе «Авторская основа» сохранены носители из исходного мудборда.

## Визуальное решение

Архитектурный первый экран, строгая сетка, крупная сжатая типографика, контраст светлых и графитовых разделов. Фотографии сохраняют пропорции; носители можно рассмотреть в полноэкранных галереях по разделам.

| Цвет | HEX | Назначение |
| --- | --- | --- |
| Графит | #1D2327 | Основной тёмный фон и знак |
| Бетон | #A8AFB1 | Нейтральный материал |
| Мел | #F5F5F2 | Светлый фон и инверсия |
| Сталь | #526A7B | Холодный архитектурный акцент |

Палитра оформлена как система на основе графита, светлого камня и холодных серо-синих оттенков мудборда; эти HEX — выбранные значения для страницы.

Шрифты в исходном PDF: **Bebas Neue Cyrillic**, **TeX Gyre Adventor Regular/Bold**. Оригинальные буквенные контуры сохранены в SVG. В демонстрации Bebas использован извлечённый исходный поднабор `original-display.woff` только для строки `belNAMAX`, соответствующей доступным глифам. Подпись Adventor показана родными векторными контурами.

Для кириллических заголовков страницы — **Oswald**, для текста — **Manrope**. Оба подключены локально, содержат кириллицу. Источники: [Oswald](https://github.com/google/fonts/tree/main/ofl/oswald), [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope). Лицензии OFL находятся рядом со шрифтами в `assets/fonts/belnamax/`.

## Структура и движение

Первый экран → основа бренда → геометрия знака → цвет и типографика → городские LED-экраны → печатная наружная реклама → упаковка и штамп → оригинальные авторские носители → переход к обсуждению проекта.

При прокрутке связаны: смещение архитектурного фона и логотипа; сборка трёх исходных частей знака; раскрытие палитры; движение типографической строки; мягкое смещение фотографий. Кнопка в шапке приостанавливает движение. Учитывается `prefers-reduced-motion`. Без JavaScript видны материалы и работают обычные ссылки на изображения. Галереи поддерживают Escape, стрелки, кнопки и счётчик.

## Файлы

- Страница: `belnamax.html`.
- Стили: `assets/belnamax.css`; поведение: `assets/belnamax.js`.
- Карточка портфолио: `index.html`, правила `.belnamax-card` в `assets/portfolio.css`.
- Все изображения: `assets/images/belnamax/`.
- Авторские носители: `original-stationery.webp`, `original-print.webp`, `original-digital.webp`, `original-moodboard.webp`; фактура: `stone.webp`; дополнительный исходный архитектурный референс: `original-architecture.webp`.

## Генерация изображений

Режим: **built-in image generation tool** (`image_gen.imagegen`). Референс для шести брендированных сцен — точный исходный логотип, извлечённый из PDF. Финальные изображения сохранены в WebP высокого качества, исходные разрешения не увеличивались искусственно. Логотипы в сгенерированных сценах являются частью визуализации поверхности; на самой странице и в шапке используется точный исходный SVG.

Ниже — финальные промпты и пути всех семи использованных изображений.

### hero-architecture

Путь: `assets/images/belnamax/hero-architecture.webp`

```text
Use case: photorealistic-natural. Asset: ultra-wide cinematic website hero background, 21:9 landscape. Breathtaking contemporary high-rise architecture in a northern European city: sculptural pale concrete towers with precise vertical ribs and dark glass, seen from a low angle through a narrow urban canyon. Strong monumental geometry, dramatic grey daylight with a sliver of white sky, real architectural material texture. Graphite and silver monochrome palette with extremely restrained cool steel blue reflections, rich blacks and clean whites, premium architecture magazine quality. Put the most beautiful tower at center-right, keep the left third darker and visually quieter for a website's own white brand logo. No text, no logos, no signs, no fake skyline, no fantastical sci-fi shapes, no people closeups. Natural lens and impeccable realism.
```

### led-city

Путь: `assets/images/belnamax/led-city.webp`

```text
Use case: product-mockup. Brand: BELNAMAX construction materials store. The reference is the designer's exact identity: original angular split M/X monogram plus condensed BELNAMAX wordmark and small CONSTRUCTION MATERIALS subtitle. Preserve its exact silhouette, letter spelling and proportions. It is not a generic letter M: note the two detached opposing triangular pieces on its right. Integrate branding naturally into real surfaces with correct perspective, light, texture and scale, never as a pasted floating overlay. Sophisticated architectural editorial photography, charcoal, off-white, concrete grey and restrained cold steel blue. No gold, no neon colors, no other brands, no invented addresses, certifications or claims, no watermarks. Asset: horizontal 3:2 realistic architectural advertising photograph at blue hour. A spectacular real-looking tall modern urban office building with a large luminous wraparound LED screen integrated into its lower corner facade, seen from street level in a refined three-quarter composition. The LED screen presents the exact reference logo in white on charcoal, clearly readable and large, with a quiet grayscale architectural line motif on the side. ONLY text BELNAMAX and CONSTRUCTION MATERIALS. Fine natural LED pixel texture and subtle luminous spill on glass, believable perspective and evening exposure, cool grey sky, understated street reflections, a few tiny pedestrians to establish scale. No excessive neon, no overly glossy CGI. Screen is the visual focus; beautiful building and city context around it. ONE advertisement, ONE building composition.
```

### led-tower

Путь: `assets/images/belnamax/led-tower.webp`

```text
Use case: product-mockup. Brand: BELNAMAX construction materials store. The reference is the designer's exact identity: original angular split M/X monogram plus condensed BELNAMAX wordmark and small CONSTRUCTION MATERIALS subtitle. Preserve its exact silhouette, letter spelling and proportions. It is not a generic letter M: note the two detached opposing triangular pieces on its right. Integrate branding naturally into real surfaces with correct perspective, light, texture and scale, never as a pasted floating overlay. Sophisticated architectural editorial photography, charcoal, off-white, concrete grey and restrained cold steel blue. No gold, no neon colors, no other brands, no invented addresses, certifications or claims, no watermarks. Asset: vertical 2:3 premium photograph of a high-rise building with a striking tall narrow LED facade at dusk. Look upward at pale concrete and glass towers. A genuinely integrated vertical black-and-white LED media facade shows the exact split M/X monogram enlarged at its top, BELNAMAX condensed lettering below with its original proportions and a small CONSTRUCTION MATERIALS subtitle, all upright and readable. No rotating or vertical sideways letters. Beautiful broad negative white areas, thin black architectural framing, strong graphic balance. Show the entire tall screen and enough facade to convey scale. Authentic tiny LED diodes, realistic architectural reflections and restrained light spill. Monochrome with subtle steel blue evening atmosphere; no invented brands or other text.
```

### printed-fence

Путь: `assets/images/belnamax/printed-fence.webp`

```text
Use case: product-mockup. Brand: BELNAMAX construction materials store. The reference is the designer's exact identity: original angular split M/X monogram plus condensed BELNAMAX wordmark and small CONSTRUCTION MATERIALS subtitle. Preserve its exact silhouette, letter spelling and proportions. It is not a generic letter M: note the two detached opposing triangular pieces on its right. Integrate branding naturally into real surfaces with correct perspective, light, texture and scale, never as a pasted floating overlay. Sophisticated architectural editorial photography, charcoal, off-white, concrete grey and restrained cold steel blue. No gold, no neon colors, no other brands, no invented addresses, certifications or claims, no watermarks. Asset: horizontal 3:2 photograph of a premium printed construction-site fence banner. A long matte printed banner stretched on a real metal construction fence below beautiful contemporary pale concrete high-rise buildings, in bright soft overcast daylight. Banner graphic: big exact black monogram and BELNAMAX logo on off-white, with restrained bold charcoal panel carrying the short uppercase words BUILD. REPAIR. CREATE. in condensed industrial typography. Fine grey ruled lines and a close material stone pattern. Real tension along edges, tiny grommets, slight fabric creases and subtle print grain; NOT an LED screen. Show the full banner in a sophisticated oblique urban composition. Clean professional construction site, no chaotic debris or danger, no workers closeups.
```

### printed-billboard

Путь: `assets/images/belnamax/printed-billboard.webp`

```text
Use case: product-mockup. Brand: BELNAMAX construction materials store. The reference is the designer's exact identity: original angular split M/X monogram plus condensed BELNAMAX wordmark and small CONSTRUCTION MATERIALS subtitle. Preserve its exact silhouette, letter spelling and proportions. It is not a generic letter M: note the two detached opposing triangular pieces on its right. Integrate branding naturally into real surfaces with correct perspective, light, texture and scale, never as a pasted floating overlay. Sophisticated architectural editorial photography, charcoal, off-white, concrete grey and restrained cold steel blue. No gold, no neon colors, no other brands, no invented addresses, certifications or claims, no watermarks. Asset: horizontal 3:2 architectural advertising photograph. A large freestanding physical printed billboard at the edge of a modern industrial district, with an elegant sculptural concrete office building behind it, crisp overcast daylight. Exact reference BELNAMAX lockup appears large in white on a deep graphite matte billboard; a small architectural material detail and linear ruled graphic occupy the opposite third. ONLY BELNAMAX and CONSTRUCTION MATERIALS. Real flat printed vinyl with subtle edge fixings and sensible support structure, sharp material detail, believable light and perspective. No glowing screen, no floating logo, no digital shine. Beautiful balanced editorial composition, high-end brand portfolio presentation.
```

### materials

Путь: `assets/images/belnamax/materials.webp`

```text
Use case: product-mockup. Brand: BELNAMAX construction materials store. The reference is the designer's exact identity: original angular split M/X monogram plus condensed BELNAMAX wordmark and small CONSTRUCTION MATERIALS subtitle. Preserve its exact silhouette, letter spelling and proportions. It is not a generic letter M: note the two detached opposing triangular pieces on its right. Integrate branding naturally into real surfaces with correct perspective, light, texture and scale, never as a pasted floating overlay. Sophisticated architectural editorial photography, charcoal, off-white, concrete grey and restrained cold steel blue. No gold, no neon colors, no other brands, no invented addresses, certifications or claims, no watermarks. Asset: horizontal 3:2 realistic premium still-life of branded construction materials in a clean warehouse. Neatly stacked neutral grey/kraft paper sacks for dry construction mix, squared timber offcuts, gypsum board samples and a matte white sample carton on raw concrete. Exact original monogram and full BELNAMAX lockup are naturally screen printed in black on each sack and on a restrained off-white paper inventory band around the gypsum samples. Keep logos a sensible medium size and correct, following paper texture and folds. One small black stencil mark on a timber side. Tactile dust, fine paper fibers, natural coarse concrete, real shadows. No ornate gift packaging, no luxury jewelry look, no fictitious technical product claims or large numbers. Quiet architectural arrangement with clear object hierarchy, clean realistic practical materials.
```

### stamp-detail

Путь: `assets/images/belnamax/stamp-detail.webp`

```text
Use case: product-mockup. Brand: BELNAMAX construction materials store. The reference is the designer's exact identity: original angular split M/X monogram plus condensed BELNAMAX wordmark and small CONSTRUCTION MATERIALS subtitle. Preserve its exact silhouette, letter spelling and proportions. It is not a generic letter M: note the two detached opposing triangular pieces on its right. Integrate branding naturally into real surfaces with correct perspective, light, texture and scale, never as a pasted floating overlay. Sophisticated architectural editorial photography, charcoal, off-white, concrete grey and restrained cold steel blue. No gold, no neon colors, no other brands, no invented addresses, certifications or claims, no watermarks. Asset: horizontal 3:2 tactile macro photograph of a small BELNAMAX branding stamp on construction materials. Raw pale wood block, a gypsum board edge, concrete aggregate and a thick off-white uncoated inventory tag tied with black cotton string. The tag carries the exact black BELNAMAX lockup with its precise split monogram and small CONSTRUCTION MATERIALS subtitle, clean industrial typography. Beside it, a dark rubber branding stamp resting on its side and a fresh black ink impression of the same monogram on the wood, naturally absorbed into wood grain, slightly imperfect ink density but no shape distortion. Shot with soft side daylight, shallow but useful depth of field, exquisite authentic material detail. No hands, no foreign logos, no extra text, no glossy plastic, no stickers pasted digitally.
```

## Проверка

Локальная проверка: настольный экран 1348 px и мобильные рамки 390/320 px; заголовки помещаются, горизонтального переполнения страницы нет. Проверены переходы по разделам, открытие и перелистывание LED-, печатной и материальной галерей, Escape, управление паузой и исходная галерея. Статически проверены локальные ссылки, уникальность ID, размеры WebP, ссылки CSS на файлы и отсутствие растровых элементов в SVG. `node --check assets/belnamax.js` и `git diff --check` проходят.
