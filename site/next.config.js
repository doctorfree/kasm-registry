/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    name: 'Record Technologies',
    description: 'An unofficial registry for Kasm workspaces.',
    icon: 'https://doctorfree.github.io/kasm-registry/1.0/sp2.png',
    listUrl: 'https://doctorfree.github.io/kasm-registry/',
    contactUrl: 'https://github.com/doctorfree',
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
