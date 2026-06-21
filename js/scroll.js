/* ============================================================
   SCROLL.JS — Intersection Observer reveal animations
   Adds .visible to elements with class .reveal when they
   enter the viewport.
   ============================================================ */

/**
 * Called from main.js after sections are injected.
 * Observes all .reveal elements and toggles .visible.
 */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal so it doesn't toggle back
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px', // trigger slightly before edge
      threshold: 0.1,
    }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ── Smooth scroll for all anchor links ──
   Offsets scroll position by the navbar height so headings
   aren't hidden behind the sticky nav.                       */
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const navH   = document.getElementById('navbar')?.offsetHeight ?? 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
