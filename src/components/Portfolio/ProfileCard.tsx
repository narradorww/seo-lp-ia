// src/components/Portfolio/ProfileCard.tsx

import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.avatarCard}>
        <img
          src="/rodrigo-avatar.jpeg"
          alt="Foto de Rodrigo Alexandre na Imersao"
          className={styles.avatar}
        />
        <a
          href="/Rodrigo_Alexandre_CV.pdf"
          download
          className={styles.downloadBtn}
        >
          Baixar CV
        </a>
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.name}>Rodrigo Alexandre</h2>
        <p className={styles.role}>Tech Lead | Especialista Mobile & Ferramentas de IA</p>
        <p className={styles.description}>
          Sou um desenvolvedor mobile com mais de 20 anos de experiência em tecnologia, sendo mais de 3 dedicados ao ecossistema React Native. Atuo como Tech Lead em projetos com foco em performance, arquitetura sustentável e inovação com IA generativa. Tenho histórico em liderança técnica, TDD com Jest, interfaces acessíveis e aplicações escaláveis na nuvem (AWS).
        </p>
      </div>
    </div>
  );
}
