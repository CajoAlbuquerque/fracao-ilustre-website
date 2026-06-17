import { getProjectBySlug, getProjects } from '@/data/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Routes } from '@/config/routes';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LocalizedString } from '@/data/types';

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectLocale = locale as keyof LocalizedString;

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <Link href={Routes.projects.list as any} className="text-accent-gold uppercase text-sm tracking-widest hover:text-white transition-colors mb-8 inline-block">
        &larr; {t('common.backToPortfolio')}
      </Link>
      
      <div className="mb-12">
        <h1 className="font-display text-5xl md:text-6xl uppercase text-white mb-4">
          {project.title}
        </h1>
        <p className="text-zinc-400 text-lg">{project.location[projectLocale]}</p>
      </div>

      {project.images[0] && (
        <div className="relative h-[400px] md:h-[600px] w-full rounded border border-white/10 mb-12">
          <Image
            src={project.images[0].url}
            alt={project.images[0].alt[projectLocale] || ''}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4">{t('common.details')}</h2>
          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
            {project.description[projectLocale]}
          </p>
        </div>
        
        <div className="space-y-6">
          <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4">{t('common.features')}</h2>
          <ul className="space-y-3">
            {project.features[projectLocale].map((feature, idx) => (
              <li key={idx} className="flex items-start text-zinc-300">
                <span className="text-accent-gold mr-3 mt-1">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 p-6 border border-border bg-primary-bg/50 rounded">
            <p className="text-sm text-zinc-400 uppercase tracking-widest mb-1">{t('common.status')}</p>
            <p className="text-white text-lg capitalize">{project.status === 'completed' ? t('common.sold') : t('common.available')}</p>
            
            <p className="text-sm text-zinc-400 uppercase tracking-widest mt-4 mb-1">{t('common.completion')}</p>
            <p className="text-white text-lg">{project.completionDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
