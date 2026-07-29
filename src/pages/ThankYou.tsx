import React, { useEffect, useState } from 'react';
import '../css/thank-you.css';

export default function ThankYou() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setFeedback(null);

    const webhookUrl = import.meta.env.VITE_N8N_NEWSLETTER_WEBHOOK_URL;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'thank_you_page', timestamp: new Date().toISOString() }),
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        // Handle non-JSON or plain text responses
      }

      if (response.ok) {
        const item = Array.isArray(data) ? data[0] : data;

        if (item?.isEmpty === true) {
          // User not in database -> New Subscriber
          setFeedback({
            type: 'success',
            text: item?.message || "Thank you for subscribing! Check your inbox for updates."
          });
          setEmail('');
        } else if (item?.isEmpty === false || item?.status === 'already_subscribed' || item?.alreadySubscribed || item?.exists) {
          // User already exists in database
          setFeedback({
            type: 'info',
            text: item?.message || "You are already subscribed! We'll keep sending you updates on this email."
          });
        } else {
          // Default fallback response
          setFeedback({
            type: 'success',
            text: item?.message || "Thank you for subscribing! Check your inbox for updates."
          });
          setEmail('');
        }
      } else {
        setFeedback({
          type: 'error',
          text: data.message || 'Subscription service temporarily unavailable. Please try again.'
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

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
      

    
    <section className="ty-hero" id="ty-hero">
        <div className="ty-hero__bg" id="ty-hero-bg"></div>
        <div className="ty-hero__overlay"></div>
        <div className="ty-hero__container ty-container">
            <span className="ty-hero__tagline">YOUR JOURNEY BEGINS HERE</span>
            <h1 className="ty-hero__title">THANK YOU FOR REACHING OUT</h1>
            <p className="ty-hero__desc">Our expedition team has received your inquiry and will contact you within 24 hours to start planning your adventure across Northern Pakistan.</p>
        </div>
    </section>

    
    <section className="ty-confirmation-section">
        <div className="ty-container">
            <div className="ty-confirmation-card">
                <div className="ty-confirmation-icon">
                    <i className="ri-mail-check-line"></i>
                </div>
                <h2>INQUIRY SUCCESSFULLY RECEIVED</h2>
                <p>Thank you for choosing Broad Peak Adventures. We're excited to help you explore the spectacular landscapes of the Karakoram. Here is what you can expect next:</p>
                
                <ul className="ty-confirmation-list">
                    <li><i className="ri-checkbox-circle-fill"></i> Inquiry Received</li>
                    <li><i className="ri-checkbox-circle-fill"></i> Response within 24 hours</li>
                    <li><i className="ri-checkbox-circle-fill"></i> Local experts assigned</li>
                    <li><i className="ri-checkbox-circle-fill"></i> Personalized itinerary support</li>
                </ul>
            </div>
        </div>
    </section>

    
    <section className="ty-next-section">
        <div className="ty-container">
            <h3 className="ty-section-subtitle">THE PROCESS</h3>
            <h2 className="ty-section-title">WHAT HAPPENS NEXT</h2>

            <div className="ty-next-grid">
                
                <div className="ty-next-card">
                    <div className="ty-next-card__icon"><i className="ri-file-search-line"></i></div>
                    <div className="ty-next-card__number">01</div>
                    <h4>We Review Your Requirements</h4>
                    <p>Our team carefully analyzes your dates, group size, and specific adventure interests.</p>
                </div>
                
                <div className="ty-next-card">
                    <div className="ty-next-card__icon"><i className="ri-customer-service-2-line"></i></div>
                    <div className="ty-next-card__number">02</div>
                    <h4>Our Local Team Contacts You</h4>
                    <p>A dedicated expedition specialist based in Gilgit-Baltistan will reach out to you.</p>
                </div>
                
                <div className="ty-next-card">
                    <div className="ty-next-card__icon"><i className="ri-map-2-line"></i></div>
                    <div className="ty-next-card__number">03</div>
                    <h4>Your Custom Journey Begins</h4>
                    <p>We'll refine your itinerary, organize permits, and prepare for your arrival.</p>
                </div>
            </div>
        </div>
    </section>

    
    <section className="ty-actions-section">
        <div className="ty-container ty-actions-inner">
            <a href="/expeditions" className="ty-btn-primary">
                EXPLORE EXPEDITIONS <i className="ri-arrow-right-line"></i>
            </a>
            <a href="/" className="ty-btn-outline">
                <i className="ri-home-4-line"></i> RETURN HOME
            </a>
        </div>
    </section>

    
    <section className="ty-newsletter-section">
        <div className="ty-container">
            <div className="ty-newsletter-box">
                <div className="ty-newsletter-content">
                    <h2>STAY INSPIRED</h2>
                    <p>Receive travel stories, expedition updates, and seasonal recommendations from the Karakoram.</p>
                </div>
                <form className="ty-newsletter-form" onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                      {loading ? 'CHECKING...' : 'SUBSCRIBE'}
                    </button>
                </form>
                {feedback && (
                  <p style={{
                    marginTop: '16px',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    color: feedback.type === 'error' ? '#ef4444' : feedback.type === 'info' ? '#f59e0b' : '#10b981'
                  }}>
                    {feedback.text}
                  </p>
                )}
            </div>
        </div>
    </section>

    
    <section className="ty-cta">
        <div className="ty-cta__overlay"></div>
        <div className="ty-container">
            <div className="ty-cta__content">
                <div className="ty-cta__text">
                    <h2 className="ty-cta__title">THE MOUNTAINS ARE WAITING</h2>
                    <p className="ty-cta__desc">Until we speak, continue exploring the breathtaking landscapes, cultures, and adventures of Northern Pakistan.</p>
                </div>
                <div className="ty-cta__buttons">
                    <a href="/blog" className="ty-btn-white">READ OUR BLOG</a>
                </div>
            </div>
        </div>
    </section>

    
    

    
    
    </div>
  );
}
