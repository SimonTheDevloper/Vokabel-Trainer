
let vocabList = [];
let ausgewählteKategorie = "";

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
const alleKategorien = [...new Set(alleKategorienMitWiederholungen)];

// Jetzt haben wir ein Array mit jeder Kategorie genau einmal
console.log(alleKategorien);

console.log("test");
let select = document.getElementById("KategorieSelection");

// Optional: Clear all existing options first:
select.innerHTML = "";
// Populate list with options:
for (let index = 0; index < alleKategorien.length; index++) {
    let opt = alleKategorien[index];
    select.innerHTML += `<option value="${opt}">${opt}</option>`;
}
document.addEventListener('DOMContentLoaded', () => {
    const addVocabForm = document.getElementById('addVocabForm');
    const deutschesWortInput = document.getElementById('deutschesWort');
    const englischesWortInput = document.getElementById('englischesWort');
    const kategorieInput = document.getElementById('kategorie');
    const submitButton = document.getElementById('submitButton');
    const neueKategorieBtn = document.getElementById('kategorieHinzufügen');

    neueKategorieBtn.addEventListener("click", neueKategorie);

    function neueKategorie() {
        ausgewählteKategorie = prompt("Schreibe eine Neue Kategorie"); 
    }

    function checkInputs() {
        const allFilled = deutschesWortInput.value.trim() !== "" &&
            englischesWortInput.value.trim() !== "";

        submitButton.disabled = !allFilled;
        submitButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';

        deutschesWortInput.addEventListener('input', checkInputs);
        englischesWortInput.addEventListener('input', checkInputs);

    }
    select.addEventListener("change", () => {
        ausgewählteKategorie = alleKategorien[select.selectedIndex];
        console.log("Ausgewählte Kategorie," + ausgewählteKategorie);
    });
    addVocabForm.addEventListener('submit', function (event) {

        event.preventDefault();
        const deutschesWort = deutschesWortInput.value.trim();
        const englischesWort = englischesWortInput.value.trim();



        // Neues Vokabelobjekt erstellen
        const neueVokabel = {
            word: deutschesWort,
            translation: englischesWort,
            category: ausgewählteKategorie,
        };
        // Hier wird ein neues JavaScript-Objekt namens 'neueVokabel' erstellt.
        // Dieses Objekt hat Schlüssel ('word', 'translation', 'category', 'note', 'favorite')
        vocabList.push(neueVokabel);

        alert(`Vokabel "${deutschesWort} - ${englischesWort}" wurde hinzugefügt.`);
        addVocabForm.reset();

        checkInputs()
        localStorage.setItem('vokabelListe', JSON.stringify(vocabList));

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
    checkInputs();
});
