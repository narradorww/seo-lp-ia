'use client';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
  <div className={styles.logo}>
    Rodrigo<span className={styles.highlight}>Alexandre</span>
  </div>

  <nav className={styles.nav}>
    <ul className={styles.navList}>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#projects">Projects</a></li>
      {/* <li><a href="#magic-mirror">Magic Mirror</a></li> */}
      <li><a href="#achievements">Achievements</a></li>
    </ul>
    <a href="#contact" className={styles.contactButton}>Contact Me</a>
  </nav>
</header>

  );
}
