import { dom } from "./dom.js";

export function zeige(element) {
    element.classList.remove('hidden')
};

export function verstecke(element) {
    element.classList.ad('hidden')
};

export function sichtbarkeitUIStatus(status) {
    dom.kategorieAuswahlForm.classList.add('hidden');
    dom.vokabelAbfrageBereich.classList.add('hidden');
    dom.testAbschlussBereich.classList.add('hidden');

    switch (status) {
        case 'frage':
            dom.vokabelAbfrageBereich.classList.remove('hidden');
            dom.vokabelAbfrageInput.classList.remove('hidden');
            dom.antwortButton.classList.remove('hidden');
            dom.weiterButton.classList.add('hidden');
            dom.FeedbackMessageRichtig.classList.add('hidden');
            dom.buttonBereich.classList.remove('hidden');
            break;
        case 'antwortRichtig':
            dom.vokabelAbfrageBereich.classList.remove('hidden');
            dom.vokabelAbfrageInput.classList.add('hidden');
            dom.antwortButton.classList.add('hidden');
            dom.weiterButton.classList.remove('hidden');
            dom.FeedbackMessageRichtig.classList.remove('hidden');
            break;
        case 'antwortFalsch':
            dom.vokabelAbfrageBereich.classList.remove('hidden');
            dom.vokabelAbfrageInput.classList.remove('hidden');
            dom.antwortButton.classList.remove('hidden');
            dom.weiterButton.classList.add('hidden');
            dom.FeedbackMessageRichtig.classList.add('hidden');
            break;
        case 'testEnde':
            dom.testAbschlussBereich.classList.remove('hidden');
            break;
        case 'fehlerTag':
            dom.fehlerTag.classList.remove('hiddem')
        default:
            // Standardmäßig die Kategorieauswahl anzeigen
            dom.kategorieAuswahlForm.classList.remove('hidden');
            break;
    }
}
