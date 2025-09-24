import { dom, } from './dom.js';
import { VokabelKategorie } from './kategorieauswahl.js';
import { sichtbarkeitUIStatus } from './sichtbarkeitKoordinator.js';
import { vorlesen } from './vokabelAbfrage-Vorlesen.js';


let i = -1;
let abgefragteEigenschaft = "";
let LösungEigenschaft = "";
let vorleseText;


export function zeigeNächsteFrage() {
    console.log("e")
    i++;
    dom.feedbackAnzeigerichtig.textContent = "";
    dom.eingabeFeld.value = "";
    fortschrittanzeigeUpdata();
    testeObFeldVollIst();

    if (i < VokabelKategorie.length) {
        sichtbarkeitUIStatus('frage');
        let WordNachÜbersetzung = true;
        dom.eingabeFeld.focus();

        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            LösungEigenschaft = "translation";
        } else {
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }

        dom.frageAnzeige.textContent =
            `Was ist die Übersetzung von ${VokabelKategorie[i][abgefragteEigenschaft]}?`;
        console.log(i)
        console.log("eqwe")

    } else {
        // Testende
        sichtbarkeitUIStatus('testEnde');
        dom.buttonBereich.classList.add('hidden');
        console.log("e")
        i = -1;
        VokabelKategorie.length = 0;
    }
}

export function fortschrittanzeigeUpdata() {
    if (VokabelKategorie.length > 0) {
        const fortschrittProzent = ((i + 1) / VokabelKategorie.length) * 100;
        dom.fortschrittText.textContent = `${i + 1} von ${VokabelKategorie.length}`;
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
    let richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];

    vorleseText = richtigeAntwort;
    vorlesen(vorleseText);

    let richtig = benutzerAntwort === richtigeAntwort;

    if (richtig) {
        sichtbarkeitUIStatus('antwortRichtig');
        zeigeFeedback(true, richtigeAntwort);
    } else {
        sichtbarkeitUIStatus('antwortFalsch');
        zeigeFeedback(false, richtigeAntwort);
        VokabelKategorie.push(VokabelKategorie[i]);
    }
}

function zeigeFeedback(richtig, richtigeAntwort) {

    if (richtig) {
        dom.feedbackAnzeigerichtig.textContent = `Richtig! Die Antwort ist: ${richtigeAntwort}`;
    }
    else {
        console.log(VokabelKategorie[i])
        dom.feedbacktextFalsch.textContent = `Falsch! Richtige Antwort: ${richtigeAntwort}`;
        dom.feedbackMessageFalsch.classList.remove('-translate-y-full');

        setTimeout(() => {
            dom.feedbackMessageFalsch.classList.add('-translate-y-full');
        }, 3000);
    }
};
