import { zeigeFeedback } from './hinzufügenUI.js'
let vocabList;
vocabList = JSON.parse(localStorage.getItem('vokabelListe')) || [];

document.addEventListener('DOMContentLoaded', () => {

    const addVocabForm = document.getElementById('addVocabForm');
    addVocabForm.addEventListener('submit', function (event) {

        event.preventDefault();
        const deutschesWort = document.getElementById('deutschesWort').value.trim();
        const englischesWort = document.getElementById('englischesWort').value.trim();
        const kategorie = document.getElementById('kategorie').value.trim();

        // Neues Vokabelobjekt erstellen
        const neueVokabel = {
            word: deutschesWort,
            translation: englischesWort,
            category: kategorie,
            zuvorFalsch: false,
        };

        vocabList.push(neueVokabel);

        console.log(`Vokabel "${deutschesWort} - ${englischesWort}" wurde hinzugefügt.`);
        zeigeFeedback();
        addVocabForm.reset();

        localStorage.setItem('vokabelListe', JSON.stringify(vocabList));

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
});