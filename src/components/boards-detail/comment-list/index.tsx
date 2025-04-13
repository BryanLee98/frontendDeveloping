"use client"

import styles from "./styles.module.css"
import Image from "next/image"
import { USE_COMMENT_LIST } from "./hooks"
import { Rate } from "antd"

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

const COMMENT_LIST_COMPO = () => {
  const { data } = USE_COMMENT_LIST()
  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        {/* 여기에 반목문 map을 활용한 댓글 보이기 */}
        {data?.fetchBoardComments.map((el, index: number) => (
          <div key={el?._id}>
            <div className={styles.listBody}>
              <div className={styles.listTitle}>
                <div className={styles.forwardTitle}>
                  <Image
                    src={CommentImageSrc.profileIcon.src}
                    alt={CommentImageSrc.profileIcon.alt}
                  />
                  <div className={styles.forwardTitleText}>{el?.writer}</div>
                  <Rate disabled allowHalf defaultValue={el?.rating} />
                </div>
                <div>
                  <div className={styles.backTitle}>
                    <Image
                      src={CommentImageSrc.editIcon.src}
                      alt={CommentImageSrc.editIcon.alt}
                    />
                    <Image
                      src={CommentImageSrc.closeIcon.src}
                      alt={CommentImageSrc.closeIcon.alt}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.commentText}>{el?.contents}</div>
              <div className={styles.commentDate}>
                {el?.createdAt.split("T")[0]}
              </div>
            </div>
            {/* 맨 밑 댓글에는 선이 없도록 */}
            {index + 1 !== data?.fetchBoardComments.length && (
              <div className={styles.border}> </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default COMMENT_LIST_COMPO
