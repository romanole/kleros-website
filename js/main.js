// Kleros Website - Based on Learnify Template

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle aria-expanded
            const isExpanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
            
            // Toggle menu icon
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', false);
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
        
        // Close menu when clicking on nav links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileToggle.setAttribute('aria-expanded', false);
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                header.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            }
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                header.classList.remove('mobile-active');
                mobileToggle.classList.remove('active');
            }
        });
    });    // Handle Header Visibility on Scroll    const hero = document.querySelector('.hero, .hero-section');
    
    function updateHeaderState() {
        // Get current page info
        const path = window.location.pathname.toLowerCase();
        const isSoftwarePage = path.includes('software.html');
        const isAreaRiservata = path.includes('area-riservata.html');
        const isHomePage = path.includes('index.html') || path === '/';
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Area Riservata: always white header
        if (isAreaRiservata) {
            header.classList.add('scrolled');
            document.body.classList.add('area-riservata');
            return;
        }

        // Software page: always transparent header
        if (isSoftwarePage) {
            header.classList.remove('scrolled');
            document.body.classList.add('software');
            return;
        }

        // Other pages: transparent on top, white when scrolled
        if (scrollTop > 100 || !hero) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Update header state on page load
    updateHeaderState();

    // Update header state on scroll
    window.addEventListener('scroll', updateHeaderState);

    // Update header state on window resize (in case hero visibility changes)
    window.addEventListener('resize', updateHeaderState);

    // Active Nav Link
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentLocation === '/' && (linkPath === 'index.html' || linkPath === '/')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = (windowTopPosition + windowHeight);

        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = (elementTopPosition + elementHeight);

            // Check if element is in view
            if ((elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('animated');
            }
        });
    }

    // Run once on load
    checkIfInView();

    // Run on scroll
    window.addEventListener('scroll', checkIfInView);

    // Handle form submissions
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form validation logic would go here
            alert('Grazie! Il tuo messaggio è stato inviato. Ti contatteremo presto.');
            this.reset();
        });
    }

    // Testimonial carousel (if exists)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        let currentSlide = 0;
        const slides = testimonialCarousel.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Initial setup
        showSlide(currentSlide);
        
        // Auto advance slides
        setInterval(nextSlide, 5000);
    }

    // Animate Modern Features on Scroll
    const modernFeatureCards = document.querySelectorAll('.modern-feature-card');
    
    function checkModernFeaturesVisibility() {
        modernFeatureCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    card.classList.add('animated');
                }, index * 150);
            }
        });
    }
    
    // Initial check
    checkModernFeaturesVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkModernFeaturesVisibility);

    // Modules Slider
    const sliderItems = document.querySelectorAll('.slider-item');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;

    // Initialize first slide
    sliderItems[0].classList.add('active');

    // Function to change slide
    function showSlide(n) {
        // Remove active class from all slides
        sliderItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Reset slide number if out of bounds
        if (n >= sliderItems.length) currentSlide = 0;
        if (n < 0) currentSlide = sliderItems.length - 1;

        // Show current slide
        sliderItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Event listeners for navigation
    prevButton.addEventListener('click', () => {
        currentSlide--;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide++;
        showSlide(currentSlide);
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
});
