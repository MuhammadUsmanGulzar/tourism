import { useEffect } from 'react';
import '../css/faq.css';

export default function Faq() {
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
      

    
    <section className="faq-hero" id="faq-hero">
        <div className="faq-hero__bg" id="faq-hero-bg"></div>
        <div className="faq-hero__overlay"></div>
        <div className="faq-hero__container faq-container">
            <span className="faq-hero__tagline">TRAVEL WITH CONFIDENCE</span>
            <h1 className="faq-hero__title">FREQUENTLY ASKED<br />QUESTIONS</h1>
            <p className="faq-hero__desc">Everything you need to know before exploring the mountains, valleys, and cultures of Northern Pakistan.</p>
        </div>
    </section>

    
    <section className="faq-section">
        <div className="faq-container">
            
            
            <div className="faq-category">
                <div className="faq-category__header">
                    <span className="faq-category__tag">01</span>
                    <h2 className="faq-category__title">PLANNING YOUR JOURNEY</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>What is the best time to visit Northern Pakistan?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>The best time to visit depends on your goals. Spring (April to May) is beautiful for cherry blossoms in Hunza and Skardu. Summer (June to August) is the prime season for high-altitude trekking and expeditions. Autumn (September to October) offers stunning fall colors, while winter (November to March) is ideal for snow leopards and winter sports.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Do I need a visa to visit Pakistan?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes, most nationalities require a visa to enter Pakistan. The good news is that Pakistan offers an easy online E-Visa system for citizens of over 190 countries. Tourist visas are usually processed within 7-10 working days. We provide a Letter of Invitation (LOI) to our booked clients to support their application.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>How many days should I plan for my trip?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>For cultural tours and sightseeing, we recommend a minimum of 7 to 10 days. For major trekking expeditions like K2 Base Camp, you should plan for at least 20 to 22 days to allow for proper acclimatization and travel logistics.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Can I customize my itinerary?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Absolutely. We specialize in tailor-made itineraries. Whether you want to add an extra day for photography, combine a cultural tour with a short trek, or plan a private family holiday, our team will design the perfect trip for you.</p>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="faq-category">
                <div className="faq-category__header">
                    <span className="faq-category__tag">02</span>
                    <h2 className="faq-category__title">EXPEDITIONS &amp; TREKKING</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>How physically demanding are your expeditions?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Our expeditions range from moderate to extreme. Treks like Fairy Meadows are suitable for beginners with average fitness. High-altitude treks like K2 Base Camp or Snow Lake require excellent physical condition, endurance, and previous trekking experience over rugged terrain.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Do I need previous trekking experience?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>For high-altitude treks (above 4,000m), previous experience is highly recommended. However, we offer several lower-altitude treks and cultural tours that require no prior experience—just a positive attitude and basic fitness.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>What equipment should I bring?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Upon booking, we provide a comprehensive packing list tailored to your specific expedition. Generally, you will need a good quality sleeping bag, sturdy trekking boots, layered clothing, a down jacket, and personal medication. We provide all communal camping and cooking gear.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Are permits included in the packages?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes, all required government permits, National Park fees, and trekking royalties (where applicable) are included in our expedition packages. We handle all the paperwork for you.</p>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="faq-category">
                <div className="faq-category__header">
                    <span className="faq-category__tag">03</span>
                    <h2 className="faq-category__title">SAFETY FIRST</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>How safe is travel in Gilgit-Baltistan?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Gilgit-Baltistan is renowned as one of the safest regions in Pakistan. The local communities are incredibly hospitable, peaceful, and welcoming to tourists. Crime rates are exceptionally low.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Do you provide emergency support?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes. Our guides are trained in wilderness first aid. On remote expeditions, we carry satellite phones for emergency communication. We work closely with local authorities and the Askari Aviation helicopter rescue service for emergency evacuations.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Is travel insurance required?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes. Comprehensive travel insurance that covers high-altitude trekking (up to the maximum altitude of your trek) and emergency helicopter evacuation is mandatory for all our trekking and expedition clients.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Who leads the expeditions?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Our expeditions are led by highly experienced, licensed local guides who have spent their lives in these mountains. They possess intimate knowledge of the terrain, weather patterns, and local cultures.</p>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="faq-category">
                <div className="faq-category__header">
                    <span className="faq-category__tag">04</span>
                    <h2 className="faq-category__title">BOOKING INFORMATION</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>How do I reserve a trip?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>You can start by contacting us via our website, email, or WhatsApp. Once we finalize your itinerary, we will send you a booking form and an invoice for a deposit to secure your reservation.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>What payment methods do you accept?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>We accept international bank wire transfers (SWIFT). For some services, we may also accept secure online credit card payments via third-party processors. Details will be provided during booking.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>What is your cancellation policy?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Cancellations made 60 days prior to departure receive a full refund minus a small administrative fee. Cancellations between 30-59 days incur a 50% charge. No refunds are available for cancellations within 30 days of the trip start date.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Do you offer group discounts?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes, we offer special rates for university groups, photography clubs, and large friend groups (usually 8 or more people). Please contact us directly for a custom quote.</p>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="faq-category">
                <div className="faq-category__header">
                    <span className="faq-category__tag">05</span>
                    <h2 className="faq-category__title">CUSTOM EXPERIENCES</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Can families book private tours?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Absolutely. We organize many family-friendly tours that focus on culture, light walks, and comfortable accommodations, ensuring a safe and memorable experience for all ages.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Do you organize photography expeditions?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes, we design specialized itineraries that prioritize golden hour lighting, unique vantage points, and slower pacing to allow photographers ample time to capture the stunning landscapes and cultures.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Can luxury itineraries be arranged?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Yes. While Northern Pakistan is rugged, several areas like Hunza and Skardu now offer premium boutique hotels. We can arrange luxury transport, premium accommodations, and private chefs for a high-end experience.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <button className="faq-item__question">
                            <span>Are cultural experiences available?</span>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                        <div className="faq-item__answer">
                            <p>Cultural immersion is a core part of what we do. We can arrange visits to ancient forts, traditional music performances, local family dinners, and artisan workshops to connect you deeply with the region's heritage.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    
    <section className="faq-cta">
        <div className="faq-cta__overlay"></div>
        <div className="faq-container">
            <div className="faq-cta__content">
                <div className="faq-cta__text">
                    <span className="faq-cta__tag">WE'RE HERE TO HELP</span>
                    <h2 className="faq-cta__title">CAN'T FIND YOUR ANSWER?</h2>
                    <p className="faq-cta__desc">Our local team is happy to help you plan the perfect Karakoram experience.</p>
                </div>
                <div className="faq-cta__buttons">
                    <a href="/contact" className="faq-btn-white">CONTACT OUR TEAM</a>
                    <a href="/expeditions" className="faq-btn-outline">EXPLORE EXPEDITIONS</a>
                </div>
            </div>
        </div>
    </section>

    
    

    
    
    </div>
  );
}
