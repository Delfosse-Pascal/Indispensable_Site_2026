# Indispensable_Site_2026

**Site web local statique** centralisant musiques, programmes et utilitaires.
Tout est navigable hors-ligne dans un navigateur, sans serveur ni dépendance bloquante.

---

## Table des matières

- [Présentation](#présentation)
- [Structure du dépôt](#structure-du-dépôt)
- [Fonctionnalités du site](#fonctionnalités-du-site)
- [Règles de versionnage](#règles-de-versionnage)
- [Installation locale](#installation-locale)
- [Lancement du site](#lancement-du-site)
- [Régénération des pages](#régénération-des-pages)
- [Personnalisation](#personnalisation)
- [Workflow Git](#workflow-git)
- [Licence](#licence)
- [Contact](#contact)

---

## Présentation

Ce dépôt rassemble les ressources nécessaires au projet **Indispensable 2026**.
Le contenu est organisé en **deux sections principales** accessibles depuis
une page d'accueil unique (`index.html`) au design militaire / camouflage :

- **Musique** — pistes audio en `.mp3` avec lecteur intégré et téléchargement.
- **Programmes** — catalogue paginé de logiciels (utilitaires, scripts web,
  activateurs) avec aperçus visuels et archives téléchargeables.

Les contenus volumineux (images, vidéos, audio, archives, PDF, ebooks,
exécutables) **ne sont pas versionnés** dans Git pour garder le dépôt léger.
Ils restent disponibles localement dans leur dossier respectif.

---

## Structure du dépôt

Profondeur maximale : **1 niveau de sous-dossiers**. Toute imbrication
plus profonde est exclue du versionnage.

```
Indispensable_Site_2026/
│
├── index.html              # Page d'accueil principale (entrée du site)
├── README.md               # Ce fichier (documentation du projet)
├── .gitignore              # Règles d'exclusion Git
│
├── assets/                 # Ressources partagées entre toutes les pages
│   ├── style.css           # Thème camouflage, mode clair/sombre
│   ├── script.js           # Lightbox, recherche, lecteur, dimensions
│   ├── menu.js             # Injection header + boutons multicolores
│   └── build_crack.ps1     # Script de régénération des pages Programmes
│
├── Musique/                # Section audio (contenu non versionné)
│   └── index.html          # Lecteur de pistes + téléchargement
│
└── Programmes/             # Section logiciels (médias non versionnés)
    ├── index.html          # Page 1 du catalogue (60 cartes)
    ├── page-02.html        # Page 2
    ├── ...                 # ...
    ├── page-13.html        # Dernière page
    ├── catalog.json        # Index de recherche (JSON brut)
    └── catalog.js          # Index de recherche (variable JS, compat. file://)
```

### Détail des sous-dossiers

| Dossier        | Versionné    | Description                                              |
|----------------|--------------|----------------------------------------------------------|
| `assets/`      | Oui          | CSS / JS partagés + script de build                      |
| `Musique/`     | HTML seul    | Pistes `.mp3` non versionnées, page HTML conservée       |
| `Programmes/`  | HTML + JSON  | Archives et images non versionnées, pages HTML + catalogue versionnés |

---

## Fonctionnalités du site

### Page d'accueil (`index.html`)

- **Statistiques** du catalogue (nombre de sections, programmes, pistes).
- **Tuiles de navigation** vers Musique / Programmes / Documentation,
  avec formes variées (cercle, rectangle arrondi, parallélogramme).
- **Liens directs** vers les 13 pages du catalogue Programmes.
- **3 boutons rectangulaires multicolores** sur une ligne dans le header :
  - *Mode sombre* — bascule thème clair / sombre (persistant via localStorage).
  - *Recherche* — ouvre l'overlay de recherche globale.
  - *Musiques* — ouvre la fenêtre dédiée à la musique (popup persistant).
- **Menu social** centré au-dessus (Pinterest, Flickr, Tumblr, X, YouTube).
- **Animations** : `fade-in`, `float`, `pulse`, `rainbowShift`, motif camouflage défilant.

### Section Musique (`Musique/index.html`)

- **7 cartes audio** avec lecteur HTML5 (pas de lecture automatique).
- **Forme d'onde animée** sur chaque carte.
- **Bouton de téléchargement** sous chaque piste.
- Instructions de sauvegarde (clic droit → "Enregistrer la musique sous...").
- **Persistance audio** : la fenêtre Musique est un popup nommé
  (`IndispensableMusique`, 520×760 px). Tout clic suivant sur le bouton
  *Musiques* depuis n'importe quelle autre page :
  1. Récupère la référence au popup via `window.open('', 'IndispensableMusique')`.
  2. Détecte qu'il est déjà chargé (URL non vide).
  3. Appelle uniquement `.focus()` sans recharger l'URL.
  
  Résultat : la piste audio en cours **continue de jouer** sans interruption
  même si vous naviguez entre l'accueil et les pages Programmes.

### Section Programmes (`Programmes/index.html` + `page-02.html` à `page-13.html`)

- **772 entrées** réparties en 13 pages de 60 cartes (sauf la dernière).
- Chaque carte affiche **titre + image + taille + dimensions + bouton de téléchargement**.
- **Galerie cliquable** : clic sur l'image → affichage agrandi.
- **Touche `Échap`** pour fermer l'affichage agrandi.
- **Barre de recherche locale** sur chaque page (filtrage instantané).
- **Pagination** intelligente (premier, dernier, courant ±3).
- **Mode d'emploi** intégré (sauvegarde, installation, curseurs Windows).

### Recherche globale

- **Overlay plein écran** déclenché par le bouton *Recherche* (header).
- **Filtrage instantané** sur le titre des entrées (`catalog.js`, 772 indexées).
- Résultats avec miniature et lien direct vers l'archive ou l'image.
- Maximum 100 résultats affichés (pour préserver les performances).
- **Compatible `file://`** : le catalogue est chargé par **injection d'un
  `<script>` dynamique** (et non `fetch()` qui est bloqué par CORS en
  protocole `file://`). Le fichier `Programmes/catalog.js` expose
  `window.INDISPO_CATALOG` lu directement par `script.js`.
- **Touche `Échap`** ferme l'overlay.

### Thème militaire / camouflage / futuriste

- **Palette à fort contraste** : vert olive profond, kaki, noir, sable.
  - Mode clair : texte `#0a0a05`, accent `#3d4f1e`, fond sable `#c9a86a`.
  - Mode sombre : texte `#fff5d0`, accent `#b8c855`, fond quasi-noir `#08080a`.
- **Motifs** : taches camouflage animées (défilement 60s), grille tactique,
  plaques métalliques (gradients hachurés), cartes (radial gradients).
- **Police futuriste sans-serif** :
  ```
  Bahnschrift / Bahnschrift Condensed / Eurostile / Bank Gothic /
  Tw Cen MT Condensed / Impact / Arial Narrow / Helvetica Neue / system-ui
  ```
  - Native sous Windows 10/11 (Bahnschrift), fallbacks universels.
  - Look militaire / tactique / sci-fi (condensé, géométrique).
- **Typographie** : titres en `uppercase`, `font-weight: 800`,
  `letter-spacing: 2px`. Boutons et liens sociaux idem.
- **Mode clair / sombre** sur toutes les pages, choix mémorisé par navigateur
  via `localStorage`.

---

## Règles de versionnage

Le fichier `.gitignore` exclut les types de fichiers volumineux suivants :

| Catégorie       | Extensions exclues                                                  |
|-----------------|---------------------------------------------------------------------|
| Images          | `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.tiff`, `.webp`, `.svg`, `.ico`, `.psd`, `.raw`, ... |
| PDF             | `.pdf`                                                              |
| Vidéos          | `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`, `.flv`, `.wmv`, ...        |
| Archives        | `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.iso`, ...                   |
| Audio / musique | `.mp3`, `.wav`, `.flac`, `.aac`, `.ogg`, `.m4a`, ...                |
| Ebooks          | `.epub`, `.mobi`, `.azw`, `.djvu`, `.cbr`, `.cbz`, ...              |
| Exécutables     | `.exe`, `.msi`, `.dmg`, `.pkg`, `.deb`, `.rpm`, `.appimage`         |

### Exceptions explicites

Les dossiers `Musique/`, `Programmes/` et `images/` sont marqués comme exclus,
mais les fichiers `.html` et `catalog.json` qu'ils contiennent restent versionnés
grâce à des règles `!Musique/*.html`, `!Programmes/*.html`,
`!Programmes/catalog.json`, etc.

### Profondeur maximale

Seuls les **dossiers racine** et leurs **sous-dossiers directs** (niveau 1)
sont conservés. Tout dossier imbriqué au-delà (`racine/sous-dossier/sous-sous/`)
est ignoré (`*/*/*/`).

| Chemin                                           | Statut         |
|--------------------------------------------------|----------------|
| `Programmes/`                                    | Autorisé       |
| `Programmes/images/`                             | Ignoré         |
| `Programmes/images/captures/2025/`               | Ignoré         |

---

## Installation locale

### Cloner le dépôt

```bash
git clone https://github.com/Delfosse-Pascal/Indispensable_Site_2026.git
cd Indispensable_Site_2026
```

Aucune dépendance externe à installer. Le site fonctionne directement
en ouvrant `index.html` dans un navigateur.

### Ajouter le contenu multimédia

Comme les médias ne sont pas versionnés, copiez vos fichiers personnels
dans les dossiers correspondants :

- Pistes audio (`.mp3`) → `Musique/`
- Images (`.jpg`, `.png`) et archives (`.rar`, `.zip`) → `Programmes/`

Les noms doivent être appariés (ex. `MonLogiciel.jpg` + `MonLogiciel.rar`)
pour que le script de build associe correctement les paires image / archive.

---

## Lancement du site

Aucun serveur n'est requis. Deux modes :

1. **Double-clic sur `index.html`** — fonctionne entièrement en `file://`.
2. **Serveur local optionnel** (recommandé pour éviter certains blocages
   de sécurité du navigateur) :
   ```bash
   # Python
   python -m http.server 8000

   # Node
   npx http-server -p 8000
   ```
   Puis ouvrir `http://localhost:8000` dans le navigateur.

---

## Régénération des pages

Après avoir ajouté ou modifié des fichiers dans `Programmes/`, lancez
le script de build pour reconstruire les pages HTML et le catalogue de
recherche :

```powershell
# Windows / PowerShell
& "assets\build_crack.ps1"
```

Le script :

1. Parcourt tous les fichiers du dossier `Programmes/`.
2. Regroupe les paires image + archive par nom normalisé.
3. Calcule la taille et les dimensions de chaque élément.
4. Génère `index.html` + `page-02.html` à `page-NN.html`
   (60 cartes par page).
5. Écrit `catalog.json` (référence JSON) et `catalog.js`
   (variable globale `window.INDISPO_CATALOG` pour la recherche en `file://`).

---

## Personnalisation

### Modifier le thème

- **Couleurs** : éditer les variables CSS dans `assets/style.css`
  (section `:root` pour le mode clair, `[data-theme="dark"]` pour le sombre).
- **Police** : variable `font-family` du sélecteur `body` (et `h1, h2, h3`)
  dans `style.css`. Empiler vos polices préférées en gardant des fallbacks
  système pour rester fonctionnel hors-ligne.
- **Motifs camouflage** : pseudo-éléments `body::before` (taches camo)
  et `body::after` (grille tactique).
- **Animations** : keyframes `bgshift`, `pulse`, `float`, `fadein`,
  `rainbowShift`, `wave`, `heropop`, `lbpop`, `slideup`.

### Ajouter des liens sociaux

Modifier le bloc `<nav class="social-menu">` présent dans chaque page HTML.
Pour appliquer un changement à toutes les pages d'un coup, modifier
`assets/menu.js` (à terme) ou éditer chaque fichier `index.html` séparément.

### Ajouter une section

1. Créer un nouveau dossier au niveau racine (ex. `Documents/`).
2. Ajouter une `index.html` dans ce dossier (s'inspirer de `Musique/index.html`).
3. Mettre à jour `.gitignore` avec `Documents/*` + `!Documents/*.html`.
4. Ajouter un lien / tuile dans `index.html` racine.
5. Adapter `assets/menu.js` (fonction `detectRoot()`) si le dossier est
   référencé par les boutons multicolores.

---

## Workflow Git

```bash
# Récupérer les dernières modifications du dépôt distant
git pull origin main

# Vérifier l'état du dépôt
git status

# Ajouter les changements (médias automatiquement ignorés)
git add .

# Créer un commit avec un message clair
git commit -m "Description précise de la modification"

# Pousser vers GitHub
git push origin main
```

### Contribuer via une branche

1. `git checkout -b feature/nom-de-la-modification`
2. Effectuer les changements (respecter les règles `.gitignore`).
3. Commit + push de la branche.
4. Ouvrir une *Pull Request* sur GitHub.

---

## Licence

Projet personnel — tous droits réservés à l'auteur sauf mention contraire.
Les logos, captures et marques cités appartiennent à leurs propriétaires
respectifs.

---

## Contact

- **Auteur** : Delfosse Pascal
- **Email** : linhajahad@gmail.com
- **Dépôt** : <https://github.com/Delfosse-Pascal/Indispensable_Site_2026>
- **Liens sociaux** : visibles depuis le menu en haut de chaque page du site.
