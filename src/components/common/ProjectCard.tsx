'use client';

import { Badge } from 'lucide-react';
import styles from './ProjectCard.module.css';


interface ProjectCardProps {
    title: string;
    description: string;
    challenge: string;
    outcome: string;
    image: string;
    technologies: string[];
    isReversed?: boolean;
}

export default function ProjectCard({
    title,
    description,
    challenge,
    outcome,
    image,
    technologies,
    isReversed = false
}: ProjectCardProps) {
    return (
        <div className={`${styles.projectGrid} ${isReversed ? styles.reversed : ''}`}>
  <div className={styles.imageWrapper}>
    <img src={image} alt={title} />
  </div>
  <div className={styles.content}>
    <h3 className={styles.projectTitle}>{title}</h3>
    <p className={styles.projectDescription}>{description}</p>
    <div className={styles.sectionHeader}>Challenge</div>
    <p className={styles.textBlock}>{challenge}</p>
    <div className={styles.sectionHeader}>Outcome</div>
    <p className={styles.textBlock}>{outcome}</p>
    <div className={styles.techList}>
      {technologies.map((tech) => (
        <span key={tech}>{tech}</span>
      ))}
    </div>
  </div>
</div>

    );
}
