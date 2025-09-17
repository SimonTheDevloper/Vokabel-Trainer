// Serverworker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('JS/service-worker.js')
            .then(registration => {
                console.log('Service Worker erfolgreich registriert:', registration.scope);
            })
            .catch(err => {
                console.log('Fehler bei der Service Worker Registrierung:', err);
            });
    });
}