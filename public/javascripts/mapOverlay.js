// Clean Map Overlay Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const mapOverlay = document.getElementById('map-overlay');
    
    if (mapOverlay) {
        // Add click handler for overlay
        mapOverlay.addEventListener('click', function(e) {
            if (e.target === this || e.target === this.querySelector('::before')) {
                this.classList.add('active');
            }
        });
        
        // Re-enable overlay when clicking outside
        document.addEventListener('click', function(e) {
            if (!mapOverlay.contains(e.target)) {
                mapOverlay.classList.remove('active');
            }
        });
        
        // Keyboard accessibility
        mapOverlay.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.add('active');
            }
        });
        
        // Make overlay focusable for accessibility
        mapOverlay.setAttribute('tabindex', '0');
        mapOverlay.setAttribute('role', 'button');
        mapOverlay.setAttribute('aria-label', 'Click to activate map interaction');
    }
});

// Form enhancement - add loading states
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                // Re-enable after 5 seconds as fallback
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});