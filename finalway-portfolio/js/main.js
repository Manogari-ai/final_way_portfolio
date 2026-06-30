// ==========================================================================
// FINAL WAY PRODUCTION — Core site interactivity
// (Nav, filters, lightbox, FAQ accordion, contact form, fallback reveals)
// GSAP-specific scroll animation is handled separately in js/gsap.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('page-loaded');

  /* ---------- Nav scroll state ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  /* ---------- Mark active nav link based on current page ---------- */
  const here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Work filter (portfolio.html and index preview) ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const frames = document.querySelectorAll('.frame');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      frames.forEach(f => {
        const show = cat === 'all' || f.dataset.category === cat;
        f.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector('.lightbox');
  const lbTitle = document.querySelector('.lb-meta h3');
  const lbMeta = document.querySelector('.lb-meta p');
  const lbFrameText = document.querySelector('.lb-frame');

  function openLightbox(frame) {
    if (!lightbox) return;
    const title = frame.dataset.title || 'Untitled frame';
    const exif = frame.dataset.exif || '';
    if (lbTitle) lbTitle.textContent = title;
    if (lbMeta) lbMeta.textContent = exif;
    if (lbFrameText) lbFrameText.textContent = 'Drop your full-resolution image or video embed here — ' + title;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  frames.forEach(frame => {
    frame.addEventListener('click', () => openLightbox(frame));
    frame.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(frame);
    });
  });
  document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- FAQ accordion (contact page) ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open');
      a.style.maxHeight = isOpen ? null : a.scrollHeight + 'px';
    });
  });

  /* ---------- Contact form (mailto fallback — see README for live options) ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name')?.value.trim() || '';
      const email = form.querySelector('#email')?.value.trim() || '';
      const type = form.querySelector('#type')?.value || '';
      const message = form.querySelector('#message')?.value.trim() || '';

      const subject = encodeURIComponent(`New inquiry — ${type}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`);

      // REPLACE this address with your real email
      window.location.href = `mailto:Finalwayproduction@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Fallback reveal-on-scroll (works even without GSAP) ---------- */
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-group, .frame, .service-card, .process-item, .testi-card, .timeline-item'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

});
