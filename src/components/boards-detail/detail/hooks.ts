"use client"
import { useMutation, useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { DislikeBoardDocument, FetchBoardDocument, LikeBoardDocument } from "@/commons/graphql/graphql"
import { MouseEvent, useState } from "react"

export const USE_PAGE_DETAIL = () => {
  const router = useRouter()
  const params = useParams()
  const [youtubeID, setYoutubeID] = useState("")
  const id = params?.boardID

  const { data, refetch } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(id),
    },
  })
  const [likeBoard] = useMutation(LikeBoardDocument)
  const [dislikeBoard] = useMutation(DislikeBoardDocument)

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

  const onClickLike = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    try {
      const result = await likeBoard({
        variables: { boardId: String(id) },
      })
      if (result.data) {
        console.log("liked", result.data?.likeBoard)
        refetch() // 좋아요 후 새로고침
      }
    } catch (err) {
      console.log("like error")
    }
  }
  const onClickDislike = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    try {
      const result = await dislikeBoard({
        variables: { boardId: String(id) },
      })
      if (result.data) {
        console.log("disliked", result.data?.dislikeBoard)
        refetch() // 싫어요 후 새로고침
      }
    } catch (err) {
      console.log("like error")
    }
  }
  return {
    data,
    youtubeID,
    setYoutubeID,
    getYoutubeId,
    OnClickEditPage,
    onClickListPage,
    onClickLike,
    onClickDislike,
  }
}
