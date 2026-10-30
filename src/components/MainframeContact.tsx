import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom typewriter hook
 * Takes text, speed (ms per char, default 38ms), startDelay (ms, default 600ms)
 * Returns { displayed, done }
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;
    setDisplayed('');
    setDone(false);

    timeoutId = window.setTimeout(() => {
      let index = 0;
      intervalId = window.setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/**
 * MainframeContact — Seamlessly Blended Interactive Direct Channels
 * Features:
 * - Seamless top gradient dissolve melting into the 3D shelf
 * - Mouse-scrub video masked with spotlight radial feather
 * - Luminous micro-dust particles matching HeroVisual
 * - Subtle integrated sub-header [ 03 / DIRECT INQUIRY & CHANNELS ]
 * - A.R.I.A blurred intro + conversational typewriter
 * - Action pill buttons with direct mailto + clipboard copy
 */
export function MainframeContact() {
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Typewriter effect for A.R.I.A prompt
  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

  // Pills reveal 400ms after component mounts
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Ambient micro-particles animation matching the portfolio theme
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      r: number;
      vy: number;
      opacity: number;
      drift: number;
    }

    const count = 55;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.3 + 0.3,
      vy: -(Math.random() * 0.35 + 0.08),
      opacity: Math.random() * 0.3 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        p.y += p.vy;
        p.x += p.drift;
        if (p.y < -4) {
          p.y = H + 4;
          p.x = Math.random() * W;
        }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Video Scrubbing Logic
  const performSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || isSeekingRef.current) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
      performSeek();
    }
  }, [performSeek]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const SENSITIVITY = 0.8;
      const duration = video.duration || 1;
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;

      targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
      performSeek();
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [performSeek]);

  const handleCopyEmail = async () => {
    const email = 'saikrishnabethamcharla@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToHero = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToShelf = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    document.getElementById('shelf')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillActions = [
    {
      label: 'Pitch us an idea',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Project%20Pitch%20%E2%80%94%20Sai%20Krishna',
    },
    {
      label: 'Come work here',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Collaboration%20Inquiry',
    },
    {
      label: 'Send a brief hello',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Hello%20from%20Portfolio',
    },
    {
      label: 'See how we operate',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Advisory%20Inquiry',
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050507] text-white selection:bg-red-500/30 selection:text-white font-body">
      {/* 1. BACKGROUND VIDEO (mouse-scrub controlled with soft theatrical spotlight mask) */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          objectPosition: '70% center',
          filter: 'brightness(0.70) contrast(1.22) saturate(0.85)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 12%, black 28%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 12%, black 28%, black 85%, transparent 100%)',
        }}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
      />

      {/* 2. THEME OVERLAYS: CINEMATIC DISSOLVES & SPOTLIGHT GRADING */}
      {/* A. Deep obsidian left vignette (makes white typography pop without background distraction) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,7,0.98) 0%, rgba(5,5,7,0.88) 35%, rgba(5,5,7,0.45) 60%, transparent 85%)',
        }}
      />

      {/* B. Edge vignette framing the entire viewport */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(5,5,7,0.65) 75%, #050507 100%)',
        }}
      />

      {/* C. Signature red ambient bloom behind the character */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 65% 48%, rgba(220, 20, 20, 0.25) 0%, rgba(160, 10, 10, 0.10) 35%, transparent 70%)',
        }}
      />

      {/* D. Upward drifting luminous dust particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* 3. INTEGRATED EDITORIAL SUB-HEADER (nestled cleanly in theme) */}
      <div className="absolute top-8 sm:top-10 left-5 sm:left-8 right-5 sm:right-8 z-20 flex flex-row justify-between items-center pb-3 border-b border-white/10">
        <div className="flex flex-row items-center gap-3">
          <span className="flex items-center gap-2 text-[10.5px] tracking-[0.24em] font-mono text-red-500 uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>[ 03 / DIRECT INQUIRY & CHANNELS ]</span>
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span
            style={{ fontFamily: 'var(--font-heading)' }}
            className="text-[17px] sm:text-[20px] tracking-tight text-white leading-none hidden sm:inline"
          >
            Mainframe®
          </span>
          <span className="text-[18px] text-red-500 select-none leading-none drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] hidden sm:inline">
            ✳︎
          </span>
        </div>

        <div className="flex flex-row items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={scrollToShelf}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-zinc-400 hover:text-white border border-white/15 hover:border-red-500/60 px-3.5 py-1.5 rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer"
          >
            <span>↑ BACK TO SHELF</span>
          </button>
        </div>
      </div>

      {/* 4. MAIN CONTENT (z-index: 1) */}
      <main className="h-screen flex flex-col justify-end pb-16 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden relative z-[1]">
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred intro label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#ffffff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6 min-h-[54px]"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-red-500 align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action pill buttons */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* 4 White pill buttons */}
            {pillActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer no-underline"
              >
                {action.label}
              </a>
            ))}

            {/* 1 Outline pill button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center text-white bg-transparent border border-white/80 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer group"
              title="Click to copy direct email"
            >
              <span>
                Reach us:{' '}
                <span className="underline underline-offset-1">
                  {copied ? 'Copied to clipboard! ✓' : 'saikrishnabethamcharla@gmail.com'}
                </span>
              </span>
              {/* 12x12 copy icon */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                <rect
                  x="3.5"
                  y="1"
                  width="7.5"
                  height="7.5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  fill="none"
                />
                <rect
                  x="1"
                  y="3.5"
                  width="7.5"
                  height="7.5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer Credit & Return Link */}
        <div className="absolute bottom-6 left-5 sm:left-8 right-5 sm:right-8 z-10 flex flex-row justify-between items-center text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono border-t border-white/10 pt-4">
          <span>© 2026 SAI KRISHNA BETHAMCHARLA. ALL RIGHTS RESERVED.</span>
          <button
            type="button"
            onClick={scrollToHero}
            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono p-0"
          >
            ↑ RETURN TO TOP
          </button>
        </div>
      </main>
    </div>
  );
}

export default MainframeContact;
