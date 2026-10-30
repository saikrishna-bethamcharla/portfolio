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
      if (e.data?.type === 'PARENT_SCROLL' && typeof e.data.deltaY === 'number') {
        window.scrollBy({ top: e.data.deltaY, behavior: 'auto' });
      } else if (e.data?.type === 'SCROLL_TO_CONTACT') {
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
      {/* 1. Hero Section */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        <HeroVisual />

        {/* Seamless bottom dissolve into Contact section below */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(5,5,7,0.85) 60%, #050507 100%)',
          }}
        />
      </section>

      {/* 2. Direct Channels & Studio Contact (Switched to 2nd section for seamless scroll flow) */}
      <section
        id="contact"
        className="relative w-full h-screen overflow-hidden bg-[#050507]"
      >
        {/* Seamless top dissolve receiving the Hero section above */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-36 sm:h-48 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, #050507 0%, rgba(5,5,7,0.95) 30%, transparent 100%)',
          }}
        />

        <MainframeContact />

        {/* Seamless bottom dissolve into the 3D Shelf below */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(5,5,7,0.85) 65%, #050507 100%)',
          }}
        />
      </section>

      {/* 3. 3D Filmography Shelf Showcase (Now 3rd section at bottom, resolving scroll traps) */}
      <section
        id="shelf"
        className="relative w-screen h-screen overflow-hidden bg-[#050507]"
      >
        <iframe
          src="./projects.html"
          title="Filmography Showcase"
          className="w-full h-full border-none block"
        />

        {/* Seamless top dissolve receiving the Contact section above */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, #050507 0%, rgba(5,5,7,0.7) 40%, transparent 100%)',
          }}
        />
      </section>
    </div>
  );
}

export default App;
