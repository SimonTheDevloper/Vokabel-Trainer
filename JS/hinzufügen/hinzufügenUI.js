
const addButton = document.querySelector('button[type="submit"]');
const feedbackMessage = document.getElementById("feedback-message");
const inputFields = document.querySelectorAll('input');
// zurzeit ned möglich //
/*inputFields.forEach(input => {
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
}); */

export function zeigeFeedback() {
    feedbackMessage.classList.remove('-translate-y-full');

    setTimeout(() => {
        feedbackMessage.classList.add('-translate-y-full');
    }, 3000);
};
