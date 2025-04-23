"use client"
import styles from "./styles.module.css"
import { app } from "@/commons/libraries/firebase"
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tooltip } from "antd"
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons"
import YouTube, { YouTubeProps } from "react-youtube"

const boardDetailImg = {
  profileImage: {
    src: require("@/images/detail_assets/profile-img.png"),
    alt: "프로필 이미지",
  },
  linkImage: {
    src: require("@/images/detail_assets/link.png"),
    alt: "링크 이미지",
  },
  locationImage: {
    src: require("@/images/detail_assets/location.png"),
    alt: "장소 이미지",
  },
  articleImage: {
    src: require("@/images/detail_assets/Tranquil Beachside Serenity 1.png"),
    alt: "게시글 이미지",
  },
  youtubeImage: {
    src: require("@/images/detail_assets/Frame 427323252.png"),
    alt: "유튜브 영상",
  },
  pageListIcon: {
    src: require("@/images/detail_assets/pagelist_icon.png"),
    alt: "페이지 목록 아이콘",
  },
  editIcon: {
    src: require("@/images/detail_assets/edit_icon.png"),
    alt: "수정 아이콘",
  },
}

const OPEN_API_PAGE_DETAIL_COMPONENT = () => {
  const router = useRouter()
  let pathName = usePathname()
  console.log(pathName)
  const fetchedDocumentId = pathName?.split("/")[2]
  console.log(fetchedDocumentId)
  const [documentData, setDocumentData] = useState<DocumentData>({})
  const [youtubeID, setYoutubeID] = useState("")
  const onClickListPage = () => {
    router.push("/openapi")
  }

  const onClickEditPage = () => {
    router.push(`/openapi/${fetchedDocumentId}/edit`)
  }
  useEffect(() => {
    let isFetched = false // 데이터가 이미 조회되었는지 확인하는 플래그

    const fetchDocument = async () => {
      if (!fetchedDocumentId || isFetched) return // ID가 없거나 이미 조회되었으면 실행하지 않음

      const db = getFirestore(app)
      const docRef = doc(db, "board", fetchedDocumentId) // Document ID로 참조 생성
      const result = await getDoc(docRef)

      if (result.exists()) {
        setDocumentData(result.data()) // Document 데이터를 상태로 저장
        isFetched = true // 데이터가 조회되었음을 표시
      } else {
        console.log("No such document!")
      }
    }

    fetchDocument()
  }, [fetchedDocumentId]) // ID가 변경될 때마다 실행

  const getYoutubeId = () => {
    setYoutubeID(documentData?.youtubeLink?.split("v=")[1] ?? "")
    console.log(youtubeID)
  }
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
    getYoutubeId()
  }

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }
  return (
    <>
      <div className={styles.detailPageFrame}>
        <div className={styles.detailLayout}>
          <header className={styles.detailHeader}>
            <div className={styles.titleText}>{documentData?.title}</div>
            <div className={styles.profileContainer}>
              <div className={styles.profileRow}>
                <Image
                  src={boardDetailImg.profileImage.src}
                  alt={boardDetailImg.profileImage.alt}
                />
                <div>{documentData.writer}</div>
              </div>
              <div className={styles.date}>
                {documentData?.date?.split("T")[0]}
              </div>
            </div>
            <div className={styles.borderLine}></div>
            <div className={styles.metadataIcon}>
              <Image src={boardDetailImg.linkImage.src} alt="link-image" />
              <Tooltip title={documentData?.address?.basicAddress}>
                <Image
                  src={boardDetailImg.locationImage.src}
                  alt="location-image"
                />
              </Tooltip>
            </div>
          </header>

          <main className={styles.articleFrame}>
            <Image
              src={boardDetailImg.articleImage.src}
              alt="article-image"
              className={styles.articleImage}
            />
            <article className={styles.articleContext}>
              {documentData.contents}
            </article>
          </main>
          <div className={styles.videoContainer}>
            <YouTube videoId={youtubeID} opts={opts} onReady={onPlayerReady} />
          </div>

          <div className={styles.dislikeOrLikeButtonFrame}>
            <div className={styles.dislikeButton}>
              <DislikeOutlined />
              <div className={styles.dislikeText}>8</div>
            </div>
            <div className={styles.dislikeButton}>
              <LikeOutlined style={{ color: "red" }} />
              <div className={styles.likeText}>39</div>
            </div>
          </div>

          <footer className={styles.detailButtonContainer}>
            <button className={styles.detailButton} onClick={onClickListPage}>
              <Image
                src={boardDetailImg.pageListIcon.src}
                alt="page-list-icon"
              />
              <div>목록이동</div>
            </button>
            <button className={styles.detailButton} onClick={onClickEditPage}>
              <Image src={boardDetailImg.editIcon.src} alt="edit-icon" />
              <div>수정하기</div>
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default OPEN_API_PAGE_DETAIL_COMPONENT
