import { useEffect } from 'react';
import { HeroVisual } from './components/HeroVisual';
import { MainframeContact } from './components/MainframeContact';

/**
 * App — 3-Phase Single-Page Portfolio Experience:
 * 1. Hero Section: Apple-dark Aperture Hero (Pure black, red glow, "SAI KRISHNA")
 * 2. 3D Filmography Showcase Shelf: 12 Interactive VHS/Leather books
 * 3. Contact & Channels Section: Mainframe / A.R.I.A interactive scrub experience
 */
export function App() {
  useEffect(() => {
    // Listen for cross-frame messages from the shelf iframe (e.g. scroll down to contact)
    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === 'SCROLL_TO_CONTACT') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.data?.type === 'SCROLL_TO_HERO') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: '#050507',
        }}
      >
        <iframe
          src="./projects.html"
          title="Filmography Showcase"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
        />
      </section>

      {/* 3. Contact & Channels Section (Powered by Mainframe A.R.I.A) */}
      <section id="contact" className="relative w-full h-screen overflow-hidden">
        <MainframeContact />
      </section>
    </div>
  );
}

export default App;
