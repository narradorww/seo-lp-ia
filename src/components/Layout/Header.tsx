'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

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
          {isDashboard ? (
            <>
              <li><a href="/" onClick={closeMenu}>Home</a></li>
            </>
          ) : (
            <>
              <li><a href="#profile" onClick={closeMenu}>Profile</a></li>
              <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
              <li><a href="#achievements" onClick={closeMenu}>Achievements</a></li>
              <li><a href="/blog" onClick={closeMenu}>Blog</a></li>
              <li><a href="/internal-store" onClick={closeMenu}>Apps</a></li>
            </>
          )}
        </ul>
        {!isDashboard ? (
          <a href="#contact" className={styles.contactButton} onClick={closeMenu}>Contact Me</a>
        ) : (
          <a href="/" className={styles.contactButton} onClick={closeMenu}>Back to Site</a>
        )}
      </nav>

      {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </header>
  );
}
