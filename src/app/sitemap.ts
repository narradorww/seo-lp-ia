import { MetadataRoute } from 'next'
import projects from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rodrigoalexandre.dev'

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
