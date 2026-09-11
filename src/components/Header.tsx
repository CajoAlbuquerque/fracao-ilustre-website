'use client';

import Image from 'next/image';
import { useTransition, useState, useEffect, useCallback, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Routes } from '@/config/routes';

import logoImg from '@images/logo.png';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    // Return focus to hamburger button
    hamburgerRef.current?.focus();
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Focus trap within drawer
  useEffect(() => {
    if (!isDrawerOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when drawer opens
    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isDrawerOpen]);

  return (
    <header className="sticky top-0 z-50 bg-primary-bg/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={logoImg}
          alt=""
          width={48}
          height={48}
          className="object-contain"
          priority
        />
        <span className="font-display text-lg uppercase tracking-wider text-white">
          Fração <span className="text-accent-gold">Ilustre</span>
        </span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 font-display text-sm tracking-wider uppercase">
        <Link href="/" className="hover:text-accent-gold transition-colors">{t('nav.home')}</Link>
        <Link href={Routes.projects.list as any} className="hover:text-accent-gold transition-colors">{t('nav.portfolio')}</Link>
        <Link href={Routes.fractions.list as any} className="hover:text-accent-gold transition-colors">{t('nav.marketplace')}</Link>
        <Link href={Routes.about as any} className="hover:text-accent-gold transition-colors">{t('nav.about')}</Link>
      </nav>
      
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          disabled={isPending}
          className="font-display text-xs uppercase tracking-wider border border-white/20 hover:border-accent-gold px-3 py-1 rounded transition-colors disabled:opacity-50 cursor-pointer"
        >
          {locale === 'pt' ? 'EN' : 'PT'}
        </button>
        <Link
          href={Routes.fractions.list as any}
          className="btn-primary font-display text-xs uppercase tracking-wider px-4 py-2 rounded"
        >
          {t('nav.marketplace')}
        </Link>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        ref={hamburgerRef}
        type="button"
        onClick={openDrawer}
        aria-label={t('nav.openMenu')}
        className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-accent-gold rounded"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 z-50 md:hidden"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.openMenu')}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-primary-bg border-l border-border z-50 md:hidden flex flex-col shadow-2xl"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6 border-b border-border">
              <button
                type="button"
                onClick={closeDrawer}
                aria-label={t('nav.closeMenu')}
                className="text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-accent-gold rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-2 p-6">
              <Link
                href="/"
                onClick={closeDrawer}
                className="font-display text-base uppercase tracking-wider py-3 px-4 hover:bg-white/5 hover:text-accent-gold transition-colors rounded"
              >
                {t('nav.home')}
              </Link>
              <Link
                href={Routes.projects.list as any}
                onClick={closeDrawer}
                className="font-display text-base uppercase tracking-wider py-3 px-4 hover:bg-white/5 hover:text-accent-gold transition-colors rounded"
              >
                {t('nav.portfolio')}
              </Link>
              <Link
                href={Routes.fractions.list as any}
                onClick={closeDrawer}
                className="font-display text-base uppercase tracking-wider py-3 px-4 hover:bg-white/5 hover:text-accent-gold transition-colors rounded"
              >
                {t('nav.marketplace')}
              </Link>
              <Link
                href={Routes.about as any}
                onClick={closeDrawer}
                className="font-display text-base uppercase tracking-wider py-3 px-4 hover:bg-white/5 hover:text-accent-gold transition-colors rounded"
              >
                {t('nav.about')}
              </Link>
            </nav>

            {/* Language Toggle & CTA */}
            <div className="p-6 border-t border-border flex flex-col gap-4">
              <button
                onClick={toggleLanguage}
                disabled={isPending}
                className="font-display text-xs uppercase tracking-wider border border-white/20 hover:border-accent-gold px-4 py-3 rounded transition-colors disabled:opacity-50 w-full"
              >
                {locale === 'pt' ? 'EN' : 'PT'}
              </button>
              <Link
                href={Routes.fractions.list as any}
                onClick={closeDrawer}
                className="btn-primary font-display text-xs uppercase tracking-wider px-4 py-3 rounded text-center block"
              >
                {t('nav.marketplace')}
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}