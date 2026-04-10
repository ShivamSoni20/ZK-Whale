import React from 'react';
import { TraderAvatar } from './TraderAvatar';
import { ProofBadge } from './ProofBadge';
import { Users, TrendingUp, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  id: string;
  vibeId: string;
  performance: string;
  followers: number;
  strategy: string;
  isLive?: boolean;
}

const leaderboardData: LeaderboardEntry[] = [
  { id: '1', vibeId: 'vibe_0x7f3a...4e2d', performance: '+42.8%', followers: 342, strategy: 'HIDDEN', isLive: true },
  { id: '2', vibeId: 'vibe_0x9a1b...2c5f', performance: '+28.4%', followers: 184, strategy: 'HIDDEN' },
  { id: '3', vibeId: 'vibe_0x4d8e...9f1a', performance: '+18.1%', followers: 92, strategy: 'HIDDEN', isLive: true },
  { id: '4', vibeId: 'vibe_0xbc2a...6d4e', performance: '+12.5%', followers: 45, strategy: 'HIDDEN' },
];

export const VibeLeaderboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col">
          <h3 className="text-sm font-black flex items-center gap-2 text-text-primary uppercase tracking-[0.2em]">
            <TrendingUp size={18} className="text-success" />
            Vibe Leaderboard
          </h3>
          <span className="text-[10px] text-text-secondary mt-1">Cross-chain Verified Performance</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[9px] text-text-secondary font-black uppercase tracking-widest bg-success/5 px-2 py-1 rounded border border-success/10">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(0,229,160,1)]" />
            Live Terminal
          </span>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border-border/40 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/60 backdrop-blur-md border-b border-border/60">
                <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Rank/Trader</th>
                <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Vibe ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">PNL (ZK)</th>
                <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest">Followers</th>
                <th className="px-6 py-4 text-[10px] font-black text-text-secondary uppercase tracking-widest text-right">Strategy Path</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {leaderboardData.map((entry, idx) => (
                <motion.tr 
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-border/30 hover:bg-cyan/[0.02] transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-text-secondary/50 font-black w-4">0{idx + 1}</span>
                      <div className="relative">
                        <TraderAvatar seed={entry.vibeId} size={32} />
                        {entry.isLive && (
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-background rounded-full flex items-center justify-center border border-border">
                            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-text-primary group-hover:text-cyan transition-colors">Anonymous</span>
                        <span className="text-[9px] text-text-secondary/60 font-mono">#{entry.id * 1024}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-cyan/60 text-[11px] group-hover:text-cyan transition-colors">{entry.vibeId}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-success tracking-tight">{entry.performance}</span>
                        <Activity size={12} className="text-success/40" />
                      </div>
                      <ProofBadge />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-text-secondary font-medium">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-5 h-5 rounded-full border border-background bg-card-elevated" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-text-primary/80">+{entry.followers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex items-center gap-2 bg-background/60 px-3 py-1.5 rounded-lg border border-border/40 group-hover:border-cyan/30 transition-all">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-2 h-2 rounded-sm bg-text-secondary/20 overflow-hidden relative">
                             <div className="absolute inset-0 bg-text-secondary/10 backdrop-blur-[1px]" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[9px] font-black text-text-secondary/40 uppercase tracking-tighter">
                        {entry.strategy}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 bg-card-elevated/40 rounded-xl border border-border/40 border-dashed">
        <div className="flex items-center gap-3 text-[10px] text-text-secondary font-mono italic">
          <Info size={14} className="text-cyan/60" />
          <span>Real-time proofs validated by Midnight Network nodes. Trader identities are fully decoupled from performance data.</span>
        </div>
        <button className="text-[10px] font-black text-cyan uppercase tracking-widest hover:underline">View Global Leaderboard</button>
      </div>
    </div>
  );
};
