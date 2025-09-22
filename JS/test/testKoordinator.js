import { ladeVokList, checkJSONWörterBuchStatus, kategorienAbrufen, ladeUndMischeKategorie } from './vokabelabfrage-Data.js'
import { dom, initDom } from './dom.js';
import { erstelleDropDown, VokabelKategorie, zurückzuKategorieAuswahl } from './kategorieauswahl.js'
import { zeigeNächsteFrage, überprüfeAntwort } from './vokabelAbfrage.js';


document.addEventListener('DOMContentLoaded', () => {
    initDom();
    ladeVokList();
    checkJSONWörterBuchStatus();

    erstelleDropDown();


    dom.kategorieAuswahlForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const alleKategorien = kategorienAbrufen();
        const ausgewählteKategorie = alleKategorien[dom.kategorieselect.selectedIndex];

        dom.kategorieAuswahlForm.classList.add('hidden');
        dom.vokabelAbfrageBereich.classList.remove('hidden');
        dom.vokabelAbfrageInput.classList.remove('hidden');
        dom.buttonBereich.classList.remove('hidden');

        // Achtung: VokabelKategorie ist ein importiertes "let" → du kannst es nicht neu deklarieren, nur überschreiben:
        VokabelKategorie.length = 0;
        VokabelKategorie.push(...ladeUndMischeKategorie(ausgewählteKategorie));
        console.log(VokabelKategorie);

        zeigeNächsteFrage();
        console.log("hi");
        dom.antwortButton.addEventListener('click', überprüfeAntwort);
        dom.eingabeFeld.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                überprüfeAntwort();
            }
        });
        dom.weiterButton.addEventListener('click', zeigeNächsteFrage);
        dom.zurückZurKategorieAuswahlBtn.addEventListener('click', zurückzuKategorieAuswahl);
    });
});
