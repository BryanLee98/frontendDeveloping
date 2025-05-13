"use client"
import { useMutation, useQuery } from "@apollo/client"
import { ChangeEvent, MouseEvent, useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  UploadFileDocument,
} from "@/commons/graphql/graphql"
import { Address } from "react-daum-postcode"
import { IMAGE_FILE_VALIDATION } from "./ImageFileValidation"

export const USE_BOARD_WRITE = (isEdit: boolean) => {
  const router = useRouter()
  const params = useParams()
  const fileRef = useRef<HTMLInputElement>(null)
  const editId = isEdit ? params?.boardID : null

  const [createBoard] = useMutation(CreateBoardDocument)
  const [updateBoard] = useMutation(UpdateBoardDocument)
  const [uploadFile] = useMutation(UploadFileDocument)

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(editId) },
    skip: !isEdit,
  })

  const [targetId, setTargetId] = useState(editId)

  //일반 상태를 저장할 변수
  const [inputs, setInputs] = useState({
    name: "",
    title: "",
    content: "",
  })
  const [images, setImages] = useState(["", "", ""])
  const [imageUrl, setImageUrl] = useState(["", "", ""])

  const [password, setPassword] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")

  //주소
  const [address, setAddress] = useState<string>("")
  const [detailAddress, setDetailAddress] = useState<string>("")
  const [zipcode, setZipcode] = useState<string>("")

  useEffect(() => {
    if (isEdit && data) {
      setInputs({
        name: data.fetchBoard.writer || "",
        title: data.fetchBoard.title || "",
        content: data.fetchBoard.contents || "",
      })
      setYoutubeLink(data.fetchBoard.youtubeUrl || "")
      setAddress(data.fetchBoard.boardAddress?.address || "")
      setDetailAddress(data.fetchBoard.boardAddress?.addressDetail || "")
      setZipcode(data.fetchBoard.boardAddress?.zipcode || "")
    }
  }, [isEdit, data])

  //에러 상태를 저장할 변수
  const [nameError, setNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [titleError, setTitleError] = useState("")
  const [contextError, setContextError] = useState("")

  //버튼의 활성화를 저장
  const [isActive, setIsActive] = useState<boolean>()

  //modal의 상태 저장
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  //값이 없을 때에는 변경이 불가능하도록
  const isButtonDisabled = !inputs || !password

  //각 인풋마다 입력된 값을 변수에 다시 업데이트
  const onChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event.target.id]: event.target.value,
    })
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value)
  }

  const onChangeYoutubeLink = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(event.target.value)
  }

  const handleOk = () => {
    router.push(`/boards/${targetId}`)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onToggleAddressModal = () => setIsAddressModalOpen((prev: boolean) => !prev)

  //이미지 파일을 업로드, 전송 요청
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const updatedImages = [...images]
      updatedImages[index] = reader.result as string
      setImages(updatedImages)
    }
    reader.readAsDataURL(file)

    // index 값 검증
    if (index < 0 || index >= images.length) {
      console.error("유효하지 않은 index 값입니다:", index)
      return
    }
    try {
      const result = await uploadFile({ variables: { file } })
      const uploadedUrl = result.data?.uploadFile.url ?? ""
      console.log("URL업로드::", uploadedUrl)

      const updatedImageUrl = [...imageUrl]
      updatedImageUrl[index] = uploadedUrl
      setImageUrl(updatedImageUrl)

      console.log(updatedImageUrl)
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error)
    }
  }

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images]
    updatedImages[index] = ""
    console.log("삭제된 이미지::", updatedImages)
    setImages(updatedImages)
    console.log("이미지 삭제됨::", images)

    const updatedImageUrl = [...imageUrl]
    updatedImageUrl[index] = ""
    console.log("삭제된 이미지 URL::", updatedImageUrl)
    setImageUrl(updatedImageUrl)
    console.log("삭제된 이미지 URL::", imageUrl)
  }

  //버튼을 클릭하면 검증을 해라
  const onClickEnroll = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    // 새로운 게시글 등록의 경우
    if (isEdit === false) {
      let haveError = false
      console.log(data)
      if (inputs.name.trim() === "") {
        setNameError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setNameError("")
      }
      if (password.length === 0) {
        setPasswordError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setPasswordError("")
      }
      if (inputs.title?.trim() === "") {
        setTitleError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setTitleError("")
      }
      if (inputs.content?.trim() === "") {
        setContextError("필수 입력 사항입니다.")
        haveError = true
      } else {
        setContextError("")
      }
      if (haveError === false) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: String(inputs.name),
              password: String(password),
              title: String(inputs.title),
              contents: String(inputs.content),
              youtubeUrl: youtubeLink,
              boardAddress: {
                zipcode: zipcode,
                address: address,
                addressDetail: detailAddress,
              },
              images: imageUrl,
            },
          },
        })
        console.log(data?.createBoard)
        if (data?.createBoard) {
          setTargetId(data?.createBoard._id)
          setModalContent("게시글을 등록하시겠습니까?.")
          setIsModalOpen(true)
        }
      }
    }
    // 글을 수정할 때
    else if (isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (inputs.content?.trim() === "" && inputs.title?.trim() === "") {
        setContextError("필수입력 사항입니다.")
        setTitleError("필수입력 사항입니다.")
        return
      }
      if (inputs.content?.trim() === "") setContextError("필수입력 사항입니다.")
      if (inputs.title?.trim() === "") setTitleError("필수입력 사항입니다.")
      //초기에 입력한 비밀번호와 일치하는지 확인
      const passwordInput = prompt("글을 작성할 때 사용했던 비밀번호를 입력해주세요.")
      //수정
      const updateInput: any = {
        boardAddress: {
          zipcode: "",
          addressDetail: "",
        },
      }
      if (inputs.title?.trim() && inputs.title !== data?.fetchBoard?.title) {
        updateInput.title = inputs.title
      }
      if (inputs.content?.trim() && inputs.content !== data?.fetchBoard?.contents) {
        updateInput.contents = inputs.content
      }
      if (youtubeLink?.trim() && youtubeLink !== data?.fetchBoard?.youtubeUrl) {
        updateInput.youtubeUrl = youtubeLink
      }
      //주소를 처리,
      if (address?.trim() && address !== data?.fetchBoard?.boardAddress?.address) {
        updateInput.boardAddress.address = address
      }
      if (zipcode?.trim() && zipcode !== data?.fetchBoard?.boardAddress?.zipcode) {
        updateInput.boardAddress.zipcode = zipcode
      }
      if (detailAddress?.trim() && detailAddress !== data?.fetchBoard?.boardAddress?.addressDetail) {
        updateInput.boardAddress.addressDetail = detailAddress
      }
      //수정된 값들의 길이가 0보다 크다면 수정요청을 보내라.
      if (Object.keys(updateInput).length > 0) {
        console.log("수정된 항목만 서버에 보내지고 있는가? ::", updateInput)
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: passwordInput,
              boardId: String(targetId),
            },
          })
          if (result.data) {
            console.log("기존의 글을 수정하는 경우", result)
            setModalContent("수정이 완료되었습니다.")
            setIsModalOpen(true)
          } else {
            setModalContent("수정에 실패했습니다.")
            setIsModalOpen(true)
          }
        } catch (error: any) {
          // 에러 발생 시 처리
          if (error.graphQLErrors) {
            const errorMessages = error.graphQLErrors.map((err: any) => err.message)
            setModalContent(errorMessages.join(", "))
            setIsModalOpen(true)
          } else {
            setModalContent("네트워크에러 발생")
            setIsModalOpen(true)
          }
        }
      } else {
        setModalContent("수정된 내용이 없습니다.")
        setIsModalOpen(true)
      }
    }
  }

  const handleComplete = (data: Address) => {
    const { address, zonecode } = data
    setAddress(address)
    setZipcode(zonecode)
    setIsAddressModalOpen(false)
    console.log("주소 data::", data) // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }

  //버튼의 활성화 비활성화 상태를 시각적으로 보여주기 (Disabled 기능아님)
  const enrollButtonStyle = {
    color: isActive === true ? "white" : "black",
    backgroundColor: isActive === true ? "blue" : "lightGray",
  }

  const onClickCancelEdit = () => {
    router.push(`/boards/${targetId}`)
  }

  const onClickCancelNew = () => {
    router.push(`/boards/`)
  }

  return {
    address,
    detailAddress,
    data,
    inputs,
    images,
    password,
    nameError,
    passwordError,
    titleError,
    contextError,
    isButtonDisabled,
    isModalOpen,
    modalContent,
    isAddressModalOpen,
    youtubeLink,
    zipcode,
    handleOk,
    handleCancel,
    onToggleAddressModal,
    onChangeInputs,
    onChangePassword,
    onClickEnroll,
    onChangeDetailAddress,
    onChangeYoutubeLink,
    enrollButtonStyle,
    onClickCancelNew,
    onClickCancelEdit,
    handleComplete,
    handleFileChange,
    handleDeleteImage,
    fileRef,
  }
}
