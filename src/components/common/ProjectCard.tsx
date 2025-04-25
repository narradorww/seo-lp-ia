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
        <div className={`${styles.card} ${isReversed ? styles.reversed : ''}`}>
            <div className={styles.projectGrid}>
                {/* Image section */}
                <div className={styles.imageWrapper}>
                    <img src={image} alt={title} />
                    <div className={styles.overlay}></div>
                </div>

                {/* Content section */}
                <div className={styles.content}>
                    <h3 className={styles.projectTitle}>{title}</h3>
                    <p className={styles.projectDescription}>{description}</p>

                    <div className={styles.textBlock}>
                        <h4 className={styles.sectionHeader}>The Challenge</h4>
                        <p>{challenge}</p>
                    </div>

                    <div className={styles.textBlock}>
                        <h4 className={styles.sectionHeader}>The Outcome</h4>
                        <p>{outcome}</p>
                    </div>

                    <div className={styles.techList}>
                        {technologies.map(tech => (
                            <Badge key={tech}>{tech}</Badge>
                        ))}
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button className={styles.viewButton}>
                            View Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
