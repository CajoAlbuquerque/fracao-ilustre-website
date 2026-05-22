import React from 'react';
import ProjectCard from './ProjectCard';
import Button from './Button';
import { Project } from "../data/types";

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }: Readonly<ProjectsSectionProps>) => {
  return (
    <section className="py-32 px-[5%]">
      <div className="flex justify-between items-end mb-16 pb-8 border-b border-border">
        <h2 className="text-4xl md:text-5xl lg:text-6xl">
          Projetos de Assinatura
        </h2>
        <Button variant="outline" href="/projetos" className="hidden md:inline-block">
          Ver Todos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {projects.map((project, index) => {
          // Asymmetric layout: 8+4, then maybe 4+8 or similar.
          // For now, matching the prototype: first is 8, second is 4.
          const colSpan = index % 2 === 0 ? "md:col-span-8" : "md:col-span-4";
          const ctaVariant = index % 2 === 0 ? "primary" : "outline";

          return (
            <ProjectCard
              key={project.slug}
              title={project.title}
              location={project.location.pt}
              image={project.images[0].url}
              imageAlt={project.images[0].alt.pt}
              href={`/projects/${project.slug}`}
              ctaVariant={ctaVariant as 'primary' | 'outline'}
              className={colSpan}
            />
          );
        })}
      </div>

      <div className="mt-12 md:hidden">
        <Button variant="outline" href="/projetos" className="w-full text-center">
          Ver Todos
        </Button>
      </div>
    </section>
  );
};

export default ProjectsSection;
