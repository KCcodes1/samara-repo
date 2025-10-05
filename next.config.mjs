/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['react', 'next', 'lucide-react'],
  },
  eslint: {
    // Set to false to ensure builds fail on ESLint errors (better for production)
    ignoreDuringBuilds: false
  },
  // Disable Next.js built-in CSP for admin routes
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' blob: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https://api.github.com https://github.com https://unpkg.com https://cdn.jsdelivr.net blob: data: http://localhost:3000 ws://localhost:3000; frame-src 'self' https://github.com; worker-src 'self' blob:; child-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';"
          }
        ]
      },
      {
        source: '/admin.html',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' blob: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https://api.github.com https://github.com https://unpkg.com https://cdn.jsdelivr.net blob: data: http://localhost:3000 ws://localhost:3000; frame-src 'self' https://github.com; worker-src 'self' blob:; child-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self';"
          }
        ]
      }
    ]
  }
};

export default nextConfig;