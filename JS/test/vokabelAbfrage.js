import { dom, } from './dom.js';
import { sichtbarkeitUIStatus, verstecke, zeige } from './sichtbarkeitKoordinator.js';
import { aktuellVokObjekt, getAktuelleVokabel } from './vokabelabfrage-Data.js';
import { vorlesen } from './vokabelAbfrage-Vorlesen.js';


let i = -1;
let abgefragteEigenschaft = "";
let LösungEigenschaft = "";
let vorleseText;
let minEinmalFalsch = false;
let aktuellesVokWort;
let aktuellVokFremdWort;

export function zeigeNächsteFrage() {
    i++;
    dom.feedbackAnzeigerichtig.textContent = "";
    dom.eingabeFeld.value = "";
    fortschrittanzeigeUpdata();
    testeObFeldVollIst();
    minEinmalFalsch = false;

    if (i < aktuellVokObjekt.length) {
        sichtbarkeitUIStatus('frage');
        let WordNachÜbersetzung = true;
        dom.eingabeFeld.focus();

        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            aktuellesVokWort = getAktuelleVokabel("wort", i);
            aktuellVokFremdWort = getAktuelleVokabel("fremdsprache", i)
            console.warn(aktuellesVokWort);
            LösungEigenschaft = "translation";
        } else {
            aktuellesVokWort = getAktuelleVokabel("wort", i);
            aktuellVokFremdWort = getAktuelleVokabel("fremdsprache", i);
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }
        if (aktuellVokObjekt[i].zuvorFalsch === true) {
            zeige(dom.fehlerTag);
        } else {
            verstecke(dom.fehlerTag)
        }
        dom.frageAnzeige.textContent =
            `Was ist die Übersetzung von ${aktuellesVokWort}?`;
        console.log(i)

    } else {
        // Testende
        sichtbarkeitUIStatus('testEnde');
        verstecke(dom.buttonBereich);

        console.log("Testende")
        i = -1;
        aktuellVokObjekt.length = 0;
    }
}

export function fortschrittanzeigeUpdata() {
    if (aktuellVokObjekt.length > 0) {
        const fortschrittProzent = ((i + 1) / aktuellVokObjekt.length) * 100;
        dom.fortschrittText.textContent = `${i + 1} von ${aktuellVokObjekt.length}`;
        dom.fortschrittbar.style.width = `${fortschrittProzent}%`;
    } else {
        dom.fortschrittbar.style.width = '0%';
        dom.fortschrittText.textContent = '0 von 0';
    }
};

function testeObFeldVollIst() {
    dom.antwortButton.disabled = true;
    dom.eingabeFeld.addEventListener('input', () => {
        const eigabeFeldVoll = dom.eingabeFeld.value.trim() !== '';
        dom.antwortButton.disabled = !eigabeFeldVoll;
    });
}

export function überprüfeAntwort() {
    const benutzerAntwort = dom.eingabeFeld.value.trim();
    let richtigeAntwort = aktuellVokFremdWort;

    vorleseText = richtigeAntwort;
    vorlesen(vorleseText);

    let richtig = benutzerAntwort === richtigeAntwort;


    if (richtig) {
        sichtbarkeitUIStatus('antwortRichtig');
        zeigeFeedback(true, richtigeAntwort);
        if (minEinmalFalsch) {
            aktuellVokObjekt.push(aktuellVokObjekt[i]);
        }
    } else {
        sichtbarkeitUIStatus('antwortFalsch');
        zeigeFeedback(false, richtigeAntwort);
        aktuellVokObjekt[i].zuvorFalsch = true;
        minEinmalFalsch = true;

    }
}

function zeigeFeedback(richtig, richtigeAntwort) {

    if (richtig) {
        dom.feedbackAnzeigerichtig.textContent = `Richtig! Die Antwort ist: ${richtigeAntwort}`;
    }
    else {
        console.log(aktuellVokObjekt[i])
        dom.feedbacktextFalsch.textContent = `Falsch! Richtige Antwort: ${richtigeAntwort}`;
        dom.feedbackMessageFalsch.classList.remove('-translate-y-full');

        setTimeout(() => {
            dom.feedbackMessageFalsch.classList.add('-translate-y-full');
        }, 3000);
    }
};
