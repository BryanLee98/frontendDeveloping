"use client"

import PAGE_LIST_COMPO from "@/components/boards-list/list"
import PAGINATION_COMPO from "@/components/boards-list/pagination"
import { useQuery } from "@apollo/client"
import { MouseEvent, useState } from "react"
import _ from "lodash"
import SEARCHBAR_COMPO from "@/components/boards-list/searchBar"
import { FetchBoardsDocument } from "@/commons/graphql/graphql"
import { Input } from "antd"
import type { GetProps } from "antd"
import TODAY_BEST_POST_COMPO from "@/components/boards-list/best-post/page"

type SearchProps = GetProps<typeof Input.Search>
const { Search } = Input

const PageList = () => {
  const [page, setPage] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>("")
  const [prevDate, setPrevDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: { page: page, startDate: prevDate, endDate: endDate },
  })

  const getDebounce = _.debounce((eventValue) => {
    refetch({
      search: eventValue,
      page: 1,
      startDate: prevDate,
      endDate: endDate,
    })
    setKeyword(eventValue)
  }, 400)

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    getDebounce(value)
    console.log(info?.source, value)
  }
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(event.currentTarget.id) })
  }

  return (
    <>
      <TODAY_BEST_POST_COMPO />
      <SEARCHBAR_COMPO
        Search={Search}
        onSearch={onSearch}
        keyword={keyword}
        setKeyword={setKeyword}
        setPrevDate={setPrevDate}
        setEndDate={setEndDate}
      />
      <PAGE_LIST_COMPO keyword={keyword} data={data} page={page} refetch={refetch} />
      <PAGINATION_COMPO data={data} page={page} setPage={setPage} refetch={refetch} onClickPage={onClickPage} />
    </>
  )
}

export default PageList
