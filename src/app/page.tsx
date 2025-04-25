import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import ProjectList from '@components/Portfolio/ProjectList';
import HeroSection from '@components/HeroSection/HeroSection';
import VisitorStats from '@components/Stats/VisitorStats';
import styles from './page.module.css';
import CookieNotice from '@/components/Layout/CookieNotice';
import ProfileSection from '@/components/Portfolio/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection/ProjectSection';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <Header />
          <HeroSection />

      <main className={styles.mainContent}>
        <section className={styles.portfolioArea}>
        <ProfileSection />
        <ProjectsSection />
        </section>
      </main>

      <VisitorStats /> {/* flutuando no canto */}
      <Footer />
      <CookieNotice />
    </div>
  );
}
