import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFX } from '../utils/soundEffects';
import { AudioVisualizer } from './AudioVisualizer';
import { Terminal, Volume2, VolumeX, ArrowUpRight, Play, Crosshair, Radio, Mail, FileDown, Eye, EyeOff, Compass } from 'lucide-react';

interface CinematicHUDProps {
  viewportProgress: number; // 0.0 to 6.0
  onScrollToChapter: (vH: number) => void;
  onOpenCommand: () => void;
}

export const CinematicHUD: React.FC<CinematicHUDProps> = ({
  viewportProgress,
  onScrollToChapter,
  onOpenCommand,
}) => {
  const { soundEnabled, toggleSound } = usePortfolio();
  const { profile } = PORTFOLIO_DATA;
  const [walkthroughMode, setWalkthroughMode] = useState(false);

  const chapters = [
    { label: '01 APERTURE', vH: 0.0 },
    { label: '02 SYSTEMS', vH: 1.5 },
    { label: '03 TRAJECTORY', vH: 3.2 },
    { label: '04 CAPABILITIES', vH: 4.4 },
    { label: '05 DIRECT COMM', vH: 5.4 },
  ];

  // Determine active system index during Scene 02 (vH 1.0 to 3.0)
  const systemIndex = Math.min(3, Math.max(0, Math.floor((viewportProgress - 1.0) / 0.5)));
  const currentDeployment = PORTFOLIO_DATA.deployments[systemIndex] || PORTFOLIO_DATA.deployments[0];

  // Determine active milestone in Scene 03 (vH 3.0 to 4.2)
  const milestoneIndex = Math.min(4, Math.max(0, Math.floor((viewportProgress - 3.0) / 0.24)));
  const currentMilestone = PORTFOLIO_DATA.trajectory[milestoneIndex] || PORTFOLIO_DATA.trajectory[0];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* 1. TOP STICKY HUD BAR */}
      <header className="flex items-center justify-between w-full pointer-events-auto backdrop-blur-md bg-neutral-950/60 border border-neutral-800/80 px-4 py-2.5 rounded-xl shadow-lg">
        {/* Monogram Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-black border border-amber-500/60 flex items-center justify-center font-mono font-bold text-amber-400 text-sm shadow-[0_0_12px_rgba(245,158,11,0.25)]">
            S
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wider uppercase font-mono">
              SAI KRISHNA
            </div>
            <div className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
              Creative & Tech Lead
            </div>
          </div>
        </div>

        {/* Chapter Scrubber Track */}
        <nav aria-label="Cinematic Timeline Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {chapters.map((ch, idx) => {
            const isActive =
              (idx === 0 && viewportProgress < 1.0) ||
              (idx === 1 && viewportProgress >= 1.0 && viewportProgress < 3.0) ||
              (idx === 2 && viewportProgress >= 3.0 && viewportProgress < 4.2) ||
              (idx === 3 && viewportProgress >= 4.2 && viewportProgress < 5.2) ||
              (idx === 4 && viewportProgress >= 5.2);

            return (
              <button
                key={ch.label}
                onClick={() => {
                  soundFX.playClick();
                  onScrollToChapter(ch.vH);
                }}
                className={`px-3 py-1 rounded text-[11px] font-mono tracking-wider transition cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-black/50 text-neutral-400 hover:text-white border-neutral-800'
                }`}
              >
                {ch.label}
              </button>
            );
          })}
        </nav>

        {/* Controls & Direct Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Full City Walkthrough Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setWalkthroughMode((prev) => !prev);
            }}
            title={walkthroughMode ? "Show HUD Cards" : "Full City Walkthrough (Hide HUD)"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono transition cursor-pointer border ${
              walkthroughMode
                ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400'
                : 'bg-black/60 text-neutral-300 hover:text-white border-neutral-800'
            }`}
          >
            {walkthroughMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">HUD Hidden</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Walkthrough Mode</span>
              </>
            )}
          </button>

          <AudioVisualizer active={soundEnabled} />

          <button
            onClick={() => {
              soundFX.playClick();
              onOpenCommand();
            }}
            aria-label="Open Command HUD"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-black/60 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">HUD</span>
            <kbd className="hidden lg:inline text-[9px] text-neutral-500">⌘K</kbd>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              toggleSound();
            }}
            aria-label="Toggle synthesized audio"
            className="p-1.5 rounded bg-black/60 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-amber-400 transition cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          <a
            href="mailto:saikrishnabethamcharla@gmail.com?subject=Direct%20Commission"
            onClick={() => soundFX.playClick()}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition"
          >
            <span>Comm</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* 2. DYNAMIC CENTER / SIDE STAGE (Docked to Left so 3D London City is visible!) */}
      <div className="flex-1 flex items-center justify-start my-auto w-full max-w-7xl mx-auto px-2 sm:px-6">
        {/* SCENE 01: Aperture Hero (vH < 1.0) */}
        {viewportProgress < 1.0 && !walkthroughMode && (
          <div className="w-full text-center space-y-6 max-w-3xl mx-auto pointer-events-auto transition-all duration-500 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold backdrop-blur-sm">
              <Crosshair className="w-3.5 h-3.5" />
              <span>Full-Stack Engineering & Generative Direction</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter uppercase leading-none drop-shadow-lg">
              Sai Krishna <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                Bethamcharla
              </span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow">
              {profile.statement}
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onScrollToChapter(1.5);
                }}
                className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-lg hover:shadow-amber-500/25"
              >
                Scroll to Enter 3D London Systems
              </button>
              <button
                onClick={() => setWalkthroughMode(true)}
                className="px-4 py-3 rounded-lg bg-black/60 hover:bg-black/80 border border-neutral-700 text-xs font-mono text-neutral-300 uppercase tracking-wider transition"
              >
                View 3D City
              </button>
            </div>
          </div>
        )}

        {/* SCENE 02: 3D Systems Traveling Cards (vH 1.0 to 3.0) */}
        {viewportProgress >= 1.0 && viewportProgress < 3.0 && !walkthroughMode && (
          <div className="w-full max-w-md lg:max-w-lg bg-neutral-950/70 backdrop-blur-md border border-neutral-700/60 p-5 sm:p-7 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                SYSTEM 0{systemIndex + 1} OF 04 // {currentDeployment.discipline}
              </span>
              <button
                onClick={() => setWalkthroughMode(true)}
                className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                title="Minimize Card"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Minimize</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3">
              {currentDeployment.title}
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-1 mb-3">
              {currentDeployment.tagline}
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              {currentDeployment.summary}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-black/50 border border-neutral-800/80">
              {currentDeployment.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-lg font-mono font-extrabold text-amber-400">{m.value}</div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1 mb-4">
              {currentDeployment.stack.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t border-neutral-800">
              {currentDeployment.liveUrl && (
                <a
                  href={currentDeployment.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition"
                >
                  <span>Inspect Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {currentDeployment.videoUrl && (
                <a
                  href={currentDeployment.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition border border-neutral-700"
                >
                  <Play className="w-3 h-3 fill-current text-amber-400" />
                  <span>Cinematic Reel</span>
                </a>
              )}

              <span className="text-[10px] font-mono text-neutral-500 ml-auto">
                Scroll to traverse
              </span>
            </div>
          </div>
        )}

        {/* SCENE 03: 3D Trajectory Constellation (vH 3.0 to 4.2) */}
        {viewportProgress >= 3.0 && viewportProgress < 4.2 && !walkthroughMode && (
          <div className="w-full max-w-md lg:max-w-lg bg-neutral-950/70 backdrop-blur-md border border-neutral-700/60 p-5 sm:p-7 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                {currentMilestone.phaseCode} // {currentMilestone.year}
              </span>
              <button
                onClick={() => setWalkthroughMode(true)}
                className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                title="Minimize Card"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Minimize</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3">
              {currentMilestone.title}
            </h2>
            <div className="text-xs font-mono text-neutral-400 mt-1 mb-3">
              Designation: <span className="text-white">{currentMilestone.designation}</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              {currentMilestone.overview}
            </p>

            {/* Breakdown nodes */}
            <div className="grid grid-cols-1 gap-2 mb-2">
              {currentMilestone.breakdown.slice(0, 2).map((b) => (
                <div key={b.nodeId} className="p-2.5 rounded-lg bg-black/50 border border-neutral-800">
                  <div className="text-amber-400 font-mono text-[11px] font-bold">{b.nodeId}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{b.headline}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{b.context}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCENE 04: Capabilities Matrix (vH 4.2 to 5.2) */}
        {viewportProgress >= 4.2 && viewportProgress < 5.2 && !walkthroughMode && (
          <div className="w-full max-w-lg bg-neutral-950/70 backdrop-blur-md border border-neutral-700/60 p-5 sm:p-7 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                TECHNICAL CAPABILITIES & PRODUCTION RIG
              </span>
              <button
                onClick={() => setWalkthroughMode(true)}
                className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                title="Minimize Card"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Minimize</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {PORTFOLIO_DATA.capabilities.slice(0, 4).map((group) => (
                <div key={group.group} className="p-3 rounded-xl bg-black/50 border border-neutral-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {group.group}
                  </div>
                  <div className="space-y-1.5">
                    {group.capabilities.slice(0, 3).map((cap) => (
                      <div key={cap.identifier} className="space-y-0.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-white font-medium">{cap.name}</span>
                          <span className="text-amber-400 font-mono">{cap.score}%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${cap.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCENE 05: Direct Commission & Verified Telemetry (vH >= 5.2) */}
        {viewportProgress >= 5.2 && !walkthroughMode && (
          <div className="w-full max-w-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-700/60 p-6 sm:p-8 rounded-2xl shadow-2xl pointer-events-auto transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest font-semibold">
                <Radio className="w-4 h-4" />
                <span>Direct Commission Terminal</span>
              </div>
              <button
                onClick={() => setWalkthroughMode(true)}
                className="text-neutral-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                title="Minimize Card"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Minimize</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Initiate Commission.
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Available for full-scope AI film direction, enterprise web platform architecture, and brand design systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href="mailto:saikrishnabethamcharla@gmail.com?subject=Commission%20Inquiry"
                onClick={() => soundFX.playClick()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs font-mono uppercase tracking-wider transition shadow-lg hover:shadow-amber-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Direct</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition border border-neutral-800"
              >
                <FileDown className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>HYDERABAD, INDIA</span>
              <span className="text-emerald-400">WCAG 2.2 AAA VERIFIED</span>
            </div>
          </div>
        )}

        {/* WALKTHROUGH MODE DOCKED CAPSULE (When user clicked Walkthrough / Minimize) */}
        {walkthroughMode && (
          <div className="fixed bottom-16 left-6 pointer-events-auto bg-black/75 backdrop-blur-md border border-amber-500/50 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-white">
              London 3D Walkthrough Active
            </span>
            <button
              onClick={() => setWalkthroughMode(false)}
              className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
            >
              Show Specifications
            </button>
          </div>
        )}
      </div>

      {/* 3. BOTTOM SCRUBBER & STATUS TELEMETRY */}
      <footer className="flex items-center justify-between w-full pointer-events-auto text-[11px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-3">
        <div className="flex items-center gap-3">
          <span className="text-amber-500 font-bold">
            TIMELINE: {(viewportProgress).toFixed(2)} vH
          </span>
          <span>•</span>
          <span className="hidden sm:inline">
            CHAPTER: {chapters[Math.min(4, Math.floor(viewportProgress))]?.label || '01 APERTURE'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setWalkthroughMode((prev) => !prev)}
            className="hover:text-amber-400 cursor-pointer flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>{walkthroughMode ? "Exit Free Walkthrough" : "Full City View"}</span>
          </button>
          <span className="hidden sm:inline">•</span>
          <div className="hidden sm:flex items-center gap-2">
            <span>SCROLL TO TRAVERSE 3D STAGE</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
};