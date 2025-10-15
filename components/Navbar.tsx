import React from 'react';
import { ApolloLogo } from './ApolloLogo';
import { SirenIcon } from './icons/SirenIcon';

interface NavLinkProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, onClick, href }) => {
    const commonClasses = "text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-md";
    if (onClick) {
        return (
            <button onClick={onClick} className={commonClasses}>
                {children}
            </button>
        );
    }
    return (
        <a href={href || '#'} className={commonClasses}>
            {children}
        </a>
    );
};

interface NavbarProps {
    onHomeClick: () => void;
    onPredictClick: () => void;
    onEmergencyClick: () => void;
    onAboutClick: () => void;
    onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHomeClick, onPredictClick, onEmergencyClick, onAboutClick, onContactClick }) => {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <button onClick={onHomeClick} className="flex items-center group" aria-label="Go to Homepage">
            <ApolloLogo />
        </button>
        <div className="flex items-center space-x-4">
            <NavLink onClick={onHomeClick}>Home</NavLink>
            <NavLink onClick={onPredictClick}>Predict Cleft Lip</NavLink>
            <NavLink onClick={onAboutClick}>About</NavLink>
            <NavLink onClick={onContactClick}>Contact</NavLink>
            <div className="flex flex-col items-center">
              <SirenIcon className="w-6 h-6 text-red-500 animate-rotate-slow animate-subtle-glow" />
              <span className="text-xs font-bold text-slate-300 mt-1 tracking-wider">1098</span>
            </div>
            <button onClick={onEmergencyClick} className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-400 font-semibold border-2 border-red-500/50 animate-emergency-glow hover:bg-red-500/30 hover:text-red-300 transition-colors">
              <SirenIcon className="w-5 h-5" />
              <span>Emergency</span>
            </button>
        </div>
      </nav>
    </header>
  );
};