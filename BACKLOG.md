# Mobile & UX Optimization Backlog

Audit date: 2026-02-08
Site: https://tapfumamv.github.io/cisco-ai-summit/
Pages tested: index.html, speakers/sam-altman.html, speakers/mike-krieger.html, speakers/chuck-robbins.html
Method: CSS/HTML/JS static analysis (browser automation unavailable)

---

## Critical (blocks usability)

- [ ] **Banner close button too small for touch** — `.banner-close` is `padding: 4px 8px` with `font-size: 18px`, well under the 44×44px minimum touch target. On 375px screens it's hard to tap. — *All pages, all viewports* — **Fix:** Add `min-width: 44px; min-height: 44px; display: flex; align-items: center; justify-content: center;`

- [ ] **Banner text truncated / cramped at 375px** — `.site-banner` has `padding: 10px 40px` and no mobile override. The 40px side padding plus the close button eats into the tiny viewport, causing text to wrap badly or be obscured by the close button. `max-height: 60px; overflow: hidden` will clip wrapped text. — *All pages, 375px* — **Fix:** Add mobile rule: `.site-banner { padding: 10px 48px 10px 16px; max-height: none; }` (right padding reserves space for close button)

- [ ] **Content tabs sticky offset wrong on mobile** — `.content-tabs` is `sticky; top: 47px` but the top-bar height changes on mobile (padding goes from 14px to 12px). If the banner is showing, the tab bar will overlap or underlap. — *Speaker pages, all mobile viewports* — **Fix:** Recalculate `top` value for mobile; consider using a CSS custom property or JS-based offset. Also handle banner-present state.

- [ ] **Prev/next nav text overflow on mobile** — `.nav-prev, .nav-next` have `min-width: 160px` with no mobile override. On a 375px screen, 160px + 160px + center content = exceeds viewport, causing horizontal scroll. — *Speaker pages, 375px* — **Fix:** Add mobile rule: `.top-bar .nav-prev, .top-bar .nav-next { min-width: 0; flex: 1; }` and add `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` or reduce to icon-only nav.

## High (degrades experience)

- [ ] **Burger button too small for touch** — `.burger-btn` has `padding: 4px` making the tap target ~26×26px, under the 44×44px minimum. — *All pages, all viewports* — **Fix:** `padding: 10px;` or add `min-width: 44px; min-height: 44px;`

- [ ] **Theme toggle too small for touch** — `.theme-toggle` has `padding: 4px`, same issue as burger button. — *All pages, all viewports* — **Fix:** Same as burger button.

- [ ] **Menu close button too small for touch** — `.menu-close` has `padding: 4px`. — *All pages, all viewports* — **Fix:** Same as burger button.

- [ ] **Sidebar nav items too small for touch** — `.nav-list li` has `padding: 7px 0 7px 14px`, roughly 26px tall. The mobile pill override uses `padding: 6px 14px` which is ~30px. Both are under 44px minimum. — *Speaker pages (desktop sidebar visible on >768px); overview page pills on mobile* — **Fix:** Increase padding to at least `12px 16px` for mobile pills; for desktop sidebar items `padding: 12px 0 12px 14px`.

- [ ] **Overview sidebar theme pills don't show "All Speakers" clearly as active/default** — On mobile the sidebar collapses to horizontal pills. "All Speakers" and theme pills are in two separate `<ul>` elements with a hidden divider between them. The visual grouping may be confusing. — *Overview, ≤768px* — **Fix:** Consider merging into a single scrollable pill row, or adding a subtle label/gap.

- [ ] **Speaker card images may fail silently** — `onerror` fallback uses a YouTube thumbnail which has a very different aspect ratio (16:9) than the card's `3:4` container, causing distortion via `object-fit: cover` (crops to the center, may lose the speaker). — *Overview, all viewports* — **Fix:** Use a properly sized placeholder image or add a CSS background fallback with the speaker's name.

- [ ] **Content tabs (Narrative/Quick Take) tap targets border-line** — `.content-tab` has `padding: 14px 24px` (~44px tall, good) but on narrow screens two tabs plus padding may not fill the row evenly, causing lopsided layout. — *Speaker pages, 375px* — **Fix:** Add `flex: 1; text-align: center;` to `.content-tab` on mobile.

## Medium (polish)

- [ ] **Footer padding too wide on mobile** — `.footer` has `padding: 60px 40px` with no mobile override. 40px side padding on a 375px screen leaves only 295px for content. — *All pages, ≤768px* — **Fix:** Add `.footer { padding: 40px 24px; }` to the mobile media query.

- [ ] **Footer nav gap too wide on mobile** — `.footer-nav` has `gap: 40px` which may push items to wrap or be too spread on 375px. — *All pages, 375px* — **Fix:** Add mobile rule: `.footer .footer-nav { gap: 20px; flex-wrap: wrap; }`

- [ ] **Hero subtitle line length on tablet** — At 768px the hero text spans the full width. With `font-size: 15px` and no `max-width` on `.subtitle`, lines can be very long. — *Overview, 768px* — **Fix:** Add `max-width: 600px; margin-left: auto; margin-right: auto;` to `.subtitle`.

- [ ] **Top-bar letter-spacing eats space on mobile** — `letter-spacing: 3px` on 11px uppercase text in the top bar wastes horizontal space on small screens. — *All pages, 375px* — **Fix:** Reduce to `letter-spacing: 1px` on mobile.

- [ ] **Sort bar has no mobile rule** — `.sort-bar` uses `padding: 24px 40px` with no mobile override. The 40px padding is excessive at 375px. (Note: sort bar exists in CSS but doesn't appear in current index.html; may be unused or future.) — *Overview if used, ≤768px* — **Fix:** Add to mobile: `.sort-bar { padding: 16px 24px; }`

- [ ] **Menu panel width on small phones** — `.menu-panel` is `width: 300px; max-width: 85vw`. On 375px that's 318px, leaving only 57px of overlay to tap-to-close. Acceptable but tight. — *All pages, 375px* — **Fix:** Consider `max-width: 80vw` for slightly more overlay tap area.

- [ ] **Pull quote text size could be smaller on mobile** — `font-size: clamp(20px, 3vw, 26px)` — at 375px this resolves to 20px which is fine, but the italic Playfair Display at that size with `line-height: 1.5` can feel cramped. — *Speaker pages, 375px* — **Fix:** Consider `line-height: 1.6` for the pull quote at small sizes.

- [ ] **Insight card padding on mobile** — `.insight-card` has `padding: 24px 28px` with no mobile reduction. At 375px minus 24px×2 container padding, the card content area is quite narrow. — *Speaker pages, 375px* — **Fix:** Add mobile rule: `.insight-card { padding: 20px; }`

- [ ] **Narrative section left padding + border on mobile** — `.narrative-section` has `padding-left: 24px` and a `border-left: 3px`. Combined with `.content-wrap` padding of 24px on mobile, text starts 51px from the left edge (3+24+24), wasting space. — *Speaker pages, ≤768px* — **Fix:** Reduce to `padding-left: 16px` or `12px` on mobile.

- [ ] **No viewport meta for scale prevention** — The `<meta name="viewport">` uses `width=device-width, initial-scale=1.0` but doesn't include `viewport-fit=cover` for iPhone notch/Dynamic Island safe areas. — *All pages, iPhones with notch* — **Fix:** Add `viewport-fit=cover` and use `env(safe-area-inset-*)` padding on the top-bar and banner.

- [ ] **Scroll-margin-top may not account for banner** — `[data-section] { scroll-margin-top: 120px }` is a fixed value. When the banner is visible, the total sticky height increases, causing sections to scroll behind the top-bar + tabs. — *Speaker pages, all viewports* — **Fix:** Increase scroll-margin-top or dynamically calculate; alternatively, dismiss banner on nav click.

## Low (nice to have)

- [ ] **No active state / press feedback on cards** — `.speaker-card` has hover effects (`transform`, `box-shadow`) but no `:active` state for touch feedback. Cards feel "dead" on tap. — *Overview, all mobile* — **Fix:** Add `.speaker-card:active { transform: scale(0.98); }`

- [ ] **No focus-visible styles on interactive elements** — Burger, theme toggle, close buttons, tabs, sidebar items lack `:focus-visible` outlines. Keyboard/accessibility issue. — *All pages, all viewports* — **Fix:** Add `*:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`

- [ ] **Speaker grid single-column on all mobile widths** — At 768px (tablet portrait) the grid is forced to `1fr`. Two columns would work well at this width. — *Overview, 768px* — **Fix:** Change mobile breakpoint to `max-width: 480px` for single column; keep `repeat(2, 1fr)` for 481-768px.

- [ ] **Content-wrap padding mismatch** — `.content-wrap` on mobile uses `padding: 0 24px`, but `.speaker-grid` uses its own `padding: 0 24px 60px`. These are independent since overview uses `.overview-layout` not `.content-wrap`, but if used together they'd double-pad. — *Structural, no user-visible issue currently*

- [ ] **No prefers-reduced-motion support** — Animations (tab fade-in, card hover, menu slide) run regardless of user motion preferences. — *All pages, all viewports* — **Fix:** Add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

- [ ] **TL;DR list items are clickable but have no href or clear action** — `.tldr-opener li` has `cursor: pointer` but the click behavior (if any) is in page-specific JS. Without it, the pointer cursor is misleading. — *Speaker pages, all viewports* — **Fix:** Either make them scroll to corresponding sections or remove `cursor: pointer`.

- [ ] **Video embed thumbnail sizing on mobile** — `.video-thumb` uses `aspect-ratio: 16/9` which is fine, but with sidebar at `width: 100%` on mobile, the video thumb spans full width which may be larger than necessary. — *Speaker pages, ≤768px* — **Fix:** Consider `max-width: 400px` on mobile for the video link.

- [ ] **Theme toggle positioned absolute on overview** — When `.nav-next` doesn't exist (overview bar), JS sets `position: absolute; right: 40px`. On mobile this should be `right: 24px` to match the reduced top-bar padding. — *Overview, ≤768px* — **Fix:** JS should check viewport or CSS should override: `.overview-bar .theme-toggle { right: 24px; }` in the mobile block.
