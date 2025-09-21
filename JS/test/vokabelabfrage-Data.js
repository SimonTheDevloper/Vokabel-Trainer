export let vocabList = [];


export function ladeVokList() {
    const storedVocabList = localStorage.getItem('vokabelListe');
    if (storedVocabList) {
        vocabList = JSON.parse(storedVocabList);
        console.log("Vokabelliste aus localStorage geladen:", vocabList);
    } else {
        console.log("Keine Vokabelliste im localStorage gefunden. Starte mit einer leeren Liste.");
    }
}

export function kategorienAbrufen() {
    const alleKategorienMitWiederholungen = vocabList.map(eintrag => eintrag.category);
    return [...new Set(alleKategorienMitWiederholungen)];
    // Jetzt haben wir ein Array mit jeder Kategorie genau einmal
}
export function checkJSONWörterBuchStatus() {
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

