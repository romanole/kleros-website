// favicon-generator.js
// This script dynamically generates a favicon from the Kleros logo
document.addEventListener('DOMContentLoaded', function() {
    // Check if favicon already exists
    if (localStorage.getItem('klerosFaviconGenerated')) {
        return;
    }
    
    // Create a canvas to draw the favicon
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Create an image from the logo
    const img = new Image();
    img.onload = function() {
        // Draw the logo to the canvas
        ctx.drawImage(img, 0, 0, 32, 32);
        
        // Convert canvas to favicon data URL
        const faviconUrl = canvas.toDataURL('image/png');
        
        // Create a link element for the favicon
        const link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'icon';
        link.href = faviconUrl;
        
        // Remove any existing favicon links
        const existingLinks = document.querySelectorAll('link[rel*="icon"]');
        existingLinks.forEach(el => el.parentNode.removeChild(el));
        
        // Add the new favicon link to the document head
        document.head.appendChild(link);
        
        // Mark as generated in localStorage
        localStorage.setItem('klerosFaviconGenerated', 'true');
    };
    
    // Set the source of the image to the logo
    img.src = 'logo.png';
});
