import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 40 sparse ambient dust motes drifting imperceptibly (Auteur Recipe #5)
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle warm tungsten particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* 1. Deep Obsidian Base with Soft Radial Warmth (Auteur Recipe #0) */}
      <div
        className="absolute inset-0 bg-[#040507]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 12%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 85% 75%, rgba(2, 132, 199, 0.04) 0%, transparent 55%),
            radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.6) 0%, transparent 80%)
          `,
        }}
      />

      {/* 2. Blueprint Architectural Grid Rules (Auteur Recipe #2) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f59e0b 1px, transparent 1px),
            linear-gradient(to bottom, #f59e0b 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3. Subtle Drifting Ambient Light Sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
    </div>
  );
};