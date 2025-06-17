// Modules Slider
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
});

function initializeSlider() {
    const slider = document.querySelector('.modules-slider');
    if (!slider) return;

    const sliderItems = slider.querySelectorAll('.slider-item');
    const dots = slider.querySelectorAll('.dot');
    const prevButton = slider.querySelector('.slider-prev');
    const nextButton = slider.querySelector('.slider-next');
    let currentSlide = 0;
    let isAnimating = false;

    // Initialize first slide
    if (sliderItems.length > 0) {
        sliderItems[0].classList.add('active');
    }

    // Function to change slide
    function showSlide(n) {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from all slides
        sliderItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Reset slide number if out of bounds
        if (n >= sliderItems.length) currentSlide = 0;
        if (n < 0) currentSlide = sliderItems.length - 1;

        // Show current slide with fade effect
        sliderItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match this with CSS transition time
    }

    // Event listeners for navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide !== index) {
                currentSlide = index;
                showSlide(currentSlide);
            }
        });
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                currentSlide++;
                showSlide(currentSlide);
            } else {
                // Swipe right
                currentSlide--;
                showSlide(currentSlide);
            }
        }
    }

    // Auto-advance slides every 5 seconds
    let autoSlideInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);

    // Pause auto-advance when hovering over slider
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
    });
}
