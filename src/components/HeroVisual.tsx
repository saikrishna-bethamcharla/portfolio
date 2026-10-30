import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroVisual — Ultra-high-end Apple/Aperture dark hero with sculpted 3D textured typography.
 * Features:
 * - Stepped 3D extruded metallic typography with specular chamfers & red ambient bounce
 * - Interactive 3D perspective tracking responding to mouse coordinates
 * - Upward drifting luminous micro-dust field
 * - Dual-layer cinematic red spotlight & dynamic light reflections
 */
export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mouseX: 50, mouseY: 50 });

  // Mouse tracking for dynamic 3D perspective tilt & light sheen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      setTilt({
        x: -normY * 11, // Vertical tilt (rotateX)
        y: normX * 15,  // Horizontal tilt (rotateY)
        mouseX: (e.clientX / window.innerWidth) * 100,
        mouseY: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Hero section title animation (GSAP SplitText + CustomBounce)
  useEffect(() => {
    let tl: any;
    let split: any;

    const runTitleAnimation = async () => {
      const win = window as any;
      const gsap = win.gsap;
      const SplitText = win.SplitText;
      const CustomEase = win.CustomEase;
      const CustomBounce = win.CustomBounce;

      if (!gsap) return;

      if (SplitText && CustomEase && CustomBounce) {
        gsap.registerPlugin(SplitText, CustomEase, CustomBounce);
      }

      await document.fonts.ready;

      const heroNameEl = document.querySelector('.hero-name');
      if (!heroNameEl) return;

      if (CustomBounce) {
        try {
          CustomBounce.create('land', { strength: 0.45 });
        } catch {
          // Already created
        }
      }

      let chars: any;
      if (SplitText) {
        split = SplitText.create('.hero-name', {
          type: 'chars',
          charsClass: 'char',
        });
        chars = split.chars;
      } else {
        chars = document.querySelectorAll('.hero-name .char');
      }

      tl = gsap.timeline({ delay: 0.4 });

      // drop in with bounce + blur + random tilt
      tl.from(chars, {
        y: -window.innerHeight * 0.7,
        autoAlpha: 0,
        filter: 'blur(14px)',
        duration: 1.3,
        ease: 'land',
        stagger: 0.09,
      })
        .from(
          chars,
          {
            rotation: () => gsap.utils.random(-45, 45),
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.09,
          },
          0
        )
        // light sweep across the metal
        .to(
          chars,
          {
            backgroundPosition: '100% 0',
            duration: 1.6,
            ease: 'power2.inOut',
            stagger: 0.06,
          },
          '-=0.2'
        )
        // slow red glow pulse
        .to('.hero-name', {
          filter:
            'drop-shadow(0 0 34px rgba(255,30,30,.8)) drop-shadow(0 6px 10px rgba(0,0,0,.8))',
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
    };

    runTitleAnimation();

    return () => {
      tl?.kill();
      split?.revert();
    };
  }, []);

  // Animated particle field — tiny luminous specks drifting upward
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    interface Particle {
      x: number;
      y: number;
      r: number;
      vy: number;
      opacity: number;
      drift: number;
    }

    const count = 80;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      vy: -(Math.random() * 0.3 + 0.08),
      opacity: Math.random() * 0.35 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
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
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#050507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Red ambient spotlight — centered behind the 3D name with subtle cursor response */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 50% at ${50 + tilt.y * 0.2}% ${52 - tilt.x * 0.2}%, rgba(220,20,20,0.42) 0%, rgba(160,10,10,0.20) 30%, transparent 70%)`,
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'background 0.2s ease',
        }}
      />

      {/* Secondary softer outer bloom for atmospheric depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(180,0,0,0.14) 0%, transparent 68%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Dynamic 3D Sculpted Typography */}
      <div
        style={{
          position: 'relative',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          cursor: 'default',
          padding: '0 1rem',
        }}
      >
        {/* 3D Title Lockup */}
        <div
          style={{
            position: 'relative',
            transform: `perspective(1000px) rotateX(${tilt.x * 0.5}deg) rotateY(${tilt.y * 0.5}deg) translateZ(25px)`,
            transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transformStyle: 'preserve-3d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1200px',
            userSelect: 'none',
          }}
        >
          <h1 className="hero-name">SAI KRISHNA</h1>
        </div>
      </div>

      {/* Looping Desk Developer Animation — Bottom-Left Corner */}
      <div
        aria-label="Looping developer animation"
        className="absolute bottom-5 left-5 sm:bottom-7 sm:left-8 md:bottom-8 md:left-10 z-25 pointer-events-none select-none"
      >
        <div className="relative w-[160px] sm:w-[220px] md:w-[280px] lg:w-[330px] xl:w-[360px] aspect-[736/668]">
          {/* Ground contact shadow directly under chair wheels & desk legs */}
          <div
            aria-hidden="true"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[92%] h-3 bg-black/95 rounded-full blur-[3px] pointer-events-none"
          />
          {/* Soft ambient red floor bounce harmonizing with hero spotlight */}
          <div
            aria-hidden="true"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-red-600/15 rounded-full blur-xl pointer-events-none"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-contain relative z-10 select-none pointer-events-none"
            style={{
              filter: 'brightness(0.96) contrast(1.04) saturate(1.05)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)',
            }}
          >
            <source src="./assets/videos/sleeping-dev.webm" type="video/webm" />
            <source src="./assets/videos/sleeping-dev.mp4" type="video/mp4" />
            <source src="/assets/videos/sleeping-dev.webm" type="video/webm" />
            <source src="/assets/videos/sleeping-dev.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Seamless bottom fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(5,5,7,0.7) 60%, #050507 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    </section>
  );
};
