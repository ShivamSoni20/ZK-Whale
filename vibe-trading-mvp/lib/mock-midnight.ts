import { DEMO_CONFIG } from './demo-mode';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connectWallet = async () => {
  await sleep(1500); // Simulate connection delay
  return DEMO_CONFIG.wallet;
};

export const deployContract = async () => {
  await sleep(2000);
  return DEMO_CONFIG.contract.address;
};

export const submitVibe = async (vibeId: string, strategyParams: any) => {
  // Parsing vibe...
  await sleep(800);
  // Generating ZK commitment...
  await sleep(1000);
  // Submitting to Midnight...
  await sleep(1200);

  return {
    vibeId: vibeId || `vibe_0x${Math.random().toString(16).substr(2, 8)}`,
    commitment: `0x${Math.random().toString(16).substr(2, 64)}`,
    status: 'stored_privately'
  };
};

export const executeTrade = async (vibeId: string, parameters: any) => {
  // Validating intent...
  await sleep(600);
  // Running ZK fairness circuit...
  await sleep(1500);
  // Executing trade privately...
  await sleep(900);

  return {
    txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    status: 'executed'
  };
};

export const proveFairness = async (vibeId: string) => {
  // Generating selective disclosure proof...
  await sleep(2000);
  
  return {
    proofHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    fidelityScore: 98.3 + (Math.random() * 1.5),
    timestamp: new Date().toISOString(),
    zkVerified: true
  };
};

export const getWalletBalance = async () => {
  await sleep(500);
  return DEMO_CONFIG.wallet.balance;
};
