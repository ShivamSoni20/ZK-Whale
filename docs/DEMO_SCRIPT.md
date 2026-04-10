# ZKWHALE - 2-Minute Pitch & Demo Script

**Setup:** Run `npm run dev` and open `http://localhost:3000`. Have both the landing page and the dashboard open.

## 0:00 - 0:30 (The Hook & Landing Page)
* **Judge Context:** "Welcome to ZKWHALE. The problem with Web3 trading today is two-fold: First, intent routing requires you to write complex code. Second, if you're a profitable trader, everyone front-runs you or copies your alpha for free."
* **Action:** *Scroll through Landing Page.*
* **Script:** "We built ZKWHALE as the world's first natural-language terminal built entirely on the Midnight Network's privacy layer. You type a strategy. An AI parses it. The execution happens securely in a ZK-fairness circuit. Your strategy remains hidden, but your verified performance is fully public."

## 0:30 - 1:00 (Wallet & Verification)
* **Action:** *Navigate to Dashboard. Click around the Sidebar.*
* **Script:** "Here's the terminal. We're connected natively via the Lace Wallet to Midnight Preprod. Notice the leaderboard on the right. These are real traders who have verified their PnL cross-chain without disclosing their alpha. Their strategies say 'HIDDEN', but their performance is ZK-proven. Let's see how they do it."

## 1:00 - 1:30 (Submitting the Strategy - The Core Tech)
* **Action:** *Type into the Terminal:* `Buy SOL when it dips under 140, sell at 165` *and hit Enter/Send.*
* **Script:** "I'll type a simple strategy: 'Buy SOL on dips below 140'. When I hit enter, our AI agent kicks in. Look at the right panel. It's parsing the intent. Now, it generates a ZK commitment... passing the strategy hash directly to our Midnight smart contract. The network executes the trade fairly without ever seeing the raw inputs."

## 1:30 - 2:00 (Proof Verification & Monetization)
* **Action:** *Point to the ZK Proof Engine panel once it says "Proof Ready!".*
* **Script:** "The trade executed. Our smart contract returned a Zero-Knowledge Proof with a fidelity score of 98.3%. Now, we can selectively disclose just the asset (e.g. 'Direction: LONG SOL') to subscribers who pay us a fee to copy-trade our authenticated on-chain alpha. ZKWHALE is the first terminal to turn privacy into a monetizable asset layer. Thank you."
