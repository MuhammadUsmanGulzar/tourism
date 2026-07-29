import { useEffect } from 'react';
import '../css/404.css';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // --- Navbar scroll behavior ---
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // --- Mobile menu ---
    const hamburger = document.querySelector('#hamburger-menu, .navbar__hamburger');
    const mobileMenu = document.querySelector('#mobile-menu, .mobile-menu');
    const menuClose  = document.querySelector('#mobile-menu-close, .mobile-menu__close');

    const openMenu = () => {
      console.log('Opening mobile menu');
      mobileMenu?.classList.add('active');
    };
    const closeMenu = () => {
      console.log('Closing mobile menu');
      mobileMenu?.classList.remove('active');
    };

    hamburger?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);

    const links = document.querySelectorAll('.mobile-menu__links a');
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // --- Hero bg load animation ---
    const heroBg = document.querySelector('[class$="hero__bg"]');
    if (heroBg) {
      heroBg.classList.add('abt-hero__bg--loaded');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      hamburger?.removeEventListener('click', openMenu);
      menuClose?.removeEventListener('click', closeMenu);
      links.forEach(link => {
        link.removeEventListener('click', closeMenu);
      });
    };
  
  }, []);

  return (
    <div className="page-wrapper animate-fade-in">
      

    
    <section className="error-hero" id="error-hero">
        <div className="error-hero__bg" id="error-hero-bg"></div>
        <div className="error-hero__overlay"></div>
        <div className="error-hero__container error-container">
            <span className="error-hero__tagline">YOU TOOK A WRONG TURN</span>
            <h1 className="error-hero__title">LOST IN THE KARAKORAM?</h1>
            <p className="error-hero__desc">The trail you're looking for doesn't exist, but countless adventures still await across Northern Pakistan.</p>
        </div>
    </section>

    
    <section className="error-content-section">
        <div className="error-container error-content-inner">
            
            <div className="error-text-block">
                <h2 className="error-number">404</h2>
                <h3 className="error-subtitle">Page Not Found</h3>
                <p className="error-desc">It seems you've wandered off the mapped route. Let us guide you back to the mountains.</p>
            </div>

            <div className="error-actions">
                <a href="/" className="error-btn-primary">
                    <i className="ri-home-4-line"></i> RETURN HOME
                </a>
                <a href="/expeditions" className="error-btn-outline">
                    EXPLORE EXPEDITIONS <i className="ri-arrow-right-line"></i>
                </a>
            </div>

        </div>
    </section>

    
    <section className="error-links-section">
        <div className="error-container">
            <h3 className="error-links-title">QUICK LINKS</h3>
            <div className="error-links-grid">
                <a href="/expeditions" className="error-link-card">
                    <div className="error-link-card__icon"><i className="ri-compass-3-line"></i></div>
                    <div className="error-link-card__text">Expeditions</div>
                </a>
                <a href="/travel-guides" className="error-link-card">
                    <div className="error-link-card__icon"><i className="ri-book-read-line"></i></div>
                    <div className="error-link-card__text">Travel Guides</div>
                </a>
                <a href="/faq" className="error-link-card">
                    <div className="error-link-card__icon"><i className="ri-question-answer-line"></i></div>
                    <div className="error-link-card__text">FAQ</div>
                </a>
                <a href="/contact" className="error-link-card">
                    <div className="error-link-card__icon"><i className="ri-mail-send-line"></i></div>
                    <div className="error-link-card__text">Contact Us</div>
                </a>
            </div>
        </div>
    </section>

    
    <section className="error-cta">
        <div className="error-cta__overlay"></div>
        <div className="error-container">
            <div className="error-cta__content">
                <div className="error-cta__text">
                    <h2 className="error-cta__title">THE MOUNTAINS ARE STILL WAITING</h2>
                    <p className="error-cta__desc">Discover expeditions, cultural experiences, and breathtaking landscapes across Gilgit-Baltistan.</p>
                </div>
                <div className="error-cta__buttons">
                    <a href="/expeditions" className="error-btn-white">START EXPLORING</a>
                </div>
            </div>
        </div>
    </section>

    
    

    
    
    </div>
  );
}
