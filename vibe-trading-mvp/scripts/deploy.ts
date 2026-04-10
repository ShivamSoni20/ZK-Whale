// scripts/deploy.ts
import * as fs from 'fs';
import * as path from 'path';

const contractPath = path.join(__dirname, '../contracts/compiled/vibe-trader.json');

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  VIBE TRADING PRO — Contract Deployment');
  console.log('  Midnight SDK 3.0.0 · Compact 0.28.0');
  console.log('═══════════════════════════════════════════');

  if (!fs.existsSync(contractPath)) {
    console.error('[FAIL] Compiled contract not found at', contractPath);
    process.exit(1);
  }
  console.log('[OK] Contract artifact found.');
  console.log('[..] Configuring providers...');
  const proofServerUrl = process.env.PROOF_SERVER_URL || 'http://localhost:6300';
  console.log(`     Proof Server : ${proofServerUrl}`);
  console.log('     Private State: LevelDB (local)');
  console.log('     Proof Provider: HTTP Client');

  console.log('[..] Deploying vibe-trader contract to Midnight local ledger...');

  // Mocking the deployment success for hackathon frontend interaction
  // Webpack in Next.js will handle the actual Midnight SDK imports correctly in the browser.
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('  ✅  DEPLOYMENT SUCCESSFUL (MOCK)');
  console.log('═══════════════════════════════════════════');
  console.log(`  Deploy TX : 0x${Math.random().toString(16).slice(2, 64)}...`);
  console.log('');

  const info = {
    network: 'midnight-local',
    deployedAt: new Date().toISOString(),
    proofServer: proofServerUrl,
  };
  const outDir = path.join(__dirname, '../contracts');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'deployment.json'), JSON.stringify(info, null, 2));
  console.log('  Saved contracts/deployment.json');

  process.exit(0);
}

main();
