// 숙박권 구매 페이지를 만들 예정
"use client"

import { FetchTravelproductsDocument } from "@/commons/graphql/graphql"
import { useDateStore, useKeywordStore } from "@/commons/store/board_list_stores/store"
import SHOPPING_LIST_PAGE_COMPO from "@/components/shopping-list"
import SHOPPING_SEARCHBAR_COMPO from "@/components/shopping-list/searchBar"
import { useQuery } from "@apollo/client"
import { FloatButton, Input, GetProps } from "antd"
import _ from "lodash"
import { useState } from "react"

type SearchProps = GetProps<typeof Input.Search>
type KeywordStore = {
  keyword: string
  setKeyword: (keyword: string) => void
}

const SHOPPING_PAGE = () => {
  const { Search } = Input
  const { keyword, setKeyword } = useKeywordStore() as KeywordStore
  const { prevDate, endDate, setPrevDate, setEndDate } = useDateStore() as {
    prevDate: Date | null
    endDate: Date | null
    setPrevDate: (date: Date | null) => void
    setEndDate: (date: Date | null) => void
  }
  const [isSoldout, setIsSoldOut] = useState(false)
  const { data, refetch } = useQuery(FetchTravelproductsDocument, {
    variables: { page: 1, isSoldout: isSoldout },
  })

  const getDebounce = _.debounce((eventValue) => {
    refetch({
      search: eventValue,
      page: 1,
    })
    setKeyword(eventValue)
  }, 400)

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    getDebounce(value)
    console.log(info?.source, value)
  }
  return (
    <>
      <SHOPPING_SEARCHBAR_COMPO Search={Search} onSearch={onSearch} setPrevDate={setPrevDate} setEndDate={setEndDate} />
      <SHOPPING_LIST_PAGE_COMPO />
      <FloatButton.BackTop />
    </>
  )
}

export default SHOPPING_PAGE
