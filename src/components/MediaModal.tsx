import React, { useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  videoUrl?: string;
  externalUrl?: string;
  telemetry?: string;
  specs?: string[];
  description?: string;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  title,
  category,
  videoUrl,
  externalUrl,
  telemetry,
  specs = [],
  description,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        soundFX.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Extract YouTube ID if it is a youtube link
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#090b10] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Reticles */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
                SYSTEM INSPECTOR // {category}
              </div>
              <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition"
            aria-label="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Media Player Screen */}
          {embedUrl ? (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-800 bg-black shadow-inner">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-black/60 border border-neutral-800 text-center space-y-3">
              <Activity className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
              <div className="text-sm font-bold text-white">Live System Deployment Target</div>
              <p className="text-xs text-neutral-400 max-w-lg mx-auto">
                {description || 'Production web platform deployed to global edge network with active lead pipeline.'}
              </p>
            </div>
          )}

          {/* Telemetry and Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {telemetry && (
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Operational Telemetry
                </div>
                <div className="text-sm font-mono font-bold text-amber-300">
                  {telemetry}
                </div>
              </div>
            )}

            {specs.length > 0 && (
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Verified Invariants
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {specs.map((spec, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-300 bg-black/50 px-2 py-0.5 rounded border border-neutral-800"
                    >
                      <ShieldCheck className="w-3 h-3 text-amber-500" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {description && embedUrl && (
            <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-mono">
              <span className="text-neutral-500 uppercase">Architecture Notes: </span>
              {description}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-950/80">
          <div className="text-[10px] font-mono text-neutral-500">
            PRESS <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">ESC</kbd> TO DISMISS
          </div>

          <div className="flex items-center gap-3">
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition"
              >
                <span>Open Production Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono font-semibold transition border border-neutral-800"
            >
              Close HUD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
