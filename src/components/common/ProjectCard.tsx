'use client';

import { Badge } from 'lucide-react';
import Image from 'next/image';
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
    // Generate descriptive alt text for better accessibility and AI understanding
    const altText = `Screenshot of ${title} project showing ${description.toLowerCase()}`;
    
    return (
        <article className={`${styles.projectGrid} ${isReversed ? styles.reversed : ''}`} itemScope itemType="https://schema.org/CreativeWork">
            <div className={styles.imageWrapper}>
                <Image 
                    src={image} 
                    alt={altText}
                    width={400}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    itemProp="image"
                />
            </div>
            <div className={styles.content}>
                <header>
                    <h3 className={styles.projectTitle} itemProp="name">{title}</h3>
                    <p className={styles.projectDescription} itemProp="description">{description}</p>
                </header>
                
                <section aria-labelledby={`challenge-${title.replace(/\s+/g, '-').toLowerCase()}`}>
                    <h4 id={`challenge-${title.replace(/\s+/g, '-').toLowerCase()}`} className={styles.sectionHeader}>Challenge</h4>
                    <p className={styles.textBlock}>{challenge}</p>
                </section>
                
                <section aria-labelledby={`outcome-${title.replace(/\s+/g, '-').toLowerCase()}`}>
                    <h4 id={`outcome-${title.replace(/\s+/g, '-').toLowerCase()}`} className={styles.sectionHeader}>Outcome</h4>
                    <p className={styles.textBlock}>{outcome}</p>
                </section>
                
                <footer>
                    <div className={styles.techList} role="list" aria-label="Technologies used">
                        {technologies.map((tech) => (
                            <span key={tech} role="listitem" itemProp="keywords">{tech}</span>
                        ))}
                    </div>
                </footer>
            </div>
        </article>
    );
}
