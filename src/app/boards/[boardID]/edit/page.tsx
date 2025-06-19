"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import PAGE_WRITE_COMPO from "../../../../components/boards-write"

const EditingPage = () => {
  const router = useRouter()
  //로그인 한 사용자에게만 수정가능하도록 예외처리
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인이 필요합니다.")
      router.push("/login") // 로그인 페이지로 이동
    }
  }, [])

  return (
    <>
      <PAGE_WRITE_COMPO isEdit={true} />
    </>
  )
}

export default EditingPage
