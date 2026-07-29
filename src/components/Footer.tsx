import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-editorial">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>BROAD <span>PEAK</span></h3>
            <p>
              Pakistan's premier mountain expedition operator. World-class safety standards, authentic Balti hospitality, and uncompromised Karakoram mastery.
            </p>
          </div>

          <div className="footer-col">
            <h4>EXPLORE</h4>
            <ul>
              <li><a href="/">Overview</a></li>
              <li><a href="/expeditions">Journeys</a></li>
              <li><a href="/about">Heritage</a></li>
              <li><a href="/travel-guides">Guides</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>EXPEDITIONS</h4>
            <ul>
              <li><a href="/expedition-detail?id=k2">K2 Base Camp & Concordia</a></li>
              <li><a href="/expedition-detail?id=basho-valley">Basho Valley Expedition</a></li>
              <li><a href="/expedition-detail?id=haramosh-pass">Haramosh Pass Trek</a></li>
              <li><a href="/expedition-detail?id=minimarg">Minimarg Valley Trek</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SKARDU HQ</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "8px" }}>Main Bazar Road, Skardu, Gilgit-Baltistan, Pakistan</p>
            <p style={{ fontSize: "0.9rem", color: "var(--gold)" }}>info@broadpeakadventures.com</p>
            <p style={{ fontSize: "0.9rem", color: "var(--white)" }}>+92 300 1234567</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Broad Peak Adventures. All Rights Reserved.</p>
          <p>Pakistan Tourism Ministry License No. 4410</p>
        </div>
      </div>
    </footer>
  );
}
