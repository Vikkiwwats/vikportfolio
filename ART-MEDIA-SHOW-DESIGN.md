# ART MEDIA SHOW — айдентика, мерч и сайт

Страница портфолио: https://vikkiwwats.github.io/vikportfolio/art-media-show.html

## Исходные материалы и авторство

Виктория подтвердила авторство логотипа, палитры, фирменного стиля и сайта. Для кейса использованы два предоставленных изображения: `2026-10-26 02.00.05.jpg` (подборка макетов) и `2026-10-26 02.00.18.jpg` (фирменный визуал с латинским логотипом AMS). Исходные вложения не изменялись. Их копии для сайта — `assets/images/ams/author-board.webp` и `author-poster.webp`.

Сайт компании и его текущий исходный HTML использованы для проверки палитры, шрифтов и состава разделов: https://github.com/Vikkiwwats/ArtMediaShow. Работающий проект: https://vikkiwwats.github.io/ArtMediaShow/.

Латинский логотип восстановлен по контурам предоставленного растрового изображения, без замены надписи похожим шрифтом. Выделена белая форма, фоновые световые полосы исключены, контуры переведены в кривые Bézier с помощью Potrace. Это векторизация предоставленного изображения, а не утверждение о наличии исходного авторского SVG. Сохранены эквалайзер, диагональ, AMS и подпись ART MEDIA SHOW. Файлы `logo-white.svg`, `logo-black.svg`, `logo-orange.svg` содержат пути без растрового изображения и внешних фильтров.

## Визуальная система

| Цвет | HEX | Роль |
| --- | --- | --- |
| Black | #000000 | Глубина, техническая среда |
| White | #FFFFFF | Знак и типографический контраст |
| Orange | #FF5500 | Основной световой акцент |
| Amber | #FFAA33 | Тёплый свет и переходы |

Значения оранжевого и янтарного взяты из CSS разработанного сайта (`--o1`, `--o3`). Страница кейса использует также почти чёрные фоны для разделов и спокойные тёплые нейтральные подписи.

Шрифты, уже использованные в сайте компании: **Manrope**, **Bebas Neue**, **Rajdhani**. В кейсе Manrope поддерживает кириллические заголовки и основной текст, Bebas Neue — крупные латинские образцы, Rajdhani — технические латинские акценты. Это шрифты страницы и визуальной системы; авторская форма AMS остаётся отдельным знаком. Все шрифты подключены локально в WOFF, OFL-лицензии находятся в `assets/fonts/ams/`. Официальные источники: [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope), [Bebas Neue](https://github.com/google/fonts/tree/main/ofl/bebasneue), [Rajdhani](https://github.com/google/fonts/tree/main/ofl/rajdhani).

## Структура и взаимодействие

Сценический первый экран → роль и характер бренда → логотип → цвет и типографика → авторские макеты → кофры и маркировка акустики → backstage → одежда команды и комплект мерча → бейджи и стикеры → работающий сайт → обсуждение проекта.

Прокрутка управляет фоном и световым лучом первого экрана, световыми траекториями вокруг целого логотипа, эквалайзером, типографической строкой и мягким смещением фотографий. Непрерывного цикла анимации нет: обновления запрашиваются при прокрутке и изменении размера. Кнопка в шапке приостанавливает движение. Учитывается `prefers-reduced-motion`. Без JavaScript материалы видны, обычные ссылки на изображения и сайт доступны.

Галереи разделены: авторские материалы — 2; оборудование — 3; мерч — 3; сайт — 1. Увеличение поддерживает стрелки клавиатуры, Escape, кнопки и счётчик. Изображения сохраняют исходные пропорции.

Новые физические носители и сценическая фотография — концептуальное развитие айдентики. Кейc не заявляет, что этот мерч произведён или маркировка уже нанесена на реальное оборудование. Коммерческие результаты, отзывы и цифры не выдуманы.

## Файлы проекта

- `art-media-show.html` — полная страница кейса.
- `assets/ams-case.css`, `assets/ams-case.js` — изолированные стили и поведение.
- `index.html`, правила `.ams-card` в `assets/portfolio.css` — обновлённая карточка; направления `brand print digital web`.
- `assets/images/ams/` — логотипы, авторская графика и новые визуализации.
- `assets/images/ams-cover.webp` — сохранённый существующий снимок первого экрана разработанного сайта, без перерисовки интерфейса.

## Генерация изображений

Режим: **built-in image generation tool** (`image_gen.imagegen`). Для шести брендированных сцен использован один чистый референс логотипа, полученный из контуров присланного визуала. Физические нанесения сгенерированы как часть поверхности, без последующего наложения логотипа поверх фотографии. Все семь результатов сохранены в WebP высокого качества при исходных разрешениях. Исходные PNG оставлены отдельно; искусственное увеличение разрешения не применялось.

Финальные сохранённые пути и полный набор промптов:

### hero-stage

Путь: `assets/images/ams/hero-stage.webp` — 1916 × 821 px.

```text
Use case: photorealistic-natural. Asset: ultra-wide 21:9 immersive website hero background for AMS event production. A breathtaking professional concert venue just before the show: large stage with sophisticated LED wall, suspended line arrays, moving-head fixtures and beautiful precise fans of warm orange and white light through delicate haze. Cinematic low-angle wide view from the dark front-of-house area, real stage scale and credible rigging, no fantasy equipment. Deep black and burnt orange palette, warm amber highlights, dramatic but elegant controlled exposure. Stage and brightest beams primarily on the right two thirds; keep the left third dark with atmospheric negative space for the website's own white logo. No logos, no text, no recognizable performers, no close-up faces, no fire or pyrotechnics. Impeccable high-end live-event photography, sharp detailed real equipment.
```

### flight-cases

Путь: `assets/images/ams/flight-cases.webp` — 1536 × 1024 px.

```text
Use case: product-mockup. Brand: AMS / ART MEDIA SHOW, professional event technical production: sound, lighting and LED screens. Reference image 1 is the exact supplied brand logo, shown in black on white only for clarity. Preserve this original italic AMS lettering, the three equalizer columns, the long sweeping diagonal and the small ART MEDIA SHOW subtitle. Do not substitute a generic AMS font, A+M monogram or another logo. Integrate the logo naturally into the photographed surface with correct perspective, realistic print or embroidery texture and plausible scale. Palette: rich black, white, vivid orange #FF5500 and warm amber #FFAA33, with brushed silver hardware. Premium professional editorial photography, real materials, no plastic CGI shine, no extra brands, no watermark, no invented achievements, addresses or product specifications. Asset: horizontal 3:2 premium backstage photograph of a coherent branded touring-equipment system. Three large professional black plywood flight cases on heavy-duty wheels, brushed aluminium extrusions, ball corners, butterfly latches and recessed handles. One tall case, one medium trunk and one smaller case in a dark loading dock beside a stage. The exact reference logo is screen printed in WHITE directly on the largest front black panel, generously sized but within the panel and optically straight; a restrained orange inventory band is on another case. An off-white die-cut label with the same exact black logo sits naturally on a second case. Orange side light from the stage, neutral soft fill revealing real textured phenolic panels and hardware. Wide sophisticated composition, believable practical construction, no case open, no illegible technical microcopy, no random text.
```

### crew-shirts

Путь: `assets/images/ams/crew-shirts.webp` — 1536 × 1024 px.

```text
Use case: product-mockup. Brand: AMS / ART MEDIA SHOW, professional event technical production: sound, lighting and LED screens. Reference image 1 is the exact supplied brand logo, shown in black on white only for clarity. Preserve this original italic AMS lettering, the three equalizer columns, the long sweeping diagonal and the small ART MEDIA SHOW subtitle. Do not substitute a generic AMS font, A+M monogram or another logo. Integrate the logo naturally into the photographed surface with correct perspective, realistic print or embroidery texture and plausible scale. Palette: rich black, white, vivid orange #FF5500 and warm amber #FFAA33, with brushed silver hardware. Premium professional editorial photography, real materials, no plastic CGI shine, no extra brands, no watermark, no invented achievements, addresses or product specifications. Asset: horizontal 3:2 professional editorial apparel photograph, rear three-quarter view of TWO adult event crew members in clean black heavyweight cotton T-shirts beside an empty stage with refined warm orange lighting in the background. One person is seen fully from the back with the exact white reference logo screen printed centered on the upper back, large but believable about 28cm wide. The other turns slightly to show the front chest with a small matching white logo about 9cm wide. Faces turned away and not visible. Tactile cotton folds, natural fit, realistic screen-print ink absorbed into fabric, no glossy sticker edges or floating logos. Real backstage atmosphere and equipment in soft focus, believable human anatomy, quiet confident premium event crew styling. No slogans, no other text, no safety gear claims.
```

### merch-kit

Путь: `assets/images/ams/merch-kit.webp` — 1536 × 1024 px.

```text
Use case: product-mockup. Brand: AMS / ART MEDIA SHOW, professional event technical production: sound, lighting and LED screens. Reference image 1 is the exact supplied brand logo, shown in black on white only for clarity. Preserve this original italic AMS lettering, the three equalizer columns, the long sweeping diagonal and the small ART MEDIA SHOW subtitle. Do not substitute a generic AMS font, A+M monogram or another logo. Integrate the logo naturally into the photographed surface with correct perspective, realistic print or embroidery texture and plausible scale. Palette: rich black, white, vivid orange #FF5500 and warm amber #FFAA33, with brushed silver hardware. Premium professional editorial photography, real materials, no plastic CGI shine, no extra brands, no watermark, no invented achievements, addresses or product specifications. Asset: horizontal 3:2 realistic art-directed flat lay of an elegant professional event crew merch kit on a charcoal technical surface: one neatly folded black heavyweight crew T-shirt, one black baseball cap, a coiled black lanyard with an orange accent and a sturdy matte black thermos. Use the exact white reference logo consistently: medium screen print visible on the folded shirt, small precision white embroidered logo on cap front, a small white pad print on thermos. Orange reflective fabric detail on the lanyard, no tiny repeated illegible logos. Rich real woven fabric, embroidery threads and matte powder-coated metal, soft controlled studio top light with a warm orange light streak across the background. All items proportional and naturally arranged, lots of compositional breathing room, no gold, no ornaments, no extra lettering.
```

### equipment-label

Путь: `assets/images/ams/equipment-label.webp` — 1024 × 1536 px.

```text
Use case: product-mockup. Brand: AMS / ART MEDIA SHOW, professional event technical production: sound, lighting and LED screens. Reference image 1 is the exact supplied brand logo, shown in black on white only for clarity. Preserve this original italic AMS lettering, the three equalizer columns, the long sweeping diagonal and the small ART MEDIA SHOW subtitle. Do not substitute a generic AMS font, A+M monogram or another logo. Integrate the logo naturally into the photographed surface with correct perspective, realistic print or embroidery texture and plausible scale. Palette: rich black, white, vivid orange #FF5500 and warm amber #FFAA33, with brushed silver hardware. Premium professional editorial photography, real materials, no plastic CGI shine, no extra brands, no watermark, no invented achievements, addresses or product specifications. Asset: vertical 2:3 tactile close-up backstage equipment branding photograph. A professional large black line-array loudspeaker module and a road rack case beside it, detailed perforated metal grille, honest worn black technical surfaces, silver fasteners and recessed handles. Show the exact white AMS reference logo as a clean durable vinyl sticker on a FLAT solid side panel of the speaker, not covering its perforated grille or controls. A separate restrained orange rectangular inventory label with the exact black reference logo is naturally adhered to a flat road-rack panel. Marking should look durable, elegant and practical, perfectly integrated perspective with surface texture. Orange stage beams in soft background haze, neutral light on labels for clear reading, sharply photographed precision close-up. No other manufacturer labels, no model numbers, no invented technical details, no floating graphic overlay.
```

### passes-stickers

Путь: `assets/images/ams/passes-stickers.webp` — 1536 × 1024 px.

```text
Use case: product-mockup. Brand: AMS / ART MEDIA SHOW, professional event technical production: sound, lighting and LED screens. Reference image 1 is the exact supplied brand logo, shown in black on white only for clarity. Preserve this original italic AMS lettering, the three equalizer columns, the long sweeping diagonal and the small ART MEDIA SHOW subtitle. Do not substitute a generic AMS font, A+M monogram or another logo. Integrate the logo naturally into the photographed surface with correct perspective, realistic print or embroidery texture and plausible scale. Palette: rich black, white, vivid orange #FF5500 and warm amber #FFAA33, with brushed silver hardware. Premium professional editorial photography, real materials, no plastic CGI shine, no extra brands, no watermark, no invented achievements, addresses or product specifications. Asset: horizontal 3:2 premium macro editorial photograph of event-crew identification and labeling on the lid of a black textured flight case with silver aluminium edging. A black portrait backstage pass on a black woven lanyard with a vivid orange stripe; exact WHITE AMS / ART MEDIA SHOW reference lockup large near the upper half, and the single word CREW in clear white geometric uppercase below. Beside it two loose accurately die-cut white logo stickers and a matte orange rectangular label carrying the exact black logo. An honest tactile composition with detailed textile weave, rounded pass edges, subtle laminate reflection, sticker paper liner and black phenolic case texture. Natural top light with a restrained orange edge, no names, dates, fake barcodes, sponsors or other brands. Professional believable print mockup, not a collage.
```

### backstage-system

Путь: `assets/images/ams/backstage-system.webp` — 1536 × 1024 px.

```text
Use case: product-mockup. Brand: AMS / ART MEDIA SHOW, professional event technical production: sound, lighting and LED screens. Reference image 1 is the exact supplied brand logo, shown in black on white only for clarity. Preserve this original italic AMS lettering, the three equalizer columns, the long sweeping diagonal and the small ART MEDIA SHOW subtitle. Do not substitute a generic AMS font, A+M monogram or another logo. Integrate the logo naturally into the photographed surface with correct perspective, realistic print or embroidery texture and plausible scale. Palette: rich black, white, vivid orange #FF5500 and warm amber #FFAA33, with brushed silver hardware. Premium professional editorial photography, real materials, no plastic CGI shine, no extra brands, no watermark, no invented achievements, addresses or product specifications. Asset: horizontal 3:2 wide documentary editorial view of a beautifully organized professional event backstage loading area at dusk. Two very large black road cases with silver ball corners and wheels, a black truss upright, coiled cables neatly secured, a small sound rack and a black upright fabric backstage banner. Apply the exact white reference AMS logo naturally to the case panel and large on the taut vertical black banner, both with believable ink and surface perspective. Minimal orange guide stripe on a case, warm orange stage glow and fine atmospheric haze behind, cool neutral soft fill, beautiful dark real materials. No people needed, no extra company marks, no slogans, no giant impossible machinery. Show a complete cohesive identity system at real scale with exquisite photography and convincing technical equipment.
```

## Проверка

Настольный экран 1348 px и мобильные рамки 390/320 px: первый экран, шапка, заголовки и абзацы помещаются без горизонтального переполнения. Проверены переходы по разделам, мобильное открытие и перелистывание мерча, две авторские работы, галерея техники, Escape, пауза движения и одиночный просмотр сайта без стрелок. Фильтры главной: сайт — 1 из 5, печать — 4 из 5; AMS присутствует в обоих. Локальные ссылки, уникальные ID, размеры WebP, файлы CSS, отсутствие растров в SVG и синтаксис JS проверены. Предпросмотр первого экрана: `docs/ams-case-preview.jpg`.
