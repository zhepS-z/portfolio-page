/* ============================================================
   NAVBAR.JS — Sticky navbar, active-section highlight,
                hamburger toggle
   ============================================================ */

/**
 * Called from main.js after sections are loaded.
 * Sets up:
 *  1. Scroll → add .scrolled class to navbar (background appears)
 *  2. Active nav-link tracking via IntersectionObserver
 *  3. Hamburger menu toggle (mobile)
 *  4. Close mobile menu when a link is clicked
 */
function initNavHighlight() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const allLinks   = document.querySelectorAll('.nav-link');

  if (!navbar) return;

  /* ── 1. Scrolled class for background appearance ── */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run immediately in case page loads mid-scroll

  /* ── 2. Active section tracking ── */
  // Collect all sections that nav links point to
  const sections = Array.from(allLinks)
    .map(link => {
      const id = link.getAttribute('data-section');
      return document.getElementById(id);
    })
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;

        allLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === activeId);
        });
      });
    },
    {
      root: null,
      // Trigger when section is 40% visible (centred view)
      rootMargin: `-${getNavHeight()}px 0px -55% 0px`,
      threshold: 0,
    }
  );

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ── 3. Hamburger toggle ── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    /* ── 4. Close on link click (mobile) ── */
    allLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/** Return navbar height (pixels) for use in IntersectionObserver rootMargin */
function getNavHeight() {
  const nav = document.getElementById('navbar');
  return nav ? nav.offsetHeight : 72;
}
