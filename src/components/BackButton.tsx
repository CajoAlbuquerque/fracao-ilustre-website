'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ fallbackText }: { fallbackText: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-accent-gold uppercase text-sm tracking-widest hover:text-white cursor-pointer transition-colors mb-8 inline-block">
      &larr; {fallbackText}
    </button>
  );
}