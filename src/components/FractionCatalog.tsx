'use client';

import React, { useState, useMemo } from 'react';
import { Fraction } from '@/data/types';
import FractionCard from '@/components/FractionCard';
import { useTranslations } from 'next-intl';

interface FractionCatalogProps {
  initialFractions: Fraction[];
}

export default function FractionCatalog({ initialFractions }: FractionCatalogProps) {
  const t = useTranslations();
  
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [typologyFilter, setTypologyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredFractions = useMemo(() => {
    return initialFractions.filter((f) => {
      if (typeFilter !== 'all' && f.type !== typeFilter) return false;
      if (typologyFilter !== 'all' && f.typology !== typologyFilter) return false;
      if (statusFilter !== 'all' && f.status !== statusFilter) return false;
      return true;
    });
  }, [initialFractions, typeFilter, typologyFilter, statusFilter]);

  const uniqueTypes = useMemo(() => Array.from(new Set(initialFractions.map(f => f.type))), [initialFractions]);
  const uniqueTypologies = useMemo(() => Array.from(new Set(initialFractions.map(f => f.typology).filter(Boolean))), [initialFractions]);
  const uniqueStatuses = useMemo(() => Array.from(new Set(initialFractions.map(f => f.status))), [initialFractions]);

  const hasFilters = typeFilter !== 'all' || typologyFilter !== 'all' || statusFilter !== 'all';

  const clearFilters = () => {
    setTypeFilter('all');
    setTypologyFilter('all');
    setStatusFilter('all');
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 bg-primary-bg/50 border border-border p-6 rounded">
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">
              {t('common.type')}
            </label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-border text-white p-3 rounded appearance-none focus:outline-none focus:border-accent-gold transition-colors"
            >
              <option value="all">{t('catalog.all')}</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{t(`common.${type}`)}</option>
              ))}
            </select>
          </div>
          
          {uniqueTypologies.length > 0 && (
            <div className="w-full md:w-1/4">
              <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">
                {t('common.typology')}
              </label>
              <select 
                value={typologyFilter} 
                onChange={(e) => setTypologyFilter(e.target.value)}
                className="w-full bg-zinc-900 border border-border text-white p-3 rounded appearance-none focus:outline-none focus:border-accent-gold transition-colors"
              >
                <option value="all">{t('catalog.all')}</option>
                {uniqueTypologies.map(typology => (
                  <option key={typology as string} value={typology as string}>{typology}</option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full md:w-1/4">
            <label className="block text-sm text-zinc-400 uppercase tracking-widest mb-2">
              {t('common.status')}
            </label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-zinc-900 border border-border text-white p-3 rounded appearance-none focus:outline-none focus:border-accent-gold transition-colors"
            >
              <option value="all">{t('catalog.all')}</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{t(`common.${status}`)}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <div className="w-full md:w-1/4 pb-1">
              <button 
                onClick={clearFilters}
                className="text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-widest underline underline-offset-4"
              >
                {t('catalog.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredFractions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFractions.map((fraction) => (
            <FractionCard key={fraction.id} fraction={fraction} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-border rounded bg-primary-bg/20">
          <p className="text-zinc-400 text-lg mb-6">{t('catalog.noResults')}</p>
          <button 
            onClick={clearFilters}
            className="inline-block bg-accent-gold text-primary-bg px-6 py-3 uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors"
          >
            {t('catalog.clearFilters')}
          </button>
        </div>
      )}
    </div>
  );
}
