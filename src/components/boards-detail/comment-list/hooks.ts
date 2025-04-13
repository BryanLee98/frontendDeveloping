"use client"

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

export const USE_COMMENT_LIST = () => {
  const params = useParams()
  const id = String(params.boardID)
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: id,
    },
  })
  return {
    data,
  }
}
