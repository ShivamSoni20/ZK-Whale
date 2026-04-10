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

**ZKWHALE** eliminates this tradeoff using Midnight Network's zero-knowledge smart contracts. Traders type strategies in natural language. An AI agent (Llama 3.1 405B) parses the intent into a structured execution plan. The trade executes privately through a Compact smart contract that generates a **ZK Fidelity Proof** — cryptographic evidence that the trader followed their own strategy without revealing position size, entry price, or timing. Verified performance is published to a public leaderboard. Subscribers pay for tiered selective disclosure of trade signals.

**Human trust required: 0. Math does the verification.**

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         ZKWHALE                                  │
│                                                                  │
│   User ──▶ "Buy SOL under $140"                                  │
│              │                                                   │
│              ▼                                                   │
│   ┌─────────────────────┐                                        │
│   │   AI Agent           │  Llama 3.1 405B                       │
│   │   agent/vibe-agent   │  Parses natural language → Intent     │
│   └──────────┬──────────┘                                        │
│              │                                                   │
│              ▼                                                   │
│   ┌─────────────────────────────────────────────┐                │
│   │   Midnight Smart Contract (Compact v0.30)    │                │
│   │   contracts/src/vibe-trader.compact          │                │
│   │                                              │                │
│   │   ┌─────────────┐  ┌──────────────────┐     │                │
│   │   │ submitVibe   │  │ executeTrade     │     │                │
│   │   │ (private)    │  │ (ZK fidelity)    │     │                │
│   │   └─────────────┘  └──────────────────┘     │                │
│   │   ┌─────────────┐  ┌──────────────────┐     │                │
│   │   │ proveFairness│  │ provePerformance │     │                │
│   │   │ (disclose)   │  │ (public score)   │     │                │
│   │   └─────────────┘  └──────────────────┘     │                │
│   └─────────────────────────────────────────────┘                │
│              │                          │                         │
│              ▼                          ▼                         │
│   ┌──────────────────┐    ┌──────────────────────┐               │
│   │ ZK Fidelity Proof │    │ Selective Disclosure  │               │
│   │ (Public Ledger)   │    │ (Tiered Subscribers)  │               │
│   └──────────────────┘    └──────────────────────┘               │
│                                                                  │
│   Infrastructure:                                                │
│   ┌────────────┐ ┌────────────┐ ┌────────────────┐              │
│   │ Node :9944 │ │Index :8088 │ │Proof Srv :6300 │              │
│   └────────────┘ └────────────┘ └────────────────┘              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 💎 Key Features

| Feature | Description |
|---|---|
| **ZK Fidelity Proofs** | Every trade generates cryptographic proof of strategy adherence. No trust needed. |
| **Selective Disclosure** | Whale traders monetize alpha via tiered access (asset → direction → full intent). |
| **Natural Language Trading** | Type plain English. AI parses, commits, and executes privately. |
| **MEV-Proof by Design** | Strategies committed as hashed private state. Front-runners see nothing. |
| **Lace Wallet Integration** | Native Midnight wallet connection via browser extension. |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start proof server
npm run proof-server:up

# 3. Compile smart contract (requires compactc via WSL)
npm run compile-contract

# 4. Deploy to Preprod
npm run deploy:preprod
# First run: fund wallet via faucet.preprod.midnight.network

# 5. Test contract via CLI
npm run cli

# 6. Launch frontend
npm run dev
# → http://localhost:3000
```

See [DEPLOY.md](./DEPLOY.md) for detailed instructions including faucet funding.

---

## 🌐 Deliverables

| Deliverable | Path |
|---|---|
| Smart Contract | [`contracts/src/vibe-trader.compact`](./contracts/src/vibe-trader.compact) |
| AI Agent | [`agent/vibe-agent.ts`](./agent/vibe-agent.ts) |
| Deploy Script | [`src/deploy.ts`](./src/deploy.ts) |
| CLI Tool | [`src/cli.ts`](./src/cli.ts) |
| SDK Integration | [`lib/midnight.ts`](./lib/midnight.ts) |
| Landing Page | [`pages/index.tsx`](./pages/index.tsx) |
| Terminal Dashboard | [`pages/dashboard.tsx`](./pages/dashboard.tsx) |

### Contract Circuits

| Circuit | Purpose |
|---|---|
| `submitVibe` | Commit a private trading strategy to the ledger |
| `executeTrade` | Execute with ZK fidelity score verification |
| `proveFairness` | Selective disclosure of trade details by tier |
| `provePerformance` | Publicly reveal reputation without exposing strategy |

---

## 📁 Project Structure

```
zkwhale/
├── agent/                        # AI strategy parsing
│   ├── vibe-agent.ts             #   Llama 3.1 intent parser
│   └── prompts.ts                #   System prompts
├── contracts/
│   └── src/
│       └── vibe-trader.compact   # ZK smart contract (Compact v0.30)
├── src/                          # Backend scripts
│   ├── deploy.ts                 #   Preprod deployment
│   └── cli.ts                    #   Interactive testing CLI
├── pages/                        # Next.js frontend
│   ├── index.tsx                 #   Landing page
│   ├── dashboard.tsx             #   Terminal + ZK proof UI
│   ├── _app.tsx                  #   App wrapper
│   └── _document.tsx             #   HTML document
├── components/                   # Reusable UI components
├── lib/
│   └── midnight.ts               # Midnight SDK bridge
├── styles/
│   └── globals.css               # Design system
├── docs/
│   ├── DEMO_SCRIPT.md            # 2-min pitch script
│   └── security.md               # Security checklist
├── docker-compose.yml            # Local proof server
├── DEPLOY.md                     # Deployment guide
├── .env.example                  # Environment template
├── package.json                  # Dependencies & scripts
└── README.md                     # ← You are here
```

---

## 🔧 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Smart Contracts | Compact | v0.30.0 (pragma ≥ 0.22) |
| Runtime | Midnight Network | Preprod |
| SDK | Midnight.js | v4.0.4 |
| Proof Server | Docker | midnightntwrk/proof-server:8.0.3 |
| AI Agent | Llama 3.1 405B | via AI/ML API |
| Frontend | Next.js | 14 |
| Styling | TailwindCSS | 3.4 |
| Animations | Framer Motion | 12 |
| Wallet | Lace Extension | Undeployed Network |

---

**Human trust required: 0. The chain verifies everything.**
