'use client';

import { useEffect, useState } from 'react';
import styles from './CookieNotice.module.css';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie_consent');
    if (!hasConsent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.notice} role="alert">
      <p>
        Este site coleta estatísticas de visita (IP, localização, navegador e referência) para melhorar a experiência. Ao continuar, você concorda com isso.
      </p>
      <button onClick={accept}>Ok, entendi</button>
    </div>
  );
}
