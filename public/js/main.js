window.initMainJS = function () {
  try {
    if (window._mainJSCleanup) {
      try { window._mainJSCleanup(); } catch (err) { }
    }
    const cleanups = [];
    window._mainJSCleanup = () => cleanups.forEach(fn => { try { fn(); } catch (e) { } });

    // Header Scroll Handler
    const header = document.querySelector('.header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', handleScroll));
    }

    // Mobile Menu Handlers
    const hamburger = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const links = document.querySelectorAll('.mobile-menu__links a');

    if (hamburger && mobileMenu) {
      const openFn = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      const closeFn = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      };

      hamburger.addEventListener('click', openFn);
      cleanups.push(() => hamburger.removeEventListener('click', openFn));

      if (closeBtn) {
        closeBtn.addEventListener('click', closeFn);
        cleanups.push(() => closeBtn.removeEventListener('click', closeFn));
      }

      links.forEach(link => {
        link.addEventListener('click', closeFn);
        cleanups.push(() => link.removeEventListener('click', closeFn));
      });
    }
  } catch (e) {
    console.warn('initMainJS error safely handled:', e);
  }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => window.initMainJS && window.initMainJS(), 50);
} else {
  document.addEventListener('DOMContentLoaded', () => window.initMainJS && window.initMainJS());
}
