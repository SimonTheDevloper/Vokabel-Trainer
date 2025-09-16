const mobileNavHTML = `
<header class="bg-indigo-600 text-white shadow-md sticky top-0 z-50 hidden md:block">
  <div class="container mx-auto flex items-center justify-between px-4 py-3">
    <span class="text-xl font-bold text-amber-400">Vokabel Trainer</span>
    <nav class="flex space-x-4">
      <a href="index.html" class="hover:bg-indigo-700 px-3 py-2 rounded-md font-semibold">Startseite</a>
      <a href="voktestmitids.html" class="hover:bg-indigo-700 px-3 py-2 rounded-md">Vokabel-Test</a>
      <a href="hinzufügen.html" class="hover:bg-indigo-700 px-3 py-2 rounded-md">Hinzufügen</a>
      <a href="wörterbuch.html" class="hover:bg-indigo-700 px-3 py-2 rounded-md">Wörterbuch</a>
    </nav>
  </div>
</header>

<nav id="bottemNav" class="fixed bottom-0 left-0 right-0 z-50 bg-indigo-600 shadow-md md:hidden">
    <div class="mx-auto flex h-16 justify-around">
        <a href="../index.html" class="flex flex-1 flex-col items-center justify-center px-2 py-3 text-white hover:bg-indigo-700 transition-colors duration-200">
            <i class="material-icons text-xl">home</i>
            <span class="text-xs mt-1">Start</span>
        </a>
        <a href="voktestmitids.html" class="flex flex-1 flex-col items-center justify-center px-2 py-3 text-white hover:bg-indigo-700 transition-colors duration-200">
            <i class="material-icons text-xl">quiz</i>
            <span class="text-xs mt-1">Test</span>
        </a>
        <a href="hinzufügen.html" class="flex flex-1 flex-col items-center justify-center px-2 py-3 text-white hover:bg-indigo-700 transition-colors duration-200">
            <i class="material-icons text-xl">add_circle_outline</i>
            <span class="text-xs mt-1">Hinzufügen</span>
        </a>
        <a href="wörterbuch.html" class="flex flex-1 flex-col items-center justify-center px-2 py-3 text-white hover:bg-indigo-700 transition-colors duration-200">
            <i class="material-icons text-xl">menu_book</i>
            <span class="text-xs mt-1">Wörterbuch</span>
        </a>
    </div>
</nav>
`;
document.body.insertAdjacentHTML('afterbegin', mobileNavHTML); //fügt die Navbar in den Body teil ein

const path = decodeURIComponent(window.location.pathname.split('/').pop()); // decodeURIComponent damit wird "ü" problem behoben :)
const hrefs = [];
/*let lee = "apple";
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
  if (lee == fruit) {
    console.log("ja")
  } else {
    console.log("ne")
  }
} */
console.log(path)
const navLinks = document.querySelectorAll('#bottemNav a') // sucht nur nach der Bottem navBar
console.log(navLinks.length);
console.log(hrefs)

for (const link of navLinks) {
  if (path === link.getAttribute('href')) {
    link.classList.remove('text-white', 'hover:bg-indigo-700');
    link.classList.add('bg-indigo-700', 'text-amber-400');
  }
}
