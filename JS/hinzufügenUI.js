// Wir wählen den Button aus, den wir später aktivieren wollen.
let addButton = document.querySelector('button[type="submit"]');

// Wir finden alle Eingabefelder auf der Seite, um sie im Auge zu behalten.
let inputFields = document.querySelectorAll('input');

// Wir gehen jedes einzelne Eingabefeld durch...
inputFields.forEach(input => {
    // ...und horchen darauf, wenn der Nutzer etwas tippt.
    input.addEventListener('input', () => {

        // Wir prüfen, ob alle Felder einen Text enthalten, der nicht nur aus Leerzeichen besteht.
        // Das ist die Hauptbedingung für unseren Button.
        const allFieldsFilled = Array.from(inputFields).every(field => field.value.trim() !== '');
        if (allFieldsFilled) {
            addButton.disabled = false;
        } else {
            addButton.disabled = true;
        }
    });
});