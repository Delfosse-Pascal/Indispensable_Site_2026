/* ============================================
   Indispensable_Site_2026 — JS partagé
   Theme toggle, Lightbox, helpers
   ============================================ */

(function() {
  'use strict';

  // ---- THEME TOGGLE ----
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e) {}
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = next === 'dark' ? 'Mode clair' : 'Mode sombre';
  }
  window.toggleTheme = toggleTheme;

  initTheme();

  // ---- LIGHTBOX (images, vidéos) ----
  function createLightbox() {
    if (document.getElementById('lightbox')) return;
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lb-close" aria-label="Fermer">X</button>
      <img id="lb-img" alt="">
      <div class="lb-info" id="lb-info"></div>
    `;
    document.body.appendChild(lb);

    lb.addEventListener('click', e => {
      if (e.target === lb || e.target.classList.contains('lb-close')) closeLightbox();
    });
  }

  function openLightbox(src, title, size, dims) {
    createLightbox();
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    const info = document.getElementById('lb-info');
    img.src = src;
    img.alt = title || '';
    let txt = title || '';
    if (size) txt += ' | ' + size;
    if (dims) txt += ' | ' + dims;
    info.textContent = txt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---- Auto-bind galerie ----
  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item || !item.dataset.src) return;
    openLightbox(
      item.dataset.src,
      item.dataset.title,
      item.dataset.size,
      item.dataset.dims
    );
  });

  // ---- Lecture des dimensions image au chargement ----
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      const finalize = () => {
        const item = img.closest('.gallery-item');
        if (item && img.naturalWidth) {
          const dims = img.naturalWidth + ' x ' + img.naturalHeight + ' px';
          item.dataset.dims = dims;
          const dimsEl = item.querySelector('.dims');
          if (dimsEl) dimsEl.textContent = dims;
        }
      };
      if (img.complete) finalize();
      else img.addEventListener('load', finalize);
    });

    // animation d'entrée
    document.querySelectorAll('.gallery-item, .tile, .context').forEach(el => {
      el.classList.add('fade-in');
    });
  });

  // ---- Audio launcher (panneau accueil) ----
  window.toggleAudioPanel = function() {
    const panel = document.getElementById('audio-panel');
    if (panel) panel.classList.toggle('open');
  };
})();
