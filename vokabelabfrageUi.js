import { vocabList, ladeVokList, kategorienAbrufen } from './vokabelabfrage-Data.js'
import { shuffle } from './vokabelabfrage-Suffle.js'


let VokabelKategorie = [];
let i = -1;
let abgefragteEigenschaft = "";
let LösungEigenschaft = "";
//Dom
let vokabelAbfrageBereich;
let frageAnzeige;
let eingabeFeld;
let antwortButton;
let feedbackAnzeige;
let weiterButton;
let kakategorieAuswahl;
let testAbschlussBereich;
let vokabelAbfrageInput;
let kategorieEingabeFeld;
let zurückZurKategorieAuswahlBtn;
let kategorieselect;
let kategorieAuswahlForm;
let vokabelAfrageFeedbackBereich;

document.addEventListener('DOMContentLoaded', () => {
    ladeVokList()
    // Vokabelliste laden, wenn das DOM bereit ist
    // DOM-Elemente zuweisen
    frageAnzeige = document.getElementById('frageAnzeige');
    eingabeFeld = document.getElementById('eingabeFeld');
    antwortButton = document.getElementById('checkButton');
    feedbackAnzeige = document.getElementById('feedbackAnzeige');
    testAbschlussBereich = document.getElementById('testZuendeBereich');
    weiterButton = document.getElementById('nextButton');
    kategorieAuswahlForm = document.getElementById("kategorieAuswahl");
    vokabelAbfrageBereich = document.getElementById("vokabelAbfrage");
    kategorieEingabeFeld = document.getElementById('kategorie');
    zurückZurKategorieAuswahlBtn = document.getElementById("zurückZuKategorie");
    vokabelAbfrageInput = document.getElementById('vokabelAbfrageInput')
    vokabelAfrageFeedbackBereich = document.getElementById('vokabelAfrageFeedback')

    erstelleDropDown()
    
    kategorieselect.addEventListener("change", () => {
        const ausgewählteKategorie = kategorienAbrufen()[kategorieselect.selectedIndex];
        console.log("Ausgewählte Kategorie," + ausgewählteKategorie);
    });

    kategorieAuswahlForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const alleKategorien = kategorienAbrufen();
        kategorieAuswahlForm.style.display = 'none';
        vokabelAbfrageBereich.style.display = 'flex'; 
        vokabelAbfrageInput.style.display = 'flex';

        let ausgewählteKategorie = alleKategorien[kategorieselect.selectedIndex];


        VokabelKategorie = vocabList.filter(entry => entry.category === ausgewählteKategorie);
        console.log(VokabelKategorie);
        shuffle(VokabelKategorie);
        console.log(VokabelKategorie);
        zeigeNächsteFrage();
    }
    );

    antwortButton.addEventListener('click', überprüfeAntwort);
    eingabeFeld.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            überprüfeAntwort();
        }
    });
    weiterButton.addEventListener('click', zeigeNächsteFrage);
    zurückZurKategorieAuswahlBtn.addEventListener('click', zurückzuKategorieAuswahl)
    vokabelAbfrageBereich.style.display = 'none';
    vokabelAbfrageInput.style.display = 'none'
    testAbschlussBereich.style.display = 'none';
    vokabelAfrageFeedbackBereich.style.display = 'none'
    kategorieAuswahlForm.style.display = 'flex';
});

function erstelleDropDown() {

    const alleKategorien = kategorienAbrufen();
    if (alleKategorien !== 0) {
        kategorieselect = document.getElementById("testSelection");

        // Optional: Clear all existing options first:
        kategorieselect.innerHTML = "";
        // Populate list with options:
        for (let index = 0; index < alleKategorien.length; index++) {
            let opt = alleKategorien[index];
            kategorieselect.innerHTML += `<option value="${opt}">${opt}</option>`;
        }
    }
}
function zeigeNächsteFrage() {
    i++;
    feedbackAnzeige.textContent = "";
    eingabeFeld.value = "";
    weiterButton.style.display = "none"
    antwortButton.style.display = "flex"
    if (i < VokabelKategorie.length) {
        let WordNachÜbersetzung = true;
        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            LösungEigenschaft = "translation";
        } else {
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }
        eingabeFeld.focus();
        let frageText = "Was ist die Übersetzung von " + VokabelKategorie[i][abgefragteEigenschaft] + " ?";
        frageAnzeige.textContent = frageText;


    } else {
        console.log("Deine Abfrage ist Fertig");
        alert("Deine Abfrage ist zu Ende");
        testAbschlussBereich.style.display = 'flex'
        kategorieAuswahl.style.display = 'none';
        vokabelAbfrageBereich.style.display = 'none';
        vokabelAbfrageInput.style.display = 'none';
        i = -1;
        VokabelKategorie = [];
    }
}

function überprüfeAntwort() {
    const benutzerAntwort = eingabeFeld.value.trim();
    const richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];
    eingabeFeld.value = ""
    vokabelAfrageFeedbackBereich.style.display = 'flex'

    if (benutzerAntwort === richtigeAntwort) {
        eingabeFeld.style.cursor = 'not-allowed'
        feedbackAnzeige.style.color = "#2ecc71";
        feedbackAnzeige.textContent = "Ja, ist richtig!";
        weiterButton.style.display = 'flex';
        antwortButton.style.display = 'none';


    } else {
        feedbackAnzeige.style.color = "#e74c3c";
        feedbackAnzeige.textContent = "Nein, ist falsch! Das Richtige ist: " + richtigeAntwort;
        weiterButton.style.display = 'none';
        antwortButton.style.display = 'flex';
    }
}

function zurückzuKategorieAuswahl() {
    kategorieAuswahl.style.display = 'flex';
    vokabelAbfrageBereich.style.display = 'none';
    testAbschlussBereich.style.display = 'none';
}