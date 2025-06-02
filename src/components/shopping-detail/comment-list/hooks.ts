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

  const fetchData = () => {
    if (data === undefined) return
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchTravelproductQuestions.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproductQuestions.length) {
          setHasMore(false)
          // return prev;
          return {
            fetchTravelproductQuestions: [...prev.fetchTravelproductQuestions],
          }
        }
        return {
          fetchTravelproductQuestions: [
            ...prev.fetchTravelproductQuestions,
            ...fetchMoreResult.fetchTravelproductQuestions,
          ],
        }
      },
    })
  }
  return { hasMore, setHasMore, data, fetchMore, fetchData }
}
