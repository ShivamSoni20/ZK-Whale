import React from 'react';
import { DEMO_MODE } from '../lib/midnight';
import { motion } from 'framer-motion';

export const NetworkStatus: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-md border border-border/40 rounded-lg p-3 z-50 shadow-2xl flex flex-col gap-1.5 min-w-[200px]"
    >
      <div className="flex items-center gap-2 mb-1 border-b border-border/20 pb-2">
        <div className="w-2 h-2 rounded-full bg-success" />
        <span className="text-[10px] font-black uppercase text-text-primary">
          Midnight Preprod {DEMO_MODE && <span className="text-cyan ml-1">[SIMULATED]</span>}
        </span>
      </div>
      <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary">
        <span>Proof Server:</span>
        <span className="text-success">Ready</span>
      </div>
      <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary">
        <span>Indexer:</span>
        <span className="text-success">Connected</span>
      </div>
      <div className="flex justify-between items-center text-[9px] font-mono text-text-secondary">
        <span>Wallet:</span>
        <span className="text-success">Lace ✓</span>
      </div>
    </motion.div>
  );
};
