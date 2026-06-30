/* ==========================================================================
   FINAL WAY PRODUCTION — GSAP Animation Controller
   This file assumes the GSAP + ScrollTrigger CDN scripts are loaded on the
   page BEFORE this file (see the <script> tags at the bottom of each HTML
   page). It defines every scroll-triggered / load animation for the site.
   ========================================================================== */

(function () {
  // Guard: if GSAP didn't load (e.g. offline preview without internet),
  // fall back silently — main.js's IntersectionObserver reveal still works.
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded — falling back to CSS-only reveals in main.js');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // respect user preference — skip GSAP entirely

  /* ---------- Hero entrance (extra polish layered on top of CSS riseIn) ---------- */
  if (document.querySelector('.hero')) {
    gsap.from('.hero-title', {
      y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1
    });
  }

  /* ---------- Section titles: animate in on scroll ---------- */
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ---------- Service cards: staggered rise ---------- */
  if (document.querySelector('.service-grid')) {
    gsap.from('.service-card', {
      y: 36,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.service-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ---------- Work / portfolio frames: staggered scale-in ---------- */
  if (document.querySelector('.frame-grid')) {
    gsap.from('.frame', {
      y: 28,
      opacity: 0,
      scale: 0.96,
      duration: 0.6,
      stagger: { amount: 0.5, grid: 'auto', from: 'start' },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.frame-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ---------- Process steps: slide in from left, one by one ---------- */
  gsap.utils.toArray('.process-item').forEach((item, i) => {
    gsap.from(item, {
      x: -24,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ---------- Testimonial cards ---------- */
  if (document.querySelector('.testi-grid')) {
    gsap.from('.testi-card', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.testi-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ---------- About page: timeline items + skill bars ---------- */
  gsap.utils.toArray('.timeline-item').forEach((item) => {
    gsap.from(item, {
      x: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  gsap.utils.toArray('.skill-fill').forEach((bar) => {
    const target = bar.style.getPropertyValue('--fill-target') || bar.dataset.fill || '0%';
    gsap.fromTo(bar,
      { width: '0%' },
      {
        width: target,
        duration: 1.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });

  /* ---------- Contact page: form fields cascade in ---------- */
  if (document.querySelector('.contact-form')) {
    gsap.from('.contact-form .field, .contact-form .submit-btn', {
      y: 18,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ---------- CTA band pulse-in ---------- */
  if (document.querySelector('.cta-band')) {
    gsap.from('.cta-band h2, .cta-band p, .cta-band .btn', {
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cta-band',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  /* ---------- Parallax drift on hero road SVG (subtle) ---------- */
  if (document.querySelector('.road-svg')) {
    gsap.to('.road-svg', {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

})();
