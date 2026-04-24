export interface ProjectTranslation {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface AwardInfo {
  label: string;
  organization: string;
  organizationUrl: string;
  year: string;
  position?: string;
}

export interface ProjectData {
  slug: string;
  image: string;
  images: string[];
  technologies: string[];
  dateCreated: string;
  featured: boolean;
  externalLink?: string;
  award?: AwardInfo;
  sponsors?: Array<{ name: string; url: string }>;
  en: ProjectTranslation;
  pt: ProjectTranslation;
}

const projects: ProjectData[] = [
  {
    slug: 'vibe-beneficios',
    image: '/images/vibe-beneficios.png',
    images: [
      '/images/vibe-beneficios.png',
      '/images/vibe-beneficios-2.png',
      '/images/vibe-beneficios-3.png',
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'React Query', 'Vision Camera'],
    dateCreated: '2024',
    featured: true,
    externalLink: 'https://play.google.com/store/apps/details?id=br.prd.inovaebiz.vibe',
    en: {
      title: 'Vibe Benefícios',
      description: 'Corporate loyalty and benefits platform with 100K+ downloads and 4.7★ rating on the Play Store.',
      challenge: 'The project scope tripled — from ~50 to ~150 interactive screens — under tight deadlines, while maintaining quality and integrating with multiple partners such as iFood, Visa, Rappi and Amazon Prime.',
      solution: 'Built with React Native + Expo for cross-platform delivery, Zustand for scalable state management, React Query for async data caching, and Vision Camera for intelligent receipt scanning with image processing.',
      outcome: 'Successfully launched within deadline. The app reached 100K+ downloads with a 4.7★ rating, was featured in O Globo, Exame and Marcas Mais, and became one of Brazil\'s most innovative loyalty programs.',
    },
    pt: {
      title: 'Vibe Benefícios',
      description: 'Plataforma de fidelidade e benefícios corporativos com mais de 100 mil downloads e avaliação 4,7★ na Play Store.',
      challenge: 'O escopo do projeto triplicou — de ~50 para ~150 telas interativas — com prazos apertados, mantendo qualidade e integrando com múltiplos parceiros como iFood, Visa, Rappi e Amazon Prime.',
      solution: 'Desenvolvido com React Native + Expo para entrega multiplataforma, Zustand para gerenciamento de estado escalável, React Query para cache de dados assíncronos e Vision Camera para escaneamento inteligente de notas fiscais.',
      outcome: 'Entregue dentro do prazo. O app alcançou mais de 100 mil downloads com avaliação 4,7★, foi destaque no O Globo, Exame e Marcas Mais, e se tornou um dos programas de fidelidade mais inovadores do Brasil.',
    },
  },
  {
    slug: 'moveintech',
    image: '/images/moveintech.png',
    images: [
      '/images/moveintech.png',
      '/images/moveintech-2.png',
    ],
    technologies: ['AI / LLM', 'SaaS', 'TypeScript', 'Node.js', 'React', 'Document Intelligence'],
    dateCreated: '2025',
    featured: false,
    externalLink: 'https://moveintech.com.br',
    en: {
      title: 'MoveInTech',
      description: 'SaaS platform with native AI (EnerCore Engine) for logistics intelligence — automating document processing, real-time tracking and smart back-office.',
      challenge: 'Logistics operations rely heavily on manual document processing (NF-e, CTeS, DAMDFE), taking up to 20 minutes per document. The goal was to reduce this to under 30 seconds while providing full chain visibility.',
      solution: 'Built the EnerCore Engine — an organizational AI that automates logistics document validation, enables intelligent document chat, and provides real-time supply chain monitoring with automated reconciliation and error detection.',
      outcome: 'Reduced document processing time from ~20 minutes to ~30 seconds. Delivered a complete SaaS platform connecting shippers, carriers and drivers with full traceability and automated back-office operations.',
    },
    pt: {
      title: 'MoveInTech',
      description: 'Plataforma SaaS com IA nativa (EnerCore Engine) para inteligência logística — automatizando processamento de documentos, rastreamento em tempo real e back-office inteligente.',
      challenge: 'Operações logísticas dependem de processamento manual de documentos (NF-e, CTe, DAMDFE), levando até 20 minutos por documento. O objetivo era reduzir esse tempo para menos de 30 segundos com visibilidade total da cadeia.',
      solution: 'Desenvolvido o EnerCore Engine — uma IA organizacional que automatiza a validação de documentos logísticos, habilita chat inteligente sobre documentos e fornece monitoramento em tempo real com reconciliação automática e detecção de erros.',
      outcome: 'Redução do tempo de processamento de documentos de ~20 minutos para ~30 segundos. Entregue plataforma SaaS completa conectando embarcadores, transportadores e motoristas com rastreabilidade total e back-office automatizado.',
    },
  },
  {
    slug: 'fretador',
    image: '/images/fretador.png',
    images: [
      '/images/fretador.png',
      '/images/fretador-2.png',
      '/images/fretador-3.png',
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'Express', 'React'],
    dateCreated: '2024',
    featured: true,
    externalLink: 'https://fretador.com.br',
    en: {
      title: 'Fretador',
      description: 'Mobile freight management DMS (Delivery Management System) for TRC Logistics — restructured from the ground up with MERN stack on AWS.',
      challenge: 'Inherited an unfinished React Native app developed by a third-party software house, with significant technical debt, no documentation, no processes and non-compliance with Google Store and LGPD requirements.',
      solution: 'Restructured the entire development department from scratch: implemented Jira + Confluence, migrated to a MERN ecosystem on AWS, rebuilt the mobile app with proper architecture, LGPD compliance, and AI-powered document validation and freight matching.',
      outcome: 'Delivered a complete, compliant freight management platform. The app was successfully published on the Google Play Store. The client (GZ LOG) reported significantly improved team efficiency and centralized operational control.',
    },
    pt: {
      title: 'Fretador',
      description: 'Sistema mobile de gestão de fretes (DMS) para a TRC Logistics — reestruturado do zero com stack MERN na AWS.',
      challenge: 'Herdei um app React Native inacabado desenvolvido por software house terceirizada, com débito técnico significativo, sem documentação, sem processos e fora dos requisitos da Google Store e da LGPD.',
      solution: 'Reestruturei todo o setor de desenvolvimento: implementei Jira + Confluence, migrei para ecossistema MERN na AWS, reconstruí o app mobile com arquitetura adequada, conformidade LGPD e validação de documentos e matching de fretes com IA.',
      outcome: 'Plataforma de gestão de fretes completa e em conformidade entregue. App publicado com sucesso na Google Play Store. O cliente (GZ LOG) reportou melhora significativa na eficiência da equipe e controle centralizado das operações.',
    },
  },
  {
    slug: 'reciclelink',
    image: '/images/reciclelink.png',
    images: [
      '/images/reciclelink.png',
    ],
    technologies: ['Generative AI', 'React', 'Node.js', 'AWS', 'Computer Vision', 'WhatsApp API'],
    dateCreated: '2023',
    featured: true,
    award: {
      label: '1st Place — Hack for Change 2023',
      organization: 'Alura + FIAP',
      organizationUrl: 'https://www.alura.com.br',
      year: '2023',
      position: '1st',
    },
    sponsors: [
      { name: 'Alura', url: 'https://www.alura.com.br' },
      { name: 'FIAP', url: 'https://www.fiap.com.br' },
    ],
    en: {
      title: 'RecicleLink',
      description: '1st Place at Hack for Change 2023 — hackathon organized by Alura and FIAP. A WhatsApp-based platform connecting recycling cooperatives with waste generators.',
      challenge: 'Recycling cooperatives and waste generators had no efficient way to connect. Manual, fragmented processes made it hard to scale sustainable practices in communities like Embu das Artes.',
      solution: 'Built a WhatsApp chatbot powered by Generative AI and Computer Vision to connect recycling generators with cooperatives. Used AWS infrastructure and React for the web dashboard, enabling community-scale recycling without requiring smartphone apps.',
      outcome: 'Won 1st place at Hack for Change 2023 — a national hackathon organized by Alura and FIAP — beating hundreds of teams. The solution was recognized for its practical, accessible approach to sustainable community impact.',
    },
    pt: {
      title: 'RecicleLink',
      description: '1º lugar no Hack for Change 2023 — hackathon organizado pela Alura e FIAP. Plataforma via WhatsApp conectando cooperativas de reciclagem com geradores de resíduos.',
      challenge: 'Cooperativas de reciclagem e geradores de resíduos não tinham uma forma eficiente de se conectar. Processos manuais e fragmentados dificultavam a escala de práticas sustentáveis em comunidades como Embu das Artes.',
      solution: 'Desenvolvido um chatbot no WhatsApp com IA Generativa e Visão Computacional para conectar geradores de recicláveis com cooperativas. Infraestrutura AWS e dashboard React, permitindo reciclagem em escala comunitária sem necessidade de app.',
      outcome: 'Conquistou o 1º lugar no Hack for Change 2023 — hackathon nacional organizado pela Alura e FIAP — superando centenas de equipes. A solução foi reconhecida pela abordagem prática e acessível para impacto sustentável comunitário.',
    },
  },
  {
    slug: 'scooby-doo',
    image: '/images/scooby.png',
    images: [
      '/images/scooby.png',
    ],
    technologies: ['Image Recognition', 'React Native', 'Google Cloud', 'Google Gemini', 'AI'],
    dateCreated: '2024',
    featured: true,
    award: {
      label: '6th Place — AI Immersion 2024 (Top 0.5%)',
      organization: 'Alura + Google',
      organizationUrl: 'https://www.alura.com.br',
      year: '2024',
      position: '6th',
    },
    sponsors: [
      { name: 'Alura', url: 'https://www.alura.com.br' },
      { name: 'Google', url: 'https://google.com' },
    ],
    en: {
      title: '"Scooby-Doo, Where Are You?"',
      description: '6th Place at AI Immersion 2024 by Alura + Google — Top 0.5% among 1,200+ projects. AI-powered pet reunification app using image recognition.',
      challenge: 'During natural disasters, thousands of pets get separated from their owners. Existing solutions were manual, slow, and inaccessible to non-tech-savvy users — making reunification nearly impossible at scale.',
      solution: 'Built an AI-powered mobile app using Google Gemini and Google Cloud Vision to match photos of lost pets with owner records. React Native ensured cross-platform accessibility, and the image recognition pipeline worked with low-quality disaster-context photos.',
      outcome: 'Ranked 6th place at AI Immersion 2024 by Alura + Google — placing in the top 0.5% among over 1,200 projects. Recognized for innovative use of Google AI technologies to solve a real humanitarian problem.',
    },
    pt: {
      title: '"Scooby-Doo, Cadê Você?"',
      description: '6º lugar na Imersão IA 2024 da Alura + Google — Top 0,5% entre mais de 1.200 projetos. App de reencontro de pets com IA e reconhecimento de imagens.',
      challenge: 'Durante desastres naturais, milhares de pets se separam de seus donos. As soluções existentes eram manuais, lentas e inacessíveis para usuários não técnicos — tornando o reencontro quase impossível em escala.',
      solution: 'App mobile com Google Gemini e Google Cloud Vision para cruzar fotos de pets perdidos com registros de donos. React Native garantiu acessibilidade multiplataforma, e o pipeline de reconhecimento funcionava com fotos de baixa qualidade em contexto de desastre.',
      outcome: 'Alcançou o 6º lugar na Imersão IA 2024 da Alura + Google — top 0,5% entre mais de 1.200 projetos. Reconhecido pelo uso inovador das tecnologias de IA do Google para resolver um problema humanitário real.',
    },
  },
];

export default projects;

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectData[] {
  return projects.filter((p) => p.featured);
}
