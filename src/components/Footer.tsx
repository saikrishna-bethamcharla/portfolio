import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, ArrowUpRight, ArrowUp, FileDown, Radio } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-neutral-800 bg-[#040507] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/80">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold">
            <Radio className="w-3.5 h-3.5" />
            <span>Direct Commission & Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Initiate Project Commission.
          </h2>
          <p className="text-neutral-400 text-base max-w-xl leading-relaxed">
            Available for enterprise full-stack web platforms, generative AI video direction, post-production finishing, and brand systems architecture.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="mailto:saikrishnabethamcharla@gmail.com?subject=Commission%20Inquiry"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-lg hover:shadow-amber-500/20"
            >
              <Mail className="w-4 h-4" />
              <span>saikrishnabethamcharla@gmail.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold uppercase tracking-wider transition"
            >
              <FileDown className="w-4 h-4" />
              <span>Curriculum Vitae (PDF)</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
              Verified Channel Endpoints
            </div>
            <div className="flex flex-col space-y-2">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 text-sm text-neutral-200 hover:text-white transition group"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  <span>LinkedIn Profile</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition" />
              </a>

              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 text-sm text-neutral-200 hover:text-white transition group"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                  <span>GitHub Repositories</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition" />
              </a>

              <a
                href={profile.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 text-sm text-neutral-200 hover:text-white transition group"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  <span>Instagram</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition" />
              </a>

              <a
                href="https://youtu.be/r9kHcvYWZ4c"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="flex items-center justify-between p-3.5 rounded-lg bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 text-sm text-neutral-200 hover:text-white transition group"
              >
                <span className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span>YouTube Film Channel</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright & back to top */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div>
          © 2026 Sai Krishna Bethamcharla • Creative & Technical Lead • Hyderabad, India
        </div>

        <div className="flex items-center gap-4">
          <span className="text-emerald-400/90 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            WCAG 2.2 AAA Validated
          </span>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1 text-neutral-400 hover:text-amber-400 transition cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
