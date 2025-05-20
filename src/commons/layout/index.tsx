"use client"
import { usePathname } from "next/navigation"
import PAGE_BANNER from "./banner"
import LAYOUT_NAVIGATION from "./navigation"
import React from "react"
import { IHeaderChildren } from "./type"

const HIDDEN_HEADER = ["/boards/new", `/boards/[boardID]/edit`]

const LAYOUT = (props: IHeaderChildren) => {
  let pathName = usePathname()

  const URL_Convert = () => {
    //1. 일단 pathName에서 edit이 포함되어 있을 경우에
    if (pathName && pathName.includes(`/edit`)) {
      //2. `/boards/[boardID]/edit`으로 변환해줘라
      pathName = `/boards/[boardID]/edit`
    }
  }

  if (pathName && pathName.includes("edit")) URL_Convert()

  const isHiddenHeader = HIDDEN_HEADER.includes(pathName || "") || (pathName && pathName.includes("/profile"))
  return (
    <>
      <LAYOUT_NAVIGATION />
      {!isHiddenHeader && <PAGE_BANNER />}
      <div>{props.children}</div>
    </>
  )
}

export default LAYOUT
