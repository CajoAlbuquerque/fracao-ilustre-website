import { getProjects } from '@/data/api';
import ProjectCard from '@/components/ProjectCard';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const projects = await getProjects();

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
      <h1 className="font-display text-4xl md:text-5xl uppercase text-white mb-12">
        {t('home.portfolioTitle')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
