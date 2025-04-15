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
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold ${className} dark:text-white`}>
          <span className="text-xl">Ve<span className="text-red-500 dark:text-red-400">Collab</span></span>
        </div>
        <div className="ml-3">
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white">VeCollab</h1>
          <p className="text-xs text-neutral-500 dark:text-gray-400">Blockchain-Powered Digital Art</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;