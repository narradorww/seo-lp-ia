import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Rodrigo Alexandre. Todos os direitos reservados.</p>
    </footer>
  );
}