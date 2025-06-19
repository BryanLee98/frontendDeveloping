"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import PAGE_WRITE_COMPO from "../../../components/boards-write"

const PostingPage = () => {
  const router = useRouter()
  //로그인 한 사용자에게만 게시글 작성이 가능하도록 예외처리
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인이 필요합니다.")
      router.push("/login") // 로그인 페이지로 이동
    }
  }, [])
  return (
    <>
      <PAGE_WRITE_COMPO isEdit={false} />
    </>
  )
}

export default PostingPage
