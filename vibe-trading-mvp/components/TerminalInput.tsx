import React, { useState, useEffect, useRef } from 'react';
import { Send, Hash, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalInputProps {
  onSend: (vibe: string) => void;
  isLoading?: boolean;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({ onSend, isLoading }) => {
  const [vibe, setVibe] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (vibe.trim() && !isLoading) {
      onSend(vibe);
      setVibe('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  const suggestions = ["Bull run SOL", "Safe BTC DCA", "ETH accumulate"];

  return (
    <div className="flex flex-col gap-4 p-6 glass-card rounded-2xl border-border/40 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
      
      <div className="relative group">
        <textarea
          ref={textareaRef}
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your trading vibe... e.g. 'Go long SOL under 140, take profit at 165, stop at 130'"
          className="w-full bg-background/30 border border-border/60 rounded-xl p-5 pr-14 min-h-[120px] focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/20 text-text-primary placeholder:text-text-secondary/50 resize-none transition-all duration-300 terminal-text text-base"
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <AnimatePresence>
            {vibe.length > 0 && (
              <motion.span 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-[10px] font-mono text-text-secondary/60 bg-background/50 px-2 py-1 rounded border border-border/40"
              >
                {vibe.length} chars
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={handleSubmit}
            disabled={!vibe.trim() || isLoading}
            className="p-3 rounded-xl bg-cyan text-background hover:glow-cyan transition-all duration-300 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-cyan/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-cyan/60" />
          <div className="flex gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setVibe(s)}
                className="px-3 py-1 rounded-lg border border-border/60 text-[11px] text-text-secondary hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5 transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest bg-border/20 px-2 py-1 rounded">
          <Command size={10} />
          <span>Enter to Commit</span>
        </div>
      </div>
    </div>
  );
};
