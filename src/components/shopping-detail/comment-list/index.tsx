"use client"

import styles from "./styles.module.css"
import { USE_COMMENT_LIST } from "./hooks"
import InfiniteScroll from "react-infinite-scroll-component"
import PRODUCT_COMMENT_ITEM from "../comment-list-item"
import Image from "next/image"
import { useState } from "react"

const CommentImageSrc = {
  profileIcon: {
    src: require("@/images/detail_assets/profile-img.png"),
    alt: "프로필 아이콘",
  },
  editIcon: {
    src: require("@/images/detail_assets/edit comment icon.png"),
    alt: "댓글 수정 아이콘",
  },
  closeIcon: {
    src: require("@/images/detail_assets/close icon.png"),
    alt: "댓글 삭제 아이콘",
  },
}

const PRODUCT_COMMENT_LIST_COMPO = () => {
  const { data, hasMore, setHasMore, fetchMore } = USE_COMMENT_LIST()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const fetchData = () => {
    if (data === undefined) return
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchTravelproductQuestions.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchTravelproductQuestions.length) {
          setHasMore(false)
          // return prev;
          return {
            fetchTravelproductQuestions: [...prev.fetchTravelproductQuestions],
          }
        }
        return {
          fetchTravelproductQuestions: [
            ...prev.fetchTravelproductQuestions,
            ...fetchMoreResult.fetchTravelproductQuestions,
          ],
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
          loader={<h3>문의 로딩중...</h3>}
          dataLength={data?.fetchTravelproductQuestions.length ?? 0}
          endMessage={
            <p style={{ textAlign: "center", padding: "20px 0px" }}>
              <b>마지막 문의 글입니다.</b>
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
