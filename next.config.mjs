/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
        port: '',
        pathname: '/cms/resource/**',
      },
    ],
  },
}

export default nextConfig;
