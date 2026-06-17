import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FractionCatalog from '../src/components/FractionCatalog';
import { Fraction } from '../src/data/types';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock FractionCard to simplify testing the filtering logic
jest.mock('../src/components/FractionCard', () => {
  return function MockFractionCard({ fraction }: { fraction: any }) {
    return <div data-testid="fraction-card">{fraction.id}</div>;
  };
});

const mockFractions: Fraction[] = [
  {
    id: 'f1',
    projectSlug: 'project-1',
    reference: { pt: 'Ref 1', en: 'Ref 1' },
    type: 'apartment',
    typology: 'T1',
    status: 'available',
    grossArea: 100,
    usefulArea: 80,
    energyCertificate: 'A',
    features: { pt: [], en: [] },
    description: { pt: '', en: '' },
    images: [],
  },
  {
    id: 'f2',
    projectSlug: 'project-1',
    reference: { pt: 'Ref 2', en: 'Ref 2' },
    type: 'house',
    typology: 'T3',
    status: 'sold',
    grossArea: 200,
    usefulArea: 150,
    energyCertificate: 'B',
    features: { pt: [], en: [] },
    description: { pt: '', en: '' },
    images: [],
  },
  {
    id: 'f3',
    projectSlug: 'project-2',
    reference: { pt: 'Ref 3', en: 'Ref 3' },
    type: 'shop',
    typology: null,
    status: 'reserved',
    grossArea: 300,
    usefulArea: 280,
    energyCertificate: 'C',
    features: { pt: [], en: [] },
    description: { pt: '', en: '' },
    images: [],
  },
];

describe('FractionCatalog Filtering Logic', () => {
  it('renders all fractions initially', () => {
    render(<FractionCatalog initialFractions={mockFractions} />);
    const cards = screen.getAllByTestId('fraction-card');
    expect(cards).toHaveLength(3);
  });

  it('filters by type', () => {
    render(<FractionCatalog initialFractions={mockFractions} />);
    const typeSelect = screen.getAllByRole('combobox')[0]; // type is the first select

    fireEvent.change(typeSelect, { target: { value: 'apartment' } });
    
    const cards = screen.getAllByTestId('fraction-card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('f1');
  });

  it('filters by typology', () => {
    render(<FractionCatalog initialFractions={mockFractions} />);
    const typologySelect = screen.getAllByRole('combobox')[1]; // typology is the second select

    fireEvent.change(typologySelect, { target: { value: 'T3' } });
    
    const cards = screen.getAllByTestId('fraction-card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('f2');
  });

  it('filters by status', () => {
    render(<FractionCatalog initialFractions={mockFractions} />);
    const statusSelect = screen.getAllByRole('combobox')[2]; // status is the third select

    fireEvent.change(statusSelect, { target: { value: 'reserved' } });
    
    const cards = screen.getAllByTestId('fraction-card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('f3');
  });

  it('combines multiple filters', () => {
    render(<FractionCatalog initialFractions={mockFractions} />);
    const typeSelect = screen.getAllByRole('combobox')[0];
    const statusSelect = screen.getAllByRole('combobox')[2];

    fireEvent.change(typeSelect, { target: { value: 'apartment' } });
    fireEvent.change(statusSelect, { target: { value: 'available' } });
    
    const cards = screen.getAllByTestId('fraction-card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('f1');

    // Change status to something that doesn't match
    fireEvent.change(statusSelect, { target: { value: 'sold' } });
    expect(screen.queryByTestId('fraction-card')).toBeNull();
    expect(screen.getByText('catalog.noResults')).toBeInTheDocument();
  });

  it('clears filters successfully', () => {
    render(<FractionCatalog initialFractions={mockFractions} />);
    const typeSelect = screen.getAllByRole('combobox')[0];

    // Apply filter
    fireEvent.change(typeSelect, { target: { value: 'apartment' } });
    expect(screen.getAllByTestId('fraction-card')).toHaveLength(1);

    // Clear filters using the clear button
    // The clear button will have text "catalog.clearFilters"
    const clearButton = screen.getByText('catalog.clearFilters');
    fireEvent.click(clearButton);

    // All fractions should be back
    expect(screen.getAllByTestId('fraction-card')).toHaveLength(3);
    
    // Select should be reset to 'all'
    expect(typeSelect).toHaveValue('all');
  });
});
