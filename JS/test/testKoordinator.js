import { ladeVokList } from './vokabelabfrage-Data.js'
import { dom, initDom } from './dom.js';
import { checkJSONWörterBuchStatus } from './vokabelabfrage-Data.js'
import { erstelleDropDown } from './kategorieauswahl.js'
import { zeigeNächsteFrage } from './vokabelAbfrage.js';

document.addEventListener('DOMContentLoaded', () => {
    initDom();
    ladeVokList();
    checkJSONWörterBuchStatus();

    erstelleDropDown();


    dom.kategorieAuswahlForm.addEventListener('submit', (event) => {
        event.preventDefault();
        zeigeNächsteFrage()
    });

});