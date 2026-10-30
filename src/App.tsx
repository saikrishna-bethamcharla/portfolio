import { useEffect } from 'react';
import { HeroVisual } from './components/HeroVisual';
import { MainframeContact } from './components/MainframeContact';

/**
 * App — 3-Phase Seamless Single-Page Portfolio:
 * 1. #hero: Apple-dark Aperture Hero (Pure black, red glow, "SAI KRISHNA")
 * 2. #shelf: 3D Filmography Shelf Showcase (12 interactive cases)
 * 3. #contact: Mainframe / A.R.I.A Interactive Direct Channels
 */
export function App() {
  useEffect(() => {
    // Listen for cross-frame navigation messages from the shelf iframe
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === 'SCROLL_TO_CONTACT') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.data?.type === 'SCROLL_TO_HERO') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.data?.type === 'SCROLL_TO_SHELF') {
        document.getElementById('shelf')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-x-hidden selection:bg-red-500/30 selection:text-white">
      {/* 1. Hero Section (Your dedicated Hero preserved for your custom plans) */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <HeroVisual />
      </section>

      {/* 2. 3D Filmography Shelf Showcase */}
      <section
        id="shelf"
        className="relative w-screen h-screen overflow-hidden bg-[#050507]"
      >
        <iframe
          src="./projects.html"
          title="Filmography Showcase"
          className="w-full h-full border-none block"
        />

        {/* Seamless bottom dissolve from Shelf into Contact section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(5,5,7,0.4) 50%, #050507 100%)',
          }}
        />
      </section>

      {/* 3. Contact & Channels Section (Mainframe A.R.I.A seamlessly blended) */}
      <section
        id="contact"
        className="relative w-full h-screen overflow-hidden bg-[#050507]"
      >
        {/* Seamless top dissolve receiving the Shelf above */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-40 sm:h-48 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, #050507 0%, rgba(5,5,7,0.85) 30%, rgba(5,5,7,0.3) 70%, transparent 100%)',
          }}
        />
        <MainframeContact />
      </section>
    </div>
  );
}

export default App;
