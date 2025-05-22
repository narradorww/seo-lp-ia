'use client';

import { useState } from 'react';
import styles from './LeadEnrichmentModal.module.css';
import { EnrichmentData } from '@/types/visitor';
import { AtSign, Github, Linkedin, Phone, Instagram, Twitter } from 'lucide-react';

interface Props {
  onClose: () => void;
  onSubmit: (input: string, structuredData?: EnrichmentData) => void;
}

interface PlatformOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  prefix?: string;
}

export default function LeadEnrichmentModal({ onClose, onSubmit }: Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const renderIcon = (iconType: string, size: number = 18) => {
    switch(iconType) {
      case 'email':
        return <AtSign size={size} />;
      case 'linkedin':
        return <Linkedin size={size} />;
      case 'github':
        return <Github size={size} />;
      case 'twitter':
        return <Twitter size={size} />;
      case 'instagram':
        return <Instagram size={size} />;
      case 'phone':
        return <Phone size={size} />;
      default:
        return <AtSign size={size} />;
    }
  };

  const platforms: PlatformOption[] = [
    { 
      id: 'email', 
      label: 'Email', 
      icon: renderIcon('email'), 
      placeholder: 'Enter your email address' 
    },
    { 
      id: 'linkedin', 
      label: 'LinkedIn', 
      icon: renderIcon('linkedin'), 
      placeholder: 'Enter your LinkedIn username or URL',
      prefix: 'linkedin.com/in/'
    },
    { 
      id: 'github', 
      label: 'GitHub', 
      icon: renderIcon('github'), 
      placeholder: 'Enter your GitHub username',
      prefix: 'github.com/'
    },
    { 
      id: 'twitter', 
      label: 'Twitter', 
      icon: renderIcon('twitter'), 
      placeholder: 'Enter your Twitter/X username',
      prefix: '@'
    },
    { 
      id: 'instagram', 
      label: 'Instagram', 
      icon: renderIcon('instagram'), 
      placeholder: 'Enter your Instagram username',
      prefix: '@'
    },
    { 
      id: 'phone', 
      label: 'Phone', 
      icon: renderIcon('phone'), 
      placeholder: 'Enter your phone number' 
    },
  ];

  const handleSubmit = () => {
    if (!input.trim() || !selectedPlatform) return;
    
    // Create structured data
    const structuredData: EnrichmentData = {
      platform: selectedPlatform,
      value: input.trim()
    };
    
    // Create legacy format for backward compatibility
    let legacyFormat = input.trim();
    const platform = platforms.find(p => p.id === selectedPlatform);
    
    if (platform?.prefix && !input.includes(platform.prefix)) {
      // Add prefix if it's not already included
      if (selectedPlatform === 'linkedin') {
        legacyFormat = `linkedin.com/in/${input.trim()}`;
      } else if (selectedPlatform === 'github') {
        legacyFormat = `github.com/${input.trim()}`;
      } else if (selectedPlatform === 'twitter' || selectedPlatform === 'instagram') {
        legacyFormat = input.trim().startsWith('@') ? input.trim() : `@${input.trim()}`;
      }
    }

    onSubmit(legacyFormat, structuredData);
    onClose();
  };

  const getSelectedPlatform = () => {
    return platforms.find(p => p.id === selectedPlatform);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Enrich Your Visit</h3>
        <p>
          Want to see your pin on the map? Help us enrich your visit by sharing a contact method.
          This helps us rank you better and improves your experience.
        </p>

        {!selectedPlatform ? (
          <div className={styles.platformGrid}>
            {platforms.map(platform => (
              <button 
                key={platform.id}
                className={styles.platformButton}
                onClick={() => setSelectedPlatform(platform.id)}
              >
                <div className={styles.platformIcon}>
                  {platform.icon}
                </div>
                <span>{platform.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.inputContainer}>
            <div className={styles.inputHeader}>
              <button 
                onClick={() => {
                  setSelectedPlatform(null);
                  setInput('');
                }}
                className={styles.backButton}
              >
                ← Back to options
              </button>
              <span className={styles.platformLabel}>
                {selectedPlatform && renderIcon(selectedPlatform)}
                {getSelectedPlatform()?.label}
              </span>
            </div>

            <div className={styles.prefixInput}>
              {getSelectedPlatform()?.prefix && (
                <span className={styles.inputPrefix}>{getSelectedPlatform()?.prefix}</span>
              )}
              <input
                type="text"
                placeholder={getSelectedPlatform()?.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`${styles.inputField} ${getSelectedPlatform()?.prefix ? styles.hasPrefix : ''}`}
              />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {selectedPlatform && input.trim() && (
            <button onClick={handleSubmit}>Confirm</button>
          )}
          <button onClick={onClose} className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
