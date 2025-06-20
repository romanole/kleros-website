// news.js - Specific scripts for Kleros News & Events page
document.addEventListener('DOMContentLoaded', function() {
    // --------------------------------------------------
    // Blog Articles Filtering & Search
    // --------------------------------------------------
    initBlogFilters();
    
    // --------------------------------------------------
    // Press Section Slider
    // --------------------------------------------------
    initPressSlider();
    
    // --------------------------------------------------
    // Video Section Interactions
    // --------------------------------------------------
    initVideoCards();
    
    // --------------------------------------------------
    // Magazine Download Form
    // --------------------------------------------------
    initMagazineForm();
    
    // --------------------------------------------------
    // Events Cards Interactions
    // --------------------------------------------------
    initEventCards();
});

/**
 * Initialize the blog filters and search functionality
 */
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const searchInput = document.querySelector('.blog-search-input');
    const blogCards = document.querySelectorAll('.blog-card');
    let activeFilter = 'all';
    
    // Filter button click handlers
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Get filter value
                activeFilter = this.getAttribute('data-filter');
                
                // Apply filters and search
                applyFiltersAndSearch();
            });
        });
    }
    
    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFiltersAndSearch();
        });
    }
    
    // Apply both category filter and search text
    function applyFiltersAndSearch() {
        const searchText = searchInput ? searchInput.value.toLowerCase() : '';
        
        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('.blog-title').textContent.toLowerCase();
            const cardContent = card.querySelector('.blog-excerpt').textContent.toLowerCase();
            
            // Check if card matches the active filter
            const matchesFilter = activeFilter === 'all' || cardCategory === activeFilter;
            
            // Check if card matches the search text
            const matchesSearch = searchText === '' || 
                                 cardTitle.includes(searchText) || 
                                 cardContent.includes(searchText);
            
            // Show card if it matches both filter and search
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check if no results
        const visibleCards = document.querySelectorAll('.blog-card[style="display: block"]');
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (visibleCards.length === 0 && noResultsMessage) {
            noResultsMessage.style.display = 'block';
        } else if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }
    }
}

/**
 * Initialize the press section slider
 */
function initPressSlider() {
    const slider = document.querySelector('.press-slider');
    if (!slider) return;
    
    const sliderItems = slider.querySelectorAll('.press-card');
    const prevButton = slider.querySelector('.press-slider-prev');
    const nextButton = slider.querySelector('.press-slider-next');
    const dotsContainer = slider.querySelector('.press-slider-dots');
    
    let currentSlide = 0;
    let isAnimating = false;
    const itemsPerSlide = getItemsPerSlide();
    let totalSlides = Math.ceil(sliderItems.length / itemsPerSlide);
    
    // Create dots based on total slides
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('press-slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Calculate items per slide based on screen width
    function getItemsPerSlide() {
        if (window.innerWidth < 768) {
            return 1;
        } else if (window.innerWidth < 992) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
        const newItemsPerSlide = getItemsPerSlide();
        if (newItemsPerSlide !== itemsPerSlide) {
            // Reset slider if items per slide changes
            currentSlide = 0;
            updateSlider();
        }
    });
    
    // Update slider state
    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Calculate translation percentage
        const translateValue = -currentSlide * (100 / itemsPerSlide) * itemsPerSlide;
        
        // Apply translation to all items
        sliderItems.forEach(item => {
            item.style.transform = `translateX(${translateValue}%)`;
        });
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.press-slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match this with CSS transition time
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Event listeners for navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider();
            }
        });
    }
    
    // Initial setup
    updateSlider();
}

/**
 * Initialize the video cards interaction
 */
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            const playButton = this.querySelector('.play-button');
            if (playButton) {
                playButton.classList.add('hover');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const playButton = this.querySelector('.play-button');
            if (playButton) {
                playButton.classList.remove('hover');
            }
        });
        
        // Add click handler to open video
        card.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            if (videoId) {
                openVideoModal(videoId);
            }
        });
    });
    
    // Video modal functionality
    function openVideoModal(videoId) {
        // Create modal element
        const modal = document.createElement('div');
        modal.classList.add('video-modal');
        modal.innerHTML = `
            <div class="video-modal-overlay"></div>
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Add close functionality
        const closeButton = modal.querySelector('.video-modal-close');
        const overlay = modal.querySelector('.video-modal-overlay');
        
        closeButton.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        function closeModal() {
            document.body.removeChild(modal);
            document.body.classList.remove('modal-open');
        }
    }
}

/**
 * Initialize the magazine download form
 */
function initMagazineForm() {
    const magazineForm = document.querySelector('.magazine-download-form');
    
    if (magazineForm) {
        magazineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const professionSelect = this.querySelector('select[name="profession"]');
            const privacyCheckbox = this.querySelector('input[name="privacy"]');
            
            let isValid = true;
            
            // Reset errors
            this.querySelectorAll('.error-message').forEach(el => el.remove());
            this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            // Validate name
            if (!nameInput.value.trim()) {
                addError(nameInput, 'Il nome è obbligatorio');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                addError(emailInput, 'L\'email è obbligatoria');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                addError(emailInput, 'Inserisci un indirizzo email valido');
                isValid = false;
            }
            
            // Validate profession
            if (professionSelect && !professionSelect.value) {
                addError(professionSelect, 'Seleziona la tua professione');
                isValid = false;
            }
            
            // Validate privacy
            if (!privacyCheckbox.checked) {
                addError(privacyCheckbox, 'Devi accettare la Privacy Policy');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Hide form
                this.style.display = 'none';
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle" aria-hidden="true"></i>
                    <h3>Grazie per la tua richiesta!</h3>
                    <p>Il magazine è stato inviato al tuo indirizzo email. Controlla la tua casella di posta.</p>
                    <a href="#" class="cta-button" id="downloadDirectly" style="display: inline-block; margin-top: 20px;">
                        <i class="fas fa-file-pdf" aria-hidden="true"></i> Scarica direttamente
                    </a>
                `;
                
                // Add success message after form
                this.parentNode.appendChild(successMessage);
                
                // Direct download link
                document.getElementById('downloadDirectly').addEventListener('click', function(e) {
                    e.preventDefault();
                    // In a real scenario, this would trigger the download
                    alert('Download avviato. Il magazine verrà scaricato automaticamente.');
                });
                
                // Log form data (in a real scenario, this would be sent to a server)
                console.log('Form submitted', {
                    name: nameInput.value,
                    email: emailInput.value,
                    profession: professionSelect ? professionSelect.value : '',
                    company: this.querySelector('input[name="company"]') ? this.querySelector('input[name="company"]').value : ''
                });
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Set focus to the success message for screen readers
                successMessage.setAttribute('tabindex', '-1');
                successMessage.focus();
            }
        });
        
        // Add error message helper function
        function addError(element, message) {
            element.classList.add('error');
            
            // Create error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.setAttribute('role', 'alert');
            
            // For checkbox, add error after label
            if (element.type === 'checkbox') {
                const label = element.parentNode.querySelector('label');
                label.parentNode.insertBefore(errorMessage, label.nextSibling);
            } else {
                // Add error after element
                element.parentNode.appendChild(errorMessage);
            }
        }
        
        // Email validation helper
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Add accessible labels for keyboard navigation
        const formInputs = magazineForm.querySelectorAll('input, select, button');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.closest('.form-group')?.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.closest('.form-group')?.classList.remove('focused');
            });
        });
    }
}
            
            // Validate email
            if (!emailInput.value.trim()) {
                addError(emailInput, 'L\'email è obbligatoria');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                addError(emailInput, 'Inserisci un\'email valida');
                isValid = false;
            }
            
            // Validate profession
            if (professionSelect.value === '') {
                addError(professionSelect, 'Seleziona una professione');
                isValid = false;
            }
            
            // Validate privacy
            if (!privacyCheckbox.checked) {
                addError(privacyCheckbox.parentElement, 'Devi accettare la privacy policy');
                isValid = false;
            }
            
            // If valid, submit form
            if (isValid) {
                // Simulate form submission
                showSuccessMessage();
                this.reset();
            }
        });
        
        // Helper functions
        function addError(element, message) {
            element.classList.add('error');
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = message;
            element.parentNode.appendChild(errorMessage);
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Grazie per l'interesse!</h3>
                <p>Abbiamo inviato il magazine alla tua email.</p>
            `;
            
            magazineForm.innerHTML = '';
            magazineForm.appendChild(successMessage);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/**
 * Initialize the events cards interaction
 */
function initEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Add click handler to expand card on mobile
        card.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                const clickedOnButton = e.target.tagName === 'BUTTON' || 
                                       e.target.closest('button');
                
                if (!clickedOnButton) {
                    this.classList.toggle('expanded');
                }
            }
        });
    });
    
    // "Load more events" button functionality
    const loadMoreButton = document.querySelector('.load-more-events');
    const hiddenEvents = document.querySelectorAll('.event-card.hidden');
    
    if (loadMoreButton && hiddenEvents.length > 0) {
        loadMoreButton.addEventListener('click', function() {
            hiddenEvents.forEach(event => {
                event.classList.remove('hidden');
                // Add entrance animation
                event.classList.add('fade-in');
            });
            
            // Hide the button after revealing all events
            this.style.display = 'none';
        });
    }
}
