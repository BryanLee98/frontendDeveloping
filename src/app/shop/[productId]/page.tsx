"use client"

import PRODUCT_COMMENT_LIST_COMPO from "@/components/shopping-detail/comment-list"
import PRODUCT_COMMENT_WRITE_COMPO from "@/components/shopping-detail/comment-write"
import PRODUCT_DETAIL_PAGE_COMPO from "@/components/shopping-detail/detail"

const PRODUCT_DETAIL_PAGE = () => {
  return (
    <>
      <PRODUCT_DETAIL_PAGE_COMPO />
      <PRODUCT_COMMENT_WRITE_COMPO />
      <PRODUCT_COMMENT_LIST_COMPO />
    </>
  )
}

export default PRODUCT_DETAIL_PAGE
