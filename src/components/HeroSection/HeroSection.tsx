'use client';

import { useRotatingWords } from '@/hooks/useRotatingWords';
import Image from 'next/image';
import styles from './HeroSection.module.css';
import { ArrowDown } from 'lucide-react';



export default function HeroSection() {
    const word = useRotatingWords([
        'innovative',
        'impactful',
        'enriching',
        'educational',
        'inclusive',
        'AI-powered',
        'sustainable',
        'scalable',
        'accessible'
      ]);

    const greeting = useRotatingWords([
        'Hello,',
        'Olá,',
        'Bonjour,',
        'Hola,',
        'Ciao,',
        'Привет,',
        'こんにちは,',
        '안녕하세요,',
        '你好,',
        'مرحبا,',
    ]);

  return (
    <section className={styles.hero} aria-label="Hero section introducing Rodrigo Alexandre">
      {/* Fundo + padrão + brilhos */}
      <div className={styles.background} aria-hidden="true"></div>
      <div className={styles.pattern} aria-hidden="true"></div>
      <div className={styles.glowLeft} aria-hidden="true"></div>
      <div className={styles.glowRight} aria-hidden="true"></div>

      {/* Conteúdo */}
      <div className={styles.containerHero}>
        <div className={styles.content}>
          {/* Avatar */}
          <div className={styles.avatarCard}>
            <Image
              src="/rodrigo-avatar.jpeg"
              alt="Professional headshot of Rodrigo Alexandre, Brazilian Mobile Developer specialized in React Native and AI"
              className={styles.avatar}
              width={226}
              height={226}
              sizes="(max-width: 480px) 140px, (max-width: 768px) 180px, 226px"
              priority
            />
            <a
              href="/Rodrigo_Alexandre_CV.pdf"
              download
              className={styles.downloadBtn}
              aria-label="Download Rodrigo Alexandre's CV in PDF format"
            >
              Download CV
            </a>
          </div>

          {/* Texto */}
          <div className={styles.textBlock}>
            <p className={styles.subtitle}>Mobile Developer</p>
            <h1 className={styles.title}>
              Building <span className={styles.highlight} aria-live="polite" aria-atomic="true">{word}</span> mobile experiences
            </h1>
            <p className={styles.description}>
              <span aria-label="Greeting in multiple languages" aria-live="polite" aria-atomic="true" className={styles.highlight}>{greeting}</span>{' '}
              I&apos;m Rodrigo Alexandre, a Brazilian Mobile Developer with 20+ years in
              technology, specializing in JavaScript, TypeScript, React Native, and
              AI-powered solutions that solve real-world problems.
            </p>

            <div className={styles.buttons}>
              <a href="#projects" className={styles.primaryBtn}>
                View My Projects
              </a>
              <a href="#contact" className={styles.outlineBtn}>
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      
      {/* Seta scroll */}
      <div className={styles.scrollDown} role="navigation" aria-label="Scroll to next section">
        <a href="#profile" aria-label="Scroll down to profile section">
          <ArrowDown size={24} />
        </a>
      </div>

    </section>
  );
}
