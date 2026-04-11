import React from 'react';
import { Wallet, ChevronDown, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';

export const WalletStatus: React.FC = () => {
  const { address, balance, isConnected, isConnecting, connect } = useWallet();
  return (
    <div className="flex flex-col gap-6 p-5 glass-card rounded-2xl border-border/40 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan/10 text-cyan border border-cyan/20 glow-cyan">
            <Wallet size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-text-secondary uppercase font-black tracking-widest mb-0.5">Network Status</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isConnected ? "bg-success" : "bg-warning"} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isConnected ? "bg-success" : "bg-warning"}`}></span>
              </span>
              <span className="text-sm font-bold text-text-primary">
                {isConnected ? "Lace Wallet Connected" : "Connection Pending"}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown size={16} className="text-text-secondary hover:text-cyan transition-colors cursor-pointer" />
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-1 px-1">
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-text-secondary uppercase font-bold">Reputation Score</span>
              <span className="text-xs font-mono text-cyan">847 / 1000</span>
            </div>
            <div className="w-full bg-border/30 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "84.7%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyan to-purple rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background/40 p-3 rounded-xl border border-border/50">
              <span className="text-[9px] text-text-secondary uppercase font-bold block mb-1">Balance</span>
              <span className="text-sm font-bold text-text-primary">{balance} <span className="text-[10px] opacity-60">tDUST</span></span>
            </div>
            <div className="bg-background/40 p-3 rounded-xl border border-border/50">
              <span className="text-[9px] text-text-secondary uppercase font-bold block mb-1">PnL (ZK Proven)</span>
              <span className="text-sm font-bold text-success">+18.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-cyan/5 border border-cyan/10">
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-cyan" />
              <span className="text-[11px] font-medium text-cyan/90">Top 5% of Traders</span>
            </div>
            <span className="text-[10px] font-mono text-text-secondary">{address}</span>
          </div>
        </div>
      ) : (
        <button 
          onClick={connect}
          disabled={isConnecting}
          className="w-full py-3 rounded-xl bg-cyan text-background font-bold text-sm hover:glow-cyan transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect Midnight Wallet'}
        </button>
      )}
    </div>
  );
};
