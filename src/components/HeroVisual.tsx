import React, { useEffect, useRef } from 'react';

/**
 * HeroVisual — Ultra-minimal Apple-style dark hero.
 * Pure black background, red ambient glow, centered name, and sleek scroll link.
 */
export const HeroVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle animated particle field — tiny white specks drifting upward
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

      {/* Red ambient glow — radial ellipse centered behind the name */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 50% 52%, rgba(200,20,20,0.38) 0%, rgba(160,10,10,0.18) 30%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Secondary softer outer bloom for depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 90% 60% at 50% 50%, rgba(180,0,0,0.12) 0%, transparent 65%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* The name */}
      <h1
        style={{
          position: 'relative',
          zIndex: 2,
          margin: 0,
          fontFamily:
            '"SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(3.5rem, 11vw, 9rem)',
          letterSpacing: '-0.02em',
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1,
          textShadow:
            '0 0 80px rgba(255,60,60,0.25), 0 2px 40px rgba(255,0,0,0.15)',
          userSelect: 'none',
        }}
      >
        SAI KRISHNA
      </h1>

      {/* Seamless bottom fade into shelf */}
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
