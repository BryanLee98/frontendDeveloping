import type { NextConfig } from "next"
import { hostname } from "os"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
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
module.exports = {
  images: {
    // domains: ["storage.googleapis.com/codecamp-file-storage/"],
    // loader: "default",
    // formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/codecamp-file-storage/**",
      },
    ],
    // remotePatterns: [new URL("https://storage.googleapis.com/codecamp-file-storage/**")],
  },
}
export default nextConfig
