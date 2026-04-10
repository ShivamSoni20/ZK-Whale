// agent/prompts.ts - HACKATHON PRO EDITION

export const vibeParsingPrompt = (userVibe: string) => `
Quant-grade Trading Agent: Translate "vibe" to JSON.
BE CONCISE. Output ONLY the JSON block. No decoration.

### EXAMPLES
"SOL buy 100 under 120" -> {"asset":"SOL","direction":"BUY","size":100,"entryCondition":"<120","exitCondition":"none"}

### CURRENT VIBE
"${userVibe}"
`;

export const fidelityCheckPrompt = (originalVibe: string, executedIntent: any) => `
CRITICAL FIDELITY CHECK for Midnight ZK Proof.
Compare the original "vibe" against the structured intent that was submitted.

Original Vibe: "${originalVibe}"
Submitted Intent: ${JSON.stringify(executedIntent)}

Evaluate:
1. Directional Accuracy: Did it capture BUY/SELL correctly? (40 pts)
2. Asset Match: Is it the right token? (20 pts)
3. Parameter Fidelity: Are price bounds accurate to the text? (30 pts)
4. Risk Alignment: Did it capture stop losses or conditions? (10 pts)

Return JSON: {
  "matches": boolean,
  "fidelityScore": number (0-100),
  "detailedReasoning": string,
  "deviationAnalysis": "None" | "Slight" | "Critical"
}
`;
