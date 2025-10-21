import { updates } from './sliderUpdatesObjekte.js'
const sliderWrapper = document.querySelector('.slider-wrapper');
sliderWrapper.innerHTML = ''; // Leert den Container 

document.getElementById('löscheVokList').addEventListener('click', löscheVokList);

function löscheVokList() {
    console.clear();
    console.log('🧹 Vokabelliste wird gelöscht...');

    localStorage.removeItem('vokabelListe');


    Object.keys(vocabList).forEach(key => delete vocabList[key]);

    // 3. UI leeren (wenn vorhanden)
    const vokabelContainer = document.getElementById('vokabelContainer');
    if (vokabelContainer) vokabelContainer.innerHTML = '';

    console.log('Vokabelliste erfolgreich gelöscht.');
}

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