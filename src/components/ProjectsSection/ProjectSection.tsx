'use client';

import ProjectCard from '../common/ProjectCard';
import styles from './ProjectsSection.module.css';
import { ArrowDown } from 'lucide-react';

const projects = [
  {
    title: "Fretador (Logistics App)",
    description: "Mobile freight management solution for TRC Logistics",
    challenge: "Taking charge of an unfinished project that required significant refactoring, process implementation, and LGPD compliance to meet industry standards.",
    outcome: "Successfully delivered a complete, compliant freight management platform with improved code quality, enhanced user experience, and increased customer trust.",
    image: "/images/fretador.png",
    technologies: ["React Native", "Next.js", "Node.js", "MongoDB", "AWS"]
  },
  {
    title: "RecicleLink",
    description: "First Place at Hack for Change 2023 (Alura + FIAP)",
    challenge: "Creating a platform to connect recycling cooperatives with waste generators and optimize sorting processes that were inefficient and manual.",
    outcome: "Developed a WhatsApp-based chatbot to assist the Embu das Artes community in connecting recycling generators with cooperatives, promoting more efficient and accessible recycling practices.",
    image: "/images/reciclelink.png",
    technologies: ["Generative AI", "React", "Node.js", "AWS", "Computer Vision"]
  },
  {
    title: "\"Scooby-Doo, Where Are You?\"",
    description: "6th Place at AI Immersion 2024 (Alura + Google)",
    challenge: "Addressing the critical problem of pets getting lost during natural disasters and the difficulty in reuniting them with their owners.",
    outcome: "Created an AI-driven application using image recognition to match lost pets with their owners, recognized among 1200+ projects for its innovative approach.",
    image: "/images/scooby.png",
    technologies: ["Image Recognition", "React Native", "Google Cloud", "Google Gemini"]
  }
];

export default function ProjectsSection() {
  // Generate structured data for projects
  const projectsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Projects by Rodrigo Alexandre",
    "description": "Award-winning mobile development and AI projects",
    "itemListElement": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "image": `https://rodrigoalexandre.dev${project.image}`,
      "keywords": project.technologies.join(", "),
      "author": {
        "@type": "Person",
        "name": "Rodrigo Alexandre"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
        }}
      />
      <section id="projects" className={styles.section} role="main" aria-labelledby="projects-heading">
        <div className={styles.container}>
          <header>
            <h2 id="projects-heading" className={styles.sectionTitle}>Featured <span className={styles.highlight}>Projects</span></h2>
            <p className={styles.description}>
              A selection of my most impactful work, showcasing problem-solving abilities and technical expertise in mobile development and AI solutions.
            </p>
          </header>

          <div className={styles.projectsList} role="list" aria-label="Featured projects">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                challenge={project.challenge}
                outcome={project.outcome}
                image={project.image}
                technologies={project.technologies}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
        
        <div className={styles.scrollDown} role="navigation" aria-label="Navigate to achievements section">
          <a href="#achievements" aria-label="Scroll down to achievements section">
            <ArrowDown size={24} />
          </a>
        </div>
      </section>
    </>
  );
}
