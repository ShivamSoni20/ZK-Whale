// lib/midnight.ts — ZKWHALE Midnight SDK Integration
//
// This module provides the bridge between the Next.js frontend
// and the Midnight Network via the Midnight.js v4 SDK.

import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';

type ContractInstance = any;

export const DEMO_MODE = true; // Toggle to false when connected to live Preprod node

const CONFIG = {
  NODE_URL: process.env.NEXT_PUBLIC_NODE_URL || 'https://rpc.preprod.midnight.network',
  INDEXER_URL: process.env.NEXT_PUBLIC_INDEXER_URL || 'https://indexer.preprod.midnight.network/api/v3/graphql',
  PROOF_SERVER: process.env.NEXT_PUBLIC_PROOF_SERVER || 'http://localhost:6300',
};

// ── Mock helpers for demo mode ───────────────────────────────────────
const mockDelay = (ms: number) => new Promise(r => setTimeout(r, ms));
const mockHash = () => '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

const MockMidnight = {
  connectWallet: async () => {
    await mockDelay(500);
    return { address: mockHash(), balance: '10,500 tDUST' };
  },
  submitVibe: async (vibeId: string) => {
    await mockDelay(800);
    return { txHash: mockHash(), vibeId, status: 'committed' };
  },
  executeTrade: async (vibeId: string) => {
    await mockDelay(1200);
    return { txHash: mockHash(), fidelityScore: 98, status: 'executed' };
  },
  proveFairness: async (vibeId: string) => {
    await mockDelay(600);
    return { vibeId, asset: 'SOL', direction: 'LONG', fidelityVerified: true, proofHash: mockHash() };
  },
};

// ── Public API ───────────────────────────────────────────────────────

export const initializeMidnight = async () => {
  if (DEMO_MODE) {
    return { contractInstance: {}, wallet: await MockMidnight.connectWallet() };
  }
  // Live: connect Lace wallet
  const lace = await (window as any).midnight?.lace?.enable();
  return { contractInstance: {}, wallet: lace };
};

export const submitVibePro = async (
  contract: ContractInstance,
  vibeId: string,
  strategyCommitment: Uint8Array,
  intentHash: Uint8Array,
  swarmCommitment: Uint8Array
) => {
  if (DEMO_MODE) return MockMidnight.submitVibe(vibeId);
  const tx = await contract.submitVibe(vibeId, strategyCommitment, intentHash, swarmCommitment);
  return await tx.wait();
};

export const executeTradePro = async (
  contract: ContractInstance,
  vibeId: string,
  intentHash: Uint8Array,
  fidelityScore: number,
  proofData: Uint8Array
) => {
  if (DEMO_MODE) return MockMidnight.executeTrade(vibeId);
  const tx = await contract.executeTrade(vibeId, intentHash, fidelityScore, proofData);
  return await tx.wait();
};

export const discloseDetails = async (
  contract: ContractInstance,
  vibeId: string,
  intentHash: Uint8Array,
  copierId: string,
  assetName: string,
  direction: string
) => {
  if (DEMO_MODE) return MockMidnight.proveFairness(vibeId);
  const disclosed = await contract.discloseTradeDetails(
    vibeId, intentHash, copierId,
    new TextEncoder().encode(assetName),
    new TextEncoder().encode(direction)
  );
  return disclosed;
};
