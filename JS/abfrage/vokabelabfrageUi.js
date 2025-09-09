import { vocabList, ladeVokList, kategorienAbrufen } from './vokabelabfrage-Data.js'
import { shuffle } from './vokabelabfrage-Suffle.js'




let VokabelKategorie = [];
let i = -1;
let abgefragteEigenschaft = "";
let LösungEigenschaft = "";

// DOM-Elemente
let frageAnzeige;
let eingabeFeld;
let antwortButton;
let feedbackAnzeigerichtig;
let testAbschlussBereich;
let weiterButton;
let kategorieAuswahlForm;
let vokabelAbfrageBereich;
let zurückZurKategorieAuswahlBtn;
let vokabelAbfrageInput;
let FeedbackMessageRichtig;
let kategorieselect;
let buttonBereich;
let feedbackMessageFalsch;
let feedbacktextFalsch;

function checkJSONWörterBuchStatus() {
    if (Object.keys(vocabList).length == 0) {
        console.log("Wörter-Buch ist leer");
        document.getElementById('mainContentContainer').classList.add('hidden');
        document.getElementById('empty-message').classList.remove('hidden');

    } else {
        console.log("Wörter-Buch ist NICHT leer!");
        document.getElementById('mainContentContainer').classList.remove('hidden');
        document.getElementById('empty-message').classList.add('hidden');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    ladeVokList();
    checkJSONWörterBuchStatus();
    frageAnzeige = document.getElementById('frageAnzeige');
    eingabeFeld = document.getElementById('eingabeFeld');
    antwortButton = document.getElementById('checkButton');
    feedbackAnzeigerichtig = document.getElementById('feedbackAnzeigeRichtig');
    testAbschlussBereich = document.getElementById('testZuendeBereich');
    weiterButton = document.getElementById('nextButton');
    kategorieAuswahlForm = document.getElementById('kategorieAuswahl');
    vokabelAbfrageBereich = document.getElementById('vokabelAbfrage');
    zurückZurKategorieAuswahlBtn = document.getElementById('zurückZuKategorie');
    vokabelAbfrageInput = document.getElementById('eingabeFeld');
    FeedbackMessageRichtig = document.getElementById('feedbackAnzeigeRichtig');
    buttonBereich = document.getElementById('buttonBereich');
    kategorieselect = document.getElementById('testSelection');
    feedbackMessageFalsch = document.getElementById('feedbackMessageFalsch');
    feedbacktextFalsch = document.getElementById('feedbacktextFalsch');
    erstelleDropDown();

    kategorieAuswahlForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const alleKategorien = kategorienAbrufen();
        let ausgewählteKategorie = alleKategorien[kategorieselect.selectedIndex];

        // Sichtbarkeit aktualisieren
        kategorieAuswahlForm.classList.add('hidden');
        vokabelAbfrageBereich.classList.remove('hidden');
        vokabelAbfrageInput.classList.remove('hidden');
        testAbschlussBereich.classList.add('hidden');
        FeedbackMessageRichtig.classList.add('hidden');
        weiterButton.classList.add('hidden');
        antwortButton.classList.add('hidden');
        buttonBereich.classList.remove('hidden');

        VokabelKategorie = vocabList.filter(entry => entry.category === ausgewählteKategorie);
        shuffle(VokabelKategorie);
        zeigeNächsteFrage();
    });

    antwortButton.addEventListener('click', überprüfeAntwort);
    eingabeFeld.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            überprüfeAntwort();
        }
    });
    weiterButton.addEventListener('click', zeigeNächsteFrage);
    zurückZurKategorieAuswahlBtn.addEventListener('click', zurückzuKategorieAuswahl);

    // Initiale Sichtbarkeit
    kategorieAuswahlForm.classList.remove('hidden');
    vokabelAbfrageBereich.classList.add('hidden');
    vokabelAbfrageInput.classList.add('hidden');
    testAbschlussBereich.classList.add('hidden');
    FeedbackMessageRichtig.classList.add('hidden');
    weiterButton.classList.add('hidden');
    buttonBereich.classList.add('hidden');
});

function erstelleDropDown() {
    const alleKategorien = kategorienAbrufen();
    if (alleKategorien.length > 0) {
        kategorieselect = document.getElementById('testSelection');
        kategorieselect.innerHTML = "";

        alleKategorien.forEach(kategorie => {
            let option = document.createElement('option');
            option.value = kategorie;
            option.textContent = kategorie;
            kategorieselect.appendChild(option);
        });
    }
}

function zeigeNächsteFrage() {
    i++;
    feedbackAnzeigerichtig.textContent = "";
    eingabeFeld.value = "";
    fortschrittanzeigeUpdata();
    testeObFeldVollIst();
    // Sichtbarkeit zurücksetzen
    FeedbackMessageRichtig.classList.add('hidden');
    vokabelAbfrageInput.classList.remove('hidden');
    antwortButton.classList.remove('hidden');
    weiterButton.classList.add('hidden');
    buttonBereich.classList.remove('hidden');

    if (i < VokabelKategorie.length) {
        let WordNachÜbersetzung = true;
        eingabeFeld.focus();

        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            LösungEigenschaft = "translation";
        } else {
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }

        frageAnzeige.textContent = `Was ist die Übersetzung von ${VokabelKategorie[i][abgefragteEigenschaft]}?`;
    } else {
        // Testende
        kategorieAuswahlForm.classList.add('hidden');
        vokabelAbfrageBereich.classList.add('hidden');
        vokabelAbfrageInput.classList.add('hidden');
        FeedbackMessageRichtig.classList.add('hidden');
        testAbschlussBereich.classList.remove('hidden');
        buttonBereich.classList.add('hidden');
        i = -1;
        VokabelKategorie = [];
    }
}
function testeObFeldVollIst() {
    antwortButton.disabled = true;
    eingabeFeld.addEventListener('input', () => {
        const eigabeFeldVoll = eingabeFeld.value.trim() !== '';
        antwortButton.disabled = !eigabeFeldVoll;
    });
}

function fortschrittanzeigeUpdata() {
    if (VokabelKategorie.length > 0) {
        const fortschrittText = document.getElementById("progressText");
        const fortschrittbar = document.getElementById("progressBar");

        const fortschrittProzent = ((i + 1) / VokabelKategorie.length) * 100;
        fortschrittText.textContent = `${i + 1} von ${VokabelKategorie.length}`;
        fortschrittbar.style.width = `${fortschrittProzent}%`;
    } else {
        progressBar.style.width = '0%';
        progressText.textContent = '0 von 0';
    }
};
function überprüfeAntwort() {
    const benutzerAntwort = eingabeFeld.value.trim();
    let richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];

    // Sichtbarkeit aktualisieren
    FeedbackMessageRichtig.classList.remove('hidden');
    let richtig = benutzerAntwort === richtigeAntwort
    if (richtig) {
        zeigeFeedback(true, richtigeAntwort);
        vokabelAbfrageInput.classList.add('hidden');
        antwortButton.classList.add('hidden');
        weiterButton.classList.remove('hidden');
    } else {
        zeigeFeedback(false, richtigeAntwort);
        antwortButton.classList.remove('hidden');
        weiterButton.classList.add('hidden');
        VokabelKategorie.push(VokabelKategorie[i])
    }
}

function zurückzuKategorieAuswahl() {
    antwortButton.classList.add('hidden');
    kategorieAuswahlForm.classList.remove('hidden');
    vokabelAbfrageBereich.classList.add('hidden');
    vokabelAbfrageInput.classList.add('hidden');
    testAbschlussBereich.classList.add('hidden');
    FeedbackMessageRichtig.classList.add('hidden');

    // Zustand zurücksetzen
    i = -1;
    VokabelKategorie = [];
}
function zeigeFeedback(richtig, richtigeAntwort) {

    if (richtig) {
        feedbackAnzeigerichtig.textContent = `Richtig! Die Antwort ist: ${richtigeAntwort}`;
        feedbackMessageFalsch.classList.add('hidden');
        feedbackAnzeigerichtig.classList.remove('hidden');
    }
    else {
        console.log(VokabelKategorie[i])
        feedbackMessageFalsch.classList.remove('hidden');
        feedbackAnzeigerichtig.classList.add('hidden')
        feedbacktextFalsch.textContent = `Falsch! Richtige Antwort: ${richtigeAntwort}`;
        feedbackMessageFalsch.classList.remove('-translate-y-full');

        setTimeout(() => {
            feedbackMessageFalsch.classList.add('-translate-y-full');
        }, 3000);
    }

};

