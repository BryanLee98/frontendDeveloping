"use client"
import styles from "./styles.module.css"
import profileImage from "../../00_images/detail_assets/profile-img.png"
import linkImage from "../../00_images/detail_assets/link.png"
import locationImage from "../../00_images/detail_assets/location.png"
import articleImage from "../../00_images/detail_assets/Tranquil Beachside Serenity 1.png"
import youtubeImage from "../../00_images/detail_assets/Frame 427323252.png"
import dislikeIcon from "../../00_images/detail_assets/dislike.png"
import likeIcon from "../../00_images/detail_assets/like.png"
import pageListIcon from "../../00_images/detail_assets/pagelist_icon.png"
import editIcon from "../../00_images/detail_assets/edit_icon.png"
import Image from "next/image"
import { USE_PAGE_DETAIL } from "./hooks"

const PAGE_DETAIL_COMPO = () => {
  const { data, OnClickEditPage, onClickListPage } = USE_PAGE_DETAIL()

  return (
    <>
      <div className={styles.detailPageFrame}>
        <div className={styles.detailLayout}>
          <header className={styles.detailHeader}>
            <div className={styles.titleText}>{data?.fetchBoard?.title}</div>
            <div className={styles.profileContainer}>
              <div className={styles.profileRow}>
                <Image src={profileImage} alt="profile_image" />
                <div>{data?.fetchBoard?.writer}</div>
              </div>
              <div className={styles.date}>2025.2.20</div>
            </div>
            <div className={styles.borderLine}></div>
            <div className={styles.metadataIcon}>
              <Image src={linkImage} alt="link-image" />
              <Image src={locationImage} alt="location-image" />
            </div>
          </header>

          <main className={styles.articleFrame}>
            <Image
              src={articleImage}
              alt="article-image"
              className={styles.articleImage}
            />
            <article className={styles.articleContext}>
              {data?.fetchBoard?.contents}
            </article>
          </main>
          <div className={styles.videoContainer}>
            <Image
              src={youtubeImage}
              alt="youtube-video"
              className={styles.articleVideo}
            />
          </div>

          <div className={styles.dislikeOrLikeButtonFrame}>
            <div className={styles.dislikeButton}>
              <Image src={dislikeIcon} alt="dislike-icon" />
              <div className={styles.dislikeText}>8</div>
            </div>
            <div className={styles.dislikeButton}>
              <Image src={likeIcon} alt="like-icon" />
              <div className={styles.likeText}>39</div>
            </div>
          </div>

          <footer className={styles.detailButtonContainer}>
            <button className={styles.detailButton} onClick={onClickListPage}>
              <Image src={pageListIcon} alt="page-list-icon" />
              <div>목록이동</div>
            </button>
            <button className={styles.detailButton} onClick={OnClickEditPage}>
              <Image src={editIcon} alt="edit-icon" />
              <div>수정하기</div>
            </button>
          </footer>
        </div>
      </div>
    </>
  )
}

export default PAGE_DETAIL_COMPO
