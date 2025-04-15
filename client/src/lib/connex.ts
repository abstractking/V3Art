import { Framework } from '@vechain/connex';

// Mainnet node URL
const MAINNET_NODE = 'https://mainnet.veblocks.net/';
// Testnet node URL
const TESTNET_NODE = 'https://testnet.veblocks.net/';

// Use testnet for development
const NODE_URL = import.meta.env.PROD ? MAINNET_NODE : TESTNET_NODE;

// Create a Connex instance
let connex: Framework | null = null;

// Initialize Connex when in browser environment
if (typeof window !== 'undefined') {
  try {
    connex = new Framework({
      node: NODE_URL,
      network: import.meta.env.PROD ? 'main' : 'test'
    });
  } catch (error) {
    console.error('Failed to initialize Connex:', error);
  }
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
