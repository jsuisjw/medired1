/* ===================================================
   MediRed — JavaScript
   =================================================== */
'use strict';

/* ── Header scroll ── */
const header = document.getElementById('header');
if (header) {
  const hero = document.querySelector('.hero');
  if (hero) {
    new IntersectionObserver(
      ([e]) => header.classList.toggle('header--scrolled', !e.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' }
    ).observe(hero);
  }
}

/* ── Menú móvil ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

function closeMenu() {
  hamburger?.classList.remove('is-open');
  mobileNav?.classList.remove('is-open');
  mobileNav?.setAttribute('aria-hidden', 'true');
  hamburger?.setAttribute('aria-expanded', 'false');
}

hamburger?.addEventListener('click', () => {
  const open = hamburger.classList.toggle('is-open');
  mobileNav?.classList.toggle('is-open', open);
  mobileNav?.setAttribute('aria-hidden', String(!open));
  hamburger.setAttribute('aria-expanded', String(open));
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
    }),
    { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
  );
  revealEls.forEach(el => revealObserver.observe(el));
}

/* ── Timeline dots iluminados al llegar ── */
const timelineDots = document.querySelectorAll('.timeline-dot:not(.timeline-dot--active)');
if (timelineDots.length) {
  const dotObserver = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.style.background = 'rgba(26,86,219,0.6)';
    }),
    { rootMargin: '0px 0px -80px 0px', threshold: 0.5 }
  );
  timelineDots.forEach(d => dotObserver.observe(d));
}

/* ── Nav activo al scrollear ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a');
const activeStyle = document.createElement('style');
activeStyle.textContent = '.nav a.active { color: var(--color-primary) !important; }';
document.head.appendChild(activeStyle);

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -35% 0px' }).observe(document.documentElement);

sections.forEach(s => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`));
    }
  }, { rootMargin: '-35% 0px -35% 0px' }).observe(s);
});

/* ── Formulario ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = '#059669';
      form.reset();
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Enviar mensaje';
        btn.style.background = '';
      }, 4000);
    }, 1000);
  });
}

/* ── Smooth scroll anchors ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Micro-interacción en cards ── */
document.querySelectorAll('.prob-card, .pillar, .audiencia-card, .flujo-actor').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.willChange = 'transform');
  card.addEventListener('mouseleave', () => card.style.willChange = 'auto');
});
