import { defineQuery } from 'next-sanity'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(completionDate desc) {
    _id,
    title,
    "slug": slug.current,
    location,
    description,
    status,
    completionDate,
    features,
    images[] {
      _key,
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    }
  }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    location,
    description,
    status,
    completionDate,
    features,
    images[] {
      _key,
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    }
  }
`)

export const FRACTIONS_QUERY = defineQuery(`
  *[_type == "fraction"] | order(_createdAt asc) {
    _id,
    "id": identifier,
    "projectSlug": project->slug.current,
    reference,
    type,
    typology,
    status,
    floor,
    grossArea,
    usefulArea,
    energyCertificate,
    features,
    description,
    floorPlan {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    images[] {
      _key,
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    }
  }
`)

export const FRACTION_BY_ID_QUERY = defineQuery(`
  *[_type == "fraction" && identifier == $id][0] {
    _id,
    "id": identifier,
    "projectSlug": project->slug.current,
    reference,
    type,
    typology,
    status,
    floor,
    grossArea,
    usefulArea,
    energyCertificate,
    features,
    description,
    floorPlan {
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    },
    images[] {
      _key,
      asset-> {
        _id,
        url
      },
      alt,
      hotspot,
      crop
    }
  }
`)
