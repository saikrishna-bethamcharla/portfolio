import React, { useState } from 'react';
import { SCHEMATICS_DATA, type SchematicNode } from '../data/schematicsData';
import { Play, ArrowUpRight, Radio, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { MediaModal } from './MediaModal';

interface InteractiveWorkbenchProps {
  systemId: string;
}

export const InteractiveWorkbench: React.FC<InteractiveWorkbenchProps> = ({ systemId }) => {
  const schematic = SCHEMATICS_DATA[systemId] || SCHEMATICS_DATA['web-systems'];
  const [selectedNode, setSelectedNode] = useState<SchematicNode>(schematic.nodes[0]);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // When systemId changes, reset selectedNode
  React.useEffect(() => {
    if (schematic.nodes.length > 0) {
      setSelectedNode(schematic.nodes[0]);
    }
  }, [systemId]);

  const handleNodeClick = (node: SchematicNode) => {
    soundFX.playClick();
    setSelectedNode(node);
  };

  return (
    <div className="sticky top-24 rounded-2xl bg-[#090b10] border border-neutral-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden relative">
      {/* Decorative Corner Reticles */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-500" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-500" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-500" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-500" />

      {/* Workbench Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-400 font-bold uppercase tracking-widest">
            INTERACTIVE ARCHITECTURE WORKBENCH
          </span>
        </div>
        <span className="text-neutral-500 font-mono">SYS.ID: {systemId.toUpperCase()}</span>
      </div>

      {/* System Headline */}
      <div className="py-4 space-y-1">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          {schematic.systemTitle}
        </h3>
        <p className="text-xs font-mono text-amber-400/90 font-medium">
          {schematic.headline}
        </p>
        <p className="text-xs text-neutral-400 leading-relaxed pt-2">
          {schematic.architectureSummary}
        </p>
      </div>

      {/* Interactive Circuit Flow Nodes */}
      <div className="pt-2 pb-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-2">
          SELECT PIPELINE NODE TO INSPECT ARCHITECTURE:
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {schematic.nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                    : 'bg-black/50 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-neutral-500'}>
                    {node.phase}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                </div>
                <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                  {node.name}
                </div>
                <div className="text-[10px] font-mono text-neutral-500 truncate mt-1">
                  {node.telemetry}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Telemetry & Detailing Panel */}
      <div className="p-5 rounded-xl bg-black/60 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-white uppercase">
              {selectedNode.name}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
            {selectedNode.telemetry}
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          {selectedNode.detail}
        </p>

        {/* Technical Specifications */}
        <div className="pt-2">
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
            Architectural Guarantees:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.specs.map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
              >
                <CheckCircle2 className="w-3 h-3 text-amber-500" />
                <span>{spec}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Interactive Actions */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {schematic.reelVideo && (
            <button
              onClick={() => {
                soundFX.playClick();
                setIsMediaModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-md shadow-amber-500/10 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current text-neutral-950" />
              <span>Watch Reel: {schematic.reelVideo.title}</span>
            </button>
          )}

          {schematic.livePlatform && (
            <a
              href={schematic.livePlatform.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition border border-neutral-700 hover:border-amber-500/50"
            >
              <span>Inspect Live: {schematic.livePlatform.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </a>
          )}
        </div>

        <span className="text-[10px] font-mono text-neutral-500">
          REAL-TIME TELEMETRY CONNECTED
        </span>
      </div>

      {/* Embedded High-Tech Media Modal */}
      <MediaModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        title={schematic.reelVideo?.title || schematic.systemTitle}
        category={schematic.systemTitle}
        videoUrl={schematic.reelVideo?.url}
        externalUrl={schematic.livePlatform?.url}
        telemetry={selectedNode.telemetry}
        specs={selectedNode.specs}
        description={schematic.architectureSummary}
      />
    </div>
  );
};
