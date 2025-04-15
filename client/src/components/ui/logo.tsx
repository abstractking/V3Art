import { FC } from 'react';
import { Link } from 'wouter';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

const Logo: FC<LogoProps> = ({ size = 'md', className = '', showTagline = true }) => {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  };

  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <span className="font-bold text-2xl">
          <span className="text-white">Ve</span>
          <span className="text-primary">Collab</span>
        </span>
        {showTagline && (
          <div className="hidden md:block ml-3">
            <p className="text-xs text-muted-foreground">Blockchain-Powered NFT Marketplace</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
