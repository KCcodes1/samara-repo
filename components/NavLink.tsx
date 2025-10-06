import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = 'text-brand border-b-2 border-brand',
  onClick,
  style,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = 'text-ink-600 hover:text-brand transition-all duration-300 font-medium relative group';
  const activeClasses = isActive ? activeClassName : '';
  const combinedClasses = `${baseClasses} ${className} ${activeClasses}`;

  return (
    <Link href={href} className={combinedClasses} onClick={onClick} style={style}>
      <span className="relative z-10">{children}</span>
      {!isActive && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></span>
      )}
    </Link>
  );
};
