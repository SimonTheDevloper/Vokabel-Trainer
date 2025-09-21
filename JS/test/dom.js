export const dom = {
    frageAnzeige: null,
    eingabeFeld: null,
    antwortButton: null,
    feedbackAnzeigerichtig: null,
    testAbschlussBereich: null,
    weiterButton: null,
    kategorieAuswahlForm: null,
    vokabelAbfrageBereich: null,
    zurückZurKategorieAuswahlBtn: null,
    vokabelAbfrageInput: null,
    FeedbackMessageRichtig: null,
    kategorieselect: null,
    buttonBereich: null,
    feedbackMessageFalsch: null,
    feedbacktextFalsch: null,
    vorleseText: null,
    fortschrittText: null,
    fortschrittbar: null,

};

// Initialisierung
export function initDom() {
    dom.frageAnzeige = document.getElementById('frageAnzeige');
    dom.eingabeFeld = document.getElementById('eingabeFeld');
    dom.antwortButton = document.getElementById('checkButton');
    dom.feedbackAnzeigerichtig = document.getElementById('feedbackAnzeigeRichtig');
    dom.testAbschlussBereich = document.getElementById('testZuendeBereich');
    dom.weiterButton = document.getElementById('nextButton');
    dom.kategorieAuswahlForm = document.getElementById('kategorieAuswahl');
    dom.vokabelAbfrageBereich = document.getElementById('vokabelAbfrage');
    dom.zurückZurKategorieAuswahlBtn = document.getElementById('zurückZuKategorie');
    dom.vokabelAbfrageInput = document.getElementById('eingabeFeld');
    dom.FeedbackMessageRichtig = document.getElementById('feedbackAnzeigeRichtig');
    dom.buttonBereich = document.getElementById('buttonBereich');
    dom.kategorieselect = document.getElementById('testSelection');
    dom.feedbackMessageFalsch = document.getElementById('feedbackMessageFalsch');
    dom.feedbacktextFalsch = document.getElementById('feedbacktextFalsch');
    dom.fortschrittText = document.getElementById("progressText");
    dom.fortschrittbar = document.getElementById("progressBar");

}
