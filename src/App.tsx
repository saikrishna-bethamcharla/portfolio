import { HeroVisual } from './components/HeroVisual';

/**
 * App — Two-phase experience:
 * 1. Apple dark hero: pure black, red ambient glow, centered name "SAI KRISHNA".
 * 2. Right below: Leon Vasari VHS Filmography Shelf Hero (1958–1989).
 */
export function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        background: '#000000',
        overflowX: 'hidden',
      }}
    >
      {/* 1. Aperture Hero Section */}
      <HeroVisual />

      {/* 2. Right below that: VHS Filmography Shelf Hero */}
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
  );
}

export default App;
