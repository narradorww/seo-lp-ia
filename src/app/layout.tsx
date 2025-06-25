import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import 'leaflet/dist/leaflet.css';
import { ModalProvider } from "@/contexts/ModalContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const isPortuguese = acceptLanguage?.startsWith("pt");

  const description = isPortuguese
    ? "Rodrigo Alexandre é desenvolvedor mobile especialista em React Native, TypeScript e IA. Mais de 20 anos em tecnologia, premiado por Google, Alura e FIAP. Criador de soluções inovadoras em sustentabilidade e reconhecimento de imagens."
    : "Rodrigo Alexandre is a mobile developer specialized in React Native, TypeScript, and AI. 20+ years in tech, awarded by Google, Alura, and FIAP. Creator of innovative solutions in sustainability and image recognition.";

  const title = isPortuguese 
    ? "Rodrigo Alexandre | Desenvolvedor Mobile React Native & IA"
    : "Rodrigo Alexandre | Mobile Developer React Native & AI";

  return {
    title: {
      default: title,
      template: "%s | Rodrigo Alexandre",
    },
    description,
    keywords: [
      "Rodrigo Alexandre",
      "React Native Developer", 
      "Mobile Developer",
      "TypeScript",
      "JavaScript",
      "AI Developer",
      "Artificial Intelligence",
      "Next.js",
      "AWS",
      "MongoDB",
      "Full Stack Developer",
      "Brazil Developer",
      "Freelance Developer"
    ],
    authors: [{ name: "Rodrigo Alexandre" }],
    creator: "Rodrigo Alexandre",
    publisher: "Rodrigo Alexandre",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    openGraph: {
      title,
      description,
      url: "https://rodrigoalexandre.dev",
      siteName: "Rodrigo Alexandre Portfolio",
      images: [
        {
          url: "https://rodrigoalexandre.dev/og-banner.png",
          width: 1200,
          height: 630,
          alt: "Rodrigo Alexandre - Mobile Developer specialized in React Native and AI",
        },
      ],
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@rodrigoalexandre79",
      creator: "@rodrigoalexandre79",
      images: ["https://rodrigoalexandre.dev/og-banner.png"],
    },
    alternates: {
      canonical: "https://rodrigoalexandre.dev",
      languages: {
        'en-US': 'https://rodrigoalexandre.dev/en',
        'pt-BR': 'https://rodrigoalexandre.dev/pt',
      },
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
