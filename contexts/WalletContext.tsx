import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeMidnight, DEMO_MODE } from '../lib/midnight';

interface WalletContextType {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const { wallet } = await initializeMidnight();
      if (wallet) {
        setAddress(wallet.address || '0x' + Math.random().toString(16).slice(2, 10) + '...');
        setBalance(wallet.balance || '0.00');
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{ address, balance, isConnected, isConnecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
