'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTransition } from 'react';
import { setLanguageAction } from '@/app/actions';
import { TranslationDictionary } from '@/data/translations';
import { ImagesBasePath } from '@/app/constants';

interface HeaderProps {
  locale: 'pt' | 'en';
  t: TranslationDictionary;
}

export default function Header({ locale, t }: HeaderProps) {
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    startTransition(async () => {
      await setLanguageAction(nextLocale);
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#101010]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={`${ImagesBasePath}/logo.png`}
          alt="Fração Ilustre Logo"
          width={48}
          height={48}
          className="object-contain"
          priority
        />
        <span className="font-display text-xl uppercase tracking-wider text-white">
          Fração <span className="text-accent-gold">Ilustre</span>
        </span>
      </Link>
      <nav className="hidden md:flex items-center gap-8 font-display text-sm tracking-wider uppercase">
        <Link href="/" className="hover:text-accent-gold transition-colors">{t.nav.home}</Link>
        <Link href="/projects" className="hover:text-accent-gold transition-colors">{t.nav.portfolio}</Link>
        <Link href="/marketplace" className="hover:text-accent-gold transition-colors">{t.nav.marketplace}</Link>
        <Link href="/about" className="hover:text-accent-gold transition-colors">{t.nav.about}</Link>
      </nav>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleLanguage}
          disabled={isPending}
          className="font-display text-xs uppercase tracking-wider border border-white/20 hover:border-accent-gold px-3 py-1 rounded transition-colors disabled:opacity-50 cursor-pointer"
        >
          {locale === 'pt' ? 'EN' : 'PT'}
        </button>
        <Link
          href="/marketplace"
          className="btn-primary font-display text-xs uppercase tracking-wider px-4 py-2 rounded"
        >
          {t.nav.marketplace}
        </Link>
      </div>
    </header>
  );
}