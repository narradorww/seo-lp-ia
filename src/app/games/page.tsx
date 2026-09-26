import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Gamepad2, Play, Keyboard, Smartphone } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { games } from '@/data/games';
import cardStyles from '@/components/common/ProjectCard.module.css';
import heroStyles from '@/components/HeroSection/HeroSection.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Games & experimentos',
  description: 'Explore os jogos e experimentos autorais de Rodrigo Alexandre. Escolha sua próxima partida e jogue grátis no navegador.',
  alternates: { canonical: 'https://rodrigoalexandre.dev/games', languages: {} },
  openGraph: {
    title: 'Games & experimentos — Rodrigo Alexandre',
    description: 'Só mais uma partida. Jogos autorais, direto no navegador.',
    url: 'https://rodrigoalexandre.dev/games',
    images: [{ url: 'https://rodrigoalexandre.dev/arcade/macunaima/assets/macunaima-otelo.webp', width: 1672, height: 941, alt: 'Macunaíma — A trilha das saúvas' }],
    locale: 'pt_BR',
  },
  twitter: { card: 'summary_large_image', title: 'Games & experimentos — Rodrigo Alexandre', description: 'Só mais uma partida. Jogos autorais, direto no navegador.', images: ['https://rodrigoalexandre.dev/arcade/macunaima/assets/macunaima-otelo.webp'] },
};

export default function GamesPage() {
  const featured = games[0];

  return (
    <div className={styles.store} lang="pt-BR">
      <Header />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="store-title">
          <div className={styles.glowLeft} aria-hidden="true" />
          <div className={styles.glowRight} aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><Gamepad2 size={20} aria-hidden="true" /> Games & experimentos</p>
              <h1 id="store-title">Pequenos jogos.<br /><span>Novas possibilidades.</span></h1>
              <p className={styles.description}>Uma coleção de ideias que viraram jogos. Explore meus experimentos em criação de games e escolha sua próxima partida.</p>
              <a href="#catalogo" className={`${heroStyles.primaryBtn} ${styles.explore}`}>Explorar os jogos <ArrowDown size={17} aria-hidden="true" /></a>
              <p className={styles.note}>Grátis, direto no navegador. Sem cadastro.</p>
            </div>
            <a className={styles.featuredCover} href={`/games/${featured.slug}`} aria-label={`Jogar ${featured.title}: ${featured.subtitle}`}>
              <div className={styles.coverImage}>
                <Image src={featured.cover} alt="Macunaíma e as saúvas na floresta amazônica, em pixel art" width={1672} height={941} priority sizes="(max-width: 768px) 90vw, 540px" />
              </div>
              <div className={styles.coverCaption}><div><span className={styles.featuredLabel}>Em destaque</span><strong>{featured.title}</strong><span>{featured.subtitle}</span></div><span className={styles.playIcon}><Play size={21} fill="currentColor" aria-hidden="true" /></span></div>
            </a>
          </div>
        </section>

        <section id="catalogo" className={styles.catalog} aria-labelledby="catalog-title">
          <div className={styles.sectionHead}>
            <div><h2 id="catalog-title">Explore a <span>coleção</span></h2><p>Escolha um jogo na prateleira e aperte play.</p></div>
            <span className={styles.inventory}>{games.length} jogo disponível</span>
          </div>
          <div className={styles.gameList}>
            {games.map(game => (
              <article className={cardStyles.featured} key={game.slug}>
                <a href={`/games/${game.slug}`} className={`${cardStyles.featuredImage} ${styles.gameImage}`} aria-label={`Jogar ${game.title}`}>
                  <Image src={game.cover} alt={`Capa de ${game.title}`} width={1672} height={941} sizes="(max-width: 768px) 90vw, 580px" />
                </a>
                <div className={cardStyles.featuredContent}>
                  <span className={styles.gameNumber}>Jogo {game.id} · Experimento autoral</span>
                  <div><h3 className={`${cardStyles.featuredTitle} ${styles.gameTitle}`}>{game.title}</h3><p className={styles.subtitle}>{game.subtitle}</p></div>
                  <p className={`${cardStyles.featuredDesc} ${styles.gameDescription}`}>{game.description}</p>
                  <div className={cardStyles.techList}><span className={cardStyles.techBadge}>{game.genre}</span><span className={cardStyles.techBadge}>{game.players}</span><span className={`${cardStyles.techBadge} ${styles.controls}`}><Keyboard size={13} aria-hidden="true" /><Smartphone size={12} aria-hidden="true" /> Teclado e toque</span></div>
                  <div className={cardStyles.actions}><a className={cardStyles.primaryAction} href={`/games/${game.slug}`}><Play size={14} fill="currentColor" aria-hidden="true" /> Jogar agora <ArrowRight size={16} aria-hidden="true" /></a></div>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.shelfEnd}>A coleção cresce a cada novo experimento.</p>
        </section>

        <section className={styles.about}>
          <div><p className={styles.eyebrow}>Aprender fazendo</p><h2>Do código para a <span>diversão.</span></h2></div>
          <div><p>Este espaço reúne meus exercícios e experimentos em criação de games. Cada jogo é uma oportunidade de explorar novas ideias, contar histórias e aprender construindo.</p><Link href="/" className={styles.aboutLink}>Conheça meu trabalho <ArrowRight size={16} aria-hidden="true" /></Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
