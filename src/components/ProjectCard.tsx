import React from 'react';
import { Project } from '@/data/types'
import { Routes } from '@/config/routes'
import Link from 'next/link';
import Image from 'next/image';
import { TranslationDictionary } from '@/data/translations';

interface ProjectCardProps {
  project: Project
  locale: 'pt' | 'en';
  t: TranslationDictionary
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, locale, t, className }) => {
  return (
    <div
      key={project.slug}
      className={className}
    >
      <Link href={Routes.projects.detail(project.slug)} className="group block">
        <div className="vanguard-image-container relative h-[350px] md:h-[450px] w-full rounded border border-white/10 mb-4">
          {project.images[0] && (
            <Image
              src={project.images[0].url}
              alt={project.images[0].alt[locale]}
              fill
              className="vanguard-image object-cover"
            />
          )}
          <div className="absolute top-4 right-4 bg-[#101010]/80 border border-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white">
            {project.status === 'completed' ? t.common.sold : t.common.available}
          </div>
        </div>
        <h3 className="font-display text-xl uppercase text-white group-hover:text-[#edb154] transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-500 text-sm mt-1">{project.location[locale]}</p>
      </Link>
    </div>
  );
};

export default ProjectCard;
