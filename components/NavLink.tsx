import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = 'text-primary border-b-2 border-primary',
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = 'text-gray-600 hover:text-primary transition-colors duration-200 font-medium';
  const activeClasses = isActive ? activeClassName : '';
  const combinedClasses = `${baseClasses} ${className} ${activeClasses}`;

  return (
    <Link href={href} className={combinedClasses} onClick={onClick}>
      {children}
    </Link>
  );
};
