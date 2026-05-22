import React from 'react';
import Image from 'next/image';
import Button from './Button';

interface ProjectCardProps {
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaVariant?: 'primary' | 'outline';
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  location,
  image,
  imageAlt,
  href,
  ctaVariant = 'primary',
  className = '',
}) => {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <div className="relative h-full min-h-[500px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-800 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl mb-2">
            {title}
          </h3>
          <p className="text-text-secondary mb-6">
            {location}
          </p>
          <Button 
            href={href} 
            variant={ctaVariant}
            className="px-6 py-3"
          >
            Descobrir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
