import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { InteractiveWorkbench } from './InteractiveWorkbench';
import { Cpu, CheckCircle2, Filter, X } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const CrossConnectedMatrix: React.FC = () => {
  const { activeSystemId, setActiveSystemId, activeTag, setActiveTag } = usePortfolio();

  return (
    <section id="systems" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold mb-2">
            <Cpu className="w-4 h-4" />
            <span>Interactive Pinned Architecture Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Systems & Deployments
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-xl">
            Select or scroll through any system to drive the live architectural workbench. Click any technology tag to cross-filter connected nodes across the entire portfolio.
          </p>
        </div>

        {/* Active Tag Indicator / Reset */}
        {activeTag && (
          <div className="flex items-center gap-2 p-2 px-3 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono">
            <Filter className="w-3.5 h-3.5" />
            <span>ACTIVE CROSS-FILTER: <strong>{activeTag}</strong></span>
            <button
              onClick={() => setActiveTag(null)}
              className="p-1 rounded hover:bg-amber-500/20 text-amber-200"
              aria-label="Clear active cross filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Two-Column Interlocking Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Pinned Workbench */}
        <div className="lg:col-span-6">
          <InteractiveWorkbench systemId={activeSystemId} />
        </div>

        {/* Right Scrolling Systems Stream */}
        <div className="lg:col-span-6 space-y-6">
          {PORTFOLIO_DATA.deployments.map((sys) => {
            const isActive = activeSystemId === sys.id;
            const matchesTag = !activeTag || sys.stack.includes(activeTag) || sys.deliverables.some(d => d.toLowerCase().includes(activeTag.toLowerCase()));

            return (
              <div
                key={sys.id}
                onMouseEnter={() => {
                  if (activeSystemId !== sys.id) {
                    setActiveSystemId(sys.id);
                  }
                }}
                onClick={() => {
                  soundFX.playClick();
                  setActiveSystemId(sys.id);
                }}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border cursor-pointer relative ${
                  isActive
                    ? 'bg-neutral-900/90 border-amber-500 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'bg-[#08090d]/80 border-neutral-800 hover:border-neutral-700'
                } ${!matchesTag ? 'opacity-35' : 'opacity-100'}`}
              >
                {/* Active Indicator Beacon */}
                {isActive && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span>SYSTEM IN BENCH</span>
                  </div>
                )}

                <div className="text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold mb-2">
                  {sys.discipline}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {sys.title}
                </h3>

                <p className="text-xs font-mono text-neutral-400 mb-4">
                  {sys.tagline}
                </p>

                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {sys.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-black/60 border border-neutral-800">
                  {sys.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-xl font-mono font-extrabold text-white">{m.value}</div>
                      <div className="text-[11px] font-mono text-neutral-400 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="mb-6 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-1">
                    Verified Deliverables:
                  </div>
                  {sys.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Clickable Tech Stack Tags */}
                <div className="pt-4 border-t border-neutral-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-2">
                    Click Tag to Cross-Filter Architecture:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sys.stack.map((tech) => {
                      const isTagSelected = activeTag === tech;
                      return (
                        <button
                          key={tech}
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFX.playClick();
                            setActiveTag(isTagSelected ? null : tech);
                          }}
                          className={`px-2.5 py-1 text-xs font-mono rounded transition cursor-pointer border ${
                            isTagSelected
                              ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-sm'
                              : 'bg-black/60 text-neutral-300 border-neutral-800 hover:border-amber-500/60 hover:text-white'
                          }`}
                        >
                          {tech}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
