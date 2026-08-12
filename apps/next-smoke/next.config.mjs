/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile the workspace library so its ESM + "use client" boundaries are
  // compiled by Next's RSC pipeline (the whole point of this smoke build).
  transpilePackages: ['@orionshub/lucent'],
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
