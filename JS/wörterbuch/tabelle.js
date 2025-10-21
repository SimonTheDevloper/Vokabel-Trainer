import { getVocabList, ladeVokList } from "../test/vokabelabfrage-Data.js";

ladeVokList();
const vokabeln = getVocabList();

const vokabeltabelle = document.getElementById('vokabelContainer');
const kategorien = Object.keys(vokabeln);

kategorien.forEach(kategorie => {
    // KategorieÜberschrift
    const überschrift = document.createElement('h2');
    überschrift.textContent = kategorie;
    überschrift.className = 'mt-8 mb-4 text-xl font-semibold text-indigo-700';
    vokabeltabelle.appendChild(überschrift);

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'overflow-x-auto rounded-xl';

    const tabelle = document.createElement('table');
    tabelle.className =
        'min-w-full border border-blue-300 bg-blue-100 rounded-xl text-slate-800';

    const thead = document.createElement('thead');
    thead.className = 'bg-blue-200 text-left text-sm font-semibold text-slate-800';
    thead.innerHTML = `
    <tr>
      <th class="px-4 py-3">Wort</th>
      <th class="px-4 py-3">Fremdsprache</th>
    </tr>
  `;
    tabelle.appendChild(thead);

    // TabellenKörper
    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-blue-300';

    const vokListe = vokabeln[kategorie];

    vokListe.forEach((vokabel, index) => {
        const zeile = document.createElement('tr');
        zeile.className =
            (index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100');

        const wordZelle = document.createElement('td');
        wordZelle.className = 'px-4 py-3 text-sm font-medium';
        wordZelle.textContent = vokabel.wort;

        const fremdwordZelle = document.createElement('td');
        fremdwordZelle.className = 'px-4 py-3 text-sm';
        fremdwordZelle.textContent = vokabel.fremdsprache;

        zeile.appendChild(wordZelle);
        zeile.appendChild(fremdwordZelle);
        tbody.appendChild(zeile);
    });

    tabelle.appendChild(tbody);
    tableWrapper.appendChild(tabelle);
    vokabeltabelle.appendChild(tableWrapper);
});
