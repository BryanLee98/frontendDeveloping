"use client"
import styles from "./styles.module.css"
import { FetchBoardsOfTheBestDocument } from "@/commons/graphql/graphql"
import { useRouter } from "next/navigation"
import { useQuery } from "@apollo/client"
import { LikeOutlined } from "@ant-design/icons"
import Image from "next/image"
import defaultImg from "@/images/asset/banner 1.png"
import { MouseEvent } from "react"

const BestArticleImg = {
  defaultProfileImg: {
    src: require("@/images/asset/header profile icon.png"),
    alt: "프로필 이미지",
  },
  defaultArticleImg: {
    src: require("@/images/asset/banner 1.png"),
    alt: "기본 게시글 이미지",
  },
}

const TODAY_BEST_POST_COMPO = () => {
  const router = useRouter()
  const { data } = useQuery(FetchBoardsOfTheBestDocument)
  const onClickMove = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()
    router.push(`/boards/${id}`)
  }
  return (
    <>
      <div className={styles.Layout}>
        <div className={styles.bestArticleFrame}>
          <div className={styles.headerText}>오늘 핫한 트립토크</div>
          <div className={styles.articleFrame}>
            {data?.fetchBoardsOfTheBest.map((el, index) => (
              <button
                className={styles.articleContainer}
                key={`${el}_${index}`}
                onClick={(event) => onClickMove(event, el._id)}
              >
                <div className={styles.imageFrame}>
                  <Image
                    unoptimized={true}
                    className={styles.imageContainer}
                    src={`https://storage.googleapis.com/${el.images?.[0]}` || defaultImg}
                    alt={BestArticleImg.defaultArticleImg.alt}
                    width={112}
                    height={152}
                  />
                </div>

                <div className={styles.articleContents}>
                  <div className={styles.articleNProfileContainer}>
                    <div className={styles.articleTitle}>{el.title}</div>
                    <div className={styles.profile}>
                      <Image
                        unoptimized={true}
                        src={
                          `https://storage.googleapis.com/${el.user?.picture}`
                            ? BestArticleImg.defaultProfileImg.src
                            : ""
                        }
                        alt=""
                        width={25}
                        height={20}
                      />
                      <div>{el.writer}</div>
                    </div>
                  </div>
                  <div className={styles.likesNDateContainer}>
                    <div className={styles.likes}>
                      <LikeOutlined style={{ color: "red" }} />
                      <div style={{ color: "red" }}>{el.likeCount}</div>
                    </div>
                    <div className={styles.Date}>{el.updatedAt.split("T")[0]}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default TODAY_BEST_POST_COMPO
