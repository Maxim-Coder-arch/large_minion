import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false, // отключаем строгий режим
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  // // Отключаем предзагрузку CSS
  // experimental: {
  //   optimizeCss: false,
  //   scrollRestoration: true,
  // },
  // // Настройки вебпака для ускорения
  // webpack: (config, { dev, isServer }) => {
  //   if (dev && !isServer) {
  //     // Уменьшаем количество проверок в dev режиме
  //     config.watchOptions = {
  //       ...config.watchOptions,
  //       poll: false,
  //       ignored: ['**/node_modules', '**/.next'],
  //       aggregateTimeout: 300,
  //     }
  //   }
  //   return config
  // },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
