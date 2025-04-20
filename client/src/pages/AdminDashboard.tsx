import { useWeb3 } from "@/hooks/use-web3";
import { useEffect, useState } from "react";
import UserList from "@/components/ui/user-list";

export const AdminDashboard = () => {
  const { walletAddress, isConnected } = useWeb3();
  const [isAdmin, setIsAdmin] = useState(false);
  const adminWallet = import.meta.env.VITE_ADMIN_WALLET; // Load admin wallet from environment

  useEffect(() => {
    console.log("Debugging AdminDashboard:");
    console.log("Wallet Address:", walletAddress);
    console.log("Is Connected:", isConnected);
    console.log("Admin Wallet (from env):", adminWallet);

    if (isConnected && walletAddress) {
      const isAdminCheck = walletAddress.toLowerCase() === adminWallet?.toLowerCase();
      setIsAdmin(isAdminCheck);

      console.log("Is Admin:", isAdminCheck);
    } else {
      setIsAdmin(false);
      console.log("Not connected or no wallet address.");
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
      <UserList />
      {/* Add admin-specific components here */}
    </div>
  );
};

export default AdminDashboard;