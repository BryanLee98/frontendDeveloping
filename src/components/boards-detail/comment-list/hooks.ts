"use client"

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useState } from "react"

export const USE_COMMENT_LIST = () => {
  const params = useParams()
  const id = String(params?.boardID)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: id,
    },
  })
  const fetchData = () => {
    if (data === undefined) return
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments.length) {
          setHasMore(false)
          // return prev;
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          }
        }
        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
        }
      },
    })
  }
  return { hasMore, setHasMore, data, fetchMore, fetchData }
}
