import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import ProfileCard from '@components/Portfolio/ProfileCard';
import ProjectList from '@components/Portfolio/ProjectList';
import MagicMirror from '@components/MagicMirror/MagicMirror';
import VisitorStats from '@components/Stats/VisitorStats';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.mainContent}>
        <section className={styles.portfolioArea}>
          <ProfileCard />
          <ProjectList />
        </section>

        <section className={styles.interactiveArea}>
          <MagicMirror />
          <VisitorStats />
        </section>
      </main>

      <Footer />
    </div>
  );
}