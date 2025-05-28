"use client"
import { useQuery } from "@apollo/client"
import { FetchTravelproductsDocument } from "@/commons/graphql/graphql"
import { useState } from "react"
const USE_SHOPPING_LIST = () => {
  const [isSoldout, setIsSoldout] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { data, fetchMore } = useQuery(FetchTravelproductsDocument, {
    variables: { page: 1, isSoldout: isSoldout, search: search },
  })

  //display: grid를 사용할 경우 css에서 text-overflow: ellipsis가 적용이 되지 않아 20자를 초과하면 말줄임표가 표기되도록 만들었음.
  const sliceContentText = (text: string) => {
    return text.length > 20 ? `${text.substring(0, 20)}...` : text
  }
  const fetchData = () => {
    if (data === undefined) return
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchTravelproducts.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproducts.length) {
          setHasMore(false)
          return {
            fetchTravelproducts: [...prev.fetchTravelproducts],
          }
        }
        return {
          fetchTravelproducts: [...prev.fetchTravelproducts, ...fetchMoreResult.fetchTravelproducts],
        }
      },
    })
    console.log(data)
  }
  return {
    isSoldout,
    search,
    hasMore,
    data,
    sliceContentText,
    fetchData,
  }
}

export default USE_SHOPPING_LIST
