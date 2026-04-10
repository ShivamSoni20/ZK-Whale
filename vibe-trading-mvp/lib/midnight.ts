// frontend/lib/midnight.ts - HACKATHON PRO EDITION
import { 
  createContractInstance, 
  deployContract,
  ContractInstance
} from '@midnight-ntwrk/midnight-js-contracts';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { LaceWallet } from '@midnight-ntwrk/midnight-js-wallet';

// @ts-ignore
import vibeTraderContract from '../contracts/compiled/vibe-trader.json';

export const initializeMidnight = async () => {
  const wallet = await LaceWallet.create();
  await wallet.enable();

  const privateStateProvider = levelPrivateStateProvider();
  const proofProvider = httpClientProofProvider('http://localhost:6300');

  const contractInstance = createContractInstance({
    contract: vibeTraderContract,
    privateStateProvider,
    proofProvider,
    wallet,
  });

  return { contractInstance, wallet };
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
  console.log("[Midnight] Submitting Pro Vibe...");
  const tx = await (contract as any).submitVibe(vibeId, strategyCommitment, intentHash, swarmCommitment);
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
  console.log("[Midnight] Executing Trade with fidelity verification...");
  const tx = await (contract as any).executeTrade(vibeId, intentHash, fidelityScore, proofData);
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
  const disclosed = await (contract as any).discloseTradeDetails(
    vibeId,
    intentHash,
    copierId,
    new TextEncoder().encode(assetName),
    new TextEncoder().encode(direction)
  );
  return disclosed; // Returns ZK proof + revealed fields
};
