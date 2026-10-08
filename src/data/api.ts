import { cache } from 'react';
import { client } from "@/sanity/client";
import {
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  FRACTIONS_QUERY,
  FRACTION_BY_ID_QUERY,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import {
  PROJECTS_QUERY_RESULT,
  PROJECT_BY_SLUG_QUERY_RESULT,
  FRACTIONS_QUERY_RESULT,
  FRACTION_BY_ID_QUERY_RESULT,
} from "../../sanity.types";
import { Fraction, ImageData, LocalizedString, Project } from "./types";

export interface FractionFilters {
  projectSlug?: string;
  type?: 'apartment' | 'house' | 'shop' | 'office';
  typology?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | null;
  status?: 'available' | 'reserved' | 'sold';
}

function mapSanityImage(img: NonNullable<NonNullable<PROJECTS_QUERY_RESULT[number]['images']>[number]>): ImageData | null {
  const imageUrl = img.asset?.url || (img.asset?._id ? urlFor(img).url() : null);
  if (!imageUrl) return null;

  return {
    url: imageUrl,
    alt: {
      pt: img.alt?.pt ?? '',
      en: img.alt?.en ?? '',
    },
  };
}

function mapSanityProject(raw: NonNullable<PROJECT_BY_SLUG_QUERY_RESULT>): Project {
  return {
    slug: raw.slug ?? '',
    title: raw.title ?? '',
    location: {
      pt: raw.location?.pt ?? '',
      en: raw.location?.en ?? '',
    },
    description: {
      pt: raw.description?.pt ?? '',
      en: raw.description?.en ?? '',
    },
    status: (raw.status as Project['status']) ?? 'planning',
    completionDate: raw.completionDate ?? '',
    features: {
      pt: raw.features?.pt ?? [],
      en: raw.features?.en ?? [],
    },
    images: (raw.images ?? [])
      .map(mapSanityImage)
      .filter((img): img is ImageData => img !== null),
  };
}

function mapSanityFraction(raw: NonNullable<FRACTION_BY_ID_QUERY_RESULT>): Fraction {
  let floorPlan: ImageData | undefined;
  if (raw.floorPlan) {
    const floorPlanUrl = raw.floorPlan.asset?.url || (raw.floorPlan.asset?._id ? urlFor(raw.floorPlan).url() : null);
    if (floorPlanUrl) {
      floorPlan = {
        url: floorPlanUrl,
        alt: {
          pt: raw.floorPlan.alt?.pt ?? '',
          en: raw.floorPlan.alt?.en ?? '',
        },
      };
    }
  }

  let floor: LocalizedString | undefined;
  if (raw.floor && (raw.floor.pt || raw.floor.en)) {
    floor = {
      pt: raw.floor.pt ?? '',
      en: raw.floor.en ?? '',
    };
  }

  return {
    id: raw.id ?? '',
    projectSlug: raw.projectSlug ?? '',
    reference: {
      pt: raw.reference?.pt ?? '',
      en: raw.reference?.en ?? '',
    },
    type: (raw.type as Fraction['type']) ?? 'apartment',
    typology: (raw.typology as Fraction['typology']) ?? null,
    status: (raw.status as Fraction['status']) ?? 'available',
    floor,
    grossArea: raw.grossArea ?? 0,
    usefulArea: raw.usefulArea ?? 0,
    energyCertificate: raw.energyCertificate ?? '',
    features: {
      pt: raw.features?.pt ?? [],
      en: raw.features?.en ?? [],
    },
    description: {
      pt: raw.description?.pt ?? '',
      en: raw.description?.en ?? '',
    },
    floorPlan,
    images: (raw.images ?? [])
      .map(mapSanityImage)
      .filter((img): img is ImageData => img !== null),
  };
}

/**
 * Retrieve all Projects.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  const data = await client.fetch<PROJECTS_QUERY_RESULT>(PROJECTS_QUERY);
  return data.map(mapSanityProject);
});

/**
 * Retrieve a specific Project by its slug.
 */
export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const data = await client.fetch<PROJECT_BY_SLUG_QUERY_RESULT>(PROJECT_BY_SLUG_QUERY, { slug });
  return data ? mapSanityProject(data) : null;
});

/**
 * Retrieve Fractions based on optional search and layout filters.
 * Filters out "sold" fractions by default if needed, or returns all depending on options.
 */
export const getFractions = cache(async (filters?: FractionFilters): Promise<Fraction[]> => {
  const data = await client.fetch<FRACTIONS_QUERY_RESULT>(FRACTIONS_QUERY);
  let list = data.map(mapSanityFraction);

  if (filters) {
    if (filters.projectSlug) {
      list = list.filter((f) => f.projectSlug === filters.projectSlug);
    }
    if (filters.type) {
      list = list.filter((f) => f.type === filters.type);
    }
    if (filters.typology !== undefined) {
      list = list.filter((f) => f.typology === filters.typology);
    }
    if (filters.status) {
      list = list.filter((f) => f.status === filters.status);
    }
  }

  return list;
});

/**
 * Retrieve a specific Fraction by its unique ID.
 */
export const getFractionById = cache(async (id: string): Promise<Fraction | null> => {
  const data = await client.fetch<FRACTION_BY_ID_QUERY_RESULT>(FRACTION_BY_ID_QUERY, { id });
  return data ? mapSanityFraction(data) : null;
});
