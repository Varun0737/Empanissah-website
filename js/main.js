/* Shared JS for nav + animations */
// ─── Navigation ───
const nav = document.querySelector('.site-nav');
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.nav-mobile');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ─── Active nav link ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile-inner a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── Scroll reveal ───
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

// ─── Hero background pan ───
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('load', () => heroBg.classList.add('loaded'));
}

// ─── Menu tabs ───
const tabBtns = document.querySelectorAll('.menu-tab-btn');
const tabPanels = document.querySelectorAll('.menu-tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.tab;
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});

// ─── Gallery lightbox ───
const galleryItems = document.querySelectorAll('.gallery-lightbox-trigger');
if (galleryItems.length) {
  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = `
    <div id="lightbox-overlay"></div>
    <div id="lightbox-img-wrap">
      <img id="lightbox-img" src="" alt="Gallery image">
      <button id="lightbox-close" aria-label="Close">✕</button>
      <button id="lightbox-prev" aria-label="Previous">&#8249;</button>
      <button id="lightbox-next" aria-label="Next">&#8250;</button>
    </div>
  `;
  document.body.appendChild(lb);

  let currentIndex = 0;
  const imgs = Array.from(galleryItems);

  function openLightbox(i) {
    currentIndex = i;
    document.getElementById('lightbox-img').src = imgs[i].dataset.src || imgs[i].src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function nextImg() { openLightbox((currentIndex + 1) % imgs.length); }
  function prevImg() { openLightbox((currentIndex - 1 + imgs.length) % imgs.length); }

  imgs.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-next').addEventListener('click', nextImg);
  document.getElementById('lightbox-prev').addEventListener('click', prevImg);
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  });
}
