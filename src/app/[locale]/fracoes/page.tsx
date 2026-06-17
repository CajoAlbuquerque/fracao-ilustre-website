import { getFractions } from '@/data/api';
import FractionCatalog from '@/components/FractionCatalog';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function FractionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  
  // Pre-filter with only available Fractions as requested
  const fractions = await getFractions({ status: 'available' });

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
      <h1 className="font-display text-4xl md:text-5xl uppercase text-white mb-12">
        {t('nav.marketplace')}
      </h1>
      <FractionCatalog initialFractions={fractions} />
    </div>
  );
}
