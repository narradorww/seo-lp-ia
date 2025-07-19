import { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import { Smartphone } from 'lucide-react';
import QRCodeDownload from '@/components/common/QRCodeDownload';
import styles from './InternalStore.module.css';

export const metadata: Metadata = {
  title: 'Internal Store - APK Downloads | Rodrigo Alexandre',
  description: 'Download interno de APKs do aplicativo. Acesso restrito para distribuição interna.',
  keywords: ['apk', 'download', 'app', 'android', 'internal', 'store'],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Internal Store - APK Downloads',
    description: 'Download interno de APKs do aplicativo',
    type: 'website',
  },
};

interface ApkFile {
  name: string;
  url: string;
  size: string;
  date: string;
  version: string;
}

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function formatDate(timestamp: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);
}

function extractVersion(filename: string): string {
  const match = filename.match(/app-v(\d+)\.apk$/);
  return match ? `v${match[1]}` : 'v1.0';
}

async function getApkFiles(): Promise<ApkFile[]> {
  try {
    const buildsDir = path.join(process.cwd(), 'public', 'builds');
    const files = await fs.readdir(buildsDir);
    const apkFiles = files.filter(file => file.endsWith('.apk'));

    const fileData = await Promise.all(
      apkFiles.map(async (file) => {
        const filePath = path.join(buildsDir, file);
        const fileStat = await fs.stat(filePath);
        
        return {
          name: file,
          url: `/builds/${file}`,
          size: formatFileSize(fileStat.size),
          date: formatDate(fileStat.mtime),
          version: extractVersion(file),
        };
      })
    );

    return fileData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Erro ao ler arquivos APK:', error);
    return [];
  }
}

export default async function InternalStorePage() {
  const apkFiles = await getApkFiles();
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  return (
    <div className={styles.container}>
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
              {apkFiles.map((apk) => (
                <QRCodeDownload
                  key={apk.name}
                  downloadUrl={`${baseUrl}${apk.url}`}
                  fileName={apk.name}
                  fileSize={apk.size}
                  fileDate={apk.date}
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
            <li>Ative "Instalação de fontes desconhecidas" nas configurações</li>
            <li>Instale o APK baixado</li>
          </ol>
        </aside>
      </main>
    </div>
  );
}