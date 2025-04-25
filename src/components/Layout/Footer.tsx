// src/components/Footer/Footer.tsx
'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1 */}
          <div>
            <h3 className={styles.title}>Rodrigo Alexandre</h3>
            <p className={styles.description}>
              Mobile Developer with 20+ years of experience in technology and a passion for innovative solutions.
            </p>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/in/rodrigoalexandre79/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/narradorww" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://medium.com/@rodrigoalexandre" target="_blank" rel="noopener noreferrer">Medium</a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className={styles.navTitle}>Navigation</h3>
            <ul className={styles.navList}>
              <li><a href="#profile">Profile</a></li>
              <li><a href="#projects">Projects</a></li>
              {/* <li><a href="#magic-mirror">Magic Mirror</a></li> */}
              <li><a href="#achievements">Achievements</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className={styles.navTitle}>Contact</h3>
            <p className={styles.description}>
              Interested in working together? Get in touch!
            </p>
            <a href="mailto:rodrigo.anst@gmail.com" className={styles.contactEmail}>
              rodrigo.anst@gmail.com
            </a>
            <p className={styles.location}>Based in Brazil • Available Worldwide</p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Rodrigo Alexandre. All rights reserved.</p>
          <p>Designed and built with passion</p>
        </div>
      </div>
    </footer>
  );
}
