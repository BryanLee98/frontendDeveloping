"use client"
import styles from "./styles.module.css"
import "@ant-design/v5-patch-for-react-19"
import commentIcon from "../../../images/detail_assets/comment icon.png"
import Image from "next/image"
import { USE_COMMENT_WRITE } from "./hooks"
import { Button, Rate } from "antd"
import { createContext, useMemo, useState } from "react"
import { IPropsCommentWrite } from "./types"

const Context = createContext({ name: "Default" })

const COMMENT_WRITE_COMPO = ({ isEdit, el, setIsEdit }: IPropsCommentWrite) => {
  const {
    newComment,
    writer,
    starRate,
    password,
    comment,
    isButtonDisabled,
    isEditButtonDisabled,
    contextHolder,
    api,
    onChangeCommentComment,
    onChangeCommentPassword,
    onChangeCommentWriter,
    onChangeStarRate,
    onClickSubmit,
    onClickEditComment,
    openNotification,
  } = USE_COMMENT_WRITE({ isEdit, el, setIsEdit })

  const contextValue = useMemo(() => ({ name: "Ant Design" }), [])

  return (
    <>
      <div className={isEdit ? "" : styles.commentListFrame}>
        <div className={styles.commentListContainer}>
          <div className={styles.commentListBody}>
            <div className={styles.borderLine}></div>
            <div className={styles.title}>
              <Image src={commentIcon} alt="" />
              <div>댓글</div>
            </div>

            <div>
              <Rate onChange={(e) => onChangeStarRate(e)} defaultValue={isEdit ? el.rating : 0} />
            </div>
            <div className={styles.commentUserInput}>
              <div className={styles.userTitle}>
                <div className={styles.title}>
                  <div>작성자</div>
                  <div className={styles.aster}> *</div>
                </div>
                <div>
                  <input
                    value={isEdit ? (el?.writer ?? "") : writer}
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
              <div className={styles.inputTextCount}>{comment.length}/ 200</div>
            </div>
            <div className={styles.buttonBody}>
              {isEdit ? (
                <>
                  <button className={styles.commentCancelButton} onClick={() => setIsEdit(false)}>
                    취소
                  </button>
                  <button
                    className={styles.commentEnrollButton}
                    disabled={isEditButtonDisabled}
                    onClick={onClickEditComment}
                  >
                    댓글 수정
                  </button>
                </>
              ) : (
                <Context.Provider value={contextValue}>
                  {contextHolder}
                  <button
                    className={styles.commentEnrollButton}
                    disabled={isButtonDisabled}
                    onClick={() => {
                      openNotification("topRight")
                      onClickSubmit()
                    }}
                  >
                    댓글 등록
                  </button>
                </Context.Provider>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default COMMENT_WRITE_COMPO
