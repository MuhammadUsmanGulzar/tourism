import { useState, useEffect, lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Destinations = lazy(() => import('./pages/Destinations'));
const Expeditions = lazy(() => import('./pages/Expeditions'));
const ExpeditionDetail = lazy(() => import('./pages/ExpeditionDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Faq = lazy(() => import('./pages/Faq'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const TravelGuides = lazy(() => import('./pages/TravelGuides'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname + window.location.search);

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
        
        // If it starts with "#" (hash link) or is an external link, let it be
        if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          return;
        }

        // Handle local paths
        e.preventDefault();
        
        // Push state and trigger custom event
        window.history.pushState({}, '', href);
        window.dispatchEvent(new Event('pushstate'));
      }
    };

    document.addEventListener('click', handleGlobalLinkClicks);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
      document.removeEventListener('click', handleGlobalLinkClicks);
    };
  }, []);

  // Re-run JS initializers whenever the active route changes
  useEffect(() => {
    // Scroll to the top of the viewport
    window.scrollTo(0, 0);

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
      case '/destinations':
        return <Destinations />;
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
      <Suspense fallback={null}>
        {renderRoute()}
      </Suspense>
    </div>
  );
}
