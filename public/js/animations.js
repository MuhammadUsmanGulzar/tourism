window.initAnimationsJS = function () {
  try {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.btn-editorial, .btn-editorial-outline, .navbar__cta').forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
          try {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
            this.style.transition = 'transform 0.1s ease-out';
          } catch (err) {}
        });
        btn.addEventListener('mouseleave', function () {
          try {
            this.style.transform = 'translate3d(0, 0, 0)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          } catch (err) {}
        });
      });
    }

    const animateElements = document.querySelectorAll('.editorial-pillar, .expedition-row, .trail-item');
    if ('IntersectionObserver' in window && animateElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      animateElements.forEach(el => observer.observe(el));
    }
  } catch (e) {
    console.warn('initAnimationsJS error safely handled:', e);
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => window.initAnimationsJS && window.initAnimationsJS(), 50);
} else {
  document.addEventListener('DOMContentLoaded', () => window.initAnimationsJS && window.initAnimationsJS());
}
