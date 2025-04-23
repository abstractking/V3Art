import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectWallet, getWalletBalance } from '@/lib/connex';

interface Web3ContextType {
  walletAddress: string | null;
  isConnected: boolean;
  balance: string | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  userId: string | null;
}

const defaultContext: Web3ContextType = {
  walletAddress: null,
  isConnected: false,
  balance: null,
  isConnecting: false,
  error: null,
  connect: async () => {},
  disconnect: () => {},
  userId: null,
};

const Web3Context = createContext<Web3ContextType>(defaultContext);

export function Web3Provider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved wallet address in localStorage on initial load
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      fetchBalance(savedAddress);
    }
  }, []);

  const fetchBalance = async (address: string) => {
    if (!address) return;
    
    try {
      const walletBalance = await getWalletBalance(address);
      setBalance(walletBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
    }
  };

  const connect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const address = await connectWallet();
      
      if (address) {
        setWalletAddress(address);
        localStorage.setItem('walletAddress', address);
        fetchBalance(address);
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError('Connection failed. Please make sure you have a VeChain compatible wallet installed.');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWalletAddress(null);
    setBalance(null);
    localStorage.removeItem('walletAddress');
  };

  useEffect(() => {
    if (walletAddress) {
      fetch(`/api/users/by-wallet/${walletAddress}`)
        .then((response) => response.json())
        .then((user) => {
          setUserId(user.id);
        })
        .catch((error) => console.error("Failed to fetch user ID:", error));
    }
  }, [walletAddress]);

  const contextValue: Web3ContextType = {
    walletAddress,
    isConnected: !!walletAddress,
    balance,
    isConnecting,
    error,
    connect,
    disconnect,
    userId,
  };

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => useContext(Web3Context);

export default useWeb3;
