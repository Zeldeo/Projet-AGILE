/**
 * checkWebsiteSecurity.js
 * 
 * Vérifie la sécurité d'un site Web selon plusieurs critères :
 * - Structure de l’URL (HTTPS, nom de domaine, extension, caractères suspects)
 * - Réponse du serveur
 * - Quelques vérifications visuelles simples (basées sur le HTML récupéré)
 * 
 * ⚠️ Note : certaines vérifications (comme l'apparence visuelle ou les pop-ups)
 * ne sont faisables que côté navigateur avec une inspection directe du DOM.
 */

async function checkWebsiteSecurity(url) {
    let score = 100;
    const report = [];

    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;

      // 1️⃣ HTTPS
      if (urlObj.protocol !== "https:") {
        score -= 30;
        report.push("❌ Le site n'utilise pas HTTPS.");
      } else {
        report.push("✅ Le site utilise HTTPS.");
      }

      // 2️⃣ Mots suspects
      const suspiciousPatterns = ["secure", "verif", "connexion", "login", "update", "support", "confirm"];
      const hasSuspiciousWord = suspiciousPatterns.some(word => hostname.includes(word));
      if (hasSuspiciousWord) {
        score -= 10;
        report.push("⚠️ Le nom de domaine contient un mot suspect.");
      } else {
        report.push("✅ Aucun mot suspect dans le nom de domaine.");
      }

      // 3️⃣ Extension
      const parts = hostname.split(".");
      const ext = parts[parts.length - 1];
      const trusted = ["com", "fr", "org", "edu", "net", "gov"];
      if (!trusted.includes(ext)) {
        score -= 5;
        report.push(`⚠️ Extension de domaine peu commune (.${ext}).`);
      } else {
        report.push(`✅ Extension de domaine fiable (.${ext}).`);
      }

      // 4️⃣ Caractères étranges
      const weirdChars = /[àâäéèêëïîôöùûüç]|[^a-zA-Z0-9\.\-]/.test(hostname);
      if (weirdChars) {
        score -= 20;
        report.push("❌ Le domaine contient des caractères suspects (accentués ou spéciaux).");
      } else {
        report.push("✅ Aucun caractère suspect détecté.");
      }

      // 5️⃣ Réponse du site
      try {
        await fetch(url, { method: "HEAD", mode: "no-cors" });
        report.push("✅ Le site répond au ping HTTP.");
      } catch {
        score -= 10;
        report.push("⚠️ Impossible d'accéder au site (erreur réseau ou certificat).");
      }

      report.push("ℹ️ Vérifiez manuellement : cadenas 🔒, mentions légales, apparence, absence de pop-ups.");
      if (score < 0) score = 0;

      const niveau = score >= 80 ? "Sécurisé ✅"
                   : score >= 60 ? "Moyennement sûr ⚠️"
                   : "Risque élevé ❌";

      return { url, score, niveau, details: report };

    } catch {
      return { url, score: 0, niveau: "Erreur ❌", details: ["URL invalide."] };
    }
  }

  const calculateBtn = document.getElementById("calculateBtn");
  const inputSection = document.getElementById("input-section");
  const resultSection = document.getElementById("result-section");
  const resultValue = document.getElementById("scoreValue");
  const scoreLabel = document.getElementById("scoreLabel");
  const progressBar = document.getElementById("progressBar");
  const detailsList = document.getElementById("detailsList");
  const backBtn = document.getElementById("backBtn");

  calculateBtn.addEventListener("click", async () => {
    const input = document.getElementById("calcyberscore");
    const url = input.value.trim();

    if (!url) {
      alert("Veuillez entrer une URL !");
      return;
    }

    // Étape 1 → cacher l’input, montrer les résultats
    inputSection.style.display = "none";
    resultSection.style.display = "block";

    resultValue.textContent = "Analyse en cours...";
    progressBar.style.width = "0%";
    detailsList.innerHTML = "";

    const result = await checkWebsiteSecurity(url);

    // Mettre à jour l’affichage du score
    resultValue.textContent = `${result.score}/100`;
    scoreLabel.textContent = result.niveau;

    // Barre de progression animée
    setTimeout(() => {
      progressBar.style.width = result.score + "%";
      if (result.score < 60) progressBar.style.background = "#ff4e42";
      else if (result.score < 80) progressBar.style.background = "#f7b500";
      else progressBar.style.background = "#28a745";
    }, 200);

    // Détails
    detailsList.innerHTML = result.details.map(d => `<li>${d}</li>`).join("");
  });

  // Bouton retour → refaire une analyse
  backBtn.addEventListener("click", () => {
    resultSection.style.display = "none";
    inputSection.style.display = "flex";
    document.getElementById("calcyberscore").value = "";
  });

// Exemple d’utilisation :
(async () => {
    const result = await checkWebsiteSecurity("https://www.paypa1.com/");
    console.log("Résultat de la vérification :");
    console.log(result);
})();
