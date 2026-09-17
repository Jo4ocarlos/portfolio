import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Libera conexões de HMR e WebSockets para o seu IP local de desenvolvimento
  allowedDevOrigins: ['192.168.10.2'],
};

export default nextConfig;