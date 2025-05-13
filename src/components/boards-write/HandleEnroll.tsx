import { MouseEvent } from "react"
import { IHandleEnrollProps } from "./types"

export const HandleEnroll = (props: IHandleEnrollProps) => {
  const handleEnroll = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!props.isEdit) {
      let haveError = false

      if (props.inputs.name.trim() === "") {
        props.setNameError("필수 입력 사항입니다.")
        haveError = true
      } else {
        props.setNameError("")
      }

      if (props.password.length === 0) {
        props.setPasswordError("필수 입력 사항입니다.")
        haveError = true
      } else {
        props.setPasswordError("")
      }

      if (props.inputs.title.trim() === "") {
        props.setTitleError("필수 입력 사항입니다.")
        haveError = true
      } else {
        props.setTitleError("")
      }

      if (props.inputs.content.trim() === "") {
        props.setContextError("필수 입력 사항입니다.")
        haveError = true
      } else {
        props.setContextError("")
      }

      if (!haveError) {
        const { data } = await props.createBoard({
          variables: {
            createBoardInput: {
              writer: props.inputs.name,
              password: props.password,
              title: props.inputs.title,
              contents: props.inputs.content,
              youtubeUrl: props.youtubeLink,
              boardAddress: {
                zipcode: props.zipcode,
                address: props.address,
                addressDetail: props.detailAddress,
              },
              images: ["", ""],
            },
          },
        })

        if (data?.createBoard) {
          props.setTargetId(data.createBoard._id)
          props.setModalContent("게시글을 등록하시겠습니까?.")
          props.setIsModalOpen(true)
        }
      }
    } else {
      if (props.inputs.content.trim() === "" && props.inputs.title.trim() === "") {
        props.setContextError("필수입력 사항입니다.")
        props.setTitleError("필수입력 사항입니다.")
        return
      }

      const passwordInput = prompt("글을 작성할 때 사용했던 비밀번호를 입력해주세요.")

      const updateInput: any = {
        boardAddress: {
          zipcode: "",
          addressDetail: "",
        },
      }

      if (props.inputs.title.trim() && props.inputs.title !== props.data?.fetchBoard?.title) {
        updateInput.title = props.inputs.title
      }

      if (props.inputs.content.trim() && props.inputs.content !== props.data?.fetchBoard?.contents) {
        updateInput.contents = props.inputs.content
      }

      if (props.youtubeLink.trim() && props.youtubeLink !== props.data?.fetchBoard?.youtubeUrl) {
        updateInput.youtubeUrl = props.youtubeLink
      }

      if (props.address.trim() && props.address !== props.data?.fetchBoard?.boardAddress?.address) {
        updateInput.boardAddress.address = props.address
      }

      if (props.zipcode.trim() && props.zipcode !== props.data?.fetchBoard?.boardAddress?.zipcode) {
        updateInput.boardAddress.zipcode = props.zipcode
      }

      if (props.detailAddress.trim() && props.detailAddress !== props.data?.fetchBoard?.boardAddress?.addressDetail) {
        updateInput.boardAddress.addressDetail = props.detailAddress
      }

      if (Object.keys(updateInput).length > 0) {
        try {
          const result = await props.updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: passwordInput,
              boardId: props.targetId,
            },
          })

          if (result.data) {
            props.setModalContent("수정이 완료되었습니다.")
            props.setIsModalOpen(true)
          } else {
            props.setModalContent("수정에 실패했습니다.")
            props.setIsModalOpen(true)
          }
        } catch (error: any) {
          if (error.graphQLErrors) {
            const errorMessages = error.graphQLErrors.map((err: any) => err.message)
            props.setModalContent(errorMessages.join(", "))
            props.setIsModalOpen(true)
          } else {
            props.setModalContent("네트워크에러 발생")
            props.setIsModalOpen(true)
          }
        }
      } else {
        props.setModalContent("수정된 내용이 없습니다.")
        props.setIsModalOpen(true)
      }
    }
  }

  return { handleEnroll }
}
