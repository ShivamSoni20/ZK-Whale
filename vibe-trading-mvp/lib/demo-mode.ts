// This file controls ALL demo mode behavior
// Set DEMO_MODE = true to run without real Midnight network
export const DEMO_MODE = true; // Toggle this for real deployment

export const DEMO_CONFIG = {
  // Simulated wallet
  wallet: {
    address: "mn1qvt8...demo_whale_address_7f3a",
    shortAddress: "mn1qvt8...7f3a",
    balance: {
      tNIGHT: "1,250.00",
      tDUST: "847.32",
    },
    connected: true,
    network: "Preprod Testnet",
  },

  // Simulated contract deployment
  contract: {
    address: "b92d63e566cbcede6a8f3d2c1b4e7f9a0d5c2e8b1f6a3d7c4e0b9f2a5d8c1e4",
    deployedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    network: "Midnight Preprod",
    status: "ACTIVE",
  },

  // Simulated active vibes
  activeVibes: [
    {
      vibeId: "vibe_0x7f3a9c2d",
      strategyHint: "Bullish SOL momentum play",
      status: "ACTIVE",
      pnl: "+18.4%",
      copiers: 34,
      proofHash: "0x8f3a...9c2d",
      disclosureTier: "Direction Only",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      vibeId: "vibe_0x2b8e1f4a",
      strategyHint: "BTC safe accumulation",
      status: "ACTIVE",
      pnl: "+7.2%",
      copiers: 12,
      proofHash: "0x2b8e...1f4a",
      disclosureTier: "Full Parameters",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],

  // Fake leaderboard data
  leaderboard: [
    {
      rank: 1,
      vibeId: "vibe_0x7f3a9c2d",
      avatar: "A",
      avatarColor: "#7B61FF",
      performance: "+34.2%",
      followers: 142,
      strategy: "HIDDEN",
      zkVerified: true,
      disclosureTier: "Direction Only",
    },
    {
      rank: 2,
      vibeId: "vibe_0x3c8d2e1f",
      avatar: "B",
      avatarColor: "#00D4FF",
      performance: "+28.7%",
      followers: 98,
      strategy: "HIDDEN",
      zkVerified: true,
      disclosureTier: "Custom",
    },
    {
      rank: 3,
      vibeId: "vibe_0x9a4f1b7e",
      avatar: "C",
      avatarColor: "#00E5A0",
      performance: "+21.3%",
      followers: 67,
      strategy: "HIDDEN",
      zkVerified: true,
      disclosureTier: "Direction Only",
    },
    {
      rank: 4,
      vibeId: "vibe_0x5d2c8f3a",
      avatar: "D",
      avatarColor: "#FF7043",
      performance: "+15.8%",
      followers: 45,
      strategy: "HIDDEN",
      zkVerified: true,
      disclosureTier: "Full Parameters",
    },
    {
      rank: 5,
      vibeId: "vibe_0x1e6b4c9d",
      avatar: "E",
      avatarColor: "#FFD700",
      performance: "+12.1%",
      followers: 28,
      strategy: "HIDDEN",
      zkVerified: true,
      disclosureTier: "Direction Only",
    },
  ],

  // Demo proof generation timing (ms)
  proofGenerationDelay: 2500,
  tradeExecutionDelay: 1800,
  aiParsingDelay: 1200,
};
