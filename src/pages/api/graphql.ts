import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://marketpageproject.vercel.app"
  )
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    res.status(200).end()
    return
  }

  try {
    const response = await fetch(
      "https://main-practice.codebootcamp.co.kr/graphql",
      {
        method: req.method,
        headers: {
          ...Object.fromEntries(Object.entries(req.headers)),
          host: "main-practice.codebootcamp.co.kr",
        },
        body: req.body,
      }
    )

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}
