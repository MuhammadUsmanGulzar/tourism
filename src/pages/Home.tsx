import { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { expeditionsData } from '../data/expeditionsData';
import Image from '../components/Image';

// Interactive Trail Waypoint Data
const waypointsData = [
  {
    id: 'askole',
    name: 'Askole Sanctuary',
    altitude: '3,000m',
    day: 'Day 01',
    temp: '18°C',
    oxygen: '97%',
    desc: 'The historic mountain settlement marking the transition into the wild Baltoro Glacier.',
    image: '/assets/images/k2.webp'
  },
  {
    id: 'paiju',
    name: 'Paiju Campsite',
    altitude: '3,450m',
    day: 'Day 04',
    temp: '12°C',
    oxygen: '92%',
    desc: 'Resting grounds beneath the vertical granite spires of Paiju Peak.',
    image: '/assets/images/who-we-are-main.webp'
  },
  {
    id: 'concordia',
    name: 'Concordia — Throne Room of the Gods',
    altitude: '4,691m',
    day: 'Day 08',
    temp: '-2°C',
    oxygen: '78%',
    desc: 'The world\'s premier mountain amphitheatre with 360° vistas of K2, Broad Peak, and Gasherbrum.',
    image: '/assets/images/article_k2_guide_1783186031585.webp'
  },
  {
    id: 'k2base',
    name: 'K2 Base Camp',
    altitude: '5,117m',
    day: 'Day 10',
    temp: '-6°C',
    oxygen: '72%',
    desc: 'At the foot of the Savage Mountain (8,611m). The ultimate high-altitude pilgrimage.',
    image: '/assets/images/article_snow_lake_1783186049575.webp'
  },
  {
    id: 'gondogoro',
    name: 'Gondogoro Pass',
    altitude: '5,585m',
    day: 'Day 12',
    temp: '-10°C',
    oxygen: '68%',
    desc: 'Technical high-altitude pass crossing equipped with fixed ropes and unforgettable sunrise views.',
    image: '/assets/images/who-we-are-small.webp'
  }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<'all' | '8000m' | 'trek' | 'culture'>('all');
  const [activeWaypoint, setActiveWaypoint] = useState(waypointsData[2]); // Default Concordia
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [searchRegion, setSearchRegion] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const hamburger = document.querySelector('#hamburger-menu');
    const mobileMenu = document.querySelector('#mobile-menu');
    const menuClose = document.querySelector('#mobile-menu-close');

    const openMenu = () => mobileMenu?.classList.add('active');
    const closeMenu = () => mobileMenu?.classList.remove('active');

    hamburger?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      hamburger?.removeEventListener('click', openMenu);
      menuClose?.removeEventListener('click', closeMenu);
    };
  }, []);

  const filteredExpeditions = Object.values(expeditionsData).filter((exp) => {
    if (activeFilter === '8000m') return exp.maxAltitude.includes('8,') || exp.maxAltitude.includes('7,') || exp.id === 'k2';
    if (activeFilter === 'trek') return exp.difficultyClass === 'hard' || exp.difficultyClass === 'moderate';
    if (activeFilter === 'culture') return exp.difficultyClass === 'easy' || exp.id.includes('valley') || exp.id.includes('minimarg');
    return true;
  });

  return (
    <div className="page-wrapper animate-fade-in">


      {/* HERO SECTION — BORDERLESS MAGAZINE UI */}
      <section className="hero" id="home">
        <div className="hero__overlay"></div>

        <div className="container hero__container">
          <div>
            <span className="hero__badge">
              LICENSED MOUNTAIN EXPEDITIONARY
            </span>

            <h1 className="hero__title">
              CONQUER THE <br />
              <span className="hero__title-gold">SAVAGE PEAKS</span>
            </h1>

            <p className="hero__description">
              Uncompromised alpine mastery across Pakistan’s legendary 8,000m summits and glacier sanctuaries with licensed Balti mountain leaders.
            </p>

            <div className="hero__actions">
              <a href="/expeditions" className="btn-editorial">
                Explore Journeys <i className="ri-arrow-right-line"></i>
              </a>
              <a href="/about" className="btn-editorial-outline">
                Our Heritage
              </a>
            </div>
          </div>

          <div style={{ textTransform: "uppercase" }}>
            <div style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "24px" }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "3px", color: "var(--gold)", fontWeight: "700" }}>FEATURED DESTINATION</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", color: "var(--white)", margin: "8px 0" }}>K2 BASE CAMP & CONCORDIA</h2>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "none", marginBottom: "16px" }}>
                16 Days • Max Alt: 5,585m (Gondogoro Pass) • Starting from $2,450
              </p>
              <a href="/expedition-detail?id=k2" style={{ color: "var(--gold)", fontWeight: "700", letterSpacing: "2px", fontSize: "0.8rem" }}>
                INSPECT ITINERARY &rarr;
              </a>
            </div>
          </div>

          {/* Minimal Search Bar */}
          <div className="hero__search-bar">
            <div className="search-column">
              <label>REGION</label>
              <select value={searchRegion} onChange={(e) => setSearchRegion(e.target.value)}>
                <option value="">All Karakoram Regions</option>
                <option value="k2">K2 / Concordia</option>
                <option value="shigar">Shigar & Basho</option>
                <option value="hunza">Hunza & Nagar</option>
                <option value="astore">Astore & Minimarg</option>
              </select>
            </div>
            <div className="search-column">
              <label>MAX ELEVATION</label>
              <select>
                <option value="">Any Altitude</option>
                <option value="5000">Up to 5,000m</option>
                <option value="6000">5,000m – 6,000m</option>
                <option value="8000">8,000m Summits</option>
              </select>
            </div>
            <div className="search-column">
              <label>DURATION</label>
              <select>
                <option value="">Any Duration</option>
                <option value="7">7 – 10 Days</option>
                <option value="15">12 – 16 Days</option>
                <option value="21">20+ Days</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <a href={`/expeditions?query=${searchRegion}`} className="btn-editorial" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                FILTER JOURNEYS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BORDERLESS STATS DASHBOARD */}
      <section className="stats-dashboard">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-column">
              <div className="stat-num">5,585m</div>
              <div className="stat-label">Highest Pass Crossing</div>
            </div>
            <div className="stat-column">
              <div className="stat-num">25+</div>
              <div className="stat-label">Master Journeys</div>
            </div>
            <div className="stat-column">
              <div className="stat-num">1,200+</div>
              <div className="stat-label">Explorers Guided</div>
            </div>
            <div className="stat-column">
              <div className="stat-num">100%</div>
              <div className="stat-label">Safety Track Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED EXPEDITIONS — EDITORIAL HORIZONTAL ROWS (NO BOX CARDS!) */}
      <section className="expeditions-section" id="expeditions">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">CURATED EXPEDITIONS</span>
            <h2 className="section-title">THE EXPEDITIONARY COLLECTION</h2>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
              All Journeys
            </button>
            <button className={`filter-tab ${activeFilter === '8000m' ? 'active' : ''}`} onClick={() => setActiveFilter('8000m')}>
              8,000m Summits
            </button>
            <button className={`filter-tab ${activeFilter === 'trek' ? 'active' : ''}`} onClick={() => setActiveFilter('trek')}>
              Alpine Passes
            </button>
            <button className={`filter-tab ${activeFilter === 'culture' ? 'active' : ''}`} onClick={() => setActiveFilter('culture')}>
              Valley Safaris
            </button>
          </div>

          {/* Editorial Horizontal Rows */}
          <div className="expeditions-list">
            {filteredExpeditions.map((exp) => (
              <a key={exp.id} href={`/expedition-detail?id=${exp.id}`} className="expedition-row">
                <div>
                  <h3 className="expedition-row__title">{exp.title}</h3>
                  <p className="expedition-row__sub">{exp.desc.length > 90 ? exp.desc.substring(0, 90) + '...' : exp.desc}</p>
                </div>
                <div className="expedition-row__meta">
                  <span>MAX ALTITUDE: {exp.maxAltitude}</span>
                </div>
                <div className="expedition-row__meta">
                  <span>{exp.duration}</span>
                </div>
                <div className="expedition-row__price">
                  {exp.startingPrice}
                </div>
                <div className="expedition-row__action">
                  EXPLORE &rarr;
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BORDERLESS TRAIL MATRIX (FULL-BLEED EDITORIAL DISPLAY) */}
      <section className="trail-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">ROUTE TELEMETRY</span>
            <h2 className="section-title">KARAKORAM TRAIL MATRIX</h2>
          </div>

          <div className="trail-matrix">
            {/* Trail List */}
            <div className="trail-list">
              {waypointsData.map((node, index) => (
                <div
                  key={node.id}
                  className={`trail-item ${activeWaypoint.id === node.id ? 'active' : ''}`}
                  onClick={() => setActiveWaypoint(node)}
                >
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--gold)", marginRight: "12px", letterSpacing: "2px" }}>0{index + 1}</span>
                    <span className="trail-item__title">{node.name}</span>
                  </div>
                  <span className="trail-item__alt">{node.altitude}</span>
                </div>
              ))}
            </div>

            {/* Borderless Photo Display (No Clunky Rounded Inner Box) */}
            <div className="trail-display">
              <Image src={activeWaypoint.image} alt={activeWaypoint.name} className="trail-display__image" width="700" height="500" />
              <div className="trail-display__overlay">
                <div className="trail-display__tag">{activeWaypoint.day} • {activeWaypoint.altitude}</div>
                <h3 className="trail-display__heading">{activeWaypoint.name}</h3>
                <p className="trail-display__desc">{activeWaypoint.desc}</p>
                <div className="trail-display__metrics">
                  <div className="metric-box">
                    <label>OXYGEN DENSITY</label>
                    <span>{activeWaypoint.oxygen}</span>
                  </div>
                  <div className="metric-box">
                    <label>NIGHT CLIMATE</label>
                    <span>{activeWaypoint.temp}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BORDERLESS HERITAGE PILLARS */}
      <section className="why-section">
        <div className="container">
          <div className="section-header" style={{ textTransform: "uppercase" }}>
            <span className="section-tag">STANDARDS OF MASTERY</span>
            <h2 className="section-title">THE PILLARS OF OUR CRAFT</h2>
          </div>

          <div className="why-grid">
            <div className="editorial-pillar">
              <div className="pillar-num">01</div>
              <h3 className="pillar-title">BALTI HERITAGE</h3>
              <p className="pillar-desc">Born and raised in the high valleys of Skardu. Generational mountain wisdom and supreme high-altitude stamina.</p>
            </div>

            <div className="editorial-pillar">
              <div className="pillar-num">02</div>
              <h3 className="pillar-title">LICENSED LEADERS</h3>
              <p className="pillar-desc">Licensed IFMGA and Balti mountain leaders trained in emergency wilderness first response and oxygen management.</p>
            </div>

            <div className="editorial-pillar">
              <div className="pillar-num">03</div>
              <h3 className="pillar-title">PRECISION LOGISTICS</h3>
              <p className="pillar-desc">24/7 satellite comms, real-time GPS telemetry, and immediate helicopter rescue evacuation protocols.</p>
            </div>

            <div className="editorial-pillar">
              <div className="pillar-num">04</div>
              <h3 className="pillar-title">ZERO-TRACE ETHICS</h3>
              <p className="pillar-desc">Uncompromising commitment to protecting the fragile Baltoro Glacier ecosystem and supporting local mountain communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL QUOTE */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonial-editorial">
            <span className="section-tag" style={{ marginBottom: "20px" }}>VERIFIED EXPEDITIONARY REVIEW</span>
            <p className="quote-text">
              "Standing at Concordia surrounded by four 8,000m summits was a lifelong dream. Broad Peak Adventures executed every camp setup, meal, and rope section with world-class precision."
            </p>
            <div className="quote-author">
              LIU WEI — K2 BASE CAMP EXPLORER • CHINA
            </div>
          </div>
        </div>
      </section>

      {/* FAQ MATRIX */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: "center" }}>
            <span className="section-tag">PREPARATION & PERMITS</span>
            <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="faq-matrix">
            {[
              {
                q: "What is the optimal season for K2 Base Camp & Concordia?",
                a: "The prime expedition window spans mid-June through late August, offering stable weather along the Baltoro glacier and clear pass conditions at Gondogoro."
              },
              {
                q: "Are official trekking permits and NOC clearances included?",
                a: "Yes. Broad Peak Adventures secures 100% of official government permits, Gilgit-Baltistan tourism clearances, and military NOCs prior to departure."
              },
              {
                q: "What physical fitness level is required for high-altitude passes?",
                a: "High-altitude journeys require strong cardiovascular endurance and leg stamina. We recommend 3 to 6 months of endurance training before arrival."
              },
              {
                q: "How are dietary requirements handled on high camps?",
                a: "Our expedition chefs prepare fresh, high-calorie meals daily, accommodating vegetarian, vegan, gluten-free, and halal diets throughout the trek."
              }
            ].map((item, idx) => (
              <div key={idx} className="faq-item">
                <button className="faq-header" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                  <span>{item.q}</span>
                  <i className={activeFaq === idx ? "ri-subtract-line" : "ri-add-line"}></i>
                </button>
                {activeFaq === idx && (
                  <div className="faq-content">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
