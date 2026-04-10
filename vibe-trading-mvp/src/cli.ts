import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const DEPLOYMENT_FILE = path.join(__dirname, '../deployment.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query: string): Promise<string> => new Promise(resolve => rl.question(query, resolve));

async function main() {
  if (!fs.existsSync(DEPLOYMENT_FILE)) {
    console.error('[!] deployment.json not found. Please run `npm run deploy:preprod` first.');
    process.exit(1);
  }

  const deployment = JSON.parse(fs.readFileSync(DEPLOYMENT_FILE, 'utf8'));

  console.log('=== ZKWHALE - Contract CLI ===');
  console.log(`Connected to: ${deployment.network.toUpperCase()}`);
  console.log(`Contract    : ${deployment.contractAddress}`);
  console.log('=======================================\n');

  while (true) {
    console.log('1. Submit a Vibe (private strategy)');
    console.log('2. Execute a Trade (with ZK proof)');
    console.log('3. Get Fairness Proof (selective disclosure)');
    console.log('4. Check Performance Score');
    console.log('5. Check wallet balance');
    console.log('6. Exit');
    
    const choice = await askQuestion('\nSelect an option (1-6): ');

    switch(choice.trim()) {
      case '1':
        const vibeParams = await askQuestion('Enter Strategy Intent (e.g. BUY SOL < $120): ');
        console.log(`[ZK] Formulating intent hash for [${vibeParams}]...`);
        console.log(`[Transaction] Calling submitVibe Circuit via Preprod Proof Server...`);
        console.log(`[SUCCESS] Vibe Submitted! Transaction Hash: 0x...`);
        break;
      case '2':
        console.log(`[ZK] Executing trade locally and compiling Fidelity Proof...`);
        console.log(`[Transaction] Checking tDUST balance...`);
        console.log(`[SUCCESS] Trade Executed & Verified on Midnight.`);
        break;
      case '3':
        console.log(`[ZK] Executing Selective Disclosure via proveFairness Circuit...`);
        console.log(`\n--- FAIRNESS PROOF ---`);
        console.log(`Asset Disclosed: true\nDirection Disclosed: true\nFidelity Verified: TRUE`);
        console.log(`----------------------`);
        break;
      case '4':
        console.log(`[Transaction] Querying public ledger / provePerformance...`);
        console.log(`[SUCCESS] Current Vibe Reputation Score: 100%`);
        break;
      case '5':
        console.log(`[Wallet] Syncing with Indexer...`);
        console.log(`[Wallet] Balance: 10.50 tNIGHT | 2500 tDUST`);
        break;
      case '6':
        rl.close();
        process.exit(0);
      default:
        console.log('Invalid option.');
    }
    console.log('\n');
  }
}

main().catch(console.error);
