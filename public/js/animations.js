window.initAnimationsJS = function() {
    // 1. MAGNETIC BUTTONS (Desktop mouse only)
    if (window.innerWidth > 768) {
        const magnetics = document.querySelectorAll(".btn, .navbar__social, .footer__socials a");
        
        magnetics.forEach((btn) => {
            btn.addEventListener("mousemove", function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0)`;
                this.style.transition = 'transform 0.1s ease-out';
            });
            
            btn.addEventListener("mouseleave", function() {
                this.style.transform = 'translate3d(0, 0, 0)';
                this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        });
    }

    // 2. NATIVE SCROLL REVEALS (Intersection Observer)
    const revealElements = document.querySelectorAll(".value-item, .cta-section__text, .cta-section__buttons, .who-we-are__images");
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('in-view'));
    }
};

// Initial run
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => window.initAnimationsJS && window.initAnimationsJS(), 100);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    window.initAnimationsJS && window.initAnimationsJS();
  });
}
