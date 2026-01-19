# CyberMetrics 🛡️

Un outil d'audit automatisé pour évaluer et améliorer le **cyberscore** de vos sites web.

## 📋 Description

**CyberMetrics** est une application web qui analyse la sécurité, la confidentialité et la résilience des sites web. Elle fournit un score numérique (0-100) basé sur plusieurs critères de sécurité et affiche un classement des meilleurs scores.

### Fonctionnalités principales

✅ **Analyse automatisée** : Évaluation complète d'un site web en quelques secondes  
✅ **Cyberscore pondéré** : Score calculé selon plusieurs critères de sécurité  
✅ **Top 5 dynamique** : Classement des meilleurs sites analysés  
✅ **Rapports détaillés** : Résultats détaillés avec recommandations  
✅ **Design moderne** : Interface fluide avec animations  
✅ **Historique sauvegardé** : Conservation des analyses précédentes  

---

## 🔍 Critères d'évaluation du cyberscore

Le score est calculé à partir de 5 critères pondérés :

### 1. **Protocole HTTPS** (30%)
- ✅ Site utilise HTTPS (protocole sécurisé)
- ❌ Site n'utilise que HTTP

### 2. **Mots suspects dans le domaine** (10%)
- ⚠️ Présence de mots comme : "secure", "verif", "connexion", "login", "update", "support", "confirm"

### 3. **Extension du domaine** (15%)
- ✅ Extension fiable (.com, .fr, .org, .edu, .net, .gov)
- ⚠️ Extension moins commune

### 4. **Caractères étranges** (25%)
- ❌ Présence de caractères accentués ou non-alphanumériques
- ✅ Aucun caractère suspect

### 5. **Accessibilité du site** (20%)
- ✅ Le site répond correctement aux requêtes
- ⚠️ Impossible d'accéder au site

### Classification finale

| Score | Niveau | Symbole |
|-------|--------|---------|
| ≥ 80 | Sécurisé | ✅ |
| 60-79 | Moyennement sûr | ⚠️ |
| < 60 | Risque élevé | ❌ |

---

## 🎯 Comment utiliser

### 1. **Accédez au site**
Ouvrez `https://zeldeo.github.io/Projet-AGILE/` dans votre navigateur.

### 2. **Entrez une URL**
- Saisissez l'adresse du site à analyser
- Cliquez sur "Calculez votre cyberscore"

### 3. **Consultez les résultats**
- Score global sur 100
- Barre de progression colorée (rouge → orange → vert)
- Détails des vérifications effectuées

### 4. **Consultez le classement**
- Le **Top 5** affiche les meilleurs sites analysés
- Cliquez sur un site pour le visiter

---

## 📁 Structure du projet

```
Projet AGILE/
├── Index.html                 # Page principale
├── style.css                  # Styles et animations CSS
├── animation.js               # Gestion des animations (AOS)
├── checkWebsiteSecurity.js    # Logique d'analyse du cyberscore
├── cyberscoreHistory.json     # Historique des scores (JSON)
├── logos/                     # Logos des partenaires
│   ├── amazon.png
│   ├── ebay.png
│   ├── google.png
│   ├── meta.png
│   ├── microsoft.png
│   ├── netflix.png
│   ├── nvidia.png
│   ├── apple.svg
│   ├── amd.png
│   └── tesla.png
├── LOGO CyberMetrics.png      # Logo principal
├── LOGO SHIELD.png            # Mascotte/icône
└── README.md                  # Documentation
```

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|-------------|------------|
| **HTML5** | Structure de la page |
| **CSS3** | Styles et animations (gradient, flexbox) |
| **JavaScript (Vanilla)** | Logique d'analyse et interaction DOM |
| **AOS (Animate On Scroll)** | Animations au défilement |
| **JSON** | Stockage de l'historique des scores |
| **Fetch API** | Requêtes HTTP pour charger le JSON |

---

## 📊 Exemple de résultat JSON

```json
{
  "url": "https://www.example.com",
  "score": 85,
  "niveau": "Sécurisé ✅",
  "timestamp": "2025-01-19T10:30:45.000Z",
  "details": [
    "✅ Le site utilise HTTPS.",
    "✅ Aucun mot suspect.",
    "✅ Extension fiable (.com).",
    "✅ Aucun caractère suspect.",
    "✅ Site répond."
  ]
}
```

---

## 🚀 Démarrage rapide

1. **Clonez ou téléchargez** le projet
2. **Ouvrez** `Index.html` dans un navigateur moderne
3. **Entrez une URL** et lancez l'analyse
4. **Explorez** les résultats et le classement

### Navigateurs supportés
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

---

## 📝 Fichiers clés

### `Index.html`
- Structure de la page
- Sections : héros, classement, partenaires, contact
- Intégration des scripts et styles

### `checkWebsiteSecurity.js`
```javascript
// Fonction principale
async function checkWebsiteSecurity(url)
  // Retourne : { url, score, niveau, details }
```

### `style.css`
- Variables CSS pour la cohérence des couleurs
- Animations fluides (fade-down, fade-right, fade-up)
- Carousel infini des partenaires
- Barre de progression dynamique

### `animation.js`
- Initialisation d'AOS
- Gestion du formulaire de contact

---

## 🎨 Palette de couleurs

```css
--blue-900: #0b3a66   /* Bleu foncé (primaire) */
--blue-700: #1853ab   /* Bleu moyen */
--blue-600: #1376d6   /* Bleu clair */
--blue-400: #5db0ff   /* Bleu très clair */
--blue-200: #a3c8fd   /* Bleu pâle */
--white: #ffffff      /* Blanc */
```

---

## ⚙️ Configuration

### Charger l'historique des scores
Modifiez `checkWebsiteSecurity.js` pour pointer vers votre fichier JSON :

```javascript
const response = await fetch('cyberscoreHistory.json');
```

### Ajouter/Modifier les mots suspects
Dans `checkWebsiteSecurity.js`, ligne ~30 :

```javascript
const suspiciousPatterns = [
  "secure", "verif", "connexion", "login", 
  "update", "support", "confirm"
  // Ajoutez d'autres mots ici
];
```

### Personnaliser les extensions fiables
Dans `checkWebsiteSecurity.js`, ligne ~39 :

```javascript
const trusted = ["com", "fr", "org", "edu", "net", "gov"];
```

---

## 📞 Formulaire de contact

Les utilisateurs peuvent envoyer des messages via le formulaire en bas de page. Actuellement, affiche une alerte de confirmation.

**Pour activer les emails** : Connectez-vous à un service backend (ex: Formspree, Netlify Forms, etc.)

---

## 🐛 Limitations connues

- L'analyse n'effectue qu'une vérification **basée sur l'URL et la réponse HTTP**
- Pas d'analyse du contenu HTML ou des en-têtes de sécurité détaillés
- L'accès à certains sites peut être bloqué par CORS
- L'historique est stocké **localement dans le navigateur** (pas de sauvegarde serveur)

---

## 🔮 Améliorations futures

- [ ] Analyse des en-têtes de sécurité (CSP, X-Frame-Options, etc.)
- [ ] Audit SSL/TLS détaillé
- [ ] Scan de vulnérabilités
- [ ] Base de données en ligne pour l'historique
- [ ] Export des rapports en PDF
- [ ] Intégration d'une API d'analyse de malware
- [ ] Système d'authentification utilisateur

---

## 📜 Licence

© 2025 **CyberMetrics**. Tous droits réservés.

---

## 👥 Auteur

Projet réalisé dans le cadre d'un **Bachelor 3 - Projet AGILE** à l'ESAIP.

---

## 💡 Notes supplémentaires

- Les logos des partenaires sont des marques déposées de leurs propriétaires respectifs
- L'application fonctionne **en client-side** (pas de serveur requis)
- Sauvegarde des scores dans le localStorage du navigateur (optionnel)

---

**Besoin d'aide ?** Consultez la section contact du site ou explorez le code commenté.
