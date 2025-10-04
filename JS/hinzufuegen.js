import { zeigeFeedback } from './hinzufügenUI.js'
let vocabList;
vocabList = JSON.parse(localStorage.getItem('vokabelListe')) || {};

document.addEventListener('DOMContentLoaded', () => {

    const addVocabForm = document.getElementById('addVocabForm');
    addVocabForm.addEventListener('submit', function (event) {

        event.preventDefault();
        const deutschesWort = document.getElementById('deutschesWort').value.trim();
        const fremdSpracheWort = document.getElementById('englischesWort').value.trim();
        const kategorie = document.getElementById('kategorie').value.trim();

        // Neues Vokabelobjekt erstellen
        const neueVokabel = {
            wort: deutschesWort.trim(),
            fremdsprache: fremdSpracheWort.trim()
        };

        if (!vocabList[kategorie]) {
            // Falls nicht, erstellen  ein neues leeres Array für diese Kategorie.
            vocabList[kategorie] = [];
        }
        // Objekt wird in das zugehörige Katgegorie objekt gepushed
        vocabList[kategorie].push(neueVokabel);
        console.log(`Vokabel '${deutschesWort}' zu Kategorie '${kategorie}' hinzugefügt.`);



        zeigeFeedback();
        addVocabForm.reset();

        localStorage.setItem('vokabelListe', JSON.stringify(vocabList));

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
});