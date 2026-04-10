import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader, Shield, Lock, Cpu, Globe, ExternalLink } from 'lucide-react';

interface ProofStep {
  id: number;
  label: string;
  status: 'pending' | 'loading' | 'completed';
  icon: React.ReactNode;
}

interface ProofVisualizerProps {
  steps: ProofStep[];
  latestProof?: string;
  fidelityScore?: number;
}

export const ProofVisualizer: React.FC<ProofVisualizerProps> = ({ steps, latestProof, fidelityScore }) => {
  return (
    <div className="flex flex-col gap-8 p-6 glass-card rounded-2xl border-border/40 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-2 opacity-5">
        <Cpu size={120} />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <h3 className="text-sm font-black flex items-center gap-2 text-text-primary uppercase tracking-[0.2em]">
            <Shield size={18} className="text-cyan glow-cyan" />
            ZK Proof Engine
          </h3>
          <span className="text-[10px] text-text-secondary font-medium mt-1">Midnight Network Verifier v2.1</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,212,255,1)]" />
          <span className="text-[9px] text-cyan font-black uppercase tracking-widest">Live Agent</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {steps.map((step, idx) => (
          <div key={step.id} className="relative flex items-center gap-5">
            {idx !== steps.length - 1 && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "1.5rem" }}
                className={`absolute left-[15px] top-[32px] w-[2px] z-0 ${step.status === 'completed' ? 'bg-gradient-to-b from-success to-border' : 'bg-border/30'}`} 
              />
            )}
            
            <motion.div 
              initial={false}
              animate={{ 
                scale: step.status === 'loading' ? [1, 1.1, 1] : 1,
                borderColor: step.status === 'completed' ? '#00E5A0' : step.status === 'loading' ? '#00D4FF' : '#1E3A5F'
              }}
              transition={{ repeat: step.status === 'loading' ? Infinity : 0, duration: 2 }}
              className={`z-10 w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-colors duration-500 bg-background/80 backdrop-blur-sm ${
                step.status === 'completed' ? 'text-success shadow-[0_0_15px_rgba(0,229,160,0.2)]' : 
                step.status === 'loading' ? 'text-cyan shadow-[0_0_15px_rgba(0,212,255,0.2)]' : 
                'text-text-secondary border-dashed'
              }`}
            >
              {step.status === 'completed' ? <Check size={16} strokeWidth={3} /> : 
               step.status === 'loading' ? <Loader size={16} className="animate-spin" /> : 
               <span className="text-[10px] font-black">{step.id}</span>}
            </motion.div>

            <div className="flex flex-col">
              <span className={`text-xs font-bold tracking-tight transition-colors duration-500 ${step.status === 'completed' ? 'text-text-primary' : 'text-text-secondary'}`}>
                {step.label}
              </span>
              <AnimatePresence>
                {step.status === 'loading' && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[9px] text-cyan font-mono mt-0.5"
                  >
                    Executing dark circuit p_302...
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            
            <div className={`ml-auto transition-opacity duration-500 ${step.status === 'completed' ? 'opacity-40' : 'opacity-10'}`}>
              {step.icon}
            </div>
          </div>
        ))}
      </div>

      {latestProof && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 p-5 rounded-2xl bg-cyan/[0.03] border border-cyan/10 flex flex-col gap-4 relative group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan/[0.05] to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[9px] text-text-secondary font-black uppercase tracking-[0.2em]">Deployment Artifact</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-success/10 border border-success/20">
              <span className="w-1 h-1 rounded-full bg-success" />
              <span className="text-[9px] text-success font-black uppercase">{fidelityScore}% Fidelity</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex justify-between items-center text-[10px] text-text-secondary/60 font-mono mb-1">
              <span>Proof Hash</span>
              <span className="text-[8px] uppercase">SHA-256 Verified</span>
            </div>
            <div className="text-[11px] font-mono text-cyan/80 bg-background/50 p-3 rounded-lg border border-border/40 select-all group-hover:border-cyan/30 transition-colors">
              {latestProof}
            </div>
          </div>

          <button className="relative z-10 w-full py-3 bg-cyan/10 hover:bg-cyan/20 border border-cyan/20 rounded-xl text-[10px] uppercase font-black tracking-[0.15em] text-cyan transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span>Verify on Ledger</span>
            <ExternalLink size={12} />
          </button>
        </motion.div>
      )}
    </div>
  );
};
