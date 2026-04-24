import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Trophy, Calendar } from 'lucide-react';
import projects, { getProjectBySlug } from '@/data/projects';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const headersList = await headers();
  const lang = headersList.get('accept-language')?.startsWith('pt') ? 'pt' : 'en';
  const t = project[lang];

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      images: [{ url: project.image, width: 800, height: 600, alt: t.title }],
      type: 'website',
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const headersList = await headers();
  const lang = headersList.get('accept-language')?.startsWith('pt') ? 'pt' : 'en';
  const t = project[lang];

  const ui = {
    back: lang === 'pt' ? '← Voltar aos projetos' : '← Back to projects',
    challenge: lang === 'pt' ? 'O Desafio' : 'The Challenge',
    solution: lang === 'pt' ? 'A Solução' : 'The Solution',
    outcome: lang === 'pt' ? 'Resultado' : 'Outcome',
    tech: lang === 'pt' ? 'Tecnologias' : 'Technologies',
    gallery: lang === 'pt' ? 'Screenshots' : 'Screenshots',
    viewProject: lang === 'pt' ? 'Ver projeto' : 'View project',
    awardedBy: lang === 'pt' ? 'Premiado por' : 'Awarded by',
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: t.title,
    description: t.description,
    image: `https://rodrigoalexandre.dev${project.image}`,
    dateCreated: project.dateCreated,
    author: {
      '@type': 'Person',
      name: 'Rodrigo Alexandre',
      url: 'https://rodrigoalexandre.dev',
    },
    keywords: project.technologies.join(', '),
    url: `https://rodrigoalexandre.dev/projects/${project.slug}`,
    ...(project.award && {
      award: project.award.label,
      sponsor: project.sponsors?.map((s) => ({
        '@type': 'Organization',
        name: s.name,
        url: s.url,
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className={styles.page}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/#projects" className={styles.backLink}>
            <ArrowLeft size={16} aria-hidden="true" />
            {ui.back}
          </Link>
        </div>

        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroText}>
            {project.award && (
              <div className={styles.awardBadge}>
                <Trophy size={14} aria-hidden="true" />
                <span>{ui.awardedBy} </span>
                {project.sponsors?.map((s, i) => (
                  <span key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.awardOrg}>
                      {s.name}
                    </a>
                    {i < (project.sponsors?.length ?? 0) - 1 && ' + '}
                  </span>
                ))}
                <span className={styles.awardLabel}> — {project.award.label}</span>
              </div>
            )}

            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.description}>{t.description}</p>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <Calendar size={14} aria-hidden="true" />
                {project.dateCreated}
              </span>
            </div>

            <div className={styles.techList}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.techBadge}>{tech}</span>
              ))}
            </div>

            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.externalBtn}
              >
                {ui.viewProject}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>

          <div className={styles.heroImage}>
            <Image
              src={project.image}
              alt={t.title}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
        </header>

        {/* Content sections */}
        <main id="main-content" className={styles.content}>
          <section className={styles.section} aria-labelledby="challenge-heading">
            <h2 id="challenge-heading" className={styles.sectionTitle}>{ui.challenge}</h2>
            <p className={styles.sectionText}>{t.challenge}</p>
          </section>

          <section className={styles.section} aria-labelledby="solution-heading">
            <h2 id="solution-heading" className={styles.sectionTitle}>{ui.solution}</h2>
            <p className={styles.sectionText}>{t.solution}</p>
          </section>

          <section className={styles.section} aria-labelledby="outcome-heading">
            <h2 id="outcome-heading" className={styles.sectionTitle}>{ui.outcome}</h2>
            <p className={styles.sectionText}>{t.outcome}</p>
          </section>

          {/* Gallery */}
          {project.images.length > 1 && (
            <section className={styles.section} aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className={styles.sectionTitle}>{ui.gallery}</h2>
              <div className={styles.gallery}>
                {project.images.map((img, i) => (
                  <div key={img} className={styles.galleryItem}>
                    <Image
                      src={img}
                      alt={`${t.title} screenshot ${i + 1}`}
                      width={560}
                      height={360}
                      sizes="(max-width: 768px) 100vw, 560px"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* CTA footer */}
        <footer className={styles.cta}>
          <Link href="/#projects" className={styles.ctaLink}>
            <ArrowLeft size={16} aria-hidden="true" />
            {ui.back}
          </Link>
          <a
            href="https://www.linkedin.com/in/rodrigoalexandre79/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLinkedIn}
          >
            {lang === 'pt' ? 'Vamos conversar no LinkedIn' : 'Let\'s connect on LinkedIn'}
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </>
  );
}
