import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "https://main-practice.codebootcamp.co.kr/graphql",
      },
    ]
  },
  trailingSlash: true,
}

export default nextConfig
