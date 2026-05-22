import { TranslationDictionary } from '../data/translations';

interface FooterProps {
  t: TranslationDictionary;
}

export default function Footer({ t }: Readonly<FooterProps>) {
  return (
    <footer className="bg-[#1A1A1A] border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display text-xl uppercase tracking-wider text-white">
            Fração <span className="text-[#edb154]">Ilustre</span>
          </span>
          <p className="text-xs text-zinc-500 mt-2 font-display uppercase tracking-widest">
            {t.common.slogan}
          </p>
        </div>
        <p className="text-xs text-zinc-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} Fração Ilustre. Viseu, Portugal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}