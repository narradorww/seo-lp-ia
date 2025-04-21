'use client';

import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
      <span>Carregando...</span>
    </div>
  );
}
