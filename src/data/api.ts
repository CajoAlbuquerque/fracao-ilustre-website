import { cache } from 'react';
import { projects } from "./projects";
import { fractions } from "./fractions";
import { Fraction, Project } from "./types";

export interface FractionFilters {
  projectSlug?: string;
  type?: 'apartment' | 'house' | 'shop' | 'office';
  typology?: 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | null;
  status?: 'available' | 'reserved' | 'sold';
}

/**
 * Retrieve all Projects.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  return projects;
});

/**
 * Retrieve a specific Project by its slug.
 */
export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const project = projects.find((p) => p.slug === slug);
  return project || null;
});

/**
 * Retrieve Fractions based on optional search and layout filters.
 * Filters out "sold" fractions by default if needed, or returns all depending on options.
 */
export const getFractions = cache(async (filters?: FractionFilters): Promise<Fraction[]> => {
  let list = [...fractions];

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
  const fraction = fractions.find((f) => f.id === id);
  return fraction || null;
});
