import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import styles from './QRCodeDownload.module.css';

interface QRCodeDownloadProps {
  downloadUrl: string;
  fileName: string;
  fileSize: string;
  fileDate: string;
}

export default function QRCodeDownload({
  downloadUrl,
  fileName,
  fileSize,
  fileDate,
}: QRCodeDownloadProps) {
  return (
    <article className={styles.container}>
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
          >
            <Download size={16} />
            Download APK
          </a>
        </div>
      </div>
    </article>
  );
}