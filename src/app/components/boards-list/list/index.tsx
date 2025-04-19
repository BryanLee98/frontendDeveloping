"use client"
import "@ant-design/v5-patch-for-react-19"
import styles from "./styles.module.css"
import Image from "next/image"
import DeleteImage from "@/images/asset/delete.png"
import { USE_PAGE_LIST } from "./hooks"
import { Modal } from "antd"
import { IBoardListProps } from "./types"

const PAGE_LIST_COMPO = (props: IBoardListProps) => {
  const {
    isModalOpen,
    modalContent,
    handleOk,
    handleCancel,
    setDeleteId,
    onClickDelete,
    onClickMove,
  } = USE_PAGE_LIST(props)
  return (
    <div className={styles.boardBody}>
      <div className={styles.boardFrame}>
        <div className={styles.boardInnerBody}>
          <div className={styles.boardHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div className={styles.headerTitle}>제목</div>
            <div className={styles.headerWriter}>작성자</div>
            <div className={styles.headerDate}>날짜</div>
            <button className={styles.hidden}></button>
          </div>
          <div className={styles.contentBody}>
            {props?.data?.fetchBoards.map((el, index) => (
              <button
                className={styles.contentContainer}
                key={el?._id}
                onClick={(event) => onClickMove(event, el?._id)}
                // 클릭하는 해당 게시글의 id를 setDeleteId로 받아서 deleteBoard의 variables: boardId로 할당
                onMouseEnter={() => setDeleteId(el._id)}
                onMouseLeave={() => setDeleteId("")}
              >
                <div className={styles.contentNumber}>{index + 1}</div>
                <div className={styles.contentTitle}>{el.title}</div>
                <div className={styles.contentWriter}>{el.writer}</div>
                <div className={styles.contentDate}>
                  {el.createdAt.split("T")[0]}
                </div>
                <div>
                  <span onClick={onClickDelete}>
                    <Image src={DeleteImage} alt="delete button" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{modalContent}</p>
      </Modal>
    </div>
  )
}

export default PAGE_LIST_COMPO
