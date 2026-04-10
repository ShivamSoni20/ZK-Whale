import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProofBadge: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,160,0.1)]"
    >
      <ShieldCheck size={12} className="text-success" />
      <span>ZK Verified</span>
      <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
    </motion.div>
  );
};
