document.getElementById('close-slider-banner').addEventListener('click', function () {
    const banner = document.getElementById('slider-banner');
    const slider = document.getElementById('slider');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    banner.style.opacity = '0';
    banner.style.transform = 'scale(0.9)';

    // Blur-Effekt entfernen
    slider.classList.remove('slider-blurred');
    prevButton.classList.remove('slider-blurred');
    nextButton.classList.remove('slider-blurred');

    setTimeout(() => {
        banner.style.display = 'none';
    }, 300);
});