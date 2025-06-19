"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import MY_PROFILE_COMPO from "@/components/my-profile"

const MY_PROFILE_PAGE = () => {
  const router = useRouter()

  //로그인 한 사용자에게만 보이도록 예외처리
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인이 필요합니다.")
      router.push("/login") // 로그인 페이지로 이동
    }
  }, [])

  return (
    <>
      <MY_PROFILE_COMPO />
    </>
  )
}

export default MY_PROFILE_PAGE
