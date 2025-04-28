"use client"
import styles from "./styles.module.css"
import Image from "next/image"
import { Tooltip } from "antd"
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons"
import YouTube, { YouTubeProps } from "react-youtube"
import USE_API_BOARD_WRITE from "./hooks"

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
  const {
    documentData,
    youtubeID,
    onClickListPage,
    onClickEditPage,
    getYoutubeId,
  } = USE_API_BOARD_WRITE()

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
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
