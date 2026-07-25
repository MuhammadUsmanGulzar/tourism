import { useEffect, useState } from 'react';

interface HeaderProps {
  currentPath: string;
}

export default function Header({ currentPath }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Normalize path for active tab comparison
  let path = currentPath.split('?')[0];
  if (path.endsWith('.html')) {
    path = path.slice(0, -5);
  }
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  const isActive = (targetPath: string) => {
    if (targetPath === '/' && path === '/') return true;
    if (targetPath !== '/' && path.startsWith(targetPath)) return true;
    return false;
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <nav className="navbar">
        {/* Brand Logo */}
        <div className="navbar__logo">
          <a href="/">
            <div className="navbar__logo-badge">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="navbar__logo-svg">
                <path d="M3 20L10 8L14 15L17 10L21 20H3Z" fill="url(#mountainGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                <path d="M10 8L12 11.5L14 15L10 8Z" fill="rgba(255,255,255,0.25)" />
                <defs>
                  <linearGradient id="mountainGrad" x1="12" y1="8" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#d48849" />
                    <stop offset="1" stopColor="#8d4b1a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-title">BROAD PEAK</span>
              <span className="navbar__logo-sub">EXPEDITIONS</span>
            </div>
          </a>
        </div>

        {/* Central Navigation Menu (Desktop) */}
        <ul className="navbar__menu">
          <li>
            <a href="/" className={isActive('/') ? 'active' : ''}>
              Home
            </a>
          </li>
          <li>
            <a href="/expeditions" className={isActive('/expeditions') ? 'active' : ''}>
              Expeditions
            </a>
          </li>
          <li>
            <a href="/blog" className={isActive('/blog') ? 'active' : ''}>
              Blog
            </a>
          </li>
          <li>
            <a href="/about" className={isActive('/about') ? 'active' : ''}>
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className={isActive('/contact') ? 'active' : ''}>
              Contact
            </a>
          </li>
        </ul>

        {/* Action Group */}
        <div className="navbar__actions">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="navbar__social" aria-label="Instagram">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="navbar__social" aria-label="Facebook">
            <i className="ri-facebook-fill"></i>
          </a>
          <a href="/contact" className="navbar__cta">
            <span>Book a Trip</span>
            <i className="ri-arrow-right-line"></i>
          </a>
          <button
            className="navbar__hamburger"
            id="hamburger-menu"
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu Slide Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu__header">
          <div className="navbar__logo">
            <a href="/" onClick={() => setMobileMenuOpen(false)}>
              <span className="navbar__logo-title">BROAD PEAK</span>
            </a>
          </div>
          <button className="mobile-menu__close" aria-label="Close Menu" onClick={() => setMobileMenuOpen(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="mobile-menu__links">
          <a href="/" className={isActive('/') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>
          <a href="/expeditions" className={isActive('/expeditions') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Expeditions
          </a>
          <a href="/blog" className={isActive('/blog') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Blog
          </a>
          <a href="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            About Us
          </a>
          <a href="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </a>
        </div>
        <div className="mobile-menu__footer">
          <a href="/contact" className="btn btn--primary" onClick={() => setMobileMenuOpen(false)}>
            Book a Trip
          </a>
        </div>
      </div>
    </header>
  );
}
