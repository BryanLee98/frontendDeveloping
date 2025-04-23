import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GRAPHQL_ENDPOINT:
      process.env.NODE_ENV === "production"
        ? "https://main-practice.codebootcamp.co.kr/graphql"
        : "http://localhost:3000/graphql",
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "https://main-practice.codebootcamp.co.kr/graphql",
      },
    ]
  },
}

export default nextConfig
