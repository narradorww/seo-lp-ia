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
    ? "Rodrigo Alexandre é desenvolvedor mobile com mais de 20 anos em tecnologia e 3 anos de experiência em software, especialista em React Native, TypeScript e Inteligência Artificial. Foi premiado em iniciativas da Alura, Google e FIAP por projetos de IA voltados para sustentabilidade e reconhecimento de imagens."
    : "Rodrigo Alexandre is a mobile developer with 20+ years in tech and 3+ years in software, specialized in React Native, TypeScript, and AI. He received awards from Alura, Google, and FIAP for innovative AI solutions in sustainability and image recognition.";

  return {
    title: {
      default: "Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA",
      template: "%s | Rodrigo Alexandre",
    },
    description,
    openGraph: {
      title: "Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA",
      description,
      url: "https://rodrigoalexandre.dev",
      siteName: "Rodrigo Alexandre",
      images: [
        {
          url: "https://rodrigoalexandre.dev/og-banner.png",
          width: 1200,
          height: 630,
          alt: "Rodrigo Alexandre - Desenvolvedor Mobile",
        },
      ],
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Rodrigo Alexandre | Especialista em Mobile, React Native, TypeScript e IA",
      description,
      site: "@rodrigoalexandre79",
      images: ["https://rodrigoalexandre.dev/og-banner.png"],
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
      <ModalProvider>
        {children}
        </ModalProvider>
      </body>
    </html>
  );
}
