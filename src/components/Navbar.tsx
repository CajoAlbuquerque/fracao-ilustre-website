"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import { ImagesBasePath } from '@/app/constants';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-400 ease-brand px-[5%] py-8 flex justify-between items-center ${scrolled ? "bg-primary-bg/90 backdrop-blur-md py-4" : "bg-gradient-to-b from-primary-bg/90 to-transparent"
        }`}
    >
      <div className="h-12">
        <Link href="/" className='flex-row items-center'>
          <Image
            src={`${ImagesBasePath}/logo.png`}
            alt="Fração Ilustre Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <span className="font-display text-xl uppercase tracking-wider text-white ml-4">
            Fração <span className="text-accent-gold">Ilustre</span>
          </span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex gap-12">
          {['Início', 'Projetos', 'Sobre Nós'].map((item) => (
            <li key={item}>
              <Link
                href={item === 'Início' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="font-display text-sm uppercase tracking-[2px] text-text-primary hover:text-accent-gold transition-colors duration-400 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-400 group-hover:w-full" />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/marketplace"
              className="btn-primary font-display text-xs uppercase tracking-[2px] px-4 py-2 rounded text-text-primary"
            >
              Frações Disponíveis
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-text-primary hover:text-accent-gold transition-colors duration-400"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Abrir menu"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;
