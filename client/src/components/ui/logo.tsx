import { FC } from 'react';
import { Link } from 'wouter';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <div className={`${sizeClasses[size]} bg-primary rounded-full flex items-center justify-center text-white font-bold ${className}`}>
          V
        </div>
        <div className="ml-3">
          <h1 className="text-xl font-bold text-neutral-900">VeChain Art Gallery</h1>
          <p className="text-xs text-neutral-500">Blockchain-Powered Digital Art</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
