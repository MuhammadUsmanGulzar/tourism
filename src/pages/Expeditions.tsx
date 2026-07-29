import { useEffect, useState } from 'react';
import '../css/expeditions.css';
import { expeditionsData } from '../data/expeditionsData';

export default function Expeditions() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
                                <img src={exp.gallery[0] || "/assets/images/k2.webp"} alt={exp.title} width="340" height="220" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
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

    
    {/* EDITORIAL FAQ MATRIX */}
    <section className="faq-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">PLAN WITH CONFIDENCE</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Everything you need before your journey.</p>
          </div>

          <div className="faq-matrix">
            {[
              {
                q: "How difficult are your expeditions?",
                a: "Our expeditions range from easy cultural tours suitable for most fitness levels, to extreme high-altitude treks like K2 Base Camp requiring prior mountaineering experience. Every listing includes a clear difficulty rating, fitness guide, and required experience level."
              },
              {
                q: "Are permits included in the packages?",
                a: "Yes. All trekking permits, national park entry fees, and government NOCs (No Objection Certificates) required for your route are fully handled by our team and included in your package price. No hidden paperwork."
              },
              {
                q: "What equipment should I bring?",
                a: "Upon booking, we send a comprehensive, expedition-specific gear list. All group equipment — high-altitude tents, mess tents, cooking gear, and safety equipment — is provided. You only need personal clothing, a sleeping bag, and trekking boots."
              },
              {
                q: "Can private groups customize itineraries?",
                a: "Absolutely. We specialize in bespoke adventures. You can add acclimatization days, combine multiple treks, upgrade accommodations where available, or build a completely unique route. Contact our team to start planning your private journey."
              }
            ].map((item, idx) => (
              <div key={idx} className="faq-item">
                <button className="faq-header" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <i className={activeFaq === idx ? "ri-subtract-line" : "ri-add-line"}></i>
                </button>
                {activeFaq === idx && (
                  <div className="faq-content">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>

    {/* EDITORIAL CTA */}
    <section className="editorial-cta-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)', background: 'var(--bg-dark-alt)' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>THE ADVENTURE AWAITS</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '24px' }}>READY FOR THE ADVENTURE OF A LIFETIME?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>Let our local experts guide you through the mountains, cultures, and landscapes of Northern Pakistan.</p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/expedition-detail?id=k2" className="btn-editorial">EXPLORE K2 BASE CAMP</a>
                <a href="/contact" className="btn-editorial-outline">CONTACT OUR TEAM</a>
            </div>
        </div>
    </section>

    
    

    
    
    </div>
  );
}
