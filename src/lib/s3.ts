// AWS S3 integration for APK file management
import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'rodrigo-apk-store';
const APK_PREFIX = 'builds/'; // Folder structure in S3

export interface S3ApkFile {
  name: string;
  url: string;
  size: string;
  date: string;
  version: string;
  key: string;
}

/**
 * List all APK files from S3 bucket
 */
export async function listApkFiles(): Promise<S3ApkFile[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: APK_PREFIX,
    });

    const response = await s3Client.send(command);
    
    if (!response.Contents) {
      return [];
    }

    const apkFiles = response.Contents
      .filter(obj => obj.Key?.endsWith('.apk'))
      .map(obj => {
        const fileName = obj.Key!.replace(APK_PREFIX, '');
        return {
          name: fileName,
          url: `https://${BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`,
          size: formatFileSize(obj.Size || 0),
          date: formatDate(obj.LastModified || new Date()),
          version: extractVersion(fileName),
          key: obj.Key!,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return apkFiles;
  } catch (error) {
    console.error('Erro ao listar arquivos APK do S3:', error);
    return [];
  }
}

/**
 * Upload APK file to S3
 */
export async function uploadApkFile(fileBuffer: Buffer, fileName: string): Promise<string> {
  try {
    const key = `${APK_PREFIX}${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: 'application/vnd.android.package-archive',
      ACL: 'public-read', // Make file publicly accessible
    });

    await s3Client.send(command);
    
    return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
  } catch (error) {
    console.error('Erro ao fazer upload do APK para S3:', error);
    throw error;
  }
}

/**
 * Get direct download URL for APK file
 */
export function getApkDownloadUrl(fileName: string): string {
  return `https://${BUCKET_NAME}.s3.amazonaws.com/${APK_PREFIX}${fileName}`;
}

// Helper functions
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
  const match = filename.match(/v(\d+)\.apk$/);
  return match ? `v${match[1]}` : 'v1.0';
}