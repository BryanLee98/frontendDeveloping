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
import { useKeywordStore, usePageStore, useDateStore } from "@/commons/store/board_list_stores/store"

type SearchProps = GetProps<typeof Input.Search>
type KeywordStore = {
  keyword: string
  setKeyword: (keyword: string) => void
}
type PageStore = {
  page: number
  setPage: (page: number) => void
}
const PageList = () => {
  const { Search } = Input
  const { page, setPage } = usePageStore() as PageStore
  const { keyword, setKeyword } = useKeywordStore() as KeywordStore
  const { prevDate, endDate, setPrevDate, setEndDate } = useDateStore() as {
    prevDate: Date | null
    endDate: Date | null
    setPrevDate: (date: Date | null) => void
    setEndDate: (date: Date | null) => void
  }
  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: { page: page, startDate: prevDate, endDate: endDate },
    // fetchPolicy: "cache-only"
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
      <SEARCHBAR_COMPO Search={Search} onSearch={onSearch} setPrevDate={setPrevDate} setEndDate={setEndDate} />
      <PAGE_LIST_COMPO data={data} refetch={refetch} />
      <PAGINATION_COMPO data={data} refetch={refetch} onClickPage={onClickPage} />
    </>
  )
}

export default PageList
