// utils/structuredData.ts
import { Person, WithContext, Organization, WebSite, BreadcrumbList, FAQPage, Thing } from 'schema-dts';

export function generatePersonStructuredData(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rodrigo Alexandre",
    "jobTitle": "Mobile Developer",
    "description": "Brazilian Mobile Developer with 20+ years in technology, specializing in JavaScript/TypeScript, React Native, and AI-powered solutions",
    "url": "https://rodrigoalexandre.dev",
    "image": "https://rodrigoalexandre.dev/rodrigo-avatar.jpeg",
    "sameAs": [
      "https://www.linkedin.com/in/rodrigoalexandre79/",
      "https://github.com/rodrigoalexandre",
      "https://medium.com/@rodrigoalexandre"
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
      "Full Stack Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "FIAP"
    },
    "award": [
      "Google AI Innovation Award",
      "Alura Sustainability Project Award", 
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
      "target": "https://rodrigoalexandre.dev/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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