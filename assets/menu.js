/* ============================================
   Indispensable_Site_2026 — Injection header
   ============================================ */

(function() {
  'use strict';

  function detectRoot() {
    // Détection profondeur pour résoudre le chemin vers la racine
    const path = window.location.pathname.replace(/\\/g, '/');
    const parts = path.split('/').filter(p => p && !p.endsWith('.html'));
    // Si on est dans un sous-dossier, ajouter ../ pour chaque niveau
    let prefix = '';
    // Détecte sous-dossier en regardant l'URL relative
    if (path.includes('/Musique/') || path.includes('/Web_Programmes/') || path.includes('/Programmes_Crack/')) {
      prefix = '../';
    }
    return prefix;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header || header.hasAttribute('data-no-inject')) return;
    const prefix = detectRoot();

    // Conserve enfants existants, ajoute toolbar standard
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    toolbar.innerHTML = `
      <a class="btn btn-home" href="${prefix}index.html">Retour à l'accueil</a>
      <button class="btn theme-toggle" type="button" onclick="toggleTheme()">Mode sombre</button>
    `;
    header.appendChild(toolbar);

    // Met le label du bouton à jour
    const saved = (function(){ try { return localStorage.getItem('theme'); } catch(e){ return null; } })();
    if (saved === 'dark') {
      const btn = toolbar.querySelector('.theme-toggle');
      if (btn) btn.textContent = 'Mode clair';
    }
  });
})();
