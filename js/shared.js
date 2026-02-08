// ── Scroll to top on page load (prevent scroll restoration) ──
if (!window.location.hash) {
  window.scrollTo(0, 0);
}
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// ── Dismissable Banner ──
(function() {
  if (localStorage.getItem('banner-dismissed') === '1') return;
  const banner = document.createElement('div');
  banner.className = 'site-banner';
  banner.innerHTML = 'An independent companion guide to the <a href="https://www.youtube.com/live/YO2PVbtpb_A" target="_blank">Cisco AI Summit 2026 livestream</a> · AI-assisted analysis  -  not affiliated with Cisco<button class="banner-close" aria-label="Dismiss">×</button>';
  document.body.appendChild(banner);
  banner.querySelector('.banner-close').addEventListener('click', () => {
    banner.style.maxHeight = '0';
    banner.style.padding = '0 40px';
    banner.style.opacity = '0';
    setTimeout(() => { banner.remove(); window.dispatchEvent(new Event('banner-change')); }, 300);
    localStorage.setItem('banner-dismissed', '1');
  });
  // Signal that banner exists
  requestAnimationFrame(() => window.dispatchEvent(new Event('banner-change')));
})();

// ── Theme Toggle & Burger Menu (shared across all pages) ──
(function() {
  const speakers = [
    { name:"Chuck Robbins", role:"CEO, Cisco", slug:"chuck-robbins" },
    { name:"Jeetu Patel", role:"EVP, Cisco", slug:"g2-patel" },
    { name:"Sam Altman", role:"CEO, OpenAI", slug:"sam-altman" },
    { name:"Lip-Bu Tan", role:"CEO, Intel", slug:"lip-bu-tan" },
    { name:"Dylan Field", role:"CEO & Co-Founder, Figma", slug:"dylan-field" },
    { name:"Aaron Levie", role:"CEO & Co-Founder, Box", slug:"aaron-levie" },
    { name:"Kevin Scott", role:"CTO, Microsoft", slug:"kevin-scott" },
    { name:"Tareq Amin", role:"CEO, HUMAIN", slug:"tk-humane" },
    { name:"Matt Garman", role:"CEO, Amazon Web Services", slug:"matt-garman" },
    { name:"Neuberger & McGurk", role:"Geopolitics Panel", slug:"anne-neuberger" },
    { name:"Marc Andreessen", role:"Co-Founder & Managing Partner, a16z", slug:"marc-andreessen" },
    { name:"Amin Vahdat", role:"Chief Technologist, Google", slug:"amin-vahdat" },
    { name:"Mike Krieger", role:"CPO, Anthropic", slug:"mike-krieger" },
    { name:"Kevin Weil", role:"VP Science, OpenAI", slug:"kevin-weil" },
    { name:"Fran Katsoudas", role:"EVP & Chief People Officer, Cisco", slug:"fran-katsoudas" }
  ];

  // Detect depth
  const isRoot = !location.pathname.match(/\/speakers\//);
  const prefix = isRoot ? 'speakers/' : '';
  const indexHref = isRoot ? 'index.html' : '../index.html';

  // Detect current speaker
  const currentSlug = document.body.getAttribute('data-current-speaker') || '';

  // ── Theme ──
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  // ── Inject burger button as first child of top-bar (far left) ──
  const topBar = document.querySelector('.top-bar');
  if (topBar) {
    const burger = document.createElement('button');
    burger.className = 'burger-btn';
    burger.setAttribute('aria-label', 'Open speaker menu');
    burger.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect y="2" width="18" height="2" rx="1" fill="currentColor"/><rect y="8" width="18" height="2" rx="1" fill="currentColor"/><rect y="14" width="18" height="2" rx="1" fill="currentColor"/></svg>';
    topBar.insertBefore(burger, topBar.firstChild);

    // Wrap nav-prev, nav-center, nav-next in a centered container
    const navWrap = document.createElement('div');
    navWrap.className = 'nav-wrap';
    const navPrev = topBar.querySelector('.nav-prev');
    const navCtr = topBar.querySelector('.nav-center');
    const navNext = topBar.querySelector('.nav-next');
    if (navPrev) navWrap.appendChild(navPrev);
    if (navCtr) navWrap.appendChild(navCtr);
    if (navNext) navWrap.appendChild(navNext);
    // Insert after burger, before theme toggle
    burger.after(navWrap);
  }

  // ── Add home icon to nav-center on speaker pages ──
  const navCenter = document.querySelector('.top-bar .nav-center');
  if (navCenter && !isRoot) {
    const homeLink = navCenter.querySelector('a');
    if (homeLink) {
      homeLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:6px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' + homeLink.textContent;
    }
  }

  // ── Inject theme toggle into .nav-next or top-bar ──
  const sunSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moonSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle theme');
  themeBtn.innerHTML = savedTheme === 'light' ? moonSVG : sunSVG;

  // Place it as last child of top-bar (far right)
  if (topBar) {
    topBar.appendChild(themeBtn);
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeBtn.innerHTML = sunSVG;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeBtn.innerHTML = moonSVG;
    }
  });

  // ── Burger Menu Panel ──
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';

  const panel = document.createElement('div');
  panel.className = 'menu-panel';
  panel.innerHTML = `
    <div class="menu-header">
      <span class="menu-title">All Speakers</span>
      <button class="menu-close" aria-label="Close menu">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
      </button>
    </div>
    <nav class="menu-list">
      <a href="${indexHref}" class="menu-item menu-item-overview${isRoot ? ' active' : ''}">
        <span class="menu-item-name">← Overview</span>
      </a>
      ${speakers.map(s => `<a href="${prefix}${s.slug}.html" class="menu-item${s.slug === currentSlug ? ' active' : ''}">
        <span class="menu-item-name">${s.name}</span>
        <span class="menu-item-role">${s.role}</span>
      </a>`).join('')}
    </nav>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  function openMenu() { overlay.classList.add('open'); panel.classList.add('open'); }
  function closeMenu() { overlay.classList.remove('open'); panel.classList.remove('open'); }

  const burgerBtn = document.querySelector('.burger-btn');
  if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  panel.querySelector('.menu-close').addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

// ── Dynamic sticky offset for top bar, content tabs & filter pills ──
(function() {
  const topBar = document.querySelector('.top-bar');
  if (!topBar) return;
  const tabs = document.querySelector('.content-tabs');
  const filters = document.querySelector('.mobile-filter-bar');

  function updateOffsets() {
    // Banner is now at bottom — no longer affects top offsets
    topBar.style.top = '0';
    document.body.style.paddingTop = topBar.offsetHeight + 'px';
    const below = topBar.offsetHeight + 'px';
    if (tabs) tabs.style.top = below;
    if (filters) filters.style.top = below;
    var sidebar = document.querySelector('.sidebar-inner');
    if (sidebar) sidebar.style.top = (topBar.offsetHeight + 16) + 'px';
    var overviewSidebar = document.querySelector('.overview-sidebar-inner');
    if (overviewSidebar) overviewSidebar.style.top = (topBar.offsetHeight + 16) + 'px';
  }

  updateOffsets();
  window.addEventListener('resize', updateOffsets);
  window.addEventListener('banner-change', () => {
    // Small delay to let DOM update
    setTimeout(updateOffsets, 50);
    setTimeout(updateOffsets, 350);
  });
})();

// ── Swipe between tabs on mobile ──
(function() {
  var startX, startY, startTime;
  var mainContent = document.querySelector('.main-content');
  if (!mainContent) return;
  
  mainContent.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
  }, { passive: true });
  
  mainContent.addEventListener('touchend', function(e) {
    if (!startX) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    var dt = Date.now() - startTime;
    startX = null;
    
    // Must be horizontal swipe: dx > 50px, more horizontal than vertical, under 300ms
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx) || dt > 300) return;
    
    var tabs = Array.from(document.querySelectorAll('.content-tab'));
    if (tabs.length < 2) return;
    var activeIdx = tabs.findIndex(function(t) { return t.classList.contains('active'); });
    
    var targetIdx = -1;
    if (dx < 0 && activeIdx < tabs.length - 1) {
      targetIdx = activeIdx + 1;
    } else if (dx > 0 && activeIdx > 0) {
      targetIdx = activeIdx - 1;
    }
    if (targetIdx < 0) return;

    // Add slide direction class before clicking
    var direction = targetIdx > activeIdx ? 'slide-in-right' : 'slide-in-left';
    tabs[targetIdx].click();
    var activeContent = document.querySelector('.tab-content.active');
    if (activeContent) {
      activeContent.classList.add(direction);
      activeContent.addEventListener('animationend', function() {
        activeContent.classList.remove('slide-in-left', 'slide-in-right');
      }, { once: true });
    }
  }, { passive: true });
})();
