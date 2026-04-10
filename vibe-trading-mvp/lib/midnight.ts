// frontend/lib/midnight.ts - HACKATHON PRO EDITION
import { DEMO_MODE } from './demo-mode';
import * as MockMidnight from './mock-midnight';
// @ts-ignore
import { LaceWallet } from '@midnight-ntwrk/midnight-js-wallet';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';

// @ts-ignore
import vibeTraderContract from '../contracts/compiled/vibe-trader.json';

// Use type `any` for ContractInstance to avoid build failures due to missing typings in sdk 1.0.0
type ContractInstance = any;

const getPrivateStateProvider = () => {
  if (typeof window === 'undefined') return null;
  return levelPrivateStateProvider({ indexer: 'http://localhost:8088' } as any);
};

export const initializeMidnight = async () => {
  if (DEMO_MODE) {
    return { contractInstance: {}, wallet: await MockMidnight.connectWallet() };
  }

  // @ts-ignore
  const wallet = await LaceWallet.create();
  await wallet.enable();

  const privateStateProvider = getPrivateStateProvider();
  
  // Create proof provider safely
  // @ts-ignore
  const proofProvider = httpClientProofProvider('http://localhost:6300' as any);

  // Instead of passing missing createContractInstance, we assume deployment or loading existing.
  // In a real integration you use midnightJs.deploy(...)
  
  return { contractInstance: {}, wallet };
};

/**
 * Submit Vibe with Swarm Commitment (Pro)
 */
export const submitVibePro = async (
  contract: ContractInstance, 
  vibeId: string, 
  strategyCommitment: Uint8Array, 
  intentHash: Uint8Array,
  swarmCommitment: Uint8Array
) => {
  if (DEMO_MODE) return MockMidnight.submitVibe(vibeId, {});
  console.log("[Midnight] Submitting Pro Vibe...");
  const tx = await contract.submitVibe(vibeId, strategyCommitment, intentHash, swarmCommitment);
  return await tx.wait();
};

/**
 * Execute Trade with Fidelity Scoring
 */
export const executeTradePro = async (
  contract: ContractInstance,
  vibeId: string,
  intentHash: Uint8Array,
  fidelityScore: number,
  proofData: Uint8Array
) => {
  if (DEMO_MODE) return MockMidnight.executeTrade(vibeId, {});
  console.log("[Midnight] Executing Trade with fidelity verification...");
  const tx = await contract.executeTrade(vibeId, intentHash, fidelityScore, proofData);
  return await tx.wait();
};

/**
 * Tiered Disclosure Handler
 */
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
    vibeId,
    intentHash,
    copierId,
    new TextEncoder().encode(assetName),
    new TextEncoder().encode(direction)
  );
  return disclosed; // Returns ZK proof + revealed fields
};
