import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA',
      template: '%s | Rodrigo Alexandre',
    },
    description: 'Rodrigo Alexandre é desenvolvedor mobile com mais de 20 anos em tecnologia...',
    keywords: ['Rodrigo Alexandre', 'Desenvolvedor Mobile', 'React Native', 'TypeScript', 'AWS', 'Inteligência Artificial'],
    authors: [{ name: 'Rodrigo Alexandre' }],
    openGraph: {
      title: 'Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA',
      description: 'Rodrigo Alexandre é desenvolvedor mobile com mais de 20 anos em tecnologia...',
      url: 'https://rodrigoalexandre.dev',
      siteName: 'Rodrigo Alexandre',
      images: [
        {
          url: 'https://rodrigoalexandre.dev/og-banner.png',
          width: 1200,
          height: 630,
          alt: 'Rodrigo Alexandre - Desenvolvedor Mobile',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA',
      description: 'Rodrigo Alexandre é desenvolvedor mobile com mais de 20 anos em tecnologia...',
      site: '@rodrigoalexandre79',
      images: ['https://rodrigoalexandre.dev/og-banner.png'],
    },
  };
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
