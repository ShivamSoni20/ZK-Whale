import React from 'react';
import { MessageCircle, Terminal, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-background/30 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-tighter text-text-primary">Vibe Trading <span className="text-cyan">Pro</span></span>
          </div>
          <p className="text-[10px] text-text-secondary max-w-xs leading-relaxed uppercase tracking-widest font-bold opacity-60">
            ZK-Sovereign natural language trading. Your strategy, your privacy.
          </p>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] mb-2">Build</span>
            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold hover:text-cyan cursor-pointer transition-colors">Midnight Network</span>
            <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold hover:text-cyan cursor-pointer transition-colors">Compact Language</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] mb-2">Connect</span>
            <div className="flex gap-4">
              <MessageCircle size={14} className="text-text-secondary hover:text-cyan cursor-pointer transition-colors" />
              <Terminal size={14} className="text-text-secondary hover:text-cyan cursor-pointer transition-colors" />
              <Globe size={14} className="text-text-secondary hover:text-cyan cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
        <span className="text-[9px] text-text-secondary font-mono">© 2025 VIBE TRADING PRO. ETH GLOBAL WINNER TYPE BEAT.</span>
        <span className="text-[9px] text-text-secondary font-mono uppercase tracking-[0.3em] font-bold">Rational Privacy for DeFi</span>
      </div>
    </footer>
  );
};
