"use client"

import { FetchTravelProductQuestionsDocument } from "@/commons/graphql/graphql"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useState } from "react"

export const USE_COMMENT_LIST = () => {
  const params = useParams()
  const travelProductId = String(params?.productId)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { data, fetchMore } = useQuery(FetchTravelProductQuestionsDocument, {
    variables: { page: 1, travelproductId: travelProductId },
  })

  return { hasMore, setHasMore, data, fetchMore }
}
