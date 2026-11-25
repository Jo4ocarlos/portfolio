import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { profile } from '@/data/profile';
import './globals.css';

const SITE_URL = 'https://joaocarlos-dev.vercel.app';

const title = `${profile.name} | Sistemas internos e integrações`;
const description = `Portfólio de ${profile.name}, desenvolvedor de sistemas internos e integrações com React, TypeScript e Node.js.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: `Portfólio de ${profile.name}`,
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: profile.avatarUrl, alt: `Foto de ${profile.name}` }],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
