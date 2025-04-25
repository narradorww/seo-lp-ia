'use client';

import { useState } from 'react';
import styles from './LeadEnrichmentModal.module.css';

interface Props {
  onClose: () => void;
  onSubmit: (input: string) => void;
}

export default function LeadEnrichmentModal({ onClose, onSubmit }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim());
    onClose();
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Enrich Your Visit</h3>
        <p>
          Want to see your pin on the map? Help us enrich your visit by sharing something valuable:
          an email, Github or LinkedIn profile, phone number, or social handle. This helps us rank you better.
        </p>

        <input
          type="text"
          placeholder="Add your email, LinkedIn, or WhatsApp to boost your score"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className={styles.actions}>
          <button onClick={handleSubmit}>Confirm</button>
          <button onClick={onClose} className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
