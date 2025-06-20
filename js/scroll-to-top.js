// scroll-to-top.js
document.addEventListener('DOMContentLoaded', function() {
    // Create the scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Torna all\'inizio della pagina');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
