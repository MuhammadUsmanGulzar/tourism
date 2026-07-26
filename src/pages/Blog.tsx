import React, { useEffect, useState } from 'react';
import '../css/blog.css';
import { blogsData } from '../data/blogsData';

export default function Blog() {
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
        body: JSON.stringify({ email, source: 'blog_page', timestamp: new Date().toISOString() }),
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        // Handle cases where n8n returns plain text or non-json
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
                <button className="navbar__hamburger" id="blog-hamburger">
                    <i className="ri-menu-line"></i>
                </button>
            </div>
        </nav>

        
        <div className="mobile-menu" id="blog-mobile-menu">
            <div className="mobile-menu__header">
                <div className="navbar__logo">
                    <a href="/">BROAD PEAK</a>
                </div>
                <button className="mobile-menu__close" id="blog-menu-close">
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

    
    <section className="blog-hero" id="blog-hero">
        <div className="blog-hero__bg" id="blog-hero-bg"></div>
        <div className="blog-hero__overlay"></div>
        <div className="blog-hero__container blog-container">
            <span className="blog-hero__tagline">STORIES FROM THE KARAKORAM</span>
            <h1 className="blog-hero__title">EXPLORE THE MOUNTAINS<br />THROUGH STORIES</h1>
            <p className="blog-hero__desc">Travel guides, expedition journals, cultural insights, and practical advice from Northern Pakistan.</p>
        </div>
    </section>
    <section className="blog-featured">
        <div className="blog-container">
                    {featuredPost && (
                        <div className="blog-featured__inner">
                            <div className="blog-featured__image">
                                <a href={`/blog-post?id=${featuredPost.id}`}>
                                    <img src={featuredPost.bgImage} alt={featuredPost.title} loading="lazy" referrerPolicy="no-referrer" />
                                </a>
                            </div>
                            <div className="blog-featured__content">
                                <div className="blog-featured__meta">
                                    <span className="blog-featured__cat">{featuredPost.category}</span>
                                    <span className="blog-featured__separator">•</span>
                                    <span className="blog-featured__reading-time"><i className="ri-time-line"></i> {featuredPost.readTime}</span>
                                </div>
                                <h2 className="blog-featured__title">
                                    <a href={`/blog-post?id=${featuredPost.id}`}>{featuredPost.title}</a>
                                </h2>
                                <p className="blog-featured__desc">{featuredPost.desc}</p>
                                <a href={`/blog-post?id=${featuredPost.id}`} className="blog-btn-primary">READ ARTICLE <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </div>
                    )}
                </div>
            </section>

    
    <section className="blog-grid-section">
        <div className="blog-container">
            <div className="blog-grid-section__header">
                <span className="blog-section-tag">LATEST POSTS</span>
                <h2 className="blog-section-title">RECENT ARTICLES</h2>
            </div>

            <div className="blog-grid">
                {Object.values(blogsData)
                    .filter(post => post.id !== 'k2-guide')
                    .map((post) => (
                        <article className="blog-card" key={post.id}>
                            <div className="blog-card__image">
                                <a href={`/blog-post?id=${post.id}`}>
                                    <img src={post.bgImage} alt={post.title} loading="lazy" referrerPolicy="no-referrer" />
                                </a>
                            </div>
                            <div className="blog-card__body">
                                <div className="blog-card__meta">
                                    <span className="blog-card__cat">{post.category}</span>
                                    <span className="blog-card__date">{post.date}</span>
                                    <span className="blog-card__time"><i className="ri-time-line"></i> {post.readTime}</span>
                                </div>
                                <h3 className="blog-card__title">
                                    <a href={`/blog-post?id=${post.id}`}>{post.title}</a>
                                </h3>
                                <p className="blog-card__desc">{post.desc}</p>
                                <a href={`/blog-post?id=${post.id}`} className="blog-card__btn">Read Article <i className="ri-arrow-right-line"></i></a>
                            </div>
                        </article>
                    ))
                }
            </div>
        </div>
    </section>

    
    <section className="blog-newsletter" id="blog-newsletter">
        <div className="blog-container">
            <div className="blog-newsletter__inner">
                <h2 className="blog-newsletter__title">NEVER MISS AN ADVENTURE</h2>
                <p className="blog-newsletter__desc">Sign up to receive our latest expedition journals, travel guides, and exclusive updates directly in your inbox.</p>
                
                <form className="blog-newsletter__form" onSubmit={handleSubscribe}>
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

    
    <section className="blog-cta">
        <div className="blog-cta__overlay"></div>
        <div className="blog-container">
            <div className="blog-cta__content">
                <div className="blog-cta__text">
                    <span className="blog-cta__tag">THE JOURNEY BEGINS</span>
                    <h2 className="blog-cta__title">READY TO EXPERIENCE THESE STORIES YOURSELF?</h2>
                    <p className="blog-cta__desc">Join our team of local guides and discover the mountains, valleys, and lakes of Gilgit-Baltistan.</p>
                </div>
                <div className="blog-cta__buttons">
                    <a href="/expeditions" className="blog-btn-white">EXPLORE EXPEDITIONS</a>
                    <a href="/contact" className="blog-btn-outline-light">CONTACT OUR TEAM</a>
                </div>
            </div>
        </div>
    </section>

    
    <footer className="footer">
        <div className="blog-container footer__container">

            
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

        <div className="blog-container footer__bottom">
            <p>&copy; 2026 Broad Peak Adventures. All Rights Reserved.</p>
        </div>
    </footer>

    
    <a href="#" className="scroll-to-top">
        <i className="ri-arrow-up-line"></i>
    </a>
    </div>
  );
}
