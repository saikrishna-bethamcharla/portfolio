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
        {/* 3D Extruded & Textured Title Lockup */}
        <div
          style={{
            position: 'relative',
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(30px)`,
            transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transformStyle: 'preserve-3d',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1100px',
            userSelect: 'none',
          }}
        >
          <svg
            viewBox="0 0 1020 180"
            className="w-full h-auto overflow-visible select-none pointer-events-none"
            aria-label="Sai Krishna"
          >
            <defs>
              {/* Metallic Titanium Face Gradient with Specular Sheen & Crimson Bounce */}
              <linearGradient
                id="titanium3d"
                x1={`${50 - tilt.y * 0.8}%`}
                y1="0%"
                x2={`${50 + tilt.y * 0.8}%`}
                y2="100%"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="20%" stopColor="#F8FAFC" stopOpacity="1" />
                <stop offset="42%" stopColor="#E2E8F0" stopOpacity="1" />
                <stop offset="68%" stopColor="#94A3B8" stopOpacity="1" />
                <stop offset="88%" stopColor="#475569" stopOpacity="1" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="1" />
              </linearGradient>

              {/* Brushed Texture Pattern */}
              <pattern id="brushedGrain" width="4" height="4" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <line x1="0" y1="4" x2="4" y2="0" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
              </pattern>

              {/* Stepped 3D Extrusion, Specular Lighting & Ambient Red Spotlight Rim Filter */}
              <filter id="sculpt3d" x="-30%" y="-40%" width="160%" height="180%">
                {/* Red ambient rim bloom hugging letter shapes */}
                <feGaussianBlur in="SourceAlpha" stdDeviation="22" result="redBloom" />
                <feFlood floodColor="#EF4444" floodOpacity="0.45" result="redFlood" />
                <feComposite in="redFlood" in2="redBloom" operator="in" result="redGlow" />

                {/* Grounding deep contact shadow */}
                <feDropShadow in="SourceAlpha" dx="0" dy="16" stdDeviation="14" floodColor="#000000" floodOpacity="0.9" result="deepShadow" />

                {/* Crisp stepped physical extrusion from back to front */}
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.35} dy={7 - tilt.x * 0.3} stdDeviation="0.4" floodColor="#090D16" floodOpacity="1" result="ext7" />
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.30} dy={6 - tilt.x * 0.25} stdDeviation="0.35" floodColor="#1E293B" floodOpacity="1" result="ext6" />
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.25} dy={5 - tilt.x * 0.20} stdDeviation="0.3" floodColor="#334155" floodOpacity="1" result="ext5" />
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.20} dy={4 - tilt.x * 0.16} stdDeviation="0.25" floodColor="#475569" floodOpacity="1" result="ext4" />
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.15} dy={3 - tilt.x * 0.12} stdDeviation="0.2" floodColor="#64748B" floodOpacity="1" result="ext3" />
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.10} dy={2 - tilt.x * 0.08} stdDeviation="0.15" floodColor="#94A3B8" floodOpacity="1" result="ext2" />
                <feDropShadow in="SourceAlpha" dx={-tilt.y * 0.05} dy={1 - tilt.x * 0.04} stdDeviation="0.1" floodColor="#E2E8F0" floodOpacity="0.9" result="ext1" />

                {/* 3D Specular reflection catching the bevel */}
                <feSpecularLighting in="SourceAlpha" surfaceScale="4" specularConstant="0.8" specularExponent="24" lightingColor="#FFFFFF" result="specular">
                  <fePointLight x={510 + tilt.y * 20} y={-80 - tilt.x * 15} z="220" />
                </feSpecularLighting>
                <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularBevel" />

                {/* Composite all 3D layers cleanly without distortion */}
                <feMerge>
                  <feMergeNode in="redGlow" />
                  <feMergeNode in="deepShadow" />
                  <feMergeNode in="ext7" />
                  <feMergeNode in="ext6" />
                  <feMergeNode in="ext5" />
                  <feMergeNode in="ext4" />
                  <feMergeNode in="ext3" />
                  <feMergeNode in="ext2" />
                  <feMergeNode in="ext1" />
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="specularBevel" />
                </feMerge>
              </filter>
            </defs>

            {/* Extruded & Beveled Base */}
            <text
              x="50%"
              y="120"
              textAnchor="middle"
              fontFamily="var(--font-heading), 'Helvetica Neue', 'SF Pro Display', Arial, sans-serif"
              fontWeight="800"
              fontSize="112"
              letterSpacing="4"
              fill="url(#titanium3d)"
              filter="url(#sculpt3d)"
            >
              SAI&nbsp;KRISHNA
            </text>

            {/* Tactile Brushed Grain Overlay */}
            <text
              x="50%"
              y="120"
              textAnchor="middle"
              fontFamily="var(--font-heading), 'Helvetica Neue', 'SF Pro Display', Arial, sans-serif"
              fontWeight="800"
              fontSize="112"
              letterSpacing="4"
              fill="url(#brushedGrain)"
              opacity="0.4"
              style={{ mixBlendMode: 'overlay' }}
            >
              SAI&nbsp;KRISHNA
            </text>
          </svg>
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
