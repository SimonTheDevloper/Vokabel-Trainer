import { ladeVokList, checkJSONWörterBuchStatus, kategorienAbrufen, ladeUndMischeKategorie, getObjekteAusUnits, aktuellVokObjekt } from './vokabelabfrage-Data.js'
import { dom, initDom } from './dom.js';
import { erstelleDropDown, zurückzuKategorieAuswahl } from './kategorieauswahl.js'
import { zeigeNächsteFrage, überprüfeAntwort } from './vokabelAbfrage.js';
import { shuffle } from './vokabelabfrage-Suffle.js';


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

        getObjekteAusUnits(ausgewählteKategorie);

        console.log(aktuellVokObjekt);
        shuffle(aktuellVokObjekt);
        console.log(aktuellVokObjekt);

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
