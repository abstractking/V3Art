import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useWeb3 } from '@/hooks/use-web3';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [location] = useLocation();
  const { walletAddress, isConnected, balance, isConnecting, error, connect, disconnect } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to VeChain wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
    });
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Artists', href: '/artists' },
    { name: 'Submit', href: '/submit' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div
                  className={`px-3 py-2 text-sm font-medium cursor-pointer ${
                    isActive(item.href)
                      ? 'text-neutral-900 border-b-2 border-primary'
                      : 'text-neutral-600 hover:text-primary'
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>

          {/* Web3 Connect Button */}
          <div>
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="hidden sm:inline">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</span>
                    <span className="sm:hidden">{walletAddress?.slice(0, 4)}...</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-default opacity-70">
                    {walletAddress}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-default">
                    Balance: {balance ? `${parseFloat(balance).toFixed(2)} VET` : 'Loading...'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDisconnect} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleConnectWallet} 
                disabled={isConnecting}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect Wallet'
                )}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-neutral-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                  isActive(item.href)
                    ? 'bg-primary-light text-white'
                    : 'text-neutral-600 hover:bg-neutral-200'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Display error if any */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
