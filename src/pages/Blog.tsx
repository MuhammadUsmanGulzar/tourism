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
                                    <img src={featuredPost.bgImage} alt={featuredPost.title} width="600" height="400" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
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
                                    <img src={post.bgImage} alt={post.title} width="400" height="260" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
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

    
    <section className="editorial-cta-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)', background: 'var(--bg-dark-alt)' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>THE JOURNEY BEGINS</span>
            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>NEVER MISS AN ADVENTURE</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>Sign up to receive our latest expedition journals, travel guides, and exclusive updates directly in your inbox.</p>
            
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
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '24px' }}>READY TO EXPERIENCE THESE STORIES YOURSELF?</h3>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/expeditions" className="btn-editorial">EXPLORE EXPEDITIONS</a>
                  <a href="/contact" className="btn-editorial-outline">CONTACT OUR TEAM</a>
              </div>
            </div>
        </div>
    </section>

    


    
    
    </div>
  );
}
