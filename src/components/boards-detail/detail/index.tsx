"use client"
import styles from "./styles.module.css"
import Image from "next/image"
import { USE_PAGE_DETAIL } from "./hooks"
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
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

const PAGE_DETAIL_COMPO = () => {
  const { data, youtubeID, setYoutubeID, getYoutubeId, OnClickEditPage, onClickListPage, onClickLike, onClickDislike } =
    USE_PAGE_DETAIL()

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
            <div className={styles.titleText}>{data?.fetchBoard?.title}</div>
            <div className={styles.profileContainer}>
              <div className={styles.profileRow}>
                <Image src={boardDetailImg.profileImage.src} alt={boardDetailImg.profileImage.alt} />
                <div>{data?.fetchBoard?.writer}</div>
              </div>
              <div className={styles.date}>{data?.fetchBoard.createdAt?.split("T")[0]}</div>
            </div>
            <div className={styles.borderLine}></div>
            <div className={styles.metadataIcon}>
              <Image src={boardDetailImg.linkImage.src} alt="link-image" />
              <Tooltip title={data?.fetchBoard.boardAddress?.address}>
                <Image src={boardDetailImg.locationImage.src} alt="location-image" />
              </Tooltip>
            </div>
          </header>

          <main className={styles.articleFrame}>
            {data?.fetchBoard.images?.map((image) =>
              image !== "" ? (
                <img
                  key={image}
                  src={`https://storage.googleapis.com/${image}`}
                  alt="article-image"
                  className={styles.articleImage}
                />
              ) : (
                ""
              )
            )}
            <article className={styles.articleContext}>{data?.fetchBoard?.contents}</article>
          </main>
          <div className={styles.videoContainer}>
            <YouTube videoId={youtubeID} opts={opts} onReady={onPlayerReady} />
          </div>

          <div className={styles.dislikeOrLikeButtonFrame}>
            <button onClick={onClickDislike} className={styles.dislikeButton}>
              <DislikeOutlined />
              <div className={styles.dislikeText}>{data?.fetchBoard.dislikeCount}</div>
            </button>
            <button onClick={onClickLike} className={styles.dislikeButton}>
              <LikeOutlined style={{ color: "red" }} />
              <div className={styles.likeText}>{data?.fetchBoard.likeCount}</div>
            </button>
          </div>

          <footer className={styles.detailButtonContainer}>
            <button className={styles.detailButton} onClick={onClickListPage}>
              <Image src={boardDetailImg.pageListIcon.src} alt="page-list-icon" />
              <div>목록이동</div>
            </button>
            <button className={styles.detailButton} onClick={OnClickEditPage}>
              <Image src={boardDetailImg.editIcon.src} alt="edit-icon" />
              <div>수정하기</div>
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default PAGE_DETAIL_COMPO
