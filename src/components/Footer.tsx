import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="bg-secondary-bg border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display text-xl uppercase tracking-wider text-white">
            Fração <span className="text-accent-gold">Ilustre</span>
          </span>
          <p className="text-xs text-zinc-500 mt-2 font-display uppercase tracking-widest">
            {t('common.slogan')}
          </p>
        </div>
        <p className="text-xs text-zinc-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} Fração Ilustre. Viseu, Portugal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}