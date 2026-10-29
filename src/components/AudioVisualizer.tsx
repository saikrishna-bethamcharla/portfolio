import React, { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  active: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ active }) => {
  const [bars, setBars] = useState<number[]>([40, 70, 30, 85, 50, 90, 65, 35]);

  useEffect(() => {
    if (!active) {
      setBars([15, 15, 15, 15, 15, 15, 15, 15]);
      return;
    }

    const interval = setInterval(() => {
      setBars(Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 15));
    }, 120);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div aria-hidden="true" className="flex items-end gap-1 h-5 px-2 py-0.5 rounded bg-black/40 border border-neutral-800">
      {bars.map((height, i) => (
        <span
          key={i}
          className={`w-1 rounded-sm transition-all duration-150 ${
            active ? 'bg-amber-400' : 'bg-neutral-700'
          }`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};
