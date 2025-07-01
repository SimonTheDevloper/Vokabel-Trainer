<<<<<<< HEAD
const vocabList = []

document.addEventListener('DOMContentLoaded', () => {

    const addVocabForm = document.getElementById('addVocabForm');
    addVocabForm.addEventListener('submit', function(event) {

        event.preventDefault();
        const deutschesWort = document.getElementById('deutschesWort').value.trim();
        const englischesWort = document.getElementById('englischesWort').value.trim();
        const kategorie = document.getElementById('kategorie').value.trim();

        // Neues Vokabelobjekt erstellen
            const neueVokabel = {
            word: deutschesWort,
            translation: englischesWort,
            category: kategorie,
        };
        // Hier wird ein neues JavaScript-Objekt namens 'neueVokabel' erstellt.
        // Dieses Objekt hat Schlüssel ('word', 'translation', 'category', 'note', 'favorite')
        vocabList.push(neueVokabel);

        alert(`Vokabel "${deutschesWort} - ${englischesWort}" wurde hinzugefügt.`);
        addVocabForm.reset();

        localStorage.setItem('vokabelListe', JSON.stringify(vocabList));

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
=======
const vocabList = []

document.addEventListener('DOMContentLoaded', () => {

    const addVocabForm = document.getElementById('addVocabForm');
    addVocabForm.addEventListener('submit', function(event) {

        event.preventDefault();
        const deutschesWort = document.getElementById('deutschesWort').value.trim();
        const englischesWort = document.getElementById('englischesWort').value.trim();
        const kategorie = document.getElementById('kategorie').value.trim();

        // Neues Vokabelobjekt erstellen
            const neueVokabel = {
            word: deutschesWort,
            translation: englischesWort,
            category: kategorie,
        };
        // Hier wird ein neues JavaScript-Objekt namens 'neueVokabel' erstellt.
        // Dieses Objekt hat Schlüssel ('word', 'translation', 'category', 'note', 'favorite')
        vocabList.push(neueVokabel);

        alert(`Vokabel "${deutschesWort} - ${englischesWort}" wurde hinzugefügt.`);
        addVocabForm.reset();

        localStorage.setItem('vokabelListe', JSON.stringify(vocabList));

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
>>>>>>> 7528ccca3164b2ca9550f7fbd122b7b07fe5927d
});