// Importing Connex correctly
import Connex from '@vechain/connex';

// Mainnet node URL
const MAINNET_NODE = 'https://mainnet.veblocks.net/';
// Testnet node URL
const TESTNET_NODE = 'https://testnet.veblocks.net/';

// Use testnet for development
const NODE_URL = import.meta.env.PROD ? MAINNET_NODE : TESTNET_NODE;

// Define a type for our connex instance
type ConnexInstance = InstanceType<typeof Connex>;

// Create a Connex instance
let connex: ConnexInstance | null = null;

// Initialize Connex only when in browser environment
const initConnex = (): ConnexInstance | null => {
  if (typeof window === 'undefined') return null;
  
  // First check if Connex is already available in window (browser extension)
  if ((window as any).connex) {
    console.log('Using Connex from browser extension');
    return (window as any).connex;
  } 
  
  try {
    // Try to create a solo instance for development
    console.log('Creating solo Connex instance');
    return new Connex({
      node: NODE_URL,
      network: import.meta.env.PROD ? 'main' : 'test'
    });
  } catch (error) {
    console.error('Failed to initialize Connex:', error);
    return null;
  }
};

// Initialize on import, but gracefully handle errors
try {
  if (typeof window !== 'undefined') {
    connex = initConnex();
  }
} catch (e) {
  console.error('Error initializing connex:', e);
  connex = null;
}

export { connex };

export const connectWallet = async (): Promise<string | null> => {
  if (!connex) {
    console.error('Connex is not initialized');
    return null;
  }
  
  try {
    // Request a certificate to sign and verify user
    const certificateResponse = await connex.vendor.sign('cert', {
      purpose: 'identification',
      payload: {
        type: 'text',
        content: 'Login to VeChain Art Gallery'
      }
    }).request();
    
    // Return the signer's address
    return certificateResponse.annex.signer;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    return null;
  }
};

export const getWalletBalance = async (address: string): Promise<string | null> => {
  if (!connex) {
    console.error('Connex is not initialized');
    return null;
  }
  
  try {
    // Get account info using Connex
    const account = await connex.thor.account(address).get();
    // Convert balance from wei to VET (1 VET = 10^18 wei)
    const vetBalance = parseInt(account.balance) / 10**18;
    return vetBalance.toString();
  } catch (error) {
    console.error('Failed to get wallet balance:', error);
    return null;
  }
};
