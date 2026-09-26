import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ArrowUpRight, Gamepad2, Play, Keyboard, Smartphone } from 'lucide-react';
import { games } from '@/data/games';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Locadora de Games',
  description: 'Pegue um jogo na prateleira. Experimentos autorais de Rodrigo Alexandre, com espírito de locadora e partidas grátis no navegador.',
  alternates: { canonical: 'https://rodrigoalexandre.dev/games', languages: {} },
  openGraph: {
    title: 'Locadora de Games — Rodrigo Alexandre',
    description: 'Só mais uma partida. Jogos autorais, direto no navegador.',
    url: 'https://rodrigoalexandre.dev/games',
    images: [{ url: 'https://rodrigoalexandre.dev/arcade/macunaima/assets/macunaima.png', width: 1376, height: 768, alt: 'Macunaíma — A trilha das saúvas' }],
    locale: 'pt_BR',
  },
  twitter: { card: 'summary_large_image', title: 'Locadora de Games — Rodrigo Alexandre', description: 'Só mais uma partida. Jogos autorais, direto no navegador.', images: ['https://rodrigoalexandre.dev/arcade/macunaima/assets/macunaima.png'] },
};

export default function GamesPage() {
  const featured = games[0];
  return (
    <div className={styles.store} lang="pt-BR">
      <header className={styles.header}>
        <Link href="/" className={styles.author}><ArrowLeft size={15} /><span>RODRIGO ALEXANDRE<span className={styles.dev}>.DEV</span></span></Link>
        <span className={styles.headerNote}>UM LABORATÓRIO DISFARÇADO DE LOCADORA</span>
        <a href="#catalogo" className={styles.headerLink}>Ver acervo <ArrowDown size={14} /></a>
      </header>
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="store-title">
          <div className={styles.heroCopy}>
            <div className={styles.storeLabel}><Gamepad2 size={22} /><span>LOCADORA <b>DO RODRIGO</b></span></div>
            <p className={styles.kicker}>ESCOLHA SUA PRÓXIMA AVENTURA</p>
            <h1 id="store-title">Só mais<br />uma <span>partida.</span></h1>
            <p className={styles.description}>O ritual de escolher uma fita.<br />A liberdade de jogar agora.</p>
            <p className={styles.secondary}>Meus experimentos em criação de games, numa prateleira aberta para todo mundo.</p>
            <a href="#catalogo" className={styles.primary}>EXPLORAR A PRATELEIRA <ArrowDown size={17} /></a>
            <div className={styles.smallPrint}><span className={styles.dot} /> ABERTA 24H <span>·</span> SEM CADASTRO <span>·</span> SEM DEVOLUÇÃO</div>
          </div>
          <div className={styles.display}>
            <div className={styles.displayGrid} aria-hidden="true" />
            <span className={styles.displayCaption}>ESCOLHA DA CASA / VOL. 01</span>
            <a className={styles.cartridge} href={`/games/${featured.slug}`} aria-label={`Jogar ${featured.title}: ${featured.subtitle}`}>
              <div className={styles.spine}><span>RA / ORIGINAL</span><strong>MACUNAÍMA</strong><span>001</span></div>
              <div className={styles.boxFront}>
                <div className={styles.boxTop}><span>RA GAMES</span><span>ARCADE BRASILEIRO</span></div>
                <div className={styles.cover}><Image src={featured.cover} alt="Capa ilustrada de Macunaíma na floresta amazônica, cercado por saúvas" width={1376} height={768} priority sizes="(max-width: 700px) 85vw, 440px" /></div>
                <div className={styles.boxTitle}><span>INSPIRADO EM MÁRIO DE ANDRADE</span><strong>MACUNAÍMA</strong><p>A TRILHA DAS SAÚVAS</p></div>
                <div className={styles.boxBottom}><Gamepad2 size={22} /><span>1 JOGADOR<br /><b>FEITO NO BRASIL</b></span><span className={styles.boxNumber}>001</span></div>
              </div>
              <div className={styles.sticker}>JOGUE<br /><b>GRÁTIS</b></div>
            </a>
            <div className={styles.displayFoot}><span>INSIRA A CURIOSIDADE. APERTE PLAY.</span><ArrowUpRight size={18} /></div>
          </div>
        </section>
        <div className={styles.ticker} aria-label="Jogos autorais, grátis no navegador"><span>PEQUENOS JOGOS</span><span aria-hidden="true">✳</span><span>GRANDES IDEIAS</span><span aria-hidden="true">✳</span><span>FEITOS PARA JOGAR</span><span aria-hidden="true">✳</span><span>DIRETO NO NAVEGADOR</span></div>
        <section id="catalogo" className={styles.catalog} aria-labelledby="catalog-title">
          <div className={styles.sectionHead}><div><p className={styles.kicker}>ACERVO AUTORAL</p><h2 id="catalog-title">Na prateleira<span>.</span></h2></div><span className={styles.inventory}>{String(games.length).padStart(2, '0')} JOGO DISPONÍVEL <span className={styles.dot} /></span></div>
          {games.map(game => (
            <article className={styles.game} key={game.slug}>
              <a href={`/games/${game.slug}`} className={styles.gameCover} aria-label={`Jogar ${game.title}`}><Image src={game.cover} alt={`Capa de ${game.title}`} width={1376} height={768} sizes="(max-width: 700px) 90vw, 500px" /><span className={styles.coverPlay}><Play size={21} fill="currentColor" /></span></a>
              <div className={styles.gameDetails}>
                <div className={styles.gameTop}><span>FITA Nº {game.id}</span><span className={styles.available}>DISPONÍVEL</span></div>
                <h3>{game.title}</h3><p className={styles.subtitle}>{game.subtitle}</p><p className={styles.gameDescription}>{game.description}</p>
                <div className={styles.tags}><span>{game.genre}</span><span>{game.players}</span><span><Keyboard size={15} /><Smartphone size={13} /> Teclado e toque</span></div>
                <a className={styles.playButton} href={`/games/${game.slug}`}><Play size={14} fill="currentColor" /> JOGAR AGORA <ArrowUpRight size={18} /></a>
              </div>
            </article>
          ))}
          <div className={styles.shelfEnd}><span>FIM DA PRATELEIRA. POR ENQUANTO.</span><p>A coleção cresce a cada novo experimento.</p><span className={styles.shelfSymbol} aria-hidden="true">＋</span></div>
        </section>
        <section className={styles.about}><span className={styles.aboutNumber}>RA / LAB</span><h2>Aprender fazendo.<br /><span>E deixar você jogar.</span></h2><div><p>Esta locadora é meu caderno de experimentos em criação de games. Cada jogo nasce de uma ideia, de um exercício e da vontade de transformar código em diversão.</p><Link href="/">Conheça quem está por trás <ArrowUpRight size={16} /></Link></div></section>
      </main>
      <footer className={styles.footer}><span>© {new Date().getFullYear()} RODRIGO ALEXANDRE</span><span>JOGOS AUTORAIS · DIVERSÃO SEM PRAZO DE DEVOLUÇÃO</span><Link href="/">VOLTAR AO PORTFÓLIO ↗</Link></footer>
    </div>
  );
}
