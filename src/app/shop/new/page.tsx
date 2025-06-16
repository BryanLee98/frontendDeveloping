"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SHOPPING_NEW_POST_COMPO from "@/components/shopping-post"

const SHOPPING_NEW_POST_PAGE = () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인이 필요합니다.")
      router.push("/login") // 로그인 페이지로 이동
    }
  }, [])

  return (
    <>
      <SHOPPING_NEW_POST_COMPO />
    </>
  )
}

export default SHOPPING_NEW_POST_PAGE
