import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

export const Navbar: React.FC = () => {
  const { isConnected, isConnecting, connect, address } = useWallet();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-cyan/10 text-cyan border border-cyan/20 group-hover:glow-cyan transition-all">
            <Zap size={20} fill="currentColor" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter text-text-primary">ZK<span className="text-cyan">WHALE</span></span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary/60 font-bold">Midnight Network</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Terminal', 'Leaderboard', 'My Proofs', 'Docs'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Terminal' ? '/dashboard' : '#'} 
              className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-cyan transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connect}
            disabled={isConnecting}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest border transition-all ${
              isConnected 
              ? 'border-success/30 bg-success/10 text-success' 
              : 'border-cyan/30 bg-cyan/10 text-cyan'
            }`}
          >
            <Wallet size={14} />
            {isConnecting ? 'Connecting...' : isConnected ? address?.slice(0, 8) + '...' : 'Connect Wallet'}
          </motion.button>

          <Link href="/dashboard">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-xl bg-cyan text-background font-bold text-xs uppercase tracking-widest shadow-lg shadow-cyan/20 hover:glow-cyan transition-all"
            >
              Launch Terminal
            </motion.button>
          </Link>
        </div>
      </div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
    </nav>
  );
};
