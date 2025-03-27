"use client"

import styles from "./styles.module.css"
import Image from "next/image"
import DeleteImage from "../../00_images/asset/delete.png"
import { USE_PAGE_LIST } from "./hooks"

const PAGE_LIST_COMPO = () => {
  const { data, setDeleteId, onClickDelete, onClickMove } = USE_PAGE_LIST()
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
            {data?.fetchBoards.map((el, index: number) => (
              <button
                className={styles.contentContainer}
                key={el._id}
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
    </div>
  )
}

export default PAGE_LIST_COMPO
