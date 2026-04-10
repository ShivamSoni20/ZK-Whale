# ZKWHALE — Privacy-First AI Trading Terminal on Midnight Network
![Midnight Badge](https://img.shields.io/badge/Midnight-Preprod-blueviolet)
![Compact Badge](https://img.shields.io/badge/Compact-v0.30.0-blue)
![ZK Badge](https://img.shields.io/badge/ZK--Proofs-Enabled-brightgreen)
![React Badge](https://img.shields.io/badge/Next.js-14-black)
![Hackathon](https://img.shields.io/badge/Midnight-BUIDL%20Battle-orange)

**Where whales trade privately, prove performance publicly, and monetize alpha without doxxing.**

---

## 📖 The Problem

The current DeFi trading landscape punishes success. If you're a profitable on-chain trader, your wallet gets tracked, your strategies get front-run, and your alpha gets copied for free. The moment a whale makes a move, MEV bots and copy-traders extract value before the transaction even settles. Privacy tools exist, but they break accountability — you can hide, but you can't prove your track record. This forces a brutal tradeoff: **transparency or privacy, never both.**

## 💡 The Solution

**ZKWHALE** eliminates this tradeoff using Midnight Network's zero-knowledge smart contracts. Traders type strategies in natural language. An AI agent (Llama 3.1 405B) parses the intent into a structured execution plan. The trade executes privately through a Compact smart contract that generates a **ZK Fidelity Proof** — cryptographic evidence that the trader followed their own strategy without revealing position size, entry price, or timing. Verified performance is published to a public leaderboard. Subscribers pay for tiered selective disclosure of trade signals — asset only, asset + direction, or full intent hash for automated copy execution.

**Human trust required: 0. Math does the verification.**

---

## 🏗️ System Architecture

```
User ──▶ Natural Language ──▶ AI Agent (Llama 3.1 405B)
                                    │
                                    ▼
                            Structured Intent
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  Midnight Smart Contract       │
                    │  (Compact v0.30.0)             │
                    │                               │
                    │  submitVibe()     ──▶ Private  │
                    │  executeTrade()   ──▶ ZK Proof │
                    │  proveFairness() ──▶ Disclose  │
                    │  provePerformance() ──▶ Public │
                    └───────────────────────────────┘
                                    │
                          ┌─────────┴─────────┐
                          ▼                   ▼
                   ZK Fidelity Proof    Selective Disclosure
                   (Public Ledger)      (Tiered Subscribers)
```

---

## 💎 Key Features & Innovation

- **Zero-Knowledge Fidelity Proofs:** Every trade generates a cryptographic proof that the execution matched the original strategy. No trust required — the math proves fairness.
- **Selective Disclosure Engine:** Whale traders monetize their alpha through tiered access. Tier 1 reveals the asset. Tier 2 adds direction. Tier 3 exposes the full intent hash for automated copy-trading.
- **Natural Language Execution:** No code, no complex UIs. Type `"Buy SOL under $140, sell at $165"` and the AI handles parsing, commitment, and execution.
- **MEV-Proof by Design:** Strategies are committed as hashed private state on Midnight. Front-runners see nothing. Proof servers verify everything.
- **Lace Wallet Integration:** Native connection to Midnight's ecosystem via the Lace browser extension on the `undeployed` network.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Proof Server (keep running in background)

```bash
npm run proof-server:up
# OR: docker compose up -d
```

### 3. Compile the Smart Contract

```bash
npm run compile-contract
# Expected: "Compiling circuits: submitVibe, executeTrade, proveFairness, provePerformance"
```

### 4. Deploy to Midnight Preprod

```bash
npm run deploy:preprod
```

> **First run:** A wallet address is generated. You must fund it:
> 1. Copy your wallet address from the terminal output
> 2. Go to https://faucet.preprod.midnight.network/ → request tNIGHT
> 3. Go to https://dust.preprod.midnight.network/ → convert tNIGHT to tDUST
> 4. Press ENTER in the terminal to continue deployment

### 5. Test via CLI

```bash
npm run cli
```

### 6. Launch Frontend

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🌐 Live Deliverables

| Deliverable | Link |
|---|---|
| **Frontend Dashboard** | `http://localhost:3000` |
| **Compact Contract** | [`contracts/src/vibe-trader.compact`](./contracts/src/vibe-trader.compact) |
| **Deploy Script** | [`src/deploy.ts`](./src/deploy.ts) |
| **CLI Tool** | [`src/cli.ts`](./src/cli.ts) |
| **AI Agent** | [`agent/vibe-agent.ts`](./agent/vibe-agent.ts) |

### Smart Contract Circuits

| Circuit | Purpose |
|---|---|
| `submitVibe` | Commits a private trading strategy to the ledger |
| `executeTrade` | Executes trade with ZK fidelity verification |
| `proveFairness` | Selective disclosure of trade details by tier |
| `provePerformance` | Publicly reveals reputation score without exposing strategy |

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| **Smart Contracts** | Compact v0.30.0 (pragma ≥ 0.22) |
| **Runtime** | Midnight Network (Preprod) |
| **SDK** | Midnight.js v4.0.4 |
| **Proof Server** | midnightntwrk/proof-server:8.0.3 |
| **AI Agent** | Llama 3.1 405B via AI/ML API |
| **Frontend** | Next.js 14, TailwindCSS, Framer Motion |
| **Wallet** | Lace Extension (Undeployed Network) |

---

## 📁 Project Structure

```
zkwhale/
├── contracts/
│   └── src/
│       └── vibe-trader.compact       # ZK smart contract (Compact v0.30)
├── agent/
│   ├── vibe-agent.ts                 # AI strategy parser (Llama 3.1)
│   └── prompts.ts                    # System prompts for intent parsing
├── src/
│   ├── deploy.ts                     # Preprod deployment script
│   └── cli.ts                        # Interactive contract testing CLI
├── pages/
│   ├── index.tsx                     # Landing page
│   └── dashboard.tsx                 # Terminal + ZK proof UI
├── components/                       # UI components
├── frontend/lib/
│   └── midnight.ts                   # Midnight SDK integration
├── docker-compose.yml                # Local proof server
├── DEPLOY.md                         # Step-by-step deployment guide
└── .env.example                      # Environment template
```

---

**Human trust required: 0. The chain verifies everything.**
