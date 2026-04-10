import React from 'react';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface DisclosureTier {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const tiers: DisclosureTier[] = [
  { id: 'none', label: 'Direction Only', description: 'Hide all logic, show only Buy/Sell signal.', icon: <EyeOff size={14} /> },
  { id: 'partial', label: 'Full Parameters', description: 'Reveal assets & amounts, hide logic.', icon: <Eye size={14} /> },
  { id: 'custom', label: 'Custom', description: 'Define selective disclosure tiers.', icon: <ShieldAlert size={14} /> },
];

export const DisclosureTierSelector: React.FC = () => {
  const [selected, setSelected] = React.useState('none');

  return (
    <div className="flex flex-col gap-4 p-5 glass-card rounded-2xl border-border/40 shadow-xl">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Disclosure Tier</h4>
        <div className="px-2 py-0.5 rounded bg-cyan/10 text-cyan text-[9px] font-bold border border-cyan/20">PRIVATE</div>
      </div>
      
      <div className="flex flex-col gap-2.5">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelected(tier.id)}
            className={`group relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 text-left overflow-hidden ${
              selected === tier.id 
                ? 'bg-cyan/5 border-cyan/50 shadow-[0_0_15px_rgba(0,212,255,0.1)]' 
                : 'bg-background/20 border-border/40 text-text-secondary hover:border-cyan/30 hover:bg-background/40'
            }`}
          >
            {selected === tier.id && (
              <motion.div 
                layoutId="active-bg"
                className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent pointer-events-none"
              />
            )}
            
            <div className={`relative z-10 p-2 rounded-lg transition-colors duration-300 ${
              selected === tier.id ? 'bg-cyan text-background shadow-lg shadow-cyan/20' : 'bg-border/20 text-text-secondary group-hover:bg-border/40'
            }`}>
              {tier.icon}
            </div>
            
            <div className="relative z-10 flex flex-col pt-0.5">
              <span className={`text-xs font-bold tracking-tight mb-0.5 transition-colors ${selected === tier.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                {tier.label}
              </span>
              <span className="text-[10px] opacity-60 leading-snug font-medium">
                {tier.description}
              </span>
            </div>

            {selected === tier.id && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,1)]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
