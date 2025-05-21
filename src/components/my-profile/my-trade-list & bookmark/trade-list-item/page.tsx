"use client"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "next/navigation"
import { useState } from "react"
import { FetchTravelproductsDocument } from "@/commons/graphql/graphql"
import { useQuery } from "@apollo/client"
import { IPropsTrade } from "../../types"

const TRADE_LIST_ITEM = () => {
  // const params = useParams()
  // const id = String(params?.boardID)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [isSoldout, setIsSoldOut] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const { data, refetch, fetchMore } = useQuery(FetchTravelproductsDocument, {
    variables: { page: page, isSoldout: isSoldout, search: search },
  })
  const fetchData = () => {
    if (data === undefined) return
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchTravelproducts.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.fetchTravelproducts.length) {
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
  }

  return (
    <>
      <div className={styles.listSection}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>번호</th>
              <th>상품 명</th>
              <th>상태</th>
              <th>금액</th>
              <th>날짜</th>
            </tr>
          </thead>

          {data?.fetchTravelproducts?.map((el: any, index: number) => (
            <tbody>
              <tr key={`${el}_${index}`}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{isSoldout}</td>
                <td>{el?.price}</td>
                <td>{el?.createdAt}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  )
}

export default TRADE_LIST_ITEM
