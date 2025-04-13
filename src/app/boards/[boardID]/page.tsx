"use client"

import COMMENT_LIST_COMPO from "../../../components/boards-detail/comment-list"
import COMMENT_WRITE_COMPO from "../../../components/boards-detail/comment-write"
import PAGE_DETAIL_COMPO from "../../../components/boards-detail/detail"

const DetailPage = () => {
  return (
    <>
      <PAGE_DETAIL_COMPO />
      <COMMENT_WRITE_COMPO />
      <COMMENT_LIST_COMPO />
    </>
  )
}

export default DetailPage
