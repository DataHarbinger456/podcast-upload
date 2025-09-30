import withBundleAnalyzer from '@next/bundle-analyzer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for git worktrees - prevents workspace detection issues
  outputFileTracingRoot: path.join(__dirname, './'),
  
  typedRoutes: true,
  eslint: {
    dirs: ['src'],
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: false,
  },
}

export default bundleAnalyzer(nextConfig)