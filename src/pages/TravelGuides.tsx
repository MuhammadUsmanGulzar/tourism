import React, { useEffect, useState } from 'react';
import '../css/travel-guides.css';
import { blogsData } from '../data/blogsData';

export default function TravelGuides() {
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
        body: JSON.stringify({ email, source: 'travel_guides_page', timestamp: new Date().toISOString() }),
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

  const featuredPost = blogsData['k2-guide'];

  return (
    <div className="page-wrapper animate-fade-in">
      

    
    <section className="tg-hero" id="tg-hero">
        <div className="tg-hero__bg" id="tg-hero-bg"></div>
        <div className="tg-hero__overlay"></div>
        <div className="tg-hero__container tg-container">
            <span className="tg-hero__tagline">TRAVEL GUIDES &amp; INSIGHTS</span>
            <h1 className="tg-hero__title">EXPLORE WITH<br />CONFIDENCE</h1>
            <p className="tg-hero__desc">Expert advice, local knowledge, trekking tips, cultural insights, and practical information for discovering Northern Pakistan.</p>
        </div>
    </section>

    
    <section className="tg-featured">
        <div className="tg-container">
            {featuredPost && (
                <div className="tg-featured__inner">
                    <div className="tg-featured__image">
                        <a href={`/blog-post?id=${featuredPost.id}`}>
                            <img src={featuredPost.bgImage} alt={featuredPost.title} width="600" height="400" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                        </a>
                    </div>
                    <div className="tg-featured__content">
                        <div className="tg-featured__meta">
                            <span className="tg-featured__date">{featuredPost.date}</span>
                            <span className="tg-featured__separator">•</span>
                            <span className="tg-featured__cat">{featuredPost.category}</span>
                        </div>
                        <h2 className="tg-featured__title">
                            <a href={`/blog-post?id=${featuredPost.id}`}>{featuredPost.title}</a>
                        </h2>
                        <p className="tg-featured__desc">{featuredPost.desc}</p>
                        <a href={`/blog-post?id=${featuredPost.id}`} className="tg-btn-primary">READ GUIDE <i className="ri-arrow-right-line"></i></a>
                    </div>
                </div>
            )}
        </div>
    </section>

    
    <section className="tg-grid-section">
        <div className="tg-container">
            <div className="tg-grid-section__header">
                <span className="tg-section-tag">LATEST INSIGHTS</span>
                <h2 className="tg-section-title">ESSENTIAL GUIDES</h2>
            </div>

            <div className="tg-grid">
                {Object.values(blogsData)
                    .filter(post => post.id !== 'k2-guide')
                    .map((post) => (
                        <article className="tg-card" key={post.id}>
                            <div className="tg-card__image">
                                <a href={`/blog-post?id=${post.id}`}>
                                    <img src={post.bgImage} alt={post.title} width="400" height="260" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                                </a>
                            </div>
                            <div className="tg-card__body">
                                <div className="tg-card__meta">
                                    <span className="tg-card__date">{post.date}</span>
                                    <span className="tg-card__cat">{post.category}</span>
                                </div>
                                <h3 className="tg-card__title">
                                    <a href={`/blog-post?id=${post.id}`}>{post.title}</a>
                                </h3>
                                <a href={`/blog-post?id=${post.id}`} className="tg-card__btn">Read More <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>
                    ))
                }
            </div>
        </div>
    </section>

    
    <section className="tg-cats">
        <div className="tg-container">
            <div className="tg-cats__header">
                <span className="tg-section-tag">GUIDE DIRECTORY</span>
                <h2 className="tg-section-title">BROWSE BY CATEGORY</h2>
            </div>

            <div className="tg-cats__grid">
                
                <div className="tg-cat-card">
                    <div className="tg-cat-card__icon"><i className="ri-compass-3-line"></i></div>
                    <h3 className="tg-cat-card__title">Trekking</h3>
                    <p className="tg-cat-card__desc">Detailed route maps, elevation coordinates, and altitude preparation tips.</p>
                </div>

                <div className="tg-cat-card">
                    <div className="tg-cat-card__icon"><i className="ri-palette-line"></i></div>
                    <h3 className="tg-cat-card__title">Culture</h3>
                    <p className="tg-cat-card__desc">Local language lists, historical castle tours, and village custom guidelines.</p>
                </div>

                <div className="tg-cat-card">
                    <div className="tg-cat-card__icon"><i className="ri-camera-lens-line"></i></div>
                    <h3 className="tg-cat-card__title">Photography</h3>
                    <p className="tg-cat-card__desc">Best scenic spots, camera gear recommendations, and winter battery management.</p>
                </div>

                <div className="tg-cat-card">
                    <div className="tg-cat-card__icon"><i className="ri-plane-line"></i></div>
                    <h3 className="tg-cat-card__title">Logistics</h3>
                    <p className="tg-cat-card__desc">Visa processing timelines, government NOC regulations, and internal flight schedules.</p>
                </div>

                <div className="tg-cat-card">
                    <div className="tg-cat-card__icon"><i className="ri-heart-pulse-line"></i></div>
                    <h3 className="tg-cat-card__title">Safety</h3>
                    <p className="tg-cat-card__desc">AMS symptoms checklist, water purification rules, and high-altitude emergency plans.</p>
                </div>

                <div className="tg-cat-card">
                    <div className="tg-cat-card__icon"><i className="ri-calendar-event-line"></i></div>
                    <h3 className="tg-cat-card__title">Seasonal Travel</h3>
                    <p className="tg-cat-card__desc">Timing your visit for blossom spring blooms, summer peaks, or fiery autumn colors.</p>
                </div>

            </div>
        </div>
    </section>

    
    <section className="editorial-content-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)' }}>
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
                <div>
                    <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>MOUNTAIN WISDOM</span>
                    <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '24px' }}>KNOWLEDGE FROM THE MOUNTAINS</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>At Broad Peak Adventures, we believe that the best guides are those who have lived in the valleys for their entire life. High-altitude environments can change within minutes, and local intuition is often the most valuable safety asset during an expedition.</p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We are committed to sharing this local wisdom. Through our editorial team of guides, cooks, and porters, we catalog ancestral weather tracking styles, historical routes, balti culinary choices, and local traditions to prepare you mentally and physically for the Karakoram.</p>
                </div>
                <div>
                    <img src="/assets/images/who-we-are-small.webp" alt="Balti guide standing in mountains" width="600" height="400" loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                </div>
            </div>
        </div>
    </section>

    
    <section className="editorial-cta-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)', background: 'var(--bg-dark-alt)' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>GET EXPEDITION INSIGHTS</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>GET EXPEDITION INSIGHTS</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>Receive trekking guides, seasonal advice, route updates, and travel inspiration.</p>
            
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{ 
                    padding: '16px 20px', 
                    background: 'transparent', 
                    border: '1px solid var(--hairline)', 
                    color: 'var(--white)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                />
                <button type="submit" disabled={loading} className="btn-editorial" style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? 'CHECKING...' : 'SUBSCRIBE'} <i className="ri-arrow-right-line"></i>
                </button>
            </form>
            {feedback && (
              <p style={{
                marginTop: '16px',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: feedback.type === 'error' ? '#ef4444' : feedback.type === 'info' ? 'var(--gold)' : '#10b981'
              }}>
                {feedback.text}
              </p>
            )}

            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--hairline)' }}>
              <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>THE KARAKORAM IS CALLING</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '24px' }}>READY TO EXPERIENCE THE KARAKORAM?</h3>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/expeditions" className="btn-editorial">VIEW EXPEDITIONS</a>
                  <a href="/contact" className="btn-editorial-outline">CONTACT OUR TEAM</a>
              </div>
            </div>
        </div>
    </section>

    
    

    
    
    </div>
  );
}
