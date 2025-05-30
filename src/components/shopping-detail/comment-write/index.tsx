"use client"
import styles from "./styles.module.css"
import "@ant-design/v5-patch-for-react-19"
import commentIcon from "../../../images/detail_assets/comment icon.png"
import Image from "next/image"
import { Button, Rate } from "antd"
import { createContext, useMemo, useState } from "react"

const Context = createContext({ name: "Default" })

const PRODUCT_COMMENT_WRITE_COMPO = () => {
  const contextValue = useMemo(() => ({ name: "Ant Design" }), [])

  return (
    <>
      <div className={styles.commentListFrame}>
        <div className={styles.commentListContainer}>
          <div className={styles.commentListBody}>
            <div className={styles.borderLine}></div>
            <div className={styles.title}>
              <Image src={commentIcon} alt="" />
              <div>문의하기</div>
            </div>

            <div className={styles.commentInputBody}>
              <textarea
                // value={comment}
                // onChange={onChangeCommentComment}
                className={styles.commentInput}
                placeholder="문의사항을 입력해 주세요."
                maxLength={200}
              />
              <div className={styles.inputTextCount}>/ 200</div>
            </div>
            <div className={styles.buttonBody}>
              <Context.Provider value={contextValue}>
                {/* {contextHolder} */}
                <button
                  className={styles.commentEnrollButton}
                  // disabled={isButtonDisabled}
                  // onClick={() => {
                  //   openNotification("topRight")
                  //   onClickSubmit()
                  // }}
                >
                  문의 하기
                </button>
              </Context.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PRODUCT_COMMENT_WRITE_COMPO
