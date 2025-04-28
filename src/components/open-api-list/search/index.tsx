"use client"
import { useRouter } from "next/navigation"
import styles from "./styles.module.css"
const SEARCH_HEADER_COMPONENT = () => {
  const router = useRouter()
  const onClickPost = () => {
    router.push("/openapi/new")
  }
  return (
    <>
      <div className={styles.Layout}>
        <button className={styles.enrollPost} onClick={onClickPost}>
          <b>게시글 등록하기</b>
        </button>
      </div>
    </>
  )
}

export default SEARCH_HEADER_COMPONENT
