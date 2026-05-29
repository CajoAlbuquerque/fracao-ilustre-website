export const Routes = {
  home: '/',
  about: '/sobre-nos',
  projects: {
    list: '/projetos',
    detail: (slug: string) => `/projetos/${slug}`,
  },
  fractions: {
    list: '/fracoes',
    detail: (slug: string) => `/fracoes/${slug}`,
  }
} as const;