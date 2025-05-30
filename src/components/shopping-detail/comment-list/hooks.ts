"use client"

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useState } from "react"
const FETCH_TRAVEL_PRODUCT_QUESTIONS = gql`
  query FetchTravelProductQuestions($page: Int, $travelproductId: ID!) {
    fetchTravelproductQuestions(page: $page, travelproductId: $travelproductId) {
      _id
      contents
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`

export const USE_COMMENT_LIST = () => {
  const params = useParams()
  const travelProductId = params?.productId
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { data, fetchMore } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS, {
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
