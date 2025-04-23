"use client"

import API_BOARD_WRITE_COMPO from "@/components/open-api-write"

const OPEN_API_EDIT_PAGE = () => {
  return (
    <>
      <div>수정 페이지</div>
      <API_BOARD_WRITE_COMPO isEdit={true} />
    </>
  )
}

export default OPEN_API_EDIT_PAGE
