import { Metadata } from 'next';
import { listApkFiles } from '@/lib/s3';
import InternalStoreClient from './InternalStoreClient';
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

export default async function InternalStorePage() {
  const apkFiles = await listApkFiles();

  return (
    <div className={styles.container}>
      <InternalStoreClient apkFiles={apkFiles} />
    </div>
  );
}
