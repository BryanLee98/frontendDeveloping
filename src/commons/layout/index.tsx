"use client"
import { usePathname, useRouter } from "next/navigation"
import PAGE_BANNER from "./banner"
import LAYOUT_NAVIGATION from "./navigation"
import React, { useEffect } from "react"
import { IHeaderChildren } from "./type"
import { useQuery } from "@apollo/client"
import { FETCH_LOGIN_USER } from "@/components/login-check/quries"

const HIDDEN_HEADER = ["/boards/new", `/boards/[boardID]/edit`]

const LAYOUT = (props: IHeaderChildren) => {
  let pathName = usePathname()
  const router = useRouter()

  const { data } = useQuery(FETCH_LOGIN_USER)

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인이 필요합니다.")
      router.push("/login") // 로그인 페이지로 이동
    }
  }, [])

  const URL_Convert = () => {
    //1. 일단 pathName에서 edit이 포함되어 있을 경우에
    if (pathName && pathName.includes(`/edit`)) {
      //2. `/boards/[boardID]/edit`으로 변환해줘라
      pathName = `/boards/[boardID]/edit`
    }
  }

  if (pathName && pathName.includes("edit")) URL_Convert()

  const isHiddenHeader =
    HIDDEN_HEADER.includes(pathName || "") ||
    (pathName && pathName.includes("/profile")) ||
    (pathName && pathName.includes("/new")) ||
    (pathName && pathName.includes("/login")) ||
    (pathName && pathName.includes("/signup"))

  const isHiddenNav = (pathName && pathName.includes("/login")) || (pathName && pathName.includes("/signup"))
  return (
    <>
      {!isHiddenNav && <LAYOUT_NAVIGATION />}
      {!isHiddenHeader && <PAGE_BANNER />}
      <div>{props.children}</div>
    </>
  )
}

export default LAYOUT
