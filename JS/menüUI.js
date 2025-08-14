const menuBtn = document.getElementById('mobile-menu-button');
const closeBtn = document.getElementById('mobile-menu-close');
const drawer = document.getElementById('mobile-menu-drawer');
const overlay = document.getElementById('mobile-menu-overlay');

// Öffnen
menuBtn.addEventListener('click', () => {
    drawer.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});

// Schließen
function closeMenu() {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('#mobile-menu-drawer a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
