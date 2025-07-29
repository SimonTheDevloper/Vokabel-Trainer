/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./voktestmitids.html" // Sucht in deiner index.html im Stammverzeichnis
    // "./src/**/*.{html,js,ts}", // Beispiel: Falls du HTML, JS oder TS in einem 'src'-Ordner hast (optional)
    // Füge hier weitere Pfade hinzu, wenn du mehr HTML-Dateien oder JS/TS hast, die HTML generieren
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}