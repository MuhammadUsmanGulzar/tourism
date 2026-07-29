import { useEffect, useState, FormEvent } from 'react';
import '../css/contact.css';
import { expeditionsData } from '../data/expeditionsData';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const form = e.currentTarget;
        const fullname = (form.querySelector('#fullname') as HTMLInputElement).value;
        const email = (form.querySelector('#email') as HTMLInputElement).value;
        const country = (form.querySelector('#country') as HTMLInputElement).value;
        const interest = (form.querySelector('#interest') as HTMLSelectElement).value;
        const month = (form.querySelector('#month') as HTMLSelectElement).value;
        const groupsize = (form.querySelector('#groupsize') as HTMLSelectElement).value;
        const message = (form.querySelector('#message') as HTMLTextAreaElement).value;

        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

        const selectedExped = expeditionsData[interest];

        const payload = {
            fullname,
            email,
            country,
            interest,
            month,
            groupsize,
            message,
            expedition: selectedExped ? {
                id: selectedExped.id,
                title: selectedExped.title,
                difficulty: selectedExped.difficulty,
                duration: selectedExped.duration,
                maxAltitude: selectedExped.maxAltitude,
                startingPrice: selectedExped.startingPrice
            } : null,
            formType: 'contact',
            submittedAt: new Date().toISOString()
        };

        // Trigger n8n webhook asynchronously with JSON POST
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).catch((err) => console.warn('n8n Webhook Error:', err));

        // Immediately redirect to thank you page without blocking
        window.history.pushState({}, '', '/thank-you');
        window.dispatchEvent(new Event('pushstate'));
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
        const menuClose = document.querySelector('#mobile-menu-close, .mobile-menu__close');

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

    return (
        <div className="page-wrapper animate-fade-in">
            


            <section className="con-hero" id="con-hero">
                <div className="con-hero__bg" id="con-hero-bg"></div>
                <div className="con-hero__overlay"></div>
                <div className="con-hero__container con-container">
                    <span className="con-hero__tagline">GET IN TOUCH</span>
                    <h1 className="con-hero__title">START YOUR<br />KARAKORAM JOURNEY</h1>
                    <p className="con-hero__desc">Whether you're planning a K2 expedition, a Hunza cultural experience, or a custom adventure, our local team is ready to help.</p>
                </div>
            </section>


            <section className="con-methods">
                <div className="con-container">
                    <div className="con-methods__grid">

                        <div className="con-method-card">
                            <div className="con-method-card__icon"><i className="ri-whatsapp-line"></i></div>
                            <h3 className="con-method-card__title">WhatsApp</h3>
                            <p className="con-method-card__desc">For instant help and real-time trip planning inquiries.</p>
                            <a href="https://wa.me/923001234567" target="_blank" rel="noopener" className="con-method-card__link">+92 300 1234567</a>
                        </div>

                        <div className="con-method-card">
                            <div className="con-method-card__icon"><i className="ri-mail-open-line"></i></div>
                            <h3 className="con-method-card__title">Email</h3>
                            <p className="con-method-card__desc">Send us your custom routes, details, or group itineraries.</p>
                            <a href="mailto:info@broadpeakadventures.com" className="con-method-card__link">info@broadpeakadventures.com</a>
                        </div>

                        <div className="con-method-card">
                            <div className="con-method-card__icon"><i className="ri-phone-line"></i></div>
                            <h3 className="con-method-card__title">Phone</h3>
                            <p className="con-method-card__desc">Speak with our Skardu office directly during business hours.</p>
                            <a href="tel:+92511234567" className="con-method-card__link">+92 51 1234567</a>
                        </div>

                        <div className="con-method-card">
                            <div className="con-method-card__icon"><i className="ri-map-pin-line"></i></div>
                            <h3 className="con-method-card__title">Office Location</h3>
                            <p className="con-method-card__desc">Visit our local operations headquarter in Baltistan.</p>
                            <span className="con-method-card__link">Skardu, Gilgit-Baltistan, Pakistan</span>
                        </div>

                    </div>
                </div>
            </section>


            <section className="editorial-content-section" id="con-inquiry" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)', background: 'var(--bg-dark-alt)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>

                        <div style={{ paddingRight: '40px' }}>
                            <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>TELL US ABOUT YOUR TRIP</span>
                            <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '24px' }}>PLAN YOUR ADVENTURE</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>Complete this planning form and our travel coordinators will get back to you with custom itinerary drafts, pricing breakdowns, and logistical options.</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--white)' }}>
                                    <i className="ri-checkbox-circle-fill" style={{ color: 'var(--gold)', marginTop: '2px' }}></i>
                                    <span style={{ lineHeight: '1.6' }}>All domestic permits &amp; NOC support included.</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--white)' }}>
                                    <i className="ri-checkbox-circle-fill" style={{ color: 'var(--gold)', marginTop: '2px' }}></i>
                                    <span style={{ lineHeight: '1.6' }}>100% locally owned and operated agency.</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'var(--bg-dark)', padding: '40px', borderRadius: '4px', border: '1px solid var(--hairline)' }}>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="fullname" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Full Name</label>
                                        <input type="text" id="fullname" placeholder="Your name" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="email" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Email</label>
                                        <input type="email" id="email" placeholder="Your email" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="country" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Country</label>
                                        <input type="text" id="country" placeholder="Your country" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="interest" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Expedition Interest</label>
                                        <select id="interest" required defaultValue="" disabled={isSubmitting} style={{ padding: '16px 20px', background: 'var(--bg-dark)', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }}>
                                            <option value="" disabled>Select an expedition</option>
                                            {Object.values(expeditionsData).map((exp) => (
                                                <option key={exp.id} value={exp.id}>{exp.title}</option>
                                            ))}
                                            <option value="custom">Custom Private Journey</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="month" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Travel Month</label>
                                        <select id="month" required defaultValue="" disabled={isSubmitting} style={{ padding: '16px 20px', background: 'var(--bg-dark)', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }}>
                                            <option value="" disabled>Select a month</option>
                                            <option value="jan">January</option>
                                            <option value="feb">February</option>
                                            <option value="mar">March</option>
                                            <option value="apr">April</option>
                                            <option value="may">May</option>
                                            <option value="jun">June</option>
                                            <option value="jul">July</option>
                                            <option value="aug">August</option>
                                            <option value="sep">September</option>
                                            <option value="oct">October</option>
                                            <option value="nov">November</option>
                                            <option value="dec">December</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label htmlFor="groupsize" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Group Size</label>
                                        <select id="groupsize" required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'var(--bg-dark)', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%' }}>
                                            <option value="1">1 Person</option>
                                            <option value="2">2 People</option>
                                            <option value="3-5">3 - 5 People</option>
                                            <option value="6-10">6 - 10 People</option>
                                            <option value="11+">11+ People</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label htmlFor="message" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>Message</label>
                                    <textarea id="message" rows={5} placeholder="Share any specific dates, preferences, or fitness questions..." required disabled={isSubmitting} style={{ padding: '16px 20px', background: 'transparent', border: '1px solid var(--hairline)', color: 'var(--white)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', resize: 'vertical' }}></textarea>
                                </div>

                                {submitError && (
                                    <div style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                                        {submitError}
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                                    <button type="submit" className="btn-editorial" disabled={isSubmitting} style={{ flex: 1, justifyContent: 'center' }}>
                                        {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'} <i className="ri-arrow-right-line"></i>
                                    </button>
                                    <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="btn-editorial-outline" style={{ flex: 1, justifyContent: 'center' }}>
                                        <i className="ri-whatsapp-line"></i> WHATSAPP US
                                    </a>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>


            <section className="editorial-content-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>OUR PROMISE</span>
                        <h2 className="section-title" style={{ fontSize: '2.4rem' }}>WHY CONTACT US</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
                        
                        <div style={{ padding: '30px', background: 'var(--bg-dark-alt)', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                            <div style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '20px' }}><i className="ri-chat-smile-3-line"></i></div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px', color: 'var(--white)' }}>Local Experts</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>You speak directly to the operations team in Skardu, not an offshore booking portal. You get real mountain facts.</p>
                        </div>

                        <div style={{ padding: '30px', background: 'var(--bg-dark-alt)', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                            <div style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '20px' }}><i className="ri-flashlight-line"></i></div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px', color: 'var(--white)' }}>Fast Responses</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We aim to answer all email requests within 24 hours, and we provide instant support via our official WhatsApp line.</p>
                        </div>

                        <div style={{ padding: '30px', background: 'var(--bg-dark-alt)', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                            <div style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '20px' }}><i className="ri-magic-line"></i></div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px', color: 'var(--white)' }}>Custom Itineraries</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We build completely bespoke routes, adjusting altitude climb rates, campsite nights, and support staff to fit your requirements.</p>
                        </div>

                        <div style={{ padding: '30px', background: 'var(--bg-dark-alt)', border: '1px solid var(--hairline)', borderRadius: '4px' }}>
                            <div style={{ color: 'var(--gold)', fontSize: '2rem', marginBottom: '20px' }}><i className="ri-heart-pulse-line"></i></div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '16px', color: 'var(--white)' }}>Safety &amp; Logistics</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We coordinate hotel lodgings, reliable 4x4 drivers, local porter associations, and high-altitude emergency safety protocols.</p>
                        </div>

                    </div>
                </div>
            </section>


            {/* EDITORIAL FAQ MATRIX */}
            <section className="faq-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)' }}>
                <div className="container">
                  <div className="section-header" style={{ textAlign: "center" }}>
                    <span className="section-tag">FAQ</span>
                    <h2 className="section-title">PLAN YOUR VISIT</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Essential details to help you prepare before reaching out.</p>
                  </div>

                  <div className="faq-matrix">
                    {[
                      {
                        q: "How quickly do you respond?",
                        a: "We typically respond to email inquiries within 12 to 24 hours. For urgent questions or real-time travel planning, you can get in touch with our team instantly via WhatsApp."
                      },
                      {
                        q: "Can I request a private tour?",
                        a: "Yes, absolutely. We specialize in private departures for solo travelers, families, professional photographers, and private climbing clubs. We can custom tailor the entire itinerary to your interests."
                      },
                      {
                        q: "Do you help with permits?",
                        a: "Yes. Broad Peak Adventures is a fully registered mountaineering agency. We handle all governmental NOCs, park entry fees, and special border area permissions required for foreign travelers."
                      },
                      {
                        q: "Can beginners join expeditions?",
                        a: "We offer various journeys suited for different fitness levels. While extreme treks like K2 Base Camp require high fitness and prior high-altitude experience, easy tours like Hunza Explorer and Attabad Lake are highly suitable for beginners."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="faq-item">
                        <button type="button" className="faq-header" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
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


            {/* EDITORIAL CTA */}
            <section className="editorial-cta-section" style={{ padding: '80px 0', borderTop: '1px solid var(--hairline)', background: 'var(--bg-dark-alt)' }}>
                <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <span className="section-tag" style={{ marginBottom: '16px', display: 'block' }}>THE KARAKORAM IS WAITING</span>
                    <h2 className="section-title" style={{ fontSize: '2.4rem', marginBottom: '24px' }}>READY FOR YOUR NEXT ADVENTURE?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>Explore our legendary high-altitude trekking packages or discover the beautiful valleys of Gilgit-Baltistan.</p>
                    
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/expeditions" className="btn-editorial">EXPLORE EXPEDITIONS</a>
                    </div>
                </div>
            </section>


            


            
        </div>
    );
}
