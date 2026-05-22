import React from 'react';
import Button from './Button';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  backgroundImage,
}) => {
  return (
    <section 
      className="relative min-h-screen flex items-center px-[5%] bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(16, 16, 16, 0.9) 30%, rgba(16, 16, 16, 0.4) 100%), url(${backgroundImage})` 
      }}
    >
      <div className="max-w-3xl relative z-10">
        <span 
          className="text-sm md:text-xl block text-accent-gold font-bold tracking-[5px] uppercase mb-6 opacity-0 animate-reveal"
          style={{ animationDelay: '0.2s' }}
        >
          {subtitle}
        </span>
        
        <h1 
          className="text-4xl md:text-7xl lg:text-8xl mb-8 opacity-0 animate-reveal"
          style={{ animationDelay: '0.4s' }}
        >
          {title}
        </h1>
        
        <p 
          className="text-text-secondary text-lg md:text-xl max-w-xl mb-12 opacity-0 animate-reveal"
          style={{ animationDelay: '0.6s' }}
        >
          {description}
        </p>
        
        <div 
          className="opacity-0 animate-reveal"
          style={{ animationDelay: '0.8s' }}
        >
          <Button href={ctaHref}>
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
