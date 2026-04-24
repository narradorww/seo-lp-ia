'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '../common/ProjectCard';
import styles from './ProjectsSection.module.css';
import { ArrowDown } from 'lucide-react';
import projects from '@/data/projects';
import { generateRichProjectsStructuredData } from '@/utils/structuredData';

const structuredData = generateRichProjectsStructuredData(projects);

export default function ProjectsSection() {
  const [lang, setLang] = useState<'en' | 'pt'>('en');

  useEffect(() => {
    const userLang = navigator.language || navigator.languages?.[0] || 'en';
    setLang(userLang.startsWith('pt') ? 'pt' : 'en');
  }, []);

  const displayed = ['vibe-beneficios', 'moveintech', 'reciclelink', 'scooby-doo', 'fretador'];
  const visibleProjects = displayed
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  const heading = lang === 'pt'
    ? { title: 'Projetos', highlight: 'em Destaque', desc: 'Uma seleção dos meus trabalhos mais impactantes, com foco em desenvolvimento mobile e soluções com IA.' }
    : { title: 'Featured', highlight: 'Projects', desc: 'A selection of my most impactful work, showcasing expertise in mobile development and AI-powered solutions.' };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="projects-heading" className={styles.sectionTitle}>
            {heading.title} <span className={styles.highlight}>{heading.highlight}</span>
          </h2>
          <p className={styles.description}>{heading.desc}</p>
        </header>

        <div className={styles.grid} aria-label="Projects">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} lang={lang} variant="standard" />
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
