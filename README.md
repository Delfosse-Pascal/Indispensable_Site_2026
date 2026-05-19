# Indispensable_Site_2026

Dépôt du projet **Indispensable Site 2026** — espace de travail centralisé pour la préparation, la documentation et le suivi du site web prévu pour 2026.

---

## Sommaire

- [Présentation](#présentation)
- [Structure du dépôt](#structure-du-dépôt)
- [Règles de versionnage](#règles-de-versionnage)
- [Installation locale](#installation-locale)
- [Workflow Git](#workflow-git)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Contact](#contact)

---

## Présentation

Ce dépôt regroupe les ressources, notes et fichiers de référence nécessaires à la conception du site **Indispensable 2026**. Il sert de point unique de centralisation pour le suivi des éléments textuels et structurels du projet.

Les contenus volumineux (images, vidéos, audio, archives, PDF, ebooks) ne sont **pas versionnés** dans ce dépôt afin de garder son poids raisonnable. Ils restent disponibles localement.

---

## Structure du dépôt

Profondeur maximale : **1 niveau de sous-dossiers**. Toute imbrication plus profonde est exclue du versionnage.

```
Indispensable_Site_2026/
├── README.md         # Ce fichier
├── .gitignore        # Règles d'exclusion
├── images/           # Ressources visuelles (contenu non versionné)
└── Musique/          # Ressources audio (contenu non versionné)
```

| Élément        | Versionné | Description                                              |
|----------------|-----------|----------------------------------------------------------|
| `README.md`    | Oui       | Documentation principale du projet                       |
| `.gitignore`   | Oui       | Liste des fichiers et dossiers exclus du suivi Git       |
| `images/`      | Non       | Stockage local des visuels (`.png`, `.jpg`, `.svg`, …)   |
| `Musique/`     | Non       | Stockage local des pistes audio (`.mp3`, `.wav`, …)      |

---

## Règles de versionnage

Le `.gitignore` exclut les types de fichiers suivants :

- **Images** : `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.tiff`, `.bmp`, `.ico`, `.psd`, `.raw`, …
- **PDF** : `.pdf`
- **Vidéos** : `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`, `.flv`, …
- **Archives** : `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.iso`, …
- **Audio / musique** : `.mp3`, `.wav`, `.flac`, `.aac`, `.ogg`, `.m4a`, …
- **Ebooks** : `.epub`, `.mobi`, `.azw`, `.djvu`, `.cbr`, `.cbz`, …

**Profondeur** : seuls les dossiers racine et leurs sous-dossiers directs sont conservés. Tout dossier au-delà du second niveau (`racine/sous-dossier/SUB/`) est ignoré.

Exemple :

| Chemin                                           | Statut         |
|--------------------------------------------------|----------------|
| `Indispensable_Site_2026/images/`                | Autorisé       |
| `Indispensable_Site_2026/images/photos/`         | Ignoré         |
| `Indispensable_Site_2026/images/photos/2025/`    | Ignoré         |

---

## Installation locale

```bash
git clone https://github.com/Delfosse-Pascal/Indispensable_Site_2026.git
cd Indispensable_Site_2026
```

Aucune dépendance externe requise à ce stade.

---

## Workflow Git

```bash
# Récupérer les dernières modifications
git pull origin main

# Suivre l'état du dépôt
git status

# Ajouter les changements (les médias seront automatiquement ignorés)
git add .

# Créer un commit
git commit -m "Description claire de la modification"

# Pousser vers GitHub
git push origin main
```

---

## Contribuer

1. Créer une branche : `git checkout -b feature/ma-modification`
2. Effectuer les changements (en respectant les exclusions du `.gitignore`)
3. Committer avec un message clair et concis
4. Pousser la branche : `git push origin feature/ma-modification`
5. Ouvrir une *Pull Request* sur GitHub

---

## Licence

Projet personnel — droits réservés à l'auteur sauf mention contraire.

---

## Contact

- **Auteur** : Delfosse Pascal
- **Dépôt** : <https://github.com/Delfosse-Pascal/Indispensable_Site_2026>
