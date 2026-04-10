// agent/vibe-agent.ts - HACKATHON PRO EDITION
import { vibeParsingPrompt, fidelityCheckPrompt } from './prompts';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Schema for structured trade intent
const TradeIntentSchema = z.object({
  asset: z.string(),
  direction: z.enum(["BUY", "SELL"]),
  size: z.union([z.number(), z.string()]),
  entryCondition: z.string(),
  exitCondition: z.string(),
  riskRules: z.string(),
  fidelityScoreHint: z.number().optional(),
});

type TradeIntent = z.infer<typeof TradeIntentSchema>;

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: process.env.LLM_BASE_URL || 'https://api.aimlapi.com/v1',
});

const DEFAULT_MODEL = process.env.LLM_MODEL || 'meta-llama/Llama-3.1-405B-Instruct-Turbo';

/**
 * Enhanced Vibe Parser with Retry & Zod Validation
 */
export async function parseVibe(userInput: string, retries = 3): Promise<TradeIntent> {
  console.log(`[Agent] Parsing: "${userInput}"`);
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await client.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [{ role: "system", content: "You are a Quant-grade Trading Agent. Output JSON only." }, { role: "user", content: vibeParsingPrompt(userInput) }],
        response_format: { type: "json_object" },
      });

      const json = JSON.parse(response.choices[0].message.content!);
      return TradeIntentSchema.parse(json);
    } catch (error) {
      console.warn(`[Agent] Attempt ${i+1} failed:`, error instanceof Error ? error.message : error);
      if (i === retries - 1) throw error;
    }
  }
  throw new Error("Failed to parse vibe after retries");
}

/**
 * Post-Submission Fidelity Verification
 */
export async function verifyFidelity(vibe: string, intent: TradeIntent) {
  console.log(`[Agent] Verifying fidelity for ZK proof...`);
  
  const response = await client.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [{ role: "user", content: fidelityCheckPrompt(vibe, intent) }],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content!);
}

/**
 * Swarm Vibe: Joint Strategy Commitment
 * Simulates hashing multiple trader signatures/inputs
 */
export async function generateSwarmCommitment(traderKeys: string[], baseStrategy: string) {
  // In a real ZK app, this would be a Merkle root or complex hash chain
  const encoder = new TextEncoder();
  const data = encoder.encode(traderKeys.join('') + baseStrategy);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hashBuffer);
}

// CLI Test
if (require.main === module) {
  (async () => {
    const testVibe = "Double down on SOL if it breaks 150, but stop loss at 130.";
    const intent = await parseVibe(testVibe);
    console.log('Parsed:', intent);
    const fidelity = await verifyFidelity(testVibe, intent);
    console.log('Fidelity Report:', fidelity);
  })();
}
