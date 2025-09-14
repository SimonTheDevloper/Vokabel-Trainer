export function vorlesen(vorleseText) {
    const utterance = new SpeechSynthesisUtterance(vorleseText)
    utterance.lang = 'en-GB  '
    window.speechSynthesis.speak(utterance)

}
