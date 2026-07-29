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

    
    

    
    
    </div>
  );
}
