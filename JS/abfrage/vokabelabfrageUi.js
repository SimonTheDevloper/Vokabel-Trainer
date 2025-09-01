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
let feedbackAnzeige;
let testAbschlussBereich;
let weiterButton;
let kategorieAuswahlForm;
let vokabelAbfrageBereich;
let zurückZurKategorieAuswahlBtn;
let vokabelAbfrageInput;
let vokabelAfrageFeedbackBereich;
let kategorieselect;
let buttonBereich;
let feedbackMessage;
let feedbacktext;

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
    feedbackAnzeige = document.getElementById('feedbackAnzeige');
    testAbschlussBereich = document.getElementById('testZuendeBereich');
    weiterButton = document.getElementById('nextButton');
    kategorieAuswahlForm = document.getElementById('kategorieAuswahl');
    vokabelAbfrageBereich = document.getElementById('vokabelAbfrage');
    zurückZurKategorieAuswahlBtn = document.getElementById('zurückZuKategorie');
    vokabelAbfrageInput = document.getElementById('eingabeFeld');
    vokabelAfrageFeedbackBereich = document.getElementById('feedbackAnzeige');
    buttonBereich = document.getElementById('buttonBereich');
    kategorieselect = document.getElementById('testSelection');
    feedbackMessage = document.getElementById('feedbackMessage');
    feedbacktext = document.getElementById('feedbacktext')

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
        vokabelAfrageFeedbackBereich.classList.add('hidden');
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
    vokabelAfrageFeedbackBereich.classList.add('hidden');
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
    feedbackAnzeige.textContent = "";
    eingabeFeld.value = "";

    // Sichtbarkeit zurücksetzen
    vokabelAfrageFeedbackBereich.classList.add('hidden');
    vokabelAbfrageInput.classList.remove('hidden');
    antwortButton.classList.remove('hidden');
    weiterButton.classList.add('hidden');
    buttonBereich.classList.remove('hidden');

    if (i < VokabelKategorie.length) {
        let WordNachÜbersetzung = true;
        eingabeFeld.focus();
        fortschrittanzeigeUpdata()

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
        vokabelAfrageFeedbackBereich.classList.add('hidden');
        testAbschlussBereich.classList.remove('hidden');
        buttonBereich.classList.add('hidden');
        i = -1;
        VokabelKategorie = [];
    }
}
function fortschrittanzeigeUpdata() {
    const fortschrittText = document.getElementById("progressText");
    const fortschrittbar = document.getElementById("progressBar");

    const fortschrittProzent = ((i + 1) / VokabelKategorie.length) * 100;
    fortschrittText.textContent = `${i + 1} von ${VokabelKategorie.length}`;
    fortschrittbar.style.width = `${fortschrittProzent}%`;
}
function überprüfeAntwort() {
    const benutzerAntwort = eingabeFeld.value.trim();
    let richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];

    // Sichtbarkeit aktualisieren
    vokabelAfrageFeedbackBereich.classList.remove('hidden');
    let richtig = benutzerAntwort === richtigeAntwort
    if (richtig) {
        feedbackAnzeige.textContent = `Richtig! Die Antwort ist: ${richtigeAntwort}`;
        feedbackAnzeige.className = 'flex-1 justify-center items-center text-center text-lg font-semibold text-green-600';
        zeigeFeedback(true, richtigeAntwort);
        vokabelAbfrageInput.classList.add('hidden');
        antwortButton.classList.add('hidden');
        weiterButton.classList.remove('hidden');
    } else {
        feedbackAnzeige.textContent = `Falsch! Richtige Antwort: ${richtigeAntwort}`;
        feedbackAnzeige.className = 'flex-1 justify-center items-center text-center text-lg font-semibold text-red-600';
        zeigeFeedback(false, richtigeAntwort);
        antwortButton.classList.remove('hidden');
        weiterButton.classList.add('hidden');
    }
}

function zurückzuKategorieAuswahl() {
    antwortButton.classList.add('hidden');
    kategorieAuswahlForm.classList.remove('hidden');
    vokabelAbfrageBereich.classList.add('hidden');
    vokabelAbfrageInput.classList.add('hidden');
    testAbschlussBereich.classList.add('hidden');
    vokabelAfrageFeedbackBereich.classList.add('hidden');

    // Zustand zurücksetzen
    i = -1;
    VokabelKategorie = [];
}
function zeigeFeedback(richtig, richtigeAntwort) {

    if (richtig) {
        feedbacktext.textContent = `Richtig! Die Antwort ist: ${richtigeAntwort}`
        feedbacktext.className = 'flex-1 justify-center items-center text-center text-lg font-semibold text-green-600';
    }
    else {
        feedbacktext.textContent = `Falsch! Richtige Antwort: ${richtigeAntwort}`;
    }
    // Slide in
    feedbackMessage.classList.remove('-translate-y-full');

    // Slide out after 3 seconds
    setTimeout(() => {
        feedbackMessage.classList.add('-translate-y-full');
    }, 3000);
};
