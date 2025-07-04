let vocabList = [];
let VokabelKategorie = [];
let i = -1;
let abgefragteEigenschaft = "";
let LösungEigenschaft = "";
let vokabelAbfrageBereich;
let frageAnzeige;
let eingabeFeld;
let antwortButton;
let feedbackAnzeige;
let testAbschlussAnzeige;
let weiterButton;

const storedVocabList = localStorage.getItem('vokabelListe');
if (storedVocabList) {
    vocabList = JSON.parse(storedVocabList);
    console.log("Vokabelliste aus localStorage geladen:", vocabList);
} else {
    console.log("Keine Vokabelliste im localStorage gefunden. Starte mit einer leeren Liste.");
}

// 1. Wir holen alle Kategorien aus dem Array (darf auch doppelt sein)
const alleKategorienMitWiederholungen = vocabList.map(eintrag => eintrag.category);

// 2. Wir entfernen doppelte Einträge mit einem Set
const alleKategorien = [...new Set(alleKategorienMitWiederholungen)];

// Jetzt haben wir ein Array mit jeder Kategorie genau einmal
console.log(alleKategorien);

console.log("test");
let select = document.getElementById("testSelection");

// Optional: Clear all existing options first:
select.innerHTML = "";
// Populate list with options:
for (let index = 0; index < alleKategorien.length; index++) {
    let opt = alleKategorien[index];
    select.innerHTML += `<option value="${opt}">${opt}</option>`;
}

document.addEventListener('DOMContentLoaded', () => {
    vokabelAbfrageBereich = document.getElementById('vokabelAbfrageBereich');
    frageAnzeige = document.getElementById('frageAnzeige');
    eingabeFeld = document.getElementById('eingabeFeld');
    antwortButton = document.getElementById('checkButton');
    feedbackAnzeige = document.getElementById('feedbackAnzeige');
    testAbschlussBereich = document.getElementById('testZuendeBereich');
    weiterButton = document.getElementById('nextButton');
    kakategorieAuswahl = document.getElementById("kategorieAuswahl");
    vokabelAbfrageBereich = document.getElementById("vokabelAbfrageBereich");
    kategorieEingabeFeld = document.getElementById('kategorie');
    zurückZurKategorieAuswahlBtn = document.getElementById("zurückZuKategorie");

    select.addEventListener("change", () => {
        var ausgewählteKategorie = alleKategorien[select.selectedIndex];
        console.log("Ausgewählte Kategorie," + ausgewählteKategorie);
    });

    kakategorieAuswahl.addEventListener('submit', function (event) {
        event.preventDefault();

        kategorieAuswahl.style.display = 'none';
        vokabelAbfrageBereich.style.display = 'flex'; // hier war der Fehler statt block -> Flex dann funktoniert auch Button

        let ausgewählteKategorie = alleKategorien[select.selectedIndex];


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
});

function zeigeNächsteFrage() {
    i++;
    feedbackAnzeige.textContent = "";
    eingabeFeld.value = "";
    if (i < VokabelKategorie.length) {
        let WordNachÜbersetzung = true;
        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            LösungEigenschaft = "translation";
        } else {
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }
        eingabeFeld.focus(); // 
        let frageText = "Was ist die Übersetzung von " + VokabelKategorie[i][abgefragteEigenschaft] + " ?";
        frageAnzeige.textContent = frageText;


    } else {
        console.log("Deine Abfrage ist Fertig");
        alert("Deine Abfrage ist zu Ende");
        testAbschlussBereich.style.display = 'flex'
        kategorieAuswahl.style.display = 'none';
        vokabelAbfrageBereich.style.display = 'none';
        i = -1;
        VokabelKategorie = [];
    }
}

function überprüfeAntwort() {
    const benutzerAntwort = eingabeFeld.value.trim();
    const richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];
    eingabeFeld.value = ""
    
    
    if (benutzerAntwort === richtigeAntwort) {
        feedbackAnzeige.textContent = "Ja, ist richtig!";
        weiterButton.style.display = 'flex';
        antwortButton.style.display = 'none';
    } else {
        feedbackAnzeige.textContent = "Nein, ist falsch! Das Richtige ist: " + richtigeAntwort;
    }
}

function zurückzuKategorieAuswahl() {
        kategorieAuswahl.style.display = 'flex';
        vokabelAbfrageBereich.style.display = 'none';
        testAbschlussBereich.style.display = 'none';
}

// Funktion zum Mischen eines Arrays (Fisher-Yates-Algorithmus)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
}
