import { useWeb3 } from "@/hooks/use-web3";
import { useEffect, useState } from "react";

export const AdminDashboard = () => {
  const { walletAddress, isConnected } = useWeb3();
  const [isAdmin, setIsAdmin] = useState(false);
  const adminWallet = import.meta.env.VITE_ADMIN_WALLET; // Load admin wallet from environment

  useEffect(() => {
    if (isConnected && walletAddress) {
      // Compare the connected wallet with the admin wallet
      setIsAdmin(walletAddress.toLowerCase() === adminWallet.toLowerCase());
    } else {
      setIsAdmin(false);
    }
  }, [walletAddress, isConnected, adminWallet]);

  if (!isConnected) {
    return <p>Please connect your wallet to access the dashboard.</p>;
  }

  if (!isAdmin) {
    return <p>You do not have access to the admin dashboard.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome, Admin! You have access to the admin panel.</p>
      {/* Add admin-specific components here */}
    </div>
  );
};

export default AdminDashboard;
