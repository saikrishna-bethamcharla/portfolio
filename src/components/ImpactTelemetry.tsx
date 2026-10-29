import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const ImpactTelemetry: React.FC = () => {
  return (
    <section id="impact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Operational Proof • 10 Verified Deployments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
          Impact Telemetry
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
          Empirically proven track record across multi-national enterprise web systems, AI film pipelines, and luxury brand assets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PORTFOLIO_DATA.impactTelemetry.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl glass-hologram flex flex-col justify-between group hover:-translate-y-0.5 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-amber-500 font-bold">[{item.index}]</span>
                <span className="px-2 py-0.5 rounded bg-black/60 border border-neutral-800 text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                  {item.domain}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-amber-400/90 font-semibold my-1">
                {item.metric}
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                {item.detail}
              </p>
            </div>

            {item.verifiedLink && (
              <div className="pt-3 mt-3 border-t border-neutral-800/60">
                <a
                  href={item.verifiedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider transition"
                >
                  <span>Verify Live System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
