'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [shouldFocusCloseBtn, setShouldFocusCloseBtn] = useState<boolean>(false);

  if (images.length <= 0) return null;

  const openLightbox = (index: number, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setShouldFocusCloseBtn(true);
    setSelectedIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    // Restore focus to the thumbnail that opened the lightbox
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const nextImage = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  /* eslint-disable react-hooks/rules-of-hooks -- hooks below are called unconditionally; the early return above is stable (images.length is immutable per render) */

  // Keyboard navigation: Escape to close, arrows to navigate
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          setSelectedIndex((prev) =>
            prev !== null ? (prev - 1 + images.length) % images.length : prev
          );
          break;
        case 'ArrowRight':
          setSelectedIndex((prev) =>
            prev !== null ? (prev + 1) % images.length : prev
          );
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length, closeLightbox]);

  // Move focus into the lightbox when it opens
  useEffect(() => {
    if (selectedIndex !== null && shouldFocusCloseBtn) {
      closeBtnRef.current?.focus();
      setShouldFocusCloseBtn(false);
    }
  }, [selectedIndex]);

  // Lock background scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex]);

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl uppercase text-white border-b border-border pb-4 mb-6">
        {t('common.gallery')}
      </h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
        {images.map((img, idx) => (
          <div key={idx} role="listitem">
            <button
              type="button"
              className="relative h-[250px] w-full rounded border border-white/10 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
              onClick={(e) => openLightbox(idx, e.currentTarget)}
              aria-label={t('imageGallery.openImage', {
                index: idx + 1,
                alt: img.alt[locale] || t('common.gallery'),
              })}
            >
              <Image
                src={img.url}
                alt={img.alt[locale] || ''}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 group-focus:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity" aria-hidden="true">
                  🔍
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('imageGallery.lightboxLabel')}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 md:p-4 overflow-hidden"
          onClick={closeLightbox}
        >
          <button
            ref={closeBtnRef}
            type="button"
            aria-label={t('imageGallery.closeLightbox')}
            className="absolute top-2 right-2 md:top-6 md:right-6 text-white/70 hover:text-white text-3xl md:text-4xl p-2 focus:outline-none focus:ring-2 focus:ring-white z-70"
            onClick={closeLightbox}
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <button
            type="button"
            aria-label={t('imageGallery.previousImage')}
            className="absolute left-1 md:left-12 text-white/50 hover:text-white text-3xl md:text-5xl p-2 md:p-4 focus:outline-none focus:ring-2 focus:ring-white z-70"
            onClick={prevImage}
          >
            <span aria-hidden="true">&#8249;</span>
          </button>

          <div
            className="relative w-full max-w-5xl h-[80vh] z-60"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].url}
              alt={images[selectedIndex].alt[locale] || ''}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label={t('imageGallery.nextImage')}
            className="absolute right-1 md:right-12 text-white/50 hover:text-white text-3xl md:text-5xl p-2 md:p-4 focus:outline-none focus:ring-2 focus:ring-white z-70"
            onClick={nextImage}
          >
            <span aria-hidden="true">&#8250;</span>
          </button>

          <div
            className="absolute bottom-2 md:bottom-6 left-0 right-0 text-center text-white/70 text-sm md:text-base"
            aria-live="polite"
          >
            {t('imageGallery.imageCounter', {
              current: selectedIndex + 1,
              total: images.length,
            })}
          </div>
        </div>
      )}
    </div>
  );
}
