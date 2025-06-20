// utils.js - Global utility functions for Kleros website
document.addEventListener('DOMContentLoaded', function() {
    // Add lazy loading to all images 
    addLazyLoadingToImages();
    
    // Add external link handlers
    handleExternalLinks();
    
    // Focus state handling for better accessibility
    handleFocusStates();
    
    // Initialize tooltips if any
    initTooltips();
});

/**
 * Add lazy loading attribute to all images that don't already have it
 */
function addLazyLoadingToImages() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        
        // Add empty alt tag if none exists (for accessibility)
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', '');
        }
    });
}

/**
 * Handle external links - add target="_blank" and rel attributes
 */
function handleExternalLinks() {
    const currentHost = window.location.hostname;
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
        const url = new URL(link.href);
        
        // If it's an external link
        if (url.hostname !== currentHost) {
            // Add target and rel attributes if not already present
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
            
            // Optionally add indicator icon for external links
            if (!link.querySelector('.external-link-icon')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-external-link-alt external-link-icon';
                icon.style.fontSize = '0.8em';
                icon.style.marginLeft = '0.3em';
                icon.setAttribute('aria-hidden', 'true');
                link.appendChild(icon);
            }
        }
    });
}

/**
 * Improve focus states for better accessibility
 */
function handleFocusStates() {
    // Add a class to body when user is navigating with keyboard
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove the class when user clicks with mouse
    document.body.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Initialize tooltips on elements with data-tooltip attribute
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
            tooltip.style.top = rect.top - tooltipRect.height - 10 + 'px';
            
            // Add show class after positioning
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 10);
            
            this.addEventListener('mouseleave', function onMouseLeave() {
                tooltip.classList.remove('show');
                
                // Remove tooltip after animation
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
                
                this.removeEventListener('mouseleave', onMouseLeave);
            });
        });
    });
}
