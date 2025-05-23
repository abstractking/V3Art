import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useWeb3 } from '@/hooks/use-web3';
import Logo from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, LogOut, Search, Coins } from 'lucide-react';
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
  const { walletAddress, isConnected, balance, isConnecting, error, connect, disconnect, userId } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      //Type assertion to Error
      const error = err as Error;

      console.error("Connection error:", err); // Debug log
      toast({
        title: "Connection Failed",
        description: error.message || "Could not connect to VeChain wallet",
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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;
    if (!target.href.startsWith(window.location.origin)) return;
  
    e.preventDefault();
    window.open(target.href, '_blank');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Submit', href: '/submit' },
    { name: 'Artists', href: '/artists' },
    { name: 'Profile', href: userId ? `/profile/${userId}` : '/profile' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Admin', href: '/admin' },
    { name: 'About', href: '/about' },
  ];

  const isRouteActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const connectionError: Error | string | null = isConnected ? null : "Connection error";

  const getErrorMessage = (error: Error | string | null): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return error || "An unexpected error occurred";
  };

  return (
    <header className="bg-background dark:bg-[#0A0E1A] border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search items..." 
                className="w-full bg-secondary/50 border border-border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Web3 Connect Button */}
          <div className="flex items-center">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="hidden sm:inline">{walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "No Address"}</span>
                    <span className="sm:hidden">{walletAddress ? `${walletAddress.slice(0, 4)}...` : "No Address"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-default opacity-70">
                    {walletAddress || "No Address"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-default">
                    Balance: {balance && !isNaN(parseFloat(balance)) ? `${parseFloat(balance).toFixed(2)} VET` : "Loading..."}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem>
                      <div className="flex items-center">
                        <Coins className="h-4 w-4 mr-2" />
                        My Dashboard
                      </div>
                    </DropdownMenuItem>
                  </Link>
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
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 text-sm font-medium shadow transition-colors"
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

          {/* Menu button */}
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-xl border-l border-border">
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-foreground focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search items..." 
                    className="w-full bg-secondary/50 border border-border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <div
                    className={`block px-4 py-3 text-lg font-medium cursor-pointer border-b border-border ${
                      isRouteActive(item.href)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </div>
                </Link>
              ))}
              <a 
                href="https://github.com/your-repo/docs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block px-3 py-2 rounded-md text-base font-medium cursor-pointer text-muted-foreground hover:bg-secondary"
                onClick={handleLinkClick}
              >
                GitDoc
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Display error if any */}
      {connectionError && (
        <div className="bg-destructive/10 border-l-4 border-destructive p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-destructive">{getErrorMessage(connectionError)}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
