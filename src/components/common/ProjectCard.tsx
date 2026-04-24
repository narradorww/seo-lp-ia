'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Trophy, ArrowRight } from 'lucide-react';
import styles from './ProjectCard.module.css';
import type { ProjectData } from '@/data/projects';

interface ProjectCardProps {
  project: ProjectData;
  lang: 'en' | 'pt';
  variant?: 'featured' | 'standard';
}

export default function ProjectCard({ project, lang, variant = 'standard' }: ProjectCardProps) {
  const t = project[lang];
  const altText = `Screenshot of ${t.title} — ${t.description}`;

  if (variant === 'featured') {
    return (
      <article
        className={styles.featured}
        itemScope
        itemType="https://schema.org/CreativeWork"
        itemProp="name"
      >
        <div className={styles.featuredImage}>
          <Image
            src={project.image}
            alt={altText}
            width={560}
            height={360}
            sizes="(max-width: 768px) 100vw, 560px"
            loading="lazy"
            itemProp="image"
          />
        </div>

        <div className={styles.featuredContent}>
          {project.award && (
            <div className={styles.awardBadge} aria-label={`Award: ${project.award.label}`}>
              <Trophy size={14} aria-hidden="true" />
              <span>
                <a
                  href={project.award.organizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.awardOrg}
                >
                  {project.award.organization}
                </a>
                {' — '}{project.award.label}
              </span>
            </div>
          )}

          <h3 className={styles.featuredTitle} itemProp="name">{t.title}</h3>
          <p className={styles.featuredDesc} itemProp="description">{t.description}</p>

          <div className={styles.techList} role="list" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span key={tech} role="listitem" className={styles.techBadge} itemProp="keywords">
                {tech}
              </span>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href={`/projects/${project.slug}`} className={styles.primaryAction}>
              {lang === 'pt' ? 'Ver projeto' : 'View project'}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryAction}
                aria-label={`Open ${t.title} external link`}
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={styles.card}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className={styles.cardImage}>
        <Image
          src={project.image}
          alt={altText}
          width={400}
          height={240}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          itemProp="image"
        />
        {project.award && (
          <div className={styles.cardAwardBadge} aria-label={`Award: ${project.award.label}`}>
            <Trophy size={12} aria-hidden="true" />
            <a
              href={project.award.organizationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.awardOrg}
            >
              {project.award.organization}
            </a>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle} itemProp="name">{t.title}</h3>
        <p className={styles.cardDesc} itemProp="description">{t.description}</p>

        <div className={styles.techList} role="list" aria-label="Technologies used">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} role="listitem" className={styles.techBadge} itemProp="keywords">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={styles.techMore}>+{project.technologies.length - 3}</span>
          )}
        </div>

        <div className={styles.actions}>
          <Link href={`/projects/${project.slug}`} className={styles.primaryAction}>
            {lang === 'pt' ? 'Ver projeto' : 'View project'}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {project.externalLink && (
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryAction}
              aria-label={`Open ${t.title} external link`}
            >
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
