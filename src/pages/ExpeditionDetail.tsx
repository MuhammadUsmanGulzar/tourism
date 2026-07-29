import { useState, useEffect, FormEvent } from 'react';
import { expeditionsData } from '../data/expeditionsData';
import '../css/expedition-detail.css';
import CustomDropdown from '../components/CustomDropdown';

export default function ExpeditionDetail() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0); // Default first one open
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState('1');

  // Parse the current expedition ID from the query parameter
  const searchParams = new URLSearchParams(window.location.search);
  const currentId = searchParams.get('id') || 'k2';
  
  // Lookup expedition data, fallback to K2 if invalid
  const expedition = expeditionsData[currentId] || expeditionsData['k2'];

  useEffect(() => {
    window.scrollTo(0, 0);
    setHeroLoaded(true);
    
    // Navbar scroll behavior
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentId]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const name = (form.querySelector('#name') as HTMLInputElement).value;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const country = (form.querySelector('#country') as HTMLInputElement).value;
    const date = (form.querySelector('#date') as HTMLInputElement).value;
    const size = groupSize;
    const message = (form.querySelector('#message') as HTMLTextAreaElement).value;

    const webhookUrl = import.meta.env.VITE_N8N_EXPEDITION_WEBHOOK_URL || '';

    const payload = {
      fullname: name,
      email,
      country,
      date,
      groupsize: size,
      message,
      interest: expedition.title,
      expedition: {
        id: expedition.id,
        title: expedition.title,
        difficulty: expedition.difficulty,
        duration: expedition.duration,
        maxAltitude: expedition.maxAltitude,
        startingPrice: expedition.startingPrice
      },
      formType: 'expedition-inquiry',
      submittedAt: new Date().toISOString()
    };

    // Trigger n8n webhook asynchronously with JSON POST
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn('n8n Webhook Error:', err));

    // Immediately redirect to thank you page without blocking
    window.history.pushState({}, '', '/thank-you');
    window.dispatchEvent(new Event('pushstate'));
  };

  // Get difficulty-specific class for hero tag
  const getDifficultyClass = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'expd-hero__meta-val--easy';
      case 'moderate': return 'expd-hero__meta-val--moderate';
      case 'hard': return 'expd-hero__meta-val--hard';
      case 'extreme': return 'expd-hero__meta-val--extreme';
      default: return '';
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* Dynamic Header */}
      

      {/* Hero Section */}
      <section className="expd-hero">
        <div 
          className={`expd-hero__bg ${heroLoaded ? 'abt-hero__bg--loaded' : ''}`} 
          id="expd-hero-bg"
          style={{ backgroundImage: `url(${expedition.gallery[0] || '/assets/images/k2.webp'})` }}
        ></div>
        <div className="expd-hero__overlay"></div>
        <div className="expd-hero__container expd-container">
          <span className="expd-hero__tagline">{expedition.tagline}</span>
          <h1 className="expd-hero__title">{expedition.title}</h1>
          <p className="expd-hero__desc">{expedition.desc}</p>
          
          <div className="expd-hero__meta-grid">
            <div className="expd-hero__meta-item">
              <span className="expd-hero__meta-label">Difficulty</span>
              <span className={`expd-hero__meta-val ${getDifficultyClass(expedition.difficulty)}`}>
                {expedition.difficulty}
              </span>
            </div>
            <div className="expd-hero__meta-item">
              <span className="expd-hero__meta-label">Duration</span>
              <span className="expd-hero__meta-val">{expedition.duration}</span>
            </div>
            <div className="expd-hero__meta-item">
              <span className="expd-hero__meta-label">Max Altitude</span>
              <span className="expd-hero__meta-val">{expedition.maxAltitude}</span>
            </div>
            <div className="expd-hero__meta-item">
              <span className="expd-hero__meta-label">Best Season</span>
              <span className="expd-hero__meta-val">{expedition.bestSeason}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Grid */}
      <section className="expd-facts">
        <div className="expd-container">
          <div className="expd-facts__grid">
            <div className="expd-fact-card">
              <div className="expd-fact-card__icon"><i className="ri-time-line"></i></div>
              <div className="expd-fact-card__content">
                <span className="expd-fact-card__label">Duration</span>
                <span className="expd-fact-card__val">{expedition.duration}</span>
              </div>
            </div>

            <div className="expd-fact-card">
              <div className="expd-fact-card__icon"><i className="ri-mountain-line"></i></div>
              <div className="expd-fact-card__content">
                <span className="expd-fact-card__label">Altitude</span>
                <span className="expd-fact-card__val">{expedition.maxAltitude}</span>
              </div>
            </div>

            <div className="expd-fact-card">
              <div className="expd-fact-card__icon"><i className="ri-bar-chart-box-line"></i></div>
              <div className="expd-fact-card__content">
                <span className="expd-fact-card__label">Difficulty</span>
                <span className="expd-fact-card__val">{expedition.difficulty}</span>
              </div>
            </div>

            <div className="expd-fact-card">
              <div className="expd-fact-card__icon"><i className="ri-group-line"></i></div>
              <div className="expd-fact-card__content">
                <span className="expd-fact-card__label">Group Size</span>
                <span className="expd-fact-card__val">{expedition.groupSize}</span>
              </div>
            </div>

            <div className="expd-fact-card">
              <div className="expd-fact-card__icon"><i className="ri-hotel-bed-line"></i></div>
              <div className="expd-fact-card__content">
                <span className="expd-fact-card__label">Accommodation</span>
                <span className="expd-fact-card__val">{expedition.accommodation}</span>
              </div>
            </div>

            <div className="expd-fact-card">
              <div className="expd-fact-card__icon"><i className="ri-price-tag-3-line"></i></div>
              <div className="expd-fact-card__content">
                <span className="expd-fact-card__label">Starting Price</span>
                <span className="expd-fact-card__val">{expedition.startingPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="expd-overview">
        <div className="expd-container">
          <div className="expd-overview__inner">
            <div className="expd-overview__text">
              <span className="expd-overview__subtitle">{expedition.overviewSubtitle}</span>
              <h2 className="expd-overview__title">{expedition.overviewTitle}</h2>
              {expedition.overviewDescs.map((desc, i) => (
                <p key={i} className="expd-overview__desc">{desc}</p>
              ))}
            </div>
            <div className="expd-overview__media">
              <img src={expedition.overviewImage} alt={`${expedition.title} trekking`} width="600" height="400" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="expd-itinerary">
        <div className="expd-container">
          <div className="expd-itinerary__header">
            <span className="expd-section-tag">DAY-BY-DAY ROUTE</span>
            <h2 className="expd-section-title">THE ITINERARY</h2>
          </div>

          <div className="expd-timeline">
            {expedition.itinerary.map((item, index) => (
              <div key={index} className="expd-timeline__item">
                <div className="expd-timeline__day">{item.day}</div>
                <div className="expd-timeline__content">
                  <h3 className="expd-timeline__title">{item.title}</h3>
                  <p className="expd-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions / Exclusions */}
      <section className="expd-inclusions">
        <div className="expd-container">
          <div className="expd-inclusions__grid">
            <div className="expd-inclusion-box">
              <h3 className="expd-inclusion-box__title">
                <i className="ri-checkbox-circle-line" style={{ color: "#3a9b4e" }}></i> What's Included
              </h3>
              <ul className="expd-inclusion-box__list">
                {expedition.inclusions.map((inc, i) => (
                  <li key={i}><i className="ri-check-line"></i> {inc}</li>
                ))}
              </ul>
            </div>

            <div className="expd-inclusion-box expd-inclusion-box--not">
              <h3 className="expd-inclusion-box__title">
                <i className="ri-close-circle-line" style={{ color: "#c0392b" }}></i> Not Included
              </h3>
              <ul className="expd-inclusion-box__list">
                {expedition.exclusions.map((exc, i) => (
                  <li key={i}><i className="ri-close-line"></i> {exc}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="expd-gallery">
        <div className="expd-container">
          <div className="expd-gallery__header">
            <span className="expd-section-tag">VISUAL JOURNEY</span>
            <h2 className="expd-section-title">EXPEDITION GALLERY</h2>
          </div>

          <div className="expd-gallery__grid">
            {expedition.gallery.map((imgUrl, i) => (
              <div key={i} className="expd-gallery__item">
                <img src={imgUrl} alt={`${expedition.title} peak panorama ${i + 1}`} width="400" height="260" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL FAQ MATRIX */}
      <section className="faq-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">PLAN WITH CONFIDENCE</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Essential details to prepare you for the challenge ahead.</p>
          </div>

          <div className="faq-matrix">
            {expedition.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="faq-item">
                  <button type="button" className="faq-header" onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <i className={isOpen ? "ri-subtract-line" : "ri-add-line"}></i>
                  </button>
                  {isOpen && (
                    <div className="faq-content">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking / Inquiry Form */}
      <section className="editorial-content-section" id="expd-inquiry" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)', background: 'var(--bg-dark-alt)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            
            <div style={{ paddingRight: '40px' }}>
              <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>BOOKING &amp; PLANNING</span>
              <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '24px' }}>PLAN YOUR {expedition.title}</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>Have questions about dates, custom requirements, or gear? Submit a quick inquiry below or reach out directly to our team via WhatsApp to get real-time advice from local guides.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--white)', fontSize: '1.1rem' }}>
                  <i className="ri-mail-line" style={{ color: 'var(--gold)' }}></i>
                  <span>info@broadpeakadventures.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--white)', fontSize: '1.1rem' }}>
                  <i className="ri-phone-line" style={{ color: 'var(--gold)' }}></i>
                  <span>+92 312 3456789</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-dark)', padding: '40px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="name" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Name</label>
                  <input type="text" id="name" placeholder="Your full name" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="email" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Email</label>
                  <input type="email" id="email" placeholder="Your email address" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }} />
                </div>
                
                <div className="expd-form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="country" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Country</label>
                    <input type="text" id="country" placeholder="Your country" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="date" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Preferred Date</label>
                    <input type="date" id="date" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', colorScheme: 'dark' }} />
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <CustomDropdown
                    label="GROUP SIZE"
                    value={groupSize}
                    onChange={setGroupSize}
                    variant="outline"
                    options={[
                      { value: "1", label: "1 Person" },
                      { value: "2", label: "2 People" },
                      { value: "3-5", label: "3 - 5 People" },
                      { value: "6-10", label: "6 - 10 People" },
                      { value: "11+", label: "11+ People" }
                    ]}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="message" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Message</label>
                  <textarea id="message" rows={4} placeholder="How can we help you plan your journey?" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', resize: 'vertical' }}></textarea>
                </div>
                
                {submitError && <div style={{ color: '#ef4444', fontSize: '0.9rem' }}>{submitError}</div>}
                
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                  <button type="submit" className="btn-editorial" disabled={isSubmitting} style={{ flex: 1, justifyContent: 'center' }}>
                    {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'} <i className="ri-arrow-right-line"></i>
                  </button>
                  <a href="https://wa.me/923123456789" target="_blank" rel="noopener noreferrer" className="btn-editorial-outline" style={{ flex: 1, justifyContent: 'center' }}>
                    <i className="ri-whatsapp-line"></i> WHATSAPP US
                  </a>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="editorial-cta-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>THE KARAKORAM CALLS</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '24px' }}>READY FOR THE JOURNEY OF A LIFETIME?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>Join one of the world's greatest adventure experiences with experienced local guides and authentic mountain hospitality.</p>
            
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/contact" className="btn-editorial">CONTACT OUR TEAM</a>
                <a href="/expeditions" className="btn-editorial-outline">EXPLORE MORE EXPEDITIONS</a>
            </div>
        </div>
      </section>

      {/* Footer */}
      

      {/* Scroll to Top */}
      
    </div>
  );
}
