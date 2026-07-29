import React from 'react';

export default function Header() {
  return (
    <header className="header">
      {/* Sleek Integrated Telemetry Ribbon */}
      <div className="top-ticker">
        <div className="top-ticker__inner">
          <div className="top-ticker__item top-ticker__badge">
            <span className="top-ticker__pulse"></span> KARAKORAM EXPEDITIONARY
          </div>
          <span className="top-ticker__divider">•</span>
          <div className="top-ticker__item top-ticker__hide-mobile">
            GOVT LICENSE NO. 4410
          </div>
          <span className="top-ticker__divider top-ticker__hide-mobile">•</span>
          <div className="top-ticker__item">
            SKARDU HQ: 18°C
          </div>
          <span className="top-ticker__divider">•</span>
          <div className="top-ticker__item">
            K2 BASE CAMP: -4°C CLEAR
          </div>
          <span className="top-ticker__divider top-ticker__hide-mobile">•</span>
          <div className="top-ticker__item top-ticker__hide-mobile">
            <a href="tel:+923001234567" className="top-ticker__contact">
              RESERVE: +92 300 1234567
            </a>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '10px' }}>
        <nav className="navbar">
          <div className="navbar__logo">
            <a href="/">BROAD <span>PEAK</span></a>
          </div>

          <ul className="navbar__menu">
            <li><a href="/" className={window.location.pathname === '/' ? 'active' : ''}>Overview</a></li>
            <li><a href="/expeditions" className={window.location.pathname === '/expeditions' ? 'active' : ''}>Journeys</a></li>
            <li><a href="/travel-guides" className={window.location.pathname === '/travel-guides' ? 'active' : ''}>Guides</a></li>
            <li><a href="/about" className={window.location.pathname === '/about' ? 'active' : ''}>Heritage</a></li>
            <li><a href="/contact" className={window.location.pathname === '/contact' ? 'active' : ''}>Contact</a></li>
          </ul>

          <div className="navbar__actions">
            <a href="/contact" className="navbar__cta">
              Reserve Expedition
            </a>
            <button className="navbar__hamburger" id="hamburger-menu" aria-label="Open menu">
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div className="mobile-menu" id="mobile-menu">
        <div className="mobile-menu__header">
          <div className="navbar__logo">
            <a href="/">BROAD <span>PEAK</span></a>
          </div>
          <button className="mobile-menu__close" id="mobile-menu-close" aria-label="Close menu">
            <i className="ri-close-line"></i>
          </button>
        </div>
        <ul className="mobile-menu__links">
          <li><a href="/">Overview</a></li>
          <li><a href="/expeditions">Journeys</a></li>
          <li><a href="/travel-guides">Guides</a></li>
          <li><a href="/about">Heritage</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </header>
  );
}
