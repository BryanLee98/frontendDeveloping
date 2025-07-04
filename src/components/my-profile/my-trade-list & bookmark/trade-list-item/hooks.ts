"use client"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { FetchTravelproductsDocument, FetchTravelproductsISoldDocument } from "@/commons/graphql/graphql"

const USE_TRADE_LIST_N_BOOKMARK = () => {
  const [isSoldout, setIsSoldout] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  // const { data, fetchMore } = useQuery(FetchTravelproductsDocument, {
  //   variables: { page: 1, isSoldout: isSoldout },
  // })

  const { data, fetchMore } = useQuery(FetchTravelproductsISoldDocument, {
    variables: {
      page: 1,
    },
  })
  return {
    isSoldout,
    hasMore,
    setHasMore,
    data,
    fetchMore,
  }
}

export default USE_TRADE_LIST_N_BOOKMARK
