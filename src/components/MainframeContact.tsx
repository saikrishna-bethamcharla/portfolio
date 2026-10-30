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
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Typewriter effect for prompt
  const typewriterText = "Glad you stopped in. Good taste tends to find us. Now, what are we creating together?";
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
      if (video) {
        if (prevXRef.current === null) {
          prevXRef.current = e.clientX;
        } else {
          const delta = e.clientX - prevXRef.current;
          prevXRef.current = e.clientX;

          const SENSITIVITY = 0.8;
          const duration = video.duration || 1;
          const timeOffset = (delta / window.innerWidth) * SENSITIVITY * duration;

          targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeOffset));
          performSeek();
        }
      }

      // Subtle 3D perspective tilt coordinates
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      setParallax({ x: normX, y: normY });
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

  const pillActions = [
    {
      label: 'Pitch a project',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Sai%20Krishna',
    },
    {
      label: 'Creative direction',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Creative%20Direction%20Collaboration',
    },
    {
      label: 'Send a brief hello',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Hello%20Sai%20Krishna',
    },
    {
      label: 'Technical advisory',
      href: 'mailto:saikrishnabethamcharla@gmail.com?subject=Technical%20Advisory%20Inquiry',
    },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050507] text-white selection:bg-red-500/30 selection:text-white font-body">
      {/* ── PLANE 0: BACKGROUND STUDIO LIGHTING & TOP/BOTTOM BLEND ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        style={{
          transform: `translate3d(${parallax.x * 12}px, ${-parallax.y * 8}px, 0)`,
          transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
          // Smoothly mask the ambient red backdrop so it starts at 0% opacity at the very top edge
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 25%, black 78%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 25%, black 78%, transparent 100%)',
        }}
      >
        {/* Cinematic Crimson Red Ambient Backdrop matching Section 1 hero spotlight */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse 75% 65% at 75% 55%, #cf1922 0%, #aa1219 32%, #68080c 62%, #050507 96%)',
          }}
        />

        {/* Top Black Gradient: Seamlessly dissolves into Section 1 (#050507) */}
        <div
          className="absolute inset-x-0 top-0 h-[48vh]"
          style={{
            background:
              'linear-gradient(to bottom, #050507 0%, #050507 12%, rgba(5,5,7,0.95) 28%, rgba(5,5,7,0.5) 65%, transparent 100%)',
          }}
        />

        {/* Bottom Black Gradient: Seamlessly dissolves into Section 3 (3D Shelf) */}
        <div
          className="absolute inset-x-0 bottom-0 h-[28vh]"
          style={{
            background:
              'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.85) 30%, transparent 100%)',
          }}
        />
      </div>

      {/* ── PLANE 1: FOREGROUND 3D FELT CHARACTER (INDEPENDENT MULTI-PLANE 3D PARALLAX) ── */}
      {/* Positioned on the right, unmasked at top, head/hair completely sharp, vibrant & 3D */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[2]"
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-end"
          style={{
            transform: `perspective(1000px) rotateY(${parallax.x * 7}deg) rotateX(${-parallax.y * 4}deg) translate3d(${parallax.x * 28}px, ${-parallax.y * 16}px, 35px)`,
            transformOrigin: '75% 50%',
            transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover pointer-events-none"
            style={{
              objectPosition: '72% center',
              filter: 'brightness(1.03) contrast(1.08) saturate(1.06)',
              // Gentle dissolve at very bottom edge only (below chest), keeping hair & face 100% unmasked
              maskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
            }}
            muted
            playsInline
            preload="auto"
            onSeeked={handleSeeked}
          >
            <source src="./character_keyed.webm" type="video/webm" />
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ── PLANE 2: TEXT LEGIBILITY SHIELD (Confined to left side — character is 100% unobstructed) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full md:w-[54%] pointer-events-none z-[3]"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,7,0.96) 0%, rgba(5,5,7,0.85) 45%, rgba(5,5,7,0.25) 80%, transparent 100%)',
        }}
      />

      {/* ── PLANE 3: Upward drifting luminous dust particles ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-[4] pointer-events-none"
      />

      {/* ── PLANE 4: MAIN CONTENT & CONTACT CHANNELS (z-index: 10) ── */}
      <main className="h-screen flex flex-col justify-end pb-16 md:justify-center md:pb-0 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden relative z-[10]">
        <div className="max-w-xl relative z-10">
          {/* 1. Personalized intro label (Unblurred, crisp high-end typography) */}
          <div
            className="select-none mb-4 sm:mb-5"
            style={{
              fontSize: 'clamp(18px, 3.6vw, 25px)',
              lineHeight: 1.35,
              fontWeight: 400,
              color: '#ffffff',
            }}
          >
            <span className="text-zinc-300 font-light">Hey there, I’m </span>
            <span className="text-white font-medium">Sai Krishna Bethamcharla</span>,
            <br />
            <span className="text-red-400 font-mono text-[0.85em] tracking-wide">
              Creative Director, AI Filmmaker & Technical Lead
            </span>
          </div>

          {/* 2. Typewriter text */}
          <p
            className="text-white mb-5 sm:mb-6 min-h-[54px]"
            style={{
              fontSize: 'clamp(18px, 3.8vw, 25px)',
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

          {/* 3. Action pill buttons (Matching Image 3 exact design system) */}
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1"
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
                className="inline-flex items-center justify-center bg-white text-black font-medium text-[13.5px] sm:text-[14.5px] px-4 sm:px-5 py-[6px] rounded-full border border-black/10 hover:bg-black hover:text-white hover:border-white/30 transition-colors duration-200 cursor-pointer no-underline whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              >
                {action.label}
              </a>
            ))}

            {/* Direct Inbox Outline Pill with Copy Icon */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center justify-center gap-2 font-medium text-[13.5px] sm:text-[14.5px] px-4 sm:px-5 py-[6px] rounded-full border transition-colors duration-200 cursor-pointer whitespace-nowrap shadow-[0_2px_12px_rgba(0,0,0,0.25)] ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  : 'bg-black/60 text-white border-white/70 hover:bg-white hover:text-black hover:border-white'
              }`}
              title="Click to copy direct email"
            >
              <span>
                Direct inbox:{' '}
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
        <div className="absolute bottom-6 left-5 sm:left-8 right-5 sm:right-8 z-10 flex flex-row justify-between items-center text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono">
          <span>© 2026 SAI KRISHNA BETHAMCHARLA</span>
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
