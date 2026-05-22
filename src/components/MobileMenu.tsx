"use client";

import React from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed inset-0 z-[200] transition-opacity duration-400 ease-brand ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary-bg/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-secondary-bg p-12 transition-transform duration-400 ease-brand shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-text-primary hover:text-accent-gold transition-colors duration-400"
          aria-label="Fechar menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className="mt-16">
          <ul className="flex flex-col gap-8">
            <li>
              <Link 
                href="/" 
                className="font-display text-2xl uppercase tracking-widest text-text-primary hover:text-accent-gold transition-colors duration-400"
                onClick={onClose}
              >
                Início
              </Link>
            </li>
            <li>
              <Link 
                href="/projetos" 
                className="font-display text-2xl uppercase tracking-widest text-text-primary hover:text-accent-gold transition-colors duration-400"
                onClick={onClose}
              >
                Projetos
              </Link>
            </li>
            <li>
              <Link 
                href="/a-marca" 
                className="font-display text-2xl uppercase tracking-widest text-text-primary hover:text-accent-gold transition-colors duration-400"
                onClick={onClose}
              >
                A Marca
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
