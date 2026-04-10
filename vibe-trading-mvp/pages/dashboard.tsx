import React, { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';
import { WalletStatus } from '../components/WalletStatus';
import { TerminalInput } from '../components/TerminalInput';
import { ProofVisualizer } from '../components/ProofVisualizer';
import { DisclosureTierSelector } from '../components/DisclosureTierSelector';
import { TraderAvatar } from '../components/TraderAvatar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  History, 
  TrendingUp, 
  Copy, 
  Share2, 
  ChevronRight, 
  MessageSquare,
  ShieldCheck,
  CircleAlert,
  Lock,
  Cpu
} from 'lucide-react';

import { parseVibe } from '../agent/vibe-agent';
import { submitVibePro, executeTradePro, discloseDetails, initializeMidnight } from '../lib/midnight';
import { DEMO_MODE, DEMO_CONFIG } from '../lib/demo-mode';

export interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  json?: any;
}

export interface ProofStep {
  id: number;
  label: string;
  status: 'pending' | 'loading' | 'completed';
  icon: React.ReactNode;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'ai', 
      content: 'Terminal initialized. Connected to Midnight testnet. Ready for your commands.',
      timestamp: '09:41'
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock steps for ZK visualizer
  const [proofSteps, setProofSteps] = useState<ProofStep[]>([
    { id: 1, label: 'Parsing Intent...', status: 'pending', icon: <MessageSquare size={14}/> },
    { id: 2, label: 'Generating Commitment...', status: 'pending', icon: <Lock size={14}/> },
    { id: 3, label: 'Running ZK Circuit...', status: 'pending', icon: <Cpu size={14}/> },
    { id: 4, label: 'Proof Ready!', status: 'pending', icon: <ShieldCheck size={14}/> },
  ]);

  const [activeProofHash, setActiveProofHash] = useState<string>('');

  const updateProofStep = (stepId: number, status: ProofStep['status']) => {
    setProofSteps(prev => prev.map(s => s.id === stepId ? { ...s, status } : s));
  };

  const handleSendVibe = async (vibe: string) => {
    const newUserMsg: Message = { id: Date.now(), type: 'user', content: vibe, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    
    // Reset steps
    setProofSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));
    setActiveProofHash('');

    try {
      // Step 1: AI Parsing
      updateProofStep(1, 'loading');
      const intentArray: any = await parseVibe(vibe);
      updateProofStep(1, 'completed');
      
      const aiResponse: Message = { 
        id: Date.now() + 1, 
        type: 'ai', 
        content: '🤖 Analyzing your strategy...\n✓ Asset detected: ' + intentArray.asset + '\n✓ Direction: ' + intentArray.direction + '\n✓ Risk level: ' + intentArray.riskLevel + '\n✓ Confidence score: ' + intentArray.confidence + '%',
        json: intentArray,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);

      // Step 2: ZK Commitment
      updateProofStep(2, 'loading');
      const contractMock = {};
      const submitRes = await submitVibePro(contractMock, "vibe_demo", new Uint8Array(), new Uint8Array(), new Uint8Array());
      updateProofStep(2, 'completed');

      // Step 3: Trade Execution
      updateProofStep(3, 'loading');
      const execRes = await executeTradePro(contractMock, "vibe_demo", new Uint8Array(), intentArray.confidence || 90, new Uint8Array());
      updateProofStep(3, 'completed');

      // Step 4: Proof Generation
      updateProofStep(4, 'loading');
      const proofRes = await discloseDetails(contractMock, "vibe_demo", new Uint8Array(), "system", "SOL", "LONG");
      updateProofStep(4, 'completed');
      setActiveProofHash((proofRes as any)?.proofHash || "0x8f3a...9c2d");

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { id: Date.now(), type: 'ai', content: 'An error occurred while processing the strategy.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 px-6 pb-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <WalletStatus 
              isConnected={true} 
              address="0x8f2c...3d9e" 
              balance="1,240.42" 
            />
            
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-4">
              <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
                <History size={14} className="text-cyan/60" />
                Active Strategy IDs
              </h4>
              <div className="flex flex-col gap-2">
                {['vibe_0x7f3a...', 'vibe_0x9a1b...', 'vibe_0x4d8e...'].map((id) => (
                  <div key={id} className="flex items-center justify-between p-3 rounded-xl bg-background/40 border border-border/40 hover:border-cyan/30 transition-all cursor-pointer group">
                    <span className="text-[11px] font-mono text-cyan/70 group-hover:text-cyan">{id}</span>
                    <ChevronRight size={12} className="text-text-secondary opacity-40 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 flex-grow">
               <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Live Performance</h4>
                <div className="px-2 py-0.5 rounded bg-success/10 text-success text-[8px] font-black border border-success/20">ZK PROVEN</div>
               </div>
               <div className="flex items-end justify-between">
                  <span className="text-3xl font-black text-success tracking-tighter">+18.4%</span>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-text-secondary uppercase font-bold">Sharpe Ratio</span>
                    <span className="text-xs font-mono font-bold">2.41</span>
                  </div>
               </div>
               <div className="w-full h-24 mt-2 bg-background/40 rounded-xl relative overflow-hidden border border-border/20">
                  {/* Mock Chart Area */}
                  <div className="absolute inset-x-0 bottom-4 h-[2px] bg-success/20 w-full" />
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M0 80 Q 50 40 100 60 T 200 20 T 300 10" fill="none" stroke="#00E5A0" strokeWidth="2" strokeDasharray="4 2" />
                  </svg>
               </div>
            </div>
          </div>

          {/* Main Terminal Panel */}
          <div className="lg:col-span-6 flex flex-col gap-6 h-full min-h-[700px]">
            <div className="glass-card rounded-2xl border-border/40 flex flex-col flex-grow relative overflow-hidden">
               {/* Terminal Header */}
               <div className="h-12 border-b border-border/40 flex items-center justify-between px-6 bg-card-elevated/40 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,212,255,1)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-primary">ZKWHALE Terminal <span className="text-cyan/60 ml-1">v.1.0-beta</span></span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-text-secondary font-mono">ID: 0x8f2...3d9e</span>
                    <div className="h-4 w-[1px] bg-border/40" />
                    <CircleAlert size={14} className="text-text-secondary/40 hover:text-warning cursor-pointer transition-colors" />
                  </div>
               </div>

               {/* Chat History */}
               <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] flex flex-col gap-2 ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                          <div className={`p-4 rounded-2xl ${
                            msg.type === 'user' 
                              ? 'bg-cyan text-background font-bold shadow-lg shadow-cyan/20' 
                              : 'bg-card-elevated/80 border border-border/40 text-text-primary backdrop-blur-sm'
                          }`}>
                            <p className={`text-sm leading-relaxed ${msg.type === 'ai' ? 'terminal-text' : ''}`}>
                              {msg.content}
                            </p>
                          </div>
                          
                          {msg.json && (
                             <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="w-full p-4 rounded-xl bg-[#05080F] border border-border/60 font-mono text-[11px]"
                             >
                               <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                                  <span className="text-cyan/60 uppercase font-black tracking-widest text-[9px]">Parsed Intent</span>
                                  <span className="text-[8px] text-text-secondary">JSON_OBJECT</span>
                               </div>
                               <pre className="text-cyan/80">
                                 {JSON.stringify(msg.json, null, 2)}
                               </pre>
                             </motion.div>
                          )}
                          
                          <span className="text-[9px] text-text-secondary/40 font-black uppercase tracking-widest">{msg.timestamp} • {msg.type === 'user' ? 'YOU' : 'AI_ENGINE'}</span>
                        </div>
                      </motion.div>
                    ))}
                    {isProcessing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-card-elevated/40 border border-border/40 p-4 rounded-2xl flex items-center gap-3">
                           <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
                              <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
                              <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce" />
                           </div>
                           <span className="text-[10px] font-black text-cyan uppercase tracking-widest">Generating ZK Proof...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               {/* Terminal Input */}
               <TerminalInput onSend={handleSendVibe} isLoading={isProcessing} />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <ProofVisualizer 
              steps={proofSteps} 
              latestProof={activeProofHash || undefined}
              fidelityScore={activeProofHash ? 98.3 : undefined}
            />

            <DisclosureTierSelector />

            <div className="glass-card rounded-2xl p-6 flex flex-col gap-6 border-border/40 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Copy size={80} />
               </div>
               <div className="flex items-center justify-between relative z-10">
                  <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Share2 size={14} className="text-purple" />
                    Copy Trading
                  </h4>
                  <div className="w-10 h-5 bg-purple/10 border border-purple/30 rounded-full relative cursor-pointer">
                     <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-purple rounded-full shadow-[0_0_8px_rgba(123,97,255,1)]" />
                  </div>
               </div>

               <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-xl font-black text-text-primary tracking-tighter">0.042 <span className="text-xs opacity-60">tDUST</span></span>
                       <span className="text-[9px] text-text-secondary uppercase font-bold">Earnings from Fees</span>
                    </div>
                    <div className="flex -space-x-3">
                       {[1, 2, 3, 4].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden relative">
                            <TraderAvatar seed={`trader-${i}`} size={32} />
                         </div>
                       ))}
                       <div className="w-8 h-8 rounded-full border-2 border-background bg-card-elevated flex items-center justify-center text-[10px] font-bold text-text-secondary">
                          +24
                       </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 rounded-xl bg-purple text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-purple/20 hover:shadow-purple/40 transition-all flex items-center justify-center gap-2 group">
                     Update Disclosure
                     <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
