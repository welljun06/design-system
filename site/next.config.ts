import type { NextConfig } from 'next'

const isVercel = process.env.VERCEL === '1'
const isStaticExportBuild = process.env.NODE_ENV === 'production' && !isVercel

const nextConfig: NextConfig = {
  ...(isStaticExportBuild ? { output: 'export' } : {}),
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
