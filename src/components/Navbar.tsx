import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { AudioVisualizer } from './AudioVisualizer';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenCommand: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand }) => {
  const { soundEnabled, toggleSound } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Systems Matrix', href: '#systems' },
    { name: 'Trajectory', href: '#trajectory' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Impact Proof', href: '#impact' },
    { name: 'Direct Comm', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFX.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#040507]/90 border-b border-neutral-800">
      {/* Scroll Progress Laser Line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-neutral-950 focus:font-semibold focus:rounded-md shadow-lg"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            soundFX.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-black border border-neutral-700/80 flex items-center justify-center font-mono font-bold text-amber-400 group-hover:border-amber-400/80 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
            S
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight text-neutral-100 group-hover:text-amber-400 transition-colors">
              SAI KRISHNA
            </div>
            <div className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
              Creative & Tech Lead
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Visualizer Bar */}
          <div className="hidden sm:block">
            <AudioVisualizer active={soundEnabled} />
          </div>

          {/* Quick HUD command palette trigger */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenCommand();
            }}
            aria-label="Open Command HUD (Press Ctrl+K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">HUD</span>
            <kbd className="hidden lg:inline-block px-1 py-0.2 bg-neutral-800 text-neutral-400 rounded text-[9px]">
              ⌘K
            </kbd>
          </button>

          {/* Synthesizer Audio Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              toggleSound();
            }}
            aria-label={soundEnabled ? 'Mute synthesized audio feedback' : 'Unmute synthesized audio feedback'}
            className="p-2 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-amber-400 transition"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-neutral-500" />
            )}
          </button>

          {/* Direct Comm CTA */}
          <a
            href="mailto:saikrishnabethamcharla@gmail.com?subject=Commission%20Inquiry"
            onClick={() => soundFX.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition shadow-sm hover:shadow-amber-500/20"
          >
            <span>Direct Comm</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 rounded-md md:hidden bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#090b10] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-3 py-2 text-sm font-mono uppercase tracking-wider text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/40 rounded-md transition"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-2">
            <a
              href="mailto:saikrishnabethamcharla@gmail.com?subject=Commission%20Inquiry"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider"
            >
              Direct Commission
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
