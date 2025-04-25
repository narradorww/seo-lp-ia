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
    <section className={styles.hero}>
      {/* Fundo + padrão + brilhos */}
      <div className={styles.background}></div>
      <div className={styles.pattern}></div>
      <div className={styles.glowLeft}></div>
      <div className={styles.glowRight}></div>

      {/* Conteúdo */}
      <div className={styles.containerHero}>
        <div className={styles.content}>
          {/* Avatar */}
          <div className={styles.avatarCard}>
            <Image
              src="/rodrigo-avatar.jpeg"
              alt="Foto de Rodrigo Alexandre"
              className={styles.avatar}
              width={200}
              height={200}
              priority
            />
            <a
              href="/Rodrigo_Alexandre_CV.pdf"
              download
              className={styles.downloadBtn}
            >
              Baixar CV
            </a>
          </div>

          {/* Texto */}
          <div className={styles.textBlock}>
            <p className={styles.subtitle}>Mobile Developer</p>
            <h1 className={styles.title}>
  Building <span className={styles.highlight}>{word}</span> mobile experiences
</h1>
            <p className={styles.description}>
            <span className={styles.highlight}>{greeting}</span>! I'm Rodrigo Alexandre, a Brazilian Mobile Developer with 20+ years in
              technology, specializing in JavaScript/TypeScript, React Native, and
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
<div className={styles.scrollDown}>
  <a href="#profile">
    <ArrowDown size={24} />
  </a>
</div>

    </section>
  );
}
