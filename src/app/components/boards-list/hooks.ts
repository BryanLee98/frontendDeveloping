"use client"
import { useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql"

export const USE_PAGE_LIST = () => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState("")
  const { data } = useQuery(FetchBoardsDocument)
  const [deleteBoard] = useMutation(DeleteBoardDocument)

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation() //이벤트 버블링을 방지
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const result = await deleteBoard({
          variables: { boardId: deleteId },
          refetchQueries: [{ query: FetchBoardsDocument }],
        })
        console.log("deleted!", result.data?.deleteBoard)
      } catch {
        console.log("delete error")
      }
    }
  }
  const onClickMove = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()
    router.push(`/01_boards/${id}`)
  }

  return {
    data,
    deleteId,
    setDeleteId,
    deleteBoard,
    onClickDelete,
    onClickMove,
  }
}
