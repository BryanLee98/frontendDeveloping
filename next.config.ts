import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: "http://localhost:3000",
        destination: `https://marketpageproject.vercel.app`,
      },
    ]
  },
  trailingSlash: true,
}

export default nextConfig
