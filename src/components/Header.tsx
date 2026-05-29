'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Routes } from '@/config/routes';
import { ImagesBasePath } from '@/config/constants';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === 'pt' ? 'en' : 'pt';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-primary-bg/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={`${ImagesBasePath}/logo.png`}
          alt=""
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
        <Link href="/" className="hover:text-accent-gold transition-colors">{t('nav.home')}</Link>
        <Link href={Routes.projects.list as any} className="hover:text-accent-gold transition-colors">{t('nav.portfolio')}</Link>
        <Link href={Routes.fractions.list as any} className="hover:text-accent-gold transition-colors">{t('nav.marketplace')}</Link>
        <Link href={Routes.about as any} className="hover:text-accent-gold transition-colors">{t('nav.about')}</Link>
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
          href={Routes.fractions.list as any}
          className="btn-primary font-display text-xs uppercase tracking-wider px-4 py-2 rounded"
        >
          {t('nav.marketplace')}
        </Link>
      </div>
    </header>
  );
}