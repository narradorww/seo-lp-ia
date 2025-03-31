
'use client';

import { useState } from 'react';
import styles from './Header.module.css';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>RODRIGOALEXANDRE.DEV</h1>

      <nav className={styles.nav}>
        <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
          <li>
            <a href="https://github.com/narradorww" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rodrigoalexandre79/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
          </li>
          <li>
            <a href="https://medium.com/@rodrigoalexandre" target="_blank" rel="noopener noreferrer">
              <FaMedium /> Medium
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}