import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Routes } from '@/config/routes';
import { ImagesBasePath } from '@/config/constants';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/data/api';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const projects = await getProjects();

  return (
    <div className="relative pb-20">
      {/* High impact full-viewport Hero */}
      <section className="relative h-[90vh] flex items-center justify-center bg-primary-bg px-6 overflow-hidden">
        {/* Background photo fallback */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={`${ImagesBasePath}/colina-verde-living-room.jpg`}
            alt=""
            fill
            className="object-cover filter grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-primary-bg/80" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
          <p className="text-accent-gold font-display uppercase tracking-widest text-xs md:text-sm mb-4">
            {t('common.slogan')}
          </p>
          <h1 className="font-display text-4xl md:text-7xl uppercase leading-none tracking-tighter text-white max-w-4xl">
            {t('home.heroTitle1')} <span className="text-accent-gold">{t('home.heroTitle2')}</span> {t('home.heroTitle3')}
          </h1>
          <p className="text-zinc-400 max-w-xl text-base md:text-lg mt-6 font-light">
            {t('home.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link href={Routes.fractions.list as any} className="btn-primary px-8 py-3 rounded uppercase font-display text-sm tracking-wider">
              {t('nav.marketplace')}
            </Link>
            <Link href={Routes.projects.list as any} className="btn-secondary px-8 py-3 rounded uppercase font-display text-sm tracking-wider">
              {t('nav.portfolio')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects / Asymmetrical grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl md:text-5xl uppercase text-white mb-12">
          {t('home.portfolioTitle')}
        </h2>
        <div className="grid grid-cols-12 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={idx % 2 === 0 ? "asymmetrical-grid-left" : "asymmetrical-grid-right"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}