import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';

import { DemoBanner } from '../components/DemoBanner';
import { NetworkStatus } from '../components/NetworkStatus';
import { WalletProvider } from '../contexts/WalletContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Head>
        <title>ZKWHALE | ZK-Powered AI Trading Terminal</title>
        <meta name="description" content="The world's first ZK-powered natural language trading terminal on Midnight Network." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DemoBanner />
      <div className="pt-8"> {/* Add padding for the fixed DemoBanner */}
        <Component {...pageProps} />
      </div>
      <NetworkStatus />
    </WalletProvider>
  );
}
