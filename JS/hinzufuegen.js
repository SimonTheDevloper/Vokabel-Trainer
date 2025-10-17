import { zeigeFeedback } from './hinzufügenUI.js'
import { erstelleDropDown, } from './test/kategorieauswahl.js';
import { checkJSONWörterBuchStatus, getVocabList, kategorienAbrufen, ladeVokList, speichereVokabelListe } from './test/vokabelabfrage-Data.js';

let kategorie;

document.addEventListener('DOMContentLoaded', () => {
    ladeVokList();
    erstelleDropDown();
    const auswahl = document.getElementById('kategorieAuswahl');
    const kategorieselect = document.getElementById('testSelection');
    const zeigeVokFormButton = document.getElementById('weiterZuVokeingabe');
    const addVocabForm = document.getElementById('addVocabForm')
    const addKategorieFormButton = document.getElementById('neueKategorieButton');
    const addKategorieForm = document.getElementById('neueKategorieForm');
    const zurückButtons = document.querySelectorAll(".zurückZuAuswahlButton");

    addKategorieFormButton.addEventListener('click', zeigeNewKategorieForm);
    zeigeVokFormButton.addEventListener('click', zeigeNewVokForm)
    zurückButtons.forEach(button => {
        button.addEventListener('click', zurückZuAuswahl);
    });

    function zeigeNewKategorieForm() {
        console.log('Kategorieformular anzeigen');
        auswahl.classList.add('hidden');
        addVocabForm.classList.add('hidden')
        addKategorieForm.classList.remove('hidden');
    }

    function zeigeNewVokForm() {
        console.log('Vokabeleingabeformular anzeigen');
        const alleKategorien = kategorienAbrufen();
        kategorie = alleKategorien[kategorieselect.selectedIndex];
        console.log('Ausgewählte Kategorie:', kategorie);

        auswahl.classList.add('hidden');
        addVocabForm.classList.remove('hidden');
    }
    addVocabForm.addEventListener('submit', function (event) {

        event.preventDefault();
        console.log(kategorie);
        const deutschesWort = document.getElementById('deutschesWort').value.trim();
        const fremdSpracheWort = document.getElementById('englischesWort').value.trim();

        // Neues Vokabelobjekt erstellen
        const neueVokabel = {
            wort: deutschesWort.trim(),
            fremdsprache: fremdSpracheWort.trim()
        };

        const vocabList = getVocabList();
        // Objekt wird in das zugehörige Katgegorie objekt gepushed
        vocabList[kategorie].push(neueVokabel);
        console.log(`Vokabel '${deutschesWort}' zu Kategorie '${kategorie}' hinzugefügt.`);

        speichereVokabelListe();

        zeigeFeedback();
        addVocabForm.reset();

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
    function zurückZuAuswahl() {
        auswahl.classList.remove('hidden');
        addVocabForm.classList.add('hidden');
        addKategorieForm.classList.add('hidden');
        console.log("w")

    }
    addKategorieForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const kategorieInput = document.getElementById('kategorieName')
        const kategorieName = kategorieInput.value.trim();
        const vokabeln = getVocabList();
        vokabeln[kategorieName] = [];
        speichereVokabelListe();
        zeigeFeedback()

        /*vokabeln[kategorieInput] = [];
        speichereVokabelListe();*/
        console.log(vokabeln);

    });
});


