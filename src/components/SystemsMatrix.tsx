import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Play, ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const SystemsMatrix: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'web' | 'ai-video' | 'post-production' | 'brand-systems'>('all');

  const filterTabs = [
    { label: 'All Systems (04)', value: 'all' as const },
    { label: 'Web Architecture', value: 'web' as const },
    { label: 'Neural AI Cinema', value: 'ai-video' as const },
    { label: 'Post & VFX', value: 'post-production' as const },
    { label: 'Brand & Operations', value: 'brand-systems' as const },
  ];

  const filteredDeployments = selectedFilter === 'all'
    ? PORTFOLIO_DATA.deployments
    : PORTFOLIO_DATA.deployments.filter((p) => p.category === selectedFilter);

  const handleFilterClick = (val: typeof selectedFilter) => {
    soundFX.playClick();
    setSelectedFilter(val);
  };

  return (
    <section id="systems" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-800 pb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold mb-2">
            <Cpu className="w-4 h-4" />
            <span>Systems Architecture • 2025–2026</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Flagship Systems
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
            High-performance web architecture, multi-shot neural video pipelines, editorial VFX, and luxury brand systems.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Systems Filter">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={selectedFilter === tab.value}
              onClick={() => handleFilterClick(tab.value)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                selectedFilter === tab.value
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 3D-styled Deployment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
        {filteredDeployments.map((deployment) => (
          <article
            key={deployment.id}
            className="group rounded-2xl glass-hologram p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 relative overflow-hidden"
          >
            {/* Corner Decorative HUD Marks */}
            <div className="absolute top-2 right-2 text-[10px] font-mono text-neutral-600 group-hover:text-amber-500/80 transition-colors">
              [SYS-{deployment.id.toUpperCase()}]
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 pb-3 border-b border-neutral-800/80">
                <span className="text-amber-400 font-semibold uppercase tracking-wider">
                  {deployment.discipline}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 font-mono">
                  {deployment.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                {deployment.title}
              </h3>

              <p className="text-xs font-mono text-neutral-400 mb-4">{deployment.tagline}</p>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {deployment.summary}
              </p>

              {/* Metrics Box */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-black/50 border border-neutral-800/80">
                {deployment.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xl font-mono font-extrabold text-white">{m.value}</div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-tight">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Deliverables List */}
              <div className="mb-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Integrated Deliverables:
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {deployment.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500/90 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions & Stack */}
            <div className="pt-4 border-t border-neutral-800/80 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {deployment.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-neutral-900/90 border border-neutral-800 text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                {deployment.liveUrl && (
                  <a
                    href={deployment.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition"
                  >
                    <span>Inspect Live Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {deployment.videoUrl && (
                  <a
                    href={deployment.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition border border-neutral-700"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                    <span>Watch Cinematic Reel</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
