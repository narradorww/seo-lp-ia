// src/components/Portfolio/ProfileCard.tsx

import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Rodrigo Alexandre</h1>
      <p className={styles.description}>
        Desenvolvedor React Native com foco em mobile, cloud e performance. Especialista em transformar ideias em apps escaláveis. Procura por alguém que resolve e entrega? Aqui está.
      </p>
    </div>
  );
}
