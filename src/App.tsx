import { useCallback, useEffect, useRef, useState } from 'react';
import { HeroVisual } from './components/HeroVisual';
import { MainframeContact } from './components/MainframeContact';
import { CommandPalette } from './components/CommandPalette';

/**
 * App — 3-Phase Seamless Single-Page Portfolio:
 * 1. #hero: Apple-dark Aperture Hero (Pure black, red glow, "SAI KRISHNA")
 * 2. #shelf: 3D Filmography Shelf Showcase (12 interactive cases)
 * 3. #contact: Mainframe / A.R.I.A Interactive Direct Channels
 */
export function App() {
  const shelfRef = useRef<HTMLElement | null>(null);
  const shelfFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [shelfReady, setShelfReady] = useState(false);
  const [shelfLoaded, setShelfLoaded] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [projectRequest, setProjectRequest] = useState<{ id: string } | null>(null);

  // ⌘K / Ctrl+K opens the mainframe command palette
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    if (sectionId === 'shelf') setShelfReady(true);
    target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // A palette choice deep-links into the shelf app once its frame has loaded.
  const selectProject = useCallback((projectId: string) => {
    setShelfReady(true);
    document.getElementById('shelf')?.scrollIntoView({ behavior: 'smooth' });
    setProjectRequest({ id: projectId });
  }, []);

  useEffect(() => {
    if (!shelfLoaded || !projectRequest) return;
    shelfFrameRef.current?.contentWindow?.postMessage(
      { type: 'SELECT_PROJECT', id: projectRequest.id },
      '*',
    );
  }, [shelfLoaded, projectRequest]);

  // The shelf ships its own app plus ~30 MB of artwork. Mount it only once the
  // reader is heading toward it, so the hero stays light on first load.
  useEffect(() => {
    const el = shelfRef.current;
    if (!el || shelfReady) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShelfReady(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shelfReady]);

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
        ref={shelfRef}
        className="relative w-screen h-screen overflow-hidden bg-[#050507]"
      >
        {shelfReady ? (
          <iframe
            ref={shelfFrameRef}
            src="./projects.html"
            title="Filmography Showcase — shelved case studies and archive stills"
            onLoad={() => setShelfLoaded(true)}
            className="w-full h-full border-none block"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-[#5a5148]">
              PREPARING THE SHELF
            </span>
          </div>
        )}

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

      {/* Command palette trigger — quiet, persistent, desktop only */}
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        aria-label="Open command palette"
        className="hidden md:flex fixed bottom-5 right-6 z-40 items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/30 transition-colors hover:text-white/80 cursor-pointer"
      >
        <kbd className="rounded-sm border border-white/15 px-1.5 py-0.5 text-[9.5px] tracking-[0.1em] text-white/40">
          ⌘K
        </kbd>
        Command
      </button>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigateSection={navigateToSection}
        onSelectProject={selectProject}
      />

      {/* One emulsion over the whole page: film grain above every section and the shelf */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          pointerEvents: 'none',
          opacity: 0.42,
          mixBlendMode: 'soft-light',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='0.6'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}

export default App;
