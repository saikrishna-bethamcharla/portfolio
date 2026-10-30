import { MainframeHero } from './components/MainframeHero';

/**
 * App — Mainframe Agency About & Hero section at the top,
 * followed immediately by the 3D Cinematic Filmography Shelf.
 */
export function App() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white overflow-x-hidden selection:bg-red-500/30 selection:text-white">
      {/* 1. Mainframe Hero / About Section (Customized to our dark luxury cinnabar theme) */}
      <MainframeHero />

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
  );
}

export default App;
