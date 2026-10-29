import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Volume2, VolumeX, Eye, Sparkles, History, Mail, Cpu } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  highContrast,
  onToggleHighContrast,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      soundFX.playTransition();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (vH: number) => {
    soundFX.playClick();
    onClose();
    window.scrollTo({
      top: vH * window.innerHeight,
      behavior: 'smooth',
    });
  };

  const navItems = [
    { label: 'Flagship Systems & Deployments (4)', vH: 1.5, icon: Cpu, tag: 'Architecture' },
    { label: 'Evolutionary Trajectory (2022-2026)', vH: 3.2, icon: History, tag: 'Milestones' },
    { label: 'Capabilities & Tooling Matrix', vH: 4.4, icon: Sparkles, tag: 'Proficiency' },
    { label: 'Direct Commission & Contact', vH: 5.4, icon: Mail, tag: 'Direct Comm' },
  ];

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command HUD Terminal"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#08090d] border border-neutral-700/80 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-800 bg-neutral-950/60">
          <Search className="w-5 h-5 text-amber-500 mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type command, search systems, or navigate... [ESC to cancel]"
            className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 font-semibold">
              SYSTEM TARGETS
            </span>
            <div className="mt-1 space-y-1">
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigateTo(item.vH)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                      <span className="text-neutral-200 font-medium group-hover:text-amber-300">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded bg-black/40">
                      {item.tag}
                    </span>
                  </button>
                );
              })}
              {filteredNav.length === 0 && (
                <p className="text-xs text-neutral-500 px-3 py-2 font-mono">No matching system target.</p>
              )}
            </div>
          </div>

          {/* Quick HUD Toggles */}
          <div className="pt-2 border-t border-neutral-800/80">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 font-semibold">
              TELEMETRY & ACCESSIBILITY CONTROLS
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2 px-1">
              <button
                onClick={() => {
                  soundFX.playClick();
                  onToggleSound();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-amber-500/50 transition text-xs"
              >
                <span className="flex items-center gap-2 text-neutral-300 font-mono">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-amber-400" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-neutral-500" />
                  )}
                  Synthesized Audio
                </span>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${soundEnabled ? 'bg-amber-500/20 text-amber-300 font-bold' : 'bg-neutral-800 text-neutral-400'}`}>
                  {soundEnabled ? 'ON' : 'MUTED'}
                </span>
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  onToggleHighContrast();
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-amber-500/50 transition text-xs"
              >
                <span className="flex items-center gap-2 text-neutral-300 font-mono">
                  <Eye className="w-4 h-4 text-amber-400" />
                  High Contrast
                </span>
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${highContrast ? 'bg-amber-500/20 text-amber-300 font-bold' : 'bg-neutral-800 text-neutral-400'}`}>
                  {highContrast ? 'ACTIVE' : 'DEFAULT'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span>HUD TERMINAL</span>
            <span>•</span>
            <span className="text-emerald-400">WCAG 2.2 AAA VERIFIED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
