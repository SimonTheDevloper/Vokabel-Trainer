import { shuffle } from "./vokabelabfrage-Suffle.js";

export let vocabList = {};
export let aktuellVokObjekt = [];

export function ladeVokList() {
    const storedVocabList = localStorage.getItem('vokabelListe');
    if (storedVocabList) {
        vocabList = JSON.parse(storedVocabList);
        console.log("Vokabelliste aus localStorage geladen:", vocabList);
    } else {
        console.log("Keine Vokabelliste im localStorage gefunden.");
    }
}

//export let allkategorienArray = [];

// zurzeit ned benötigt 
export function kategorienAbrufen() {
    return Object.keys(vocabList);
}

/*export function kategorienAbrufen() {
    const gespeicherteKategorien = JSON.parse(localStorage.getItem('allkategorienArray'));
    if (gespeicherteKategorien) allkategorienArray = gespeicherteKategorien;
    return allkategorienArray;
}*/

// Kategorie speichern
export function speichereKategorien() {
    localStorage.setItem('allkategorienArray', JSON.stringify(allkategorienArray));
}
export function checkJSONWörterBuchStatus() {
    if (Object.keys(vocabList).length === 0) {
        console.log("Wörter-Buch ist leer");
        document.getElementById('mainContentContainer').classList.add('hidden');
        document.getElementById('empty-message').classList.remove('hidden');
    } else {
        console.log("Wörter-Buch ist NICHT leer!");
        document.getElementById('mainContentContainer').classList.remove('hidden');
        document.getElementById('empty-message').classList.add('hidden');
    }
}

export function ladeUndMischeKategorie(ausgewählteKategorie) {
    const vokabeln = vocabList[ausgewählteKategorie] || [];
    shuffle(vokabeln);
    return vokabeln;
}
export function speichereVokabelListe() {
    localStorage.setItem('vokabelListe', JSON.stringify(vocabList));
    console.log("Vokabelliste gespeichert:", vocabList);
    console.log("So sieht's im localStorage aus:", localStorage.getItem('vokabelListe'));
}


export function getVocabList() {
    return vocabList;
}
export function getObjekteAusUnits(gewählteUnits) {
    return Object.values(
        Object.fromEntries(
            Object.entries(vocabList).filter(([key]) => gewählteUnits.includes(key))
        )
    ).flat()


}
export function setAndShuffleVokabeln(vokabelnArray) {
    // 1. Tiefe Kopie erstellen (oder Sie übergeben die Kopie bereits)
    const vokabelnZurVerarbeitung = structuredClone(vokabelnArray);

    // 2. Hier erfolgt die Zuweisung, wo die Variable als 'let' bekannt ist!
    aktuellVokObjekt = shuffle(vokabelnZurVerarbeitung);
}
export function getAktuelleVokabel(eigenschaftName, aktuellerIndex) {
    return aktuellVokObjekt[aktuellerIndex][eigenschaftName];
}