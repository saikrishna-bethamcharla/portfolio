import { useState, useEffect } from 'react';
import { HeroVisual } from './components/HeroVisual';
import { MainframeHero } from './components/MainframeHero';

/**
 * App — Hosts both the Mainframe Agency About experience
 * and the 3D Cinematic Portfolio Showcase.
 */
export function App() {
  const [currentView, setCurrentView] = useState<'mainframe' | 'portfolio'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'portfolio' || window.location.hash === '#portfolio') {
        return 'portfolio';
      }
    }
    return 'mainframe';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#portfolio') {
        setCurrentView('portfolio');
      } else if (window.location.hash === '#about' || window.location.hash === '#mainframe') {
        setCurrentView('mainframe');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Experience Switcher Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            const next = currentView === 'mainframe' ? 'portfolio' : 'mainframe';
            setCurrentView(next);
            window.location.hash = next === 'portfolio' ? '#portfolio' : '#about';
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-black/80 hover:bg-black text-xs uppercase tracking-widest text-zinc-300 hover:text-white border border-white/20 hover:border-red-500/80 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>
            {currentView === 'mainframe'
              ? 'View 3D Portfolio Shelf →'
              : '← View Mainframe Agency'}
          </span>
        </button>
      </div>

      {currentView === 'mainframe' ? (
        <MainframeHero />
      ) : (
        <div>
          {/* 1. Aperture Hero Section */}
          <HeroVisual />

          {/* 2. VHS Filmography Shelf Hero */}
          <section
            id="shelf"
            style={{
              width: '100vw',
              height: '100vh',
              position: 'relative',
              overflow: 'hidden',
              background: '#000000',
            }}
          >
            <iframe
              src="./projects.html"
              title="Filmography VHS Shelf"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
