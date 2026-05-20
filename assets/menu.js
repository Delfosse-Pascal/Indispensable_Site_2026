/* ============================================
   Indispensable_Site_2026 - Injection header
   ============================================ */

(function() {
  'use strict';

  function detectRoot() {
    const path = window.location.pathname.replace(/\\/g, '/');
    let prefix = '';
    if (path.includes('/Musique/') || path.includes('/Programmes/')) {
      prefix = '../';
    }
    return prefix;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header || header.hasAttribute('data-no-inject')) return;
    const prefix = detectRoot();

    const row = document.createElement('div');
    row.className = 'actions-row';
    row.innerHTML = `
      <a class="btn btn-home" href="${prefix}index.html">Retour a l'accueil</a>
      <button class="btn-multi" type="button" onclick="toggleTheme()" id="btn-theme">
        <span class="icon">&#9728;</span><span>Mode sombre</span>
      </button>
      <button class="btn-multi" type="button" onclick="openSearch()">
        <span class="icon">&#128270;</span><span>Recherche</span>
      </button>
      <button class="btn-multi" type="button" onclick="openMusicWindow()">
        <span class="icon">&#9835;</span><span>Musiques</span>
      </button>
    `;
    header.appendChild(row);

    const saved = (function(){ try { return localStorage.getItem('theme'); } catch(e){ return null; } })();
    if (saved === 'dark') {
      const btn = row.querySelector('#btn-theme span:last-child');
      if (btn) btn.textContent = 'Mode clair';
    }
  });
})();
