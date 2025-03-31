import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA',
  description:
    'Rodrigo Alexandre é desenvolvedor mobile com mais de 20 anos em tecnologia, especialista em React Native, TypeScript, Next.js, AWS e Inteligência Artificial Generativa. Portfólio com projetos reais, estatísticas de visita e IA interativa.',

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://rodrigoalexandre.dev/',
    site_name: 'Rodrigo Alexandre | Dev Mobile - IA Generativa',
    title: 'Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA',
    images: [
      {
        url: 'https://rodrigoalexandre.dev/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Rodrigo Alexandre - Desenvolvedor Mobile',
      },
    ],
  },

  additionalMetaTags: [
    {
      name: 'keywords',
      content:
        'Rodrigo Alexandre, Desenvolvedor React Native, Dev Mobile, Next.js, ALURA, GOOGLE, GEMINI, DIO, DIO CAMPUS EXPERT, dx, ui, ux, aNDROID, ios, apple, TypeScript, JavaScript, AWS, Frontend, TDD, Jest, Enzyme, Tech Lead, Freelancer Mobile, IA Generativa, Portfólio Dev, Projetos React Native',
    },
    {
      name: 'author',
      content: 'Rodrigo Alexandre',
    },
  ],

  twitter: {
    handle: '@rodrigoalexandre79',
    site: 'https://www.linkedin.com/in/rodrigoalexandre79/',
    cardType: 'summary_large_image',
  },
};

export default config;
