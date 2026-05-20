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
    const lbl = document.querySelector('#btn-theme span:last-child');
    if (lbl) lbl.textContent = next === 'dark' ? 'Mode clair' : 'Mode sombre';
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

  // ---- Global search overlay ----
  let catalog = null;
  function ensureSearchOverlay() {
    let ov = document.getElementById('global-search');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.id = 'global-search';
    ov.className = 'global-search';
    ov.innerHTML = `
      <button class="close-btn" aria-label="Fermer">X</button>
      <div class="search-wrap">
        <input type="search" id="gs-input" placeholder="Rechercher un programme, une archive..." autocomplete="off">
      </div>
      <div class="results" id="gs-results"></div>
    `;
    document.body.appendChild(ov);
    ov.querySelector('.close-btn').addEventListener('click', closeSearch);
    ov.addEventListener('click', e => { if (e.target === ov) closeSearch(); });
    const input = ov.querySelector('#gs-input');
    input.addEventListener('input', () => runSearch(input.value));
    return ov;
  }

  function getCatalogPath() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/Programmes/')) return 'catalog.json';
    if (path.includes('/Musique/')) return '../Programmes/catalog.json';
    return 'Programmes/catalog.json';
  }
  function getProgrammesPrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/Programmes/')) return '';
    if (path.includes('/Musique/')) return '../Programmes/';
    return 'Programmes/';
  }

  function loadCatalog() {
    if (catalog) return Promise.resolve(catalog);
    return fetch(getCatalogPath())
      .then(r => r.ok ? r.json() : [])
      .then(data => { catalog = data; return data; })
      .catch(() => { catalog = []; return []; });
  }

  function runSearch(q) {
    const res = document.getElementById('gs-results');
    if (!res) return;
    res.innerHTML = '';
    q = (q || '').trim().toLowerCase();
    if (!q) { res.innerHTML = '<p class="res-empty">Tapez pour rechercher dans le catalogue</p>'; return; }
    if (!catalog) { res.innerHTML = '<p class="res-empty">Chargement...</p>'; return; }
    const hits = catalog.filter(c => (c.title || '').toLowerCase().includes(q)).slice(0, 100);
    if (hits.length === 0) { res.innerHTML = '<p class="res-empty">Aucun resultat</p>'; return; }
    const prefix = getProgrammesPrefix();
    hits.forEach(h => {
      const a = document.createElement('a');
      a.className = 'res';
      a.target = '_blank';
      a.rel = 'noopener';
      a.href = prefix + (h.archive || h.image || '');
      const imgHtml = h.image ? `<img src="${prefix}${encodeURIComponent(h.image)}" alt="">` : '';
      a.innerHTML = `${imgHtml}<strong>${h.title}</strong>`;
      res.appendChild(a);
    });
  }

  window.openSearch = function() {
    const ov = ensureSearchOverlay();
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const input = document.getElementById('gs-input');
      if (input) input.focus();
    }, 50);
    loadCatalog().then(() => runSearch(document.getElementById('gs-input').value));
  };

  window.closeSearch = function closeSearch() {
    const ov = document.getElementById('global-search');
    if (ov) {
      ov.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeSearch();
    }
  });
})();
