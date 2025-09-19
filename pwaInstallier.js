let deferredPrompt; // Variable zum Speichern des Events

window.addEventListener('beforeinstallprompt', (e) => {
    // Das Standard-Banner des Browsers verhindern
    e.preventDefault();

    // Das Event speichern, um es später auszulösen
    deferredPrompt = e;

    // Den "Installieren"-Button anzeigen
    const installButton = document.getElementById('installButton');
    installButton.removeAttribute('hidden');

    installButton.addEventListener('click', () => {
        // Den Button ausblenden, nachdem er geklickt wurde
        installButton.setAttribute('hidden', '');

        // Das gespeicherte Event auslösen
        deferredPrompt.prompt();

        // Auf das Ergebnis der Installation warten
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA-Installation akzeptiert');
            } else {
                console.log('PWA-Installation abgelehnt');
            }
            deferredPrompt = null;
        });
    });
});

// Optional: Button ausblenden, wenn die PWA bereits installiert ist
window.addEventListener('appinstalled', () => {
    document.getElementById('installButton').setAttribute('hidden', '');
});