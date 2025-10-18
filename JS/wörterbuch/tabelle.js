import { getVocabList, ladeVokList } from "../test/vokabelabfrage-Data.js";

ladeVokList()
const vokabeln = getVocabList();

const vokabeltabelle = document.getElementById('vokabelContainer')
const kategorien = Object.keys(vokabeln);

kategorien.forEach(kategorie => {
    const überschrift = document.createElement('h2');
    überschrift.textContent = kategorie;
    vokabeltabelle.appendChild(überschrift); // fügt es dann in den container ins HTML


    const tabelle = document.createElement('table');
    tabelle.innerHTML = '<thead><tr><th>Wort</th><th>Fremdsprache</th></tr></thead>';
    tabelle.setAttribute("bgcolor", "gray");

    const tabellenKörper = document.createElement('tbody')
    tabelle.appendChild(tabellenKörper)

    const vokListe = vokabeln[kategorie];

    vokListe.forEach(vokabel => {
        const zeile = document.createElement('tr');
        zeile.setAttribute("bgcolor", "lightgray");

        const wordZelle = document.createElement('td');
        wordZelle.innerHTML = vokabel.wort;
        zeile.appendChild(wordZelle);

        const fremdwordZelle = document.createElement('td');
        fremdwordZelle.innerHTML = vokabel.fremdsprache
        zeile.appendChild(fremdwordZelle);

        tabellenKörper.appendChild(zeile);

    });
    vokabeltabelle.appendChild(tabelle);


});