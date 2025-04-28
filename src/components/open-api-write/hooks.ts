"use client"

import { app } from "@/commons/libraries/firebase"
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import { useParams, usePathname, useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

const USE_API_BOARD_WRITE = (isEdit: boolean) => {
  const router = useRouter()
  const params = useParams()
  const editId = isEdit ? params?.myapiID : null

  const [documentData, setDocumentData] = useState<DocumentData>({})
  let pathName = usePathname()
  const fetchedDocumentId = pathName?.split("/")[2]
  useEffect(() => {
    let isFetched = false // 데이터가 이미 조회되었는지 확인하는 플래그
    const fetchDocument = async () => {
      if (!fetchedDocumentId || isFetched) return // ID가 없거나 이미 조회되었으면 실행하지 않음

      const db = getFirestore(app)
      const docRef = doc(db, "board", fetchedDocumentId) // Document ID로 참조 생성
      const result = await getDoc(docRef)

      if (result.exists()) {
        setDocumentData(result.data()) // Document 데이터를 상태로 저장
        isFetched = true // 데이터가 조회되었음을 표시
      } else {
        console.log("No such document!")
      }
    }

    fetchDocument()
  }, [fetchedDocumentId])

  const [targetId, setTargetId] = useState(editId)

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
    if (isEdit === false) {
      let hasError = false
      if (writer === "") {
        alert("작성자를 입력해주세요.")
        hasError = true
      }
      if (password === "") {
        alert("비밀번호를 입력해주세요.")
        hasError = true
      }
      if (title === "") {
        alert("제목을 입력해주세요.")
        hasError = true
      }
      if (contents === "") {
        alert("내용을 입력해주세요.")
        hasError = true
      }
      if (!hasError) {
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
    }
  }

  const onClickEdit = async () => {
    if (isEdit === true) {
      if (!title || !contents) {
        alert("제목과 내용을 입력해주세요.")
        return
      }

      const inputPassword = prompt("비밀번호를 입력해주세요.")
      if (!inputPassword) {
        alert("비밀번호를 입력해주세요.")
        return
      }

      const db = getFirestore(app)
      if (!targetId) {
        alert("Invalid document ID.")
        return
      }
      if (typeof targetId !== "string") {
        alert("Invalid document ID.")
        return
      }
      const docRef = doc(db, "board", targetId)
      const existingDoc = await getDoc(docRef)

      if (!existingDoc.exists()) {
        alert("문서를 찾을 수 없습니다.")
        return
      }

      const existingData = existingDoc.data()

      if (existingData.password !== inputPassword) {
        alert("비밀번호가 일치하지 않습니다.")
        return
      }

      const updatedData = {
        title: title || existingData.title,
        writer: writer || existingData.writer,
        contents: contents || existingData.contents,
        date: new Date().toISOString(),
        address: {
          zipcode: zipcode || existingData.address?.zipcode,
          basicAddress: address || existingData.address?.basicAddress,
          detailAddress: detailAddress || existingData.address?.detailAddress,
        },
        youtubeLink: youtubeLink || existingData.youtubeLink,
      }
      console.log("기존 데이터:", existingData)
      console.log("업데이트할 데이터:", updatedData)
      // Firestore에 업데이트
      await setDoc(docRef, updatedData, { merge: true })
      alert("수정이 완료되었습니다.")
      router.push(`/openapi/${targetId}`)
    }
  }

  const onClickCancel = () => {
    if (confirm("작성중인 내용이 사라집니다. 정말로 나가시겠습니까?")) {
      router.push(`/openapi/${targetId}`)
    }
  }
  return {
    onClickSubmit,
    onClickEdit,
    onClickCancel,
    onChangeContents,
    onChangeWriter,
    onChangeTitle,
    onChangePassword,
    onChangeYoutubeLink,
    onChangeAddress,
    onChangeZipcode,
    onChangeDetailAddress,
    documentData,
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
