# Deployment Guide — ZKWHALE on Midnight Preprod

## Prerequisites
- [ ] Node.js v22+ installed
- [ ] Docker Desktop running
- [ ] Google Chrome + Lace Wallet installed
- [ ] Compact compiler installed: `curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh`

## Step 1: Install Dependencies
npm install

## Step 2: Start Proof Server (keep running in background)
npm run proof-server:up
# OR: docker compose up -d

## Step 3: Compile the Contract
npm run compile-contract
# Expected output: "Compiling X circuits: circuit submitVibe ..."

## Step 4: Deploy to Preprod
npm run deploy:preprod

# On first run:
# - A new wallet is created
# - You MUST fund it before continuing:
#   1. Copy your wallet address from the output
#   2. Go to: https://faucet.preprod.midnight.network/
#   3. Request tNIGHT tokens
#   4. Go to: https://dust.preprod.midnight.network/
#   5. Convert tNIGHT → tDUST
#   6. Press ENTER in terminal to continue

## Step 5: Verify Deployment
# Contract address is saved in deployment.json
# Check on block explorer: https://explorer.preprod.midnight.network

## Step 6: Run CLI to Test Contract
npm run cli

## Step 7: Start Frontend
npm run dev
# Open http://localhost:3000

## Troubleshoot
- Proof server not running: `docker ps` to check, `npm run proof-server:up` to start
- Balance is 0: Go to faucet and request more tNIGHT, convert to tDUST
- Compile error: Run `compact update` to get latest compiler version
- Contract address not found: Check deployment.json exists
