import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { Activity, Radio } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const TrajectoryTimeline: React.FC = () => {
  const { activeTag, setActiveTag } = usePortfolio();
  const [activeYear, setActiveYear] = useState<string>('2026');

  const currentMilestone = PORTFOLIO_DATA.trajectory.find((t) => t.year === activeYear) || PORTFOLIO_DATA.trajectory[0];

  const handleYearSelect = (year: string) => {
    soundFX.playClick();
    setActiveYear(year);
  };

  return (
    <section id="trajectory" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold mb-2">
          <Activity className="w-4 h-4" />
          <span>Interactive Evolutionary Trajectory • 2022 to Present</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Trajectory
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Trace engineering and leadership deployments from London postgraduate honors to multi-shot generative AI cinema and enterprise platforms.
        </p>
      </div>

      {/* Cyber Scrubber Bar */}
      <div className="mb-10">
        <div
          role="tablist"
          aria-label="Trajectory Milestone Selector"
          className="flex flex-wrap items-center gap-2 sm:gap-3 p-2 rounded-2xl bg-black/60 border border-neutral-800 backdrop-blur-md"
        >
          {PORTFOLIO_DATA.trajectory.map((m) => {
            const hasActiveTag = activeTag && m.breakdown.some(b => b.specs.includes(activeTag));
            const isSelected = activeYear === m.year;

            return (
              <button
                key={m.year}
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleYearSelect(m.year)}
                className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/20 font-bold'
                    : 'bg-neutral-950/60 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800/80'
                } ${hasActiveTag ? 'ring-2 ring-amber-400' : ''}`}
              >
                {hasActiveTag && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                )}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono uppercase ${isSelected ? 'text-neutral-900 font-bold' : 'text-amber-500'}`}>
                    {m.phaseCode}
                  </span>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-neutral-950' : 'text-white'}`}>
                    {m.year}
                  </span>
                </div>
                <div className="text-xs truncate mt-1">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Milestone Card with Holographic Styling */}
      <div className="rounded-2xl bg-[#090b10] border border-neutral-700/80 p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-neutral-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold">
              <Radio className="w-3.5 h-3.5" />
              <span>{currentMilestone.phaseCode} // {currentMilestone.timeframe}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              {currentMilestone.title}
            </h3>
            <p className="text-sm font-mono text-neutral-400 mt-1">
              Designation: <span className="text-neutral-200">{currentMilestone.designation}</span>
            </p>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded bg-black/60 border border-neutral-800 text-neutral-300 self-start md:self-auto">
            {currentMilestone.breakdown.length} System Nodes Linked
          </div>
        </div>

        <p className="text-neutral-300 text-base leading-relaxed max-w-3xl mb-8">
          {currentMilestone.overview}
        </p>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMilestone.breakdown.map((node) => {
            const nodeMatchesTag = !activeTag || node.specs.includes(activeTag);

            return (
              <div
                key={node.nodeId}
                className={`p-5 rounded-xl bg-black/60 border transition space-y-3 ${
                  nodeMatchesTag
                    ? 'border-neutral-800 hover:border-amber-500/60'
                    : 'border-neutral-900 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                    {node.nodeId}
                  </span>
                  <span className="text-neutral-500">{currentMilestone.year}</span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">
                    {node.headline}
                  </h4>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {node.context}
                </p>

                {/* Specs tags click to cross-filter */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {node.specs.map((spec, sIdx) => {
                    const isSelected = activeTag === spec;
                    return (
                      <button
                        key={sIdx}
                        onClick={() => {
                          soundFX.playClick();
                          setActiveTag(isSelected ? null : spec);
                        }}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border cursor-pointer transition ${
                          isSelected
                            ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        {spec}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
