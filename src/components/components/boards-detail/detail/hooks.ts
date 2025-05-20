"use client"
import { useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FetchBoardDocument } from "@/commons/graphql/graphql"
import { useState } from "react"

export const USE_PAGE_DETAIL = () => {
  const router = useRouter()
  const params = useParams()
  const [youtubeID, setYoutubeID] = useState("")
  const id = params?.boardID

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(id),
    },
  })
  const getYoutubeId = () => {
    setYoutubeID(data?.fetchBoard.youtubeUrl?.split("v=")[1] ?? "")
    console.log(youtubeID)
  }

  const OnClickEditPage = () => {
    router.push(`${params?.boardID}/edit`)
  }
  const onClickListPage = () => {
    router.push(`/boards/`)
  }
  return {
    data,
    youtubeID,
    setYoutubeID,
    getYoutubeId,
    OnClickEditPage,
    onClickListPage,
  }
}
