// cookie-consent.js - GDPR-compliant cookie consent banner
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('klerosCookieConsent')) {
        // Create cookie consent banner
        createCookieBanner();
    }
});

/**
 * Create and show the cookie consent banner
 */
function createCookieBanner() {
    // Create banner element
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-title');
    banner.setAttribute('aria-describedby', 'cookie-desc');
    
    // Banner content
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <h3 id="cookie-title">Informativa sui Cookie</h3>
                <p id="cookie-desc">Questo sito utilizza cookie per migliorare l'esperienza di navigazione. Continuando a navigare o facendo clic su "Accetta", acconsenti all'utilizzo dei cookie. Per maggiori informazioni, leggi la nostra <a href="privacy.html">Privacy Policy</a>.</p>
            </div>
            <div class="cookie-buttons">
                <button class="cookie-accept">Accetta</button>
                <button class="cookie-settings">Impostazioni</button>
            </div>
        </div>
    `;
    
    // Add banner to page
    document.body.appendChild(banner);
    
    // Show banner with animation
    setTimeout(() => {
        banner.classList.add('visible');
    }, 500);
    
    // Event listeners for buttons
    const acceptButton = banner.querySelector('.cookie-accept');
    const settingsButton = banner.querySelector('.cookie-settings');
    
    acceptButton.addEventListener('click', function() {
        // Save consent to localStorage
        localStorage.setItem('klerosCookieConsent', 'accepted');
        banner.classList.remove('visible');
        
        // Remove banner after animation
        setTimeout(() => {
            if (banner.parentNode) {
                banner.parentNode.removeChild(banner);
            }
        }, 300);
    });
    
    settingsButton.addEventListener('click', function() {
        // Open cookie settings modal
        openCookieSettingsModal();
    });
}

/**
 * Open the cookie settings modal
 */
function openCookieSettingsModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'cookie-settings-title');
    
    // Modal content
    modal.innerHTML = `
        <div class="cookie-modal-content">
            <div class="cookie-modal-header">
                <h3 id="cookie-settings-title">Impostazioni Cookie</h3>
                <button class="cookie-modal-close" aria-label="Chiudi">×</button>
            </div>
            <div class="cookie-modal-body">
                <div class="cookie-option">
                    <input type="checkbox" id="essential-cookies" checked disabled>
                    <label for="essential-cookies">Cookie essenziali (necessari)</label>
                    <p class="cookie-description">Questi cookie sono necessari per il funzionamento del sito e non possono essere disattivati.</p>
                </div>
                <div class="cookie-option">
                    <input type="checkbox" id="analytics-cookies" checked>
                    <label for="analytics-cookies">Cookie analitici</label>
                    <p class="cookie-description">Ci aiutano a capire come gli utenti interagiscono con il nostro sito, per migliorare l'esperienza di navigazione.</p>
                </div>
                <div class="cookie-option">
                    <input type="checkbox" id="marketing-cookies">
                    <label for="marketing-cookies">Cookie di marketing</label>
                    <p class="cookie-description">Utilizzati per mostrare annunci pubblicitari pertinenti in base ai tuoi interessi.</p>
                </div>
            </div>
            <div class="cookie-modal-footer">
                <button class="cookie-save-settings">Salva impostazioni</button>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
    
    // Event listeners
    const closeButton = modal.querySelector('.cookie-modal-close');
    const saveButton = modal.querySelector('.cookie-save-settings');
    
    closeButton.addEventListener('click', function() {
        modal.classList.remove('visible');
        
        // Remove modal after animation
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    saveButton.addEventListener('click', function() {
        // Get user preferences
        const analyticsConsent = document.getElementById('analytics-cookies').checked;
        const marketingConsent = document.getElementById('marketing-cookies').checked;
        
        // Save preferences to localStorage
        localStorage.setItem('klerosCookieConsent', 'custom');
        localStorage.setItem('klerosAnalyticsCookies', analyticsConsent);
        localStorage.setItem('klerosMarketingCookies', marketingConsent);
        
        // Close modal
        modal.classList.remove('visible');
        
        // Also close the banner
        const banner = document.querySelector('.cookie-banner');
        if (banner) {
            banner.classList.remove('visible');
            
            // Remove elements after animation
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
        } else {
            // Just remove modal if banner is already gone
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
}
