import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Expeditions from './pages/Expeditions';
import ExpeditionDetail from './pages/ExpeditionDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ThankYou from './pages/ThankYou';
import TravelGuides from './pages/TravelGuides';
import NotFound from './pages/NotFound';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('visited');
    }
    return true;
  });
  const [fadeLoader, setFadeLoader] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Premium loading screen manager (only displays on the very first visit in the session)
  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: number;
    let maxTimeout: number;

    const startTime = Date.now();
    const minDuration = 2500; // 2.5s minimum for the gorgeous mountain outline drawing animation
    
    // Smooth progress counter simulation
    let currentProgress = 0;
    progressInterval = window.setInterval(() => {
      // Progressively slower increment to feel natural
      const increment = currentProgress < 50 
        ? Math.random() * 8 + 4 
        : currentProgress < 85 
          ? Math.random() * 3 + 1 
          : Math.random() * 0.5 + 0.1;
      
      currentProgress = Math.min(95, currentProgress + increment);
      setLoadPercentage(Math.round(currentProgress));
    }, 100);

    const finishLoading = () => {
      window.clearInterval(progressInterval);
      setLoadPercentage(100);
      
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setFadeLoader(true);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('visited', 'true');
        }, 800); // matches CSS opacity transition
      }, remainingTime);
    };

    // Wait for the window load event and ensure media assets like the background video are ready
    const verifyAssetsLoaded = () => {
      const heroVideo = document.querySelector('video');
      if (heroVideo && heroVideo.readyState < 3) {
        const handleMediaReady = () => {
          heroVideo.removeEventListener('canplay', handleMediaReady);
          heroVideo.removeEventListener('canplaythrough', handleMediaReady);
          finishLoading();
        };
        heroVideo.addEventListener('canplay', handleMediaReady);
        heroVideo.addEventListener('canplaythrough', handleMediaReady);
      } else {
        finishLoading();
      }
    };

    if (document.readyState === 'complete') {
      // Give a tiny delay for React components rendering and checking DOM nodes
      setTimeout(verifyAssetsLoaded, 100);
    } else {
      const handleWindowLoad = () => {
        window.removeEventListener('load', handleWindowLoad);
        verifyAssetsLoaded();
      };
      window.addEventListener('load', handleWindowLoad);
    }

    // Safety timeout of 5 seconds to guarantee the website becomes interactive even on extremely slow networks
    maxTimeout = window.setTimeout(() => {
      finishLoading();
    }, 5000);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(maxTimeout);
    };
  }, [isLoading]);

  // Sync state on history pop/push
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);

    // Intercept anchor tag clicks globally for clean SPA routing
    const handleGlobalLinkClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor) {
        const href = anchor.getAttribute('href');
        
        // Skip links that are hashes, external, or have target="_blank" / meta key presses
        const targetAttr = anchor.getAttribute('target');
        if (
          !href || 
          href.startsWith('#') || 
          href.startsWith('http://') || 
          href.startsWith('https://') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          targetAttr === '_blank' || 
          e.metaKey || 
          e.ctrlKey || 
          e.shiftKey || 
          e.altKey
        ) {
          return;
        }

        // Handle local paths
        e.preventDefault();
        
        // Push state and trigger custom event
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('pushstate'));
      }
    };

    // Global Accordion / FAQ click event delegation handler
    const handleGlobalAccordionClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Selectors for accordion header buttons across all FAQ implementations
      const btnSelector = '.faq-accordion__header, .faq-item__question, .exp-faq__header-btn, .con-faq__header-btn';
      const btn = target.closest(btnSelector) as HTMLElement | null;
      if (!btn) return;
      
      e.preventDefault();
      
      // Determine what variant we are handling
      const isFaqPage = btn.classList.contains('faq-item__question');
      
      // 1. Parent Item Selector
      const itemSelector = isFaqPage 
        ? '.faq-item' 
        : '.faq-accordion__item, .exp-faq__item, .con-faq__item';
      const item = btn.closest(itemSelector) as HTMLElement | null;
      if (!item) return;
      
      // 2. Body element Selector
      const bodySelector = isFaqPage 
        ? '.faq-item__answer' 
        : '.faq-accordion__body, .exp-faq__body, .con-faq__body';
      const body = item.querySelector(bodySelector) as HTMLElement | null;
      
      // 3. Icon element Selector
      const icon = btn.querySelector('i, .faq-icon, .exp-faq__icon, .con-faq__icon') as HTMLElement | null;
      
      const isOpen = item.classList.contains('active');
      
      // Close other accordion items inside the same parent section (to maintain sibling collapse behavior)
      const sectionSelector = isFaqPage 
        ? '.faq-category' 
        : 'section, .faq-preview-section';
      const section = btn.closest(sectionSelector);
      if (section) {
        section.querySelectorAll(itemSelector).forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            
            // Adjust other body (not for Faq.tsx since it uses CSS max-height transition)
            const otherBody = otherItem.querySelector(bodySelector) as HTMLElement | null;
            if (otherBody && !isFaqPage) {
              otherBody.style.display = 'none';
            }
            
            // Adjust other icon
            const otherIcon = otherItem.querySelector('i, .faq-icon, .exp-faq__icon, .con-faq__icon') as HTMLElement | null;
            if (otherIcon) {
              if (otherIcon.classList.contains('ri-subtract-line')) {
                otherIcon.classList.remove('ri-subtract-line');
                otherIcon.classList.add('ri-add-line');
              }
            }
          }
        });
      }
      
      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        if (body && !isFaqPage) {
          body.style.display = 'none';
        }
        if (icon) {
          if (icon.classList.contains('ri-subtract-line')) {
            icon.classList.remove('ri-subtract-line');
            icon.classList.add('ri-add-line');
          }
        }
      } else {
        item.classList.add('active');
        if (body && !isFaqPage) {
          body.style.display = 'block';
        }
        if (icon) {
          if (icon.classList.contains('ri-add-line')) {
            icon.classList.remove('ri-add-line');
            icon.classList.add('ri-subtract-line');
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalLinkClicks);
    document.addEventListener('click', handleGlobalAccordionClicks);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
      document.removeEventListener('click', handleGlobalLinkClicks);
      document.removeEventListener('click', handleGlobalAccordionClicks);
    };
  }, []);

  // Re-run JS initializers whenever the active route changes
  useEffect(() => {
    // Scroll to the top of the viewport
    window.scrollTo(0, 0);

    // Update body attribute for pure CSS active navbar/menu states
    let path = currentPath.split('?')[0];
    if (path.endsWith('.html')) {
      path = path.slice(0, -5);
    }
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    document.body.setAttribute('data-current-path', path);

    const reinitializeScripts = () => {
      console.log('Route changed to:', currentPath, '. Re-initializing scripts...');
      
      // Re-trigger scrolltrigger refresh if gsap exists
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }

      // Execute main.js initialization
      if (typeof (window as any).initMainJS === 'function') {
        try {
          (window as any).initMainJS();
        } catch (err) {
          console.warn('Error running initMainJS:', err);
        }
      }

      // Execute animations.js initialization
      if (typeof (window as any).initAnimationsJS === 'function') {
        try {
          (window as any).initAnimationsJS();
        } catch (err) {
          console.warn('Error running initAnimationsJS:', err);
        }
      }

      // Force high-performance scrolltrigger refresh after DOM settle
      setTimeout(() => {
        if ((window as any).ScrollTrigger) {
          (window as any).ScrollTrigger.refresh();
        }
      }, 300);
    };

    // Wait slightly to let React complete rendering the DOM for the new route
    const renderTimer = setTimeout(reinitializeScripts, 80);

    return () => clearTimeout(renderTimer);
  }, [currentPath]);

  // Route resolver
  const renderRoute = () => {
    // Normalise trailing slashes or extensions
    let path = currentPath.split('?')[0];
    if (path.endsWith('.html')) {
      path = path.slice(0, -5);
    }
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    switch (path) {
      case '':
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      case '/expeditions':
        return <Expeditions />;
      case '/expedition-detail':
        return <ExpeditionDetail />;
      case '/blog':
        return <Blog />;
      case '/blog-post':
        return <BlogPost />;
      case '/contact':
        return <Contact />;
      case '/faq':
        return <Faq />;
      case '/privacy':
        return <Privacy />;
      case '/terms':
        return <Terms />;
      case '/thank-you':
        return <ThankYou />;
      case '/travel-guides':
        return <TravelGuides />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="app-container">
      {isLoading && (
        <div className={`premium-loader ${fadeLoader ? 'premium-loader--fade-out' : ''}`}>
          <div className="premium-loader__background-glow"></div>
          
          {/* Ambient Particles */}
          <div className="premium-loader__particles">
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
          </div>

          <div className="premium-loader__content">
            <div className="premium-loader__artwork-container">
              {/* Sun behind the mountains */}
              <div className="premium-loader__sun"></div>

              {/* Layered Mountains SVG */}
              <svg className="premium-loader__mountain-svg" viewBox="0 0 120 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bgMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a1528" />
                    <stop offset="100%" stopColor="#08070d" />
                  </linearGradient>
                  <linearGradient id="midMountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#632d95" />
                    <stop offset="50%" stopColor="#8b307d" />
                    <stop offset="100%" stopColor="#120c1f" />
                  </linearGradient>
                  <linearGradient id="fgMountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c77838" />
                    <stop offset="40%" stopColor="#834624" />
                    <stop offset="100%" stopColor="#0a0810" />
                  </linearGradient>
                  <linearGradient id="goldenPeak" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e2873f" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {/* Back Mountain Layer */}
                <path 
                  className="mountain-path mountain-path--back" 
                  d="M0,80 L0,55 L20,38 L45,62 L75,32 L100,60 L120,45 L120,80 Z" 
                  fill="url(#bgMountainGrad)" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="0.5" 
                />

                {/* Middle Mountain Layer */}
                <path 
                  className="mountain-path mountain-path--mid" 
                  d="M0,80 L0,65 L30,48 L55,35 L80,62 L105,42 L120,58 L120,80 Z" 
                  fill="url(#midMountainGrad)" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="0.5" 
                />

                {/* Front Mountain Layer (Foreground) */}
                <path 
                  className="mountain-path mountain-path--front" 
                  d="M0,80 L15,70 L40,42 L65,65 L85,28 L105,58 L120,70 L120,80 Z" 
                  fill="url(#fgMountainGrad)" 
                  stroke="url(#goldenPeak)" 
                  strokeWidth="1.2" 
                />
              </svg>

              {/* Glassmorphic Compass badge overlay */}
              <div className="premium-loader__compass-badge">
                <i className="ri-compass-3-line"></i>
              </div>
            </div>
            
            <div className="premium-loader__text-group">
              <h1 className="premium-loader__title">BROAD PEAK</h1>
              <p className="premium-loader__subtitle">EXPLORE THE ROOF OF PAKISTAN</p>
            </div>

            {/* Premium Loader Status & Progress */}
            <div className="premium-loader__status">
              <div className="premium-loader__progress-bar-wrapper">
                <div 
                  className="premium-loader__progress-bar-fill" 
                  style={{ width: `${loadPercentage}%` }}
                ></div>
              </div>
              <div className="premium-loader__percentage-counter">
                <span>{loadPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Header currentPath={currentPath} />
      {renderRoute()}
    </div>
  );
}
