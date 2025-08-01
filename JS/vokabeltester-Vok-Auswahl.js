let vocabList = [];
let VokabelKategorie = [];

const storedVocabList = localStorage.getItem('vokabelListe');
if (storedVocabList) {
    vocabList = JSON.parse(storedVocabList);
    console.log("Vokabelliste aus localStorage geladen:", vocabList);
} else {
    console.log("Keine Vokabelliste im localStorage gefunden. Starte mit einer leeren Liste.");
}

// 1. Wir holen alle Kategorien aus dem Array (darf auch doppelt sein)
const alleKategorienMitWiederholungen = vocabList.map(eintrag => eintrag.category);

// 2. Wir entfernen doppelte Einträge mit einem Set
export const alleKategorien = [...new Set(alleKategorienMitWiederholungen)];

// Jetzt haben wir ein Array mit jeder Kategorie genau einmal
console.log(alleKategorien);

console.log("test");
let select = document.getElementById("testSelection");

// Optional: Clear all existing options first:
select.innerHTML = "";
// Populate list with options:
for (let index = 0; index < alleKategorien.length; index++) {
    let opt = alleKategorien[index];
    select.innerHTML += `<option value="${opt}">${opt}</option>`;
}

document.addEventListener('DOMContentLoaded', () => {
    kakategorieAuswahl = document.getElementById("kategorieAuswahl");
    vokabelAbfrageBereich = document.getElementById("vokabelAbfrageBereich");
});