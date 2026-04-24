'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Header.module.css';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus trap inside nav when open on mobile
  useEffect(() => {
    if (!isMenuOpen) return;
    const nav = navRef.current;
    if (!nav) return;
    const focusable = nav.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    nav.addEventListener('keydown', trap);
    first?.focus();
    return () => nav.removeEventListener('keydown', trap);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Rodrigo Alexandre - Home">
        Rodrigo<span className={styles.highlight}>Alexandre</span>
      </Link>

      <button
        ref={toggleRef}
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="main-nav"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav
        id="main-nav"
        ref={navRef}
        className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
        aria-label="Main navigation"
      >
        <ul className={styles.navList}>
          {isDashboard ? (
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
          ) : (
            <>
              <li><a href="#profile" onClick={closeMenu}>Profile</a></li>
              <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
              <li><a href="#achievements" onClick={closeMenu}>Achievements</a></li>
              <li><Link href="/internal-store" onClick={closeMenu}>Apps</Link></li>
            </>
          )}
        </ul>
        {!isDashboard ? (
          <a href="#contact" className={styles.contactButton} onClick={closeMenu}>Contact Me</a>
        ) : (
          <Link href="/" className={styles.contactButton} onClick={closeMenu}>Back to Site</Link>
        )}
      </nav>

      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
}
