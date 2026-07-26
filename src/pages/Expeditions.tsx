import { useEffect } from 'react';
import '../css/expeditions.css';
import { expeditionsData } from '../data/expeditionsData';

export default function Expeditions() {
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
      <header className="header" id="main-header">
        <nav className="navbar">
            <div className="navbar__logo">
                <a href="/">BROAD PEAK</a>
            </div>

            <ul className="navbar__menu">
                <li><a href="/">Home</a></li>
                <li><a href="/expeditions">Expeditions</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>

            <div className="navbar__actions">
                <a href="#" className="navbar__social" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
                <a href="#" className="navbar__social" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
                <a href="/contact" className="navbar__cta">Book a Trip</a>
                <button className="navbar__hamburger" id="exp-hamburger">
                    <i className="ri-menu-line"></i>
                </button>
            </div>
        </nav>

        
        <div className="mobile-menu" id="exp-mobile-menu">
            <div className="mobile-menu__header">
                <div className="navbar__logo">
                    <a href="/">BROAD PEAK</a>
                </div>
                <button className="mobile-menu__close" id="exp-menu-close">
                    <i className="ri-close-line"></i>
                </button>
            </div>
            <ul className="mobile-menu__links">
                <li><a href="/">Home</a></li>
                <li><a href="/expeditions">Expeditions</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    </header>

    
    <section className="exp-hero" id="exp-hero">
        <div className="exp-hero__bg" id="exp-hero-bg"></div>
        <div className="exp-hero__overlay"></div>
        <div className="exp-hero__container exp-container">
            <span className="exp-hero__tagline">LEGENDARY MOUNTAIN JOURNEYS</span>
            <h1 className="exp-hero__title">EXPEDITIONS &amp;<br />ADVENTURES</h1>
            <p className="exp-hero__desc">Explore the most iconic trekking routes, cultural experiences, and wilderness adventures across Northern Pakistan.</p>
        </div>
    </section>

    
    <section className="exp-intro">
        <div className="exp-container">
            <div className="exp-intro__inner">
                <div>
                    <span className="exp-intro__label">OUR PHILOSOPHY</span>
                    <h2 className="exp-intro__heading">Guided by Locals.<br />Built for Explorers.</h2>
                </div>
                <p className="exp-intro__body">
                    For decades, our team of local experts has guided climbers, trekkers, and explorers through the world's most formidable and breathtaking mountain ranges. Every expedition is crafted with deep respect for local culture, a strict commitment to safety, and an unwavering passion for the Karakoram.
                </p>
            </div>
        </div>
    </section>

    
    <section className="exp-grid-section">
        <div className="exp-container">
            <div className="exp-grid-section__header">
                <div className="exp-section-tag">OUR PACKAGES</div>
                <h2 className="exp-section-title">CHOOSE YOUR EXPEDITION</h2>
            </div>

            <div className="exp-grid">
                {Object.values(expeditionsData).map((exp) => (
                    <article className="exp-card" key={exp.id}>
                        <div className="exp-card__image">
                            <a href={`/expedition-detail?id=${exp.id}`}>
                                <img src={exp.gallery[0] || "/assets/images/k2.webp"} alt={exp.title} loading="lazy" referrerPolicy="no-referrer" />
                            </a>
                            <span className={`exp-card__badge exp-card__badge--${exp.difficultyClass}`}>{exp.difficulty}</span>
                        </div>
                        <div className="exp-card__body">
                            <h3 className="exp-card__title">
                                <a href={`/expedition-detail?id=${exp.id}`}>{exp.title}</a>
                            </h3>
                            <div className="exp-card__stats">
                                <div className="exp-card__stat">
                                    <span className="exp-card__stat-label">Duration</span>
                                    <span className="exp-card__stat-value"><i className="ri-time-line"></i>{exp.duration}</span>
                                </div>
                                <div className="exp-card__stat">
                                    <span className="exp-card__stat-label">Max Alt.</span>
                                    <span className="exp-card__stat-value"><i className="ri-mountain-line"></i>{exp.maxAltitude}</span>
                                </div>
                                <div className="exp-card__stat">
                                    <span className="exp-card__stat-label">Group</span>
                                    <span className="exp-card__stat-value"><i className="ri-group-line"></i>{exp.groupSize}</span>
                                </div>
                            </div>
                            <p className="exp-card__desc">{exp.desc}</p>
                            <div className="exp-card__footer">
                                <div>
                                    <div className="exp-card__price-label">Starting from</div>
                                    <div className="exp-card__price-value">{exp.startingPrice}</div>
                                </div>
                                <a href={`/expedition-detail?id=${exp.id}`} className="exp-card__btn">Explore <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>

    
    <section className="exp-private">
        <div className="exp-private__bg"></div>
        <div className="exp-private__overlay"></div>
        <div className="exp-container">
            <div className="exp-private__content">
                <span className="exp-private__tag">FOR GROUPS & INDIVIDUALS</span>
                <h2 className="exp-private__title">CUSTOM &amp; PRIVATE<br />JOURNEYS</h2>
                <p className="exp-private__desc">Personalized adventures for families, photographers, luxury travelers, and private groups. We design every detail around your interests, schedule, and pace.</p>
                <a href="/contact" className="exp-btn-primary">PLAN A PRIVATE TOUR</a>
            </div>
        </div>
    </section>

    
    <section className="exp-faq">
        <div className="exp-container">
            <div className="exp-faq__header">
                <span className="exp-faq__subtitle">FREQUENTLY ASKED QUESTIONS</span>
                <h2 className="exp-faq__title">PLAN WITH CONFIDENCE</h2>
                <p className="exp-faq__desc">Everything you need before your journey.</p>
            </div>

            <div className="exp-faq__accordion" id="exp-faq-accordion">

                <div className="exp-faq__item active">
                    <button className="exp-faq__header-btn">
                        <span>How difficult are your expeditions?</span>
                        <i className="ri-add-line exp-faq__icon"></i>
                    </button>
                    <div className="exp-faq__body exp-faq__body--open">
                        <p className="exp-faq__answer">Our expeditions range from easy cultural tours suitable for most fitness levels, to extreme high-altitude treks like K2 Base Camp requiring prior mountaineering experience. Every listing includes a clear difficulty rating, fitness guide, and required experience level.</p>
                    </div>
                </div>

                <div className="exp-faq__item">
                    <button className="exp-faq__header-btn">
                        <span>Are permits included in the packages?</span>
                        <i className="ri-add-line exp-faq__icon"></i>
                    </button>
                    <div className="exp-faq__body">
                        <p className="exp-faq__answer">Yes. All trekking permits, national park entry fees, and government NOCs (No Objection Certificates) required for your route are fully handled by our team and included in your package price. No hidden paperwork.</p>
                    </div>
                </div>

                <div className="exp-faq__item">
                    <button className="exp-faq__header-btn">
                        <span>What equipment should I bring?</span>
                        <i className="ri-add-line exp-faq__icon"></i>
                    </button>
                    <div className="exp-faq__body">
                        <p className="exp-faq__answer">Upon booking, we send a comprehensive, expedition-specific gear list. All group equipment — high-altitude tents, mess tents, cooking gear, and safety equipment — is provided. You only need personal clothing, a sleeping bag, and trekking boots.</p>
                    </div>
                </div>

                <div className="exp-faq__item">
                    <button className="exp-faq__header-btn">
                        <span>Can private groups customize itineraries?</span>
                        <i className="ri-add-line exp-faq__icon"></i>
                    </button>
                    <div className="exp-faq__body">
                        <p className="exp-faq__answer">Absolutely. We specialize in bespoke adventures. You can add acclimatization days, combine multiple treks, upgrade accommodations where available, or build a completely unique route. Contact our team to start planning your private journey.</p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    
    <section className="exp-cta" id="exp-contact">
        <div className="exp-cta__overlay"></div>
        <div className="exp-container">
            <div className="exp-cta__content">
                <div className="exp-cta__text">
                    <span className="exp-cta__tag">THE ADVENTURE AWAITS</span>
                    <h2 className="exp-cta__title">READY FOR THE ADVENTURE OF A LIFETIME?</h2>
                    <p className="exp-cta__desc">Let our local experts guide you through the mountains, cultures, and landscapes of Northern Pakistan.</p>
                </div>
                <div className="exp-cta__buttons">
                    <a href="/expedition-detail?id=k2" className="exp-btn-white">EXPLORE K2 BASE CAMP</a>
                    <a href="/contact" className="exp-btn-outline-light">CONTACT OUR TEAM</a>
                </div>
            </div>
        </div>
    </section>

    
    <footer className="footer">
        <div className="exp-container footer__container">

            
            <div className="footer__col footer__col--about">
                <h3 className="footer__logo"><a href="/">BROAD PEAK</a></h3>
                <p>Authentic mountain experiences across Gilgit-Baltistan, combining local expertise, cultural immersion, and world-class expedition planning.</p>
                <div className="footer__socials">
                <a href="#" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
                <a href="#" aria-label="Facebook"><i className="ri-facebook-fill"></i></a>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="ri-whatsapp-line"></i></a>
            </div>
            </div>

            
            <div className="footer__col">
                <h4>QUICK LINKS</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/expeditions">Expeditions</a></li>
                    <li><a href="/travel-guides">Travel Guides</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            
            <div className="footer__col">
                <h4>POPULAR EXPEDITIONS</h4>
                <ul>
                    <li><a href="/expedition-detail?id=k2">K2 Base Camp Trek</a></li>
                    <li><a href="/expedition-detail?id=basho-valley">Basho Valley Trek</a></li>
                    <li><a href="/expedition-detail?id=haramosh-pass">Haramosh Pass Trek</a></li>
                    <li><a href="/expedition-detail?id=minimarg">Minimarg Valley Escape</a></li>
                    <li><a href="/expedition-detail?id=hoper-valley">Hoper Valley Explorer</a></li>
                </ul>
            </div>

            
            <div className="footer__col">
                <h4>SUPPORT</h4>
                <ul>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms &amp; Conditions</a></li>
                    <li><a href="mailto:info@broadpeakadventures.com">Email Us</a></li>
                    <li><a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">WhatsApp Inquiry</a></li>
                </ul>
            </div>

        </div>

        <div className="exp-container footer__bottom">
            <p>&copy; 2026 Broad Peak Adventures. All Rights Reserved.</p>
        </div>
    </footer>

    
    <a href="#" className="scroll-to-top">
        <i className="ri-arrow-up-line"></i>
    </a>
    </div>
  );
}
