"use client"
import styles from "./styles.module.css"
import Image from "next/image"
import { Rate } from "antd"
import { IPropsCommentItem } from "./type"
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

const PRODUCT_COMMENT_ITEM = ({ el, index, length }: IPropsCommentItem) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  return (
    <div key={el?._id} className={styles.commentItem}>
      <div className={styles.listBody}>
        <div className={styles.listTitle}>
          <div className={styles.forwardTitle}>
            <Image src={CommentImageSrc.profileIcon.src} alt={CommentImageSrc.profileIcon.alt} />
            <div className={styles.forwardTitleText}>{el?.writer}</div>
            <Rate disabled defaultValue={el?.rating} />
          </div>
          <div>
            <div className={styles.backTitle}>
              <Image
                onClick={() => setIsEdit(true)}
                src={CommentImageSrc.editIcon.src}
                alt={CommentImageSrc.editIcon.alt}
              />
              <Image src={CommentImageSrc.closeIcon.src} alt={CommentImageSrc.closeIcon.alt} />
            </div>
          </div>
        </div>
        <div className={styles.commentText}>{el?.contents}</div>
        <div className={styles.commentDate}>{el?.createdAt.split("T")[0]}</div>
      </div>
      {index + 1 !== length && <div className={styles.border}> </div>}
    </div>
  )
}

export default PRODUCT_COMMENT_ITEM
