'use client';

import { useTrackInternalStore } from '@/hooks/useTrackInternalStore';
import { S3ApkFile } from '@/lib/s3';
import QRCodeDownload from '@/components/common/QRCodeDownload';
import { Smartphone } from 'lucide-react';
import styles from './InternalStore.module.css';

interface InternalStoreClientProps {
  apkFiles: S3ApkFile[];
}

export default function InternalStoreClient({ apkFiles }: InternalStoreClientProps) {
  useTrackInternalStore();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <Smartphone size={32} className={styles.icon} />
          <div>
            <h1 className={styles.title}>Internal Store</h1>
            <p className={styles.subtitle}>
              Downloads internos de APKs do aplicativo
            </p>
          </div>
        </div>
        
        <div className={styles.stats}>
          <span className={styles.statItem}>
            {apkFiles.length} APK{apkFiles.length !== 1 ? 's' : ''} disponível{apkFiles.length !== 1 ? 'is' : ''}
          </span>
        </div>
      </header>

      <section className={styles.content}>
        {apkFiles.length === 0 ? (
          <div className={styles.emptyState}>
            <Smartphone size={48} className={styles.emptyIcon} />
            <h2>Nenhum APK disponível</h2>
            <p>Os arquivos APK aparecerão aqui após serem gerados pelo processo de build.</p>
          </div>
        ) : (
          <div className={styles.apkList}>
            {apkFiles.map((apk, index) => (
              <QRCodeDownload
                key={apk.name}
                downloadUrl={apk.url}
                fileName={apk.name}
                fileSize={apk.size}
                fileDate={apk.date}
                isLatest={index === 0}
              />
            ))}
          </div>
        )}
      </section>

      <aside className={styles.instructions}>
        <h2>Como usar</h2>
        <ol>
          <li>Escaneie o QR Code com seu dispositivo Android</li>
          <li>Ou clique no botão "Download APK" para baixar diretamente</li>
          <li>Ative "Instalação de fontes desconhecidas" nas configurações do Android</li>
          <li>Instale o APK baixado</li>
        </ol>
        
        <div className={styles.downloadNote}>
          <p><strong>✅ Público:</strong> Downloads diretos via AWS S3. 
          Não é necessário login ou autenticação.</p>
        </div>
      </aside>
    </main>
  );
}
