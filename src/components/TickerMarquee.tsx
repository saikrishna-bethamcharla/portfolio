import React from 'react';

export const TickerMarquee: React.FC = () => {
  const items = [
    "GENERATIVE AI CINEMA",
    "SEEDANCE 2.0 & KLING 3.0",
    "FULL-STACK WEB ARCHITECTURE",
    "80+ GLOBAL EXPORT MARKETS",
    "DAVINCI RESOLVE EDITORIAL",
    "CHARACTER CONTINUITY PIPELINES",
    "REACT 19 & TAILWIND CSS",
    "LUXURY PACKAGING SYSTEMS",
    "900+ LEADS GENERATED",
    "ZAI LABS TECHNICAL LEAD"
  ];

  return (
    <div
      aria-hidden="true"
      className="w-full border-y border-neutral-800/80 bg-black/60 backdrop-blur-md overflow-hidden py-2.5 relative z-10"
    >
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase whitespace-nowrap">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
