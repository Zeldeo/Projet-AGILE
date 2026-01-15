/**
 * checkWebsiteSecurity.js
 * 
 * Fonctionnalités :
 * - Calcul du cyberscore pondéré (/100)
 * - Sauvegarde locale dans un tableau
 * - Top 5 dynamique basé sur un fichier JSON externe
 */

let cyberscoreHistory = [];

// Charger le JSON externe
async function loadCyberscoreJSON() {
    try {
        const response = await fetch('cyberscores.json'); // chemin vers ton JSON
        if (!response.ok) throw new Error('Impossible de charger le JSON');
        const data = await response.json();
        cyberscoreHistory = data; // mettre à jour le tableau local
    } catch (err) {
        console.error(err);
        cyberscoreHistory = []; // si erreur, tableau vide
    }
}

// Fonction principale de vérification
async function checkWebsiteSecurity(url) {
    const coeff = { https: 0.30, suspiciousWord: 0.10, extension: 0.15, weirdChars: 0.25, response: 0.20 };
    let httpsScore = 0, suspiciousScore = 100, extScore = 100, charScore = 100, responseScore = 100;
    const report = [];

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        // HTTPS
        httpsScore = urlObj.protocol === "https:" ? 100 : 0;
        report.push(httpsScore === 100 ? "✅ Le site utilise HTTPS." : "❌ Le site n'utilise pas HTTPS.");

        // Mots suspects
        const suspiciousPatterns = ["secure","verif","connexion","login","update","support","confirm"];
        const hasSuspiciousWord = suspiciousPatterns.some(word => hostname.includes(word));
        suspiciousScore = hasSuspiciousWord ? 0 : 100;
        report.push(hasSuspiciousWord ? "⚠️ Le nom de domaine contient un mot suspect." : "✅ Aucun mot suspect.");

        // Extension
        const parts = hostname.split(".");
        const ext = parts[parts.length-1];
        const trusted = ["com","fr","org","edu","net","gov"];
        extScore = trusted.includes(ext) ? 100 : 50;
        report.push(trusted.includes(ext) ? `✅ Extension fiable (.${ext}).` : `⚠️ Extension peu commune (.${ext}).`);

        // Caractères étranges
        const weirdChars = /[àâäéèêëïîôöùûüç]|[^a-zA-Z0-9\.\-]/.test(hostname);
        charScore = weirdChars ? 0 : 100;
        report.push(weirdChars ? "❌ Caractères suspects." : "✅ Aucun caractère suspect.");

        // Réponse du site
        try { await fetch(url, { method:"HEAD", mode:"no-cors" }); responseScore=100; report.push("✅ Site répond."); }
        catch { responseScore=0; report.push("⚠️ Impossible d'accéder au site."); }

        let scoreFinal = Math.round(
            httpsScore*coeff.https +
            suspiciousScore*coeff.suspiciousWord +
            extScore*coeff.extension +
            charScore*coeff.weirdChars +
            responseScore*coeff.response
        );

        const niveau = scoreFinal>=80 ? "Sécurisé ✅" : scoreFinal>=60 ? "Moyennement sûr ⚠️" : "Risque élevé ❌";

        return { url, score: scoreFinal, niveau, details: report };

    } catch {
        return { url, score: 0, niveau: "Erreur ❌", details: ["URL invalide."] };
    }
}

// -----------------------------
// DOM Elements
// -----------------------------
const calculateBtn = document.getElementById("calculateBtn");
const inputSection = document.getElementById("input-section");
const resultSection = document.getElementById("result-section");
const resultValue = document.getElementById("scoreValue");
const scoreLabel = document.getElementById("scoreLabel");
const progressBar = document.getElementById("progressBar");
const detailsList = document.getElementById("detailsList");
const top5List = document.getElementById("top5List");
const backBtn = document.getElementById("backBtn");

// -----------------------------
// Afficher le Top 5 dynamique
// -----------------------------
function displayTop5() {
    if (!top5List) return;
    const top5 = [...cyberscoreHistory].sort((a,b)=>b.score-a.score).slice(0,5);
    top5List.innerHTML = top5.map((item,index)=>
        `<li><strong>#${index+1}</strong> ${item.url} - ${item.score}/100 (${item.niveau})</li>`
    ).join("");
}

// -----------------------------
// Bouton calcul
// -----------------------------
calculateBtn.addEventListener("click", async () => {
    const input = document.getElementById("calcyberscore");
    const url = input.value.trim();
    if (!url) { alert("Veuillez entrer une URL !"); return; }

    inputSection.style.display = "none";
    resultSection.style.display = "block";

    resultValue.textContent = "Analyse en cours...";
    progressBar.style.width = "0%";
    detailsList.innerHTML = "";

    const result = await checkWebsiteSecurity(url);

    // Ajouter dans le tableau local
    cyberscoreHistory.push({...result, timestamp: new Date().toISOString()});

    // Afficher score principal
    resultValue.textContent = `${result.score}/100`;
    scoreLabel.textContent = result.niveau;

    setTimeout(()=>{
        progressBar.style.width = result.score + "%";
        progressBar.style.background = result.score<60?"#ff4e42":result.score<80?"#f7b500":"#28a745";
    },200);

    // Détails
    detailsList.innerHTML = result.details.map(d=>`<li>${d}</li>`).join("");

    // Mettre à jour Top 5
    displayTop5();
});

// -----------------------------
// Bouton retour
// -----------------------------
backBtn.addEventListener("click", ()=>{
    resultSection.style.display = "none";
    inputSection.style.display = "flex";
    document.getElementById("calcyberscore").value = "";
});

// -----------------------------
// Initialisation : charger JSON et afficher Top 5
// -----------------------------
document.addEventListener("DOMContentLoaded", async ()=>{
    await loadCyberscoreJSON();
    displayTop5();
});
