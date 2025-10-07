import { zeigeFeedback } from './hinzufügenUI.js'
import { erstelleDropDown } from './test/kategorieauswahl.js';
import { getVocabList, kategorienAbrufen, ladeVokList, speichereVokabelListe } from './test/vokabelabfrage-Data.js';
console.log("Bitte beide Felder ausfüllen!");
document.addEventListener('DOMContentLoaded', () => {
    ladeVokList();
    erstelleDropDown();
    const auswahl = document.getElementById('kategorieAuswahl');
    const kategorieselect = document.getElementById('testSelection');
    const addVocabForm = document.getElementById('addVocabForm')
    auswahl.addEventListener('submit', function (event) {

        event.preventDefault();
        const alleKategorien = kategorienAbrufen();
        const kategorie = alleKategorien[kategorieselect.selectedIndex];
        console.log(kategorie);
        auswahl.classList.add('hidden');
        addVocabForm.classList.remove('hidden')

    })
});
const addVocabForm = document.getElementById('addVocabForm');
addVocabForm.addEventListener('submit', function (event) {

    event.preventDefault();
    const alleKategorien = kategorienAbrufen();
    const kategorie = alleKategorien[dom.kategorieselect.selectedIndex];
    console.log(kategorie);
    const deutschesWort = document.getElementById('deutschesWort').value.trim();
    const fremdSpracheWort = document.getElementById('englischesWort').value.trim();

    // Neues Vokabelobjekt erstellen
    const neueVokabel = {
        wort: deutschesWort.trim(),
        fremdsprache: fremdSpracheWort.trim()
    };

    const vocabList = getVocabList();
    if (!vocabList[kategorie]) {
        // Falls nicht, erstellen  ein neues leeres Array für diese Kategorie.
        vocabList[kategorie] = [];
    }
    // Objekt wird in das zugehörige Katgegorie objekt gepushed
    vocabList[kategorie].push(neueVokabel);
    console.log(`Vokabel '${deutschesWort}' zu Kategorie '${kategorie}' hinzugefügt.`);


    speichereVokabelListe();

    zeigeFeedback();
    addVocabForm.reset();


    console.log("Aktualisierte Vokabelliste:", vocabList);
});
