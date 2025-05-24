"use client"

import styles from "./styles.module.css"
import { USE_COMMENT_LIST } from "./hooks"
import InfiniteScroll from "react-infinite-scroll-component"
import COMMENT_ITEM from "../comment-list-item"

const COMMENT_LIST_COMPO = () => {
  const { data, hasMore, setHasMore, fetchMore } = USE_COMMENT_LIST()

  const fetchData = () => {
    if (data === undefined) return
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments.length) {
          setHasMore(false)
          // return prev;
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          }
        }
        return {
          fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
        }
      },
    })
  }

  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        <InfiniteScroll
          next={fetchData}
          hasMore={hasMore}
          loader={<h3>댓글 로딩중...</h3>}
          dataLength={data?.fetchBoardComments.length ?? 0}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>마지막 댓글입니다.</b>
            </p>
          }
        >
          {/* 여기에 반목문 map을 활용한 댓글 보이기 */}
          {data?.fetchBoardComments.map((el, index: number) => (
            <COMMENT_ITEM el={el} index={index} key={el._id} length={data?.fetchBoardComments.length ?? 0} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default COMMENT_LIST_COMPO
