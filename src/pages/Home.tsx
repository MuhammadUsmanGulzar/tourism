import { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { expeditionsData } from '../data/expeditionsData';
import Image from '../components/Image';

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    window.scrollTo(0, 0);
    
    // --- Navbar scroll behavior ---
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const header = document.querySelector('.header');
          if (header) {
            if (window.scrollY > 50) {
              header.classList.add('header--scrolled');
            } else {
              header.classList.remove('header--scrolled');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      hamburger?.removeEventListener('click', openMenu);
      menuClose?.removeEventListener('click', closeMenu);
      links.forEach(link => {
        link.removeEventListener('click', closeMenu);
      });
    };
  
  }, []);
  
  const scrollFeaturedTrips = (dir: 'left' | 'right') => {
    const slider = document.querySelector('.featured-trips__slider');
    if (slider) {
      slider.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      <header className="header">

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

                
                <button className="navbar__hamburger" id="hamburger-menu" aria-label="Open navigation menu">
                    <i className="ri-menu-line"></i>
                </button>
            </div>

        </nav>

        
        <div className="mobile-menu" id="mobile-menu">
            <div className="mobile-menu__header">
                <div className="navbar__logo">
                    <a href="/">BROAD PEAK</a>
                </div>
                <button className="mobile-menu__close" id="mobile-menu-close" aria-label="Close navigation menu">
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

    

    <section className="hero" id="home">
        <div className="hero__overlay"></div>



        <div className="hero__container">

            <div className="hero__content">

                <span className="hero__tagline">
                    Gateway to Pakistan's Greatest Mountain Adventures
                </span>

                <h1 className="hero__title">
                    EXPLORE <br />
                    THE ROOF <br />
                    OF PAKISTAN
                </h1>

                <p className="hero__description">
                    Discover legendary expeditions, breathtaking landscapes, and authentic cultural experiences across Gilgit-Baltistan, from K2 Base Camp to Hunza and beyond.
                </p>

                <div className="hero__buttons">

                    <a
                        className="hero__btn hero__btn--primary"
                        href="/expeditions">
                        Explore Expeditions
                    </a>

                    <a 
                        className="hero__btn hero__btn--secondary"
                        href="/contact">
                        Plan Your Journey
                    </a>

                </div>

            </div>


            <div className="hero__stats">
                <div className="hero__stat">
                    <h3>5,585m</h3>
                    <p>HIGHEST TREK POINT</p>
                </div>

                <div className="hero__stat">
                    <h3>20+</h3>
                    <p>GUIDED ADVENTURES</p>
                </div>

                <div className="hero__stat">
                    <h3>500+</h3>
                    <p>HAPPY TRAVELERS</p>
                </div>
            </div>

        </div>

    </section>

    



<section className="featured-trips" id="expeditions">
    <div className="container">
        
        <div className="featured-trips__header">
            <div className="featured-trips__title-area">
                <span className="section-tag">POPULAR JOURNEYS</span>
                <h2 className="section-title">FEATURED EXPEDITIONS</h2>
            </div>

            <a href="/expeditions" className="featured-trips__view-all">
                Explore All Expeditions
                <i className="ri-arrow-right-line"></i>
            </a>
        </div>

        <div className="featured-trips__slider-wrapper">
            <button
              className="slider-btn slider-btn--absolute slider-btn--prev"
              id="featuredTripsPrev"
              aria-label="Previous featured expedition"
              onClick={() => scrollFeaturedTrips('left')}
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <button
              className="slider-btn slider-btn--absolute slider-btn--next"
              id="featuredTripsNext"
              aria-label="Next featured expedition"
              onClick={() => scrollFeaturedTrips('right')}
            >
              <i className="ri-arrow-right-line"></i>
            </button>

            <div className="featured-trips__slider">

            {Object.values(expeditionsData).map((exp) => (
                <article className="trip-card" key={exp.id}>
                    <div className="trip-card__image">
                        <Image
                            src={exp.gallery[0] || "/assets/images/k2.webp"}
                            alt={exp.title}
                            width="310"
                            height="210"
                         />
                        <div className="trip-card__altitude">
                            <i className="ri-arrow-up-fill"></i>
                            {exp.maxAltitude}
                        </div>
                    </div>
                    <div className="trip-card__content">
                        <h3 className="trip-card__title">
                            {exp.title}
                        </h3>
                        <div className="trip-card__difficulty">
                            <div className="trip-card__difficulty-label">
                                <span>Difficulty</span>
                                <span>{exp.difficulty}</span>
                            </div>
                            <div className="trip-card__difficulty-bar">
                                <div className={`trip-card__difficulty-fill trip-card__difficulty-fill--${exp.difficultyClass}`}></div>
                            </div>
                        </div>
                        <div className="trip-card__footer">
                            <div className="trip-card__days">
                                <strong>{exp.duration.replace(" Days", "")}</strong>
                                <span>Days</span>
                            </div>
                            <a href={`/expedition-detail?id=${exp.id}`} className="trip-card__button">
                                Book
                                <i className="ri-arrow-right-up-line"></i>
                            </a>
                        </div>
                    </div>
                </article>
            ))}

            </div>
        </div>


        

        <div className="featured-trips__progress-container">
            <div className="featured-trips__progress-bar"></div>
        </div>

        <div className="featured-trips__pagination">
            
        </div>

    </div>

</section>




<section className="who-we-are" id="who-we-are">
    <div className="container who-we-are__container">
        
        
        <div className="who-we-are__images">
            <div className="who-we-are__badge"><span>2021</span><span>EST</span></div>
            <Image src="/assets/images/who-we-are-main.webp" alt="Hunza Valley Morning" className="who-we-are__img-main" width="600" height="400" />
            <Image src="/assets/images/who-we-are-small.webp" alt="Mountain Tea" className="who-we-are__img-small" width="300" height="250" />
        </div>

        
        <div className="who-we-are__content">
            <span className="section-tag">WHY TRAVEL WITH US</span>
            <h2 className="section-title">LOCAL ROOTS,<br />GLOBAL STANDARDS</h2>
            
            <p className="who-we-are__desc">
                Our team combines local knowledge, experienced guides, and authentic cultural connections to create unforgettable journeys across Northern Pakistan.
            </p>

            <div className="who-we-are__grid">
                
                <div className="who-we-are__feature">
                    <i className="ri-compass-3-line feature-icon"></i>
                    <h3>LOCAL EXPERTISE</h3>
                    <p>Deep roots and unmatched local knowledge across Gilgit-Baltistan.</p>
                </div>

                <div className="who-we-are__feature">
                    <i className="ri-user-star-line feature-icon"></i>
                    <h3>EXPERIENCED GUIDES</h3>
                    <p>Decades of high-altitude mountain and trekking experience.</p>
                </div>

                <div className="who-we-are__feature">
                    <i className="ri-fire-line feature-icon"></i>
                    <h3>AUTHENTIC EXPERIENCES</h3>
                    <p>Genuine cultural immersion and deep local connections.</p>
                </div>

                <div className="who-we-are__feature">
                    <i className="ri-shield-check-line feature-icon"></i>
                    <h3>SAFETY FIRST</h3>
                    <p>Meticulous logistics with full contingency planning and emergency protocols.</p>
                </div>

            </div>

            <a href="/about" className="btn btn--primary" style={{ marginTop: "20px" }}>WHY CHOOSE US</a>
        </div>

    </div>
</section>




<section className="testimonials" id="testimonials">
    
    <div className="container testimonials__header">
        
        <div className="testimonials__title-wrap">
            <span className="section-subtitle">VERIFIED REVIEWS</span>
            <h2 className="section-title">WHAT TREKKERS SAY</h2>
        </div>
        
        <div className="testimonials__rating">
            <div className="testimonials__stars">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
            </div>
            <span>5.0 average • 100+ reviews</span>
        </div>

    </div>

    <div className="testimonials__slider-container">
        <div className="testimonials__slider" id="testimonialsSlider">
            
            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">K2 BASE CAMP TREK</span>
                </div>
                <p className="testimonial-card__text">
                    "My K2 Base Camp Trek with Broad Peak Adventures was phenomenal, largely thanks to our guide Basharat. His deep knowledge of the Karakoram Range and infectious enthusiasm made every step unforgettable."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">L</div>
                    <div className="testimonial-card__author-info">
                        <strong>Liu</strong>
                        <span>China</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">GONDOGORO LA & K2 TREK</span>
                </div>
                <p className="testimonial-card__text">
                    "The challenging trail took us through jaw-dropping landscapes, from glacier crossings to Concordia's stunning views. Our local guide's expertise made the journey safe and unforgettable."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">S</div>
                    <div className="testimonial-card__author-info">
                        <strong>Sophie</strong>
                        <span>France</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">SKARDU & HUNZA TOUR</span>
                </div>
                <p className="testimonial-card__text">
                    "Thoroughly impressed with the level of customer service. From the initial consultation to ongoing support, the team has been nothing but professional and responsive throughout."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">L</div>
                    <div className="testimonial-card__author-info">
                        <strong>Lena</strong>
                        <span>Germany</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">K2 BASE CAMP TREK</span>
                </div>
                <p className="testimonial-card__text">
                    "My K2 Base Camp Trek with Broad Peak Adventures was phenomenal, largely thanks to our guide Basharat. His deep knowledge of the Karakoram Range and infectious enthusiasm made every step unforgettable."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">L</div>
                    <div className="testimonial-card__author-info">
                        <strong>Liu</strong>
                        <span>China</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">GONDOGORO LA & K2 TREK</span>
                </div>
                <p className="testimonial-card__text">
                    "The challenging trail took us through jaw-dropping landscapes, from glacier crossings to Concordia's stunning views. Our local guide's expertise made the journey safe and unforgettable."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">S</div>
                    <div className="testimonial-card__author-info">
                        <strong>Sophie</strong>
                        <span>France</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">SKARDU & HUNZA TOUR</span>
                </div>
                <p className="testimonial-card__text">
                    "Thoroughly impressed with the level of customer service. From the initial consultation to ongoing support, the team has been nothing but professional and responsive throughout."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">L</div>
                    <div className="testimonial-card__author-info">
                        <strong>Lena</strong>
                        <span>Germany</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">K2 BASE CAMP TREK</span>
                </div>
                <p className="testimonial-card__text">
                    "My K2 Base Camp Trek with Broad Peak Adventures was phenomenal, largely thanks to our guide Basharat. His deep knowledge of the Karakoram Range and infectious enthusiasm made every step unforgettable."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">L</div>
                    <div className="testimonial-card__author-info">
                        <strong>Liu</strong>
                        <span>China</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">GONDOGORO LA & K2 TREK</span>
                </div>
                <p className="testimonial-card__text">
                    "The challenging trail took us through jaw-dropping landscapes, from glacier crossings to Concordia's stunning views. Our local guide's expertise made the journey safe and unforgettable."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">S</div>
                    <div className="testimonial-card__author-info">
                        <strong>Sophie</strong>
                        <span>France</span>
                    </div>
                </div>
            </div>

            
            <div className="testimonial-card">
                <div className="testimonial-card__bg-quote">"</div>
                <div className="testimonial-card__header">
                    <span className="testimonial-card__trek">SKARDU & HUNZA TOUR</span>
                </div>
                <p className="testimonial-card__text">
                    "Thoroughly impressed with the level of customer service. From the initial consultation to ongoing support, the team has been nothing but professional and responsive throughout."
                </p>
                <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">L</div>
                    <div className="testimonial-card__author-info">
                        <strong>Lena</strong>
                        <span>Germany</span>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div className="container">
        <div className="testimonials__progress-container" id="testimonialsProgressContainer">
            <div className="testimonials__progress-bar" id="testimonialsProgressBar"></div>
        </div>
    </div>

</section>


<section className="travel-insights" id="travel-insights">
    <div className="container">
        
        <div className="travel-insights__header">
            <div className="travel-insights__title-wrap">
                <span className="section-subtitle">TRAVEL GUIDES</span>
                <h2 className="section-title">PLAN YOUR ADVENTURE</h2>
            </div>
            <a href="/travel-guides" className="btn btn--outline">EXPLORE GUIDES <i className="ri-arrow-right-line"></i></a>
        </div>

        <div className="travel-insights__grid">
            
            
            <a href="/travel-guides" className="insight-card insight-card--large">
                <Image src="/assets/images/article_k2_guide_1783186031585.webp" alt="K2 Base Camp Guide" className="insight-card__image" width="600" height="400" />
                <div className="insight-card__overlay"></div>
                <div className="insight-card__content">
                    <span className="insight-card__category">TRAVEL GUIDE</span>
                    <h3 className="insight-card__title">K2 Base Camp Trek 2026: Essential Planning Guide for First-Time Visitors</h3>
                    <span className="insight-card__date">17 January 2026</span>
                </div>
                <div className="insight-card__hover-element">
                    <span>READ STORY</span>
                    <i className="ri-arrow-right-line"></i>
                </div>
            </a>

            
            <div className="travel-insights__stack">
                
                <a href="/blog-post?id=visa-logistics" className="insight-card insight-card--small">
                    <Image src="/assets/images/article_visa_logistics_1783186040279.webp" alt="Visa Logistics" className="insight-card__image" width="400" height="250" />
                    <div className="insight-card__overlay"></div>
                    <div className="insight-card__content">
                        <span className="insight-card__category">TRAVEL LOGISTICS</span>
                        <h3 className="insight-card__title">Pakistan Visa, Permits & Travel Requirements for International Travelers</h3>
                        <span className="insight-card__date">15 January 2026</span>
                    </div>
                    <div className="insight-card__hover-element">
                        <span>READ STORY</span>
                        <i className="ri-arrow-right-line"></i>
                    </div>
                </a>

                <a href="/blog-post?id=snow-lake" className="insight-card insight-card--small">
                    <Image src="/assets/images/article_snow_lake_1783186049575.webp" alt="Snow Lake Trek" className="insight-card__image" width="400" height="250" />
                    <div className="insight-card__overlay"></div>
                    <div className="insight-card__content">
                        <span className="insight-card__category">TREKKING & EXPEDITIONS</span>
                        <h3 className="insight-card__title">Snow Lake Trek: Everything You Need to Know Before You Go</h3>
                        <span className="insight-card__date">11 January 2026</span>
                    </div>
                    <div className="insight-card__hover-element">
                        <span>READ STORY</span>
                        <i className="ri-arrow-right-line"></i>
                    </div>
                </a>

            </div>

        </div>
    </div>
</section>


<section className="faq-preview-section" id="faq-preview" style={{ padding: "100px 0", backgroundColor: "#faf9f7" }}>
    <div className="container">
        
        <div className="faq-preview__header" style={{ textAlign: "center" }}>
            <span className="section-subtitle">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">PLAN WITH CONFIDENCE</h2>
            <p className="section-desc" style={{ maxWidth: "600px", margin: "0 auto 40px auto", color: "#555", fontFamily: "'Lora', serif", lineHeight: "1.6", fontSize: "1.05rem" }}>
                Everything you need to know before exploring Northern Pakistan.
            </p>
        </div>

        <div className="faq-accordion" style={{ maxWidth: "800px", margin: "0 auto" }}>
            
            <div className="faq-accordion__item active">
                <button className="faq-accordion__header">
                    <span>What is the best time to visit Northern Pakistan?</span>
                    <i className="ri-subtract-line faq-icon"></i>
                </button>
                <div className="faq-accordion__body" style={{ display: "block" }}>
                    <div className="faq-accordion__content">
                        The ideal season is from May to October. Spring offers blooming valleys, summer provides comfortable trekking conditions, and autumn brings spectacular colors across Hunza, Skardu, and surrounding regions.
                    </div>
                </div>
            </div>

            <div className="faq-accordion__item">
                <button className="faq-accordion__header">
                    <span>Do international travelers need special permits?</span>
                    <i className="ri-add-line faq-icon"></i>
                </button>
                <div className="faq-accordion__body" style={{ display: "none" }}>
                    <div className="faq-accordion__content">
                        Most visitors only require a valid Pakistani visa, although certain border regions may need additional permits. Our team assists guests with all necessary travel requirements before arrival.
                    </div>
                </div>
            </div>

            <div className="faq-accordion__item">
                <button className="faq-accordion__header">
                    <span>Are your tours suitable for beginners?</span>
                    <i className="ri-add-line faq-icon"></i>
                </button>
                <div className="faq-accordion__body" style={{ display: "none" }}>
                    <div className="faq-accordion__content">
                        Yes. We offer everything from easy cultural tours to challenging high-altitude expeditions, with clear difficulty levels and guidance for every experience level.
                    </div>
                </div>
            </div>

            <div className="faq-accordion__item">
                <button className="faq-accordion__header">
                    <span>What is included in expedition packages?</span>
                    <i className="ri-add-line faq-icon"></i>
                </button>
                <div className="faq-accordion__body" style={{ display: "none" }}>
                    <div className="faq-accordion__content">
                        Packages typically include accommodation, transportation, local guides, permits, meals during treks, camping equipment, and logistical support. Specific inclusions vary by itinerary.
                    </div>
                </div>
            </div>

            <div className="faq-accordion__item">
                <button className="faq-accordion__header">
                    <span>Is it safe to travel in Gilgit-Baltistan?</span>
                    <i className="ri-add-line faq-icon"></i>
                </button>
                <div className="faq-accordion__body" style={{ display: "none" }}>
                    <div className="faq-accordion__content">
                        Yes. Gilgit-Baltistan is considered one of Pakistan's safest tourism regions. We work with experienced local teams and maintain strict safety protocols for all journeys.
                    </div>
                </div>
            </div>

            <div className="faq-accordion__item">
                <button className="faq-accordion__header">
                    <span>Can I customize my itinerary?</span>
                    <i className="ri-add-line faq-icon"></i>
                </button>
                <div className="faq-accordion__body" style={{ display: "none" }}>
                    <div className="faq-accordion__content">
                        Absolutely. We provide tailored experiences for families, photographers, adventure travelers, and private groups based on individual interests and schedules.
                    </div>
                </div>
            </div>

        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="/faq" className="faq-preview__link" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "var(--primary-color)", letterSpacing: "1px", display: "inline-block", textDecoration: "none", transition: "color 0.3s ease" }}>VIEW ALL FAQS &rarr;</a>
        </div>

    </div>
</section>



<section className="cta-section" id="contact">
    
    <div className="cta-section__overlay"></div>
    
    <div className="container cta-section__content">
        
        <div className="cta-section__text">
            <span className="section-subtitle section-subtitle--light">THE ULTIMATE KARAKORAM EXPERIENCE</span>
            <h2 className="cta-section__title">READY FOR YOUR NEXT ADVENTURE?</h2>
            <p className="cta-section__desc">From the legendary K2 Base Camp to the hidden valleys of Gilgit-Baltistan, we create unforgettable journeys for travelers seeking adventure, culture, and the world's most spectacular mountain landscapes.</p>
        </div>
        
        <div className="cta-section__buttons">
            <a href="/expeditions" className="btn btn--white">
                EXPLORE EXPEDITIONS <i className="ri-compass-3-line" style={{ marginLeft: "8px" }}></i>
            </a>
            <a href="/contact" className="btn btn--outline-light">
                PLAN YOUR JOURNEY
            </a>
        </div>

    </div>

</section>


<footer className="footer">
    <div className="container footer__container">
        
        
        <div className="footer__col footer__col--about">
            <h3 className="footer__logo">BROAD PEAK</h3>
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
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="mailto:info@broadpeakadventures.com">Email Us</a></li>
                <li><a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">WhatsApp Inquiry</a></li>
            </ul>
        </div>

    </div>
    
    <div className="container footer__bottom" style={{ justifyContent: "center", textAlign: "center" }}>
        <p>&copy; 2026 Broad Peak Adventures. All Rights Reserved.</p>
    </div>
</footer>

    
    <a href="#" className="scroll-to-top" aria-label="Scroll to top">
        <i className="ri-arrow-up-line"></i>
    </a>
    </div>
  );
}
