import { getFractionById, getProjectBySlug, getFractions } from '@/data/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LocalizedString } from '@/data/types';
import ImageGallery from '@/components/ImageGallery';
import BackButton from '@/components/BackButton';

export async function generateStaticParams() {
  const fractions = await getFractions();
  return fractions.map((fraction) => ({ slug: fraction.id }));
}

export default async function FractionDetailPage({ params }: { params: Promise<{ locale: string; slug: string }>}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const fraction = await getFractionById(slug);

  if (!fraction) {
    notFound();
  }

  const fractionLocale = locale as keyof LocalizedString;
  const project = await getProjectBySlug(fraction.projectSlug);
  
  if (!project) {
    notFound();
  }

  const displayImages = fraction.images.length > 0 ? fraction.images : project.images;

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <BackButton fallbackText={t('common.back')}/>
      
      <div className="mb-12">
        <h1 className="font-display text-5xl md:text-6xl uppercase text-white mb-4">
          {fraction.reference[fractionLocale]}
        </h1>
        <p className="text-zinc-400 text-lg">
          {t(`common.${fraction.type}`)} {fraction.typology && `- ${fraction.typology}`} | {project.title}
        </p>
      </div>

      {displayImages[0] && (
        <div className="relative h-[400px] md:h-[600px] w-full rounded border border-white/10 mb-12">
          <Image
            src={displayImages[0].url}
            alt={displayImages[0].alt[fractionLocale] || ''}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4">{t('common.details')}</h2>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {fraction.description[fractionLocale]}
          </p>

          {fraction.floorPlan && (
            <div className="mt-12">
              <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4 mb-6">{t('common.floorPlan')}</h2>
              <div className="relative h-[300px] md:h-[500px] w-full rounded border border-white/10 bg-white">
                <Image
                  src={fraction.floorPlan.url}
                  alt={fraction.floorPlan.alt[fractionLocale] || t('common.floorPlan')}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          )}

          <ImageGallery images={displayImages} />
        </div>
        
        <div className="space-y-6">
          <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4">{t('common.features')}</h2>
          <ul className="space-y-3">
            {fraction.features[fractionLocale].map((feature, idx) => (
              <li key={idx} className="flex items-start text-zinc-300">
                <span className="text-accent-gold mr-3 mt-1">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 p-6 border border-border bg-primary-bg/50 rounded space-y-4">
            <div>
              <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">{t('common.status')}</p>
              <p className="text-white text-lg capitalize">
                {fraction.status === 'sold' ? t('common.sold') : fraction.status === 'reserved' ? t('common.reserved') : t('common.available')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">{t('common.grossArea')}</p>
                <p className="text-white text-lg">{fraction.grossArea} m²</p>
              </div>
              
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">{t('common.usefulArea')}</p>
                <p className="text-white text-lg">{fraction.usefulArea} m²</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">{t('common.energy')}</p>
              <p className="text-white text-lg">{fraction.energyCertificate}</p>
            </div>

            {fraction.floor && (
              <div>
                <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">{t('common.floor')}</p>
                <p className="text-white text-lg">{fraction.floor[fractionLocale]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
