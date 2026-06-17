'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageData } from '@/data/types';
import { useLocale, useTranslations } from 'next-intl';

interface ImageGalleryProps {
  images: ImageData[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const locale = useLocale() as 'pt' | 'en';
  const t = useTranslations();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length <= 1) return null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4 mb-6">{t('common.gallery')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="relative h-[250px] w-full rounded border border-white/10 cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={img.url}
              alt={img.alt[locale] || ''}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl"
            onClick={closeLightbox}
          >
            &times;
          </button>
          
          <button 
            className="absolute left-4 md:left-12 text-white/50 hover:text-white text-5xl p-4"
            onClick={prevImage}
          >
            &#8249;
          </button>

          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={images[selectedIndex].url}
              alt={images[selectedIndex].alt[locale] || ''}
              fill
              className="object-contain"
            />
          </div>

          <button 
            className="absolute right-4 md:right-12 text-white/50 hover:text-white text-5xl p-4"
            onClick={nextImage}
          >
            &#8250;
          </button>
          
          <div className="absolute bottom-6 left-0 right-0 text-center text-white/70">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
