import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { Sliders } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const TechGrid: React.FC = () => {
  const { activeTag, setActiveTag } = usePortfolio();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);

  const handleGroupSelect = (index: number) => {
    soundFX.playClick();
    setSelectedGroupIndex(index);
  };

  const activeGroup = PORTFOLIO_DATA.capabilities[selectedGroupIndex];

  return (
    <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold mb-2">
          <Sliders className="w-4 h-4" />
          <span>Interactive Capabilities Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Capabilities Matrix
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Click any capability to cross-filter connected deployments and architectural nodes throughout the portfolio.
        </p>
      </div>

      {/* Group selector tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Capabilities Category Selector">
        {PORTFOLIO_DATA.capabilities.map((cat, idx) => (
          <button
            key={cat.group}
            role="tab"
            aria-selected={selectedGroupIndex === idx}
            onClick={() => handleGroupSelect(idx)}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
              selectedGroupIndex === idx
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {cat.group}
          </button>
        ))}
      </div>

      {/* Grid of Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeGroup.capabilities.map((cap) => {
          const isSelected = activeTag === cap.name;

          return (
            <div
              key={cap.identifier}
              onClick={() => {
                soundFX.playClick();
                setActiveTag(isSelected ? null : cap.name);
              }}
              className={`p-6 rounded-2xl transition space-y-4 border cursor-pointer relative ${
                isSelected
                  ? 'bg-neutral-900 border-amber-500 shadow-xl shadow-amber-500/10'
                  : 'bg-[#08090d]/80 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${isSelected ? 'bg-amber-500 text-neutral-950 border-amber-400' : 'bg-black/60 text-amber-400 border-neutral-800'}`}>
                  {cap.identifier}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                  {cap.proficiency}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cap.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                  {cap.description}
                </p>
              </div>

              {/* Visual telemetry bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>PRODUCTION BENCHMARK</span>
                  <span className="text-amber-400 font-bold">{cap.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${cap.score}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
