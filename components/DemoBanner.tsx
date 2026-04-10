import React from 'react';
import { DEMO_MODE } from '../lib/midnight';

export const DemoBanner: React.FC = () => {
  if (!DEMO_MODE) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-[#0a0a0a] border-b border-border/40 z-50 flex items-center justify-center font-mono text-[10px] tracking-widest text-text-secondary">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-cyan">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
          DEMO MODE
        </span>
        <span className="opacity-50">│</span>
        <span>Midnight Preprod Simulation</span>
        <span className="opacity-50">│</span>
        <a href="https://github.com/ShivamSoni20/Vide-Trader/blob/main/README.md" target="_blank" rel="noreferrer" className="text-cyan/80 hover:text-cyan transition-colors underline decoration-cyan/30 underline-offset-2">
          [View Source →]
        </a>
      </div>
    </div>
  );
};
