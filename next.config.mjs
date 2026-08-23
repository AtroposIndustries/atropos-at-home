/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Emits /about/index.html rather than /about.html, which is what GitHub
  // Pages serves correctly without rewrite rules.
  trailingSlash: true,

  // There is no image optimisation server. The site uses plain <img>, so this
  // is a guard against a future next/image import silently breaking the build.
  images: { unoptimized: true },
}

export default nextConfig
