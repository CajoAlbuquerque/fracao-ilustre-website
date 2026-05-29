import Image from 'next/image';
import { ImagesBasePath } from '@/config/constants';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations();

    return (
        <div className="max-w-6xl mx-auto px-6 py-20">
            <h1 className="font-display text-4xl md:text-7xl uppercase text-white tracking-tighter mb-4">
                {t('about.title')}
            </h1>
            <p className="text-accent-gold font-display uppercase tracking-widest text-sm mb-12">
                {t('about.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
                <div className="md:col-span-7">
                    <h2 className="font-display text-2xl md:text-3xl uppercase text-white mb-6">
                        {t('about.foundersTitle')}
                    </h2>
                    <p className="text-zinc-300 font-light leading-relaxed mb-6">
                        {t('about.foundersStory')}
                    </p>
                </div>
                <div className="md:col-span-5 relative h-[400px] border border-white/10 rounded overflow-hidden">
                    <Image
                        src={`${ImagesBasePath}/colina-verde-kitchen.jpg`}
                        alt=""
                        fill
                        className="object-cover filter grayscale"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24 flex-row-reverse">
                <div className="md:col-span-5 relative h-[400px] border border-white/10 rounded overflow-hidden md:order-first">
                    <Image
                        src={`${ImagesBasePath}/colina-verde-bedroom.jpg`}
                        alt=""
                        fill
                        className="object-cover filter grayscale"
                    />
                </div>
                <div className="md:col-span-7">
                    <h2 className="font-display text-2xl md:text-3xl uppercase text-white mb-6">
                        {t('about.qualityTitle')}
                    </h2>
                    <p className="text-zinc-300 font-light leading-relaxed mb-6">
                        {t('about.qualityText')}
                    </p>
                </div>
            </div>

            {/* Metrics Section */}
            <section className="border-t border-border pt-16" aria-label={t('about.title')}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="font-display text-4xl md:text-6xl text-accent-gold">30+</div>
                        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider mt-2">
                            {t('about.metrics.experience')}
                        </p>
                    </div>
                    <div>
                        <div className="font-display text-4xl md:text-6xl text-accent-gold">18</div>
                        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider mt-2">
                            {t('about.metrics.completed')}
                        </p>
                    </div>
                    <div>
                        <div className="font-display text-4xl md:text-6xl text-accent-gold">2</div>
                        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider mt-2">
                            {t('about.metrics.construction')}
                        </p>
                    </div>
                    <div>
                        <div className="font-display text-4xl md:text-6xl text-accent-gold">100%</div>
                        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider mt-2">
                            {t('about.metrics.personalized')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}