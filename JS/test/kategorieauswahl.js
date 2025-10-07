import { aktuellVokObjekt, kategorienAbrufen } from './vokabelabfrage-Data.js'
import { dom } from './dom.js';


export function erstelleDropDown() {
    const alleKategorien = kategorienAbrufen();
    if (alleKategorien.length > 0) {
        dom.kategorieselect = document.getElementById('testSelection');
        dom.kategorieselect.innerHTML = "";

        alleKategorien.forEach(kategorie => {
            let option = document.createElement('option');
            option.value = kategorie;
            option.textContent = kategorie;
            dom.kategorieselect.appendChild(option);
        });
    }
}


export function zurückzuKategorieAuswahl() {
    dom.antwortButton.classList.add('hidden');
    dom.kategorieAuswahlForm.classList.remove('hidden');
    dom.vokabelAbfrageBereich.classList.add('hidden');
    dom.vokabelAbfrageInput.classList.add('hidden');
    dom.testAbschlussBereich.classList.add('hidden');
    dom.FeedbackMessageRichtig.classList.add('hidden');

    aktuellVokObjekt.length = 0;
}