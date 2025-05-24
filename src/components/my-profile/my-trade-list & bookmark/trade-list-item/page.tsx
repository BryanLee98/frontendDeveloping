"use client"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import USE_TRADE_LIST_N_BOOKMARK from "./hooks"
import InfiniteScroll from "react-infinite-scroll-component"

const TRADE_LIST_ITEM = () => {
  const { isSoldout, hasMore, setHasMore, data, fetchMore } = USE_TRADE_LIST_N_BOOKMARK()
  const 판매완료 = <div style={{ color: "blue" }}>판매완료</div>
  const 판매중 = <div style={{ color: "red" }}>판매중</div>
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
  }

  return (
    <>
      <div className={styles.listSection}>
        <InfiniteScroll
          next={fetchData}
          hasMore={hasMore}
          loader={<h3 style={{ textAlign: "center" }}>상품 로딩중...</h3>}
          dataLength={data?.fetchTravelproducts.length ?? 0}
          endMessage={
            <p style={{ textAlign: "center", padding: "20px" }}>
              <b>마지막 상품입니다.</b>
            </p>
          }
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>번호</th>
                <th>상품 명</th>
                <th style={{ textAlign: "center" }}>상태</th>
                <th style={{ textAlign: "center" }}>가격</th>
                <th style={{ textAlign: "center" }}>날짜</th>
              </tr>
            </thead>

            <tbody>
              {(data?.fetchTravelproducts.length ?? 0 > 0) ? (
                data?.fetchTravelproducts.map((el: any, index: number) => (
                  <tr key={el._id}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>{el.name}</td>
                    <td style={{ textAlign: "center" }}>{isSoldout ? 판매완료 : 판매중}</td>
                    <td style={{ textAlign: "center" }}>{el.price?.toLocaleString()}원</td>
                    <td style={{ textAlign: "center" }}>{el.createdAt.split("T")[0]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </>
  )
}

export default TRADE_LIST_ITEM
