/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'Record Technologies',
    description: 'An unofficial registry for Kasm workspaces.',
    icon: 'https://doctorfree.github.io/kasm-registry/1.1/sp2.png',
    listUrl: 'https://doctorfree.github.io/kasm-registry/',
    contactUrl: 'https://github.com/doctorfree',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
