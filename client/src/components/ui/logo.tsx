import { FC } from 'react';
import { Link } from 'wouter';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

const Logo: FC<LogoProps> = ({ size = 'md', className = '', showTagline = true }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link href="/">
      <div className={`flex items-center cursor-pointer ${className}`}>
        <div className="flex items-center">
          <span className={`font-bold ${sizeClasses[size]}`}>
            <span className="text-foreground">Ve</span>
            <span className="text-primary">Collab</span>
          </span>
        </div>
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
