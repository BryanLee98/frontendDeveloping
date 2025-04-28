"use client"

import PAGE_LIST_COMPO from "@/components/boards-list/list"
import PAGINATION_COMPO from "@/components/boards-list/pagination"
import { FETCH_BOARDS } from "@/components/boards-list/list/queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const PageList = () => {
  const [page, setPage] = useState<number>(1)
  const { data, refetch } = useQuery(FETCH_BOARDS, {
    variables: { page: page },
  })
  console.log(data?.fetchBoards)
  console.log("page", page)
  return (
    <>
      <PAGE_LIST_COMPO data={data} page={page} refetch={refetch} />
      <PAGINATION_COMPO
        page={page}
        setPage={setPage}
        refetch={refetch}
        data={data}
      />
    </>
  )
}

export default PageList
