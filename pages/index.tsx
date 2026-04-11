import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { VibeLeaderboard } from '../components/VibeLeaderboard';
import { ProofBadge } from '../components/ProofBadge';
import { Shield, Zap, Lock, MessageSquare, Cpu, CircleCheck, CircleX, ArrowRight, Globe, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '../contexts/WalletContext';

export default function Home() {
  const { isConnected, connect, address } = useWallet();
  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan/30">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 hero-grid opacity-40 animate-grid-move" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 w-fit">
                <Shield size={14} className="text-cyan animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan">The Future of DeFi Privacy</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
                Trade with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-purple to-success">ZKWHALE.</span><br />
                Stay <span className="italic">Anonymous.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed font-bold opacity-80 uppercase tracking-tight">
                The world's first ZK-powered natural language trading terminal. Your strategy stays private. Your performance speaks for itself.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/dashboard">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-2xl bg-cyan text-background font-black text-sm uppercase tracking-widest shadow-2xl shadow-cyan/40 hover:glow-cyan transition-all flex items-center gap-3"
                  >
                    Launch Terminal
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={connect}
                  className={`px-8 py-4 rounded-2xl border font-black text-sm uppercase tracking-widest backdrop-blur-md transition-all flex items-center gap-3 ${
                    isConnected 
                    ? 'bg-success/10 border-success/30 text-success glow-success' 
                    : 'bg-cyan/10 border-cyan/30 text-cyan hover:glow-cyan'
                  }`}
                >
                  <Wallet size={18} />
                  {isConnected ? address?.slice(0, 10) + '...' : 'Connect Wallet'}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-card-elevated/40 border border-border/60 text-text-primary font-black text-sm uppercase tracking-widest backdrop-blur-md hover:bg-card-elevated/60 transition-all"
                >
                  View Leaderboard
                </motion.button>
              </div>

              <div className="flex items-center gap-8 mt-4 pt-8 border-t border-white/5">
                {[
                  { label: "Zero-Knowledge", icon: Lock },
                  { label: "Midnight Net", icon: Globe },
                  { label: "AI-Powered", icon: Cpu }
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                    <badge.icon size={16} className="text-cyan" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{badge.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-cyan/10 blur-[120px] rounded-full animate-float" />
              <div className="relative glass-card rounded-3xl border-border/40 shadow-2xl overflow-hidden animate-float">
                <div className="h-8 bg-card-elevated/80 border-b border-border/40 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <div className="mx-auto text-[9px] font-black text-text-secondary/40 uppercase tracking-widest">zkwhale-terminal-v1.0</div>
                </div>
                <div className="p-8 aspect-video bg-[#05080F] flex flex-col justify-center gap-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded bg-cyan/20 flex items-center justify-center">
                      <Cpu size={12} className="text-cyan" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 w-48 bg-border/40 rounded animate-pulse" />
                      <div className="h-3 w-32 bg-border/20 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="ml-9 p-4 rounded-xl bg-cyan/[0.03] border border-cyan/10 font-mono text-[11px] leading-relaxed text-cyan/70">
                    {">"} Parsing Vibe: "Bullish SOL DCA"<br/>
                    {">"} Generating ZK commitment...<br/>
                    {">"} Circuit Proof Verified ✅
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-6 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
            <div className="flex flex-col items-center text-center gap-4">
               <span className="text-[10px] font-black text-cyan uppercase tracking-[0.4em]">Simple Yet Private</span>
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Your Strategy, Our Proof.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Speak Your Strategy", 
                  desc: 'Type in plain English: "Buy SOL when it dips under $140, sell at $160"',
                  icon: MessageSquare,
                  color: "cyan"
                },
                { 
                  step: "02", 
                  title: "AI Parses Your Intent", 
                  desc: "Llama 3.1 converts it to a structured private intent stored securely on Midnight.",
                  icon: Cpu,
                  color: "purple"
                },
                { 
                  step: "03", 
                  title: "ZK Proof of Fairness", 
                  desc: "Trade executes privately. A ZK proof proves you followed your own strategy — no doxxing, no front-running.",
                  icon: Shield,
                  color: "success"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={item.step}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-3xl glass-card border-border/40 relative group"
                >
                  <div className="absolute top-6 right-8 text-4xl font-black text-white/5 font-display italic tracking-tighter">{item.step}</div>
                  <div className={`p-4 rounded-2xl bg-${item.color}/10 border border-${item.color}/20 text-${item.color} w-fit mb-8 group-hover:glow-${item.color} transition-all`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="py-32 px-6 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-5xl mx-auto flex flex-col gap-16 items-center">
            <div className="text-center flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Rational Privacy for DeFi</h2>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-1 px-4">
              <div className="p-10 rounded-l-3xl bg-background/40 border border-border/60 border-r-0 backdrop-blur-sm self-stretch">
                <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <CircleX size={16} />
                  Without Midnight
                </h4>
                <div className="space-y-6">
                  {['Wallet fully exposed', 'Strategy visible to all', 'Extreme front-run risk', 'Performance non-verifiable'].map(text => (
                    <div key={text} className="flex items-center gap-3 text-text-secondary line-through opacity-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                      <span className="text-sm font-bold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-10 rounded-r-3xl bg-cyan/[0.03] border-2 border-cyan/40 backdrop-blur-xl relative self-stretch">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent pointer-events-none" />
                 <h4 className="text-xs font-black text-success uppercase tracking-widest mb-8 flex items-center gap-2 relative z-10">
                  <CircleCheck size={16} />
                  With ZKWHALE
                </h4>
                <div className="space-y-6 relative z-10">
                  {['Zero-Knowledge hidden assets', 'Encrypted private intent', 'MEV protected execution', 'ZK-Proven performance'].map(text => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(0,229,160,1)]" />
                      <span className="text-sm font-black text-text-primary uppercase tracking-tight">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-cyan uppercase tracking-[0.4em]">The Elite Circle</span>
                <h2 className="text-4xl font-black tracking-tighter">Verified Performers. <br /><span className="text-text-secondary opacity-40">Identities Shielded.</span></h2>
              </div>
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-xs font-black text-cyan uppercase tracking-[0.2em] group border-b-2 border-cyan/20 pb-1"
                >
                  Join the Ranks
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>

            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 to-purple/20 blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
               <VibeLeaderboard />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
