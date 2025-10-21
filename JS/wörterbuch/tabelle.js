import { getVocabList, ladeVokList } from "../test/vokabelabfrage-Data.js";

ladeVokList();
const vokabeln = getVocabList();

const vokabeltabelle = document.getElementById('vokabelContainer');
const kategorien = Object.keys(vokabeln);

kategorien.forEach(kategorie => {
    const container = document.createElement('div');
    container.className = 'mb-6';

    // Button zum Aufklappen
    const btn = document.createElement('button');
    btn.textContent = kategorie;
    btn.className = 'w-full text-left px-4 py-3 font-semibold text-indigo-700 bg-indigo-100 rounded-xl focus:outline-none flex justify-between items-center';

    // Pfeil-Icon
    const arrow = document.createElement('span');
    arrow.textContent = '▼';
    arrow.className = 'ml-2 transition-transform duration-300';
    btn.appendChild(arrow);

    container.appendChild(btn);

    // Tabelle
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'overflow-hidden rounded-xl border border-blue-300 mt-2 transition-max-height duration-500 ease-in-out';
    tableWrapper.style.maxHeight = '0'; // zugeklappt

    const tabelle = document.createElement('table');
    tabelle.className = 'min-w-full border-collapse bg-blue-100 text-slate-800';

    const thead = document.createElement('thead');
    thead.className = 'bg-blue-200 text-left text-sm font-semibold text-slate-800';
    thead.innerHTML = `
      <tr>
        <th class="px-4 py-3">Wort</th>
        <th class="px-4 py-3">Fremdsprache</th>
      </tr>
    `;
    tabelle.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-blue-300';

    vokabeln[kategorie].forEach((vokabel, index) => {
        const zeile = document.createElement('tr');
        zeile.className = (index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100');

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
    container.appendChild(tableWrapper);
    vokabeltabelle.appendChild(container);

    // Toggle-Logik
    btn.addEventListener('click', () => {
        const isOpen = tableWrapper.style.maxHeight !== '0px' && tableWrapper.style.maxHeight !== '';
        tableWrapper.style.maxHeight = isOpen ? '0' : tableWrapper.scrollHeight + 'px';
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});
