"use client"

import API_BOARD_WRITE_COMPO from "@/components/open-api-write"

const OPEN_API_EDIT_PAGE = () => {
  return (
    <>
      <API_BOARD_WRITE_COMPO isEdit={true} />
    </>
  )
}

export default OPEN_API_EDIT_PAGE
