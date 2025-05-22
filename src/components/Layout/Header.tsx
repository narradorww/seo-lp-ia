'use client';

import { useState } from 'react';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Rodrigo<span className={styles.highlight}>Alexandre</span>
      </div>

      <button 
        className={styles.menuToggle} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          <li><a href="#profile" onClick={closeMenu}>Profile</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="#achievements" onClick={closeMenu}>Achievements</a></li>
        </ul>
        <a href="#contact" className={styles.contactButton} onClick={closeMenu}>Contact Me</a>
      </nav>

      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
}
