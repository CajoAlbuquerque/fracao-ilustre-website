import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'outline';
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  children, 
  className = '' 
}) => {
  const baseStyles = "inline-block px-8 py-4 font-display text-sm uppercase tracking-widest transition-all duration-400 ease-brand border-2";
  
  const variants = {
    primary: "bg-accent-gold text-primary-bg border-accent-gold hover:bg-transparent hover:text-accent-gold",
    outline: "bg-transparent text-text-primary border-text-primary hover:bg-text-primary hover:text-primary-bg"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedStyles}>
      {children}
    </button>
  );
};

export default Button;
