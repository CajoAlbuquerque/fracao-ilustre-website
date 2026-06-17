import React from 'react';
import { Fraction } from '@/data/types';
import { Routes } from '@/config/routes';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface FractionCardProps {
  fraction: Fraction;
  className?: string;
}

const FractionCard: React.FC<FractionCardProps> = ({ fraction, className }) => {
  const t = useTranslations();
  const locale = useLocale() as 'pt' | 'en';

  const displayImage = fraction.images[0] || fraction.floorPlan;

  return (
    <div key={fraction.id} className={className}>
      <Link href={Routes.fractions.detail(fraction.id) as any} className="group block">
        <div className="vanguard-image-container relative h-[250px] md:h-[300px] w-full rounded border border-white/10 mb-4 bg-zinc-900">
          {displayImage && (
            <Image
              src={displayImage.url}
              alt={displayImage.alt[locale] || ''}
              fill
              className="vanguard-image object-cover"
            />
          )}
          <div className="absolute top-4 right-4 bg-primary-bg/80 border border-border px-3 py-1 text-xs uppercase tracking-wider text-white">
            {fraction.status === 'available' ? t('common.available') : fraction.status === 'reserved' ? t('common.reserved') : t('common.sold')}
          </div>
        </div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display text-xl uppercase text-white group-hover:text-accent-gold transition-colors">
            {fraction.reference[locale]}
          </h3>
          {fraction.typology && (
            <span className="text-zinc-400 text-sm border border-border px-2 py-0.5 rounded">
              {fraction.typology}
            </span>
          )}
        </div>
        <p className="text-zinc-500 text-sm">
          {t('common.area')}: {fraction.grossArea} m² | {t('common.energy')}: {fraction.energyCertificate}
        </p>
      </Link>
    </div>
  );
};

export default FractionCard;
