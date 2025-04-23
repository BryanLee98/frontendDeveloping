"use client"

import { app } from "@/commons/libraries/firebase"
import { addDoc, collection, getFirestore, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

const USE_API_BOARD_WRITE = (isEdit: boolean) => {
  const router = useRouter()
  // const [input, setInput] = useState({
  //   title: "",
  //   writer: "",
  //   password: "",
  // })

  // input의 초기값을 빈 문자열로 설정
  const [writer, setWriter] = useState("")
  const [password, setPassword] = useState("")
  const [contents, setContents] = useState("")
  const [title, setTitle] = useState("")
  const [address, setAddress] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")
  const [detailAddress, setDetailAddress] = useState("")

  //상태 변화 관리
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const onChangeYoutubeLink = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(event.target.value)
  }
  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }
  const onChangeZipcode = (event: ChangeEvent<HTMLInputElement>) => {
    setZipcode(event.target.value)
  }
  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(event.target.value)
  }
  // const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInput((prev) => ({
  //     ...prev,
  //     writer: event.target.value,
  //     password: event.target.value,
  //     title: event.target.value,
  //   }))
  // }

  //등록하기 버튼 클릭 시 파이어베이스 서버에 전송
  const onClickSubmit = async () => {
    const board = collection(getFirestore(app), "board")
    const docRef = await addDoc(board, {
      title: title,
      password: password,
      writer: writer,
      contents: contents,
      date: new Date().toISOString(),
      address: {
        zipcode: zipcode,
        basicAddress: address,
        detailAddress: detailAddress,
      },
      youtubeLink: youtubeLink,
    })

    // Document ID를 데이터에 추가 저장 (업데이트)
    await setDoc(docRef, {
      id: docRef.id,
      title: title,
      password: password,
      writer: writer,
      contents: contents,
      date: new Date().toISOString(),
      address: {
        zipcode: zipcode,
        basicAddress: address,
        detailAddress: detailAddress,
      },
      youtubeLink: youtubeLink,
    })
    router.push(`/openapi/${docRef.id}`) // 등록 후 상세 페이지로 이동
  }

  return {
    onClickSubmit,
    onChangeContents,
    onChangeWriter,
    onChangeTitle,
    onChangePassword,
    onChangeYoutubeLink,
    onChangeAddress,
    onChangeZipcode,
    onChangeDetailAddress,
    writer,
    password,
    contents,
    title,
    address,
    zipcode,
    youtubeLink,
    detailAddress,
  }
}

export default USE_API_BOARD_WRITE
