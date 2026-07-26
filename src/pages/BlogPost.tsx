import { useEffect } from 'react';
import { blogsData } from '../data/blogsData';
import '../css/blog-post.css';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id') || 'k2-guide';
  const blog = blogsData[blogId] || blogsData['k2-guide'];

  // Select 3 other blogs to display in the Related Posts section
  const relatedBlogs = Object.values(blogsData)
    .filter(b => b.id !== blog.id)
    .slice(0, 3);

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
  
  }, [blog.id]);

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
                <button className="navbar__hamburger" id="post-hamburger">
                    <i className="ri-menu-line"></i>
                </button>
            </div>
        </nav>

        
        <div className="mobile-menu" id="post-mobile-menu">
            <div className="mobile-menu__header">
                <div className="navbar__logo">
                    <a href="/">BROAD PEAK</a>
                </div>
                <button className="mobile-menu__close" id="post-menu-close">
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

    
    <section className="post-hero" id="post-hero">
        <div 
          className="post-hero__bg" 
          id="post-hero-bg" 
          style={{ backgroundImage: `url(${blog.bgImage})` }}
        ></div>
        <div className="post-hero__overlay"></div>
        <div className="post-hero__container post-container">
            <span className="post-hero__tagline">{blog.category}</span>
            <h1 className="post-hero__title" style={{ textTransform: 'uppercase' }}>{blog.title}</h1>
            <div className="post-hero__meta">
                <span><i className="ri-calendar-line"></i> {blog.date}</span>
                <span className="separator">•</span>
                <span><i className="ri-time-line"></i> {blog.readTime}</span>
                <span className="separator">•</span>
                <span><i className="ri-user-line"></i> {blog.author}</span>
            </div>
        </div>
    </section>

    
    <article className="post-content">
        <div className="post-container--narrow">

            
            <div className="post-section">
                <p className="lead-text">{blog.leadText}</p>
            </div>

            {blog.sections.map((section, index) => (
              <div className="post-section" key={index}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.paragraphs.map((p, pIndex) => (
                  <p key={pIndex} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
                
                {section.checklist && (
                  <div className="checklist">
                    <p style={{ fontWeight: '600', marginBottom: '10px' }}>Essential Checklist / Highlights:</p>
                    <ul>
                      {section.checklist.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.numberedList && (
                  <ol style={{ marginLeft: '20px', listStyleType: 'decimal', marginBottom: '25px' }}>
                    {section.numberedList.map((item, itemIdx) => (
                      <li key={itemIdx} style={{ marginBottom: '10px' }}>{item}</li>
                    ))}
                  </ol>
                )}

                {section.image && (
                  <div className="post-image-break" style={{ marginTop: '35px', marginBottom: '35px' }}>
                    <img src={section.image} alt={section.imageCaption || "Expedition visual"} width="700" height="450" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                    {section.imageCaption && <span className="image-caption">{section.imageCaption}</span>}
                  </div>
                )}
              </div>
            ))}

            
            <div className="author-box">
                <div className="author-box__image">
                    <img src="/assets/images/who-we-are-small.webp" alt="Broad Peak Team" width="100" height="100" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                </div>
                <div className="author-box__content">
                    <h3>Broad Peak Expedition Team</h3>
                    <p>Written by our senior guides who have collectively spent decades navigating the Baltoro Glacier and safely guiding climbers to the foot of the Savage Mountain.</p>
                </div>
            </div>

        </div>
    </article>

    
    <section className="related-posts">
        <div className="post-container">
            <h2 className="related-posts__title">FURTHER READING</h2>
            
            <div className="related-grid">
                {relatedBlogs.map((rel) => (
                  <article className="related-card" key={rel.id}>
                      <div className="related-card__image">
                          <a href={`/blog-post?id=${rel.id}`}>
                              <img src={rel.bgImage} alt={rel.title} width="350" height="230" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                          </a>
                      </div>
                      <div className="related-card__body">
                          <span className="related-card__cat">{rel.category}</span>
                          <h3 className="related-card__title">
                              <a href={`/blog-post?id=${rel.id}`}>{rel.title}</a>
                          </h3>
                          <a href={`/blog-post?id=${rel.id}`} className="related-card__btn">
                              Read Article <i className="ri-arrow-right-line"></i>
                          </a>
                      </div>
                  </article>
                ))}
            </div>
        </div>
    </section>

    
    <section className="post-cta">
        <div className="post-cta__overlay"></div>
        <div className="post-container">
            <div className="post-cta__content">
                <div className="post-cta__text">
                    <span className="post-cta__tag">THE JOURNEY BEGINS</span>
                    <h2 className="post-cta__title">READY TO EXPERIENCE THESE STORIES YOURSELF?</h2>
                    <p className="post-cta__desc">Join our team of local guides and discover the mountains, valleys, and glaciers of Gilgit-Baltistan.</p>
                </div>
                <div className="post-cta__buttons">
                    <a href="/expeditions" className="post-btn-white">EXPLORE EXPEDITIONS</a>
                    <a href="/contact" className="post-btn-outline-light">CONTACT OUR TEAM</a>
                </div>
            </div>
        </div>
    </section>

    
    <footer className="footer">
        <div className="post-container footer__container">

            
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

        <div className="post-container footer__bottom">
            <p>&copy; 2026 Broad Peak Adventures. All Rights Reserved.</p>
        </div>
    </footer>

    
    <a href="#" className="scroll-to-top" aria-label="Scroll to top">
        <i className="ri-arrow-up-line"></i>
    </a>
    </div>
  );
}
