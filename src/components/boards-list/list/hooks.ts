"use client"
import { useRouter } from "next/navigation"
import { MouseEvent, useState } from "react"
import { useMutation } from "@apollo/client"
import { DeleteBoardDocument } from "@/commons/graphql/graphql"
import { Modal } from "antd"

export const USE_PAGE_LIST = (props: any) => {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState("")
  const [deleteBoard] = useMutation(DeleteBoardDocument)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const success = () => {
    Modal.success({
      content: modalContent,
    })
  }

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation() //이벤트 버블링을 방지
    try {
      const result = await deleteBoard({
        variables: { boardId: deleteId },
        refetchQueries: [props.refetch()],
      })
      if (result.data) {
        console.log("deleted!", result.data?.deleteBoard)
        setModalContent("삭제 되었습니다.")
        setIsModalOpen(true)
      } else {
        setModalContent("삭제 실패했습니다.")
        setIsModalOpen(true)
      }
    } catch (err) {
      console.log("delete error")
      setModalContent("삭제에 오류가 발생했습니다.")
      setIsModalOpen(true)
    }
  }

  const onClickMove = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()
    router.push(`/boards/${id}`)
  }

  return {
    deleteId,
    isModalOpen,
    modalContent,
    handleOk,
    handleCancel,
    success,
    setDeleteId,
    deleteBoard,
    onClickDelete,
    onClickMove,
  }
}
