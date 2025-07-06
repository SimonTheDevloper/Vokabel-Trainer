
const vocabList = []

document.addEventListener('DOMContentLoaded', () => {
    const addVocabForm = document.getElementById('addVocabForm');
    const deutschesWortInput = document.getElementById('deutschesWort');
    const englischesWortInput = document.getElementById('englischesWort');
    const kategorieInput = document.getElementById('kategorie');
    const submitButton = document.getElementById('submitButton');

    function checkInputs() {
        const allFilled = deutschesWortInput.value.trim() !== "" &&
                          englischesWortInput.value.trim() !== "" &&
                          kategorieInput.value.trim() !== "";

        submitButton.disabled = !allFilled;
        submitButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';

        deutschesWortInput.addEventListener('input', checkInputs);
        englischesWortInput.addEventListener('input', checkInputs);
        kategorieInput.addEventListener('input', checkInputs);
    }
    addVocabForm.addEventListener('submit', function (event) {

        event.preventDefault();
        const deutschesWort = deutschesWortInput.value.trim();
        const englischesWort = englischesWortInput.value.trim();
        const kategorie = kategorieInput.value.trim();

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

        checkInputs()
        localStorage.setItem('vokabelListe', JSON.stringify(vocabList));

        console.log("Aktualisierte Vokabelliste:", vocabList);
    });
    checkInputs();
});
