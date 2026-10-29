import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('.cursor-pointer') ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth trailing spring/lerp loop
  useEffect(() => {
    let animId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2,
        };
      });
      animId = requestAnimationFrame(updateTrailing);
    };
    animId = requestAnimationFrame(updateTrailing);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* 1. Sharp precise center dot */}
      <div
        className="fixed w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-amber-400 rounded-full transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />

      {/* 2. Trailing reactive reticle ring */}
      <div
        className={`fixed rounded-full border transition-all duration-200 flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border-amber-400/90 bg-amber-400/10 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-110'
            : 'w-6 h-6 -ml-3 -mt-3 border-amber-500/40 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {isHovered && (
          <div className="absolute w-2 h-2 border-t border-l border-amber-300 -top-0.5 -left-0.5" />
        )}
      </div>

      {/* 3. High-tech coordinates HUD */}
      {isHovered && (
        <div
          className="fixed text-[9px] font-mono text-amber-400/80 tracking-widest pl-6 pt-3 select-none"
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          }}
        >
          LOC [{Math.round(pos.x)}, {Math.round(pos.y)}]
        </div>
      )}
    </div>
  );
};
