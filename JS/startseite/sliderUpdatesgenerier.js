const updates = [
    {
        "version": "3.2.2",
        "versionColor": "slate",
        "isNew": true,
        "title": "Wörterbuch ist leer wieder hinzugefügt",
        "description": "Wenn keine Vokabeln Hinzugefügt wurden, ploppt bei der Abfrage ein Kasten auf",
        "tags": ["UX/UI", "Feature", "Abfrage"]
    },
    {
        "version": "3.2.1",
        "versionColor": "lime",
        "isNew": false,
        "title": "Slider bei der Startseite hinzugefügt",
        "description": "Besserer Überblick über die verschiedensten Versionen.",
        "tags": ["UX/UI"]
    },
    {
        "version": "3.1",
        "versionColor": "indigo",
        "isNew": false,
        "title": "Neues Design bei der Abfrage",
        "description": "Die Abfrage wurde mit einer neuen Benutzeroberfläche und einer verbesserten Benutzererfahrung überarbeitet.",
        "tags": ["UI/UX", "Design"]
    },
    {
        "version": "3.0",
        "versionColor": "indigo",
        "isNew": false,
        "title": "Unser größtes Update aller Zeiten",
        "description": "Alle Oberflächen wurden von Grund auf neu gestaltet mit Fokus auf Benutzerfreundlichkeit und modernem Aussehen.",
        "tags": ["UI-Redesign"]
    },
    {
        "version": "2.0",
        "versionColor": "amber",
        "isNew": false,
        "title": "Neue Funktionen und Verbesserungen",
        "description": "Neues Startseiten-Design, Vokabel-Hinzufügen mit Kategorien, Tests nach Kategorien und zufällige Abfrage-Reihenfolge.",
        "tags": ["Features", "Kategorien"]
    }
];
const sliderWrapper = document.querySelector('.slider-wrapper');
sliderWrapper.innerHTML = ''; // Leert den Container 

updates.forEach(update => {
    const tagsHtml = update.tags.map(tag => ` <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">${tag}</span>
    `).join('');

    const slideHtml = `
        <div class="w-full flex-shrink-0 p-2 sm:p-4">
            <div class="bg-white/70 backdrop-blur-sm rounded-xl p-8 h-full flex flex-col justify-between border border-blue-200">
                <div>
                    <span class="text-sm font-bold text-${update.versionColor}-600 bg-${update.versionColor}-300 px-3 py-1 rounded-full">Version ${update.version}</span>
                    
                    ${update.isNew ? `
                        <span class="text-sm font-extrabold text-green-600 bg-green-200 px-3 py-1 rounded-full ">Neu</span>
                    ` : ''}

                    <h3 class="text-[22px] font-bold text-slate-800 mt-4 mb-2">${update.title}</h3>
                    <p class="text-slate-600 text-[18px]">${update.description}</p>
                </div>
                <div class="flex flex-wrap gap-2 mt-6">
                    ${tagsHtml}
                </div>
            </div>
        </div>
    `;
    sliderWrapper.innerHTML += slideHtml;
});
// --- Mobile Menu Toggle ---
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu-drawer').classList.toggle('-translate-x-full');
});

// --- Slider Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    // Check if sliderWrapper exists to avoid errors on other pages
    if (sliderWrapper) {
        const slides = Array.from(sliderWrapper.children);
        const nextButton = document.getElementById('next-button');
        const prevButton = document.getElementById('prev-button');
        const dotsContainer = document.getElementById('slider-dots');

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Don't run slider logic if there are no slides
        if (totalSlides === 0) return;

        // --- Create Navigation Dots ---
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition', 'duration-300');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        // --- Core Slider Function ---
        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        // --- Update Dots Visual State ---
        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('bg-blue-500');
                    dot.classList.remove('bg-blue-300');
                } else {
                    dot.classList.add('bg-blue-300');
                    dot.classList.remove('bg-blue-500');
                }
            });
        }

        // --- Event Listeners for Buttons ---
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));

        // --- Initialize Slider ---
        goToSlide(0); // Start at the first slide
    }
});