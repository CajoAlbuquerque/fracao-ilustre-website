import React from 'react';
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import { ImagesBasePath } from '@/app/constants';
import { projects } from '@/data/projects';
import Footer from '@/components/FooterOld';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero
        subtitle="Engenharia Premium"
        title={<>Construímos <br />O Futuro.</>}
        description="Inovação, qualidade absoluta e uma herança de 30 anos. De família para família, elevamos o padrão da construção em Viseu."
        ctaText="Frações Disponíveis"
        ctaHref="/projetos"
        backgroundImage={`${ImagesBasePath}/colina-verde-kitchen.jpg`}
      />
      
      <ProjectsSection projects={projects} />
      <Footer />
    </main>
  );
}
