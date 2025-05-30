"use client"

import styles from "./styles.module.css"
import { USE_COMMENT_LIST } from "./hooks"
import InfiniteScroll from "react-infinite-scroll-component"
import PRODUCT_COMMENT_ITEM from "../comment-list-item"

const PRODUCT_COMMENT_LIST_COMPO = () => {
  const { data, hasMore, setHasMore, fetchMore, fetchData } = USE_COMMENT_LIST()

  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        <InfiniteScroll
          next={fetchData}
          hasMore={hasMore}
          loader={<h3>문의 로딩중...</h3>}
          dataLength={data?.fetchTravelproductQuestions.length ?? 0}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>마지막 댓글입니다.</b>
            </p>
          }
        >
          {/* 여기에 반목문 map을 활용한 댓글 보이기 */}
          {data?.fetchTravelproductQuestions.map((el: any, index: number) => (
            <PRODUCT_COMMENT_ITEM
              el={el}
              index={index}
              key={el._id}
              length={data?.fetchTravelproductQuestions.length ?? 0}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default PRODUCT_COMMENT_LIST_COMPO
