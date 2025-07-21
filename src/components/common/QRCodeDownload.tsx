'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Download, Star } from 'lucide-react'; // Importa o ícone de estrela
import { trackDownload } from '@/hooks/useTrackInternalStore';
import styles from './QRCodeDownload.module.css';

interface QRCodeDownloadProps {
  downloadUrl: string;
  fileName: string;
  fileSize: string;
  fileDate: string;
  isLatest?: boolean; // Propriedade opcional para a versão mais recente
}

export default function QRCodeDownload({
  downloadUrl,
  fileName,
  fileSize,
  fileDate,
  isLatest = false, // Valor padrão é falso
}: QRCodeDownloadProps) {
  return (
    <article className={`${styles.container} ${isLatest ? styles.latest : ''}`}>
      {isLatest && (
        <div className={styles.latestBadge}>
          <Star size={16} />
          <span>Mais Recente</span>
        </div>
      )}
      
      <div className={styles.qrSection}>
        <div className={styles.qrWrapper}>
          <QRCodeSVG
            value={downloadUrl}
            size={120}
            level="M"
            includeMargin={true}
            className={styles.qrCode}
          />
        </div>
      </div>
      
      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.fileName}>{fileName}</h3>
          <div className={styles.metadata}>
            <span className={styles.fileSize}>{fileSize}</span>
            <span className={styles.fileDate}>{fileDate}</span>
          </div>
        </header>
        
        <div className={styles.actions}>
          <a
            href={downloadUrl}
            download={fileName}
            className={styles.downloadButton}
            onClick={trackDownload(fileName, downloadUrl)}
          >
            <Download size={16} />
            Download APK
          </a>
        </div>
      </div>
    </article>
  );
}