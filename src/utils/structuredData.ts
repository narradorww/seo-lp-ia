// utils/structuredData.ts
import { Person, WithContext, Organization, WebSite, BreadcrumbList, FAQPage, Thing, ItemList, CreativeWork } from 'schema-dts';

/**
 * Project data structure for generating structured data
 */
export interface ProjectData {
  title: string;
  description: string;
  challenge?: string;
  outcome?: string;
  image: string;
  technologies: string[];
  award?: string;
  dateCreated?: string;
  url?: string;
}

/**
 * Generates comprehensive Person structured data for Rodrigo Alexandre
 * Optimized for AI Engine Optimization (AEO) and traditional SEO
 */
export function generatePersonStructuredData(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rodrigo Alexandre",
    "alternateName": "Rodrigo Alexandre da Silva",
    "jobTitle": "Senior Mobile Developer & AI Specialist",
    "description": "Brazilian Mobile Developer with 20+ years in technology, specializing in JavaScript/TypeScript, React Native, and AI-powered solutions. Award-winning developer recognized by Google, Alura, and FIAP for innovative mobile applications and AI integration.",
    "url": "https://rodrigoalexandre.dev",
    "image": "https://rodrigoalexandre.dev/rodrigo-avatar.jpeg",
    "email": "mailto:contact@rodrigoalexandre.dev",
    "sameAs": [
      "https://www.linkedin.com/in/rodrigoalexandre79/",
      "https://github.com/rodrigoalexandre",
      "https://medium.com/@rodrigoalexandre",
      "https://twitter.com/rodrigoalexandre79"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React Native",
      "React.js",
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "Generative AI",
      "Mobile Development",
      "Full Stack Development",
      "Machine Learning",
      "Computer Vision",
      "Clean Code",
      "SOLID Principles",
      "Agile Methodologies",
      "Team Leadership"
    ],
    "knowsLanguage": [
      {
        "@type": "Language",
        "name": "Portuguese",
        "alternateName": "pt-BR"
      },
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en-US"
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Mobile Application Developer",
      "occupationalCategory": "15-1252.00",
      "skills": "React Native, TypeScript, AI Integration, Mobile Development, Full Stack Development",
      "experienceRequirements": "Senior Level - 20+ years"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressRegion": "São Paulo"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "FIAP",
      "sameAs": "https://www.fiap.com.br/"
    },
    "award": [
      "Google AI Innovation Award - 2024",
      "First Place - Hack for Change 2023 (Alura + FIAP)",
      "Top 0.5% - AI Immersion 2024 (Alura + Google)",
      "FIAP AI Excellence Recognition"
    ]
  };
}

export function generateWebsiteStructuredData(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rodrigo Alexandre - Mobile Developer Portfolio",
    "url": "https://rodrigoalexandre.dev",
    "description": "Professional portfolio showcasing mobile development expertise, AI-powered solutions, and award-winning projects",
    "author": {
      "@type": "Person",
      "name": "Rodrigo Alexandre"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://rodrigoalexandre.dev/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    } as any
  };
}

export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateFAQStructuredData(): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What technologies does Rodrigo Alexandre specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo Alexandre specializes in JavaScript, TypeScript, React Native, React.js, Next.js, Node.js, MongoDB, AWS, and Generative AI solutions for mobile and web development."
        }
      },
      {
        "@type": "Question",
        "name": "What awards has Rodrigo Alexandre received?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo has received awards from Google, Alura, and FIAP for innovative AI projects focusing on sustainability and image recognition solutions."
        }
      },
      {
        "@type": "Question",
        "name": "How many years of experience does Rodrigo Alexandre have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo Alexandre has over 20 years of experience in technology and more than 3 years focused specifically on software development, with expertise in mobile development and team leadership."
        }
      },
      {
        "@type": "Question",
        "name": "What services does Rodrigo Alexandre offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo offers mobile app development, full-stack web development, AI integration, team leadership, code quality improvement, and technical consulting services."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Rodrigo Alexandre different from other developers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo combines 20+ years of technology experience with cutting-edge AI expertise. He's an award-winning developer recognized by Google, Alura, and FIAP for innovative solutions. His unique blend of mobile development mastery, AI integration skills, and proven team leadership sets him apart in delivering high-quality, scalable applications."
        }
      },
      {
        "@type": "Question",
        "name": "Is Rodrigo Alexandre available for new projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Rodrigo Alexandre is available for freelance projects and consulting work. He specializes in React Native mobile development, full-stack web applications, and AI integration. Contact him through LinkedIn or email for project inquiries and availability."
        }
      },
      {
        "@type": "Question",
        "name": "What is Rodrigo Alexandre's approach to AI integration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo takes a practical, user-centric approach to AI integration, focusing on solving real-world problems. His award-winning projects demonstrate expertise in image recognition, sustainability solutions, and generative AI. He emphasizes ethical AI development, scalable architecture, and seamless integration with existing mobile and web platforms."
        }
      },
      {
        "@type": "Question",
        "name": "What notable projects has Rodrigo Alexandre worked on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo has developed award-winning projects including AI-powered sustainability solutions recognized by Alura, image recognition systems that earned Google's AI Innovation Award, and various React Native mobile applications. His portfolio spans e-commerce, fintech, healthcare, and environmental technology sectors."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Rodrigo Alexandre for work opportunities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact Rodrigo Alexandre through LinkedIn at linkedin.com/in/rodrigoalexandre79/, via GitHub at github.com/rodrigoalexandre, or through his professional email. He responds promptly to project inquiries and is open to discussing both short-term and long-term collaborations."
        }
      },
      {
        "@type": "Question",
        "name": "What development methodologies does Rodrigo Alexandre use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo follows agile development methodologies with a strong emphasis on clean code, SOLID principles, and test-driven development. He uses modern DevOps practices, CI/CD pipelines, and maintains high code quality standards through code reviews, automated testing, and comprehensive documentation."
        }
      },
      {
        "@type": "Question",
        "name": "What industries has Rodrigo Alexandre worked with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rodrigo has extensive experience across multiple industries including technology, e-commerce, fintech, healthcare, education, and environmental sustainability. His versatile skill set allows him to quickly adapt to different domain requirements and deliver tailored solutions for various business needs."
        }
      },
      {
        "@type": "Question",
        "name": "Does Rodrigo Alexandre work with remote teams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Rodrigo Alexandre has extensive experience working with distributed remote teams. He's skilled in remote collaboration tools, async communication, and maintaining high productivity in remote environments. He's comfortable working across different time zones and has successfully led remote development teams."
        }
      }
    ]
  };
}

export function generateOrganizationStructuredData(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rodrigo Alexandre Development Services",
    "url": "https://rodrigoalexandre.dev",
    "logo": "https://rodrigoalexandre.dev/rodrigo-avatar.jpeg",
    "description": "Professional mobile and web development services specializing in React Native, TypeScript, and AI-powered solutions",
    "founder": {
      "@type": "Person",
      "name": "Rodrigo Alexandre"
    },
    "sameAs": [
      "https://www.linkedin.com/in/rodrigoalexandre79/",
      "https://github.com/rodrigoalexandre"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English"]
    }
  };
}

/**
 * Generates structured data for portfolio projects
 * This helps AI engines understand the context, achievements, and technical details of each project
 *
 * @param projects - Array of project data
 * @returns ItemList schema with enriched CreativeWork items
 */
export function generateProjectsStructuredData(projects: ProjectData[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Projects by Rodrigo Alexandre",
    "description": "Award-winning mobile development and AI projects showcasing technical expertise and problem-solving abilities",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((project, index) => {
      const creativeWork: CreativeWork & { position: number } = {
        "@type": "CreativeWork",
        "position": index + 1,
        "name": project.title,
        "description": project.description,
        "image": `https://rodrigoalexandre.dev${project.image}`,
        "keywords": project.technologies.join(", "),
        "author": {
          "@type": "Person",
          "name": "Rodrigo Alexandre",
          "url": "https://rodrigoalexandre.dev"
        },
        "creator": {
          "@type": "Person",
          "name": "Rodrigo Alexandre"
        },
        "about": project.challenge ? {
          "@type": "Thing",
          "name": "Project Challenge",
          "description": project.challenge
        } : undefined,
      };

      // Add optional fields if present
      if (project.award) {
        creativeWork.award = project.award;
      }

      if (project.dateCreated) {
        creativeWork.dateCreated = project.dateCreated;
      }

      if (project.url) {
        creativeWork.url = project.url;
      }

      // Add outcome as abstract/summary
      if (project.outcome) {
        creativeWork.abstract = project.outcome;
      }

      return creativeWork;
    })
  };
}