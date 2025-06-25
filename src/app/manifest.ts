import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rodrigo Alexandre - Mobile Developer Portfolio',
    short_name: 'Rodrigo Alexandre',
    description: 'Professional portfolio showcasing mobile development expertise, AI-powered solutions, and award-winning projects',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/rodrigo-avatar.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      },
      {
        src: '/og-banner.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
    categories: ['portfolio', 'developer', 'mobile', 'technology'],
    lang: 'en',
  }
}