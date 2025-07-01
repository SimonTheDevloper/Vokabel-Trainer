<<<<<<< HEAD
console.log("test")
let select = document.getElementById("testSelection"); 
let options = ["1", "2", "3", "4", "5"]; 

// Optional: Clear all existing options first:
select.innerHTML = "";
// Populate list with options:
for(var index = 0; index < options.length; index++) {
    var opt = options[index];
    select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
}


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

document.addEventListener('DOMContentLoaded', () => {
    vokabelAbfrageBereich = document.getElementById('vokabelAbfrageBereich');
    frageAnzeige = document.getElementById('frageAnzeige');
    eingabeFeld = document.getElementById('eingabeFeld');
    antwortButton = document.getElementById('antwortButton');
    feedbackAnzeige = document.getElementById('feedbackAnzeige');
    testAbschlussAnzeige = document.getElementById('testAbschluss');
    weiterButton = document.getElementById('weiterButton');
    kakategorieAuswahl = document.getElementById("kategorieAuswahl");
    vokabelAbfrageBereich = document.getElementById("vokabelAbfrageBereich");
    kategorieEingabeFeld = document.getElementById('kategorie')


    kakategorieAuswahl.addEventListener('submit', function (event) {
        event.preventDefault();

        kategorieAuswahl.style.display = 'none';

        vokabelAbfrageBereich.style.display = 'block';
        
        const ausgewählteKategorie = kategorieEingabeFeld.value.trim();

        if (ausgewählteKategorie) {
            VokabelKategorie = vocabList.filter(entry => entry.category === ausgewählteKategorie);

            if (VokabelKategorie.length > 0) {
                shuffle(VokabelKategorie);
                console.log(VokabelKategorie);
                zeigeNächsteFrage()
                testAbschlussAnzeige.textContent = "";

            } else {
                alert(`Keine Vokabeln für die Kategorie "${ausgewählteKategorie}" gefunden.`);
            }
        } else {
            alert("Bitte gib eine Kategorie ein, um den Test zu starten.");
        }
    });
    antwortButton.addEventListener('click', überprüfeAntwort);
    eingabeFeld.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            überprüfeAntwort();
        }
    });
    weiterButton.addEventListener('click', zeigeNächsteFrage);
});


function zeigeNächsteFrage() {
    i++;
    feedbackAnzeige.textContent = "";
    eingabeFeld.value = "";
    if (i < VokabelKategorie.length) {
        WordNachÜbersetzung = true;
        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            LösungEigenschaft = "translation";
        } else {
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }

        frageText = "Was ist die Übersetzung von " + VokabelKategorie[i][abgefragteEigenschaft] + " ?";
        frageAnzeige.textContent = frageText;

    } else {
        testAbschlussAnzeige.textContent = "Der Test ist beendet!";
        console.log("Deine Abfrage ist Fertig");
        alert("Deine Abfrage ist zu Ende");

        kategorieAuswahl.style.display = 'flex';
        vokabelAbfrageBereich.style.display = 'none';
        i = -1;
        VokabelKategorie = [];
        
    }
}
function überprüfeAntwort() {
    const benutzerAntwort = eingabeFeld.value.trim();
    const richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];

    if (benutzerAntwort === richtigeAntwort) {
        feedbackAnzeige.textContent = "Ja ist Richtig!";

    } else {
        feedbackAnzeige.textContent = "Nein ist Falsch! Das Richtige ist: " + richtigeAntwort;
    }

}
/*function geheZurNaechstenFrage() {
    feedbackAnzeige.textContent = ""; // Feedback zurücksetzen
    zeigeNächsteFrage(); // Zeige die nächste Frage
}*/
// Funktion zum Mischen eines Arrays (Fisher-Yates-Algorithmus)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
=======
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

document.addEventListener('DOMContentLoaded', () => {
    vokabelAbfrageBereich = document.getElementById('vokabelAbfrageBereich');
    frageAnzeige = document.getElementById('frageAnzeige');
    eingabeFeld = document.getElementById('eingabeFeld');
    antwortButton = document.getElementById('antwortButton');
    feedbackAnzeige = document.getElementById('feedbackAnzeige');
    testAbschlussAnzeige = document.getElementById('testAbschluss');
    weiterButton = document.getElementById('weiterButton');

    const vokabelKategorieAuswahlForm = document.getElementById('vokabelTester');
    const kategorieEingabeFeld = document.getElementById('kategorie');

    vokabelKategorieAuswahlForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const ausgewählteKategorie = kategorieEingabeFeld.value.trim();

        if (ausgewählteKategorie) {
            VokabelKategorie = vocabList.filter(entry => entry.category === ausgewählteKategorie);

            if (VokabelKategorie.length > 0) {
                shuffle(VokabelKategorie);
                console.log(VokabelKategorie);
                zeigeNächsteFrage()

            } else {
                alert(`Keine Vokabeln für die Kategorie "${ausgewählteKategorie}" gefunden.`);
            }
        } else {
            alert("Bitte gib eine Kategorie ein, um den Test zu starten.");
        }
    });
    antwortButton.addEventListener('click', überprüfeAntwort);
    eingabeFeld.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            überprüfeAntwort();
        }
    });
    weiterButton.addEventListener('click', zeigeNächsteFrage);
});


function zeigeNächsteFrage() {
    i++;
    feedbackAnzeige.textContent = "";
    if (i < VokabelKategorie.length) {
        WordNachÜbersetzung = true;
        if (WordNachÜbersetzung) {
            abgefragteEigenschaft = "word";
            LösungEigenschaft = "translation";
        } else {
            abgefragteEigenschaft = "translation";
            LösungEigenschaft = "word";
        }

        frageText = "Was ist die Übersetzung von " + VokabelKategorie[i][abgefragteEigenschaft] + " ?";
        frageAnzeige.textContent = frageText;

    } else {
        testAbschlussAnzeige.textContent = "Der Test ist beendet!";
        console.log("Deine Abfrage ist Fertig");
        alert("Deine Abfrage ist zu Ende");
    }
}
function überprüfeAntwort() {
    const benutzerAntwort = eingabeFeld.value.trim();
    const richtigeAntwort = VokabelKategorie[i][LösungEigenschaft];

    if (benutzerAntwort === richtigeAntwort) {
        feedbackAnzeige.textContent  = "Ja ist Richtig!";

    } else {
        feedbackAnzeige.textContent = "Nein ist Falsch! Das Richtige ist: " + richtigeAntwort;
    }
     
}
/*function geheZurNaechstenFrage() {
    feedbackAnzeige.textContent = ""; // Feedback zurücksetzen
    zeigeNächsteFrage(); // Zeige die nächste Frage
}*/
// Funktion zum Mischen eines Arrays (Fisher-Yates-Algorithmus)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        [array[i], array[r]] = [array[r], array[i]];
    }
>>>>>>> 7528ccca3164b2ca9550f7fbd122b7b07fe5927d
}