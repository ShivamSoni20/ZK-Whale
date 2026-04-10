const MOCK_RESPONSES: Record<string, any> = {
  // SOL patterns
  sol: {
    asset: "SOL",
    direction: "BUY",
    entryCondition: "< $140",
    exitCondition: "> $165",
    riskRules: "Stop Loss at $128",
    size: "$500",
    riskLevel: "Medium",
    confidence: 94,
    fidelityScoreHint: 94,
    vibeHash: "0x" + "sol".split("").map(c => c.charCodeAt(0).toString(16)).join("").padEnd(64, "0"),
    parsedSummary: "Buy SOL on dips below $140, take profit at $165 with stop at $128",
  },
  // BTC patterns
  btc: {
    asset: "BTC",
    direction: "BUY",
    entryCondition: "< $82,000",
    exitCondition: "> $95,000",
    riskRules: "Stop Loss at $78,500",
    size: "$1,000",
    riskLevel: "Low",
    confidence: 91,
    fidelityScoreHint: 91,
    vibeHash: "0x" + "btc".split("").map(c => c.charCodeAt(0).toString(16)).join("").padEnd(64, "0"),
    parsedSummary: "Accumulate BTC below $82k for a run to $95k",
  },
  // ETH patterns
  eth: {
    asset: "ETH",
    direction: "BUY",
    entryCondition: "< $1,850",
    exitCondition: "> $2,400",
    riskRules: "Stop Loss at $1,720",
    size: "$750",
    riskLevel: "Medium",
    confidence: 88,
    fidelityScoreHint: 88,
    vibeHash: "0x" + "eth".split("").map(c => c.charCodeAt(0).toString(16)).join("").padEnd(64, "0"),
    parsedSummary: "Long ETH on weakness, targeting $2400 breakout",
  },
  // Bear/short patterns
  short: {
    asset: "DETECTED_ASSET",
    direction: "SELL",
    entryCondition: "Current price",
    exitCondition: "-15%",
    riskRules: "Stop Loss at +5%",
    size: "$300",
    riskLevel: "High",
    confidence: 79,
    fidelityScoreHint: 79,
    vibeHash: "0x" + "short".split("").map(c => c.charCodeAt(0).toString(16)).join("").padEnd(64, "0"),
    parsedSummary: "Short position — bearish sentiment detected",
  },
  // Default fallback
  default: {
    asset: "SOL",
    direction: "BUY",
    entryCondition: "Market",
    exitCondition: "+20%",
    riskRules: "Stop Loss at -8%",
    size: "$500",
    riskLevel: "Medium",
    confidence: 85,
    fidelityScoreHint: 85,
    vibeHash: "0x" + "default".split("").map(c => c.charCodeAt(0).toString(16)).join("").padEnd(64, "0"),
    parsedSummary: "General bullish momentum strategy",
  },
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockParseVibe = async (input: string) => {
  // Realistic typing delay
  await sleep(800 + Math.random() * 700);

  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('sol')) return MOCK_RESPONSES.sol;
  if (lowerInput.includes('btc') || lowerInput.includes('bitcoin')) return MOCK_RESPONSES.btc;
  if (lowerInput.includes('eth') || lowerInput.includes('ethereum')) return MOCK_RESPONSES.eth;
  if (lowerInput.includes('short') || lowerInput.includes('sell')) return MOCK_RESPONSES.short;
  
  return MOCK_RESPONSES.default;
};

export const mockVerifyFidelity = async (vibe: string, intent: any) => {
  await sleep(1000);
  return {
    verified: true,
    score: intent.fidelityScoreHint || 90,
    report: "Intent matches Vibe perfectly."
  };
};

export const mockGenerateSwarmCommitment = async (traderKeys: string[], baseStrategy: string) => {
  await sleep(500);
  return new Uint8Array(32).fill(1); // dummy struct
};
