export interface LocalizedString {
  pt: string;
  en: string;
}

export interface ImageData {
  url: string;
  alt: LocalizedString;
}

export interface Project {
  slug: string;
  title: string;
  location: LocalizedString;
  description: LocalizedString;
  status: 'planning' | 'under_construction' | 'completed';
  completionDate: string; // 'yyyy-MM-dd' format
  features: {
    pt: string[];
    en: string[];
  };
  images: ImageData[];
}

export interface Fraction {
  id: string;
  projectSlug: string;
  reference: LocalizedString; // e.g., "Apartamento 1A"
  type: 'apartment' | 'house' | 'shop' | 'office';
  typology: 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | null; // null for commercial
  status: 'available' | 'reserved' | 'sold';
  floor?: LocalizedString;
  grossArea: number; // m²
  usefulArea: number; // m²
  energyCertificate: string; // e.g., "A+"
  features: {
    pt: string[];
    en: string[];
  };
  description: LocalizedString;
  floorPlan?: ImageData;
  images: ImageData[]; // custom gallery; falls back to Project images if empty
}
