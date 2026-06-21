/* ============================================================
   MAIN.JS — Section loader & orchestrator
   Uses fetch() to dynamically load each section HTML file.
   ============================================================ */

/**
 * Map of container IDs → section HTML file paths.
 * Sections are loaded in the order defined here.
 */
const SECTIONS = [
  { id: 'section-hero',      file: 'sections/hero.html' },
  { id: 'section-about',     file: 'sections/about.html' },
  { id: 'section-skills',    file: 'sections/skills.html' },
  { id: 'section-projects',  file: 'sections/projects.html' },
  { id: 'section-case-study',file: 'sections/case-study.html' },
  { id: 'section-education', file: 'sections/education.html' },
  { id: 'section-contact',   file: 'sections/contact.html' },
];

/**
 * Fetch a single section and inject it into the DOM.
 * @param {string} containerId  - ID of the wrapper div in index.html
 * @param {string} filePath     - Relative path to the .html partial
 */
async function loadSection(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error(`Failed to load section "${filePath}":`, err);
    container.innerHTML = `<div class="section-loading">⚠ Could not load section.</div>`;
  }
}

/**
 * Load all sections sequentially, then initialise interactive modules.
 */
async function init() {
  // Show loading placeholders while sections are fetched
  SECTIONS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `<div class="section-loading">Loading…</div>`;
  });

  // Load sections in parallel for speed
  await Promise.all(SECTIONS.map(({ id, file }) => loadSection(id, file)));

  /* After all sections are injected, initialise interactivity */
  initTypewriter();     // hero typewriter effect
  initScrollReveal();   // intersection-observer reveal animations (scroll.js)
  initNavHighlight();   // active link tracking (navbar.js)
  initThemeSwitcher();  // light / dark theme toggle
  initContactForm();    // contact form handler
  initScreenshotLightbox(); // screenshot preview gallery
}

/* ── Typewriter effect for hero role text ── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'You can call me Tang.',
    'Full-Stack Web-Developer',
    'Computer Engineering Student',
    'Rajamangala University of Technology Srivijaya',
  ];

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  const PAUSE  = 1800;   // ms to hold full word
  const SPEED  = 70;     // ms per character
  const ERASE  = 40;     // ms per erase character

  function tick() {
    const current = roles[roleIdx];
    el.textContent = current.slice(0, charIdx);

    if (!deleting && charIdx === current.length) {
      // Hold before erasing
      setTimeout(() => { deleting = true; tick(); }, PAUSE);
      return;
    }

    if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(tick, 300);
      return;
    }

    charIdx += deleting ? -1 : 1;
    setTimeout(tick, deleting ? ERASE : SPEED);
  }

  tick();
}

/* ── Simple contact form feedback ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent  = 'Sent! ✓';
    btn.disabled     = true;
    btn.style.background = 'var(--accent)';

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled    = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

function initScreenshotLightbox() {
  const gallery = Array.from(document.querySelectorAll('.case-screenshots .screenshot-placeholder'));
  if (!gallery.length) return;

  const overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) return;

  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }

  const lightboxImage = overlay.querySelector('.lightbox-image');
  const caption = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  let currentIndex = 0;

  function updateLightbox(index) {
    const item = gallery[index];
    if (!item || !lightboxImage) return;

    currentIndex = index;
    overlay?.classList.add('active');
    document.body.classList.add('lightbox-open');
    overlay?.setAttribute('aria-hidden', 'false');
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt || `Screenshot ${index + 1}`;
    if (caption) {
      caption.textContent = item.closest('.screenshot-card')?.querySelector('.screenshot-cap')?.textContent || item.alt || `Screenshot ${index + 1}`;
    }
  }

  function closeLightbox() {
    overlay?.classList.remove('active');
    document.body.classList.remove('lightbox-open');
    overlay?.setAttribute('aria-hidden', 'true');
  }

  function showPrev() {
    updateLightbox((currentIndex - 1 + gallery.length) % gallery.length);
  }

  function showNext() {
    updateLightbox((currentIndex + 1) % gallery.length);
  }

  gallery.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => updateLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!overlay?.classList.contains('active')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPrev();
    if (event.key === 'ArrowRight') showNext();
  });
  prevBtn?.addEventListener('click', showPrev);
  nextBtn?.addEventListener('click', showNext);
}

/* ── Theme switcher */
function setThemeIcon(theme) {
  const toggle = document.getElementById('themeToggle');
  const icon = toggle?.querySelector('i');
  if (!icon) return;

  icon.classList.toggle('fa-moon', theme === 'dark');
  icon.classList.toggle('fa-sun', theme === 'light');
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('preferred-theme', theme);
  setThemeIcon(theme);
}

function initThemeSwitcher() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const currentTheme = document.documentElement.dataset.theme || 'dark';
  document.documentElement.dataset.theme = currentTheme;
  setThemeIcon(currentTheme);

  toggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

/* ── Scroll-to-top button ── */
(function initScrollTop() {
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

/* ── Bootstrap everything on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', init);
