// src/components/MagicMirror/MagicMirror.tsx

'use client';

import { useState } from 'react';
import styles from './MagicMirror.module.css';

export default function MagicMirror() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = async () => {
    setResponse(`Espelho diz: "Vejo que você procura... ${input}"`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Espelho Mágico</h2>
      <p className={styles.subtext}> 🚧 Em construção 🚧</p>
      <p className={styles.subtext}>Faça uma pergunta e veja o que o espelho revela.</p>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua pergunta..."
      />
      <button className={styles.button} onClick={handleAsk}>Perguntar</button>
      {response && <p className={styles.response}>{response}</p>}
    </div>
  );
}
