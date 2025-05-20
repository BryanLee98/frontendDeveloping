"use client"

import { useRouter } from "next/navigation"
import styles from "./styles.module.css"
import { IOpenApiPageProps } from "./types"
import { MouseEvent } from "react"

const OPEN_API_PAGE_LIST_COMPONENT = (props: IOpenApiPageProps) => {
  const router = useRouter()
  const onClickMove = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()
    router.push(`/openapi/${id}`)
  }

  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.ListContainer}>
          <div className={styles.ListHeader}>
            <div className={styles.HeaderNumber}>번호</div>
            <div className={styles.HeaderTitle}>제목</div>
            <div className={styles.headerWriter}>작성자</div>
            <div className={styles.HeaderDate}>등록 날짜</div>
          </div>
          {props?.currentData?.map((item, index) => (
            <button
              key={item?.id || index}
              onClick={(event) => onClickMove(event, item?.id)}
            >
              <div className={styles.ListItem}>
                <div className={styles.ContentNumber}>{index + 1}</div>
                <div className={styles.ContentTitle}>
                  <span style={{ margin: "10px" }}>
                    {item.title
                      .replaceAll(props.keyword, `@#$${props.keyword}@#$`)
                      .split("@#$")
                      .map((item: string, index: number) => (
                        <span
                          key={`${item}_${index}`}
                          style={{
                            backgroundColor:
                              item === `${props.keyword}` ? "skyblue" : "",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                  </span>
                </div>
                <div className={styles.ContentWriter}>{item?.writer}</div>
                <div className={styles.ContentDate}>
                  {(item?.date || "").split("T")[0]}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default OPEN_API_PAGE_LIST_COMPONENT
