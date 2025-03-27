"use client"
import { useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql"

export const USE_BOARD_WRITE = (isEdit: boolean) => {
  const router = useRouter()
  const params = useParams()
  const editId = isEdit ? params.boardID : null

  const [createBoard] = useMutation(CreateBoardDocument)
  const [updateBoard] = useMutation(UpdateBoardDocument)

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(editId) },
    skip: !isEdit,
  })

  //일반 상태를 저장할 변수
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState(isEdit ? data?.fetchBoard?.title : "")
  const [context, setContext] = useState(
    isEdit ? data?.fetchBoard?.contents : ""
  )

  //에러 상태를 저장할 변수
  const [nameError, setNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [titleError, setTitleError] = useState("")
  const [contextError, setContextError] = useState("")

  //버튼의 활성화를 저장
  const [isActive, setIsActive] = useState<boolean>()

  //값이 없을 때에는 변경이 불가능하도록
  const isButtonDisabled = !name || !password || !title || !context

  //각 인풋마다 입력된 값을 변수에 다시 업데이트
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    if (event.target.value && password && title && context)
      return setIsActive(true)
    setIsActive(false)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    if (name && event.target.value && title && context) return setIsActive(true)
    setIsActive(false)
  }
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    if (name && password && event.target.value && context)
      return setIsActive(true)
    setIsActive(false)
  }
  const onChangeContext = (event: ChangeEvent<HTMLInputElement>) => {
    setContext(event.target.value)
    if (name && password && title && event.target.value)
      return setIsActive(true)
    setIsActive(false)
  }

  //버튼을 클릭하면 검증을 해라
  const onClickEnroll = async () => {
    if (isEdit === false) {
      let haveError = false

      console.log(data)

      if (name.trim() === "") {
        setNameError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setNameError("")
      }
      if (password === "") {
        setPasswordError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setPasswordError("")
      }
      if (title?.trim() === "") {
        setTitleError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setTitleError("")
      }
      if (context?.trim() === "") {
        setContextError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setContextError("")
      }
      if (haveError === false) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: String(name),
              password: String(password),
              title: String(title),
              contents: String(context),
            },
          },
        })
        alert("게시글 등록 완료")
        router.push(`/01_boards/${data?.createBoard._id}`)
      } else alert("에러가 발생했습니다. 다시 시도해주세요.")
    } else if (isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (context?.trim() === "" && title?.trim() === "") {
        setContextError("필수입력 사항입니다.")
        setTitleError("필수입력 사항입니다.")
        return
      }
      if (context?.trim() === "") {
        setContextError("필수입력 사항입니다.")
        return
      }
      if (title?.trim() === "") {
        setTitleError("필수입력 사항입니다.")
        return
      }
      const passwordInput = prompt(
        "글을 작성할 때 사용했던 비밀번호를 입력해주세요."
      )
      const updateInput: any = {}
      if (title?.trim() && title !== data?.fetchBoard?.title) {
        updateInput.title = title
      }
      if (context?.trim() && context !== data?.fetchBoard?.contents) {
        updateInput.contents = context
      }

      if (Object.keys(updateInput).length > 0) {
        console.log("수정된 항목만 서버에 보내지고 있는가? ::", updateInput)
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: passwordInput,
              boardId: String(editId),
            },
          })
          if (result.data) {
            console.log("기존의 글을 수정하는 경우", result)
            alert("수정 성공!")
          } else {
            alert("수정 실패")
          }
          router.push(`/01_boards/${params.boardID}`)
        } catch (error: any) {
          // 에러 발생 시 처리
          if (error.graphQLErrors) {
            const errorMessages = error.graphQLErrors.map(
              (err: any) => err.message
            )
            alert(errorMessages.join(", "))
          } else {
            console.error("네트워크에러 발생")
          }
        }
      } else {
        alert("수정된 내용이 없다")
      }
    }
  }

  //버튼의 활성화 비활성화 상태를 시각적으로 보여주기 (Disabled 기능아님)
  const enrollButtonStyle = {
    color: isActive === true ? "white" : "black",
    backgroundColor: isActive === true ? "SkyBlue" : "lightGray",
  }
  const onClickCancel = () => {
    router.push(`/01_boards/${params.boardID}`)
  }

  return {
    data,
    name,
    password,
    title,
    context,
    nameError,
    passwordError,
    titleError,
    contextError,
    isButtonDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContext,
    onClickEnroll,
    enrollButtonStyle,
    onClickCancel,
  }
}
