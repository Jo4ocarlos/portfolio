import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Para abrir o servidor de desenvolvimento pelo celular, informe o IP do computador no .env.local
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(','),
};

export default nextConfig;
