/**vérification JS (J’ai pas pu mettre le fichier)*/

/**

- Analyse une URL selon plusieurs critères de confiance et retourne un score et des détails.
- 
- @param {string} url L'URL à analyser.
- @returns {object} Un objet contenant le score (de 0 à 100) et un tableau de messages d'analyse.
*/
function analyserConfianceURL(url) {
let score = 0;
const details = [];
    
    // Tente de normaliser l'URL pour une analyse plus fiable
    let urlNormalisee = url.trim();
    if (!urlNormalisee.startsWith('http://') && !urlNormalisee.startsWith('https://')) {
    urlNormalisee = 'http://' + urlNormalisee;
    }
    
    try {
    const urlObject = new URL(urlNormalisee);
    const hostname = urlObject.hostname; // ex: "[www.exemple.com](http://www.exemple.com/)"
    
     // --- a. Le protocole HTTPS (Poids : 30 points) ---
     if (urlObject.protocol === 'https:') {
         score += 30;
         details.push({
             message: "✅ Le site utilise le protocole HTTPS, qui chiffre la communication.",
             type: "success"
         });
     } else {
         details.push({
             message: "❌ Le site n'utilise pas le protocole HTTPS. Les données ne sont pas chiffrées.",
             type: "error"
         });
     }
    
     // --- c. L'extension du domaine (Poids : 25 points) ---
     const tld = hostname.substring(hostname.lastIndexOf('.') + 1).toLowerCase();
     const tldsFiables = ['com', 'fr', 'org', 'net', 'gov', 'edu', 'gouv', 'be', 'ca', 'ch', 'de', 'eu', 'uk'];
     const tldsExotiques = ['xyz', 'tk', 'top', 'loan', 'club', 'ru', 'biz'];
    
     if (tldsFiables.includes(tld)) {
         score += 25;
         details.push({
             message: `✅ L'extension (.${tld}) est courante et généralement fiable.`,
             type: "success"

         });
     } else if (tldsExotiques.includes(tld)) {
         score += 5; // Score faible pour les extensions potentiellement suspectes
         details.push({
             message: `⚠️ L'extension (.${tld}) est parfois utilisée pour des sites peu fiables. Soyez prudent.`,
             type: "warning"
         });
     } else {
         score += 15; // Score neutre pour les autres
         details.push({
             message: `ℹ️ L'extension (.${tld}) est moins courante.`,
             type: "info"
         });
     }
    
     // --- d. Absence de caractères étranges (Poids : 25 points) ---
     // Vérifie la présence de caractères non-ASCII (détecte les "faux domaines" type goögle.com)
     // Les noms de domaine internationalisés (IDN) sont convertis en "punycode" (commençant par xn--)
     if (hostname.startsWith('xn--')) {
         details.push({
             message: "❌ Le nom de domaine contient des caractères spéciaux ou internationaux (Punycode), souvent utilisés pour le phishing.",
             type: "error"
         });
     } else {
         score += 25;
         details.push({
             message: "✅ Le nom de domaine utilise des caractères standards.",
             type: "success"
         });
     }
    
     // --- b. Le nom de domaine et sa structure (Poids : 20 points) ---
     const parts = hostname.split('.');
     const nbSousDomaines = parts.length - 2;
     const nbTirets = (hostname.match(/-/g) || []).length;
    
     let scoreStructure = 20;
     if (nbSousDomaines > 2) {
         scoreStructure -= 10;
         details.push({
             message: "⚠️ Attention aux sous-domaines multiples, qui peuvent être trompeurs (ex: paypal.connexion.securisee.com).",
             type: "warning"
         });
     }
     if (nbTirets > 2) {
         scoreStructure -= 10;
         details.push({
             message: "⚠️ L'utilisation de nombreux tirets dans le nom de domaine peut être un signe de site suspect.",
             type: "warning"
         });
     }
    
     if (scoreStructure === 20) {
         details.push({
             message: "✅ La structure du nom de domaine semble standard.",
             type: "success"
         });
     }
     score += Math.max(0, scoreStructure); // Assure que le score ne devient pas négatif
    
    ```
    
    } catch (error) {
    // Si l'URL est invalide, le score reste à 0
    return {
    score: 0,
    details: [{
    message: "❌ L'URL saisie est invalide. Veuillez vérifier le format (ex: [www.exemple.com](http://www.exemple.com/)).",
    type: "error"
    }]
    };
    }
    
    return {
    score: Math.min(score, 100), // Plafonne le score à 100
    details: details
    };
    }
    

/**

- EXEMPLE D'INTÉGRATION HTML
- Ce code s'exécute lorsque la page est chargée et connecte la logique
- à vos éléments HTML (un champ de saisie, un bouton et une zone de résultats).
*/
document.addEventListener('DOMContentLoaded', () => {
const boutonVerifier = document.getElementById('boutonVerifier');
if (boutonVerifier) {
boutonVerifier.addEventListener('click', () => {
const inputUrl = document.getElementById('inputUrl');
const zoneResultat = document.getElementById('zoneResultat');
    
    ```
    if (inputUrl && zoneResultat) {
        const analyse = analyserConfianceURL(inputUrl.value);

        // Détermine la couleur en fonction du score
        let couleurScore = 'red';
        if (analyse.score >= 75) {
            couleurScore = 'green';
        } else if (analyse.score >= 50) {
            couleurScore = 'orange';
        }

        // Affiche le score
        let htmlResultat = `<div class="score" style="color: ${couleurScore};">Score de confiance : <strong>${analyse.score} / 100</strong></div>`;

        // Affiche les détails de l'analyse
        htmlResultat += '<ul class="details-list">';
        analyse.details.forEach(detail => {htmlResultat += `<li class="${detail.type}">${detail.message}</li>`;
        });
        htmlResultat += '</ul>';

        zoneResultat.innerHTML = htmlResultat;
    }
        };
    };



  