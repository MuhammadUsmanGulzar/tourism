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
                <button className="navbar__hamburger" id="tg-hamburger">
                    <i className="ri-menu-line"></i>
                </button>
            </div>
        </nav>

        
        <div className="mobile-menu" id="tg-mobile-menu">
            <div className="mobile-menu__header">
                <div className="navbar__logo">
                    <a href="/">BROAD PEAK</a>
                </div>
                <button className="mobile-menu__close" id="tg-menu-close">
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
                            <img src={featuredPost.bgImage} alt={featuredPost.title} loading="lazy" referrerPolicy="no-referrer" />
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
                                    <img src={post.bgImage} alt={post.title} loading="lazy" referrerPolicy="no-referrer" />
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

    
    <section className="tg-insights">
        <div className="tg-container">
            <div className="tg-insights__inner">
                <div className="tg-insights__text">
                    <span className="tg-section-tag">MOUNTAIN WISDOM</span>
                    <h2 className="tg-section-title">KNOWLEDGE FROM THE MOUNTAINS</h2>
                    <p className="tg-insights__desc">At Broad Peak Adventures, we believe that the best guides are those who have lived in the valleys for their entire life. High-altitude environments can change within minutes, and local intuition is often the most valuable safety asset during an expedition.</p>
                    <p className="tg-insights__desc">We are committed to sharing this local wisdom. Through our editorial team of guides, cooks, and porters, we catalog ancestral weather tracking styles, historical routes, balti culinary choices, and local traditions to prepare you mentally and physically for the Karakoram.</p>
                </div>
                <div className="tg-insights__media">
                    <img src="/assets/images/who-we-are-small.webp" alt="Balti guide standing in mountains" loading="lazy" referrerPolicy="no-referrer" />
                </div>
            </div>
        </div>
    </section>

    
    <section className="tg-newsletter" id="tg-newsletter">
        <div className="tg-container">
            <div className="tg-newsletter__inner">
                <h2 className="tg-newsletter__title">GET EXPEDITION INSIGHTS</h2>
                <p className="tg-newsletter__desc">Receive trekking guides, seasonal advice, route updates, and travel inspiration.</p>
                
                <form className="tg-newsletter__form" onSubmit={handleSubscribe}>
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

    
    <section className="tg-cta">
        <div className="tg-cta__overlay"></div>
        <div className="tg-container">
            <div className="tg-cta__content">
                <div className="tg-cta__text">
                    <span className="tg-cta__tag">THE KARAKORAM IS CALLING</span>
                    <h2 className="tg-cta__title">READY TO EXPERIENCE THE KARAKORAM?</h2>
                    <p className="tg-cta__desc">Join our team of local guides and discover the mountains, valleys, and lakes of Gilgit-Baltistan.</p>
                </div>
                <div className="tg-cta__buttons">
                    <a href="/expeditions" className="tg-btn-white">VIEW EXPEDITIONS</a>
                    <a href="/contact" className="tg-btn-outline-light">CONTACT OUR TEAM</a>
                </div>
            </div>
        </div>
    </section>

    
    <footer className="footer">
        <div className="tg-container footer__container">

            
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
                    <li><a href="/terms">Terms &amp; Conditions</a></li>
                    <li><a href="mailto:info@broadpeakadventures.com">Email Us</a></li>
                    <li><a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer">WhatsApp Inquiry</a></li>
                </ul>
            </div>

        </div>

        <div className="tg-container footer__bottom">
            <p>&copy; 2026 Broad Peak Adventures. All Rights Reserved.</p>
        </div>
    </footer>

    
    <a href="#" className="scroll-to-top">
        <i className="ri-arrow-up-line"></i>
    </a>
    </div>
  );
}
