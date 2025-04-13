"use client"
import styles from "./styles.module.css"
import commentIcon from "../../../images/detail_assets/comment icon.png"
import Image from "next/image"
import { USE_COMMENT_WRITE } from "./hooks"
import { Rate } from "antd"
import { useState } from "react"

const COMMENT_WRITE_COMPO = () => {
  const {
    newComment,
    writer,
    password,
    comment,
    isButtonDisabled,
    onChangeCommentComment,
    onChangeCommentPassword,
    onChangeCommentWriter,
    onClickSubmit,
  } = USE_COMMENT_WRITE()

  const [value, setValue] = useState(3)

  return (
    <>
      <div className={styles.commentListFrame}>
        <div className={styles.commentListContainer}>
          <div className={styles.commentListBody}>
            <div className={styles.borderLine}></div>
            <div className={styles.title}>
              <Image src={commentIcon} alt="" />
              <div>댓글</div>
            </div>

            <div>
              <Rate onChange={setValue} value={value} />
            </div>
            <div className={styles.commentUserInput}>
              <div className={styles.userTitle}>
                <div className={styles.title}>
                  <div>작성자</div>
                  <div className={styles.aster}> *</div>
                </div>
                <div>
                  <input
                    value={writer}
                    onChange={onChangeCommentWriter}
                    placeholder="작성자 명을 입력해 주세요."
                    className={styles.commentWriterInput}
                    type="text"
                  />
                </div>
              </div>
              <div className={styles.userTitle}>
                <div className={styles.title}>
                  <div>비밀번호</div>
                  <div className={styles.aster}> *</div>
                </div>
                <input
                  value={password}
                  onChange={onChangeCommentPassword}
                  placeholder="비밀번호를 입력해 주세요."
                  className={styles.commentWriterInput}
                  type="password"
                />
              </div>
            </div>
            <div className={styles.commentInputBody}>
              <textarea
                value={comment}
                onChange={onChangeCommentComment}
                className={styles.commentInput}
                placeholder="댓글을 입력해 주세요."
                maxLength={200}
              />
              <div className={styles.inputTextCount}>
                {" "}
                {comment.length}/ 200
              </div>
            </div>
            <div className={styles.buttonBody}>
              <button
                disabled={isButtonDisabled}
                onClick={onClickSubmit}
                className={styles.commentEnrollButton}
              >
                댓글 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default COMMENT_WRITE_COMPO
