"use client"
import { useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import { FETCH_BOARD } from "@/app/components/boards-write/queries"
import { FetchBoardDocument } from "@/commons/graphql/graphql"

export const USE_PAGE_DETAIL = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.boardID
  console.log("detail 화면에서 id::::", id)
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(id),
    },
  })
  console.log("detail 화면에서 data:::", data)

  const OnClickEditPage = () => {
    router.push(`${params.boardID}/edit`)
  }
  const onClickListPage = () => {
    router.push(`/01_boards/`)
  }
  return {
    data,
    OnClickEditPage,
    onClickListPage,
  }
}
